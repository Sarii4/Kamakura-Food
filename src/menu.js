//DEBE imprimir en pantalla la información de filtros.

//DEBE imprimir en pantalla los productos, con su Título, descripción y precio en € y botón de añadir.

//DEBE imprimir en pantalla la información de filtros.
import { filters } from '../data.js';
import { products } from '../data.js';
import { searchProductsByFilter } from './searcher.js';


/* Función para filtrar los productos por categoría */
function filterProductsByCategory(products, category) {
    const filteredProducts = products.filter(product => product.category === category);
    console.log(`Productos filtrados por la categoría ${category}:`, filteredProducts);
    return filteredProducts;
}

/* Función para mostrar los filtros en pantalla */
function mostrarFiltros() {
    const filtros = document.querySelectorAll('.filter'); /* Seleccionar todos los botones de filtro en el DOM */
    filtros.forEach(boton => {
        boton.addEventListener('click', () => { /* listener para manejar el clic en el filtro */
            const filtroSeleccionado = boton.textContent; /* Obtener el texto del botón como filtro */
            console.log('Filtro seleccionado:', filtroSeleccionado);

            /* Filtrar los productos por la categoría seleccionada */
            mostrarProductosFiltrados(filtroSeleccionado); /* Llamar a la función para mostrar productos filtrados */
        });
    });
}

/* Función para mostrar productos filtrados */
function mostrarProductosFiltrados(category) {
    const productosFiltrados = filterProductsByCategory(products, category);
    console.log('Productos filtrados:', productosFiltrados);

    /* Lógica para mostrar los productos filtrados en la interfaz gráfica */
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = ''; /* Limpiar el contenedor de productos */

    productosFiltrados.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-container');

        const title = document.createElement('h3');
        title.textContent = product.name;

        const description = document.createElement('p');
        description.textContent = product.description;

        const price = document.createElement('h5');
        price.textContent = `Precio: ${product.price} €`;

        const addButton = document.createElement('button');
        addButton.textContent = 'Añadir';
        addButton.classList.add('add-button');
        addButton.addEventListener('click', () => {
           /* La lógica para agregar el producto al carrito */
            console.log(`Añadir ${product.name} al carrito`);
        });

        productDiv.appendChild(title);
        productDiv.appendChild(description);
        productDiv.appendChild(price);
        productDiv.appendChild(addButton);

        productsContainer.appendChild(productDiv);
    });
}

// Llamar a la función para mostrar los filtros al cargar la página
mostrarFiltros();


