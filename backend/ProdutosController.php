<?php

require_once 'database.php';

class ProdutosController {
    private $conn;

    public function __construct() {
        $db = new Database();
        $this->conn = $db->getConnection(); 
    }

    public function getProdutos(){
        $sql = "SELECT * FROM produtos";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET'){
    $controller = new ProdutosController();
    $produtos = $controller->getProdutos();
    header('Content-Type: application/json');
    echo json_encode($produtos);
}

?>