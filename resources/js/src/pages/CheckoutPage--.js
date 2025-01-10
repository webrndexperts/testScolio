import React, { useState, useEffect, Fragment, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import { trimInputValues } from "../components/Helper";
import { useAuth } from "../context/authContext";
import { login, applyCoupon, getAddress, checkCoupon } from "../Api";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { scrollToTop } from "../components/Helper";
import { Audio, Circles, ColorRing, DNA } from "react-loader-spinner";
import { selectLanguage, setLanguage, selectUrlLanguage, setUrlLanguage } from '../reducers/languageSlice';

import { useStripe, useElements, CardElement, CardNumberElement } from "@stripe/react-stripe-js";

import { Country, State } from "country-state-city";
import ApiHook from "../components/CustomHooks/ApiHook";
import { replaceItem } from "../reducers/cartSlice";
import { useDispatch } from "react-redux";
import creditCardType from "credit-card-type";
import { userLogin } from "../reducers/authSlice";
import { toast } from "react-toastify";

import { CartLogin } from "../reducers/cartLogin";
import useDynamicTitle from '../hooks/useDynamicTitle';
import { setCheckoutDetails } from '../hooks/customFunctions';
import TopBanner from '../components/TopBanner';

import PayPal from '../images/PayPal.png'
import payment_me from '../images/payment_me.png'
import papal from '../images/papal.svg'
import visa from '../images/visa.svg'
import discover from '../images/discover.svg'
import mastercard from '../images/mastercard.svg'
import amex from '../images/amex.svg'
import {
	CheckoutSidebar, BillingAddressForm, ShippingAddressFields, PaymentsListView, ShippingOptions, CheckoutLogin
} from '../components/CheckoutComponents';
import { StripeView, PaypalButton } from '../components/payments';
import LoaderIco from '../images/button-loader.svg'

const API = process.env.REACT_APP_API_URL;

const CheckoutPage = (props) => {
	const stripe = useStripe();
	const dispatch = useDispatch();
	const elements = useElements();
	const [currentLanguage, urlLanguage] = ApiHook();
	const [paymentError, setPaymentError] = useState(null);
	const { cart } = useSelector((state) => state.cart);
	const { authData, authLogin } = useSelector((state) => state.auth);
	const { lang } = useParams();

	const { i18n, t } = useTranslation();
	const navigate = useNavigate();
	const { state } = useLocation();
	const [couponMsg, setCouponMsg] = useState(null);
	const [selectedOption, setSelectedOption] = useState(null);
	const [shippingDetail, setShippingDetail] = useState();
	const [shippingChecked, setShippingChecked] = useState(false);
	const [taxRate, setTaxRate] = useState(9);
	const [couponCode, setCouponCode] = useState(null);
	const [couponDetail, setCouponDetail] = useState(null);
	const [stripeLoader, setStripeLoader] = useState(false);
	const [termCondition, setTermCondition] = useState(false);
	const [checkCondition, setcheckCondition] = useState(false);
	const [countries, setCountries] = useState([]);
	const [shippingCountries, setShippingCountries] = useState([]);
	const [shippingStates, setShippingStates] = useState([]);
	const [states, setStates] = useState([]);
	const [open, setOpen] = useState(false);
	const [shippingRatesList, setShippingRatesList] = useState('');
	const [checkData, setcheckData] = useState(false);
	const [IsCheck, setIsCheck] = useState(true);
	const [checkLogin, setCheckLogin] = useState(false);
	const [cardType, setCardType] = useState("");
	const [selectedCountry, setSelectedCountry] = useState("");
	const [selectedState, setSelectedState] = useState("");
	const [selectedShippingState, setSelectedShippingState] = useState("");
	const [selectedShippingCountry, setSelectedShippingCountry] = useState("");
	const [leftLoader, setLeftLoader] = useState(false);

	const [shippigCharges, setShippigCharges] = useState(0);
	const [totalPrice, setTotalPrice] = useState('0');
	const [paymentType, setPaymentType] = useState('stripe');
	const [totalQuantity, setTotalQuantity] = useState(0);
	const [couponPrice, setCouponPrice] = useState('0');
	const [taxPrice, setTaxPrice] = useState('0');
	const [subTotalPrice, setSubTotalPrice] = useState('0');
	const [payedByPaypal, setPayedByPaypal] = useState(false);
	const formRef = useRef({});
	const paypalRef = useRef({});

	const [stripeError, setStripeError] = useState(null);
	const [triggerCouponCheck, setTriggerCouponCheck] = useState(true);
	const [digital, setDigital] = useState(false)
	const {
		register: loginForm,
		handleSubmit: handleLogin,
		reset: loginReset,
		formState: { errors: loginError },
	} = useForm();
	const {
		register: couponForm,
		handleSubmit: handlecoupon,
		reset: couponReset,
		formState: { errors: couponError },
	} = useForm();
	const {
		register: billingForm,
		handleSubmit: handlebilling,
		setError,
		control,
		clearErrors,
		getValues: billingGetValues,
		setValue: billingSetValue,
		reset: billingReset,
		formState: { errors: billingError },
	} = useForm();

	const [formData, setFormData] = useState({
		firstname: "",
		email: "",
		password: "",
		changepassword: "",
		lastname: "",
	});

	const newArray = cart.map((item) => ({
		product_id: item.id,
		quantity: item.quantity,
	}));

	const grouped_product_attributes = cart.map((item) => ({
		Customized: item.attriuteCustomized,
		Gender: item.attriuteGender,
		Height: item.attriuteHeight,
		Image: item.attriuteImg,
		Language: item.attriuteLang,
		Size: item.attriuteSize,
		Tool: item.attriuteTool,
		Weight: item.attriuteWeight,
	}));

	const dimension_Data = cart.map((item) => ({
		dimension_height: item.dimension_height,
		dimension_length: item.dimension_length,
		dimension_weight: item.dimension_weight,
		product_actual_weight: item.product_actual_weight,
	}));

	const Loginuser = (data) => {
		const trimData = trimInputValues(data);
		login(trimData).then((data) => {
			if (data?.success === true) {
				dispatch(userLogin(data));
				navigate(`${urlLanguage}/checkout`);
			}
		});

		loginReset();
	}



	const getShippingDimensions = async () => {
		var obj = {
		   _length: 0 , _weight: 0, _quantity: 0, _height: 0 , _actualWeight: 0 , _totalWeight: 0 ,
	   }
	   cart.forEach(item => {
		  
		   if(cart && item.productType !== "aws3-bucket-product") {
			   obj._quantity = (obj._quantity) ? obj._quantity : parseInt(item.quantity);
			   
			   obj._length = (obj._length) ? obj._length : parseFloat(item.dimension_length).toFixed(2);
			   obj._weight = (obj._weight) ? obj._weight : parseFloat(item.dimension_weight).toFixed(2);
			   obj._height = (obj._height) ? obj._height : parseFloat(item.dimension_height).toFixed(2);
			   obj._actualWeight = (obj._actualWeight) ? obj._actualWeight : parseFloat(item.product_actual_weight).toFixed(2);
			   obj._totalWeight = (obj._totalWeight) ? obj._totalWeight : parseFloat(item.product_actual_weight).toFixed(2);
		   }

	   });

	   return obj;
   }


	const ChangeAddressSubmit = async (type = 'shipping') => {

		const dimensions = await getShippingDimensions();
	if(dimensions) {

		let data = {}; setLeftLoader(true);
		data["contact_name"] = (authData && authData.id) ? authData.name : "";
		data["contact_email"] = (authData && authData.id) ? authData.email : 'info@scoliolife.com';
		// data["parcels_box_length"] = cart[0].dimension_length;
		// data["parcels_box_width"] = cart[0].dimension_weight;
		// data["parcels_box_height"] = cart[0].dimension_height;
		data["parcels_box_length"] = dimensions._length;
		data["parcels_box_width"] = dimensions._weight;
		data["parcels_box_height"] = dimensions._height;
		// data["items_quantity"] = cart[0].quantity;
		data["items_quantity"] = dimensions._quantity;
		data["items_description"] = cart[0].title;
		data["items_category"] = "Health & Beauty";
		data["items_declared_currency"] = "SGD";
		// data["items_actual_weight"] = cart[0].product_actual_weight;
		data["items_actual_weight"] = dimensions._actualWeight;
		data["items_declared_customs_value"] = 1;
		// data["total_actual_weight"] = cart[0].product_actual_weight;
		data["total_actual_weight"] = dimensions._totalWeight;

		if(type == 'billing') {
			data["country_alpha2"] = (billingGetValues('country')) ? billingGetValues('country') : '';
			data["state"] = (billingGetValues('state')) ? billingGetValues('state') : 'Lorem';
			data["city"] = (billingGetValues('town')) ? billingGetValues('town') : 'Lorem';
			data["postal_code"] = (billingGetValues('postcode')) ? billingGetValues('postcode') : '12345';
		} else {
			data["country_alpha2"] = (billingGetValues('shippingCountry')) ? billingGetValues('shippingCountry') : '';
			data["state"] = (billingGetValues('shippingState')) ? billingGetValues('shippingState') : 'Lorem';
			data["city"] = (billingGetValues('shippingTown')) ? billingGetValues('shippingTown') : 'Lorem';
			data["postal_code"] = (billingGetValues('shippingPostcode')) ? billingGetValues('shippingPostcode') : '12345';
		}
		

		
				try {
					localStorage.removeItem("checkAddressSelect")
					const shippingData = await axios.post(`${API}shipping-rates`, data);
					setLeftLoader(false);
					
					localStorage.setItem("shippingData", JSON.stringify(shippingData?.data));
					setShippingDetail(shippingData?.data);
					setSelectedOption(shippingData?.data?.data[0]);
					setShippigCharges(shippingData?.data?.data[0].total_charge);

					localStorage.setItem("checkAddressSelect", JSON.stringify(shippingData?.data?.data[0]));
					var focusDiv = document.getElementById('shipping-options');

					if (focusDiv) {
						focusDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
					}
				} catch (error) {
					setLeftLoader(false);
					console.log("Shipping details----erorr", error);
				}
		}
			
	}

	// const handleCardElementChange = (element) => (event) => {
	// 	if (event.complete) {
	// 		clearErrors(element);
	// 	} else if (event.error) {
	// 		setError(element, {
	// 			type: "manual",
	// 			message: event.error.message,
	// 		});
	// 	}
	// }

	const handleCardElementChange = (event) => {
		const { complete, elementType } = event;
		
		if (complete && elementType === 'card') {
			const cardBrand = event.brand;
			setCardType(cardBrand);
		} else {
			setCardType(null);
		}
	}

	const CheckCondition = () => {
		setTermCondition(!termCondition);
		setcheckCondition(false);
	}

	const handleOptionChange = (e) => {
		var vall = JSON.parse(e.target.value);
		
		localStorage.setItem("checkAddressSelect", e.target.value);
		setSelectedOption(vall);
		setShippigCharges(vall.total_charge);
	}

	const getCouponData = () => {
		var _coupon = sessionStorage.getItem("discountCoupon");

		if(_coupon && typeof _coupon != 'undefined') {
			_coupon = JSON.parse(_coupon);

			if(_coupon && _coupon.data && _coupon.data.coupon_name) {
				checkCoupon({ coupon: _coupon.data.coupon_name, user_id: authData.id }).then((response) => {
					if(response && response.status) {
						sessionStorage.removeItem("discountCoupon");
						setCouponDetail(null);
						toast.error(t('toast.coupon.already'), { className: 'full-red-alert', autoClose: 5000 });
					}
				}).catch(err => {
					console.log("Error getting coupon details:", err);
				})
			}
		}
	}

	const applyCouponCode = async (data) => {
		data['user_id'] = (authData && authData.id) ? authData.id : '';

		const trimData = trimInputValues(data);
		applyCoupon(trimData).then((response) => {
			if (typeof response != 'undefined' && response.status) {
				sessionStorage.setItem("discountCoupon", JSON.stringify(response));
				setCouponMsg(t('toast.coupon.applied'));
			} else {
				toast.error(t(response.message), { className: 'full-red-alert', autoClose: 5000 });
			}

			couponReset();

			setTimeout(() => {
				setCouponMsg(null);
			}, 10000);
		}).catch((error) => {
			console.log("Error in rating data:", error);
		});
	}

	const RemoveDiscount = () => {
		setCouponDetail(null);
		setCouponMsg(null);
		sessionStorage.removeItem("discountCoupon");
		setCouponCode(null);
	}

	const getUserAddress = async () => {
		let data = JSON.parse(localStorage.getItem('userData')),
			_options = {
				setSelectedCountry, setSelectedState, setSelectedShippingState, setSelectedShippingCountry,
				countries: Country.getAllCountries(), states: State, setStates, setShippingStates, page: "checkout"
			};

		if (data && typeof data != 'undefined') {
			var { user_data } = data;

			if (user_data && user_data.id) {
				getAddress(user_data.id).then((response) => {
					setCheckoutDetails(billingSetValue, response, _options);
				}).catch((error) => {
					console.log("Error in getting address data:", error);
				});
			} else {
				setCheckoutDetails(billingSetValue, {}, _options);
			}
		} else {
			setCheckoutDetails(billingSetValue, {}, _options);
		}
	}

	const getShippingDetails = () => {
		let data = JSON.parse(localStorage.getItem("shippingData"));
		setShippingDetail(data);
		
		var oldVal = localStorage.getItem("checkAddressSelect");

		if (oldVal && typeof oldVal != 'undefined' && oldVal !== 'null') {
			var _val = JSON.parse(oldVal);
			setSelectedOption(_val);
			setShippigCharges(_val.total_charge);
		} else {
			if (data?.data?.[0]) {
				setSelectedOption(data.data[0]);
				setShippigCharges(data.data[0].total_charge);
				localStorage.setItem("checkAddressSelect", JSON.stringify(data.data[0]));
			} else {
				localStorage.removeItem("checkAddressSelect");
			}
		}
	}

	const handleCountryChange = (selectedCountryCode, changeValue) => {
		const stateList = State.getStatesOfCountry(selectedCountryCode);
		changeValue(stateList);
	}

	const onCountryChange = (selectedVal) => {
		setSelectedCountry(selectedVal);
		billingSetValue('country', selectedVal?.isoCode);
		billingSetValue('state', '');
		setSelectedState(null);
		handleCountryChange(selectedVal?.isoCode, setStates);

		ChangeAddressSubmit('billing')
		
		
	}

	const onStateChange = (selected) => {
		setSelectedState(selected);
		billingSetValue('state', selected?.name);
	}

	const onShippingCountryChange = (selectedVal) => {
		setSelectedShippingCountry(selectedVal);
		billingSetValue('shippingCountry', selectedVal?.isoCode);
		billingSetValue('shippingState', '');
		setSelectedShippingState(null);
		handleCountryChange(selectedVal?.isoCode, setShippingStates);
		
	
		ChangeAddressSubmit();
		
	}

	const onShippingStateChange = (selected) => {
		setSelectedShippingState(selected);
		billingSetValue('shippingState', selected?.name);
	}

	const handleShippingCountryChange = (e) => {
		const selectedCountryCode = e.target.value;
		const stateList = State.getStatesOfCountry(selectedCountryCode);
		setShippingStates(stateList);
	};

	const getCountryData = () => {
		const countryList = Country.getAllCountries();
		setCountries(countryList);
		setShippingCountries(countryList);
		scrollToTop();
	}

	const checkForCoupon = () => {
		var _coupon  = sessionStorage.getItem("discountCoupon");

		if(_coupon && typeof _coupon != 'undefined') {
			setCouponDetail(JSON.parse(_coupon));
		}
	}

	const taxRates = async () => {
		let data = {
			tax_rate: "9.00",
			tax_name: "GST",
		}
		try {
			const ratesData = await axios.get(`${API}tax-product`, data);
			let tax = ratesData?.data[0].tax_rate;
			setTaxRate(parseFloat(tax));
		} catch (error) {
			console.log("enquiryData----erorr", error);
		}
	}

	const changePaymentMethod = (val) => {
		setPaymentType(val);
	}

	const handleShippingAddress = (event) => {
		if (event.target.value === "on") {
			setShippingChecked((previousValue) => !previousValue);
		} else {
			setShippingChecked(false);
		}
	}

	const checkOutMethod = async (data) => {
		try {
			const checkOutDat = await axios.post(`${API}orders-checkout`, data);

			if (checkOutDat?.data?.status === "true") {
				navigate(
					`${urlLanguage}/orders/${checkOutDat?.data?.order_id}`,
					{ state: checkOutDat?.data?.order_id }
				);

				dispatch(replaceItem([]));
				localStorage.removeItem("cart");
				localStorage.removeItem('paypalPay');
				sessionStorage.removeItem("discountCoupon");
				setPayedByPaypal(false);
				scrollToTop();
				setStripeLoader(false);
			}
		} catch (error) {
			console.log("checkOut error===========", error);
			setStripeLoader(false);
		}
	}

	const generateRandomNumber = () => {
		const number = Math.floor(100000 + Math.random() * 900000);
		return number;
	}

	const paypalPaymentApprove = async (data) => {
		if (data && data.orderID) {
			setPayedByPaypal(true);
			localStorage.setItem('paypalPay', JSON.stringify(data));
			handlebilling(BillingSubmit)();
		} else {
			setPayedByPaypal(false);
			toast.error(t('toast.payment.error'));
		}
	}

	const paypalPaymentFailed = async (data) => {
		console.log('------------paypal payment failed', data);
	}

	const createStripePayment = async (data, cardElement) => {
		try {	
			const { token, error } = await stripe.createToken(cardElement,{
				name: (authData && authData.id) ? authData.name : '',
				email: (authData && authData.id) ? authData.email : 'scolio@customer.com',
			});
				console.log(token)
			if (error) {
				console.log("Error creating token:", error);
				setStripeLoader(false);
				setStripeError(error.message);
			} else {
				setPaymentError(null);

				fetch(`${API}stripe-payment`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						token: token.id,
						amount: parseFloat(totalPrice).toFixed(2),
						customer_name: (authData && authData.id) ? authData.name : '',
						customer_email: (authData && authData.id) ? authData.email : 'scolio@customer.com',
					}),
				}).then((response) => response.json()).then((responsedata) => {
					console.log('payment success', responsedata);

					if(responsedata && responsedata.success) {
						data["payment_id"] = responsedata?.charge.id;
						checkOutMethod(data);
					} else {
						// toast.error(t('payments.error'));
						errorToast(responsedata.message);
						setStripeLoader(false);
					}
				}).catch((error) => {
					console.log("Error sending token to server:", error);
					setStripeLoader(false);	
				});
			}
		} catch (error) {
			console.log("An error occurred:", error);
			setStripeLoader(false);
			setPaymentError("An error occurred during payment.");
		}
	}

	const errorToast = (message) => {
		toast.error(message, { className: 'full-red-alert', autoClose: 5000 });
		var main = document.getElementById('stripe-card-view');

		if(main) {
			main.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}

	const BillingSubmit = async (data) => {
		var _couponName = (couponDetail && couponDetail?.data && couponDetail?.data?.coupon_name)
			? couponDetail?.data?.coupon_name : '';

		var _lang = 'en';
		if(!currentLanguage.includes('en')) {
			var _arr = currentLanguage.split('_');
			_lang = _arr[1].toLowerCase();
		}

		data["userId"] = authData?.id;
		data['lang'] = _lang;
		data['language'] = currentLanguage;
		data["shipping_method_name"] = selectedOption?.courier_name;
		data["shipping_id"] = selectedOption?.courier_id;
		data["shipping_rates_list"] = JSON.stringify(shippingRatesList);
		data["shippig_charges"] = shippigCharges;
		data['propductType'] = (cart  && cart.length == 1 && cart[0].productType == 'aws3-bucket-product') ? 'amazon' : 'normal';
		data["sub_total"] = parseFloat(totalPrice).toFixed(2);
		data["quantity"] = totalQuantity;
		data["total_amount"] = subTotalPrice;
		data["gst_tax"] = taxPrice;
		data["coupon_price"] = couponPrice;
		data["discount_couponcode"] = _couponName;
		data["product_items"] = newArray;

		data["dimension_height"] = cart.reduce((sum, item) => {
			var _val = (item.dimension_height) ? item.dimension_height : 0;
			var total_dimension_height = parseFloat(sum) + + +parseFloat(_val);
			return parseFloat(total_dimension_height).toFixed(2);
		}, 0);
		data["dimension_length"] = cart.reduce((sum, item) => {
			var _val = (item.dimension_length) ? item.dimension_length : 0;
			var total_dimension_length = parseFloat(sum) + + +parseFloat(_val);
			return parseFloat(total_dimension_length).toFixed(2);
		}, 0);

		data["dimension_weight"] = cart.reduce((sum, item) => {
			var _val = (item.dimension_weight) ? item.dimension_weight : 0;
			var total_dimension_weight = parseFloat(sum) + + +parseFloat(_val);
			return parseFloat(total_dimension_weight).toFixed(2);
		}, 0);
		data["product_actual_weight"] = cart.reduce((sum, item) => {
			var _val = (item.product_actual_weight) ? item.product_actual_weight : 0;
			var total_product_actual_weight = parseFloat(sum) + + +parseFloat(_val);
			return parseFloat(total_product_actual_weight).toFixed(2);
		}, 0);

		data["grouped_product_attributes"] = grouped_product_attributes[0];
		data["stripe_total_price"] = totalPrice;
		data["payment_type"] = paymentType;

		const newRandomNumber = generateRandomNumber();
		data["order_number"] = newRandomNumber;

		if (termCondition) {
			if (authLogin) {
				if (totalPrice == '0') {
					setStripeLoader(true);
					checkOutMethod(data);
				} else {
					if (paymentType == 'paypal') {
						// after paypal payment is done
						var payed = localStorage.getItem('paypalPay');
						payed = JSON.parse(payed);

						data["payment_id"] = payed.orderID;
						setStripeLoader(true);
						checkOutMethod(data);
					} else {
						// pay through stripe payment.
						if (!stripe) {
							console.log("Stripe.js has not yet loaded.");
							errorToast("Please try other payment method");
							return;
						}

						// const cardElement = elements.getElement(CardElement);

						// if (!cardElement) {
						// 	console.log("CardElement not found.");
						// 	return;
						// }
						const cardElement = elements.getElement(CardNumberElement);

						const { error } = await stripe.createPaymentMethod({
							type: 'card',
							card: cardElement,
						});

						if (error) {
							console.log("CardElement not found.", error);
							errorToast(error.message);
							setStripeError(error.message);
							return;
						}

						setStripeError(null);
						setStripeLoader(true);
						createStripePayment(data, cardElement);
					}
				}
			} else {
				toast.error(t('toast.validate.login'), {
					className: 'full-red-alert',
					autoClose: 5000
				});
			}
		} else {
			setcheckCondition(true);
		}
		
	}

	const navigateToCheckout = () => {
		navigate(`${urlLanguage}/checkout`);
	}

	useEffect(() => {
		if(authData && authData.id) {
			if(triggerCouponCheck) {
				setTriggerCouponCheck(false);
				getCouponData();
			}

			billingSetValue("shippingFirstName", authData.name);
			billingSetValue("shippingEmail", authData.email);
			billingSetValue("firstName", authData.name);
			billingSetValue("email", authData.email);
		}
	}, [authData, triggerCouponCheck]);

	useEffect(() => {
		const isCouponCode = JSON.parse(sessionStorage.getItem("discountCoupon"));
		const percent = isCouponCode ? isCouponCode?.data?.coupon_percent
			? parseInt(isCouponCode?.data?.coupon_percent, 10) : parseInt(isCouponCode?.coupon_percent, 10)
			: null;

		setCouponCode(percent);
		setCouponDetail(isCouponCode);
	}, [couponMsg]);

	useEffect(() => {
		if (state && state.shippingDetail) {
			setShippingRatesList(state.shippingDetail.data)
		}
	}, [state])

	useEffect(() => {
		if (typeof lang != 'undefined' && lang !== currentLanguage) {
			dispatch(setUrlLanguage(i18n.language));
			dispatch(setLanguage(i18n.language));
			navigateToCheckout();
		}

		if (typeof lang == 'undefined') {
			dispatch(setUrlLanguage('en_US'));
			dispatch(setLanguage('en_US'));
			navigateToCheckout();
		}
	}, [i18n.language, currentLanguage, dispatch, navigate, lang]);

	useEffect(() => {
		try {
			if (Object.keys(billingError).length > 0) {
				const firstErrorField = Object.keys(billingError)[0];
				const errorElement = document.getElementById(firstErrorField);

				if (errorElement) {
					errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
					errorElement.focus();
				}
			}
		} catch (error) {
			console.log("billing scroll issue", error);
		}
	}, [billingError]);

	useEffect(() => {
		// getCountryData();
		// getShippingDetails();	
		taxRates();
		getUserAddress();
		checkForCoupon();
	}, []);





	useEffect(() => {
		if(cart && cart.length === 1 && cart[0].productType ==	"aws3-bucket-product"){
			localStorage.removeItem('shippingData')
			localStorage.removeItem('shippingCartAddress')
			localStorage.removeItem('checkAddressSelect')
			setShippingDetail(null)
			setShippigCharges(0)
			setDigital(true)
		}else{
			getShippingDetails();
			
		}
		getCountryData();
	}, [cart])



	let sidebarProps = {
		totalPrice, setTotalPrice, cart, t, dispatch, couponCode, shippigCharges, taxRate, shippingDetail, selectedOption,
		handleOptionChange, couponDetail, handlecoupon, applyCouponCode, couponForm, couponError, couponPrice, setCouponPrice,
		taxPrice, setTaxPrice, subTotalPrice, setSubTotalPrice, setTotalQuantity, RemoveDiscount, couponMsg, digital
	}

	let shippingProps = {
		billingForm, billingError, t, selectedShippingState, selectedShippingCountry, shippingCountries, shippingStates,
		onShippingCountryChange, onShippingStateChange
	}

	let billingProps = {
		billingForm, billingError, t, shippingChecked,
		selectedCountry, onCountryChange, countries, selectedState, onStateChange, states
	}

	let shipProviderProps = { shippingDetail, selectedOption, t, handleOptionChange };

	let stripeProps = {
		billingError, billingForm, handleCardElementChange, stripeError, t
	}

	let paypalProps = {
		paypalRef, paypalPaymentApprove, totalPrice, t, paypalPaymentFailed
	}

	let loginProps = {
		handleLogin, Loginuser, t, checkLogin, loginForm, loginError
	}


	let payProps = {
		setPaymentType, stripeProps, t
	}

	return (
		<Fragment>
			<TopBanner title={t("main-nav.CHECKOUT")} />

			<div className='checkout-new-page'>
				<div className="row">
					<div className="col-md-6">
						{(leftLoader) ? (
							<div className="btn-loader">
								<img src={LoaderIco} alt="loader-button" />
							</div>
						) : null}

						<div className='checkout-left'>
							{/*<h6 className='express-text'>{t("checkOut.Express Checkout")}</h6>
							<div className='express-checkout-design'>
								<div className={`payment-div ${(paymentType == 'paypal') ? 'active' : ''}`}>
									<button type="button" onClick={() => changePaymentMethod('paypal')}>
										<img src={PayPal} alt="" />
									</button>
								</div>

								<div className={`payment-div ${(paymentType == 'stripe') ? 'active' : ''}`}>
									<button type="button" className='payment_me' onClick={() => changePaymentMethod('stripe')}>
										<img src={payment_me} alt="" />
									</button>
								</div>
							</div>

							<p className='or-design'>{t("checkOut.or")}</p>
							<hr></hr>*/}

							{(!authLogin) ? (
								<Fragment>
									<div className='login-check'>
										<h2> </h2>
										<Link onClick={() => setCheckLogin(!checkLogin)}>{t("checkOut.Click here to login")}</Link>
									</div>

									<CheckoutLogin {...loginProps} />
								</Fragment>
							) : null}

							{/*<input type="text" id="" name="" placeholder="Phone number or email" required/>*/}

							<div className='deliver-check'>
								<h2> {t("checkOut.Billing Address")}</h2>

								<form onSubmit={handlebilling(BillingSubmit)} ref={formRef}>

									<BillingAddressForm {...billingProps} />

									{!digital && <ShippingOptions {...shipProviderProps} />}

									{!digital && <div className="shipping-checkbox">
										<label className='billing-same'>	
											<input
												type="checkbox"
												name="sameadr"
												checked={shippingChecked === false ? "checked" : ""}
												onChange={handleShippingAddress}
											/>

											<b className="text-dark">{t("checkOut.Ship To A Different Address")}</b>
										</label>
									</div>}

									{(shippingChecked === false) && !digital ? (
										<Fragment>
											{/*<h2 className='method-ses'>{t("checkOut.Ship To A Different Address")}</h2>*/}
											<ShippingAddressFields {...shippingProps} />
										</Fragment>
									) : null}

									{(totalPrice != '0') ? (
										<PaymentsListView {...payProps} />
									) : null}

									<div className="checkbox-card">
										<input
											type="checkbox"
											id="vehicle1"
											name="vehicle1"
											value="Bike"
										/>
										<label htmlFor="vehicle1">
											{" "}
											{t("checkOut.Information")}
										</label>
									</div>

									<p className="form-row validate-required mt-4">
										<label
											className="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox"
										>
											<input
												type="checkbox"
												className="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox"
												name="terms"
												id="terms"
												onChange={(e) => CheckCondition(e)}
											/>
											<span className="woocommerce-terms-and-conditions-checkbox-text text-danger">
												{t("checkOut.website")}{" "}
												<Link
													to={`${urlLanguage}/terms-of-use`}
													className="woocommerce-terms-and-conditions-link"
													target="_blank"
												>
													{t("checkOut.terms and conditions")}
												</Link>
											</span> <span className="required">*</span>
										</label>
										<input type="hidden" name="terms-field" value="1" />
									</p>

									{checkCondition && (
										<span className="woocommerce-terms-and-conditions-checkbox-text text-danger">
											{t("checkOut.Please check the terms and conditions")} {" "}
										</span>
									)}
									<span className="woocommerce-terms-and-conditions-checkbox-text text-danger">
											{t("checkOut.Please check the terms and conditions")} {" "}
										</span>

									{(stripeLoader) ? (
										<Circles
											height="80"
											width="80"
											radius="9"
											color="green"
											ariaLabel="loading"
											wrapperClass
										/>
									) : (
										(paymentType == 'paypal' && totalPrice > 0 && !payedByPaypal) ? (
											<PaypalButton {...paypalProps} />
										) : (
											<button
												className="checkout-submit"
												type="submit"
											>
												{t("CART12.Proceed to checkout")}
											</button>

										)
									)}

								</form>
							</div>
						</div>
	                 </div>

					<CheckoutSidebar {...sidebarProps} />
				</div>
			</div>
		</Fragment>
	)
}

export default CheckoutPage;