export default class ProductData {
  constructor(productId,dataSource) {
  this.productId = productId;
  this.product = {};
  this.dataSource = dataSource;

  }
  async init() {
    this.product =await this.dataSource.findProductById(this.productId);
    // Primero inicia buscando el id del producto
    this.renderProductDetails();
    // Ahora habilita esta funcion y muestra los detalles del producto
    document.getElementById("addToCart").
    addEventListener("click",this.addProductToCart.bind(this));
  }
  addProductToCart() {
  let cart = JSON.parse(localStorage.getItem('so-cart')) || [];
  cart.push(this.product);
  localStorage.setItem('so-cart', JSON.stringify(cart));
}

  renderProductDetails(){
   const container=document.querySelector(".product-detail")
   container.innerHTML=`
    <h2>${this.product.Name}</h2>
    <img src="${this.product.Image}" alt="${this.product.Name}">
    <p>${this.product.Description}</p>
    <p class="price">$${this.product.FinalPrice}</p>
    <button id="addToCart">Add to Cart</button>
  `;
  }
  
  
}
