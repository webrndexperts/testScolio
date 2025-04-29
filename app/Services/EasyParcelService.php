<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Promise;
class EasyParcelService
{
    protected $apiKey;
    protected $apiUrl;
    protected $client;

    public function __construct()
    {
        $this->apiKey = env('EASYPARCEL_API_KEY');
        $this->apiUrl = env('EASYPARCEL_API_URL');
        $this->client = new Client(['base_uri' => $this->apiUrl]);
        ini_set('max_execution_time', 120);

    }

    /**
     * Get available courier rates using Guzzle HTTP
     */

    public function getCourierRates($products)
    {

        $action = "EPRateCheckingBulk";
        $url = "?ac=$action"; // EasyParcel API structure
        $bulkData = [];

        foreach ($products as $product) {
            $bulkData[] = [
                'pick_code' => $product['pick_code'],
                'pick_state' => $product['pick_state'],
                'pick_country' => $product['pick_country'],
                'send_code' => $product['send_code'],
                'send_state' => $product['send_state'],
                'send_country' => $product['send_country'],
                'weight' => $product['weight'],
                'width' => $product['width'] ?? '0',
                'length' => $product['length'] ?? '0',
                'height' => $product['height'] ?? '0',
                'date_coll' => $product['date_coll'] ?? date('Y-m-d'),
            ];
        }

        $postData = [
            'api' => $this->apiKey,
            'bulk' => $bulkData,
            'exclude_fields' => ['rates.*.pickup_point'],
        ];

        try {
            \Log::info('Sending EasyParcel Request: ', $postData);

            // Asynchronous request using Guzzle promises
            $promise = $this->client->postAsync($url, [
                'form_params' => $postData,
                'headers' => [
                    'Accept' => 'application/json',
                    'Content-Type' => 'application/x-www-form-urlencoded',
                ],
                'timeout' => 60,  // Ensure the request has enough time
                'connect_timeout' => 30, // Ensure connection timeout is handled
            ]);

            // Wait for the promise to resolve
            $response = $promise->wait();

            // Decode the response body
            $result = json_decode($response->getBody()->getContents(), true);

            return $result;
        } catch (RequestException $e) {
            \Log::error('Error Received', ['response' => $e->getMessage()]);

            return [
                'error' => 'Request failed',
                'message' => $e->getMessage(),
            ];
        }
    }




    /**
     * Create a shipment order 
     */
    public function createOrder($orders)
    {
        $action = "EPSubmitOrderBulk";
        $url = "?ac=$action";

        $postData = [
            'api' => $this->apiKey,
            'bulk' => $orders,
        ];

        try {
            $response = $this->client->post($url, [
                'form_params' => $postData,
                'headers' => ['Accept' => 'application/json'],
            ]);

            return json_decode($response->getBody()->getContents(), true);
        } catch (RequestException $e) {
            return ['error' => 'Request failed', 'message' => $e->getMessage()];
        }
    }


    /**
     * Make Payment for an Order
     */
    public function payOrder($orderNumbers)
    {
        $action = "EPPayOrderBulk";
        $url = "?ac=$action";

        $bulkOrders = array_map(function ($order) {
            return ['order_no' => $order];
        }, $orderNumbers);

        $postData = [
            'api' => $this->apiKey,
            'bulk' => $bulkOrders,
        ];

        try {
            $response = $this->client->post($url, [
                'form_params' => $postData,
                'headers' => ['Accept' => 'application/json'],
            ]);

            return json_decode($response->getBody()->getContents(), true);
        } catch (RequestException $e) {
            return ['error' => 'Request failed', 'message' => $e->getMessage()];
        }
    }
}
