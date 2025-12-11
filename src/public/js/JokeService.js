// JokeService.js (Anteriormente la sección 3)

// Referencia al contenedor que se manipula
const textoChiste = document.getElementById('current-joke');

// *** EXPORTAMOS esta función para que main.js la pueda importar ***
export async function obtenerChiste() {
    
    const urlChiste = "https://v2.jokeapi.dev/joke/Programming,Misc,Pun?type=single"; 
    
    textoChiste.textContent = "Buscando el chiste perfecto..."; 
    
    try {
        const respuesta = await fetch(urlChiste);
        
        if (!respuesta.ok) {
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }
        
        const datos = await respuesta.json();
        
        if (datos.joke) {
            textoChiste.textContent = datos.joke; 
        } else {
            textoChiste.textContent = "Error: No se pudo cargar el chiste. Inténtalo de nuevo.";
        }
    } catch (error) {
        textoChiste.textContent = "Error de conexión al JokeAPI.";
    }
}