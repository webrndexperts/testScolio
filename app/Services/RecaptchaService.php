<?php

namespace App\Services;

use Exception;
use GuzzleHttp\Client;

class RecaptchaService
{
    protected $httpClient;
    protected $secretKey;

    public function __construct(string $secretKey)
    {
        $this->httpClient = new Client();
        $this->secretKey = $secretKey;
    }

    public function verify(string $token): array
    {
        try {
            $response = $this->httpClient->post("https://www.google.com/recaptcha/api/siteverify?secret=$this->secretKey&response=$token");
            
            $data = json_decode($response->getBody()->getContents(), true);

            return [
                'success' => $data['success'] ?? false,
                'score' => $data['score'] ?? null,
                'message' => $data['error-codes'] ?? null,
                'data' => $data ?? null
            ];
        } catch (Exception $e) {

            return [
                'success' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

}
