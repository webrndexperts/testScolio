import React, { useEffect } from "react";
import "./cartItem.css";
import { incrementQuantity, decrementQuantity, removeItem } from "../../reducers/cartSlice";
import { Link } from "react-router-dom";
import { RxCrossCircled } from "react-icons/rx";

const CartItem = (props) => {
	const {
		id, slug, lang, image, title, attributes, price, quantity = 0, productType, attriuteCustomized, attriuteLang,
		attriuteConsultant, attriuteSize, attriuteTool, attriuteImg, attriuteWeight, attriuteGender, attriuteHeight,
		cart, urlLanguage, dispatch, t
	} = props;

	useEffect(() => {
    	localStorage.setItem("cart", JSON.stringify(cart));
  	}, [cart]);

	return (
		<div className="custom-cart-mainPage">
			<div className="custom-product-image">
				<Link to={`${urlLanguage}/product/${slug}`}>
					<img src={image} alt="" />
				</Link>
			</div>
			
			<div className="custom-product-title">
				<Link to={`${urlLanguage}/product/${slug}`}>{title} {attributes}</Link>
				{attriuteGender && (
					<ShowAttributes title={`${t('product_dropdown.gender')}`} value={attriuteGender} />
				)}

				{attriuteWeight && (
					<ShowAttributes title={`${t('product_dropdown.weight')}`} value={attriuteWeight} />
				)}

				{attriuteHeight && (
					<ShowAttributes title={`${t('product_dropdown.height')}`} value={attriuteHeight} />
				)}

				{attriuteCustomized && (
					<ShowAttributes title={`${t('product_dropdown.customized_report')}`} value={attriuteCustomized} />
				)}

				{attriuteLang && (
					<ShowAttributes title={`${t('product_dropdown.varition_language')}`} value={attriuteLang} />
				)}

				{attriuteConsultant && (
					<ShowAttributes title={`${t('product_dropdown.consultation')}`} value={attriuteConsultant} />
				)}

				{attriuteSize && (
					<ShowAttributes title={`${t('product_dropdown.size')}`} value={attriuteSize} />
				)}

				{attriuteTool && (
					<ShowAttributes title={`${t('product_dropdown.tool')}`} value={attriuteTool} />
				)}

				{attriuteImg && (
					<React.Fragment>
						<div className="variation-UploadedFile">Uploaded File:</div>
						<div className="variation-UploadedFile">
							<p>
								<img
									decoding="async"
									width="280"
									height="205"
									src={attriuteImg}
									className="attachment-thumbnail size-thumbnail"
									alt=""
								/>
								</p>
						</div>
					</React.Fragment>
				)}
				<span>
					<span className="woocommerce-Price-amount amount">
						<bdi>
							<span className="woocommerce-Price-currencySymbol">$</span>
							{parseFloat(price).toFixed(2)} SGD
						</bdi>
					</span>
				</span>
			</div>

			<div className="custom-product-quantity">
				<p className="custom-QuantityName"> {t("CART12.Quantity")} </p>
				<div className="quantity">
					{productType == "aws3-bucket-product" ? (
						<div className="cartItem__incrDec">
							<p>{quantity}</p>
						</div>
					) : (
						<div className="cartItem__incrDec">
							<button onClick={() => dispatch(decrementQuantity(id))}>
								-
							</button>
							<p>{quantity}</p>
							<button onClick={() => dispatch(incrementQuantity(id))}>
								+
							</button>
						</div>
					)}
				</div>
				<span onClick={() => dispatch(removeItem(id))}>
					<RxCrossCircled />
					<p className="custom-RemoveName">{t("CART12.Remove")}</p>
				</span>
			</div>
		</div>
	)
}

const ShowAttributes = (props) => {
	const { title, value } = props;

	return (
		<div className="cart-attribute d-flex">
			<div className="att-title">{ title }:</div>
			<span className="att-value">{ value }</span>
		</div>
	)
}

export default CartItem;