import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectLanguage } from "../reducers/languageSlice";

const CurrencyConverter = ({ currency }) => {
    const [exchangeRates, setExchangeRates] = useState({});
    const [originalCurrency, setOriginalCurrency] = useState("SGD");
    const [targetCurrency, setTargetCurrency] = useState("USD");
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const currentLanguage = useSelector(selectLanguage); // Get selected language

    const languageCurrencyMap = {
        en_US: { code: "USD", symbol: "$" }, // United States
        en_UK: { code: "GBP", symbol: "£" }, // United Kingdom
        en_AU: { code: "AUD", symbol: "A$" }, // Australia
        en_CA: { code: "CAD", symbol: "C$" }, // Canada
        en_NZ: { code: "NZD", symbol: "NZ$" }, // New Zealand
        en_SG: { code: "SGD", symbol: "S$" }, // Singapore
        en_IN: { code: "INR", symbol: "₹" }, // India
        en_MY: { code: "MYR", symbol: "RM" }, // Malaysia
        es_ES: { code: "EUR", symbol: "€" }, // Spain
        es_MX: { code: "MXN", symbol: "MX$" }, // Mexico
        fr_FR: { code: "EUR", symbol: "€" }, // France    
        de_DE: { code: "EUR", symbol: "€" }, // Germany    
        it_IT: { code: "EUR", symbol: "€" }, // Italy
        ja_JP: { code: "JPY", symbol: "¥" }, // Japan
        zh_CN: { code: "CNY", symbol: "¥" }, // China
        zh_HK: { code: "HKD", symbol: "HK$" }, // Hong Kong
        id_ID: { code: "IDR", symbol: "Rp" }, // Indonesia
    };
    
    // Fallback if locale is not found
    const getCurrencyInfo = (locale) => {
        if (locale === "en_SG") {
            return languageCurrencyMap["en_US"];
        }
        return languageCurrencyMap[locale] || { code: "USD", symbol: "$" };
    };
    
    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://open.er-api.com/v6/latest/${originalCurrency}`
                );
                const data = await response.json();
                setExchangeRates(data.rates || {});
            } catch (error) {
                console.error("Error fetching exchange rates:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchExchangeRates();
    }, [originalCurrency]);

    useEffect(() => {
        if (!loading && exchangeRates[targetCurrency]) {
            const conversionRate = exchangeRates[targetCurrency] || 1;
            setConvertedAmount(currency * conversionRate);
        }
    }, [currency, exchangeRates, targetCurrency, loading]);

    useEffect(() => {
        const currentCurrency = getCurrencyInfo(currentLanguage)
        setTargetCurrency(currentCurrency.code);
    }, [currentLanguage])
    

    return (
        <div>
            {!loading && targetCurrency && convertedAmount ? (
                <p className="approx-price">{`(Approx ${
                    getCurrencyInfo(currentLanguage).symbol
                } ${convertedAmount?.toFixed(2)} ${targetCurrency})`}</p>
            ) : (
                <p className="approx-price"> Loading... </p>
            )}
        </div>
    );
};

export default CurrencyConverter;
