import React, { Fragment, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import TopBanner from '../components/TopBanner';
import ApiHook from "../components/CustomHooks/ApiHook";
import MetaCreator from "../components/MetaCreator";
import { getWishlist, addWishlist, deleteAllWishlist } from "../Api";
import { addToCart, addMultipleToCart, incrementQuantity } from "../reducers/cartSlice";
import { scrollToTop } from "../components/Helper";
import Rating from "../components/Rating";

const WishlistView = () => {
	const [wishlistData, setWishlistData] = useState([]);
	const [metaProps, setMetaProps] = useState(null);
	const { authData, authLogin } = useSelector((state) => state.auth);
	const { cart } = useSelector((state) => state.cart);
	const [currentLanguage, urlLanguage] = ApiHook();

	const { t } = useTranslation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	/**
	 * Function to generate date in a formatted way.
	 * 
	 * @return Date string formatted
	 */
	const formatDate = (date) => {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	}

	/**
	 * Function to generate value of the product that can be saved in the cart.
	 * 
	 * @return Object of product
	 */
	const generateCartItem = async (prod) => {
		let val = {
			key: prod?.id,
			id: prod?.id,
			image: prod?.photo,
			title: prod?.title,
			price: (prod && prod.price) ? parseFloat(prod.price).toFixed(2) : 0,
			slug: prod?.slug,
			quantity: 1,
			dimension_height: prod?.dimension_height,
			dimension_length: prod?.dimension_length,
			dimension_weight: prod?.dimension_weight,
			product_actual_weight: prod?.product_actual_weight,
			product_type: prod?.product_type,
			lang: prod?.lang,
			productType: prod?.product_type,
			sku: prod?.product_sku,
			buttonDisabled: false,
			CustomizedImgage: ''
		}

		return val;
	}

	/**
	 * Function to trigger an api to remove single product from wishlist data.
	 * 
	 * @return Boolen.
	 */
	const removeWishlist = async (id, list = false) => {
		let formData = {
			user_id: authData.id,
			product_id: id,
			language: currentLanguage,
			list
		}

		let response = await addWishlist(formData, false);

		if(response && response.listing && typeof response.listing != 'undefined') {
			setWishlistData(response.listing);
		}

		return true;
	}

	/**
	 * Function to trigger an api to remove all values from
	 * wishlist data in database.
	 * 
	 * @return Boolen
	 */
	const removeAll = async (ids) => {
		let formData = { ids: JSON.stringify(ids) },
		response = await deleteAllWishlist(formData);

		return true;
	}

	/**
	 * Check if the product already exists in cart or not.
	 * if added then increase the item quantity.
	 * 
	 * @return Boolen.
	 */
	const checkCartAvailable = async (itemData) => {
		var check = cart.find((item)=>item.id === itemData.id);

		if(check && typeof check != 'undefined') {
			dispatch(incrementQuantity(itemData.id));
			return true;
		}

		return false;
	}

	/**
	 * Add single product to cart.
	 * 
	 * @return
	 */
	const addSingleCart = async (prod) => {
		var itemData = await generateCartItem(prod),
		isAvailable = await checkCartAvailable(itemData);

		if(!isAvailable) {
			dispatch(addToCart(itemData));
		}

		removeWishlist(prod?.id);
		navigate(`${urlLanguage}/cart`);
		scrollToTop();
	}

	/**
	 * Add all the products from wishlist to the cart.
	 * 
	 * @return
	 */
	const addAllToCart = async () => {
		var listProducts = [], removeArr = [];

		for (var i = 0; i < wishlistData.length; i++) {
			var _wish = wishlistData[i],
			itemData = await generateCartItem(_wish.product),
			isAvailable = await checkCartAvailable(itemData);

			if(!isAvailable) {
				listProducts.push(itemData);
			}

			removeArr.push(_wish.id);
		}

		dispatch(addMultipleToCart(listProducts));
		removeAll(removeArr);
		navigate(`${urlLanguage}/cart`);
		scrollToTop();
	}

	/**
	* Function to get all the products added to the wishlist.
	* 
	* @return Boolen value.
	*/
	const generateValues = async () => {
		var response = await getWishlist(authData.id, currentLanguage);

		if(response && response.status) {
			setWishlistData(response.data);
		}

		return true;
	}

	useEffect(() => {
		if(authLogin) {
			generateValues();
		}
	}, [authLogin])

	return (
		<Fragment>
			<TopBanner title={t('product_dropdown.wishlist.title')} />
			<MetaCreator {...metaProps} />

			<div className="container wishlist-page">
				<div className="container">
					<table>
						<thead>
							<tr>
								<th>{t("CART12.Product")}</th>
								<th>{t("product_dropdown.wishlist.price")}</th>
								<th>{t("product_dropdown.wishlist.review")}</th>
								<th></th>
							</tr>
						</thead>
						<tbody>

							{(wishlistData.length) ? (
								wishlistData.map((item, k) => {
									return (
										<tr>
											<td>
												<Link
													to={`${urlLanguage}/product/${item.product?.slug}`}
													className="prod-name"
												>
													<img
														src={item.product?.photo}
														alt={item.product?.title}
														className="product-image"
													/>
													{item.product?.title}
												</Link>
											</td>

											<td>${parseFloat(item.product?.price).toFixed(2)}</td>

											<td>
												<span className="star">
													<Rating stars={4.5} />
												</span>
											</td>

											<td>
												<div className="added-on">
													{t("product_dropdown.wishlist.added_date")}: {formatDate(item.created_at)}
												</div>

												<div className="act-btns">
													<button onClick={() => addSingleCart(item.product)} className="add-to-cart">
														{t("product_dropdown.add_to_cart")}
													</button>
													<button onClick={() => removeWishlist(item.product?.id, true)} className="rmv_prd">
														<i className="fa fa-trash" aria-hidden="true"></i>
													</button>
												</div>
											</td>
										</tr>
									)
								})
							) : (
								<tr>
									<td colspan="4">
										<div className="text-center no-data">{ t('product_dropdown.wishlist.empty') }</div>
									</td>
								</tr>
							)}


						</tbody>
					</table>

					{(wishlistData.length) ? (
						<div className='all-cart'>
							<button onClick={addAllToCart} className="add-to-cart">{t("product_dropdown.wishlist.add_all")}</button>
						</div>
					) : null}
				</div>
			</div>
		</Fragment>
	)
}

export default WishlistView;