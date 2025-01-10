import React from 'react';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { addWishlist } from "../Api";
import HeartIco from '../images/icons/heart.svg';

const WishlistIcon = (props) => {
	const { product = null, extraClass = 'shop-wishlist', t, currentLanguage } = props;
	const { authData, authLogin } = useSelector((state) => state.auth);
	/**
	* Function to add product to wishlist
	* and if product is already there then remove product from wishlist.
	* 
	* @return
	*/
	const handleWishlistClick = async (e, productId) => {
		if(authLogin) {
			const { classList } = e.currentTarget;

			let formData = {
				user_id: authData.id,
				product_id: productId,
				language: currentLanguage
			}

			let response = await addWishlist(formData);

			if(response && response.type == 'add') {
				if(!classList.contains('active')) {
					classList.add('active');
				}
			} else {
				if(classList.contains('active')) {
					classList.remove('active');
				}
			}
		} else {
			toast.error(t('product_dropdown.wishlist.unauth'));
		}
	}



	return (
		<span
			className={`${extraClass} wishlist-icon${(product.wishlist && product.wishlist.id) ? ' active' : ''}`}
			onClick={(e) => handleWishlistClick(e, product.id)}
			title={`${(product.wishlist && product.wishlist.id) ? 'Remove from' : 'Add to'} wishlist`}
		>
			<img src={HeartIco} alt="wishlist-icon" />
		</span>
	)
}

export default WishlistIcon;