// services/CurrencyService.js
export class CurrencyService {
    constructor(language) {
        this.language = language;
        this.isMalaysia = language === 'en_MY';
    }

    getCurrency() {
        return this.isMalaysia ? 'MYR' : 'SGD';
    }

    getCurrencySymbol() {
        return this.isMalaysia ? 'RM' : '$';
    }

    formatPrice(price) {
        const currency = this.getCurrency();
        const symbol = this.getCurrencySymbol();
        
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(price);
    }
}