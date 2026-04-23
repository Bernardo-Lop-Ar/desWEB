function mostrarUsuario() {
    let usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    let elemento = document.getElementById("usuario-nome");

    if (usuario) {
        elemento.innerText = "Olá, " + usuario.nome + " 👋";
    } else {
        elemento.innerText = "Olá, visitante 👋";
    }
}

function carregarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let container = document.querySelector(".cart-items");
    let subtotal = 0;

    container.innerHTML = "";

    carrinho.forEach((item, index) => {
        let totalItem = item.preco * item.quantidade;
        subtotal += totalItem;

        container.innerHTML += `
            <div class="cart-item">
                <div class="item-info">
                    <p class="item-name">${item.nome}</p>
                    <p class="item-price">R$ ${item.preco.toFixed(2)}</p>
                </div>
                <div class="item-qty">
                    <input type="number" value="${item.quantidade}" min="1"
                        onchange="alterarQuantidade(${index}, this.value)">
                    <button onclick="removerItem(${index})">❌</button>
                </div>
            </div>
        `;
    });

    document.querySelector(".cart-summary").innerHTML = `
        <p>Subtotal: <span>R$ ${subtotal.toFixed(2)}</span></p>
        <p>Frete: <span>Grátis</span></p>
        <h3>Total: <span>R$ ${subtotal.toFixed(2)}</span></h3>
    `;
}

function alterarQuantidade(index, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho"));

    carrinho[index].quantidade = parseInt(quantidade);

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    carregarCarrinho();
}

function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho"));

    carrinho.splice(index, 1);

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    carregarCarrinho();
}

function finalizarCompra() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let metodo = document.querySelector('input[name="pagamento"]:checked');

    if (!metodo) {
        alert("Selecione uma forma de pagamento!");
        return;
    }

    let pagamento = metodo.value;

    alert("Compra realizada com sucesso via " + pagamento.toUpperCase() + " 🎉");

    // limpa o carrinho
    localStorage.removeItem("carrinho");

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);
}

carregarCarrinho();
mostrarUsuario();