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

        let total = 0;

        carrinho.forEach(produto => {
            const produtoDiv = document.createElement("div");
            produtoDiv.classList.add("carrinho-item");

            const subtotal = produto.preco * produto.quantidade;
            total += subtotal;

            produtoDiv.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}" class="carrinho-item-img">
                <div class="carrinho-item-info">
                    <h3>${produto.nome}</h3>
                    <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
                    <p>Quantidade: ${produto.quantidade}</p>
                    <div class="quantidade-controle">
                        <button class="btn-diminuir" data-id="${produto.id}">-</button>
                        <span class="quantidade">${produto.quantidade}</span>
                        <button class="btn-aumentar" data-id="${produto.id}">+</button>
                    </div>
                    <button class="btn-remover" data-id="${produto.id}">Remover</button>
                </div>
                
            `;

            carrinhoContainer.appendChild(produtoDiv);
        });

        const totalContainer = document.createElement("div");
        totalContainer.classList.add("total-container");
        totalContainer.innerHTML = `
            <div class="total-line">
                <span>Subotal:</span>
                <span>R$ ${total.toFixed(2)}</span>
            </div>
        `;
    
    carrinhoContainer.appendChild(totalContainer);

        document.querySelectorAll(".btn-aumentar").forEach(button => {
            button.addEventListener("click", aumentarQuantidade);
        })

        document.querySelectorAll(".btn-diminuir").forEach(button => {
            button.addEventListener("click", diminuirQuantidade);
        })

        document.querySelectorAll(".btn-remover").forEach(button => {
            button.addEventListener("click", removerProduto);
        });
    }

    function aumentarQuantidade(event){
        const produtoId = event.target.dataset.id;
        const produto = carrinho.find(item => item.id === produtoId);

        if(produto) {
            produto.quantidade++;
            localStorage.setItem("carrinho", JSON.stringify(carrinho));
            exibirCarrinho();
        }
    }

    function diminuirQuantidade(event){
        const produtoId = event.target.dataset.id;
        const produtoIndex = carrinho.findIndex(item => item.id === produtoId);

        if(produtoIndex !== -1) {
            if(carrinho[produtoIndex].quantidade > 1){
                carrinho[produtoIndex].quantidade--;
            } else {
                carrinho.splice(produtoIndex, 1);
            }

            localStorage.setItem("carrinho", JSON.stringify(carrinho));
            exibirCarrinho();
        }
    }

    function removerProduto(event) {
        const produtoId = event.target.dataset.id;

        carrinho = carrinho.filter(produto => produto.id !== produtoId);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        exibirCarrinho();
    }

    exibirCarrinho();
});