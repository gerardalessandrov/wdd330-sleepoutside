import { renderListWithTemplate } from "./utils.mjs";

/**
 * Genera la plantilla HTML para una tarjeta de producto utilizando template literals.
 * @param {Object} product - El objeto de producto con sus datos.
 * @returns {string} El string HTML de la tarjeta de producto.
 */

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/?products=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}
export default class ProductList { 

    
    //¡Aquí está la palabra clave 'class'!
    constructor(category,dataSource,listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement; 
    }

    async init(){
        const list = await this.dataSource.getData();
        this.renderList(List)
        // Lógica futura para renderizar la lista (renderList(list))
    }
    renderList(list) {
    // 1. templateFn: productCardTemplate
    // 2. parentElement: this.listElement
    // 3. list: list (la lista de productos)
    // 4. position: 'afterbegin' (por defecto)
    // 5. clear: false (por defecto)
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}

