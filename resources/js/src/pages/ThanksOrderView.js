// import '../test.css'
import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { selectLanguage, setLanguage, selectUrlLanguage, setUrlLanguage } from '../reducers/languageSlice';
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation , Trans  } from 'react-i18next';
import useDynamicTitle from '../hooks/useDynamicTitle';
import TopBanner from '../components/TopBanner';
const ThanksOrderView = () => {
    const API = process.env.REACT_APP_API_URL;
    const { orderId, lang } = useParams();
	const [order, setOrder] = useState(null);
	const { state } = useLocation();
	const [orderDetail, setOrderDetail] = useState();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();
    const currentLanguage = useSelector(selectLanguage);
    const urlLanguage = useSelector(selectUrlLanguage);
    const dispatch = useDispatch();

	useEffect(() => {
		fetch(`${API}single-order-info/${orderId}`).then((response) => {
			if (!response.ok) {
				console.log(`HTTP error! Status: ${response.status}`);
			}
			return response.json();
		}).then((data) => {
			
			setOrderDetail(data.order);
		}).catch((error) => {
			console.log("Fetch error:", error);
		});
	}, [state]);

	useEffect(() => {
        const navigateToOrder = () => {
            navigate(`${urlLanguage}/order/complete/${orderId}`);
        };

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

	useDynamicTitle('Order');
    console.log(orderDetail?.shipping_price)
    return (
        <div className='thankyou-section'>
            <div className='container'>
                <div className="row">
                    <div className="col-sm-6">
                        <div className='thankyou info'>
                            <h2 dangerouslySetInnerHTML={{ __html:t("order_Information.Thank you")}}></h2>
                            <p>{t('order_Information.msg')}</p>
                           {orderDetail ? <div className='thankyou-billing'>
                                <h4> {t('order_Information.order_billing_address')} </h4>
                                <p><b>{t('order_Information.Name')}</b><span>{orderDetail?.orderUserInfo.billing_first_name} {orderDetail?.orderUserInfo.billing_last_name}</span></p>
                                <p><b>{t('custom_Order_info.cus_address')}</b><span>{orderDetail?.orderUserInfo.billing_address_1} , {orderDetail?.orderUserInfo.billing_address_2}
                                   </span></p>
                                <p><b>{t('checkOut.Town / City')}</b><span> {orderDetail?.orderUserInfo.billing_city}  </span></p>
                                <p><b>{t('order_Information.Country')}</b><span> {orderDetail?.orderUserInfo.billing_country} </span></p>
                                <p><b>{t('order_Information.Post Code')}</b><span>{orderDetail?.orderUserInfo.billing_postcode} </span></p>
                                <p><b>{t('order_Information.Phone')}</b><span>{orderDetail?.orderUserInfo?.billing_phone}</span></p>
                                <p><b>{t('order_Information.order_email')}</b><span className="text-lowercase">{orderDetail?.orderUserInfo?.billing_email}</span></p>
                            </div> : <p>No order details found</p>}
                        </div>
                        <div className="your-orders">
                            <Link  to={ (currentLanguage != 'en_US') ?  `/${currentLanguage}/order` : '/order'} >{t('order_Information.your_order')}</Link>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className='thankyou-oder'>
                            <h4>{t('order_Information.order_details')}</h4>
                            <div className='oder-infos'>
                                <div className='date'>
                                    <h6>{t('order_Information.date')}</h6>
                                    <p>{moment(orderDetail?.created_at).format("MMMM D, YYYY")}</p>
                                </div>
                                <div className='date numbers'>
                                    <h6>{t('order_Information.order_number')}</h6>
                                    <p>{orderDetail?.order_number}</p>
                                </div>
                                <div className='date emails'>
                                    <h6>{t('order_Information.order_email')}</h6>
                                    <p>{orderDetail?.orderUserInfo?.billing_email}</p>
                                </div>
                            </div>

                            {orderDetail?.orderProducts.map((item, index) => {
								let variationProduct=JSON.parse(orderDetail?.grouped_product_attributes);
                            
                                return (
                                    <div class="thankyou-product" key={item?.product?.id}>
                                        <div className="thankyou-product-data">
                                    <div className="total-method"><img src={item?.product?.photo}/></div>
                                    <div class="product-nam">
                                        <p className='name-products'>{item?.product?.title} <br /> 
                                        <span>Quantity: × {item?.quantity}</span>   </p>



                                        {variationProduct?.Gender && (
                                            <p>Gender: {variationProduct?.Gender}</p>
                                        )}

                                        {variationProduct?.Weight && (
                                            <p>Weight: {variationProduct?.Weight}</p>
                                        )}

                                        {variationProduct?.Height && (
                                            <p>Height: {variationProduct?.Height}</p>
                                        )}

                                        {variationProduct?.Customized && (
                                            <p>Customized: {variationProduct?.Customized}</p>
                                        )}

                                        {variationProduct?.Language && (
                                            <p>Language: {variationProduct?.Language}</p>
                                        )}

                                        {variationProduct?.Size && (
                                            <p>Size: {variationProduct?.Size}</p>
                                        )}

                                        {variationProduct?.Tool && (
                                            <p>Tool: {variationProduct?.Tool}</p>
                                        )}

                                        {( variationProduct?.Image ) && (
                                            <Fragment>
                                                <div className="variation-UploadedFile">
                                                <p className="variation-UploadedFile">
                                                    Uploaded File:
                                                </p>
                                                    <p>
                                                        <img
                                                            decoding="async"
                                                            width="280"
                                                            height="205"
                                                            src={ variationProduct.Image }
                                                            className="attachment-thumbnail size-thumbnail"
                                                            alt=""
                                                        />
                                                    </p>
                                                </div>
                                            </Fragment>
                                        )}


                                        {(variationProduct[0] && variationProduct[0]?.CustomizedImgage ) && (
                                            <Fragment>
                                                <div className="variation-UploadedFile">
                                                <p className="variation-UploadedFile">
                                                    Uploaded File:
                                                </p>
                                                    <p>
                                                        <img
                                                            decoding="async"
                                                            width="280"
                                                            height="205"
                                                            src={variationProduct[0]?.CustomizedImgage}
                                                            className="attachment-thumbnail size-thumbnail"
                                                            alt=""
                                                        />
                                                    </p>
                                                </div>
                                            </Fragment>
                                        )}

                                    </div>
                                    </div>
                                    <div class="product-price-nam">
                                        <p><span>$</span>{parseFloat(orderDetail?.total_amount).toFixed(2)} SGD</p>
                                    </div>
                                </div>
                                )            
                                                
                            })}     
                            <div className='subtotal-thankyous'>
                            <div class="subtotal-thankyou"><p> {t("order_Information.Subtotal")}:</p><h5><span>$</span>{parseFloat(orderDetail?.total_amount).toFixed(2)} SGD</h5></div>
                            {(orderDetail?.orderUserInfo && orderDetail?.shipping_method_name)  ? ( <div class="subtotal-thankyou"><p> {t('CART12.Shipping')}:</p><h5 className='Shipping-infos'>	{orderDetail?.shipping_method_name} ({orderDetail?.orderUserInfo.shipping_address_1} {orderDetail?.orderUserInfo.shipping_address_2}, {orderDetail?.orderUserInfo.shipping_city} {orderDetail?.orderUserInfo.shipping_postcode})</h5></div> 	) : null}
                            {(orderDetail?.orderUserInfo && orderDetail?.shipping_method_name)  ? ( <div class="subtotal-thankyou"><p> {t('CART12.Shipping')} {t('product_dropdown.wishlist.price')}:</p><h5><span>$</span>{parseFloat(orderDetail?.shipping_price).toFixed(2)} SGD </h5></div> ) : null}
                            <div class="subtotal-thankyou"><p>{t("order_Information.Tax")}:</p><h5><span>$</span>{orderDetail?.gst_tax} SGD</h5></div>
                            </div>
                            <div class="total-thankyou"><p>{t('CART12.Total')}:</p><h5><span>$</span>{parseFloat(orderDetail?.sub_total).toFixed(2)} SGD</h5></div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ThanksOrderView;