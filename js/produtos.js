document.addEventListener("DOMContentLoaded", async function () {
    const produtosContainer = document.getElementById("produtos"); 

    try {
        const response = await fetch('http://localhost/loja-bebidas/backend/produtosController.php');
        if (!response.ok) {
            throw new Error("Erro ao buscar os produtos");
        }

        const produtos = await response.json();

        produtos.forEach(produto => {
            const produtoDiv = document.createElement("div");
            produtoDiv.classList.add("Pproduct"); 

            
            produtoDiv.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>R$ ${parseFloat(produto.preco).toFixed(2)}</p>
                <button 
                    class="btn-buy"
                    data-id="${produto.id}"
                    data-nome="${produto.nome}"
                    data-preco="${produto.preco}"
                    data-imagem="${produto.imagem}">
                    Comprar
                </button>
            `;

            produtosContainer.appendChild(produtoDiv); 
        });

        document.querySelectorAll(".btn-buy").forEach(button => {
            button.addEventListener('click', function(){

                adicionarAoCarrinho(this.dataset);
            });
                
        });
    } catch (error) {
        produtosContainer.innerHTML = `<p>Erro: ${error.message}</p>`; 
    }
});