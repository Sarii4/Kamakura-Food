//DEBE imprimir en pantalla la información de filtros.



import { filters } from '../assets/data/data.js';
import { products } from '../assets/data/data.js';
import { searchProductsByFilter } from '../src/searcher.js';



/*
document.getElementById("filters").innerHTML = filters.map(showFilter);
function showFilter(item) {
  return [item].join(" ");
}

*/

document.getElementById("filters").innerHTML = filters.map(showFilter).join("");

function showFilter(item) {
  return `<button class= "filter">${item}</button>`;}



  //DEBE imprimir en pantalla los productos, con su Título, descripción y precio en € y botón de añadir.

  