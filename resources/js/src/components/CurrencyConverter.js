import React, { useState, useEffect } from 'react';

const CurrencyConverter = ({currency,updateAproxPrice}) => {
    const [exchangeRates, setExchangeRates] = useState({});
    const [originalAmount, setOriginalAmount] = useState(currency);
    const [originalCurrency, setOriginalCurrency] = useState('SGD');
    const [targetCurrency, setTargetCurrency] = useState('USD');
    const [convertedAmount, setConvertedAmount] = useState(0);
  
    useEffect(() => {
      const fetchExchangeRates = async () => {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${originalCurrency}`);
        const data = await response.json();
        setExchangeRates(data.rates);
      };
  
      fetchExchangeRates();
    }, [originalCurrency]);
  
    useEffect(() => {
      const conversionRate = exchangeRates[targetCurrency];
      setConvertedAmount(currency * conversionRate || 0);
    }, [originalAmount, originalCurrency, targetCurrency, exchangeRates,updateAproxPrice]);

    return (
      <div>
        <p className='approx-price'>{`(Approx $${convertedAmount.toFixed(2)} ${targetCurrency})`}</p>
        </div>
    );
}

export default CurrencyConverter


