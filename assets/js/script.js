const btnAbrirCarrinho = document.querySelector('.open-cart');
const btnFecharCarrinho = document.querySelector('.close-cart');
const modal = document.querySelector('.modal-cart');
const conteudoModal = document.querySelector('.modal-cart-content');
const itensCarrinho = document.querySelector('.cart-itens');
const cartTotal = document.querySelector('.total-cart');
const finishCart = document.querySelector('.finish-cart');
adressWarn = document.querySelector('.adressWarn')
const contadorItensCart = document.querySelector('.cart-counter-itens');
const adress = document.querySelector('#adress')
const menuItem = document.querySelectorAll('.menu-item')
const cartItemsContainer = document.querySelector('#cart-items')
const horarioRestaurante = document.querySelector('.content-banner-header a')

let cart = [];


//abir e fechar carrinho
btnAbrirCarrinho.addEventListener ('click', () => {
    updateCartModal();
    modal.classList.add('ativo')
})
btnFecharCarrinho.addEventListener('click', () => {
    modal.classList.remove('ativo')
})

modal.addEventListener('click', (event) => {
    if (!conteudoModal.contains(event.target)) {
        modal.classList.remove('ativo');
    }
});


//itens carrinho

menuItem.forEach((menuItem) => {
    menuItem.addEventListener('click', (event) => {
        let parentButton = event.target.closest(".add-to-cart-btn")
        if(parentButton){
            const name = parentButton.getAttribute("data-name")
            const price = +parentButton.getAttribute("data-price")
            addToCart(name, price);
        }
        
    });
});

//adiciona ao carrinho
function addToCart(name, price) {
    const existingItem = cart.find(menuItem => menuItem.name === name) 
    if(existingItem){
        existingItem.quantity += 1
        
    } else{
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }
    updateCartModal()
}

//atualiza o carrinho   

function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div")
        
        cartItemElement.innerHTML = `
            <div class="cart-itens-modal">
                <div>
                    <p class="cart-itens-modal-name">${item.name}</p>
                    <p class="cart-itens-modal-qtd">Qtd: ${item.quantity}</p>
                    <p class="cart-itens-modal-preco">R$ ${item.price.toFixed(2)}</p>
                </div>
                <button class="remover-item-carrinho" data-name="${item.name}">Remover</button>
            </div>
        `
        total += item.price * item.quantity

        cartItemsContainer.appendChild(cartItemElement)
    })
    cartTotal.textContent = total.toLocaleString("bt-BR", {
        style: "currency",
        currency: "BRL",
    });
    contadorItensCart.innerHTML = "( " + cart.length + " )";
}

//Remover item do carrinho

cartItemsContainer.addEventListener("click", function(event) {
    if(event.target.classList.contains("remover-item-carrinho")){
        event.stopPropagation();
        const name = event.target.getAttribute("data-name");
        removeItemCart(name)
    }
})

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);
    if(index !== -1){
        const item = cart[index];
        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return
        }
        cart.splice(index, 1);
        updateCartModal();
    }
}

adress.addEventListener('input', function(event) {
    let inputValue = event.target.value
    if(inputValue !==""){
        adressWarn.classList.add("remove")
    }
})

//finalizar pedido
finishCart.addEventListener('click', function() {

    const isOpen = checkRestaurantOpen();
    if(!isOpen){
    alert("Restaurante Fechado no Momento");
    return;
    }

    if(cart.length === 0) return;
    if(adress.value === ""){
        adressWarn.classList.remove("remove");
        return;
    }
    // enviar o pedido para a api whats
    const cartItems = cart.map((item) => {
        return(
            ` ${item.name} - Quantidade: (${item.quantity}) - Preço: R$${item.price.toFixed(2)} |`
        )
    }).join("")
    
    const message = encodeURIComponent(cartItems)
    const phone = "47991308936"
    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${adress.value}`, "_blank");
    cart.length = 0;
    updateCartModal();
})

//verifica se o restaurante está aberto

function checkRestaurantOpen() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 1 && hora < 23;
}

const isOpen = checkRestaurantOpen();
if(isOpen){
    horarioRestaurante.classList.remove('fechado')
} else {
    horarioRestaurante.classList.add('fechado')
}