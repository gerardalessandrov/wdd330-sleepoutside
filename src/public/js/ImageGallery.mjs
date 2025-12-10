// Crear src/js/ImageGallery.mjs
export default class ImageGallery {
  constructor() {
    // API pública de Unsplash (sin necesidad de key para desarrollo)
    this.baseURL = 'https://source.unsplash.com/random/800x600/?';
  }

  getRandomImage(query = 'camping,tent,outdoor') {
    return `${this.baseURL}${query}&${Date.now()}`;
  }
}