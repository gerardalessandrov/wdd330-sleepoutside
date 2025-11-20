import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";

const dataSource = new ProductData("tents");
try {
    const product = await dataSource.findProductById(productId);
    // usar el producto
    renderProductDetails(product)
} catch (error) {
    // ¡Aquí capturas el "Bad Response" o el error de red!
    console.error("No se pudo cargar el producto o los datos:", error);
    // Podrías mostrar un mensaje al usuario
}


// dataSource es un objeto creado de la clase ProductData
// tents es el argumento proporcionar datos relacionados con tiendas de campaña (tents), 
// probablemente para poder buscar, filtrar o recuperar esa información.
const productId=getParam("product");
console.log(dataSource.findProductById(productId)); 
function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}
// add to cart button event handler
async function addToCartHandler() {
  const product = await dataSource.findProductById(productId);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
