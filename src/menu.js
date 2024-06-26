import { filters } from '../assets/data/data.js';
import { products } from '../assets/data/data.js';
import { searchProductsByFilter } from '../src/searcher.js';
import { addToCart } from '../src/cart.js';

document.getElementById("filters").innerHTML = filters.map(showFilter).join("");

function showFilter(item) {
  return `<button class= "filter">${item}</button>`;}

  // Función para mostrar los productos en pantalla
function showProducts(products) {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = products.map(showProduct).join("");
    attachAddToCartListeners();
}

// Función para mostrar un producto individual en una cuadrícula
function showProduct(product) {
    return `
        <div class="product-container">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="price-container">
            <p><b> ${product.price} €</b></p>
            <button class="add-button" data-id="${product.id}">Añadir</button>
            </div>
        </div>
    `;
}

function attachAddToCartListeners(filteredCategory) {
  const cartDOM = document.getElementById("cart-container");
  const addToCartButtons = document.querySelectorAll(".add-button");
  addToCartButtons.forEach(button => {
      button.addEventListener("click", function(event) {
          console.log("añadir button clicked");
          const filteredProdId = event.target.getAttribute("data-id");
          const productToAdd = products.find(product => product.id == filteredProdId);

          if (filteredCategory !== "todos") {
            console.log("adding to cart");
            addToCart(filteredProdId);
            cartDOM.style.display = "flex";
        }  
      });
  });
}

// Obtener los elementos de filtro y productos
const filtersContainer = document.getElementById("filters");
const productsContainer = document.getElementById("products");

// Manejar clics en los filtros
filtersContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("filter")) {
        const filter = event.target.textContent;
        const filteredProducts = searchProductsByFilter(products, filter);
        return showProducts(filteredProducts);
    }
});

// Mostrar todos los productos inicialmente
showProducts(products);
