// hooks/useShippingAndCurrency.js
import { useState, useEffect } from 'react';
import  ShippingService  from '../services/ShippingService';
import { CurrencyService } from '../services/CurrencyService';

export const useShippingAndCurrency = (language, cartItems) => {
    const [shippingRates, setShippingRates] = useState([]);
    const [selectedShipping, setSelectedShipping] = useState(null);
    const [shippingCost, setShippingCost] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const shippingService = new ShippingService(language);
    const currencyService = new CurrencyService(language);

    // Calculate dimensions from cart items
    const calculateDimensions = (items) => {
        const dimensions = {
            _length: 0,
            _weight: 0,
            _quantity: 0,
            _height: 0,
            _actualWeight: 0,
            _totalWeight: 0,
            description: items[0]?.title || "Health & Beauty Item"
        };

        items.forEach((item) => {
            if (item.productType !== "aws3-bucket-product") {
                // Sum quantities
                dimensions._quantity += parseInt(item.quantity || 0);

                // Sum dimensions
                dimensions._length += parseFloat(item.dimension_length || 0);
                dimensions._weight += parseFloat(item.dimension_weight || 0);
                dimensions._height += parseFloat(item.dimension_height || 0);

                // Calculate weights
                const itemWeight = parseFloat(item.product_actual_weight || 0);
                dimensions._actualWeight += itemWeight;
                dimensions._totalWeight += itemWeight * parseInt(item.quantity || 0);
            }
        });

        // Fix decimal points
        dimensions._length = parseFloat(dimensions._length).toFixed(2);
        dimensions._weight = parseFloat(dimensions._weight).toFixed(2);
        dimensions._height = parseFloat(dimensions._height).toFixed(2);
        dimensions._actualWeight = parseFloat(dimensions._actualWeight).toFixed(2);
        dimensions._totalWeight = parseFloat(dimensions._totalWeight).toFixed(2);

        return dimensions;
    };

    const calculateShipping = async (address) => {
        setLoading(true);
        setError(null);
        try {
            const dimensions = calculateDimensions(cartItems);
            const rates = await shippingService.calculateShipping(dimensions, address);
            setShippingRates(rates);
            
            // Set default shipping option
            if (rates.length > 0) {
                setSelectedShipping(rates[0]);
                setShippingCost(rates[0].price || rates[0].total_charge);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const selectShippingOption = (option) => {
        setSelectedShipping(option);
        setShippingCost(option.price || option.total_charge);
    };

    // Add effect to handle cart changes
    useEffect(() => {
        if (cartItems && cartItems.length > 0) {
            const dimensions = calculateDimensions(cartItems);
            // You might want to store these dimensions or use them for other calculations
        }
    }, [cartItems]);

    return {
        shippingRates,
        selectedShipping,
        shippingCost,
        loading,
        error,
        calculateShipping,
        selectShippingOption,
        currency: currencyService.getCurrency(),
        currencySymbol: currencyService.getCurrencySymbol(),
        formatPrice: currencyService.formatPrice.bind(currencyService),
        calculateDimensions
    };
};