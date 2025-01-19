<?php
require_once 'database.php';

$db = new Database();
$conn = $db->getConnection();

if ($conn) {
    echo "Conexão bem-sucedida!";
} else {
    echo "Erro ao conectar.";
}
?>