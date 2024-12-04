<?php
// app/Services/EasyshipService.php

namespace App\Services;

use GuzzleHttp\Client;

class EasyshipService
{
    protected $client;
    protected $apiKey;
    protected $apiSecret;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://api.easyship.com/v1/',
        ]);

        $this->apiKey = config('easyship.api_key');
        $this->apiSecret = config('easyship.api_secret');
    }

 public function getShippingRates($weight, $destinationCountry)
{
    // Set up the request headers with your API key
    $headers = [
        'Authorization' => 'Bearer ' . $this->apiKey,
        'Content-Type' => 'application/json',
    ];

    // Set up the request parameters
    $params = [
        'query' => [
            'weight' => $weight,
            'destination_country' => $destinationCountry,
            // Add any other required parameters based on Easyship API documentation
        ],
        'headers' => $headers,
    ];

    try {
        // Make the API request
        $response = $this->client->get('rates', $params);

        // Decode the JSON response
        return json_decode($response->getBody(), true);
    } catch (\GuzzleHttp\Exception\ClientException $e) {
        // Handle client errors (4xx) here
        return [
            'error' => $e->getMessage(),
            'status_code' => $e->getCode(),
        ];
    } catch (\GuzzleHttp\Exception\ServerException $e) {
        // Handle server errors (5xx) here
        return [
            'error' => $e->getMessage(),
            'status_code' => $e->getCode(),
        ];
    }
}

    // Add more methods for creating shipments, tracking, etc.
}
?>