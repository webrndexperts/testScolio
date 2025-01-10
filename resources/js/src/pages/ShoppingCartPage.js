import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartComponents/CartItem";
import Total from "../components/CartComponents/Total";
import { useForm } from "react-hook-form";
import { applyCoupon, checkCoupon } from "../Api";
import { trimInputValues } from "../components/Helper";
import { useTranslation } from "react-i18next";
import ApiHook from "../components/CustomHooks/ApiHook";
import { BiCalendarHeart } from "react-icons/bi";
import { toast } from "react-toastify";
import { setLanguage, setUrlLanguage } from '../reducers/languageSlice';
import TopBanner from '../components/TopBanner';
import { scrollToTop } from "../components/Helper";

const ShoppingCartPage = () => {
	const { i18n, t } = useTranslation();
	const { lang } = useParams();
	const navigate = useNavigate();
	const [currentLanguage, urlLanguage] = ApiHook();
	const dispatch = useDispatch();
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { cart } = useSelector((state) => state.cart);
	const { authData } = useSelector((state) => state.auth);
	const [couponCode, setCouponCode] = useState(1);
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");

	const getCouponData = () => {
		var _coupon = sessionStorage.getItem("discountCoupon");

		if(_coupon && typeof _coupon != 'undefined') {
			_coupon = JSON.parse(_coupon);

			if(_coupon && _coupon.data && _coupon.data.coupon_name) {
				checkCoupon({ coupon: _coupon.data.coupon_name, user_id: authData.id }).then((response) => {
					if(response && response.status) {
						sessionStorage.removeItem("discountCoupon");
						setCouponCode(couponCode + 1);
						toast.error(t('toast.coupon.already'), { className: 'full-red-alert', autoClose: 5000 });
					}
				}).catch(err => {
					console.log("Error getting coupon details:", err);
				})
			}
		}
	}

	const applyCouponCode = (data) => {
		data['user_id'] = (authData && authData.id) ? authData.id : '';

		const trimData = trimInputValues(data);
		applyCoupon(trimData).then((response) => {
			setCouponCode(couponCode + 1);

			if (response.status) {
				sessionStorage.setItem("discountCoupon", JSON.stringify(response));
				setMsg(response.message);
				reset();
			} else {
				setError(response.message);
			}
			reset();
		}).catch((error) => {
			console.log("Error in rating data:", error);
		});
	};

	const navigateToOrder = () => {
		navigate(`${urlLanguage}/cart`);
	};

	useEffect(() => {
		if (typeof lang != 'undefined' && lang !== currentLanguage) {
			dispatch(setUrlLanguage(i18n.language));
			dispatch(setLanguage(i18n.language));
			navigateToOrder();
		}

		if(typeof lang == 'undefined') {
			dispatch(setUrlLanguage('en_US'));
			dispatch(setLanguage('en_US'));
			navigateToOrder();
		}
	}, [i18n.language, currentLanguage, dispatch, navigate, lang]);

	useEffect(() => {
		if(cart && !cart.length) {
			sessionStorage.removeItem('discountCoupon');
			sessionStorage.removeItem('checkAddressSelect');
		}
	}, [cart])

	useEffect(() => {
		if(authData && authData.id) {
			getCouponData();
		}
	}, [authData])

	useEffect(() => {
		scrollToTop()
	}, [])

	let totalProps = {
		cart, t, couponCodes: couponCode, dispatch, lang, navigate
	}
	return (
		<Fragment>
			<TopBanner title={t("main-nav.CART")} />

			<div className="cart-page">
				<div className="container mt-5">
					<div className="row">
						{cart.length === 0 ? (
							<div className="entry-content rnd-test">
								<div className="woocommerce">
									<div className="wc-empty-cart-message">
										<div className="cart-empty woocommerce-info">
											<BiCalendarHeart />
											{t("CART12.Your cart is currently empty")}
											
										</div>
									</div>{" "}
									<p className="return-to-shop">
										<Link
											className="button wc-backward"
											to={`${urlLanguage}/shop`}
										>
											{t("CART12.Return to shop")}
										
										</Link>
									</p>
								</div>
							</div>
						) : (
							<Fragment>
								<div className="col-sm-8">
									{cart?.map((item) => (
										<CartItem
											{...item}
											cart={cart}
											urlLanguage={urlLanguage}
											dispatch={dispatch}
											t={t}
											key={item.id}
										/>
									))}

									<div className="coupon">
										{msg && <div style={{ color: "green" }}>{t(msg)}</div>}
										{error && <div style={{ color: "red" }}>{t(error)}</div>}

										<label htmlFor="coupon_code">
											{t("CART12.APPLY COUPON CODE")}
										</label>

										<div className="custom_coupon_code">
											<form onSubmit={handleSubmit(applyCouponCode)}>
												<input
													{...register("coupon_code", { required: true })}
													type="text"
													name="coupon_code"
													className="input-text"
													id="coupon_code"
													placeholder="Coupon Code"
												/>
												{errors.coupon_code && (
													<p className="validations">
														{t("CART12.Please enter your coupon code")}
													
													</p>
												)}
												<button
													type="submit"
													className="button"
													name="apply_coupon"
													value="Apply coupon"
												>
													{t("CART12.Apply Coupon Code")}
												</button>
											</form>
										</div>
									</div>
								</div>

								<Total {...totalProps} />
							</Fragment>
						)}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default ShoppingCartPage;
