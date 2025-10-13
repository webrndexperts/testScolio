<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderAddressInfo;
use App\Models\OrderProductMeta;
use App\Models\XrayImg;
use App\Models\Settings;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderEMail;

class OrderService
{
    /**
     * Store a new order with associated data
     *
     * @param array $orderData
     * @return array
     */
    public function storeOrder(array $orderData): array
    {
        App::setLocale($orderData['lang'] ?? 'en');

        $updatedGroupedProductAttributes = json_encode(
            $orderData['grouped_product_attributes'] ?? [],
            JSON_UNESCAPED_UNICODE
        );

        $orderMeta = $this->prepareOrderMeta($orderData, $updatedGroupedProductAttributes);

        if (!$this->validateOrderMeta($orderMeta)) {
            Log::error('Order creation failed: Required fields are missing', $orderMeta);
            return [
                'status' => 'error',
                'message' => 'Cannot create order: Required fields are missing.'
            ];
        }

        try {
            $order = $this->createOrder($orderMeta, $orderData);

            if (!$order) {
                return [
                    'status' => 'error',
                    'message' => 'Failed to save order.',
                    'sent_mail_check' => 'not sent mail'
                ];
            }

            $this->createOrderAddressInfo($order->id, $orderData);
            $this->createOrderProducts($order->order_number, $orderData['product_items']);
            $this->sendOrderEmails($order, $orderData, $updatedGroupedProductAttributes);

            return [
                'status' => 'true',
                'message' => 'Order successfully saved.',
                'order_id' => $order->id,
                'admin_sent_mail' => 'send mail successfully',
                'user_sent_mail' => 'send mail successfully'
            ];
        } catch (\Exception $e) {
            Log::error('Order creation failed: ' . $e->getMessage());
            return [
                'status' => 'error',
                'message' => 'Failed to save order: ' . $e->getMessage(),
                'sent_mail_check' => 'not sent mail'
            ];
        } finally {
            App::setLocale('en');
        }
    }

    /**
     * Prepare order meta data
     *
     * @param array $orderData
     * @param string $groupedProductAttributes
     * @return array
     */
    private function prepareOrderMeta(array $orderData, string $groupedProductAttributes): array
    {

        $paymentStatus = '';
        $status = 'pending';

        if ($orderData['payment_type'] === 'razorpay') {
            $paymentStatus = 'pending';
            $status = 'pending';
        } elseif (!empty($orderData['stripe_total_price'])) {
            $paymentStatus = 'new';
            $status = 'completed';
        } else {
            $paymentStatus = '';
            $status = '';
        }
        
        return [
            'user_id' => $orderData['userId'] ?? '',
            'payment_id' => $orderData['payment_id'] ?? '',
            'order_number' => $orderData['order_number'] ?? Str::random(6),
            'sub_total' => $orderData['sub_total'] ?? 0.00,
            'total_amount' => $orderData['total_amount'] ?? 0.00,
            'coupon' => ($orderData['coupon_price'] ?? false) ? $orderData['coupon_price'] : '',
            'discount_couponcode' => $orderData['discount_couponcode'] ?? '',
            'shipping_method_name' => $orderData['shipping_method_name'] ?? '',
            'shipping_id' => $orderData['shipping_id'] ?? '',
            'shipping_price' => $orderData['shippig_charges'] ?? 0.00,
            'quantity' => $orderData['quantity'] ?? '',
            'gst_tax' => $orderData['gst_tax'] ?? 0.00,
            'stripe_total_price' => $orderData['stripe_total_price'] ?? 0.00,
            'payment_method' => $orderData['payment_type'] ?? '',
            'payment_status' => $$paymentStatus,
            'status' => $status,
            'grouped_product_attributes' => $groupedProductAttributes,
            'lang' => $orderData['language'] ?? '',
            'sku' => $orderData['sku'] ?? '',
            'same_address' => $orderData['same_address'] ?? ''
        ];
    }

    /**
     * Validate required order meta fields
     *
     * @param array $orderMeta
     * @return bool
     */
    private function validateOrderMeta(array $orderMeta): bool
    {
        return !empty($orderMeta['user_id']) &&
            !empty($orderMeta['payment_id']) &&
            !empty($orderMeta['order_number']) &&
            isset($orderMeta['sub_total']) &&
            isset($orderMeta['total_amount']) &&
            isset($orderMeta['shipping_price']) &&
            isset($orderMeta['payment_method']);
    }

    /**
     * Create order and related X-ray records
     *
     * @param array $orderMeta
     * @param array $orderData
     * @return Order|null
     */
    private function createOrder(array $orderMeta, array $orderData): ?Order
    {
        $order = Order::create($orderMeta);
        Log::info('Order created with ID:', [$order->id]);

        foreach ($orderData['product_items'] as $item) {
            if (isset($item['xray_upload_id'])) {
                XrayImg::where('id', $item['xray_upload_id'])
                    ->update([
                        'order_id' => $order->id,
                        'status' => 'completed'
                    ]);
            }
        }

        return $order;
    }

    /**
     * Create order address information
     *
     * @param int $orderId
     * @param array $orderData
     * @return void
     */
    private function createOrderAddressInfo(int $orderId, array $orderData): void
    {
        $billingData = [
            'firstName' => $orderData['firstName'] ?? '',
            'lastName' => $orderData['lastName'] ?? '',
            'email' => $orderData['email'] ?? '',
            'company' => $orderData['company'] ?? '',
            'state' => $orderData['state'] ?? '',
            'country' => $orderData['country'] ?? '',
            'postcode' => $orderData['postcode'] ?? '',
            'city' => $orderData['town'] ?? '',
            'address_1' => $orderData['street'] ?? '',
            'address_2' => $orderData['apartment'] ?? '',
            'phone' => $orderData['phone'] ?? ''
        ];

        $shippingData = $orderData['same_address'] ? $billingData : [
            'firstName' => $orderData['shippingFirstName'] ?? '',
            'lastName' => $orderData['shippingLastName'] ?? '',
            'country' => $orderData['shippingCountry'] ?? '',
            'address_1' => $orderData['shippingStreet'] ?? '',
            'address_2' => $orderData['shippingApartment'] ?? '',
            'city' => $orderData['shippingTown'] ?? '',
            'state' => $orderData['shippingState'] ?? '',
            'postcode' => $orderData['shippingPostcode'] ?? '',
            'phone' => $orderData['shippingPhone'] ?? ''
        ];

        OrderAddressInfo::create([
            'order_id' => $orderId,
            'billing_first_name' => $billingData['firstName'],
            'billing_last_name' => $billingData['lastName'],
            'billing_email' => $billingData['email'],
            'company' => $billingData['company'],
            'billing_address_1' => $billingData['address_1'],
            'billing_address_2' => $billingData['address_2'],
            'billing_city' => $billingData['city'],
            'billing_state' => $billingData['state'],
            'billing_country' => $billingData['country'],
            'billing_postcode' => $billingData['postcode'],
            'billing_phone' => $billingData['phone'],
            'shipping_first_name' => $shippingData['firstName'],
            'shipping_last_name' => $shippingData['lastName'],
            'shipping_address_1' => $shippingData['address_1'],
            'shipping_address_2' => $shippingData['address_2'],
            'shipping_city' => $shippingData['city'],
            'shipping_state' => $shippingData['state'],
            'shipping_country' => $shippingData['country'],
            'shipping_postcode' => $shippingData['postcode'],
            'shipping_phone' => $shippingData['phone']
        ]);
    }

    /**
     * Create order product records
     *
     * @param string $orderNumber
     * @param array $productItems
     * @return void
     */
    private function createOrderProducts(string $orderNumber, array $productItems): void
    {
        foreach ($productItems as $item) {
            OrderProductMeta::create([
                'order_id' => $orderNumber,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'status' => 'active'
            ]);
        }
    }

    /**
     * Send order confirmation emails
     *
     * @param Order $order
     * @param array $orderData
     * @param string $groupedProductAttributes
     * @return void
     */
    private function sendOrderEmails(Order $order, array $orderData, string $groupedProductAttributes): void
    {
        $orderMailProducts = OrderProductMeta::with('product')
            ->where('order_id', $orderData['order_number'])
            ->get();

        $orderInfoMail = [
            'firstName' => $orderData['firstName'] ?? '',
            'lastName' => $orderData['lastName'] ?? '',
            'order_number' => $orderData['order_number'] ?? '',
            'quantity' => $orderData['quantity'] ?? '',
            'price' => $orderData['sub_total'] ?? 0.00,
            'total_amount' => $orderData['total_amount'] ?? 0.00,
            'gst_tax' => $orderData['gst_tax'] ?? 0.00,
            'total_price' => $orderData['sub_total'] ?? 0.00,
            'country' => $orderData['country'] ?? '',
            'postcode' => $orderData['postcode'] ?? '',
            'city' => $orderData['town'] ?? '',
            'street' => $orderData['street'] ?? '',
            'coupon_discount' => $orderData['coupon_price'] ?? '',
            'phone' => $orderData['phone'] ?? '',
            'email' => $orderData['email'] ?? '',
            'grouped_product_attributes' => $groupedProductAttributes,
            'payment_method' => $orderData['payment_type'] ?? '',
            'created_order_date' => $order->created_at->format('F d, Y'),
            'shipping_method_name' => $orderData['shipping_method_name'] ?? 'Store Pick Up',
            'shipping_price' => $orderData['shippig_charges'] ?? '',
            'ordermailProducts' => $orderMailProducts
        ];

        $settings = Settings::first();
        $recipientEmail = $settings->email ?? 'clinic.sg@scoliolife.com';
        $ccEmail = ['drkevinlau@scoliolife.com', 'webrndexperts@gmail.com'];

        try {
            Mail::to($orderData['email'])->send(new OrderEMail($orderInfoMail));
            // Mail::to($recipientEmail)->cc($ccEmail)->send(new OrderEMail($orderInfoMail));
        } catch (\Exception $e) {
            Log::error('Mail sending failed: ' . $e->getMessage());
        }
    }


    private function getOrderData(Order $order): array
    {
        $orderAddress = $order->order_address_info;
        $productItems = $order->order_productmeta_info->map(function ($meta) {
            return [
                'product_id' => $meta->product_id,
                'quantity' => $meta->quantity,
                'title' => $meta->product->title ?? '',
                'slug' => $meta->product->slug ?? '',
                'sku' => $meta->product->sku ?? '',
                'price' => $meta->product->price ?? 0.00,
                'dimension_length' => $meta->product->dimension_length ?? 0,
                'dimension_width' => $meta->product->dimension_width ?? 0,
                'dimension_height' => $meta->product->dimension_height ?? 0,
                'product_actual_weight' => $meta->product->product_actual_weight ?? 0,
            ];
        })->toArray();

        return [
            'userId' => $order->user_id,
            'payment_id' => $order->payment_id,
            'order_number' => $order->order_number,
            'sub_total' => $order->sub_total,
            'total_amount' => $order->total_amount,
            'coupon_price' => $order->coupon,
            'discount_couponcode' => $order->discount_couponcode,
            'shipping_method_name' => $order->shipping_method_name,
            'shipping_id' => $order->shipping_id,
            'shippig_charges' => $order->shipping_price,
            'quantity' => $order->quantity,
            'gst_tax' => $order->gst_tax,
            'stripe_total_price' => $order->stripe_total_price,
            'payment_type' => $order->payment_method,
            'payment_status' => $order->payment_status,
            'status' => $order->status,
            'grouped_product_attributes' => json_decode($order->grouped_product_attributes, true),
            'lang' => $order->lang,
            'sku' => $order->sku,
            'same_address' => $order->same_address,
            'product_items' => $productItems,
            'firstName' => $orderAddress->billing_first_name ?? '',
            'lastName' => $orderAddress->billing_last_name ?? '',
            'email' => $orderAddress->billing_email ?? '',
            'company' => $orderAddress->company ?? '',
            'state' => $orderAddress->billing_state ?? '',
            'country' => $orderAddress->billing_country ?? '',
            'postcode' => $orderAddress->billing_postcode ?? '',
            'town' => $orderAddress->billing_city ?? '',
            'street' => $orderAddress->billing_address_1 ?? '',
            'apartment' => $orderAddress->billing_address_2 ?? '',
            'phone' => $orderAddress->billing_phone ?? '',
            'shippingFirstName' => $orderAddress->shipping_first_name ?? '',
            'shippingLastName' => $orderAddress->shipping_last_name ?? '',
            'shippingCountry' => $orderAddress->shipping_country ?? '',
            'shippingStreet' => $orderAddress->shipping_address_1 ?? '',
            'shippingApartment' => $orderAddress->shipping_address_2 ?? '',
            'shippingTown' => $orderAddress->shipping_city ?? '',
            'shippingState' => $orderAddress->shipping_state ?? '',
            'shippingPostcode' => $orderAddress->shipping_postcode ?? '',
            'shippingPhone' => $orderAddress->shipping_phone ?? '',
            'productType' => $productItems[0]['productType'] ?? 'normal',
        ];
    }
}