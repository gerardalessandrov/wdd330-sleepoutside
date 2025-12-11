// TmdbService.js (Anteriormente la sección 2)

// Clave de la API y Referencia al contenedor que se manipula
const TMDB_API_KEY = "b979aca72ea035c2d8ff339ffa2fad62";
const contenedorResultados = document.getElementById('movie-results');


// Función para inyectar los datos en el HTML (es interna, no se exporta)
function mostrarDatosPelicula(pelicula) {
    const posterBaseUrl = 'https://image.tmdb.org/t/p/w500'; 
    const posterUrl = pelicula.poster_path 
        ? posterBaseUrl + pelicula.poster_path 
        : 'https://via.placeholder.com/500x750?text=No+Poster+Available'; 

    contenedorResultados.innerHTML = `
        <div class="movie-card">
            <img src="${posterUrl}" alt="Póster de ${pelicula.title}" id="movie-poster">
            <div class="movie-info">
                <h3 id="movie-title">${pelicula.title} (${new Date(pelicula.release_date).getFullYear()})</h3>
                <p><strong>Puntuación (TMDB):</strong> <span id="movie-rating">${pelicula.vote_average.toFixed(1)} / 10</span></p>
                <p><strong>Sinopsis:</strong></p>
                <p id="movie-overview">${pelicula.overview || "Sin sinopsis disponible."}</p>
            </div>
        </div>
    `;
}

// *** EXPORTAMOS esta función para que main.js la pueda importar ***
export async function buscarPelicula(titulo) {
    
    if (!titulo || titulo.trim() === "") {
        contenedorResultados.innerHTML = "<p>Por favor, introduce el título de una película.</p>";
        return;
    }

    const urlBusqueda = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${titulo}`;
    
    contenedorResultados.innerHTML = "<p>Cargando resultados...</p>";

    try {
        const respuesta = await fetch(urlBusqueda); 
        
        if (!respuesta.ok) {
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }
        
        const datos = await respuesta.json();
        const primerResultado = datos.results[0];
        
        if (primerResultado) {
            mostrarDatosPelicula(primerResultado);
        } else {
            contenedorResultados.innerHTML = `<p>No se encontró la película: <strong>${titulo}</strong></p>`;
        }
    } catch (error) {
        contenedorResultados.innerHTML = `<p class="error">Error al obtener los datos. Por favor, verifica tu conexión.</p>`;
    }
}