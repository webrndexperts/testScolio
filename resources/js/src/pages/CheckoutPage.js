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
import Loader from "../components/Loader";
import { Audio, Circles, ColorRing, DNA } from "react-loader-spinner";
import {
    selectLanguage,
    setLanguage,
    selectUrlLanguage,
    setUrlLanguage,
} from "../reducers/languageSlice";
// import {
//     useStripe,
//     useElements,
//     CardElement,
//     CardNumberElement,
// } from "@stripe/react-stripe-js";
import { Country, State } from "country-state-city";
import ApiHook from "../components/CustomHooks/ApiHook";
import { replaceItem, removeDirectBuyItem } from "../reducers/cartSlice";
import { useDispatch } from "react-redux";
import creditCardType from "credit-card-type";
import { userLogin } from "../reducers/authSlice";
import { toast } from "react-toastify";
import { CartLogin } from "../reducers/cartLogin";
import useDynamicTitle from "../hooks/useDynamicTitle";
import { setCheckoutDetails } from "../hooks/customFunctions";
import TopBanner from "../components/TopBanner";
import PayPal from "../images/PayPal.png";
import payment_me from "../images/payment_me.png";
import papal from "../images/papal.svg";
import visa from "../images/visa.svg";
import discover from "../images/discover.svg";
import mastercard from "../images/mastercard.svg";
import amex from "../images/amex.svg";
import {
    CheckoutSidebar,
    BillingAddressForm,
    ShippingAddressFields,
    PaymentsListView,
    ShippingOptions,
    CheckoutLogin,
} from "../components/CheckoutComponents";
import { StripeView, PaypalButton } from "../components/payments";
import LoaderIco from "../images/button-loader.svg";
import ReCAPTCHA from "react-google-recaptcha";
import RazorPayButton from "../components/payments/RazorPayButton";

const API = process.env.REACT_APP_API_URL;

const CheckoutPage = (props) => {
    const isApiCalling = useRef(false);
    const [isDataReady, setIsDataReady] = useState(false);
    // const stripe = useStripe();
    const dispatch = useDispatch();
    // const elements = useElements();
    const [currentLanguage, urlLanguage] = ApiHook();
    const [paymentError, setPaymentError] = useState(null);
    const { cart, directCart } = useSelector((state) => state.cart);
    const { authData, authLogin } = useSelector((state) => state.auth);
    const { lang } = useParams();
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [couponMsg, setCouponMsg] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [shippingDetail, setShippingDetail] = useState();
    const [shippingChecked, setShippingChecked] = useState(true);
    const [taxRate, setTaxRate] = useState(9);
    const [couponCode, setCouponCode] = useState(null);
    const [couponDetail, setCouponDetail] = useState(null);
    const [stripeLoader, setStripeLoader] = useState(false);
    const [termCondition, setTermCondition] = useState(true);
    const [checkCondition, setcheckCondition] = useState(true);
    const [countries, setCountries] = useState([]);
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingStates, setShippingStates] = useState([]);
    const [states, setStates] = useState([]);
    const [open, setOpen] = useState(false);
    const [shippingRatesList, setShippingRatesList] = useState("");
    const [checkData, setcheckData] = useState(false);
    const [IsCheck, setIsCheck] = useState(true);
    const [checkLogin, setCheckLogin] = useState(false);
    const [cardType, setCardType] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedShippingState, setSelectedShippingState] = useState("");
    const [selectedShippingCountry, setSelectedShippingCountry] = useState("");
    const [leftLoader, setLeftLoader] = useState(false);
    const [cartValues, setCartValues] = useState([]);
    const [cartType, setCartType] = useState("cart");
    const [captchaToken, setCaptchaToken] = useState("");
    const [captchaErr, setCaptchaErr] = useState(false);
    const [shippigCharges, setShippigCharges] = useState(0);
    const [totalPrice, setTotalPrice] = useState("0");
    const [paymentType, setPaymentType] = useState("razorpay");
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [couponPrice, setCouponPrice] = useState("0");
    const [taxPrice, setTaxPrice] = useState("0");
    const [subTotalPrice, setSubTotalPrice] = useState("0");
    const [payedByPaypal, setPayedByPaypal] = useState(false);
    const formRef = useRef({});
    const paypalRef = useRef({});
    const [stripeError, setStripeError] = useState(null);
    const [triggerCouponCheck, setTriggerCouponCheck] = useState(true);
    const [digital, setDigital] = useState(false);
    const [checkoutData, setCheckOutData] = useState(null);
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
        trigger,
        watch,
        formState: { errors: billingError, isValid: isBillingFormValid },
    } = useForm({ mode: "onChange" });
    const phoneValue = watch("phone");
    const [formData, setFormData] = useState({
        firstname: "",
        email: "",
        password: "",
        changepassword: "",
        lastname: "",
    });

    const newArray = cartValues.map((item) => {
        const baseItem = {
            title: item.title,
            slug: item.slug,
            price: item.price,
            dimension_height: item.dimension_height,
            dimension_length: item.dimension_length,
            dimension_width: item.dimension_weight,
            product_id: item.id,
            sku: item.sku,
            quantity: item.quantity,
        };

        if (
            item.productType === "digital" &&
            item.slug === "x-ray-review-analysis-service" &&
            item.xrayUploadId
        ) {
            return {
                ...baseItem,
                xray_upload_id: item.xrayUploadId,
            };
        }

        return baseItem;
    });

    const skuArr = cartValues.map((item) => ({
        sku: item.sku,
    }));

    const grouped_product_attributes = cartValues.map((item) => ({
        CustomizedImgage: item.CustomizedImgage,
        Customized: item.attriuteCustomized,
        Gender: item.attriuteGender,
        Height: item.attriuteHeight,
        Language: item.attriuteLang,
        Size: item.attriuteSize,
        Tool: item.attriuteTool,
        Weight: item.attriuteWeight,
    }));

    const dimension_Data = cartValues.map((item) => ({
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
    };

    const isDataValid = () => {
        const shippingCountry = billingGetValues("shippingCountry");
        const billingCountry = billingGetValues("country");
        return (
            cartValues?.length > 0 &&
            (shippingChecked ? shippingCountry : billingCountry)
        );
    };

    const getShippingDimensions = async () => {
        var obj = {
            _length: 0,
            _weight: 0,
            _quantity: 0,
            _height: 0,
            _actualWeight: 0,
            _totalWeight: 0,
        };

        cartValues.forEach((item) => {
            if (item.productType !== "aws3-bucket-product") {
                obj._quantity += parseInt(item.quantity);
                obj._length += parseFloat(item.dimension_length || 0);
                obj._weight += parseFloat(item.dimension_weight || 0);
                obj._height += parseFloat(item.dimension_height || 0);
                obj._width += parseFloat(item.dimension_weight || 0);
                obj._actualWeight += parseFloat(
                    item.product_actual_weight || 0
                );
                obj._totalWeight +=
                    parseFloat(item.product_actual_weight || 0) *
                    parseInt(item.quantity);
            }
        });

        obj._length = parseFloat(obj._length.toFixed(2));
        obj._weight = parseFloat(obj._weight.toFixed(2));
        obj._height = parseFloat(obj._height.toFixed(2));
        obj._actualWeight = parseFloat(obj._actualWeight.toFixed(2));
        obj._totalWeight = parseFloat(obj._totalWeight.toFixed(2));

        return obj;
    };

    const ChangeAddressSubmit = async (type = "shipping") => {
        if (isApiCalling.current) {
            return;
        }
        if (!isDataValid()) {
            setLeftLoader(false);
            return;
        }
        try {
            isApiCalling.current = true;
            setLeftLoader(true);

            const dimensions = await getShippingDimensions();
            if (!dimensions) {
                setLeftLoader(false);
                errorToast("Failed to calculate dimensions");
                isApiCalling.current = false;
                return;
            }

            let data = {
                contact_name:
                    authData && authData.id ? authData.name : "Customer",
                contact_email:
                    authData && authData.id
                        ? authData.email
                        : "info@scoliolife.com",
                parcels_box_length: dimensions._length,
                parcels_box_width: dimensions._weight,
                parcels_box_height: dimensions._height,
                items_quantity: dimensions._quantity,
                items_description: cartValues[0]?.title || "Health Product",
                items_category: "Health & Beauty",
                items_declared_currency: "SGD",
                items_actual_weight: dimensions._actualWeight,
                items_declared_customs_value: 1,
                total_actual_weight: dimensions._totalWeight,
                items_sku: cartValues[0]?.sku || "",
                items_hs_code: cartValues[0]?.hs_code || "",
                items_origin_country_alpha2: "SG",
            };

            if (type === "billing") {
                data.country_alpha2 = billingGetValues("country") || "";
                data.state = billingGetValues("state") || "Lorem";
                data.city = billingGetValues("town") || "Lorem";
                data.postal_code = billingGetValues("postcode") || "12345";
            } else if (type === "new") {
                const address = localStorage.getItem("shippingCartAddress")
                    ? JSON.parse(localStorage.getItem("shippingCartAddress"))
                    : {};
                data.country_alpha2 =
                    billingGetValues("country") ||
                    address?.country_alpha2 ||
                    "";
                data.state =
                    billingGetValues("state") || address?.state || "Lorem";
                data.city =
                    billingGetValues("town") || address?.city || "Lorem";
                data.postal_code =
                    billingGetValues("postcode") ||
                    address?.postal_code ||
                    "12345";
            } else {
                data.country_alpha2 = billingGetValues("shippingCountry") || "";
                data.state = billingGetValues("shippingState") || "Lorem";
                data.city = billingGetValues("shippingTown") || "Lorem";
                data.postal_code =
                    billingGetValues("shippingPostcode") || "12345";
            }

            const response = await axios.post(`${API}shipping-rates`, data);

            setLeftLoader(false);

            if (!response.data.success) {
                errorToast(
                    response.data.message ||
                        response.data.error ||
                        "Failed to retrieve shipping rates"
                );
                return;
            }

            const { data: rates, shipping_information } = response.data;

            localStorage.setItem("shippingData", JSON.stringify(response.data));
            setShippingDetail(response.data);

            let selectedOption = rates[0];
            const storedOption = localStorage.getItem("checkAddressSelect")
                ? JSON.parse(localStorage.getItem("checkAddressSelect"))
                : null;

            if (
                storedOption &&
                rates.some(
                    (courier) => courier.courier_id === storedOption.courier_id
                )
            ) {
                selectedOption = storedOption;
            } else {
                localStorage.removeItem("checkAddressSelect");
            }

            localStorage.setItem(
                "checkAddressSelect",
                JSON.stringify(selectedOption)
            );
            setSelectedOption(selectedOption);
            setShippigCharges(selectedOption.total_charge);

            const focusDiv = document.getElementById("shipping-options");
            if (focusDiv) {
                focusDiv.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }

            isApiCalling.current = false;
        } catch (error) {
            setLeftLoader(false);
            localStorage.removeItem("shippingData");
            localStorage.removeItem("checkAddressSelect");
            setShippingDetail(null);
            setSelectedOption(null);
            setShippigCharges(0);
            console.error(
                "Shipping details error:",
                error.response?.data?.message || error.message
            );
            errorToast(error.response?.data?.message || error.message);
            isApiCalling.current = false;
        }
    };

    // Check if all required shipping fields are filled
    const areShippingFieldsFilled = () => {
        const shippingCountry = billingGetValues("shippingCountry");
        const shippingState = billingGetValues("shippingState");
        const shippingTown = billingGetValues("shippingTown");
        const shippingPostcode = billingGetValues("shippingPostcode");
        return (
            shippingCountry &&
            shippingState &&
            // shippingTown &&
            // shippingPostcode &&
            cartValues?.length > 0
        );
    };

    // Check if all required billing fields are filled
    const areBillingFieldsFilled = () => {
        const country = billingGetValues("country");
        const state = billingGetValues("state");
        const town = billingGetValues("town");
        const postcode = billingGetValues("postcode");
        return (
            country &&
            state &&
            // town &&
            // postcode &&
            cartValues?.length > 0
        );
    };

    // Handler for onBlur events on shipping fields
    const handleShippingFieldBlur = () => {
        if (shippingChecked && areShippingFieldsFilled()) {
            ChangeAddressSubmit("shipping");
        }
    };

    // Handler for onBlur events on billing fields
    const handleBillingFieldBlur = () => {
        if (!shippingChecked && areBillingFieldsFilled()) {
            ChangeAddressSubmit("billing");
        }
    };

    // Initial data readiness check
    useEffect(() => {
        if (cartValues?.length > 0 && !digital) {
            setIsDataReady(true);
        }
    }, [cartValues,digital]);

    // Handle initial load with stored address
    useEffect(() => {
        if (localStorage.getItem("shippingCartAddress") && isDataReady && !digital) {
            ChangeAddressSubmit("new");
        }
    }, [isDataReady,digital]);

    // Trigger shipping API when shipping country or state changes and shippingChecked is true
    useEffect(() => {
        if (shippingChecked && isDataReady) {
            if (!selectedOption) {
                localStorage.removeItem("checkAddressSelect");
            }

            ChangeAddressSubmit("shipping");
        }
    }, [
        billingGetValues("shippingCountry"),
        billingGetValues("shippingState"),
        shippingChecked,
        isDataReady,
        directCart,
    ]);

    // Trigger billing API when billing country or state changes and shippingChecked is false
    useEffect(() => {
        if (!shippingChecked && isDataReady) {
            if (!selectedOption) {
                localStorage.removeItem("checkAddressSelect");
            }
            ChangeAddressSubmit("billing");
        }
    }, [
        billingGetValues("country"),
        billingGetValues("state"),
        shippingChecked,
        isDataReady,
        directCart,
    ]);

    const handleCardElementChange = (event) => {
        const { complete, elementType } = event;
        if (complete && elementType === "card") {
            const cardBrand = event.brand;
            setCardType(cardBrand);
        } else {
            setCardType(null);
        }
    };

    const CheckCondition = (e) => {
        setTermCondition(!termCondition);
        setcheckCondition(false);
    };

    const handleOptionChange = (e) => {
        var vall = JSON.parse(e.target.value);
        localStorage.setItem("checkAddressSelect", e.target.value);
        setSelectedOption(vall);
        setShippigCharges(vall.total_charge);
    };

    const getCouponData = () => {
        var _coupon = sessionStorage.getItem("discountCoupon");
        if (_coupon && typeof _coupon != "undefined") {
            _coupon = JSON.parse(_coupon);
            if (_coupon && _coupon.data && _coupon.data.coupon_name) {
                checkCoupon({
                    coupon: _coupon.data.coupon_name,
                    user_id: authData.id,
                })
                    .then((response) => {
                        if (response && response.status) {
                            sessionStorage.removeItem("discountCoupon");
                            setCouponDetail(null);
                            toast.error(t("toast.coupon.already"), {
                                className: "full-red-alert",
                                autoClose: 5000,
                            });
                        }
                    })
                    .catch((err) => {
                        console.log("Error getting coupon details:", err);
                    });
            }
        }
    };

    const applyCouponCode = async (data) => {
        data["user_id"] = authData && authData.id ? authData.id : "";
        const trimData = trimInputValues(data);
        applyCoupon(trimData)
            .then((response) => {
                if (typeof response != "undefined" && response.status) {
                    sessionStorage.setItem(
                        "discountCoupon",
                        JSON.stringify(response)
                    );
                    setCouponMsg(t("toast.coupon.applied"));
                } else {
                    toast.error(t(response.message), {
                        className: "full-red-alert",
                        autoClose: 5000,
                    });
                }
                couponReset();
                setTimeout(() => {
                    setCouponMsg(null);
                }, 10000);
            })
            .catch((error) => {
                console.log("Error in rating data:", error);
            });
    };

    const RemoveDiscount = () => {
        setCouponDetail(null);
        setCouponMsg(null);
        sessionStorage.removeItem("discountCoupon");
        setCouponCode(null);
    };

    const getUserAddress = async () => {
        let data = JSON.parse(localStorage.getItem("userData")),
            _options = {
                setSelectedCountry,
                setSelectedState,
                setSelectedShippingState,
                setSelectedShippingCountry,
                countries: Country.getAllCountries(),
                states: State,
                setStates,
                setShippingStates,
                page: "checkout",
                trigger,
            };
        if (data && typeof data != "undefined") {
            var { user_data } = data;
            if (user_data && user_data.id) {
                getAddress(user_data.id)
                    .then((response) => {
                        setCheckoutDetails(billingSetValue, response, _options);
                    })
                    .catch((error) => {
                        console.log("Error in getting address data:", error);
                    });
            } else {
                setCheckoutDetails(billingSetValue, {}, _options);
            }
        } else {
            setCheckoutDetails(billingSetValue, {}, _options);
            await trigger();
        }
    };

    const getShippingDetails = () => {
        let data = JSON.parse(localStorage.getItem("shippingData"));
        setShippingDetail(data);
        var oldVal = localStorage.getItem("checkAddressSelect");
        if (oldVal && typeof oldVal != "undefined" && oldVal !== "null") {
            var _val = JSON.parse(oldVal);
            setSelectedOption(_val);
            setShippigCharges(_val.total_charge);
        } else {
            if (data?.data?.[0]) {
                setSelectedOption(data.data[0]);
                setShippigCharges(data.data[0].total_charge);
                localStorage.setItem(
                    "checkAddressSelect",
                    JSON.stringify(data.data[0])
                );
            } else {
                localStorage.removeItem("checkAddressSelect");
            }
        }
    };

    const handleCountryChange = (selectedCountryCode, changeValue) => {
        const stateList = State.getStatesOfCountry(selectedCountryCode);
        changeValue(stateList);
    };

    const onCountryChange = (selectedVal) => {
        setSelectedCountry(selectedVal);
        billingSetValue("country", selectedVal?.isoCode);
        billingSetValue("state", "");
        setSelectedState(null);
        handleCountryChange(selectedVal?.isoCode, setStates);
        trigger(["country", "state"]);
        if (!shippingChecked && isDataReady && areBillingFieldsFilled()) {
            ChangeAddressSubmit("billing");
        }
    };

    const onStateChange = (selected) => {
        setSelectedState(selected);
        billingSetValue("state", selected?.name);
        trigger("state");
        if (!shippingChecked && isDataReady && areBillingFieldsFilled()) {
            ChangeAddressSubmit("billing");
        }
    };

    const onShippingCountryChange = (selectedVal) => {
        setSelectedShippingCountry(selectedVal);
        billingSetValue("shippingCountry", selectedVal?.isoCode);
        billingSetValue("shippingState", "");
        setSelectedShippingState(null);
        handleCountryChange(selectedVal?.isoCode, setShippingStates);
        trigger(["shippingCountry", "shippingState"]);
        if (shippingChecked && isDataReady && areShippingFieldsFilled()) {
            ChangeAddressSubmit("shipping");
        }
    };

    const onShippingStateChange = (selected) => {
        setSelectedShippingState(selected);
        billingSetValue("shippingState", selected?.name);
        trigger("shippingState");
        if (shippingChecked && isDataReady && areShippingFieldsFilled()) {
            ChangeAddressSubmit("shipping");
        }
    };

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
    };

    const checkForCoupon = () => {
        var _coupon = sessionStorage.getItem("discountCoupon");
        if (_coupon && typeof _coupon != "undefined") {
            setCouponDetail(JSON.parse(_coupon));
        }
    };

    const taxRates = async () => {
        let data = {
            tax_rate: "9.00",
            tax_name: "GST",
        };
        try {
            const ratesData = await axios.get(`${API}tax-product`, data);
            let tax = ratesData?.data[0].tax_rate;
            setTaxRate(parseFloat(tax));
        } catch (error) {
            console.log("enquiryData----erorr", error);
        }
    };

    const changePaymentMethod = (val) => {
        setPaymentType(val);
    };

    const handleShippingAddress = (event) => {
        if (event.target.value === "on") {
            setShippingChecked((previousValue) => !previousValue);
        } else {
            setShippingChecked(false);
        }
    };

    const checkOutMethod = async (data) => {
        try {
            const checkOutDat = await axios.post(`${API}orders-checkout`, data);
            if (checkOutDat?.data?.status === "true") {
                // if (paymentType !== "razorpay") {
                if (cartType == "directCart") {
                    dispatch(removeDirectBuyItem());
                } else {
                    dispatch(replaceItem([]));
                    localStorage.removeItem("cart");
                }
                setCheckOutData(checkOutDat);
                localStorage.removeItem("paypalPay");
                localStorage.removeItem("razorpayPay");
                sessionStorage.removeItem("discountCoupon");
                localStorage.removeItem("shippingData");
                localStorage.removeItem("checkAddressSelect");
                    navigate(
                        `${urlLanguage}/order/complete/${checkOutDat?.data?.order_id}`,
                        { state: checkOutDat?.data?.order_id }
                    );
                // }
                setPayedByPaypal(false);
                scrollToTop();
                setStripeLoader(false);
            }
        } catch (error) {
            console.log("checkOut error===========", error);
            setStripeLoader(false);
        }
    };

    const generateRandomNumber = () => {
        const number = Math.floor(100000 + Math.random() * 900000);
        return number;
    };

    const paypalPaymentApprove = async (data) => {
        if (data && data.id) {
            setPayedByPaypal(true);
            localStorage.setItem("paypalPay", JSON.stringify(data));
            formRef.current.requestSubmit();
        } else {
            setPayedByPaypal(false);
            toast.error(t("toast.payment.error"));
        }
    };

    const paypalPaymentFailed = async (data) => {
        console.log("------------paypal payment failed", data);
    };

    // const createStripePayment = async (data, cardElement) => {
    //     try {
    //         const { token, error } = await stripe.createToken(cardElement, {
    //             name: authData && authData.id ? authData.name : "",
    //             email:
    //                 authData && authData.id
    //                     ? authData.email
    //                     : "scolio@customer.com",
    //         });

    //         if (error) {
    //             console.log("Error creating token:", error);
    //             setStripeLoader(false);
    //             setStripeError(error.message);
    //         } else {
    //             setPaymentError(null);
    //             fetch(`${API}stripe-payment`, {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({
    //                     token: token.id,
    //                     amount: parseFloat(totalPrice).toFixed(2),
    //                     customer_name:
    //                         authData && authData.id ? authData.name : "",
    //                     customer_email:
    //                         authData && authData.id
    //                             ? authData.email
    //                             : "scolio@customer.com",
    //                     order_number:
    //                         data && data["order_number"]
    //                             ? data["order_number"]
    //                             : "",
    //                     captcha_token: captchaToken ? captchaToken : null,
    //                     user_id: authData && authData.id ? authData.id : "",
    //                     mode: process.env.REACT_APP_PAYMENT_MODE,
    //                 }),
    //             })
    //                 .then((response) => response.json())
    //                 .then((responsedata) => {
    //                     console.log("payment success", responsedata);
    //                     if (responsedata && responsedata.success) {
    //                         data["payment_id"] = responsedata?.charge.id;
    //                         checkOutMethod(data);
    //                     } else {
    //                         errorToast(responsedata.message);
    //                         setStripeLoader(false);
    //                     }
    //                 })
    //                 .catch((error) => {
    //                     console.log("Error sending token to server:", error);
    //                     setStripeLoader(false);
    //                 });
    //         }
    //     } catch (error) {
    //         console.log("An error occurred:", error);
    //         setStripeLoader(false);
    //         setPaymentError("An error occurred during payment.");
    //     }
    // };

    const errorToast = (message) => {
        toast.error(message, { className: "full-red-alert", autoClose: 5000 });
        var main = document.getElementById("stripe-card-view");
        if (main) {
            main.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    const handlePaymentSuccess = (paymentData) => {
        console.log(paymentData);
        razorpayPaymentApprove(paymentData);
    };

    const handlePaymentError = (errorMessage) => {
        setStripeLoader(false);
        razorpayPaymentFailed({ description: errorMessage });
    };

    const razorpayPaymentApprove = async (data) => {
        // const razorpayOrderId = localStorage.getItem('razropayOrderId')
        if (data) {
            // localStorage.setItem("razorpayPay", JSON.stringify(data));
            formRef.current.requestSubmit();
        } else {
            toast.error(t("toast.payment.error"));
        }
    };

    const razorpayPaymentFailed = async (error) => {
        console.log("------------razorpay payment failed", error);
        errorToast(error.description || "Razorpay payment failed");
    };
    const BillingSubmit = async (data) => {
        var _couponName =
            couponDetail &&
            couponDetail?.data &&
            couponDetail?.data?.coupon_name
                ? couponDetail?.data?.coupon_name
                : "";
        var _lang = "en";
        if (!currentLanguage.includes("en")) {
            var _arr = currentLanguage.split("_");
            _lang = _arr[1].toLowerCase();
        }
        data["userId"] = authData?.id;
        data["lang"] = _lang;
        data["language"] = currentLanguage;
        data["shipping_method_name"] = selectedOption?.courier_name;
        data["shipping_id"] = selectedOption?.courier_id;
        data["shipping_rates_list"] = JSON.stringify(shippingRatesList);
        data["shippig_charges"] = shippigCharges;
        if (cartValues) {
            if (cartValues.some((item) => item.productType === "digital")) {
                data["productType"] = "digital";
            } else if (
                cartValues.every(
                    (item) => item.productType === "aws3-bucket-product"
                )
            ) {
                data["productType"] = "amazon";
            } else {
                data["productType"] = "normal";
            }
        }
        data["same_address"] = shippingChecked;
        data["sub_total"] = parseFloat(totalPrice).toFixed(2);
        data["quantity"] = totalQuantity;
        data["total_amount"] = subTotalPrice;
        data["gst_tax"] = taxPrice;
        data["coupon_price"] = couponPrice;
        data["discount_couponcode"] = _couponName;
        data["product_items"] = newArray;
        data["sku"] = skuArr;
        data["dimension_height"] = cartValues.reduce((sum, item) => {
            var _val = item.dimension_height ? item.dimension_height : 0;
            var total_dimension_height = parseFloat(sum) + +(+parseFloat(_val));
            return parseFloat(total_dimension_height).toFixed(2);
        }, 0);
        data["dimension_length"] = cartValues.reduce((sum, item) => {
            var _val = item.dimension_length ? item.dimension_length : 0;
            var total_dimension_length = parseFloat(sum) + +(+parseFloat(_val));
            return parseFloat(total_dimension_length).toFixed(2);
        }, 0);
        data["dimension_weight"] = cartValues.reduce((sum, item) => {
            var _val = item.dimension_weight ? item.dimension_weight : 0;
            var total_dimension_weight = parseFloat(sum) + +(+parseFloat(_val));
            return parseFloat(total_dimension_weight).toFixed(2);
        }, 0);
        data["product_actual_weight"] = cartValues.reduce((sum, item) => {
            var _val = item.product_actual_weight
                ? item.product_actual_weight
                : 0;
            var total_product_actual_weight =
                parseFloat(sum) + +(+parseFloat(_val));
            return parseFloat(total_product_actual_weight).toFixed(2);
        }, 0);
        data["grouped_product_attributes"] = grouped_product_attributes;
        data["stripe_total_price"] = totalPrice;
        data["payment_type"] = paymentType;
        const newRandomNumber = generateRandomNumber();
        data["order_number"] = newRandomNumber;

        if (termCondition) {
            if (authLogin) {
                if (totalPrice == "0") {
                    setStripeLoader(true);
                    checkOutMethod(data);
                } else {
                    if (paymentType == "paypal") {
                        var payed = localStorage.getItem("paypalPay");
                        payed = JSON.parse(payed);
                        data["payment_id"] = payed.id;
                        setStripeLoader(true);
                        checkOutMethod(data);
                    } else {
                        // if (!stripe) {
                        //     console.log("Stripe.js has not yet loaded.");
                        //     errorToast("Please try other payment method");
                        //     return;
                        // }
                        const isCouponCode = JSON.parse(
                            sessionStorage.getItem("discountCoupon")
                        );
                        if (
                            !isCouponCode &&
                            totalPrice < process.env.REACT_APP_MININUM_AMOUNT
                        ) {
                            errorToast(
                                t("minimum.amount", {
                                    amount: process.env
                                        .REACT_APP_MININUM_AMOUNT,
                                })
                            );
                            return;
                        }
                        const selectedCourirer = JSON.parse(
                            localStorage.getItem("checkAddressSelect")
                        );
                        if (!digital && !selectedCourirer) {
                            errorToast(t("checkOut.select_shipping"));
                            return;
                        }

                        // if (!captchaToken) {
                        //     setCaptchaErr(true);
                        //     errorToast("Verify Captcha !", {
                        //         className: "full-red-alert",
                        //         autoClose: 5000,
                        //     });
                        //     return;
                        // }
                        // const cardElement =
                        //     elements.getElement(CardNumberElement);
                        // const { error } = await stripe.createPaymentMethod({
                        //     type: "card",
                        //     card: cardElement,
                        // });
                        // if (error) {
                        //     console.log("CardElement not found.", error);
                        //     errorToast(error.message);
                        //     setStripeError(error.message);
                        //     return;
                        // }
                        setStripeError(null);
                        setStripeLoader(true);

                        // var razorpayPayed = localStorage.getItem("razorpayPay");
                        // if (razorpayPayed) {
                        //     razorpayPayed = JSON.parse(razorpayPayed);
                        //     data["payment_id"] = razorpayPayed.payment_id;
                        //     setStripeLoader(true);
                        //     checkOutMethod(data);
                        // }
                        var razorpayOrderId  =
                            localStorage.getItem("razropayOrderId");
                        if (razorpayOrderId) {
                            data["payment_id"] = razorpayOrderId ;
                            setStripeLoader(true);
                            checkOutMethod(data);
                        }
                        // setCheckOutData(data);
                        // createStripePayment(data, cardElement);
                    }
                }
            } else {
                toast.error(t("toast.validate.login"), {
                    className: "full-red-alert",
                    autoClose: 5000,
                });
            }
        } else {
            setcheckCondition(true);
        }
    };

    const navigateToCheckout = () => {
        navigate(`${urlLanguage}/checkout`);
    };

    useEffect(() => {
        if (authData && authData.id) {
            if (triggerCouponCheck) {
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
        const isCouponCode = JSON.parse(
            sessionStorage.getItem("discountCoupon")
        );
        const percent = isCouponCode
            ? isCouponCode?.data?.coupon_percent
                ? parseInt(isCouponCode?.data?.coupon_percent, 10)
                : parseInt(isCouponCode?.coupon_percent, 10)
            : null;
        setCouponCode(percent);
        setCouponDetail(isCouponCode);
    }, [couponMsg]);

    useEffect(() => {
        if (state && state.shippingDetail) {
            setShippingRatesList(state.shippingDetail.data);
        }
    }, [state]);

    useEffect(() => {
        if (typeof lang != "undefined" && lang !== currentLanguage) {
            dispatch(setUrlLanguage(i18n.language));
            dispatch(setLanguage(i18n.language));
            navigateToCheckout();
        }
        if (typeof lang == "undefined") {
            dispatch(setUrlLanguage("en_US"));
            dispatch(setLanguage("en_US"));
            navigateToCheckout();
        }
    }, [i18n.language, currentLanguage, dispatch, navigate, lang]);

    useEffect(() => {
        try {
            if (Object.keys(billingError).length > 0) {
                const firstErrorField = Object.keys(billingError)[0];
                const errorElement = document.getElementById(firstErrorField);
                if (errorElement) {
                    errorElement.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                    errorElement.focus();
                }
            }
        } catch (error) {
            console.log("billing scroll issue", error);
        }
    }, [billingError]);

    useEffect(() => {
        taxRates();
        getUserAddress();
        checkForCoupon();
    }, []);

// Determine digital status based on cartValues
const determineDigitalStatus = (cartItems) => {
        const hasDigitalProduct = cartItems?.some(
            (item) => item.productType === "digital"
        );
        const hasAwsProduct = cartItems?.some(
            (item) => item.productType === "aws3-bucket-product"
        );
        const hasPhysicalProduct = cartItems?.some(
            (item) =>
                item.productType !== "digital" &&
                item.productType !== "aws3-bucket-product"
        );
        return (hasDigitalProduct || hasAwsProduct) && !hasPhysicalProduct;
};

    // useEffect(() => {
    //     const hasDigitalProduct = cartValues?.some(
    //         (item) => item.productType === "digital"
    //     );
    //     const hasAwsProduct = cartValues?.some(
    //         (item) => item.productType === "aws3-bucket-product"
    //     );
    //     const hasPhysicalProduct = cartValues?.some(
    //         (item) =>
    //             item.productType !== "digital" &&
    //             item.productType !== "aws3-bucket-product"
    //     );
    //     console.log(hasDigitalProduct,hasAwsProduct,hasPhysicalProduct)
    //     if ((hasDigitalProduct || hasAwsProduct) && !hasPhysicalProduct) {
    //         localStorage.removeItem("shippingData");
    //         localStorage.removeItem("shippingCartAddress");
    //         localStorage.removeItem("checkAddressSelect");
    //         setShippingDetail(null);
    //         setShippigCharges(0);
    //         setDigital(true);
    //     } else {
    //         getShippingDetails();
    //     }
    //     getCountryData();
    // }, [cartValues]);

    useEffect(() => {
        // if (directCart && directCart.length) {
        //     setCartValues(directCart);
        //     setCartType("directCart");
        // } else {
        //     setCartValues(cart);
        //     setCartType("cart");
        // }
        let cartItems = [];
        if (directCart && directCart.length) {
            cartItems = directCart;
            setCartType("directCart");
        } else {
            cartItems = cart;
            setCartType("cart");
        }
        setCartValues(cartItems);
        // Set digital status based on cartItems
        if (determineDigitalStatus(cartItems)) {
            localStorage.removeItem("shippingData");
            localStorage.removeItem("shippingCartAddress");
            localStorage.removeItem("checkAddressSelect");
            setShippingDetail(null);
            setShippigCharges(0);
            setDigital(true);
        } else {
            setDigital(false);
            getShippingDetails();
        }
        getCountryData();
    }, [directCart, cart]);

    const onCaptchaChange = (value) => {
        setCaptchaToken(value);
        setCaptchaErr(false);
    };

    let sidebarProps = {
        totalPrice,
        setTotalPrice,
        cart: cartValues,
        t,
        dispatch,
        couponCode,
        shippigCharges,
        taxRate,
        shippingDetail,
        selectedOption,
        handleOptionChange,
        couponDetail,
        handlecoupon,
        applyCouponCode,
        couponForm,
        couponError,
        couponPrice,
        setCouponPrice,
        taxPrice,
        setTaxPrice,
        subTotalPrice,
        setSubTotalPrice,
        setTotalQuantity,
        RemoveDiscount,
        couponMsg,
        digital,
    };

    let shippingProps = {
        billingForm,
        billingError,
        t,
        selectedShippingState,
        selectedShippingCountry,
        shippingCountries,
        shippingStates,
        onShippingCountryChange,
        onShippingStateChange,
        handleShippingFieldBlur,
    };

    let billingProps = {
        billingForm,
        billingError,
        t,
        shippingChecked,
        selectedCountry,
        onCountryChange,
        countries,
        selectedState,
        onStateChange,
        states,
        handleBillingFieldBlur,
    };

    let shipProviderProps = {
        shippingDetail,
        selectedOption,
        t,
        handleOptionChange,
    };

    let stripeProps = {
        billingError,
        billingForm,
        handleCardElementChange,
        stripeError,
        t,
    };

    let paypalProps = {
        paypalRef,
        paypalPaymentApprove,
        totalPrice,
        t,
        authData,
        paypalPaymentFailed,
        isFormValid: isBillingFormValid,
    };

    let loginProps = {
        handleLogin,
        Loginuser,
        t,
        checkLogin,
        loginForm,
        loginError,
    };

    let payProps = {
        setPaymentType,
        stripeProps,
        amount: totalPrice,
        currency: "SGD",
        t,
        user: authData,
        onCaptchaChange,
        setCaptchaToken,
        captchaErr,
        paymentType,

        onPaymentSuccess: handlePaymentSuccess, // Pass success callback
        onPaymentError: handlePaymentError, // Pass error callback
    };
    return (
        <Fragment>
            <TopBanner title={t("main-nav.CHECKOUT")} />
            <div className="checkout-new-page">
                <div className="row">
                    <div className="col-md-6">
                        {leftLoader ? (
                            <div className="btn-loader">
                                <img src={LoaderIco} alt="loader-button" />
                            </div>
                        ) : null}
                        <div className="checkout-left">
                            {!authLogin ? (
                                <Fragment>
                                    <div className="login-check">
                                        <h2> </h2>
                                        <Link
                                            onClick={() =>
                                                setCheckLogin(!checkLogin)
                                            }
                                        >
                                            {t("checkOut.Click here to login")}
                                        </Link>
                                    </div>
                                    <CheckoutLogin {...loginProps} />
                                </Fragment>
                            ) : null}
                            <div className="deliver-check">
                                <h2> {t("checkOut.Billing Address")}</h2>
                                <form
                                    onSubmit={handlebilling(BillingSubmit)}
                                    ref={formRef}
                                >
                                    <BillingAddressForm {...billingProps} />
                                    {!digital && (
                                        <ShippingOptions
                                            {...shipProviderProps}
                                        />
                                    )}
                                    {!digital && (
                                        <div className="shipping-checkbox">
                                            <label className="billing-same">
                                                <input
                                                    type="checkbox"
                                                    name="sameadr"
                                                    checked={shippingChecked}
                                                    onChange={
                                                        handleShippingAddress
                                                    }
                                                />
                                                <b className="text-dark">
                                                    {t(
                                                        "checkOut.Ship To A Different Address"
                                                    )}
                                                </b>
                                            </label>
                                        </div>
                                    )}
                                    {shippingChecked && !digital ? (
                                        <Fragment>
                                            <ShippingAddressFields
                                                {...shippingProps}
                                            />
                                        </Fragment>
                                    ) : null}
                                    {totalPrice != "0" ? (
                                        <PaymentsListView {...payProps} />
                                    ) : // <RazorPayButton   {...payProps}/>
                                    null}
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
                                        <label className="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox">
                                            <input
                                                type="checkbox"
                                                className="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox"
                                                name="terms"
                                                id="terms"
                                                checked={
                                                    checkCondition === true
                                                        ? "checked"
                                                        : ""
                                                }
                                                onChange={(e) =>
                                                    setcheckCondition(
                                                        !checkCondition
                                                    )
                                                }
                                            />
                                            <span className="woocommerce-terms-and-conditions-checkbox-text text-agree">
                                                {t("checkOut.website")}{" "}
                                                <Link
                                                    to={`${urlLanguage}/terms-of-use`}
                                                    className="woocommerce-terms-and-conditions-link"
                                                    target="_blank"
                                                >
                                                    {t(
                                                        "checkOut.terms and conditions"
                                                    )}
                                                </Link>
                                            </span>{" "}
                                            <span className="required">*</span>
                                        </label>
                                        <input
                                            type="hidden"
                                            name="terms-field"
                                            value="1"
                                        />
                                    </p>
                                    {!checkCondition && (
                                        <span className="woocommerce-terms-and-conditions-checkbox-text text-danger">
                                            {t(
                                                "checkOut.Please check the terms and conditions"
                                            )}{" "}
                                        </span>
                                    )}
                                    {stripeLoader ? (
                                        <>
                                            <Circles
                                                height="80"
                                                width="80"
                                                radius="9"
                                                color="green"
                                                ariaLabel="loading"
                                                wrapperClass
                                            />
                                            <div className="language_spinner">
                                                <div
                                                    className="spinner-border text-warning language_spinner"
                                                    role="status"
                                                >
                                                    <span className="sr-only">
                                                        Loading...
                                                    </span>
                                                </div>
                                                <span className="empty_layer"></span>
                                            </div>
                                        </>
                                    ) : paymentType == "paypal" &&
                                      totalPrice > 0 &&
                                      !payedByPaypal ? (
                                        <PaypalButton {...paypalProps} />
                                    ) : (
                                        // <button
                                        //     className="checkout-submit"
                                        //     type="submit"
                                        // >
                                        //     {t("CART12.Proceed to checkout")}
                                        // </button>

                                        <RazorPayButton
                                            amount={totalPrice}
                                            currency={"SGD"}
                                            user={authData}
                                            onPaymentSuccess={
                                                handlePaymentSuccess
                                            }
                                            onPaymentError={handlePaymentError}
                                            t={t}
                                            billingError={billingError}
                                            isFormValid={isBillingFormValid}
                                            phone={phoneValue}
                                            cart={cartValues}
                                            checkoutData={checkoutData}
                                            urlLanguage={urlLanguage}
                                            cartType={cartType}
                                            digital={digital}
                                        />
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                    <CheckoutSidebar {...sidebarProps} />
                </div>
            </div>
        </Fragment>
    );
};

export default CheckoutPage;
