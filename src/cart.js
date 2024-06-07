import { products } from '../assets/data/data.js';

let cart = [];
const currency = "€";
const cartDOM = document.getElementById("cart-container");
const total = document.getElementById("cart-total");
const button = document.getElementById("cart");

function toggleCart() {
    if (cartDOM.style.display === "none") {
        cartDOM.style.display = "flex";
    } else {
        cartDOM.style.display = "none";
    }
}

function addToCart(productId) {
    const item = products.find(product => product.id == productId);
    const existingItem = cart.find(cartItem => cartItem.id == productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCart();
    openCart(); // Abrir el carrito automáticamente al agregar un producto
}

function openCart() {
    cartDOM.style.display = "flex";
}

function updateCart() {
    const cartProducts = document.getElementById("cart-products");
    cartProducts.innerHTML = ""; // Limpiar el contenedor antes de actualizar

    let totalAmount = 0;

    cart.forEach(dish => {
        const subtotal = dish.price * dish.quantity;
        totalAmount += subtotal;

        const dishElement = document.createElement("div");
        dishElement.classList.add("cart-container");
        dishElement.innerHTML = `
           <button class="close-button" data-id="${dish.id}"><img src="./assets/img/close.svg" alt="close"></button>
           <div class="text-container">
               <h3>${dish.name}</h3>
               <h5>${subtotal.toFixed(2)} €</h5> <!-- Mostrar el subtotal aquí -->
           </div>
           <div class="quantity-container" id="quantity">
               <button class="quantity-button" data-id="${dish.id}" data-action="increase">+</button>
               <p class="quantity">${dish.quantity}</p>
               <button class="quantity-button" data-id="${dish.id}" data-action="decrease">-</button>
           </div>
        `;
        cartProducts.appendChild(dishElement);
    });

    // Mostrar el total de todos los subtotales
    total.innerText = `Total: ${totalAmount.toFixed(2)} ${currency}`;

    addEventListenersToCartButtons();
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

document.addEventListener("DOMContentLoaded", function() {
    button.addEventListener('click', toggleCart);
    updateCart();
    buttonAddToCart();
});

function buttonAddToCart() {
    const addButton = document.querySelectorAll(".add-button");
    addButton.forEach(button => {
        button.addEventListener("click", function(event) {
            const productId = event.target.dataset.id;
            addToCart(productId);
        });
    });
}
