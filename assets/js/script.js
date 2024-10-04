const btnAbrirCarrinho = document.querySelector('.open-cart');
const btnFecharCarrinho = document.querySelector('.close-cart');
const modal = document.querySelector('.modal-cart');
const conteudoModal = document.querySelector('.modal-cart-content');
const itensCarrinho = document.querySelector('.cart-itens');
const cartTotal = document.querySelector('.total-cart');
const finishCart = document.querySelector('.finish-cart');
const contadorItensCart = document.querySelector('.cart-counter-itens');
const adress = document.querySelector('#adress')
const menuItem = document.querySelectorAll('.menu-item')

let cart = [];


//abir e fechar carrinho
btnAbrirCarrinho.addEventListener ('click', () => {
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
    ppdateCartModal()
}

//atualiza o carrinho

function uppdateCartModal() {

}