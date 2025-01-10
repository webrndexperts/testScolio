import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Country, State } from "country-state-city";
import Collapse from "react-bootstrap/Collapse";
import { scrollToTop } from "../Helper";

import { selectLanguage, selectUrlLanguage } from "../../reducers/languageSlice";
import { fetchMenuItem } from "../../reducers/menuItemSlice";
import FormFields from './FormFields';
import LoaderIco from '../../images/button-loader.svg'

const API = process.env.REACT_APP_API_URL;

const Total = (props) => {
	const { cart, t, couponCodes, dispatch, lang, navigate } = props;

	const [totalPrice, setTotalPrice] = useState('0');
	const [couponPrice, setCouponPrice] = useState('0');
	const [taxPrice, setTaxPrice] = useState('0');
	const [subTotalPrice, setSubTotalPrice] = useState('0');
	const [shippigCharges, setShippigCharges] = useState(0);

	const [countries, setCountries] = useState([]);
	const [searchcountries, setSearchcountries] = useState();
	const [searchVal, setSearchVal] = useState(null);
	const [open, setOpen] = useState(true);
	const [states, setStates] = useState([]);
	const [taxRate, setTaxRate] = useState(9);
	const [selectedOption, setSelectedOption] = useState(null);
	const [couponCode, setCouponCode] = useState(null);
	const [couponDetail, setCouponDetail] = useState(null);
	const [couponRefresh, setCouponRefresh] = useState(1);
	const [shippingDetail, setShippingDetail] = useState();
	const currentLanguage = useSelector(selectLanguage);
	const urlLanguage = useSelector(selectUrlLanguage);
	const { authData } = useSelector((state) => state.auth);
	const form = useRef(null);
	const [formErrors, setFormErrors] = useState(null);
	const [counterShip, setCounterShip] = useState(0);
	const [stateFirst, setStateFirst] = useState(0);
	const [selectedCountry, setSelectedCountry] = useState('');
	const [selectedState, setSelectedState] = useState('');
	const [shippingCountry, setShippingCountry] = useState('');
	const [shippingState, setShippingState] = useState('');
	const [shippingCity, setShippingCity] = useState('');
	const [shippingPin, setShippingPin] = useState('');
	const [loader, setLoader] = useState(false);
	const [digital, setDigital] = useState(false);
	const [ipAddress, setIpAddress] = useState('');
	const [isCartDataStored, setIsCartDataStored] = useState(false);
	const {
	    register: billingForm,
	    handleSubmit: handlebilling,
	    reset: billingReset,
	    control,
	    formState: { errors: billingError },
  	} = useForm();

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

	const handleValuesChange = (e, changeValue, name) => {
		var _vals1 = shippingDetail;

		if(_vals1 && _vals1.shipping_information) {
		_vals1.shipping_information[name] = e.target.value;
		setShippingDetail(_vals1)
		}

		changeValue(e.target.value);
	}

	const handleFormSubmit = (e) => {
		e.preventDefault();

		if(!shippingCountry || !shippingState || !shippingCity || !shippingPin) {
		  	let _error = {
		    	country: (!shippingCountry) ? true : false,
		    	state: (!shippingState) ? true : false,
			    city: (!shippingCity) ? true : false,
			    postal_code: (!shippingPin) ? true : false,
		  	};

		  	setFormErrors(_error);
		} else {
		  setFormErrors(null);
		  	var details = {
			    "country_alpha2": shippingCountry,
			    "state": shippingState,
			    "city": shippingCity,
			    "postal_code": shippingPin
		  	}

		  	setLoader(true);
		  	localStorage.setItem('shippingCartAddress', JSON.stringify(details));

			ChangeAddressSubmit(details);
	

		}
	}


	// const getShippingDimensions = async () => {
	//  	var obj = {
	// 		_length: 0 , _weight: 0, _quantity: 0, _height: 0 , _actualWeight: 0 , _totalWeight: 0 ,
	// 	}
	// 	cart.forEach(item => {
			
	// 		if(cart && item.productType !== "aws3-bucket-product") {
	// 			obj._quantity = (obj._quantity) ? obj._quantity : parseInt(item.quantity);
				
	// 			obj._length = (obj._length) ? obj._length : parseFloat(item.dimension_length).toFixed(2);
	// 			obj._weight = (obj._weight) ? obj._weight : parseFloat(item.dimension_weight).toFixed(2);
	// 			obj._height = (obj._height) ? obj._height : parseFloat(item.dimension_height).toFixed(2);
	// 			obj._actualWeight = (obj._actualWeight) ? obj._actualWeight : parseFloat(item.product_actual_weight).toFixed(2);
	// 			obj._totalWeight = (obj._totalWeight) ? obj._totalWeight : parseFloat(item.product_actual_weight).toFixed(2);
	// 		}

	// 	});

	// 	return obj;
	// }
	
	const getShippingDimensions = async () => {
	   var obj = {
				_length: 0 , _weight: 0, _quantity: 0, _height: 0 , _actualWeight: 0 , _totalWeight: 0 ,
			}
	   cart.forEach(item => {
		   if(item.productType !== "aws3-bucket-product") {
			   obj._quantity += parseInt(item.quantity); // Sum quantities
			   
			   // Assuming you are adding up dimensions. You may want to use max dimensions instead of sum depending on your logic.
			   obj._length += parseFloat(item.dimension_length || 0); 
			   obj._weight += parseFloat(item.dimension_weight || 0);
			   obj._height += parseFloat(item.dimension_height || 0);
			   
			   // Total actual weight based on product weight and quantity
			   obj._actualWeight += parseFloat(item.product_actual_weight || 0);
			   obj._totalWeight += parseFloat(item.product_actual_weight || 0) * parseInt(item.quantity);
		   }
	   });
	
	   // Fixing decimal points for the return values
	   obj._length = obj._length.toFixed(2);
	   obj._weight = obj._weight.toFixed(2);
	   obj._height = obj._height.toFixed(2);
	   obj._actualWeight = obj._actualWeight.toFixed(2);
	   obj._totalWeight = obj._totalWeight.toFixed(2);
	
	   return obj;
	}

	const ChangeAddressSubmit = async (data) => {

		const dimensions = await getShippingDimensions();
		data["contact_name"] = (authData && authData.id) ? authData.name : "";
		data["contact_email"] = (authData && authData.id) ? authData.email : 'info@scoliolife.com';
		data["parcels_box_length"] = dimensions._length;
		data["parcels_box_width"] = dimensions._weight;
		data["parcels_box_height"] = dimensions._height;
		// data["parcels_box_length"] = cart[0].dimension_length;
		// data["parcels_box_width"] = cart[0].dimension_weight;
		// data["parcels_box_height"] = cart[0].dimension_height;
		data["items_quantity"] = dimensions._quantity;
		// data["items_quantity"] = cart[0].quantity;
		data["items_description"] = cart[0].title;
		data["items_category"] = "Health & Beauty";
		data["items_declared_currency"] = "SGD";
		data["items_actual_weight"] = dimensions._actualWeight;
		// data["items_actual_weight"] = cart[0].product_actual_weight;
		data["items_declared_customs_value"] = 1;
		data["total_actual_weight"] = dimensions._totalWeight;
		// data["total_actual_weight"] = cart[0].product_actual_weight;
		

				try {	
					const shippingData = await axios.post(`${API}shipping-rates`, data);
					setLoader(false);
					setOpen(false);

					localStorage.setItem("shippingData", JSON.stringify(shippingData?.data));
					setShippingDetail(shippingData?.data);
					setSelectedOption(shippingData?.data?.data[0]);
					setShippigCharges(shippingData?.data?.data[0].total_charge);

					localStorage.setItem("checkAddressSelect", JSON.stringify(shippingData?.data?.data[0]));
				} catch (error) {
					setLoader(false);
					console.log("Shipping details----erorr", error);
				}
			
		
	}

	const handleProceedToCheckout = () => {
		navigate(`${urlLanguage}/checkout`, { state: { shippingDetail } });
	}

	const RemoveDiscount = (e) => {
		setCouponDetail(null);
	    setCouponRefresh(couponRefresh + 1);
	    setCouponPrice('0');
	    sessionStorage.removeItem("discountCoupon");
	}

	const handleOptionChange = (e) => {
		var vall = JSON.parse(e.target.value);
		localStorage.setItem("checkAddressSelect", e.target.value);
		setSelectedOption(vall);
		setShippigCharges(vall.total_charge);
	}

	const getTotal = () => {
		let totalQuantity = 0, _cartTotal = 0, tax = 0, subTotal = 0, discountAmount = 0, _totalPrice = 0;

		cart.forEach((item) => {
	      	totalQuantity += item.quantity;
	      	_cartTotal += item.price * item.quantity;
	    });

	    if(couponCode) {
		    discountAmount = (_cartTotal * couponCode) / 100;
	    }
	    
      	_totalPrice = _cartTotal - discountAmount;
      	tax = (_totalPrice * taxRate) / 100;
      	if (couponCode && couponCode == 100) { tax = 0; }

	    _totalPrice = _totalPrice + tax + shippigCharges;

	    setSubTotalPrice(_cartTotal);
	    setTaxPrice(tax);
	    setCouponPrice(discountAmount);
	    setTotalPrice(_totalPrice);
	}

	const onCountryChangeChange = (selected) => {
		setShippingCountry(selected?.isoCode);
		setSelectedCountry(selected);
	}

	const onStateChangeChange = (selected) => {
		setShippingState(selected?.name);
		setSelectedState(selected);

		var _vals1 = shippingDetail;

		if(_vals1 && _vals1.shipping_information) {
			_vals1.shipping_information.state = selected?.name;
			setShippingDetail(_vals1);
		}
	}

	const getShippingDetails = () => {
		let data = JSON.parse(localStorage.getItem("shippingData"));
		if(data){
			setOpen(false)
		}
			
			setShippingDetail(data);
	    var oldVal = localStorage.getItem("checkAddressSelect");

	    if(oldVal && typeof oldVal != 'undefined' && oldVal !== 'null') {
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

	const getCountryData = () => {
		const countryList = Country.getAllCountries();
	    setCountries(countryList);
	    setSearchcountries(countryList);
	}

	const handleCountryChange = () => {
		let _vals = shippingDetail;

		if(_vals && _vals.shipping_information) {
			_vals.shipping_information.country = shippingCountry;
			setShippingDetail(_vals);
		}

		const stateList = State.getStatesOfCountry(shippingCountry);
		setStates(stateList);
	}


	/*************************************************************
	 * Abondened cart functioning starts here.
	 *************************************************************/
  	const fetchIpAddress = async () => {
		try {
			const response = await axios.get('https://api.ipify.org?format=json');
			setIpAddress(response.data.ip);
		} catch (error) {
			console.error('Error fetching IP address:', error);
		}
	}

 	const storeAbandonedCart = async (cartData) => {
		try {
		 	const response = await axios.post(`${API}store-abandon-cart`, cartData);
		 	return response.data;
	 	} catch (error) {
		 	console.error('There was an error storing the abandoned cart!', error);
	 	}
	}

	const storeAbandonedCartData = () => {
		if (cart && cart.length > 0) {
			const cartData = {
				user_id: authData.id,
				language: currentLanguage,
				// user_ip_address: ipAddress,
				number_of_items:cart.length,	
				user_cart_information:{

					products: cart.map(item => ({
						id: item.id,
						title: item.title,
						price: item.price,
						quantity: item.quantity,
						sku: item.sku,
						image: item.image
					})),
					shippingDetails: selectedOption,
					redirect_url: window.location.href.replace('/cart', '/checkout'),
					priceDetails: {
						totalPrice: totalPrice,
						taxPrice: taxPrice,
						shippigCharges: shippigCharges,
						subTotalPrice: subTotalPrice,
						couponPrice: couponPrice,
						couponCode: couponCode,
					}
				}
			}

			storeAbandonedCart(cartData).then(response => {
				console.log('Abandoned cart data stored successfully');
			}).catch(error => {
				console.log('Error storing abandoned cart data:', error);
			});
		}
	}

	useEffect(() => {
		if (authData && authData.id) {
			storeAbandonedCartData();
		}
	}, [cart, totalPrice]);
	// }, [cart, selectedOption, totalPrice, taxPrice, shippigCharges, subTotalPrice, couponPrice, couponCode, ipAddress]);

	/*************************************************************
	 * Abondened cart functioning ends here.
	 *************************************************************/

	useEffect(() => {
    	dispatch(fetchMenuItem());
  	}, [dispatch, currentLanguage, lang]);

	useEffect(() => {
		if(shippingDetail && counterShip == 0) {
			setShippingCountry(shippingDetail?.shipping_information.country);
			setShippingState(shippingDetail?.shipping_information.state);
			setShippingCity(shippingDetail?.shipping_information.city);
			setShippingPin(shippingDetail?.shipping_information.postal_code);

			let obj = searchcountries.find(o => o.isoCode === shippingDetail?.shipping_information.country);
			setSelectedCountry(obj);
			setCounterShip(1);
		}
	}, [shippingDetail])

	useEffect(() => {
		if((states && states.length) && shippingState && stateFirst == 0) {
			let obj = states.find(o => o.name === shippingDetail?.shipping_information.state);

			setSelectedState(obj);
			setStateFirst(1);
		}
	}, [states, shippingState])

	useEffect(() => {
		handleCountryChange();
	}, [shippingCountry])

	useEffect(() => {
	    const isCouponCode = JSON.parse(sessionStorage.getItem("discountCoupon"));
	    const percent = isCouponCode ? isCouponCode?.data?.coupon_percent
	        ? parseInt(isCouponCode?.data?.coupon_percent, 10)
	        : parseInt(isCouponCode?.coupon_percent, 10)
	    : null;
	    setCouponCode(percent);
	    setCouponDetail(isCouponCode);
  	}, [couponCodes, couponRefresh]);

  	useEffect(() => {
  		getTotal();
  	}, [shippigCharges, couponCode, taxRate, cart])


	useEffect(() => {
    	taxRates();
    	fetchIpAddress();
		// getShippingDetails();
		// getCountryData();
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

	let formProps = {
	    handleValuesChange, handleFormSubmit, form, onCountryChangeChange, onStateChangeChange, setShippingPin,
	    setShippingCity, searchcountries, states, formErrors, t, billingForm, countries,
	    selectedCountry, selectedState, shippingCity, shippingPin
  	}
	return (
		<div className="col-sm-4">
			{(loader) ? (
				<div className="btn-loader">
					<img src={LoaderIco} alt="loader-button" />
				</div>
			) : null}
			
			<div className="cart-collaterals">
				<div className="cart_totals ">
					<h2>{t("CART12.CART TOTALS")}</h2>
					
					<table cellSpacing="0" className="shop_table shop_table_responsive">
						<tbody>
							<tr className="cart-subtotal subtotal-design">
								<th>{t("CART12.Subtotal")}</th>
								<td data-title="Subtotal">
									<ShowPriceField price={subTotalPrice} />
								</td>
							</tr>

							<tr className="cart-subtotal cart_dic">
								{couponDetail ? (
									<th>{t("CART12.Coupon")}{couponDetail?.coupon_name}</th>
								) : null}
								<td className="cart_price_new">
									{couponDetail ? (
									<div className="discount-price cart_discount_price">
										<td>
											-${parseFloat(couponPrice).toFixed(2)} SGD [
											<span onClick={() => RemoveDiscount()}>Remove</span>]
										</td>
									</div>
									) : null}
								</td>
							</tr>

							{!digital && <tr className="cart-subtotal">
								{shippingDetail ? (
									<th>{t("CART12.Shipping")}</th>
								) : (
									<th>{t("CART12.Enter Shipping")}</th>
								)}
								<td className="change-design ">
									<ul
										id="shipping_method"
										className="woocommerce-shipping-methods"
									>
										{shippingDetail?.data?.map((item, index) => {
											return (
												<li className="shipping__list_item" key={index}>
													<input
														type="radio"
														id={`option${index + 1}`}
														name="options"
														value={JSON.stringify(item)}
														checked={
														selectedOption?.courier_id === item.courier_id
														}
														onChange={handleOptionChange}
													/>
													<label
														htmlFor={`option${index + 1}`}
														className="shipping__list_label"
													>
														{item.courier_name}
														<ShowPriceField price={item.total_charge} extraClass="p-0" />
													</label>
												</li>
											);
										})}
									</ul>
								</td>

								{shippingDetail  ? ( 
									<p className="woocommerce-shipping-destination">
										{t("CART12.Shipping_to")}{" "}
										<strong>
											{`${shippingDetail?.shipping_information.city},
											${shippingDetail?.shipping_information.postal_code},
											${shippingDetail?.shipping_information.state},
											${shippingDetail?.shipping_information.country}`}
										</strong>.
									</p>
								) : null}

								{/* CHANGE ADDRESS  */}
								
								<div className="shipping ">
									<div className="accordion-item">
										<h2 className="accordion-header" id="flush-headingThree">
											<button
												className="accordion-button"
												onClick={() => setOpen(!open)}
												aria-expanded={open}
												aria-controls="collapseID"
											>
												{t("CART12.Change address")}
												<i className="fa fa-truck" aria-hidden="true"></i>
											</button>
										</h2>
										<Collapse in={open}>
											<div
												id="collapseID"
												style={{
												width: 300,
												textAlign: "justify",
												}}
											>
												<FormFields {...formProps} />
											</div>
										</Collapse>
									</div>
								</div> 
								
								
							</tr>}

							<tr className="tax-total">
								<th>
									{t("CART12.Tax")}{" "}
									{(selectedCountry && selectedCountry.name) ?
										<small>({t("CART12.estimated").replace('??', selectedCountry.name)})</small>
									: null}
								</th>
								<td data-title="Tax" className="cart_amout_design">
									<ShowPriceField price={taxPrice} />
								</td>
							</tr>

							<tr className="order-total">
								<th className="total-design">{t("CART12.Total")}</th>
								<td data-title="Total" className="cart_amout_design">
									<strong>
										<ShowPriceField price={totalPrice} />
									</strong>
								</td>
							</tr>
						</tbody>
					</table>
					<div
						className="wc-proceed-to-checkout"
						onClick={() => handleProceedToCheckout()}
					>
						<Link
							className="checkout-button button alt wc-forward"
							onClick={scrollToTop}
						>
							{t("CART12.Proceed to checkout")}
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

const ShowPriceField = (props) => {
	const { price = 0, extraClass = '' } = props;

	return (
		<span className={`woocommerce-Price-amount amount ${extraClass}`}>
			<bdi>
				<span className="woocommerce-Price-currencySymbol">$</span>
				{parseFloat(price).toFixed(2)} SGD
			</bdi>
		</span>
	)
}

export default Total;