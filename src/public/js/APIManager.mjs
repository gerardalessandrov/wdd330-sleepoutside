// APIManager.mjs

import { convertToJson } from './utils.mjs'; // Puedes mover convertToJson aquí

export default class APIManager {
    // API Externa 1: Por ejemplo, un conversor de divisas
    async getCurrencyExchangeRate(baseCurrency, targetCurrency) {
        const url = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`; 
        
        try {
            const response = await fetch(url);
            const data = await convertToJson(response);
            console.log('✅ Exchange Rate loaded');
            return data.rates[targetCurrency];
        } catch (error) {
            console.error('❌ Error fetching exchange rate:', error);
            throw error;
        }
    }

    // API Externa 2: Por ejemplo, una API de consejos/inspiración
    async getInspirationalQuote() {
        const url = 'https://api.quotable.io/random';
        
        try {
            const response = await fetch(url);
            const data = await convertToJson(response);
            console.log('✅ Quote loaded');
            return { quote: data.content, author: data.author };
        } catch (error) {
            console.error('❌ Error fetching quote:', error);
            return { quote: "Always code as if the person who ends up maintaining your code will be a violent psychopath who knows where you live.", author: "John F. Woods" };
        }
    }
}