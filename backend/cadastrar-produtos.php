<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once 'database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    try{
        $db = new Database();
        $conn = $db->getConnection();

        $nome = $_POST['nome'] ?? null;
        $preco = $_POST['preco'] ?? null;
        $descricao = $_POST['descricao'] ?? null;
        $imagem = $_POST['imagem'] ?? null;
        $data_cadastro = date('Y-m-d H:i:s');

        if (empty ($nome) || empty($preco)) {
            echo json_encode(['message' => 'Por favor, preencha todos os campos obrigatórios']);
            exit;
        }

        $sql = "INSERT INTO produtos (nome, preco, descricao, imagem, data_cadastro) VALUES (:nome, :preco, :descricao, :imagem, :data_cadastro)";
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':preco', $preco);
        $stmt->bindParam(':descricao', $descricao);
        $stmt->bindParam(':imagem', $imagem);
        $stmt->bindParam(':data_cadastro', $data_cadastro);

        $stmt->execute();

        echo json_encode(['message' => 'Produto cadastrado com sucesso!']);

    }catch(PDOException $e){
        echo json_encode(['message' => 'Erro ao cadastrar produto: ' . $e->getMessage()]);
    }

} else {
    echo json_encode(['message' => 'Método não permitido']);
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Produtos</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        form {
            width: 300px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            background-color: #f9f9f9;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input, textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 14px;
        }
        button {
            width: 100%;
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <h2>Cadastro de Produtos</h2>
    <form method="POST" enctype="multipart/form-data">
        <!-- Nome do Produto -->
        <label for="nome">Nome do Produto:</label>
        <input type="text" id="nome" name="nome" required>

        <!-- Preço -->
        <label for="preco">Preço (R$):</label>
        <input type="number" id="preco" name="preco" step="0.01" required>

        <!-- Descrição -->
        <label for="descricao">Descrição:</label>
        <textarea id="descricao" name="descricao" rows="4" required></textarea>

        <!-- Imagem -->
        <label for="imagem">Imagem do Produto (URL):</label>
        <input type="text" id="imagem" name="imagem">

        <!-- Botão de Enviar -->
        <button type="submit">Cadastrar Produto</button>
    </form>
</body>
</html>