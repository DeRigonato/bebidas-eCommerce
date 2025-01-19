document.addEventListener("DOMContentLoaded", async function () {
    const produtosContainer = document.getElementById("produtos"); // Ponto de inserção

    try {
        const response = await fetch('http://localhost/loja-bebidas/backend/produtosController.php');
        if (!response.ok) {
            throw new Error("Erro ao buscar os produtos");
        }

        const produtos = await response.json();

        produtos.forEach(produto => {
            const produtoDiv = document.createElement("div");
            produtoDiv.classList.add("Pproduct"); // Classe atualizada para cada produto

            // Estrutura HTML de cada produto
            produtoDiv.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>R$ ${parseFloat(produto.preco).toFixed(2)}</p>
                <button class="btn-buy">Comprar</button>
            `;

            produtosContainer.appendChild(produtoDiv); // Adiciona o produto ao container
        });
    } catch (error) {
        produtosContainer.innerHTML = `<p>Erro: ${error.message}</p>`; // Mostra o erro caso ocorra
    }
});