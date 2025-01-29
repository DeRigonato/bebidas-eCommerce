let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function adicionarAoCarrinho(produto){
    const produtoExistente = carrinho.find(item => item.id === produto.id);
    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: parseFloat(produto.preco),
            quantidade: 1
        });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarBotaoCarrinho();

    alert("Produto adcionado ao carrinho!");
}

function atualizarBotaoCarrinho(){
    const botaoCarrinho = document.getElementById("carrinho-btn");
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

    if (totalItens > 0) {
        botaoCarrinho.src = "sources/images/carrinho-cheio.png";
    } else {
        botaoCarrinho.src = "sources/images/carrinho-vazio.png"
    }

}

document.addEventListener("DOMContentLoaded", atualizarBotaoCarrinho);