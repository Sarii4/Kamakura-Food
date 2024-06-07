import { filters } from '../assets/data/data.js';
import { products } from '../assets/data/data.js';
import { searchProductsByFilter } from '../src/searcher.js';



//DEBE imprimir en pantalla la información de filtros.

document.getElementById("filters").innerHTML = filters.map(showFilter).join("");

function showFilter(item) {
  return `<button class= "filter">${item}</button>`;}



//DEBE imprimir en pantalla los productos, con su Título, descripción y precio en € y botón de añadir.

  // Función para mostrar los productos en pantalla
function showProducts(products) {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = products.map(showProduct).join("");
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
