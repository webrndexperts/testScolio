<?php

namespace App\Http\Controllers;

use App\Services\RecaptchaService;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Http\Request;
use App\Models\Shipping;
use GuzzleHttp\Client;
use App\Models\Coupon;
use Illuminate\Support\Facades\RateLimiter;
use Cartalyst\Stripe\Stripe;
use Log;
use Validator;

class ShippingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    protected $recaptchaService;
    public function __construct()
    {
        $secret = env('GOOGLE_RECAPTCHA_SECRET_KEY');
        $this->recaptchaService = new RecaptchaService($secret);
    }
    private function formatShippingError($errors)
    {
        $errors = (array)$errors;
        $error = reset($errors) ?: 'Invalid shipping data';

        if (stripos($error, 'No shipping solutions available') !== false) {
            return 'No shipping options available for the provided information';
        }

        if (preg_match('/([\w\[\]\.]+)\s*(must be greater than 0|can\'t be blank|is not a valid JSON format)/i', $error, $matches)) {
            $fieldPath = $matches[1];
            $condition = $matches[2];

            $field = preg_replace('/\[.*?\]|\b(parcels|box|items|dimensions)\b\.*/i', '', $fieldPath);
            $field = trim($field, '.');

            $fieldMap = [
                'length' => 'Parcel length',
                'width' => 'Parcel width',
                'height' => 'Parcel height',
                'actual_weight' => 'Item weight',
                'dimensions' => 'Item dimensions',
                'declared_currency' => 'Declared currency',
                'declared_customs_value' => 'Declared customs value',
                'sku' => 'Item SKU',
                'hs_code' => 'HS code',
                'origin_country_alpha2' => 'Origin country',
            ];

            $conditionMap = [
                'must be greater than 0' => 'must be greater than 0',
                'can\'t be blank' => 'is required',
                'is not a valid JSON format' => 'is invalid',
            ];

            $friendlyField = $fieldMap[strtolower($field)] ?? ucwords(str_replace('_', ' ', $field));
            $friendlyCondition = $conditionMap[strtolower($condition)] ?? $condition;

            return "$friendlyField $friendlyCondition";
        }

        // Fallback: clean up and capitalize the original error
        $cleanError = preg_replace('/\[.*?\]|\b(parcels|box|items|dimensions)\b\.*/i', '', $error);
        $cleanError = trim($cleanError, '.');
        return ucwords(str_replace('_', ' ', $cleanError)) ?: 'Invalid shipping data';
    }

    public function getShippingRates(Request $request)
    {
        try {
            // Validate required fields
            $validator = Validator::make($request->all(), [
                'country_alpha2' => 'required|string',
                'line_1' => 'nullable|string',
                'state' => 'required|string',
                'city' => 'required|string',
                'postal_code' => 'required|string',
                'contact_email' => 'required|email',
                'contact_name' => 'required|string',
                'items_quantity' => 'required|integer|min:1',
                'items_actual_weight' => 'required|numeric|min:0',
                'total_actual_weight' => 'required|numeric|min:0',
            ]);
            // dd($validator);
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation errors',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Prepare request data with defaults
            $data = [
                "origin_address" => [
                    "state" => "Singapore",
                    "city" => "Singapore",
                    "company_name" => "ScolioLife Pte Ltd",
                    "contact_email" => "drkevinlau@scoliolife.com",
                    "contact_name" => "Kevin Lau",
                    "postal_code" => "238862",
                    "country_alpha2" => "SG",
                    "line_1" => "302 Orchard Rd10-02",
                    "line_2" => "Tong Building"
                ],
                "destination_address" => [
                    "country_alpha2" => $request->input('country_alpha2'),
                    "line_1" => $request->input('line_1'),
                    "state" => $request->input('state'),
                    "city" => $request->input('city'),
                    "postal_code" => $request->input('postal_code'),
                    "contact_email" => $request->input('contact_email'),
                    "contact_name" => $request->input('contact_name')
                ],
                "incoterms" => "DDU",
                "insurance" => ["is_insured" => false],
                "courier_selection" => [
                    "show_courier_logo_url" => false,
                    "apply_shipping_rules" => true
                ],
                "shipping_settings" => [
                    "units" => [
                        "weight" => "g",
                        "dimensions" => "cm"
                    ]
                ],
                "parcels" => [
                    [
                        "box" => [
                            "length" => $request->input('parcels_box_length', 20),
                            "width" => $request->input('parcels_box_width', 4),
                            "height" => $request->input('parcels_box_height', 10)
                        ],
                        "items" => [
                            [
                                "quantity" => $request->input('items_quantity'),
                                "description" => $request->input('items_description', ''),
                                "category" => $request->input('items_category', ''),
                                "sku" => $request->input('items_sku', ''),
                                "hs_code" => $request->input('items_hs_code', ''),
                                "origin_country_alpha2" => $request->input('items_origin_country_alpha2', ''),
                                "actual_weight" => $request->input('items_actual_weight'),
                                "declared_currency" => $request->input('items_declared_currency', ''),
                                "declared_customs_value" => $request->input('items_declared_customs_value', 0)
                            ]
                        ],
                        "total_actual_weight" => number_format($request->input('total_actual_weight') / 100, 2)
                    ]
                ]
            ];

            $client = new Client();

            try {
                $response = $client->request('POST', 'https://api.easyship.com/2023-01/rates', [
                    'body' => json_encode($data),
                    'headers' => [
                        'Accept' => 'application/json',
                        'Authorization' => 'Bearer prod_aCe51Xp2E13KzAj4VONiGU8lBzSZ8Fsr5QXSbCF9x+Q=',
                        'Content-Type' => 'application/json',
                    ],
                    'http_errors' => false // Don't throw exceptions for HTTP errors
                ]);

                $statusCode = $response->getStatusCode();
                $body = $response->getBody()->getContents();
                $decodedData = json_decode($body, true);
                // dd($decodedData);
                // Handle API response errors
                if ($statusCode !== 200) {
                    // $errorMessage = $decodedData['error']['details'][0] ?? 'Unknown error from shipping API';
                    $errorDetails = $decodedData['error']['details'] ?? ['Unknown error from shipping API'];
                    $formattedMessage = $this->formatShippingError($errorDetails);
                    return response()->json([
                        'success' => false,
                        'message' => $formattedMessage,
                        'error' => 'Shipping API error',
                        'status_code' => $statusCode
                    ], 400);
                }

                // Prepare rates array
                $ratesArray = [];

                // Add free store pickup for Singapore
                if ($request->input('country_alpha2') === 'SG') {
                    $ratesArray[] = [
                        'courier_id' => 'store-pick-up-e89b-426614174000',
                        'courier_name' => 'Store Pick Up: Free (302 Orchard Road #10-02A, Singapore 238862)',
                        'total_charge' => 0.00,
                        'currency' => 'SGD',
                    ];
                }

                // Add rates from API response
                if (!empty($decodedData['rates'])) {
                    foreach ($decodedData['rates'] as $rate) {
                        $ratesArray[] = [
                            'courier_id' => $rate['courier_id'],
                            'courier_name' => $rate['courier_name'],
                            'total_charge' => $rate['total_charge'],
                            'currency' => $rate['currency'],
                        ];
                    }
                }
                // Check if no shipping options are available
                if (empty($ratesArray)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'No shipping solutions available for the provided information',
                        'error' => 'Please verify your shipping address or contact support.',
                        'status_code' => 404
                    ], 404);
                }
                // Prepare shipping information
                $shippingInformation = [
                    'country' => $request->input('country_alpha2'),
                    'address' => $request->input('line_1'),
                    'state' => $request->input('state'),
                    'city' => $request->input('city'),
                    'postal_code' => $request->input('postal_code'),
                ];

                // Return success response
                return response()->json([
                    'success' => true,
                    'message' => empty($ratesArray) ? 'No shipping options available' : 'Shipping rates retrieved successfully',
                    'data' => $ratesArray,
                    'shipping_information' => $shippingInformation,
                    'meta' => [
                        'total_options' => count($ratesArray),
                        'has_options' => !empty($ratesArray)
                    ]
                ]);

            } catch (RequestException $e) {
                // Handle Guzzle request exceptions
                $errorMessage = $e->getResponse()
                    ? json_decode($e->getResponse()->getBody()->getContents(), true)['message'] ?? $e->getMessage()
                    : $e->getMessage();

                return response()->json([
                    'success' => false,
                    'message' => 'Shipping API request failed',
                    'error' => $errorMessage
                ], 500);
            }

        } catch (\Exception $e) {
            // Handle any other unexpected exceptions
            return response()->json([
                'success' => false,
                'message' => 'Internal server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function getShippingList()
    {
        $apiUrl = 'https://api.easyship.com/2023-01/shipments';

        $headers = [
            'Accept' => 'application/json',
            'Authorization' => 'Bearer prod_jTO4PCpM5cgWsFaf2sZPFAfNWuGyNxY7XtsNkKt+ML4='
        ];

        $client = new Client();

        try {
            $response = $client->get($apiUrl, [
                'headers' => $headers,
            ]);

            return response()->json(json_decode($response->getBody(), true));

        } catch (\GuzzleHttp\Exception\RequestException $e) {
            if ($e->hasResponse()) {
                return response()->json([
                    'error' => json_decode($e->getResponse()->getBody(), true),
                    'status_code' => $e->getResponse()->getStatusCode(),
                ], $e->getResponse()->getStatusCode());
            } else {
                return response()->json([
                    'error' => $e->getMessage(),
                    'status_code' => 500, // Internal Server Error
                ], 500);
            }
        }
    }


    public function index()
    {
        $shipping = Shipping::getAllShippings();
        //dd($shipping);
        return view('backend.shipping.index')->with('shippings', $shipping);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function show($id)
    {

    }


    public function create()
    {
        return view('backend.shipping.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'easyship_access_token' => 'string|required',
            'easyship_class_slug' => 'string|required',
            'status' => 'required|in:active,inactive'
        ]);
        $data = $request->all();



        $data_arry = [
            'type' => !empty($data['method_type']) ? $data['method_type'] : '',
            'easyship_access_token' => !empty($data['easyship_access_token']) ? $data['easyship_access_token'] : '',
            'easyship_class_slug' => !empty($data['easyship_class_slug']) ? $data['easyship_class_slug'] : '',
            'status' => !empty($data['status']) ? $data['status'] : ''
        ];



        //dd($data_arry);
        // return $data;
        $status = Shipping::create($data_arry);
        if ($status) {
            request()->session()->flash('success', 'Shipping successfully created');
        } else {
            request()->session()->flash('error', 'Error, Please try again');
        }
        return redirect()->route('shipping.index');
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $shipping = Shipping::find($id);
        if (!$shipping) {
            request()->session()->flash('error', 'Shipping not found');
        }
        return view('backend.shipping.edit')->with('shipping', $shipping);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $shipping = Shipping::find($id);
        $this->validate($request, [
            'type' => 'string|required',
            'price' => 'nullable|numeric',
            'status' => 'required|in:active,inactive'
        ]);
        $data = $request->all();
        // return $data;
        $status = $shipping->fill($data)->save();
        if ($status) {
            request()->session()->flash('success', 'Shipping successfully updated');
        } else {
            request()->session()->flash('error', 'Error, Please try again');
        }
        return redirect()->route('shipping.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $shipping = Shipping::find($id);
        if ($shipping) {
            $status = $shipping->delete();
            if ($status) {
                request()->session()->flash('success', 'Shipping successfully deleted');
            } else {
                request()->session()->flash('error', 'Error, Please try again');
            }
            return redirect()->route('shipping.index');
        } else {
            request()->session()->flash('error', 'Shipping not found');
            return redirect()->back();
        }
    }



    /**
     * EasyShip Method for Create,Update,Delete
     */

    public function indexPaymentMethod()
    {
        $payment_method = Shipping::getAllPaymentMethod();
        return view('backend.payment-method.index')->with('payment_methods', $payment_method);
    }

    public function createPaymentMethod()
    {
        return view('backend.payment-method.create');
    }

    public function storePaymentMethod(Request $request)
    {

        $data = $request->all();

        $data_arry = [
            'type' => !empty($data['method_type']) ? $data['method_type'] : '',
            'stripe_secret_key' => !empty($data['stripe_secret_key']) ? $data['stripe_secret_key'] : '',
            'stripe_publish_key' => !empty($data['stripe_publish_key']) ? $data['stripe_publish_key'] : '',
            'status' => !empty($data['status']) ? $data['status'] : ''
        ];



        //dd($data_arry);
        // return $data;
        $status = Shipping::create($data_arry);
        if ($status) {
            request()->session()->flash('success', 'Payment Method successfully created');
        } else {
            request()->session()->flash('error', 'Error, Please try again');
        }
        return redirect()->route('payment-method');
    }


    public function editPaymentMethod($id)
    {
        $edit_payments = Shipping::find($id);
        if (!$edit_payments) {
            request()->session()->flash('error', 'Payment Method not found');
        }
        return view('backend.payment-method.edit')->with('edit_payments', $edit_payments);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updatePaymentMethod(Request $request, $id)
    {
        $update_pay = Shipping::find($id);
        // $this->validate($request,[
        // 'type'=>'string|required',
        // 'price'=>'nullable|numeric',
        // 'status'=>'required|in:active,inactive'
        // ]);
        $data = $request->all();
        // return $data;
        $status = $update_pay->fill($data)->save();
        if ($status) {
            request()->session()->flash('success', 'Payment Method successfully updated');
        } else {
            request()->session()->flash('error', 'Error, Please try again');
        }
        return redirect()->route('payment-method');
    }

    protected function getStripeKeys($request)
    {
        $key = env('STRIPE_SECERT_KEY');
        $stripe = new Stripe('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'); // Live secret key for scoliolife

        if (array_key_exists('mode', $request->all())) {
            // $stripe = new Stripe('sk_test_r210BvUvkJxZC4eCmnC08YCa00a2oze7Ke');
            $stripe = new Stripe($key);
        }

        return $stripe;
    }

    public function processPayment(Request $request)
    {


        // Rate limit key based on user IP
        $key = 'process-payment:' . $request->ip();
        // Check the rate limit
        if (RateLimiter::tooManyAttempts($key, 5)) { // Allow 5 attempts per minute
            return response()->json(['success' => false, 'message' => 'Too many attempts, please try again later.'], 429);
        }
        // Increment the attempt count for the rate limiter
        RateLimiter::hit($key, 60); // Track attempts for 1 minute

        if (!$request->user_id) {
            return response()->json(['success' => false, 'message' => 'Please login to proceed']);
        }


        $stripe = $this->getStripeKeys($request);
        $charge = [];
        $token = !empty($request->token) ? $request->token : '';
        $amount = !empty($request->amount) ? $request->amount : 0.00;
        $customerEmail = !empty($request->customer_email) ? $request->customer_email : '';
        $orderNumber = !empty($request->order_number) ? $request->order_number : '';
        $customerName = !empty($request->customer_name) ? $request->customer_name : '';

        // if ($amount < env('MININUM_AMOUNT')) {
        //     return response()->json(['success' => false, 'message' => "Can't procced with this amount."]);
        // }

        // $captcha_token = $request->captcha_token;
        // $captcha_response = $this->recaptchaService->verify($captcha_token);
        // if (!$captcha_response['success']) {
        //     return response()->json(['success' => false, 'message' => 'Captcha validation failed.']);
        // }

        // Log the initial request data
        Log::info('Payment request received:', [
            'amount' => $amount,
            'customer_email' => $customerEmail,
            'order_number' => $orderNumber,
            'customer_name' => $customerName,
        ]);
        try {


            if ($amount === 0) {
                // Perform the action to store the amount or any other action
                // You might want to add some logging or return a specific response here
                $message = 'Amount is zero. No charge created.';
                return response()->json(['success' => false, 'message' => $message]);
            } else {
                // Create the charge

                // $customer = $stripe->customers()->create([
                // 'email' => $customerEmail, // Customer's email address
                // 'name' => $customerName, // Optional: Customer's name
                // ]);



                $charge = $stripe->charges()->create([
                    'amount' => $amount,
                    'currency' => 'SGD',
                    'source' => $token,
                    'description' => 'Payment for order number ->' . $orderNumber,
                    //'customer' => $customer['id'],
                ]);


                Log::info('Charge successful:', ['charge' => $charge]);
                // Handle the success of the charge
                $message = 'Charge successful:' . json_encode($charge);

                return response()->json(['success' => true, 'message' => $message, 'charge' => $charge]);
            }


            // $charge = $stripe->charges()->create([
            // 'amount'      => $amount,
            // 'currency'    => 'INR', // Set the currency to INR
            // 'source'      => $token,
            // 'description' => 'Payment for your product or service',
            // ]);
            // dd($charge);

            // Handle the success of the charge
            $message = 'Charge successful:' . $charge;

            return response()->json(['success' => true, 'message' => $message, 'charge' => $charge]);
        } catch (\Exception $error) {
            // Handle charge failure
            Log::error('Charge failed:', [
                'error_message' => $error->getMessage(),
                'order_number' => $orderNumber,
                'amount' => $amount,
            ]);
            $message = 'Charge failed:' . $error->getMessage();


            return response()->json(['success' => false, 'message' => $message, 'charge' => $charge]);
        }
    }


    protected function getStripeIntentKeys($request)
    {
        $stripe = new \Stripe\StripeClient('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'); // Live secret key for scoliolife

        if (array_key_exists('mode', $request->all())) {
            $stripe = new \Stripe\StripeClient('sk_test_r210BvUvkJxZC4eCmnC08YCa00a2oze7Ke');
        }

        return $stripe;
    }
    public function processAllPay(Request $request)
    {
        // $stripe = new \Stripe\StripeClient('sk_test_r210BvUvkJxZC4eCmnC08YCa00a2oze7Ke');
        // $stripe =  new \Stripe\StripeClient('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'); // Live secret key for scoliolife

        $stripe = $this->getStripeIntentKeys($request);

        header('Content-Type: application/json');
        try {
            if ($request->amount > 0) {

                // Convert decimal amount to integer amount in cents
                $amountInCents = (int) round($request->amount * 100);
                // Create a PaymentIntent with amount and currency
                $paymentIntent = $stripe->paymentIntents->create([
                    'amount' => $amountInCents,
                    // 'amount' => $request->amount,
                    'currency' => 'sgd',
                    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
                    'automatic_payment_methods' => [
                        'enabled' => true,
                    ],
                    // "payment_method_types" => ['paynow']
                ]);

                $output = [
                    'clientSecret' => $paymentIntent->client_secret,
                ];

                return response()->json($output);
            } else {
                return response()->json(['error' => "Amount Can't be 0"]);

            }
        } catch (Error $e) {
            http_response_code(500);
            return response()->json(['error' => $e->getMessage()]);
        }
    }







}
