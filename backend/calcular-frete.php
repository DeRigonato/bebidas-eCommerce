<?php
require_once('vendor/autoload.php');
use GuzzleHttp\Client;

header('Content-Type: application/json');

try{
    $data = json_decode( file_get_contents('php://input'), true);

    if(!isset($data['cepDestino']) || !preg_match('/\d{8}$/', $data['cepDestino'])){
        throw new Exception("CEP inválido");
    }

    $client = new Client();

    $reponse = $client->request('POST', 'https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate',[
        'body' => json_encode([
            'from' =>['postal_code' => '13256540'],
            'to' => ['postal_code' => $data['cepDestino']],
            'package' => [
                'height' => 4,
                'width' => 12,
                'length' => 17,
                'weight' => 0.3
            ]
        ]),
        'headers' => [
            'Accept' => 'application/json',

            'Authorization' => 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NTYiLCJqdGkiOiIyZTllYTFiZWIwYWRkM2UyZWRkYzFiMDQzMzI4NmJhMTExMTU3ZTU0MWFlOWFhMTU2MjFiOTc5MjFiZTY4M2FhMDM4ZDlkZTRkZDdlOTU2NiIsImlhdCI6MTczNzgyNDY2MS44MjgwMTIsIm5iZiI6MTczNzgyNDY2MS44MjgwMTUsImV4cCI6MTc2OTM2MDY2MS44MTU2NDUsInN1YiI6IjllMGRkOWRiLTlmZjktNGUzMS04OTAwLTc0M2FlOGM2NTZkZCIsInNjb3BlcyI6WyJzaGlwcGluZy1jYWxjdWxhdGUiXX0.DBNJ9zAxXXfb7Kh3IAIv4JWfaPsOJjdeCFJpSawHLgerixVlGbkfJqZVeNNDovieZWqD2cWG08h6wV5KrvdsmEQGqQ4kbjXUB7X4cBTzXkPPySyYxPYRFtp0eYBXJLTCEHkD4X3N8PFaTyy33zWaXFqD8envCc5rEiebtLSEAisUjdH22k5xN5qH9-8DHesKBAybRH1rwYSVk9v0ErXkiP4tlrNdhkmA6S5MixXoXfEPHL8sPEBTzWWz2vhGTJQCWuYBPC-l234mEpg30J9f42HGdFAFtLnEP3SzfU1X2dDa2xfOvOBg_CUjqvPA19qiPVXEuV-8qIWCbV0XFd2z5LRASvYnRJRVGPBzxSgsZQKC-127dEMseY8pAyPBPp1w_-2aXxsTjavOJi3tCmq_3LiylviMKtVPIrDmeXVlVHes3jLRN8C4ia7tysT5WRAlwKDywptLHDjZaXrdTxnVR0-DiD7av1Ty_w0CQSUSxrvP7FkPKoDtxD3Gwf8ne5E0k8HRFSkbVlRkeEdJvgg1-FaxoniQOe2d0fcFNd06DxItUC2OfKcHz4eyJNJwOMxp4rsvZwrOmaXeKnfRCzFj6ZkmTWoQQMXYu4jM_YtmHHv4PmTjJObVxgdjAaD7l9hQGBTiR9xX0GcUQIsuiVhm0AFQP1dQiJJa1jf34yCDiTI',

            'Content-Type' => 'application/json',
            'User-Agent' => 'Aplicação (al.g.regonato@gmail.com)'
        ],
    ]);

    $data = json_decode($reponse->getBody(), true);

    if(is_array($data)){
        echo json_encode(array_slice($data, 1, 2));
    } else {
        throw new Exception("Resposta da API inválida");
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMassage()]);
}