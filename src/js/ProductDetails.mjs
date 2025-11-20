
export default class ProductDetails {
  constructor(productId,dataSource) {
  this.productId = productId;
  this.product = {};
  this.dataSource = dataSource;
  
  }
  async init() {
  try {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document.getElementById("addToCart").
      addEventListener("click", this.addProductToCart.bind(this));
  } catch (error) {
    console.error("Error al cargar o renderizar el producto:", error);
    // Mostrar un mensaje de error al usuario en el contenedor del producto.
    document.querySelector(".product-detail").innerHTML = '<h2>Producto no encontrado o error de carga.</h2>';
  }
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
