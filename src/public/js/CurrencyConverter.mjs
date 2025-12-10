// Crear src/js/CurrencyConverter.mjs
export default class CurrencyConverter {
  constructor() {
    this.baseURL = 'https://api.exchangerate-api.com/v4/latest/USD';
    this.currentRate = 1;
  }

  async getRate(currency = 'PEN') {
    try {
      const response = await fetch(this.baseURL);
      const data = await response.json();
      this.currentRate = data.rates[currency];
      return this.currentRate;
    } catch (error) {
      console.error('Error getting exchange rate:', error);
      return 1;
    }
  }

  convertPrice(priceUSD) {
    return (priceUSD * this.currentRate).toFixed(2);
  }
}