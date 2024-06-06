//DEBE buscar los productos por los filtros
import { filters } from "../assets/data/data";



// buscar productos por filtro
function searchProductsByFilter(products, filter) {
    // Si el filtro es "todos", retornar todos los productos
    if (filter === 'todos') {
        return products;
    }
    
// filtrar productos por categoría
    return products.filter(product => product.category === filter);
};


export { searchProductsByFilter };