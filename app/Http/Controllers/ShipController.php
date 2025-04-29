<?php

namespace App\Http\Controllers;

use App\Services\EasyParcelService;
use Illuminate\Http\Request;

class ShipController extends Controller
{

    protected $easyParcel;

    public function __construct(EasyParcelService $easyParcel)
    {
        $this->easyParcel = $easyParcel;
    }

    public function getCourierRates(Request $request)
    {


        $postData = $request->all();
        $data = [];
        foreach ($postData as $value) {
            $data[] = [
                "pick_code" => "58000",
                "pick_state" => "kul",
                "pick_country" => "MY",
                "send_code" => $value['send_code'],
                "send_state" => $value['send_state'],
                "send_country" => $value['send_country'],
                "weight" => $value['weight'],
                "date_coll" => $value['date_coll'] ?? now()->format('Y-m-d')
            ];
        }
        // dd($data);

        try {
            $rates = $this->easyParcel->getCourierRates($data);
            if ($rates['api_status'] === 'Error') {
                return response()->json(['error' => $rates['error_remark']], 500);
            }
            if (isset($rates['result'][0]['rates']) && is_array($rates['result'][0]['rates'])) {

                usort($rates['result'][0]['rates'], function ($a, $b) {
                    return $a['price'] <=> $b['price'];
                });
                if ($postData[0]['send_country'] === 'MY') {
                    $storePickup = [
                        "rate_id" => "STORE-PICKUP-MY",
                        "service_detail" => "pickup",
                        "service_name" => "Store Pick Up: Free (Unit 7-6, Level 6, Boulevard Signature Office, Malaysia 58000)",
                        "service_id" => "JTnv9o0zKC-STORE-PICKUP-MY",
                        "courier_name" => "Store Pick Up: Free (Unit 7-6, Level 6, Boulevard Signature Office, Malaysia 58000)",
                        "delivery" => "Instant Pickup",
                        "price" => "0.00",
                        "shipment_price" => "0.00",
                        "shipment_tax" => "0.00",
                    ];
                    array_unshift($rates['result'][0]['rates'], $storePickup);
                }
            } else {
                $rates['result'][0]['rates'] = [];
            }
            return response()->json($rates);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }

    }


    public function createOrder(Request $request)
    {
        $orders = $request->input('orders');

        if (!is_array($orders) || empty($orders)) {
            return response()->json(['error' => 'Invalid order data'], 400);
        }

        $response = $this->easyParcel->createOrder($orders);
        \Log::info('createOrder response', ['response' => $response]);
        return response()->json($response);
    }


    public function payOrder(Request $request)
    {
        $orderNumbers = $request->input('order_numbers');

        if (!is_array($orderNumbers) || empty($orderNumbers)) {
            return response()->json(['error' => 'Invalid order numbers'], 400);
        }

        $response = $this->easyParcel->payOrder($orderNumbers);

        return response()->json($response);
    }
}
