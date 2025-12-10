import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import APIManager from './APIManager.mjs'; // ⬅️ ¡Nuevo import para las APIs externas!

// --- 1. Lógica de la Lista de Productos (Datos Locales) ---
const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

if (listElement) {
    const productList = new ProductList("tents", dataSource, listElement);
    productList.init();
} else {
    // Si no es la página de listado, puede que sea la página del carrito
    console.warn('⚠️ Element .product-list not found. Assuming this is a different page.'); 
}


// --- 2. Lógica de las APIs Externas (Requisito del Proyecto) ---
const apiManager = new APIManager();

// A. Usar API 1: Integración de una cita inspiradora en el footer (Ejemplo)
async function displayInspirationalQuote() {
    try {
        const quoteData = await apiManager.getInspirationalQuote(); // Método de API 1
        const quoteElement = document.querySelector('#quote-of-the-day');
        
        if (quoteElement) {
            quoteElement.innerHTML = `
                <p>"${quoteData.quote}"</p>
                <p class="quote-author">— ${quoteData.author}</p>
            `;
            // Asegurar que esta parte del DOM tenga una animación CSS (Requisito)
            quoteElement.classList.add('fade-in'); 
        }

    } catch (error) {
        console.error('Error fetching quote:', error);
        // Manejo de error si la API falla
    }
}

// B. Usar API 2: Conversión de Divisas para mostrar un precio convertido (Ejemplo)
async function displayConvertedPrice() {
    // Solo se ejecuta si estamos en la página de lista de productos
    if (listElement) {
        try {
            const conversionRate = await apiManager.getCurrencyExchangeRate('USD', 'EUR'); // Método de API 2
            const originalPriceElement = document.querySelector('.product-card__price');

            if (originalPriceElement) {
                // Aquí buscarías todos los precios en la página y los actualizarías dinámicamente
                const priceElements = listElement.querySelectorAll('.product-card__price');
                priceElements.forEach(element => {
                    const priceUSD = parseFloat(element.textContent.replace('$', ''));
                    const priceEUR = (priceUSD * conversionRate).toFixed(2);
                    
                    // Aquí se genera contenido dinámico y se aplica CSS
                    element.innerHTML += ` <span class="converted-price">(${priceEUR} €)</span>`; 
                });
            }
        } catch (error) {
            console.warn('Could not load exchange rate API:', error);
        }
    }
}

// Ejecutar las funciones externas
displayInspirationalQuote(); 
setTimeout(displayConvertedPrice, 1000); // Esperar a que ProductList haya renderizado los productos