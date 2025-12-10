function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Bad Response: ${res.status} - ${res.statusText}`);
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    // Para desarrollo local con Vite
    this.path = `/json/${this.category}.json`;
    console.log('📂 ProductData path:', this.path);
  }

  async getData() {
    try {
      console.log('🔍 Fetching:', this.path);
      const response = await fetch(this.path);
      const data = await convertToJson(response);
      console.log('✅ Data loaded:', data.length, 'products');
      return data;
    } catch (error) {
      console.error('❌ Error loading data:', error);
      throw error;
    }
  }

  async findProductById(id) {
    console.log('🔎 Searching for product ID:', id);
    const products = await this.getData();
    const product = products.find((item) => item.Id === id);
    
    if (!product) {
      console.error('❌ Product not found with ID:', id);
      console.log('📋 Available IDs:', products.map(p => p.Id));
    } else {
      console.log('✅ Product found:', product.Name);
    }
    
    return product;
  }
}