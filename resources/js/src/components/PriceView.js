import React from "react";

const PriceView = ({ currency, price, symbol }) => {
    
    return (
        <>
            {symbol} {parseFloat(price).toFixed(2)} {currency}
        </>
    );
};

export default PriceView;
