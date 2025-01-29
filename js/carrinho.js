document.addEventListener("DOMContentLoaded", function() {
    const carrinhoContainer = document.getElementById("carrinho-container");
    const carrinhoVazio = document.getElementById("carrinho-vazio");

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    function exibirCarrinho(){
        carrinhoContainer.innerHTML = "";

        if(carrinho.length === 0){
            carrinhoVazio.style.display = "block";
            return;
        }

        carrinhoVazio.style.display = "none";

        carrinho.forEach(produto => {
            const produtoDiv = document.createElement("div");
            produtoDiv.classList.add("carrinho-item");

            produtoDiv.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}" class="carrinho-item-img">
                <div class="carrinho-item-info">
                    <h3>${produto.nome}</h3>
                    <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
                    <p>Quantidade: ${produto.quantidade}</p>
                    <button class="btn-remover" data-id="${produto.id}">Remover</button>
                </div>
            `;

            carrinhoContainer.appendChild(produtoDiv);
        });

        document.querySelectorAll(".btn-remover").forEach(button => {
            button.addEventListener("click", removerProduto);
        });
    }

    function removerProduto(event) {
        const produtoId = event.target.dataset.id;

        carrinho = carrinho.filter(produto => produto.id !== produtoId);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        exibirCarrinho();
    }

    exibirCarrinho();
});