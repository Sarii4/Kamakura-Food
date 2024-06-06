//DEBE contener las funcionalidades del carrito de compras.
//import { products } from "../assets/data/data.js";


let cart = [];
const currency = "€";
const cartDOM = document.getElementById("cart-container");
const productsDOM = document.getElementById("products");
const total = document.getElementById("cart-total");
const quantity = document.getElementById("quantity");


function toggleCart() {
    const cartContainer = document.getElementById("cart-container");
    const productsContainer = document.getElementById("products-container");

    if(cartContainer.style.display === "none") {
        cartContainer.style.display = "flex";
    } else {
        cartContainer.style.display = "none";

    }
}
function buttonCart() {
    const button = document.getElementById("cart");
    button.addEventListener('click', toggleCart);
}



buttonCart();
