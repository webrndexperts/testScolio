import React, { useState, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Select from 'react-select';

import { trimInputValues } from "../components/Helper";
import { useAuth } from "../context/authContext";
import { login, applyCoupon, getAddress } from "../Api";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { scrollToTop } from "../components/Helper";
import { Audio, Circles, ColorRing, DNA } from "react-loader-spinner";
import { selectLanguage, setLanguage, selectUrlLanguage, setUrlLanguage } from '../reducers/languageSlice';

import {
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { PaymentMethodCard } from "@stripe/react-stripe-js";
import { Country, State } from "country-state-city";
import ApiHook from "../components/CustomHooks/ApiHook";
import { replaceItem } from "../reducers/cartSlice";
import { useDispatch } from "react-redux";
import creditCardType from "credit-card-type";
import { userLogin } from "../reducers/authSlice";
import { toast } from "react-toastify";
import Collapse from "react-bootstrap/Collapse";
import { CartLogin } from "../reducers/cartLogin";
import useDynamicTitle from '../hooks/useDynamicTitle';
import { setCheckoutDetails } from '../hooks/customFunctions';
import TopBanner from '../components/TopBanner';

const API = process.env.REACT_APP_API_URL;

const CheckoutPage = () => {
  // const { authData, authLogin } = useSelector((state) => state.auth);
  const stripe = useStripe();
  const dispatch = useDispatch();
  const elements = useElements();
  const [currentLanguage, urlLanguage] = ApiHook();
  const [paymentError, setPaymentError] = useState(null);
  const { cart } = useSelector((state) => state.cart);
  // const { checkAddress } = useSelector((state) => state.AddressSelect);
  const { authData, authLogin } = useSelector((state) => state.auth);
  const { lang } = useParams();

  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation();
  // const { authLogin } = useAuth();
  // const [couponCode, setCouponCode] = useState(null);
  const [couponMsg, setCouponMsg] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [shippingDetail, setShippingDetail] = useState();
  const [shippingChecked, setShippingChecked] = useState(false);
  const [taxRate, setTaxRate] = useState();
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
  let shippigCharges = selectedOption ? selectedOption.total_charge : null;

  //  console.log("selectedOption+++++++++",selectedOption);
  const [formData, setFormData] = useState({
    firstname: "",
    email: "",
    password: "",
    changepassword: "",
    lastname: "",
  });

  // var client = new XMLHttpRequest();
  // client.open("GET", "http://api.zippopotam.us/us/90210", true);
  // client.onreadystatechange = function() {
  // 	if(client.readyState == 4) {
  //     console.log("asdasdasdadqweqwe::",client.responseText)
  // 	};
  // };

  // var client = new XMLHttpRequest();
  // client.open("GET", "http://api.zippopotam.us/IN/152121", true);
  // client.onreadystatechange = function() {
  // 	if(client.readyState == 4) {
  // 		console.log("asdasdasdadqweqwe::",client.responseText)
  // 	};
  // };
  // client.send();

  const getUserAddress = async () => {
    let data = JSON.parse(localStorage.getItem('userData')),
    _options = {
      setSelectedCountry, setSelectedState, setSelectedShippingState, setSelectedShippingCountry,
      countries: Country.getAllCountries(), states: State, setStates, setShippingStates, page: "checkout"
    };

    if(data && typeof data != 'undefined') {
      var { user_data } = data;

      if(user_data && user_data.id) {
        getAddress(user_data.id).then((response) => {
          setCheckoutDetails(billingSetValue, response, _options);
        }).catch((error) => {
          console.log("Error in rating data:", error);
        });
      }
    }
  }

  useEffect(() => {
    getUserAddress()
  }, [])

  useEffect(() => {
    if (authData) {
      setFormData({
        firstname: authData.name,
        lastname: "",
        email: authData.email,
        password: "",
        changepassword: "",
      });
      billingSetValue("shippingFirstName", authData.name);
      billingSetValue("shippingEmail", authData.email);
      billingSetValue("firstName", authData.name);
      billingSetValue("email", authData.email);
    }
  }, [authData]);

  let shippingObj = {
    courier_name: selectedOption?.courier_name,
    courier_id: selectedOption?.courier_id,
  };
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("shippingData"));

    let selectedShipping = data?.data.find(
      (item) => item?.courier_id === state
    );
    setShippingDetail(data);
    setSelectedOption(selectedShipping ? selectedShipping : null);
    // console.log("shippingData-----localstorage", data?.shipping_information);
    // billingSetValue('country', data?.shipping_information.country);
    // billingSetValue('state', data?.shipping_information.state);
    // billingSetValue('postcode', data?.shipping_information.postal_code);
    // billingSetValue('town', data?.shipping_information.city);
    // billingSetValue('shippingEmail', data?.shipping_information.email);
  }, [state]);
  useEffect(() => {
    let checkAddress = JSON.parse(localStorage.getItem("checkAddressSelect"));
    console.log("qwqwSdasdasd::", checkAddress);
    setSelectedOption(checkAddress);
  }, []);
  useEffect(() => {
    const isCouponCode = JSON.parse(sessionStorage.getItem("discountCoupon"));
    // const percent = isCouponCode? parseInt(isCouponCode?.data?.coupon_percent, 10): null;
    const percent = isCouponCode
      ? isCouponCode?.data?.coupon_percent
        ? parseInt(isCouponCode?.data?.coupon_percent, 10)
        : parseInt(isCouponCode?.coupon_percent, 10)
      : null;
    setCouponCode(percent);
    setCouponDetail(isCouponCode);
  }, [couponMsg]);

  useEffect(() => {
    let data = {
      tax_rate: "9.0000",
      tax_name: "GST",
    };
    const taxRates = async () => {
      try {
        const ratesData = await axios.get(`${API}tax-product`, data);
        let tax = ratesData?.data[0].tax_rate;
        setTaxRate(parseFloat(tax));
      } catch (error) {
        console.log("enquiryData----erorr", error);
      }
    };
    taxRates();
  }, []);

  // useEffect(()=>{
  //   if(!stripe ||!elements){
  //     return
  //   }
  //   const cardNumberElement = elements.getElement(CardNumberElement);
  //   cardNumberElement.on('change',(event)=>{
  //    const cardNumber = event.complete?event.brand:"";
  //    setCardType(cardNumber);
  //    console.log("card=====",cardType);
  //   })

  //   return()=>{
  //     cardNumberElement.off('change')
  //   }
  // },[stripe,elements,cardType])
  // console.log("card=====",cardType);

  // COUNTRY STATE
  useEffect(() => {
    const countryList = Country.getAllCountries();
    setCountries(countryList);
    scrollToTop();
  }, []);
  useEffect(() => {
    const countryList = Country.getAllCountries();
    setShippingCountries(countryList);
  }, []);

  const handleCountryChange = (selectedCountryCode, changeValue) => {
    const stateList = State.getStatesOfCountry(selectedCountryCode);
    changeValue(stateList);
  };

  const onCountryChange = (selectedVal) => {
    setSelectedCountry(selectedVal);
    billingSetValue('country', selectedVal?.isoCode);
    billingSetValue('state', '');
    setSelectedState(null);
    handleCountryChange(selectedVal?.isoCode, setStates);
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

  useEffect(() => {
    if (checkData && billingGetValues().country != "") {
      const allFieldValues = billingGetValues();
      const stateList = State.getStatesOfCountry(allFieldValues.country);
      setShippingStates(stateList);
      setStates(stateList);
      setcheckData(false);
    }
  }, [billingGetValues()]);
  setTimeout(() => {
    if (
      billingGetValues().country != "" &&
      billingGetValues().country != undefined &&
      IsCheck
    ) {
      setcheckData(true);
      setIsCheck(false);
    }
  }, 1000);

  console.log("sdasdasdasd::", billingGetValues());
  const Loginuser = (data) => {
    const trimData = trimInputValues(data);
    login(trimData).then((data) => {
      if (data?.success === true) {
        dispatch(userLogin(data));
        navigate(`${urlLanguage}/checkout`);
      }
    });
    loginReset();
  };

  const applyCouponCode = (data) => {
    const trimData = trimInputValues(data);
    applyCoupon(trimData)
      .then((response) => {
        if (response !== undefined) {
          sessionStorage.setItem("discountCoupon", JSON.stringify(response));
          setCouponMsg("Coupon applied successfully");
        }
        setTimeout(() => {
          setCouponMsg(null);
        }, 10000);
      })
      .catch((error) => {
        console.log("Error in rating data:", error);
      });
  };

  // Random number
  function generateRandomNumber() {
    const number = Math.floor(Math.random() * 1e10);
    return number;
  }

  // Function to handle the button click and generate a new random number

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    let tax = 0;
    let subTotal = 0;
    let discountAmount = 0;
    let product_id = [];
    cart.forEach((item) => {
      // console.log("item",item);
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
      product_id.push(item.id);
    });
    tax = (totalPrice * taxRate) / 100;
    tax = parseFloat(tax.toFixed(2));
    if (couponCode == 100) {
      tax = 0;
    }
    subTotal = totalPrice + tax + shippigCharges;
    if (couponCode !== null) {
      discountAmount = (totalPrice * couponCode) / 100;
      const discountedSubTotal = totalPrice - discountAmount;
      // const discountedSubTotal = subTotal - discountAmount;

      return {
        totalPrice,
        totalQuantity,
        tax,
        subTotal: discountedSubTotal,
        discountAmount,
        product_id,
      };
    }
    return {
      totalPrice,
      totalQuantity,
      tax,
      subTotal,
      discountAmount,
      product_id,
    };
  };

  const newArray = cart.map((item) => ({
    product_id: item.id,
    // title: item.title,
    quantity: item.quantity,
    // price: item.price,
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
  // console.log('dimension_Data', dimension_Data);

  // console.log("enws======", grouped_product_attributes[0]);

  const handleCardElementChange = (element) => (event) => {
    if (event.complete) {
      clearErrors(element);
    } else if (event.error) {
      setError(element, {
        type: "manual",
        message: event.error.message,
      });
    }
  };
  // console.log("formData::", cart);


  const BillingSubmit = async (data) => {
    // console.log('form data =============', data)

    // validateZipCode()
    if (termCondition) {
      if (authLogin === true) {
        setStripeLoader(true);
        if (getTotal().subTotal == 0) {
          const newRandomNumber = generateRandomNumber();

          data["userId"] = authData?.id;
          data["shipping_method_name"] =
            selectedOption?.courier_name != undefined &&
            selectedOption?.courier_name != null &&
            selectedOption?.courier_name != ""
              ? selectedOption?.courier_name
              : "Store Pick Up: Free (302 Orchard Road #10-02A, Singapore 238862)";
          data["shipping_id"] = selectedOption?.courier_id;
          data["shipping_rates_list"] = JSON.stringify(shippingRatesList);
          // data['shipping_method_name'] = shippingObj
          data["order_number"] = newRandomNumber;
          data["sub_total"] = parseFloat(getTotal().subTotal.toFixed(2));
          data["quantity"] = getTotal().totalQuantity;
          data["total_amount"] = getTotal().totalPrice;
          data["gst_tax"] = getTotal().tax;
          data["discount_couponcode"] = couponDetail?.coupon_name;
          data["product_items"] = newArray;

          data["dimension_height"] = cart.reduce((sum, item) => {
            var _val = (item.dimension_height) ? item.dimension_height : 0;
            var total_dimension_height = parseFloat(sum)+ + +parseFloat(_val);
            return parseFloat(total_dimension_height).toFixed(2);
            // var _total = parseFloat(sum)+ + +parseFloat(item.dimension_height);
            // return parseFloat(_total).toFixed(2);
           // return 'dsd';
          }, 0);
          data["dimension_length"] = cart.reduce((sum, item) => {
            var _val = (item.dimension_length) ? item.dimension_length : 0;
            var total_dimension_length = parseFloat(sum)+ + +parseFloat(_val);
            return parseFloat(total_dimension_length).toFixed(2);
           // return sum + item.dimension_length;
          }, 0);
          data["dimension_weight"] = cart.reduce((sum, item) => {
            var _val = (item.dimension_weight) ? item.dimension_weight : 0;
            var total_dimension_weight = parseFloat(sum)+ + +parseFloat(_val);
            return parseFloat(total_dimension_weight).toFixed(2);
           /// return sum + item.dimension_weight;
          }, 0);
          data["product_actual_weight"] = cart.reduce((sum, item) => {
            var _val = (item.product_actual_weight) ? item.product_actual_weight : 0;
            var total_product_actual_weight = parseFloat(sum)+ + +parseFloat(_val);
            return parseFloat(total_product_actual_weight).toFixed(2);
            //return sum + item.product_actual_weight;
          }, 0);

          data["grouped_product_attributes"] = grouped_product_attributes[0];

          // data['product_items'] = getTotal().product_id
          data["stripe_total_price"] = getTotal().totalPrice;
          console.log("formData", data);
          if (true) {
            const checkOutMethod = async () => {
              try {
                const checkOutDat = await axios.post(
                  `${API}orders-checkout`,
                  data
                );
                console.log("checkOutDat+++", checkOutDat);
                if (checkOutDat?.data?.status === "true") {
                  navigate(
                    `${urlLanguage}/orders/${checkOutDat?.data?.order_id}`,
                    { state: checkOutDat?.data?.order_id }
                  );
                  dispatch(replaceItem([]));
                  localStorage.removeItem("cart");
                  // localStorage.removeItem('userData')
                  scrollToTop();
                  setStripeLoader(false);
                }
              } catch (error) {
                console.log("checkOut error===========", error);
                setStripeLoader(false);
              }
            };
            checkOutMethod();
          }
        }
        if (!stripe) {
          console.log("Stripe.js has not yet loaded.");
          return;
        }
        const cardElement = elements.getElement(CardElement);
        // const cardNumberElement = elements.getElement(CardNumberElement);
        if (!cardElement) {
          console.log("CardElement not found.");
          return;
        }
        try {
          const { token, error } = await stripe.createToken(cardElement);

          if (error) {
            console.log("Error creating token:", error);
            // setPaymentError(error.message);
            setStripeLoader(false);
          } else {
            setPaymentError(null);
            // https://rndexperts.in/backend-laravel/api/v1/stripe-payment
            
            fetch(`${API}stripe-payment`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: token.id,
                amount: parseFloat(getTotal().subTotal.toFixed(2)),
              }),
            })
              .then((response) => response.json())
              .then((responsedata) => {
                
                data["userId"] = authData?.id;
                data["shipping_method_name"] =
                  selectedOption?.courier_name != undefined &&
                  selectedOption?.courier_name != null &&
                  selectedOption?.courier_name != ""
                    ? selectedOption?.courier_name
                    : "Store Pick Up: Free (302 Orchard Road #10-02A, Singapore 238862)";
                data["shipping_id"] = selectedOption?.courier_id;
                data["shipping_rates_list"] = JSON.stringify(shippingRatesList);
                // data['shipping_method_name'] = shippingObj
                data["order_number"] = responsedata?.charge.id;
                data["sub_total"] = parseFloat(getTotal().subTotal.toFixed(2));
                data["quantity"] = getTotal().totalQuantity;
                data["total_amount"] = getTotal().totalPrice;
                data["gst_tax"] = getTotal().tax;
                data["dimension_height"] = cart.reduce((sum, item) => {
                  var _val = (item.dimension_height) ? item.dimension_height : 0;
                 // return sum + item.dimension_height;
                 var _total = parseFloat(sum)+ + +parseFloat(_val);
                   return parseFloat(_total).toFixed(2);
               // return 'gfhddsfd';
                }, 0);
                data["dimension_length"] = cart.reduce((sum, item) => {
                  var _val = (item.dimension_length) ? item.dimension_length : 0;
                  var total_dimension_length = parseFloat(sum)+ + +parseFloat(_val);
                  return parseFloat(total_dimension_length).toFixed(2);
                  // return sum + item.dimension_length;
                }, 0);
                data["dimension_weight"] = cart.reduce((sum, item) => {
                  var _val = (item.dimension_weight) ? item.dimension_weight : 0;
                  var total_dimension_weight = parseFloat(sum)+ + +parseFloat(_val);
                  return parseFloat(total_dimension_weight).toFixed(2);
                  //return sum + item.dimension_weight;
                }, 0);
                data["product_actual_weight"] = cart.reduce((sum, item) => {
                  var _val = (item.product_actual_weight) ? item.product_actual_weight : 0;
                  var total_product_actual_weight = parseFloat(sum)+ + +parseFloat(_val);
                  return parseFloat(total_product_actual_weight).toFixed(2);
                //  return sum + item.product_actual_weight;
                }, 0);
                data["discount_couponcode"] = couponDetail?.coupon_name;
                data["product_items"] = newArray;
                data["grouped_product_attributes"] =
                  grouped_product_attributes[0];

                // data['product_items'] = getTotal().product_id
                data["stripe_total_price"] = getTotal().totalPrice;
                console.log("formData", data);
                if (responsedata) {
                  const checkOutMethod = async () => {
                    
                    try {
                      const checkOutDat = await axios.post(
                        `${API}orders-checkout`,
                        data
                      );
                      console.log("checkOutDat+++", checkOutDat);
                      if (checkOutDat?.data?.status === "true") {
                        navigate(
                          `${urlLanguage}/orders/${checkOutDat?.data?.order_id}`,
                          { state: checkOutDat?.data?.order_id }
                        );
                        dispatch(replaceItem([]));
                        localStorage.removeItem("cart");
                        // localStorage.removeItem('userData')
                        scrollToTop();
                        setStripeLoader(false);
                        
                      }
                    } catch (error) {
                      console.log("checkOut error===========", error);
                      setStripeLoader(false);
                    }
                  };
                  checkOutMethod();
                }
              })
              .catch((error) => {
                console.log("Error sending token to server:", error);
                setStripeLoader(false);
              });
          }
        } catch (error) {
          console.log("An error occurred:", error);
          setStripeLoader(false);
          setPaymentError("An error occurred during payment.");
        }
      } else {
        toast.error("Please login first", {
          className: 'full-red-alert',
          autoClose: 5000
        });
      }
    } else {
      setcheckCondition(true);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(JSON.parse(event.target.value));
  };
  const handleShippingAddress = (event) => {
    if (event.target.value === "on") {
      setShippingChecked((previousValue) => !previousValue);
    } else {
      setShippingChecked(false);
    }
  };
  if (shippingChecked === true) {
    const vijay = billingGetValues();
    // console.log("shiping vijay ", vijay);
    if (vijay) {
      billingSetValue("shippingFirstName", vijay.firstName);
      billingSetValue("shippingLastName", vijay.lastName);
      billingSetValue("shippingCompany", vijay.company);
      billingSetValue("shippingCountry", vijay.country);
      billingSetValue("shippingStreet", vijay.street);
      billingSetValue("shippingApartment", vijay.apartment);
      billingSetValue("shippingTown", vijay.town);
      billingSetValue("shippingState", vijay.state);
      billingSetValue("shippingPostcode", vijay.postcode);
      billingSetValue("shippingPhone", vijay.phone);
      billingSetValue("shippingEmail", vijay.email);
      billingSetValue("shippingFirstName", formData.firstname);
    }
  }

  const RemoveDiscount = () => {
    setCouponDetail(null);
    setCouponMsg(null);
    sessionStorage.removeItem("discountCoupon");
    setCouponCode(null);
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        fontFamily: "Arial, sans-serif",
        padding: "16px",
        borderRadius: "5px",
        boxShadow:
          "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
        maxWidth: "100%",
        position: "relative",
        boxSizing: "border-box",
        width: "100%",
        // padding: '1em',
        margin: "1em 0",
        // fontSize: '.92em',
        // borderRadius: '2px',
        lineHeight: "1.5",
        backgroundColor: "#dfdcde",
        color: "#515151",
        display: "grid",
      },
    },
    hidePostalCode: true,
  };

  const CheckCondition = () => {
    setTermCondition(!termCondition);
    setcheckCondition(false);
  };

  useEffect(() => {
    if(state && state.shippingDetail) {
      console.log('shippingRates', state);
      setShippingRatesList(state.shippingDetail.data)
    }
  }, [state])



  useEffect(() => {
    const navigateToCheckout = () => {
      navigate(`${urlLanguage}/checkout`);
    };

    if (typeof lang != 'undefined' && lang !== currentLanguage) {
      dispatch(setUrlLanguage(i18n.language));
      dispatch(setLanguage(i18n.language));
      navigateToCheckout();
    }

    if(typeof lang == 'undefined') {
      dispatch(setUrlLanguage('en_US'));
      dispatch(setLanguage('en_US'));
      navigateToCheckout();
    }
  }, [i18n.language, currentLanguage, dispatch, navigate, lang]);

  useDynamicTitle(t("main-nav.CHECKOUT"));

  return (
    <>
      <TopBanner title={t("main-nav.CHECKOUT")} />
      
      <div className="checkout-secton">
        <div className="container mt-5">
          <div className="checkout-page">
            <div className="row">
              <div
                className="accordion accordion-flush"
                id="accordionFlushExample"
              >
                <div className="accordion-item">
                  {authLogin !== true ? (
                    <React.Fragment>
                      <h2
                        className="accordion-header test2"
                        id="flush-headingOne"
                      >
                        <button
                          className="accordion-button collapsed woocommerce-info"
                          type="button"
                          onClick={() => setCheckLogin(!checkLogin)}
                          aria-expanded={checkLogin}
                        >
                          <i
                            className="fa fa-calendar-o"
                            aria-hidden="true"
                          ></i>
                          {t("checkOut.Returning customer?")}
                          <Link
                            className="showlogin"
                            onClick={() => dispatch(CartLogin(true))}
                          >
                            {t("checkOut.Click here to login")}
                          </Link>
                        </button>
                      </h2>
                      <Collapse in={checkLogin}>
                        <div id="flush-collapseOne">
                          <div className="accordion-body">
                            {t(
                              "checkOut.If you have shopped with us before, please enter yourdetails below. If you are a new customer, please proceed to the Billing section."
                            )}
                          </div>
                          <form
                            className="row g-3"
                            onSubmit={handleLogin(Loginuser)}
                          >
                            <div className="col-md-6">
                              <label for="inputEmail4" className="form-label">
                                {t("checkOut.Username Or Email")} <span>*</span>
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="inputEmail4"
                                {...loginForm("email", { required: true })}
                              />
                              {loginError.email && (
                                <p className="validations">
                                  {t("checkOut.Please enter your email.")}
                                </p>
                              )}
                            </div>
                            <div className="col-md-6">
                              <label
                                for="inputPassword4"
                                className="form-label"
                              >
                                {t("checkOut.Password")} <span>*</span>
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                id="inputPassword4"
                                {...loginForm("password", {
                                  required: true, // pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                })}
                              />
                              {loginError.password && (
                                <p className="validations">
                                  {/*Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character. */}
                                  {t("checkOut.Please enter your password.")}
                                </p>
                              )}
                            </div>
                            <label className="woocommerce-form__label woocommerce-form__label-for-checkbox woocommerce-form-login__rememberme">
                              <input
                                className="woocommerce-form__input woocommerce-form__input-checkbox"
                                name="rememberme"
                                type="checkbox"
                                id="rememberme"
                                value="forever"
                              />
                              <span>{t("checkOut.Remember me")}</span>
                            </label>
                            <button
                              type="submit"
                              className="woocommerce-button button woocommerce-form-login__submit"
                              name="login"
                              value="Login"
                            >
                              {t("checkOut.Login")}
                            </button>
                          </form>
                          <p className="lost_password">
                            <Link to="">
                              {t("checkOut.Lost your password?")}
                            </Link>
                          </p>
                        </div>
                      </Collapse>
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {/* <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    <i className="fa fa-calendar-o" aria-hidden="true"></i>
                    {t("checkOut.Have a coupon?")}
                    <Link to="" className="showlogin">
                      {t("checkOut.Click here to enter your code")}
                    </Link>
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    {t(
                      "checkOut.If you have a coupon code, please apply it below."
                    )}
                  </div>
                  <form onSubmit={handlecoupon(applyCouponCode)}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <input
                          {...couponForm("coupon_code", { required: true })}
                          type="text"
                          className="form-control"
                          id="text"
                          placeholder="coupon code"
                        />
                        {couponError.coupon_code && (
                          <p className="validations">
                            {t("checkOut.Please enter your coupon code")}
                          </p>
                        )}
                      </div>
                      <div className="col-md-6">
                        <button
                          type="submit"
                          className="button"
                          name="apply_coupon"
                          value="Apply coupon"
                        >
                          {t("checkOut.Apply coupon")}
                        </button>
                      </div>
                    </div>
                  </form>
                  {couponMsg}
                </div>
              </div> */}

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    onClick={() => setOpen(!open)}
                    aria-expanded={open}
                  >
                    <i className="fa fa-calendar-o" aria-hidden="true"></i>
                    {t("checkOut.Have a coupon?")}
                    <Link className="showlogin">
                      {t("checkOut.Click here to enter your code")}
                    </Link>
                  </button>
                </h2>

                <Collapse in={open}>
                  <div id="collapseID">
                    <div className="accordion-body">
                      {t(
                        "checkOut.If you have a coupon code, please apply it below."
                      )}
                    </div>
                    <form onSubmit={handlecoupon(applyCouponCode)}>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <input
                            {...couponForm("coupon_code", { required: true })}
                            type="text"
                            className="form-control"
                            id="text"
                            placeholder="coupon code"
                          />
                          {couponError.coupon_code && (
                            <p className="validations">
                              {t("checkOut.Please enter your coupon code")}
                            </p>
                          )}
                        </div>
                        <div className="col-md-6">
                          <button
                            type="submit"
                            className="button"
                            name="apply_coupon"
                            value="Apply coupon"
                          >
                            {t("checkOut.Apply coupon")}
                          </button>
                        </div>
                      </div>
                    </form>
                    {couponMsg}
                  </div>
                </Collapse>
              </div>
            </div>
          </div>
          {/* value= {formData.firstname} */}
          <form onSubmit={handlebilling(BillingSubmit)}>
            <div className="customer-details">
              <div className="row">
                <div className="col-md-6">
                  <label for="inputPassword4" className="form-label">
                    {t("checkOut.First Name")} <span>*</span>{" "}
                  </label>
                  {/* <input type="text"  value= {formData.firstname}  className="form-control" id="text"  {...billingForm('firstName', { required: true })} /> */}
                  <input
                    type="text"
                    value={formData.firstname}
                    className="form-control"
                    id="text"
                    {...billingForm("firstName", { required: true })}
                    onChange={(e) =>
                      setFormData({ ...formData, firstname: e.target.value })
                    }
                  />

                  {billingError.firstName && (
                    <p className="validations">
                      {t("checkOut.Please enter your first name.")}
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <label for="inputPassword4" className="form-label">
                    {t("checkOut.Last Name")} <span>*</span>{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="text"
                    {...billingForm("lastName", { required: true })}
                  />
                  {billingError.lastName && (
                    <p className="validations">
                      {t("checkOut.Please enter your last name.")}
                    </p>
                  )}
                </div>
                <div className="col-12">
                  <label for="inputAddress" className="form-label">
                    {t("checkOut.Company Name")} ({t("checkOut.Optional")})
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder=""
                    {...billingForm("company")}
                  />
                </div>
                <div className="col-md-12">
                  <label for="inputState" className="form-label">
                    {t("checkOut.Country / Region")}
                    <span>*</span>
                  </label>
                
                  <Select
                    className="select-serchable"
                    classNamePrefix="select"
                    value={selectedCountry}
                    onChange={onCountryChange}
                    isSearchable={true}
                    options={countries}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.isoCode}
                  />

                  <input type="hidden" {...billingForm("country", { required: true })} />

                  {billingError.country && (
                    <p className="validations">
                      {t("checkOut.Please enter your country.")}
                    </p>
                  )}
                </div>

                <div className="col-12">
                  <label for="inputAddress" className="form-label">
                    {t("checkOut.Street Address")} <span>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="House number and street name"
                    {...billingForm("street", { required: true })}
                  />
                  {billingError.street && (
                    <p className="validations">
                      {t("checkOut.Please enter your street address.")}
                    </p>
                  )}
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control unit"
                    id="inputAddress"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    {...billingForm("apartment")}
                  />
                </div>
                <div className="col-12">
                  <label for="inputAddress" className="form-label">
                    {t("checkOut.Town / City")} <span>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder=""
                    {...billingForm("town", { required: true })}
                  />
                  {billingError.town && (
                    <p className="validations">
                      {t("checkOut.Please enter your town / city.")}
                    </p>
                  )}
                </div>
                <div className="col-md-12">
                  <label for="inputState" className="form-label">
                    {t("CART12.State/Country")} <span>*</span>
                  </label>


                  <Select
                    className="select-serchable"
                    classNamePrefix="select"
                    value={selectedState}
                    onChange={onStateChange}
                    isSearchable={true}
                    options={states}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.name}
                  />

                  <input type="hidden" {...billingForm("state", { required: true })} />
                  
                  {billingError.state && (
                    <p className="validations">
                      {t("checkOut.Please select your state / county.")}
                    </p>
                  )}
                </div>
                <div className="col-12">
                  <label for="inputAddress" className="form-label">
                    {t("checkOut.Postcode / ZIP")} <span>*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputAddress"
                    placeholder=""
                    {...billingForm("postcode", {
                      required: true,
                      // valueAsNumber: true,
                      // maxLength:12,
                      // pattern: /[A-Za-z]{3}/
                    })}
                  />
                  {billingError.postcode && (
                    <p className="validations">
                      {t("checkOut.Please enter your postcode / ZIP.")}
                    </p>
                  )}
                </div>
                <div className="col-12">
                  <label for="inputAddress" className="form-label">
                    {t("checkOut.Phone")} <span>*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputtel"
                    {...billingForm("phone", {
                      required: true,
                      // valueAsNumber: true,
                      // maxLength: 2,
                      // pattern: /[A-Za-z]{3}/
                    })}
                  />
                  {billingError.phone && (
                    <p className="validations">
                      {t("checkOut.Please enter your phone.")}
                    </p>
                  )}
                </div>
                <div className="col-12">
                  <label for="inputAddress" className="form-label">
                    {t("checkOut.Email Address")} <span>*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    className="form-control"
                    id="inputEmail4"
                    {...billingForm("email", { required: true })}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }

                    // onChange={(e) => UpdateEmail(e)}
                  />
                  {billingError.email && (
                    <p className="validations">
                      {t("checkOut.Please enter your email.")}
                    </p>
                  )}
                </div>
                {/* Shipping form  */}
                {/* Ship To A Different Address? */}
                <div className="col-12">
                  <label for="inputAddress" className="form-label">
                    {t("checkOut.Ship To A Different Address")}
                  </label>
                  <input
                    type="checkbox"
                    checked={shippingChecked === false ? "checked" : ""}
                    id="inputShippingAddress"
                    onChange={handleShippingAddress}
                  />
                </div>
                {shippingChecked === false ? (
                  <>
                    <div className="col-md-6">
                      <label for="inputPassword4" className="form-label">
                        {t("checkOut.First Name")} <span>*</span>{" "}
                      </label>
                      <input
                        type="text"
                        // value={formData.firstname}
                        className="form-control"
                        id="text"
                        {...billingForm("shippingFirstName", {
                          required: true,
                        })}
                      />
                      {billingError.shippingFirstName && (
                        <p className="validations">
                          {t("checkOut.Please enter your first name.")}
                        </p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label for="inputPassword4" className="form-label">
                        {t("checkOut.Last Name")} <span>*</span>{" "}
                      </label>
                      <input
                        type="text"
                        // value={formData.lastname}
                        className="form-control"
                        id="text"
                        {...billingForm("shippingLastName", { required: true })}
                      />
                      {billingError.shippingLastName && (
                        <p className="validations">
                          {t("checkOut.Please enter your last name.")}
                        </p>
                      )}
                    </div>
                    <div className="col-12">
                      <label for="inputAddress" className="form-label">
                        {t("checkOut.Company Name")} {t("checkOut.Optional")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder=""
                        {...billingForm("shippingCompany")}
                      />
                    </div>
                    <div className="col-md-12">
                      <label for="inputState" className="form-label">
                        Country / Region<span>*</span>
                      </label>

                      <Select
                        className="select-serchable"
                        classNamePrefix="select"
                        value={selectedShippingCountry}
                        onChange={onShippingCountryChange}
                        isSearchable={true}
                        options={shippingCountries}
                        getOptionLabel={option => option.name}
                        getOptionValue={option => option.isoCode}
                      />

                      <input type="hidden" {...billingForm("shippingCountry", { required: true })} />

                      {billingError.shippingCountry && (
                        <p className="validations">
                          {t("checkOut.Please enter your country.")}
                        </p>
                      )}
                    </div>
                    <div className="col-12">
                      <label for="inputAddress" className="form-label">
                        {t("checkOut.Street Address")} <span>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder="House number and street name"
                        {...billingForm("shippingStreet", { required: true })}
                      />
                      {billingError.shippingStreet && (
                        <p className="validations">
                          {t("checkOut.Please enter your street address.")}
                        </p>
                      )}
                    </div>
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control unit"
                        id="inputAddress"
                        placeholder="Apartment, suite, unit, etc. (optional)"
                        {...billingForm("shippingApartment")}
                      />
                    </div>
                    <div className="col-12">
                      <label for="inputAddress" className="form-label">
                        {t("checkOut.Town / City")} <span>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder=""
                        {...billingForm("shippingTown", { required: true })}
                      />
                      {billingError.shippingTown && (
                        <p className="validations">
                          {t("checkOut.Please enter your town / city.")}
                        </p>
                      )}
                    </div>
                    <div className="col-md-12">
                      <label for="inputState" className="form-label">
                        {t("CART12.State/Country")} <span>*</span>
                      </label>

                      <Select
                        className="select-serchable"
                        classNamePrefix="select"
                        value={selectedShippingState}
                        onChange={onShippingStateChange}
                        isSearchable={true}
                        options={shippingStates}
                        getOptionLabel={option => option.name}
                        getOptionValue={option => option.name}
                      />

                      <input type="hidden" {...billingForm("shippingState", { required: true })} />

                      {billingError.shippingState && (
                        <p className="validations">
                          {t("checkOut.Please select your state / county.")}
                        </p>
                      )}
                    </div>
                    <div className="col-12">
                      <label for="inputAddress" className="form-label">
                        {t("checkOut.Postcode / ZIP")} <span>*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="inputAddress"
                        placeholder=""
                        {...billingForm("shippingPostcode", { required: true })}
                      />
                      {billingError.shippingPostcode && (
                        <p className="validations">
                          {t("checkOut.Please enter your postcode / ZIP.")}
                        </p>
                      )}
                    </div>
                    <div className="col-12">
                      <label for="inputAddress" className="form-label">
                        {t("checkOut.Phone")} <span>*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="inputtel"
                        {...billingForm("shippingPhone", { required: true })}
                      />
                      {billingError.shippingPhone && (
                        <p className="validations">
                          {t("checkOut.Please enter your phone.")}
                        </p>
                      )}
                    </div>
                    <div className="col-12">
                      <label for="inputAddress" className="form-label">
                        {t("checkOut.Email Address")} <span>*</span>
                      </label>
                      <input
                        type="email"
                        // value={formData.email} // Bind value to formData.email
                        className="form-control"
                        id="inputEmail4"
                        {...billingForm("shippingEmail", { required: true })} // Spread register function returned by billingForm
                        // onChange={(e) => UpdateEmail(e)} // Update formData.email on change
                      />

                      {billingError.shippingEmail && (
                        <p className="validations">
                          {t("checkOut.Please enter your email.")}
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div className="col-12">
                  <h3>{t("checkOut.Additional information")}</h3>
                  <label for="inputAddress" className="form-label">
                    {t("checkOut.Order Notes")} ({t("checkOut.Optional")})
                  </label>
                  <textarea
                    id="message"
                    className="form-control rounded border-white mb-3 form-text-area"
                    rows="5"
                    cols="30"
                    placeholder="Message"
                    {...billingForm("additionalInfo")}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="woocommerce-checkout-review-order">
              <table
                className="shop_table woocommerce-checkout-review-order-table"
                style={{ position: "static", zoom: "1" }}
              >
                <thead>
                  <tr className="cart-new">
                    <td className="product-name">{t("CART12.Product")}</td>
                    <td className="product-total">{t("CART12.Subtotal")}</td>
                  </tr>
                </thead>
                <tbody>
                  {cart?.map((item, index) => {
                    return (
                      <React.Fragment>
                        <tr className="cart_item" key={item.id}>
                          <td className="product-name">
                            {item.title}
                            <strong className="product-quantity">
                              {" "}
                              ×&nbsp;{item.quantity}
                            </strong>{" "}
                            {/* Size  */}
                            {item.attriuteGender && (
                              <React.Fragment>
                                <div>Gender:</div>
                                <span>
                                  <p>{item.attriuteGender}</p>
                                </span>
                              </React.Fragment>
                            )}
                            {item.attriuteWeight && (
                              <React.Fragment>
                                <div>Weight:</div>
                                <span>
                                  <p>{item.attriuteWeight}</p>
                                </span>
                              </React.Fragment>
                            )}
                            {item.attriuteHeight && (
                              <React.Fragment>
                                <div>Height:</div>
                                <span>
                                  <p>{item.attriuteHeight}</p>
                                </span>
                              </React.Fragment>
                            )}
                            {item.attriuteCustomized && (
                              <React.Fragment>
                                <div>Customized Report:</div>
                                <span>
                                  <p>{item.attriuteCustomized}</p>
                                </span>
                              </React.Fragment>
                            )}
                            {item.attriuteLang && (
                              <React.Fragment>
                                <div>Language:</div>
                                <span>
                                  <p>{item.attriuteLang}</p>
                                </span>
                              </React.Fragment>
                            )}
                            {item.attriuteSize && (
                              <React.Fragment>
                                <div>Size:</div>
                                <span>
                                  <p>{item.attriuteSize}</p>
                                </span>
                              </React.Fragment>
                            )}
                            {item.attriuteTool && (
                              <React.Fragment>
                                <div>Tool:</div>
                                <span>
                                  <p>{item.attriuteTool}</p>
                                </span>
                              </React.Fragment>
                            )}
                            {item.attriuteImg && (
                              <React.Fragment>
                                <div className="variation-UploadedFile">
                                  Uploaded File:
                                </div>
                                <div className="variation-UploadedFile">
                                  <p>
                                    <img
                                      decoding="async"
                                      width="280"
                                      height="205"
                                      src={item.attriuteImg}
                                      className="attachment-thumbnail size-thumbnail"
                                      alt=""
                                    />
                                  </p>
                                </div>
                              </React.Fragment>
                            )}
                          </td>
                          <td className="product-total">
                            <span className="woocommerce-Price-amount amount cart">
                              <bdi>
                                <span className="woocommerce-Price-currencySymbol">
                                  $
                                </span>
                                {parseFloat(item.quantity * item.price).toFixed(2)}&nbsp;SGD
                              </bdi>
                            </span>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="cart-subtotal">
                    <td className="checkout">{t("CART12.Subtotal")}</td>
                    <td className="product-total">
                      <span className="woocommerce-Price-amount amount cart">
                        <bdi>
                          <span className="woocommerce-Price-currencySymbol">
                            $
                          </span>
                          {parseFloat(getTotal().totalPrice).toFixed(2)} SGD
                        </bdi>
                      </span>
                    </td>
                  </tr>
                  <tr className="cart-subtotal Coupon_design ">
                    {couponDetail ? (
                      <Fragment>
                      <th>Coupon:</th>
                     <th className="coupon_name">{couponDetail?.coupon_name}</th>
                      </Fragment>
                    ) : (
                      ""
                    )}
                  </tr>
                  <tr className="cart-subtotal">
                    {couponDetail ? (
                      <div className="discount-price">
                        <th className="discount-price-checkout qwe">
                          $ {parseFloat(getTotal().discountAmount).toFixed(2)} SGD
                        </th>
                        <td
                          className="discount-price-remove"
                          onClick={() => RemoveDiscount()}
                        >
                          [Remove]
                        </td>
                      </div>
                    ) : (
                      ""
                    )}
                  </tr>
                  <tr className="shipping-design">
                    <th>{t("CART12.Shipping")}</th>
                  </tr>
                  <tr className="shipping-designs">
                    <th>
                      <td>
                        <ul
                          id="shipping_method"
                          className="woocommerce-shipping-methods"
                        >
                          {shippingDetail?.data?.map((item, index) => {
                            // console.log("item=========",item);
                            return (
                              <li className="shipping__list_item">
                                <input
                                  type="radio"
                                  id={`option${index + 1}`}
                                  name="options"
                                  value={JSON.stringify(item)}
                                  checked={
                                    selectedOption?.courier_id ===
                                    item.courier_id
                                  }
                                  onChange={handleOptionChange}
                                />
                                <label
                                  htmlFor={`option${index + 1}`}
                                  className="shipping__list_label"
                                >
                                  {item.courier_name}
                                  <span className="woocommerce-Price-amount amount">
                                    <bdi>
                                      <span className="woocommerce-Price-currencySymbol">
                                        $
                                      </span>
                                      {item.total_charge} {item.currency}
                                    </bdi>
                                  </span>
                                </label>
                              </li>
                            );
                          })}
                        </ul>
                      </td>
                    </th>
                  </tr>
                  <tr className="cart-subtotal">
                    <td className="checkout">{t("CART12.Subtotal")}</td>
                    <td className="product-total">
                      <span className="woocommerce-Price-amount amount cart">
                        <bdi>
                          <span className="woocommerce-Price-currencySymbol">
                            $
                          </span>
                          {parseFloat(getTotal().totalPrice).toFixed(2)} SGD
                        </bdi>
                      </span>
                    </td>
                  </tr>
                  <tr className="cart-subtotal">
                    <td className="checkout">{t("CART12.Tax")}</td>
                    <td className="product-total">
                      <span className="woocommerce-Price-amount amount cart">
                        <bdi>
                          <span className="woocommerce-Price-currencySymbol">
                            $
                          </span>
                          {parseFloat(getTotal().tax).toFixed(2)} SGD
                        </bdi>
                      </span>
                    </td>
                  </tr>
                  <tr className="cart-subtotal">
                    <td className="checkout">{t("CART12.Total")}</td>
                    <td className="product-total">
                      <strong>
                        <span className="woocommerce-Price-amount amount cart">
                          <bdi>
                            <span className="woocommerce-Price-currencySymbol">
                              $
                            </span>
                            {parseFloat(getTotal().subTotal).toFixed(2)} SGD
                          </bdi>
                        </span>
                      </strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
              {getTotal().subTotal != 0 && (
                <div className="container-payment">
                  <label>
                    Card details
                    <CardElement
                      // options={cardElementOptions}
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                              color: "#aab7c4",
                            },
                          },
                          invalid: {
                            color: "#9e2146",
                          },
                        },
                        classes: {
                          base: "card-number", // Add your custom class here
                        },
                        hidePostalCode: true,
                      }}
                      onChange={handleCardElementChange}
                      onReady={(el) => el.focus()}
                      ref={(e) => {
                        billingForm(e, {
                          validate: () => {},
                        });
                      }}
                    />
                    {billingError.card && <p>{billingError.card.message}</p>}
                  </label>
                  {paymentError !== null ? (
                    <div className="alert alert-danger" role="alert">
                      {paymentError}
                    </div>
                  ) : (
                    ""
                  )}
                  {/* <div className='card-element'>
                  <label className='card-element-label'>
                    Card Number <span>*</span>
                    <CardNumberElement
                      options={{
                        style: {
                          base: {
                            border: '1px solid #ddd',
                            lineHeight: "50px",
                            margin: '4px 0',
                            padding: '16px',
                            backgroundColor: '#fff',
                            outline: '0',
                            borderRadius: '5px',
                            width: '100%',
                            '::placeholder': {
                              color: "#aabc4",
                            },
                          },
                        }
                      }}
                      onChange={handleCardElementChange('cardNumber')}
                      ref={(e) => {
                        billingForm(e, {
                          validate: () => {
                          },
                        });
                      }}
                    />
                  </label>
                  {billingError.cardNumber && <p>{billingError.cardNumber.message}</p>}
                </div>
                <div className='cvd-expiry'>
                  <div className='expiry-element'>
                    <label>
                      Expiry Date <span>*</span>
                      <CardExpiryElement
                        options={{
                          style: {
                            base: {
                              fontSize: '16px',
                              lineHeight: "50px",
                              fontFamily: 'Arial, sans-serif',
                              padding: '16px',
                              borderRadius: '5px',
                              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
                              border: '1px solid #ddd',
                              backgroundColor: '#fff',
                              outline: '0',
                            }
                          }
                        }}
                        onChange={handleCardElementChange('cardExpiry')}
                        ref={(e) => {
                          billingForm(e, {
                            validate: () => {
                            },
                          });
                        }}
                      />
                    </label>
                    {billingError.cardExpiry && <p>{billingError.cardExpiry.message}</p>}
                  </div>
                  <div className='cvc-element'>
                    <label>
                      Card Code (CVC) <span>*</span>
                      <CardCvcElement
                        options={{
                          style: {
                            base: {
                              fontSize: '16px',
                              lineHeight: "50px",
                              fontFamily: 'Arial, sans-serif',
                              padding: '16px',
                              borderRadius: '5px',
                              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
                              border: '1px solid #ddd',
                              backgroundColor: '#fff',
                              outline: '0',
                            }
                          }
                        }}
                        onChange={handleCardElementChange('cardCvc')}
                        ref={(e) => {
                          billingForm(e, {
                            validate: () => {
                            },
                          });
                        }}
                      />
                    </label>
                    {billingError.cardCvc && <p>{billingError.cardCvc.message}</p>}
                  </div>
                </div> */}
                  <div className="checkbox-card">
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="vehicle1"
                      value="Bike"
                    />
                    <label for="vehicle1">
                      {" "}
                      Save Payment Information To My Account For Future
                      Purchases.
                    </label>
                  </div>
                </div>
              )}

              <p className="form-row validate-required mt-4">
                <label className="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox">
                  <input
                    type="checkbox"
                    className="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox"
                    name="terms"
                    id="terms"
                    onChange={(e) => CheckCondition(e)}
                  />
                  <span className="woocommerce-terms-and-conditions-checkbox-text text-danger">
                    I have read and agree to the website{" "}
                    <a
                      href="https://scoliolife.com/terms-of-use/"
                      className="woocommerce-terms-and-conditions-link"
                      target="_blank"
                    >
                      terms and conditions
                    </a>
                  </span>
                  &nbsp;<span className="required">*</span>
                </label>
                <input type="hidden" name="terms-field" value="1" />
              </p>

              {checkCondition && (
                <span className="woocommerce-terms-and-conditions-checkbox-text text-danger">
                  Please check the terms and conditions{" "}
                </span>
              )}
              {stripeLoader === false ? (
                <button type="submit">{t("CART12.Proceed to checkout")}</button>
              ) : (
                //  {/* Circles,ColorRing,DNA */}
                <Circles
                  height="80"
                  width="80"
                  radius="9"
                  color="green"
                  ariaLabel="loading"
                  // wrapperStyle
                  wrapperClass
                />
              )}
            </div>
            {/* <Stripe BillingSubmit={BillingData} stripeEffectUpdate={stripeEffectUpdate}/> */}
          </form>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default CheckoutPage;
