import React, { useEffect, useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

import Sidebar from "../components/Sidebar";
import CurrencyConverter from "../components/CurrencyConverter";
import ApiHook from "../components/CustomHooks/ApiHook";
import Rating from "../components/Rating";
import TopBanner from '../components/TopBanner';
import MetaCreator from "../components/MetaCreator";
import { addToDirectCart } from "../reducers/cartSlice";
import { scrollToTop } from "../components/Helper";
import WishlistIcon from '../components/WishlistIcon';

const API = process.env.REACT_APP_API_URL;
const Shop = () => {

	const navigate = useNavigate();
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [currentLanguage, urlLanguage] = ApiHook();
	const [shopData, setShopData] = useState();
	const [metaProps, setMetaProps] = useState(null);
	const { authData } = useSelector((state) => state.auth);

	const sortByCategories = (event) => {
		const sortedData = [...shopData];

		switch (event.target.value) {
			case "Sort By Order":
				setShopData(sortedData.sort((a, b) => a.cat_id - b.cat_id));
				break;

			case "Sort by popularity":
				setShopData(sortedData.sort((a, b) => b.popularity - a.popularity));
				break;

			case "Sort by average rating":
				setShopData(sortedData.sort((a, b) => b.rating - a.rating));
				break;

			case "Sort by latest":
				setShopData(
					sortedData.sort(
						(a, b) => new Date(b.created_at) - new Date(a.created_at)
					)
				);
				break;

			case "Sort by price: low to high":
				setShopData(sortedData.sort((a, b) => a.price - b.price));
				break;

			case "Sort by price: high to low":
				setShopData(sortedData.sort((a, b) => b.price - a.price));
				break;

			default:
				// Default case (e.g., 'Sort By Order' by default)
				setShopData(sortedData);
				break;
		}
	}

	const onCartClick=(URL) => {
		scrollToTop();
		navigate(`${urlLanguage}/product/${URL}`)
	}

	/**
	* Function for Buy now and checkout directly for the product.
	* 
	* @return
	*/
	const onBuyNowClick = async (prod) => {
		let itemData = {
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

		dispatch(addToDirectCart(itemData));
		scrollToTop();
		navigate(`${urlLanguage}/checkout`);
	}

	/**
	* Function to get list of all the shop products.
	* 
	* @return
	*/
	const getShopList = () => {
		var params = (authData && authData.id) ? `?user=${authData?.id}` : ''

		fetch(`${API}products/filter/${currentLanguage}${params}`).then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.json();
		}).then((data) => {
			setShopData(data);
			let _metaProps = {
			tags: (data && data.seo_meta_tag) ? data.seo_meta_tag : '',
			title: (data && data.seo_meta_title) ? data.seo_meta_title : '',
			description: (data && data.seo_meta_description) ? data.seo_meta_description : '',
			}

			setMetaProps(_metaProps);
		}).catch((error) => {
			console.log("Fetch error:", error);
		});
	}

	useEffect(() => {
		navigate(`${urlLanguage}/shop`);
	}, [currentLanguage, navigate, urlLanguage]);

	useEffect(() => {
		getShopList()
	}, [currentLanguage, authData]);

	let wishProps = {
		t, currentLanguage
	}

	return (
		<Fragment>
			<TopBanner title={t('top-header.Shop')} />
			<MetaCreator {...metaProps} />

			<div className="container">
				<Sidebar></Sidebar>
				<div className="shop-section">
					<div className="row">
						{shopData && (
							<div className="Sort-By-Categories">
								<select className="select-age" onChange={sortByCategories}>
									<option value="Sort By Order"> {t("product.Sort_By_Order")}</option>
									<option value="Sort by latest">{t("product.Sort_by_latest")}</option>
									<option value="Sort by price: low to high">{t("product.Sort_by_price")}</option>
									<option value="Sort by price: high to low">{t("product.high_to_low")}</option>
								</select>
								<p className="shotting-result">
									{t('product.show_results').replace('??', shopData?.length)}
								</p>
							</div>
						)}

						{shopData &&
						shopData?.map((userData) => (
							<div key={userData.id} className="col-sm-4">
								<div className="shop-treatments">
									<WishlistIcon product={userData} {...wishProps} />

									<Link to={`${urlLanguage}/product/${userData.slug}`} onClick={() => scrollToTop()}>
										<img src={userData.photo} alt="" />
										<h3>{userData.title}</h3>

										{(userData.price || userData.price > 0) && (
											<Fragment>
												<div className="price-shop">
													<p className="price">${parseFloat(userData.price).toFixed(2)} SGD</p>
													<p className="star">
														<Rating stars={4.5} />
													</p>
												</div>

												<CurrencyConverter currency={userData.price} />
											</Fragment>
										)}
									</Link>

									<div className="home__container">
										<div className="home__row">
											<div>
												{(userData.price || userData.price > 0) ? (
													(userData.slug.includes('skype-zoom-consultation')) ? (
														<Link
															className="btn btn-primary"
															onClick={() => scrollToTop()}
															to="https://calendar.app.google/D7ESxADz3xwPncDP7"
															target="_blank"
														>
															{t('top-header.Book Consultation')}
														</Link>
													) : (
														<div 
															className={`shop-pg${(userData.product_type == 'simple-product') ? ' cart-buttons' : ''}`}
														>
															<button
																className="btn btn-primary"
																onClick={()=>{onCartClick(userData.slug)}}
															>
																{t("product_dropdown.add_to_cart")}
															</button>

															{(userData.product_type == 'simple-product') ? (
																<button
																	className="btn btn-primary buy-btn"
																	onClick={()=>{onBuyNowClick(userData)}}
																>
																	{t("product_dropdown.buy_now")}
																</button>
															) : null}
														</div>
													)
												) : (
													<Link className="btn btn-primary" onClick={() => scrollToTop()} to={`${urlLanguage}/contact-us`}>
														{t("contactUs.CONTACT US")}
													</Link>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default Shop;
