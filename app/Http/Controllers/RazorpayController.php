<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Razorpay\Api\Api;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class RazorpayController extends Controller
{
    public function createOrder(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'amount' => 'required|numeric|min:1',
            'currency' => 'required|string|size:3',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            // Determine environment
            $mode = env('REACT_APP_PAYMENT_MODE', 'test');

            $key = $mode === 'test' ? env('RAZORPAY_KEY_DEV') : env('RAZORPAY_KEY_LIVE');
            $secret = $mode === 'test' ? env('RAZORPAY_SECRET_DEV') : env('RAZORPAY_SECRET_LIVE');

            // Initialize Razorpay API
            $api = new Api($key, $secret);

            // Create the order
            $orderData = [
                'receipt' => 'rcptid_' . time(),
                'amount' => (int) round($request->amount * 100),
                'currency' => strtoupper($request->currency),
                'payment_capture' => 1,
            ];

            $razorpayOrder = $api->order->create($orderData);

            Log::info('Razor Pay Order Created', [
                'razorpay_order' => $razorpayOrder
            ]);

            return response()->json([
                'success' => true,
                'order_id' => $razorpayOrder['id'],
                'razorpay_key' => $key,
                'amount' => $razorpayOrder['amount'],
                'currency' => $razorpayOrder['currency']
            ]);
        } catch (\Exception $e) {
            // Log error for debugging
            Log::error('Razorpay Order Creation Failed', [
                'error_message' => $e->getMessage(),
                'error_code' => $e->getCode(),
                'error_file' => $e->getFile(),
                'error_line' => $e->getLine(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to create Razorpay order. Please try again.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function verifyPayment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'razorpay_payment_id' => 'required|string',
            'razorpay_order_id' => 'required|string',
            'razorpay_signature' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $mode = env('REACT_APP_PAYMENT_MODE', 'test');
            $secret = $mode === 'test' ? env('RAZORPAY_SECRET_DEV') : env('RAZORPAY_SECRET_LIVE');
            $api = new Api(env('RAZORPAY_KEY_DEV'), $secret);

            $attributes = [
                'razorpay_order_id' => $request->razorpay_order_id,
                'razorpay_payment_id' => $request->razorpay_payment_id,
                'razorpay_signature' => $request->razorpay_signature,
            ];

            $api->utility->verifyPaymentSignature($attributes);

            // Signature is valid, process the payment (e.g., update order status, save payment details)
            Log::info('Payment Verified', $attributes);

            return response()->json([
                'success' => true,
                'message' => 'Payment verified successfully',
            ]);
        } catch (\Exception $e) {
            Log::error('Payment Verification Failed', [
                'error_message' => $e->getMessage(),
                'request_data' => $request->all(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Payment verification failed',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function callback(Request $request)
    {
        Log::info('Callback Data recived', ['data' => $request->all()]);
        $orderId = data_get($request->all(), 'payload.payment.entity.order_id');
        $paymentId = data_get($request->all(), 'payload.payment.entity.id');

        $order = Order::where('payment_id', $orderId)->first();
        $order->payment_status = 'completed';
        $order->payment_id = $paymentId;

        $order->save();
        // try {
        //     $mode = env('REACT_APP_PAYMENT_MODE', 'test');
        //     $secret = $mode === 'test' ? env('RAZORPAY_SECRET_DEV') : env('RAZORPAY_SECRET_LIVE');
        //     $api = new Api(env('RAZORPAY_KEY_DEV'), $secret);
        //     $attributes = [
        //         'razorpay_order_id' => $request->razorpay_order_id,
        //         'razorpay_payment_id' => $request->razorpay_payment_id,
        //         'razorpay_signature' => $request->razorpay_signature,
        //     ];

        //     $api->utility->verifyPaymentSignature($attributes);
        //     // ...
        //     return response()->json([
        //         'success' => true,
        //         'message' => 'Payment verified successfully',
        //         'data' => $attributes
        //     ]);

        // } catch (\Exception $e) {
        //     Log::error('Payment Verification Failed', [
        //         'error_message' => $e->getMessage(),
        //         'request_data' => $request->all(),
        //     ]);

        //     return response()->json([
        //         'success' => false,
        //         'message' => 'Payment verification failed',
        //         'error' => $e->getMessage(),
        //     ], 400);
        // }
    }
}
