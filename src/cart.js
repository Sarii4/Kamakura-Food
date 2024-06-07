import { products } from '../assets/data/data.js';

let cart = [];
const currency = "€";
const cartDOM = document.getElementById("cart-container");
const productsDOM = document.getElementById("products");
const total = document.getElementById("cart-total");
const quantity = document.getElementById("quantity");
const button = document.getElementById("cart");
const buttonPay = document.getElementById("proceedPay-button");
const receiptContainer = document.getElementById("receipt-container");
const receiptProducts = document.getElementById("receipt-product");
const receiptTotal = document.getElementById("receipt-total");
const closeReceiptButton = document.getElementById("close-receipt");
const payButton = document.getElementById("pay-button");

// click boton añadir item al carrito
function buttonAddToCart() {
    const addButton = document.querySelectorAll(".add-button");
    addButton.forEach(button => {
        button.addEventListener("click", function(event) {
            const productId = event.target.dataset.id;
            cartDOM.style.display = "flex";
            addToCart(productId);
        })
    })
}

function toggleCart() {
    if(cartDOM.style.display === "none") {
        cartDOM.style.display = "flex";
    } else {
        cartDOM.style.display = "none";
    }
}

function addToCart(productId) {
    const item = products.find(product => product.id == productId );
    const existingItem = cart.find(cartItem => cartItem.id == productId);
    // si item ya esta en el carrito
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...item, quantity: 1});
    }
    //actualiza carrito 
    updateCart();
}

function updateCart() {
    const cartProducts = document.getElementById("cart-products");
    cartProducts.innerHTML = ""; 
    let totalAmount = 0;
    // crear nuevo elemento div para cada item del carrito
    cart.forEach(dish => {
        const dishElement = document.createElement("div");
        const subTotal = dish.price * dish.quantity;
        totalAmount += subTotal;
        // añadir nombre de clase "cart-container" al elemento
        dishElement.classList.add("cart-container");
        // añadir info al innerHTML del nuevo elemento div
        dishElement.innerHTML = `
           <button class="close-button" data-id="${dish.id}"><img src="./assets/img/close.svg" alt="close"></button>
                <div class="text-container">
                    <h3>${dish.name}</h3>
                    <h5>${subTotal.toFixed(2)} €</h5>
                </div>
                <div class="quantity-container" id="quantity">
                    <button class="quantity-button" data-id="${dish.id}" data-action="increase">+</button>
                    <p class="quantity">${dish.quantity}</p>
                    <button class="quantity-button" data-id="${dish.id}" data-action="decrease">-</button>
                </div>
        `
        cartProducts.appendChild(dishElement);
    })
    updateCartTotal(totalAmount);
    addEventListenersToCartButtons();
}

function updateCartTotal(totalAmount) {
    document.getElementById("cart-total").innerText = `Total: ${totalAmount.toFixed(2)} ${currency}`;
}

function addEventListenersToCartButtons() {
    const closeButton = document.querySelectorAll(".close-button");
    closeButton.forEach(button => {
        button.addEventListener("click", function(event) {
            const productId = event.target.closest("button").dataset.id;
            removeFromCart(productId);
        });
    });

    const quantityButtons = document.querySelectorAll(".quantity-button");
    quantityButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            const productId = event.target.dataset.id;
            const action = event.target.dataset.action;

            if (action === "increase") {
                increaseQuantity(productId);
            } else if (action === "decrease") {
                decreaseQuantity(productId);
            }
        });
    });
}

function increaseQuantity(productId) {
    const item = cart.find(cartItem => cartItem.id == productId);
    if (item) {
        item.quantity += 1;
        updateCart();
    }
}

function decreaseQuantity(productId) {
    const item = cart.find(cartItem => cartItem.id == productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeFromCart(productId);
        }
        updateCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(cartItem => cartItem.id != productId);
    updateCart();
}


const productsContainer = document.getElementById("products-container");

function openReceipt() {
  console.log("Proceder al pago haciendo clic...");
  productsContainer.style.display = "none";
  receiptContainer.style.display = "flex";
  updateReceipt(cart); // Pasa los elementos del carrito a la función updateReceipt
}


function updateReceipt() {
    receiptProducts.innerHTML = ""; 
    let totalAmount = 0;
    // crear nuevo elemento div para cada item del carrito
    cart.forEach(dish => {
        const dishElement = document.createElement("div");
        const subTotal = dish.price * dish.quantity;
        totalAmount += subTotal;
        // añadir nombre de clase "receipt-product" al elemento
        dishElement.classList.add("receipt-product");
        // añadir info al innerHTML del nuevo elemento div
        dishElement.innerHTML = `
            <h3>${dish.name}</h3>
            <div class="receipt-price">
                <p>Cantidad: ${dish.quantity}</p>
                <h5>${subTotal.toFixed(2)} €</h5>
            </div>
        `
        receiptProducts.appendChild(dishElement);
    })
    receiptTotal.innerText = `Total: ${totalAmount.toFixed(2)} ${currency}`;
}

document.addEventListener("DOMContentLoaded", function() {
    button.addEventListener('click', toggleCart);
    buttonPay.addEventListener('click', openReceipt);
    

    buttonAddToCart();
});


function showPopup() {
    alert("¡Gracias por tu compra!");
}

document.addEventListener("DOMContentLoaded", function() {
    payButton.addEventListener('click', showPopup);
});
export { updateCart };
