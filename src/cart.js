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
    console.log("addToCart called");
    const item = products.find(product => product.id == productId );
    const existingItem = cart.find(cartItem => cartItem.id == productId);
    // si item ya esta en el carrito
    if (existingItem) {
        existingItem.quantity ++;
        console.log("existingItem.quantity incremented");
    } else {
        cart.push({...item, quantity: 1});
        console.log("new item added to cart");
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

function closeReceipt() {
    receiptContainer.style.display = "none";
    productsContainer.style.display = "flex"; 
}

document.addEventListener("DOMContentLoaded", function() {
    button.addEventListener('click', toggleCart);
    buttonPay.addEventListener('click', openReceipt);
    closeReceiptButton.addEventListener('click', closeReceipt);
    buttonAddToCart();
});

function showPopup() {
    // Create the dialog element
    var dialogGracias = document.createElement("dialog");

    // Style the dialog for a larger size
    dialogGracias.style.width = "400px";
    dialogGracias.style.height = "200px";
    dialogGracias.style.padding = "20px";
    dialogGracias.style.border = "none";
    dialogGracias.style.position = "relative";
    dialogGracias.style.zIndex = "99";
    dialogGracias.style.textAlign = "center"; // Center align text and content
    dialogGracias.style.display = "flex";
    dialogGracias.style.flexDirection = "column";
    dialogGracias.style.alignItems = "center";
    dialogGracias.style.justifyContent = "center";
    dialogGracias.style.overflow = "hidden"; 

    // Create and style the text
    var graciasText = document.createElement("div");
    graciasText.innerHTML = `
        <p><b>Gracias por tu Compra</b></p>
        <p>¡Pedido realizado con éxito, gracias por comprar en Kamura Food!</p>
        <img class="image-logo" src="./assets/img/logo.svg" alt="restaurant logo">
    `;
    dialogGracias.appendChild(graciasText);

    // Create the close button
    var closeButton = document.createElement("button");
    closeButton.className = "close-button";
    var closeButtonImage = document.createElement("img");
    closeButtonImage.src = "./assets/img/close.svg";
    closeButtonImage.alt = "close";
    closeButton.style.position = "absolute";
    closeButton.style.top = "0";
    closeButton.style.right = "0";
    closeButton.style.zIndex = "105";

    closeButton.appendChild(closeButtonImage);
    
    // Append the close button to the dialog
    dialogGracias.appendChild(closeButton);

    // Append the dialog to the body
    document.body.appendChild(dialogGracias);

    // Add event listener to close the dialog
    closeButton.addEventListener("click", function() {
        dialogGracias.close();
        document.body.removeChild(dialogGracias); // Remove the dialog from the DOM
    });

    // Show the dialog
    dialogGracias.showModal();
}

document.addEventListener("DOMContentLoaded", function() {
    payButton.addEventListener('click', showPopup);
});

export { addToCart, updateCart };
