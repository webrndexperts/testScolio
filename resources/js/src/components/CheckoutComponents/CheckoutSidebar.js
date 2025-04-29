// import React, { useEffect } from 'react';
// import { RxCrossCircled } from "react-icons/rx";
// import kindpng from '../../images/kindpng.png'
// const CheckoutSidebar = (props) => {
// 	const {
// 		totalPrice, setTotalPrice, cart, t, dispatch, couponCode, shippigCharges, taxRate, RemoveDiscount,
// 		couponDetail, handlecoupon, applyCouponCode, couponForm, couponError, couponPrice, setCouponPrice,
// 		taxPrice, setTaxPrice, subTotalPrice, setSubTotalPrice, setTotalQuantity, couponMsg, digital
// 	} = props;

// 	const currency = JSON.parse(localStorage.getItem("currency"));

// 	const getTotal = () => {
// 		let totalQuantity = 0, _cartTotal = 0, tax = 0, subTotal = 0, discountAmount = 0, _totalPrice = 0;

// 		cart.forEach((item) => {
// 	      	totalQuantity += item.quantity;
// 	      	_cartTotal += item.price * item.quantity;
// 	    });

// 	    if(couponCode) {
// 		    discountAmount = (_cartTotal * couponCode) / 100;
// 	    }
	    
//       	_totalPrice = _cartTotal - discountAmount;
//       	tax = (_totalPrice * taxRate) / 100;
//       	if (couponCode && couponCode == 100) { tax = 0; }

// 	    _totalPrice = _totalPrice + tax + shippigCharges;

// 	    setSubTotalPrice(_cartTotal);
// 	    setTaxPrice(tax);
// 	    setCouponPrice(discountAmount);
// 	    setTotalPrice(_totalPrice);
// 	    setTotalQuantity(totalQuantity);
// 	}

// 	useEffect(() => {
//   		getTotal();
//   	}, [shippigCharges, couponCode, taxRate, cart])
// console.log(shippigCharges,"shippigCharges from cart")
// 	return (
// 		<div className="col-md-6 input-all">
//             <div className='all-data'>

//             	{cart?.map((item, index) => {
//             		return (
// 						<> 
						
			
// 		                <div className="blA7b" key={item.id}>
// 		                    <div className='total-method'>
// 		                        <img src={item.image} />
// 		                    </div>
							
// 		                    {(item.quantity) ? (
// 			                    <div className='total-num'>
// 			                        <p>{item.quantity}</p>
// 			                    </div>
// 		                    ) : null}
							
// 		                    <div className='product-nam'>
								
// 		                        <p>{item.title}</p>

// 		                        {item.attriuteGender ? (
// 		                        	<div className='size-nam'>Gender: {item.attriuteGender}</div>
// 		                        ) : null}

// 		                        {item.attriuteWeight ? (
// 		                        	<div className='size-nam'>Weight: {item.attriuteWeight}</div>
// 		                        ) : null}

// 		                        {item.attriuteHeight ? (
// 		                        	<div className='size-nam'>Height: {item.attriuteHeight}</div>
// 		                        ) : null}

// 		                        {item.attriuteCustomized ? (
// 		                        	<div className='size-nam'>Report: {item.attriuteCustomized}</div>
// 		                        ) : null}

// 		                        {item.attriuteLang ? (
// 		                        	<div className='size-nam'>Language: {item.attriuteLang}</div>
// 		                        ) : null}

// 		                        {item.attriuteSize ? (
// 		                        	<div className='size-nam'>Size: {item.attriuteSize}</div>
// 		                        ) : null}

// 		                        {item.attriuteTool ? (
// 		                        	<div className='size-nam'>Tool: {item.attriuteTool}</div>
// 		                        ) : null}
// 		                    </div>

// 		                    <div className='product-price-nam'>
// 		                        {/* <p>${ parseFloat(item.quantity * item.price).toFixed(2) } SGD</p> */}
// 		                        <p>{currency.symbol} {parseFloat(item.quantity * item.price).toFixed(2)} {currency.currency}</p>
// 		                    </div>
// 		                </div>
					
// 							{item.attriuteImg && <div className='d-flex flex-column my-3'>
// 							<p>Uploaded File  : </p>
// 							{item.attriuteImg ? <img  width={200} height={100} src={item.attriuteImg} /> : null}
// 							</div>}
							
						
// 						</>	
// 		            )
//             	})}

//             	{(couponMsg) ? ( <span className="text-success">{ couponMsg }</span> ) : null}

//                 <div className="discount-code-nam">
//                 	<form className="discount-form" onSubmit={handlecoupon(applyCouponCode)}>
// 	                    <input
// 	                    	{...couponForm("coupon_code", { required: true })}
// 		                    type="text"
// 		                    placeholder={t("checkOut.If you have a coupon code, please apply it below.")}
// 		                    className="form-control"
// 		                    id="code"
// 	                    />
// 	                    {couponError.coupon_code && (
// 	                      	<p className="validations">
// 	                        	{t("checkOut.Please enter your coupon code")}
// 	                      	</p>
// 	                    )}
// 	                    <button
// 		                    type="submit"
// 		                    aria-label={t("checkOut.Apply coupon")}
// 		                    className="apply"
// 		                >
// 	                    	<span className="AjwsM">{t("checkOut.Apply coupon")}</span>
// 	                    </button>
//                     </form>
//                 </div>

//                 <div className='subtotal-nam'>
//                     <p> {t("CART12.Subtotal")}</p>
//                     {/* <h5>${ parseFloat(subTotalPrice).toFixed(2) } SGD</h5> */}
//                     <h5>{currency.symbol} {parseFloat(subTotalPrice).toFixed(2)} {currency.currency}</h5>
//                 </div>

//                {!digital && <div className='subtotal-nam'>
//                     <p>{t("CART12.Shipping")}</p>
//                     {/* <h5>${ parseFloat(shippigCharges).toFixed(2) } SGD</h5> */}
// 					<h5>{currency.symbol} {parseFloat(shippigCharges).toFixed(2)} {currency.currency} </h5>
//                 </div>}

//                 {couponDetail ? (
// 	                <div className='subtotal-nam Coupon_data'>
// 	                    <p>
// 	                    	{t("CART12.Coupon")} - <span className='discount_coupon'>{couponDetail?.data?.coupon_name} </span>
// 	                    	<span className="remove-coupon text-danger" onClick={RemoveDiscount} role="button">
// 								<RxCrossCircled />
// 							</span>
// 	                    </p>
// 	                    {/* <span className='Discount-prices'>-${ parseFloat(couponPrice).toFixed(2) } SGD</span> */}
// 	                    <span className='Discount-prices'>-{currency.symbol} {parseFloat(couponPrice).toFixed(2)} {currency.currency}</span>
// 	                </div>
//                 ) : null}

//                 <div className='subtotal-nam'>
//                     <p>{t("CART12.Tax")}</p>
//                     {/* <h5 className='all-price-add'>${ parseFloat(taxPrice).toFixed(2) } SGD</h5> */}
//                     <h5 className='all-price-add'>{currency.symbol} {parseFloat(taxPrice).toFixed(2)} {currency.currency}</h5>
//                 </div>

//                 <div className='subtotal-nam total_p'>
//                     <p>{t("CART12.Total")}</p>
//                     {/* <h5 className='all-price-add'>${ parseFloat(totalPrice).toFixed(2) } SGD</h5> */}
//                     <h5 className='all-price-add'>{currency.symbol} {parseFloat(totalPrice).toFixed(2)} {currency.currency}</h5>
//                 </div>
// 				<img src={kindpng} alt="loader-button" className='safe' />
//             </div>
//         </div>
// 	)
// }

// export default CheckoutSidebar;

import React, { useEffect } from 'react';
import { RxCrossCircled } from "react-icons/rx";
import kindpng from '../../images/kindpng.png';

const CheckoutSidebar = (props) => {
  const {
    totalPrice, setTotalPrice, cart, t, dispatch, couponCode, shippigCharges, taxRate, RemoveDiscount,
    couponDetail, handlecoupon, applyCouponCode, couponForm, couponError, couponPrice, setCouponPrice,
    taxPrice, setTaxPrice, subTotalPrice, setSubTotalPrice, setTotalQuantity, couponMsg, digital, currentLanguage
  } = props;

  const currency = JSON.parse(localStorage.getItem("currency")) || { currency: "SGD", symbol: "$" };

  const getTotal = () => {
    let totalQuantity = 0, _cartTotal = 0, tax = 0, subTotal = 0, discountAmount = 0, _totalPrice = 0;

    cart.forEach((item) => {
      // Select price based on language
      const itemPrice = currentLanguage === 'en_MY' ? 
        (item.malaysianPrice || item.originalPrice || 0) : 
        (item.originalPrice || item.malaysianPrice || 0);
      
      totalQuantity += item.quantity;
      _cartTotal += itemPrice * item.quantity;
    });

    if (couponCode) {
      discountAmount = (_cartTotal * couponCode) / 100;
    }
    
    _totalPrice = _cartTotal - discountAmount;
    tax = (_totalPrice * taxRate) / 100;
    if (couponCode && couponCode === 100) { tax = 0; }

    _totalPrice = _totalPrice + tax + (digital ? 0 : shippigCharges);

    setSubTotalPrice(_cartTotal);
    setTaxPrice(tax);
    setCouponPrice(discountAmount);
    setTotalPrice(_totalPrice);
    setTotalQuantity(totalQuantity);
  };

  useEffect(() => {
    getTotal();
  }, [shippigCharges, couponCode, taxRate, cart, currentLanguage]);

  console.log(shippigCharges, "shippigCharges from cart");

  return (
    <div className="col-md-6 input-all">
      <div className='all-data'>
        {cart?.map((item, index) => {
          // Select price based on language for display
          const itemPrice = currentLanguage === 'en_MY' ? 
            (item.malaysianPrice || item.originalPrice || 0) : 
            (item.originalPrice || item.malaysianPrice || 0);
          
          return (
            <React.Fragment key={item.id}>
              <div className="blA7b">
                <div className='total-method'>
                  <img src={item.image} alt={item.title} />
                </div>
                {item.quantity ? (
                  <div className='total-num'>
                    <p>{item.quantity}</p>
                  </div>
                ) : null}
                <div className='product-nam'>
                  <p>{item.title}</p>
                  {item.attriuteGender ? (
                    <div className='size-nam'>{t("product_dropdown.gender")}: {item.attriuteGender}</div>
                  ) : null}
                  {item.attriuteWeight ? (
                    <div className='size-nam'>{t("product_dropdown.weight")}: {item.attriuteWeight}</div>
                  ) : null}
                  {item.attriuteHeight ? (
                    <div className='size-nam'>{t("product_dropdown.height")}: {item.attriuteHeight}</div>
                  ) : null}
                  {item.attriuteCustomized ? (
                    <div className='size-nam'>{t("product_dropdown.customized_report")}: {item.attriuteCustomized}</div>
                  ) : null}
                  {item.attriuteLang ? (
                    <div className='size-nam'>{t("product_dropdown.varition_language")}: {item.attriuteLang}</div>
                  ) : null}
                  {item.attriuteSize ? (
                    <div className='size-nam'>{t("product_dropdown.size")}: {item.attriuteSize}</div>
                  ) : null}
                  {item.attriuteTool ? (
                    <div className='size-nam'>{t("product_dropdown.tool")}: {item.attriuteTool}</div>
                  ) : null}
                </div>
                <div className='product-price-nam'>
                  <p>{currency.symbol} {parseFloat(itemPrice * item.quantity).toFixed(2)} {currency.currency}</p>
                </div>
              </div>
              {item.attriuteImg && (
                <div className='d-flex flex-column my-3'>
                  <p>{t("CART12.Uploaded File")}:</p>
                  <img width={200} height={100} src={item.attriuteImg} alt="Uploaded file" />
                </div>
              )}
            </React.Fragment>
          );
        })}

        {couponMsg ? (<span className="text-success">{couponMsg}</span>) : null}

        <div className="discount-code-nam">
          <form className="discount-form" onSubmit={handlecoupon(applyCouponCode)}>
            <input
              {...couponForm("coupon_code", { required: true })}
              type="text"
              placeholder={t("checkOut.If you have a coupon code, please apply it below.")}
              className="form-control"
              id="code"
            />
            {couponError.coupon_code && (
              <p className="validations">
                {t("checkOut.Please enter your coupon code")}
              </p>
            )}
            <button
              type="submit"
              aria-label={t("checkOut.Apply coupon")}
              className="apply"
            >
              <span className="AjwsM">{t("checkOut.Apply coupon")}</span>
            </button>
          </form>
        </div>

        <div className='subtotal-nam'>
          <p>{t("CART12.Subtotal")}</p>
          <h5>{currency.symbol} {parseFloat(subTotalPrice || 0).toFixed(2)} {currency.currency}</h5>
        </div>

        {!digital && (
          <div className='subtotal-nam'>
            <p>{t("CART12.Shipping")}</p>
            <h5>{currency.symbol} {parseFloat(shippigCharges || 0).toFixed(2)} {currency.currency}</h5>
          </div>
        )}

        {couponDetail ? (
          <div className='subtotal-nam Coupon_data'>
            <p>
              {t("CART12.Coupon")} - <span className='discount_coupon'>{couponDetail?.data?.coupon_name}</span>
              <span className="remove-coupon text-danger" onClick={RemoveDiscount} role="button">
                <RxCrossCircled />
              </span>
            </p>
            <span className='Discount-prices'>-{currency.symbol} {parseFloat(couponPrice || 0).toFixed(2)} {currency.currency}</span>
          </div>
        ) : null}

        <div className='subtotal-nam'>
          <p>{t("CART12.Tax")}</p>
          <h5 className='all-price-add'>{currency.symbol} {parseFloat(taxPrice || 0).toFixed(2)} {currency.currency}</h5>
        </div>

        <div className='subtotal-nam total_p'>
          <p>{t("CART12.Total")}</p>
          <h5 className='all-price-add'>{currency.symbol} {parseFloat(totalPrice || 0).toFixed(2)} {currency.currency}</h5>
        </div>
        <img src={kindpng} alt="loader-button" className='safe' />
      </div>
    </div>
  );
};

export default CheckoutSidebar;