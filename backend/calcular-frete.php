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

            'Authorization' => 'Bearer token',

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
