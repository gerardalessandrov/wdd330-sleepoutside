import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  
  if (!cartItems || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = 
      '<p>Your cart is empty.</p>';
    return;
  }
  
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  
  // Calcular y mostrar el total
  displayCartTotal(cartItems);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function displayCartTotal(cartItems) {
  // Calcular el total sumando todos los precios
  const total = cartItems.reduce((sum, item) => {
    return sum + item.FinalPrice;
  }, 0);
  
  // Buscar o crear el contenedor del total
  let cartFooter = document.querySelector(".cart-footer");
  
  if (!cartFooter) {
    cartFooter = document.createElement("div");
    cartFooter.className = "cart-footer";
    document.querySelector(".products").appendChild(cartFooter);
  }
  
  // Mostrar el total formateado
  cartFooter.innerHTML = `
    <p class="cart-total">Total: <strong>$${total.toFixed(2)}</strong></p>
  `;
}

renderCartContents();