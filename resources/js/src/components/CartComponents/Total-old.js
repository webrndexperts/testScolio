import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Country, State } from "country-state-city";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { scrollToTop } from "../Helper";
import Select from 'react-select';

import { useDispatch } from "react-redux";
import { selectLanguage, selectUrlLanguage } from "../../reducers/languageSlice";
import { fetchMenuItem } from "../../reducers/menuItemSlice";
import { checkAddressSelect } from "../../reducers/checkAddress";
import FormFields from './FormFields';

const API = process.env.REACT_APP_API_URL;
const Total = ({ couponCodes }) => {
  // console.log("couponCodes+++",couponCodes);
  const { t } = useTranslation();
  const {
    register: billingForm,
    handleSubmit: handlebilling,
    reset: billingReset,
    control,
    formState: { errors: billingError },
  } = useForm();
  const [countries, setCountries] = useState([]);
  const [searchcountries, setSearchcountries] = useState();
  const [searchVal, setSearchVal] = useState(null);
  const [open, setOpen] = useState(false);
  const [states, setStates] = useState([]);
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [taxRate, setTaxRate] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [couponCode, setCouponCode] = useState(null);
  const [couponDetail, setCouponDetail] = useState(null);
  const [couponRefresh, setCouponRefresh] = useState(1);
  const [shippingDetail, setShippingDetail] = useState();
  const currentLanguage = useSelector(selectLanguage);
  const urlLanguage = useSelector(selectUrlLanguage);
  const { lang } = useParams();
  const dispatch = useDispatch();
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

  let shippigCharges = selectedOption ? selectedOption.total_charge : null;
  useEffect(() => {
    const countryList = Country.getAllCountries();
    // console.log("countryList",countryList);
    setCountries(countryList);
    setSearchcountries(countryList);
  }, []);

  function handleSearchClick(e) {
    const searchVal = e ? e.target.value : "";
    // console.log("searchVale", searchVal);
    if (searchVal === "") {
      setSearchcountries(countries);
      setSearchVal("No match found");
      return;
    }
    const filterBySearch = countries.filter((item) => {
      if (item.name.toLowerCase().includes(searchVal.toLowerCase())) {
        return item;
      }
    });
    setSearchcountries(filterBySearch);
    setSearchVal(null);
  }

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("shippingData"));
    setShippingDetail(data);
    setSelectedOption(data ? data.data[0] : null);
    // dispatch(checkAddressSelect(data.data[0]))
    if (data?.data?.[0]) {
      localStorage.setItem("checkAddressSelect", JSON.stringify(data.data[0]));
    } else {
      localStorage.setItem("checkAddressSelect", null);
    }
    // console.log("shippingData-----localstorage", data);
  }, []);
  useEffect(() => {
    const isCouponCode = JSON.parse(sessionStorage.getItem("discountCoupon"));
    const percent = isCouponCode
      ? isCouponCode?.data?.coupon_percent
        ? parseInt(isCouponCode?.data?.coupon_percent, 10)
        : parseInt(isCouponCode?.coupon_percent, 10)
      : null;
    setCouponCode(percent);
    setCouponDetail(isCouponCode);
  }, [couponCodes, couponRefresh]);

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
  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    let tax = 0;
    let subTotal = 0;
    let discountAmount = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
    });
    tax = (totalPrice * taxRate) / 100;
    tax = parseFloat(tax.toFixed(2));
    if (couponCode == 100) {
      tax = 0;
    }
    // console.log("sdasdasd::", couponCode);
    subTotal = totalPrice + tax + shippigCharges;
    if (couponCode !== null) {
      //  let totalAmount = totalPrice + shippigCharges;
      discountAmount = (subTotal * couponCode) / 100;
      const discountedSubTotal = subTotal - discountAmount;
      return {
        totalPrice,
        totalQuantity,
        tax,
        subTotal: discountedSubTotal,
        discountAmount,
      };
    }
    return { totalPrice, totalQuantity, tax, subTotal, discountAmount };
  };

  useEffect(() => {
    dispatch(fetchMenuItem());
  }, [dispatch, currentLanguage, lang]);

  // console.log("gtt",getTotal)
  const handleProceedToCheckout = () => {
    // navigate(`/${currentLanguage}/checkout`);
    navigate(`${urlLanguage}/checkout`, { state: { shippingDetail } });
    // navigate('/checkout', { state: selectedOption?.courier_id });
  };

  const handleOptionChange = (event) => {
    setSelectedOption(JSON.parse(event.target.value));
    // dispatch(checkAddressSelect(JSON.parse(event.target.value)))
    localStorage.setItem("checkAddressSelect", event.target.value);
    // console.log("selectedOption", selectedOption);
  };

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

      ChangeAddressSubmit(details);
    }
  }

  const ChangeAddressSubmit = async (data) => {
    data["contact_name"] = "";
    data["contact_email"] = "webdev20222@gmail.com";
    // data['parcels_box_slug']=cart[0].slug;
    data["parcels_box_length"] = cart[0].dimension_length;
    data["parcels_box_width"] = cart[0].dimension_weight;
    data["parcels_box_height"] = cart[0].dimension_height;
    data["items_quantity"] = cart[0].quantity;
    data["items_description"] = cart[0].title;
    // data['items_category']=cart[0].product_type;
    data["items_category"] = "Health & Beauty";
    // data['items_sku']=cart[0].slug;
    // data['items_hs_code']='';
    data["items_declared_currency"] = "SGD";
    data["items_actual_weight"] = cart[0].product_actual_weight;
    // data['country_alpha2']='SG';
    data["items_declared_customs_value"] = 1;
    data["total_actual_weight"] = cart[0].product_actual_weight;
    // data['line_1']='German Centre 25 International Business Park';
    // console.log("data", data);
    try {
      const shippingData = await axios.post(`${API}shipping-rates`, data);

      localStorage.setItem("shippingData", JSON.stringify(shippingData?.data));
      setShippingDetail(shippingData?.data);
      setSelectedOption(shippingData?.data?.data[0]);
      // dispatch(checkAddressSelect(JSON.parse(shippingData?.data?.data[0])))
      localStorage.setItem(
        "checkAddressSelect",
        JSON.stringify(shippingData?.data?.data[0])
      );
    } catch (error) {
      console.log("enquiryData----erorr", error);
    }
  };

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

  const handleCountryChange = () => {
    let _vals = shippingDetail;

    if(_vals && _vals.shipping_information) {
      _vals.shipping_information.country = shippingCountry;
      setShippingDetail(_vals);
    }

    const stateList = State.getStatesOfCountry(shippingCountry);
    setStates(stateList);
  };

  const handleValuesChange = (e, changeValue, name) => {
    var _vals1 = shippingDetail;

    if(_vals1 && _vals1.shipping_information) {
      _vals1.shipping_information[name] = e.target.value;
      setShippingDetail(_vals1)
    }

    changeValue(e.target.value);
  }

  const RemoveDiscount = () => {
    setCouponDetail(null);
    setCouponRefresh(couponRefresh + 1);
    sessionStorage.removeItem("discountCoupon");
  };

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

  let formProps = {
    handleValuesChange, handleFormSubmit, form, onCountryChangeChange, onStateChangeChange, setShippingPin, setShippingCity,
    searchcountries, states, formErrors, t, billingForm,
    selectedCountry, selectedState, shippingCity, shippingPin
  }

  return (
    <div className="col-sm-4">
      <div className="cart-collaterals">
        <div className="cart_totals ">
          <h2>{t("CART12.CART TOTALS")}</h2>
          <table cellSpacing="0" className="shop_table shop_table_responsive">
            <tbody>
              <tr className="cart-subtotal subtotal-design">
                <th>{t("CART12.Subtotal")}</th>
                <td data-title="Subtotal">
                  <span className="woocommerce-Price-amount amount">
                    <bdi>
                      <span className="woocommerce-Price-currencySymbol">
                        $
                      </span>
                      {parseFloat(getTotal().totalPrice).toFixed(2)} SGD
                    </bdi>
                  </span>
                </td>
              </tr>
              <tr className="cart-subtotal cart_dic">
                {couponDetail ? (
                  <th>{t("CART12.Coupon")}{couponDetail?.coupon_name}</th>
                ) : (
                  ""
                )}
                <td className="cart_price_new">
                {couponDetail ? (
                  <div className="discount-price cart_discount_price">
                    <td>
                      -${parseFloat(getTotal().discountAmount).toFixed(2)} SGD [
                      <span onClick={() => RemoveDiscount()}>Remove</span>]
                    </td>
                  </div>
                ) : (
                  ""
                )}
                </td>
              </tr>
              <tr className="cart-subtotal">
               
              </tr>
              <tr className="cart-subtotal">
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
                            <span className="woocommerce-Price-amount amount">
                              <bdi>
                                <span className="woocommerce-Price-currencySymbol">
                                  $
                                </span>
                                {parseFloat(item.total_charge).toFixed(2)} {item.currency}
                              </bdi>
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </td>
                {shippingDetail ? (
                  <p className="woocommerce-shipping-destination">
                    Shipping to{" "}
                    <strong>{`${shippingDetail?.shipping_information.city},${shippingDetail?.shipping_information.postal_code}, ${shippingDetail?.shipping_information.state}, ${shippingDetail?.shipping_information.country}`}</strong>
                    .
                  </p>
                ) : (
                  ""
                )}
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
              </tr>
              <tr className="tax-total">
                <th>
                  {t("CART12.Tax")}{" "}
                  <small>{t("CART12.(estimated for India)")}</small>
                </th>
                <td data-title="Tax" className="cart_amout_design">
                  <span className="woocommerce-Price-amount amount">
                    <bdi>
                      <span className="woocommerce-Price-currencySymbol">
                        $
                      </span>
                      {parseFloat(getTotal().tax).toFixed(2)} SGD
                    </bdi>
                  </span>
                </td>
              </tr>
              <tr className="order-total">
                <th className="total-design">{t("CART12.Total")}</th>
                <td data-title="Total" className="cart_amout_design">
                  <strong>
                    <span className="woocommerce-Price-amount amount">
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
              {t("CART12.Proceed to checkout")}{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Total;
