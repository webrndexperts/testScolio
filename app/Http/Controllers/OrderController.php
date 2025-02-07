<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderProductMeta;
use App\Models\Shipping;
use App\Models\Product;
use App\Models\Settings;
use App\Models\Coupon;
use App\Models\UserAddressInfo;
use App\Models\AbandonCart;
use App\Models\Wishlist;
use App\Models\Aws3Bucket;
//use Newsletter;
use App\User;
use PDF;
use GuzzleHttp\Client;
use Notification;
use Helper;
use Illuminate\Support\Str;
use App\Notifications\StatusNotification;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderEMail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
		
       // $orders=Order::orderBy('id','DESC')->paginate(10);
        
		
		$total_orders_count = Order::count();
		//dd($total_orders_count);

		
        //return view('backend.order.index')->with('orders',$orders)->with('total_orders_count',$total_orders_count);
        return view('backend.order.index', compact('total_orders_count'));
    }
	
	

	public function ordergenerateTable(Request $request) {
        $columns = array(
            0 => 'id',
            1 => 'order_number',
            2 => 'name',
            3 => 'email',
            4 => 'sub_total',
            5 => 'payment_method',
            6 => 'created_at',
            7 => 'payment_status'
        );

        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        $forms = Order::with('user');
		
		// $user_id = $order->user_id;
		// $user_info = DB::table('users')->where('id',$user_id)->first();

		  if (!empty($request->input('search.value'))) {
			$search = $request->input('search.value');

			$forms->where(function($query) use ($search) {
				$query->where('id', 'LIKE', "%{$search}%")
					->orWhereHas('user', function($query) use ($search) {
						$query->where('name', 'LIKE', "%{$search}%")
							  ->orWhere('email', 'LIKE', "%{$search}%")
							  ->orWhere('order_number', 'LIKE', "%{$search}%");
					})
					->orWhere('created_at', 'LIKE', "%{$search}%");
			});
		}

        $counts = $forms->count();
        $forms = $forms->orderBy($order, $dir);
        if($limit >= 0) {
            $forms = $forms->offset($start)->limit($limit);
        }

        $forms = $forms->get();

        $values = $this->generateTableValues($forms);
        $json_data = array(
            "input" => $request->all(),
            "draw" => intval($request->input('draw')),
            "recordsTotal" => intval($counts),
            "recordsFiltered" => intval($counts),
            "data" => $values
        );

        return json_encode($json_data);
    }
	
	
	
	    protected function generateTableValues($listing) {
        $data = array();

        foreach ($listing as $key => $row) {
            $_r = new \stdClass();
            // $_r->style = ($row->trashed()) ? "background-color: #f5c1c1;" : "";
			$_status = '';
			if($row->payment_status=='new') {
             $_status = '<span class="badge badge-primary">New</span>';
			}elseif($row->payment_status=='pending'){
			 $_status = '<span class="badge badge-warning">Pending</span>';
			}elseif($row->payment_status=='completed'){
			 $_status = '<span class="badge badge-success">Completed</span>';
			}elseif($row->payment_status=='failed'){
			 $_status = '<span class="badge badge-danger">Failed</span>';
			}
	
            $data[$key]['DT_RowAttr'] = $_r;
            $data[$key]['id'] = $row->id;
            $data[$key]['order_number'] = $row->order_number ?? '';
            $data[$key]['name'] = $row->user->name ?? ''; 
            $data[$key]['email'] =$row->user->email ?? '';
            $data[$key]['sub_total'] = '$ ' .number_format($row->sub_total,2) . ' SGD';
            $data[$key]['payment_method'] =$row->payment_method;
            $data[$key]['created_at'] = $row->created_at->format(' d M, Y');
            $data[$key]['payment_status'] =$_status;
            $data[$key]['actions'] = view('backend.order.actions', [ "order" => $row ])->render();
        }

        return $data;
    }	
	
	
	

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }


	
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

		$order_data = $request->all();
		// $shipment_shipping_id =  !empty($order_data['shipping_id']) ? $order_data['shipping_id'] : '';
		// $shipment_method_name =  !empty($order_data['shipping_method_name']) ? $order_data['shipping_method_name'] : '';
		// return response()->json(['id' => $shipment_shipping_id , 'name' => $shipment_method_name ]);
		// die('sdfsdfs');
		\App::setLocale($request->lang);
		// dd($order_data);

			// Handle the case where 'Image' key doesn't exist or decoding failed
		$updated_grouped_product_attributes = json_encode($order_data['grouped_product_attributes'], JSON_UNESCAPED_UNICODE);
         
		// dd($updated_grouped_product_attributes);

		$order_meta = [
			'user_id' => !empty($order_data['userId']) ? $order_data['userId'] : '',
			'payment_id' => !empty($order_data['payment_id']) ? $order_data['payment_id'] : '',
			'order_number' => !empty($order_data['order_number']) ? $order_data['order_number'] : Str::random(6),
			'sub_total' => !empty($order_data['sub_total']) ? $order_data['sub_total'] : 0.00,
			'total_amount' => !empty($order_data['total_amount']) ? $order_data['total_amount'] : 0.00,
			'coupon' => (array_key_exists('coupon_price', $order_data) && !empty($order_data['coupon_price'])) ? $order_data['coupon_price'] : '',
			'discount_couponcode' => !empty($order_data['discount_couponcode']) ? $order_data['discount_couponcode'] : '',
			'shipping_method_name' => !empty($order_data['shipping_method_name']) ? $order_data['shipping_method_name'] : '',
			'shipping_id' => !empty($order_data['shipping_id']) ? $order_data['shipping_id'] : '',
			'shipping_price' => $order_data['shippig_charges'],
			'quantity' => !empty($order_data['quantity']) ? $order_data['quantity'] : '',
			'gst_tax' => !empty($order_data['gst_tax']) ? $order_data['gst_tax'] : 0.00,
			'stripe_total_price' => !empty($order_data['stripe_total_price']) ? $order_data['stripe_total_price'] : 0.00,
			'payment_method' => $order_data['payment_type'],
			'payment_status' => !empty($order_data['stripe_total_price']) ? 'new' : '',
			'status' => !empty($order_data['stripe_total_price']) ? 'completed' : 'pending',
			'grouped_product_attributes' => isset($updated_grouped_product_attributes) ? $updated_grouped_product_attributes : '',
			//'scoliosis_exercises_file' => !empty($grouped_product_attributes['CustomizedImgage']) ? $grouped_product_attributes['CustomizedImgage'] : '',
			'lang' => !empty($order_data['language']) ? $order_data['language'] : '',
			'sku' => !empty($order_data['sku']) ? $order_data['sku'] : ''
		];
	
		// Check if all necessary fields are present before creating the order
		if (
			!empty($order_meta['user_id']) &&
			!empty($order_meta['payment_id']) &&
			!empty($order_meta['order_number']) &&
			isset($order_meta['sub_total']) &&
			isset($order_meta['total_amount']) &&
			isset($order_meta['shipping_price']) &&
			isset($order_meta['payment_method'])
		) {
			$order_id = Order::create($order_meta);
			Log::info('Order created with ID:', [$order_id]);

			// Proceed with further processing if needed
		} else {
			// Handle case where required fields are missing
			// Optionally log an error or inform the user
			Log::error('Order creation failed: Required fields are missing', $order_meta);
			echo "Cannot create order: Required fields are missing.";
		}

		//$order_id = Order::create($order_meta);

		$billing_first_name = !empty($order_data['firstName']) ? $order_data['firstName'] : '';
		$billing_last_name = !empty($order_data['lastName']) ? $order_data['lastName'] : '';
		$billing_email = !empty($order_data['email']) ? $order_data['email'] : '';
		$company = !empty($order_data['company']) ? $order_data['company'] : '';
		$billing_state = !empty($order_data['state']) ? $order_data['state'] : '';
		$billing_country = !empty($order_data['country']) ? $order_data['country'] : '';
		$billing_postcode = !empty($order_data['postcode']) ? $order_data['postcode'] : '';
		$billing_city = !empty($order_data['town']) ? $order_data['town'] : '';
		$billing_address_1 = !empty($order_data['street']) ? $order_data['street'] : '';
		$billing_address_2 = !empty($order_data['apartment']) ? $order_data['apartment'] : '';
		$billing_phone = !empty($order_data['phone']) ? $order_data['phone'] : '';
		$shipping_first_name = !empty($order_data['shippingFirstName']) ? $order_data['shippingFirstName'] : '';
		$shipping_last_name = !empty($order_data['shippingLastName']) ? $order_data['shippingLastName'] : '';
		$shipping_country = !empty($order_data['shippingCountry']) ? $order_data['shippingCountry'] : '';
		$shipping_address_1 = !empty($order_data['shippingStreet']) ? $order_data['shippingStreet'] : '';
		$shipping_address_2 = !empty($order_data['shippingApartment']) ? $order_data['shippingApartment'] : '';
		$shipping_city = !empty($order_data['shippingTown']) ? $order_data['shippingTown'] : '';
		$shipping_state = !empty($order_data['shipping_state']) ? $order_data['shipping_state'] : '';
		$shipping_postcode = !empty($order_data['shippingPostcode']) ? $order_data['shippingPostcode'] : '';
		$shipping_phone = !empty($order_data['shippingPhone']) ? $order_data['shippingPhone'] : '';
		$propductType = !empty($order_data['propductType']) ? $order_data['propductType'] : '';

		$get_user_order_info = [
			'billing_first_name' => $billing_first_name,
			'billing_last_name' => $billing_last_name,
			'billing_email' => $billing_email,
			'company' => $company,
			'billing_address_1' => $billing_address_1,
			'billing_address_2' => $billing_address_2,
			'billing_city' => $billing_city,
			'billing_state' => $billing_state,
			'billing_country' => $billing_country,
			'billing_postcode' => $billing_postcode,
			'billing_phone' => $billing_phone,
			'shipping_first_name' => $shipping_first_name,
			'shipping_last_name' => $shipping_last_name,
			'shipping_address_1' => $shipping_address_1,
			'shipping_address_2' => $shipping_address_2,
			'shipping_city' => $shipping_city,
			'shipping_state' => $shipping_state,
			'shipping_country' => $shipping_country,
			'shipping_postcode' => $shipping_postcode,
			'shipping_phone' => $shipping_phone,
		];
		
		if(!empty($order_data['userId'])){
			
		UserAddressInfo::updateOrCreate(['user_id' => $order_data['userId']], $get_user_order_info);
		}


		
		
		if (!empty($order_id)) {
			//$product_id = '';
		$productItemsArray = $order_data['product_items'];
		$order_number = $order_data['order_number']; 
        // dd($productItemsArray);		
			foreach ($productItemsArray as $item) {
			//	$product_id = $item['product_id'];
				$order_product_meta = [
					'order_id' => $order_number,
					'product_id' => $item['product_id'],
					'quantity' => $item['quantity'],
					'status' => 'active'
				];
			$OrderProduct = OrderProductMeta::create($order_product_meta);
			}
	
		}else{
			
		$response = [
			'status' => 'error',
			'message' => 'Not able to insert order'
		];
		}
		
		if ($order_id) {
        $created_order_date = !empty($order_id->created_at->format('F d, Y')) ? $order_id->created_at->format('F d, Y') : '';
		$full_name = $order_data['firstName'] . ' ' . $order_data['lastName'];
		$order_discount_couponcode = !empty($order_data['discount_couponcode']) ? $order_data['discount_couponcode'] : '';
		$coupon_price = (array_key_exists('coupon_price', $order_data) && !empty($order_data['coupon_price'])) ? $order_data['coupon_price'] : '';
		// if($order_discount_couponcode){
		// $single_coupon = Coupon::where('code', $order_discount_couponcode)->first();
		// $get_single_coupon = $single_coupon->value;	
		// }else{
		 // $get_single_coupon = '0.00';	
		// }		
		$ordermailProducts = OrderProductMeta::with('product')->where('order_id', $order_data['order_number'])->get();
		$order_information_mail = [
            'firstName' => $order_data['firstName'],
            'lastName' => $order_data['lastName'],
			'order_number' => $order_data['order_number'],
            'quantity' => $order_data['quantity'],
            'price' => $order_data['sub_total'],
            'total_amount' => $order_data['total_amount'],
            'gst_tax' => $order_data['gst_tax'],
			'total_price' => $order_data['sub_total'],
			'country' => $order_data['country'],
			'postcode' => $order_data['postcode'],
			'city' => $order_data['town'],
			'street' => $order_data['street'],
			'coupon_discount' => $coupon_price,
			'phone' => $order_data['phone'],
			'email' => $order_data['email'],
			'grouped_product_attributes' => isset($updated_grouped_product_attributes) ? $updated_grouped_product_attributes : '',
			'payment_method' => $order_data['payment_type'],
			'created_order_date' => $created_order_date,
			'shipping_method_name' => !empty($order_data['shipping_method_name']) ? $order_data['shipping_method_name'] : 'Store Pick Up',
			'shipping_price' =>  !empty($order_data['shippig_charges']) ? $order_data['shippig_charges'] : '',
			'ordermailProducts' => $ordermailProducts
        ];
		$user_email = $order_data['email'];
		$settings = Settings::first();
		$recipientEmail = !empty($settings->email) ? $settings->email : 'clinic.sg@scoliolife.com';
		$ccEmail = ['drkevinlau@scoliolife.com' , 'webrndexperts@gmail.com'];
		
		try {
			//code...
			// $admin_sent_mail = Mail::to('shibashishoo007@gmail.com')->send(new OrderEMail($order_information_mail));
			// $admin_sent_mail = Mail::to($recipientEmail)->cc($ccEmail)->send(new OrderEMail($order_information_mail));
			$user_sent_mail = Mail::to($user_email)->send(new OrderEMail($order_information_mail));
		} catch (\Exception $th) {
			//throw $th;
			Log::error('Mail sending Failed ', [$th->getMessage()]);
		}
	    // if (!Newsletter::isSubscribed($user_email)) { 'clinic.sg@scoliolife.com
	     // $check_mailchimp_user = Newsletter::subscribe($user_email);
		// }
			
		
		
		$quantity =  !empty($order_data['quantity']) ? $order_data['quantity'] : '';
		$dimension_height =  !empty($order_data['dimension_height']) ? $order_data['dimension_height'] : 0;
		$dimension_length =  !empty($order_data['dimension_length']) ? $order_data['dimension_length'] : 0;
		$dimension_weight =  !empty($order_data['dimension_weight']) ? $order_data['dimension_weight'] : 0;
		$product_actual_weight =  !empty($order_data['product_actual_weight']) ? $order_data['product_actual_weight'] : '';
		$shipment_shipping_id =  !empty($order_data['shipping_id']) ? $order_data['shipping_id'] : '';
		$shipment_method_name =  !empty($order_data['shipping_method_name']) ? $order_data['shipping_method_name'] : '';
		
		// $product = Product::find($product_id);
		// dd($product);
        // $product_name = !empty($product->name) ? $product->name : '';
        // $product_sku = !empty($product->product_sku) ? $product->product_sku : '';
		if($propductType == 'normal'){
			

		if(!empty($product_actual_weight) || !empty($dimension_height) || !empty($dimension_length) || !empty($dimension_weight)  ){

	
		$client = new Client();
		
		$parcels = [];
        foreach ($order_data['product_items'] as $index => $product) {
            // $sku = $order_data['sku'][$index]['sku'];
            $quantity = $product['quantity'];
            
            // You can replace these with the actual product details (e.g., description, category)
            $parcels[] = [
                "box" => [
                    "slug" => $product['slug'], // Box slug, adjust based on the box used
                    "length" => $product['dimension_length'], // Product dimensions
                    "width" => $product['dimension_width'], 
                    "height" => $product['dimension_height'],
                ],
                "items" => [
                    [
                        "description" => $product['title'], // Replace with actual product description
                        "category" => "Health & Beauty", // Replace with actual category
                        "sku" =>$product['sku'], // Product SKU
                        "quantity" => $quantity, // Product quantity
                        "declared_customs_value" => $product['price'], // Customs value based on total price
                        "declared_currency" => "SGD", // Currency
                        "actual_weight" => $product_actual_weight, // Product weight
                        "origin_country_alpha2" => $order_data['country'], // Origin country
                    ]
                ],
                "total_actual_weight" => $product_actual_weight, // Total weight
            ];
        }

		 $save_order_shipment = $client->request('POST', 'https://api.easyship.com/2023-01/shipments', [
            'body' => json_encode([
               "origin_address" => [
			
				"state" => null,
				"city" => "Singapore",
				"company_name" => "ScolioLife Pte Ltd",
				"contact_email" => "drkevinlau@scoliolife.com",
				"contact_phone" => "+852-3008-5678",
				"contact_name" => "Kevin Lau",
				"postal_code" => "238862",
				"country_alpha2" => "SG",
				"line_1" => "302 Orchard Rd10-02",
				"line_2" => "Tong Building"
			    ],
				"destination_address" => [
				"state" => !empty($order_data['state']) ? $order_data['state'] : 'null',
				"city" =>  !empty($order_data['town']) ? $order_data['town'] : '',
				"company_name" => !empty($order_data['company']) ? $order_data['company'] : '',
				"contact_email" => !empty($order_data['email']) ? $order_data['email'] : '',
				"contact_phone" => !empty($order_data['phone']) ? $order_data['phone'] : '',
				"contact_name" => $full_name,
				"postal_code" => !empty($order_data['postcode']) ? $order_data['postcode'] : '',
				"country_alpha2" => !empty($order_data['country']) ? $order_data['country'] : '',
				"line_1" => !empty($order_data['street']) ? $order_data['street'] : '',
				"line_2" => !empty($order_data['apartment']) ? $order_data['apartment'] : ''
			    ],
          "incoterms" => "DDU",
			"insurance" => [
				"is_insured" => false
			],
			
			"courier_selection" => [
				"allow_courier_fallback" => false,
				"apply_shipping_rules" => true,
				"selected_courier_id" => $shipment_shipping_id
			],
			"courier" => [ // Add courier information here

            "id" => $shipment_shipping_id,
            "name" => $shipment_method_name
            ],
			"shipping_settings" => [
				"additional_services" => [
					"qr_code" => "none"
				],
				"units" => [
					"weight" => "g",
					"dimensions" => "cm"
				],
				"buy_label" => false,
				"buy_label_synchronous" => false,
				"printing_options" => [
					"format" => "png",
					"label" => "4x6",
					"commercial_invoice" => "A4",
					"packing_slip" => "4x6"
				]
			],
			"order_data" => [
                "buyer_selected_courier_name" => $shipment_method_name,
			],
			"parcels" => $parcels
			// [
			// 	[
			// 		"box" => [
			// 			"slug" => "testing",
			// 			"length" => $dimension_length,
			// 			"width" => $dimension_weight,
			// 			"height" => $dimension_height
			// 		],
			// 		"items" => [
			// 			[
			// 				"description" => 'testing',
			// 				"category" => "Health & Beauty",
			// 				"sku" => 'bk5th-us',
			// 				"quantity" => $quantity,
			// 				"declared_customs_value" => 22,
			// 				"declared_currency" => "SGD",
			// 				"actual_weight" => $product_actual_weight ,
			// 				// "actual_weight" => $product_actual_weight / 100,
			// 				"origin_country_alpha2" => $order_data['country']
			// 			]
			// 		],
			// 		"total_actual_weight" => $product_actual_weight 
			// 		// "total_actual_weight" => $product_actual_weight / 100
			// 	]
			// ]
            ]),
            'headers' => [
     	    	'accept' => 'application/json',
			    'authorization' => 'Bearer prod_aCe51Xp2E13KzAj4VONiGU8lBzSZ8Fsr5QXSbCF9x+Q=',
		     	'content-type' => 'application/json',
            ],
        ]);

		$data = $save_order_shipment;
		$body = $save_order_shipment->getBody();

		$body->rewind();


		$jsonData = $body->getContents();
		$decodedData = json_decode($jsonData, true);
		
		// dd($jsonData);
		}
	 }
		//if($order_id->id){
		// Delete abandon carts where user_id exists in orders
		// $delete_user_abandon_cart = AbandonCart::whereIn('user_id', function ($query) {
			// $query->select('user_id')
				  // ->from(with(new Order)->getTable());
		// })->delete();
		
		// $delete_user_wishlist_cart = Wishlist::whereIn('user_id', function ($query) {
			// $query->select('user_id')
				  // ->from(with(new Order)->getTable());
		// })->delete();
		
		//}
		
		
		$response = [
			'status' => 'true',
			'message' => 'Order successfully saved.',
			'order_id' => $order_id->id, 
			//'delete_user_wishlist_cart' => $delete_user_wishlist_cart, 
			'admin_sent_mail' => 'send mail successfully',
			'user_sent_mail' => 'send mail successfully',
			//'save_order_shipment' => $save_order_shipment,
			// 'decodedData' => $decodedData,			
			// 'data' => $jsonData,			
		];
	
		} else {
		$response = [
			'status' => 'error',
			'message' => 'Failed to save order.',
			'sent_mail_check' => 'not sent mail',
			//'save_order_shipment' => 'not save order shipment',
		];
		}
		\App::setLocale('en');
		return response()->json($response);
		
		
		// dd($status);
        // if($order)
     
        // $users=User::where('role','admin')->first();
        // $details=[
            // 'title'=>'New order created',
            // 'actionURL'=>route('order.show',$order->id),
            // 'fas'=>'fa-file-alt'
        // ];
        // Notification::send($users, new StatusNotification($details));
        // if(request('payment_method')=='paypal'){
            // return redirect()->route('payment')->with(['id'=>$order->id]);
        // }
        // else{
            // session()->forget('cart');
            // session()->forget('coupon');
        // }
        // Cart::where('user_id', auth()->user()->id)->where('order_id', null)->update(['order_id' => $order->id]);
       
        // request()->session()->flash('success','Your product successfully placed in order');
        // return redirect()->route('home');
    }
	
	

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $order=Order::getsingleOrderAPI($id);
		$order_number = !empty($order->order_number) ? $order->order_number : '';
		$order_user_id =  !empty($order->user_id) ? $order->user_id : '';
		$orderUserInfo = UserAddressInfo::where('user_id', $order_user_id)->first();
		//dd($orderUserInfo);
		$orderProducts = OrderProductMeta::with('product')->where('order_id', $order_number)->get();

        return view('backend.order.show')->with('order',$order)->with('orderUserInfo',$orderUserInfo)->with('orderProducts',$orderProducts);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $order=Order::find($id);
        return view('backend.order.edit')->with('order',$order);
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
        $order=Order::find($id);
        $this->validate($request,[
            'status'=>'required|in:new,process,delivered,cancel'
        ]);
        $data=$request->all();
        // return $request->status;
        if($request->status=='delivered'){
            foreach($order->cart as $cart){
                $product=$cart->product;
                // return $product;
                $product->stock -=$cart->quantity;
                $product->save();
            }
        }
        $status=$order->fill($data)->save();
        if($status){
            request()->session()->flash('success','Successfully updated order');
        }
        else{
            request()->session()->flash('error','Error while updating order');
        }
        return redirect()->route('order.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $order=Order::find($id);
        if($order){
            $status=$order->delete();
            if($status){
                request()->session()->flash('success','Order Successfully deleted');
            }
            else{
                request()->session()->flash('error','Order can not deleted');
            }
            return redirect()->route('order.index');
        }
        else{
            request()->session()->flash('error','Order can not found');
            return redirect()->back();
        }
    }

    public function orderTrack(){
        return view('frontend.pages.order-track');
    }

    public function productTrackOrder(Request $request){
        // return $request->all();
        $order=Order::where('user_id',auth()->user()->id)->where('order_number',$request->order_number)->first();
        if($order){
            if($order->status=="new"){
            request()->session()->flash('success','Your order has been placed. please wait.');
            return redirect()->route('home');

            }
            elseif($order->status=="process"){
                request()->session()->flash('success','Your order is under processing please wait.');
                return redirect()->route('home');
    
            }
            elseif($order->status=="delivered"){
                request()->session()->flash('success','Your order is successfully delivered.');
                return redirect()->route('home');
    
            }
            else{
                request()->session()->flash('error','Your order canceled. please try again');
                return redirect()->route('home');
    
            }
        }
        else{
            request()->session()->flash('error','Invalid order numer please try again');
            return back();
        }
    }

    // PDF generate
    public function pdf(Request $request){
        $order=Order::getAllOrder($request->id);
        // return $order;
        $file_name=$order->order_number.'-'.$order->first_name.'.pdf';
        // return $file_name;
        $pdf=PDF::loadview('backend.order.pdf',compact('order'));
        return $pdf->download($file_name);
    }
    // Income chart
    public function incomeChart(Request $request){
        $year=\Carbon\Carbon::now()->year;
        $items=Order::with(['cart_info'])->whereYear('created_at',$year)->where('status','completed')->get()
            ->groupBy(function($d){
                return \Carbon\Carbon::parse($d->created_at)->format('m');
            });
            // dd($items);
        $result=[];
        foreach($items as $month=>$item_collections){
            foreach($item_collections as $item){
				// dd($item);
                $amount=$item->sum('total_amount');
                $m=intval($month);
                // return $m;
                isset($result[$m]) ? $result[$m] += $amount :$result[$m]=$amount;
            }
        }
        $data=[];
        for($i=1; $i <=12; $i++){
            $monthName=date('F', mktime(0,0,0,$i,1));
            $data[$monthName] = (!empty($result[$i]))? number_format((float)($result[$i]), 2, '.', '') : 0.0;
        }
        return $data;
    }
	
    public function singleOrderShowAPi(Request $request){
        $order = Order::getsingleOrderAPI($request->id);
		$order_number = $order->order_number;
		$order_user_id = $order->user_id;
		$order['orderUserInfo'] = UserAddressInfo::where('user_id', $order_user_id)->first();
		$order['orderProducts'] = OrderProductMeta::with('product')->where('order_id', $order_number)->get();

	//	dd(asset('storage/app/public/6617c53ea9ed8.png'));

		if ($order) {
		return response()->json(['order' => $order]);
		} else {
		return response()->json(['message' => 'Order not found'], 404);
		}
    }
	
     public function allOrderByUserId(Request $request){
        $order_data =Order::getAllOrderByUsersAPI($request->id);
		//dd($order_data);
		if ($order_data) {
		return response()->json(['order_all_info' => $order_data]);
		} else {
		return response()->json(['message' => 'Order not found'], 404);
		}
    }


	public function awsBucketOrder(Request $request){
		$user_id = $request->user_id;

		$awsData = Aws3Bucket::groupBy('product_id')->pluck('product_id');


		$order = Order::join('orders_product_meta as meta', 'meta.order_id', '=', 'orders.order_number')
		->where('orders.user_id' , $user_id)
		->whereIn('meta.product_id', $awsData)
		->get();


		return response()->json(['status' => true, 'data' => $order]);
	}
}
