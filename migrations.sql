CREATE TABLE `loja-bebidas`.produtos (
	id INT auto_increment NOT NULL,
	nome varchar(100) NOT NULL,
	descricao TEXT NULL,
	preco DECIMAL(10, 2) NOT NULL,
	imagem varchar(100) NULL,
	data_cadastro TIMESTAMP NULL,
	CONSTRAINT produtos_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;
