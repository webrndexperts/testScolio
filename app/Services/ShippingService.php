<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class ShippingService
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client();
    }

    /**
     * Create shipment for order
     *
     * @param array $orderData
     * @return array
     */
    public function createShipment(array $orderData): array
    {
        // Check for store pickup
        if (($orderData['shipping_id'] ?? '') === 'store-pick-up-e89b-426614174000') {
            return [
                'status' => 'true',
                'message' => 'No shipping created for store pickup.'
            ];
        }

        if ($orderData['productType'] !== 'normal' || !$this->hasValidDimensions($orderData)) {
            return [
                'status' => 'skipped',
                'message' => 'No shipment required or invalid dimensions'
            ];
        }

        try {
            $response = $this->client->request('POST', 'https://api.easyship.com/2023-01/shipments', [
                'body' => json_encode($this->prepareShipmentData($orderData)),
                'headers' => [
                    'accept' => 'application/json',
                    'authorization' => 'Bearer prod_aCe51Xp2E13KzAj4VONiGU8lBzSZ8Fsr5QXSbCF9x+Q=',
                    'content-type' => 'application/json'
                ]
            ]);

            $body = $response->getBody();
            $body->rewind();
            $jsonData = $body->getContents();
            $decodedData = json_decode($jsonData, true);

            return [
                'status' => 'success',
                'message' => 'Shipment created successfully',
                'data' => $jsonData,
                'decodedData' => $decodedData
            ];
        } catch (\Exception $e) {
            Log::error('Shipment creation failed: ' . $e->getMessage());
            return [
                'status' => 'error',
                'message' => 'Failed to create shipment: ' . $e->getMessage(),
                'data' => null
            ];
        }
    }

    /**
     * Check if order has valid dimensions for shipping
     *
     * @param array $orderData
     * @return bool
     */
    private function hasValidDimensions(array $orderData): bool
    {
        return !empty($orderData['product_actual_weight']) ||
               !empty($orderData['dimension_height']) ||
               !empty($orderData['dimension_length']) ||
               !empty($orderData['dimension_width']);
    }

    /**
     * Prepare shipment data for API request
     *
     * @param array $orderData
     * @return array
     */
    private function prepareShipmentData(array $orderData): array
    {
        $parcels = [];
        foreach ($orderData['product_items'] as $item) {
            $parcels[] = [
                'box' => [
                    'slug' => $item['slug'] ?? '',
                    'length' => $item['dimension_length'] ?? 0,
                    'width' => $item['dimension_width'] ?? 0,
                    'height' => $item['dimension_height'] ?? 0
                ],
                'items' => [
                    [
                        'description' => $item['title'] ?? '',
                        'category' => 'Health & Beauty',
                        'sku' => $item['sku'] ?? '',
                        'quantity' => $item['quantity'] ?? 1,
                        'declared_customs_value' => $item['price'] ?? 0.00,
                        'declared_currency' => 'SGD',
                        'actual_weight' => $orderData['product_actual_weight'] ?? 0,
                        'origin_country_alpha2' => $orderData['country'] ?? ''
                    ]
                ],
                'total_actual_weight' => $orderData['product_actual_weight'] ?? ''
            ];
        }

        $fullName = ($orderData['firstName'] ?? '') . ' ' . ($orderData['lastName'] ?? '');

        return [
            'origin_address' => [
                'state' => null,
                'city' => 'Singapore',
                'company_name' => 'ScolioLife Pte Ltd',
                'contact_email' => 'drkevinlau@scoliolife.com',
                'contact_phone' => '+852-3008-5678',
                'contact_name' => 'Kevin Lau',
                'postal_code' => '238862',
                'country_alpha2' => 'SG',
                'line_1' => '302 Orchard Rd10-02',
                'line_2' => 'Tong Building'
            ],
            'destination_address' => [
                'state' => $orderData['state'] ?? null,
                'city' => $orderData['town'] ?? '',
                'company_name' => $orderData['company'] ?? '',
                'contact_email' => $orderData['email'] ?? '',
                'contact_phone' => $orderData['phone'] ?? '',
                'contact_name' => $fullName,
                'postal_code' => $orderData['postcode'] ?? '',
                'country_alpha2' => $orderData['country'] ?? '',
                'line_1' => $orderData['street'] ?? '',
                'line_2' => $orderData['apartment'] ?? ''
            ],
            'incoterms' => 'DDU',
            'insurance' => [
                'is_insured' => false
            ],
            'courier_selection' => [
                'allow_courier_fallback' => false,
                'apply_shipping_rules' => true,
                'selected_courier_id' => $orderData['shipping_id'] ?? ''
            ],
            'courier' => [
                'id' => $orderData['shipping_id'] ?? '',
                'name' => $orderData['shipping_method_name'] ?? ''
            ],
            'shipping_settings' => [
                'additional_services' => [
                    'qr_code' => 'none'
                ],
                'units' => [
                    'weight' => 'g',
                    'dimensions' => 'cm'
                ],
                'buy_label' => false,
                'buy_label_synchronous' => false,
                'printing_options' => [
                    'format' => 'png',
                    'label' => '4x6',
                    'commercial_invoice' => 'A4',
                    'packing_slip' => '4x6'
                ]
            ],
            'order_data' => [
                'buyer_selected_courier_name' => $orderData['shipping_method_name'] ?? ''
            ],
            'parcels' => $parcels
        ];
    }
}