import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { selectLanguage, setLanguage, selectUrlLanguage, setUrlLanguage } from '../reducers/languageSlice';
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useDynamicTitle from '../hooks/useDynamicTitle';
import TopBanner from '../components/TopBanner';

const API = process.env.REACT_APP_API_URL;

const Order = () => {
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
            navigate(`${urlLanguage}/orders/${orderId}`);
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

  	return (
		<Fragment>
			<TopBanner title="Order" />

			<div className="woocommerce-order">
				<div className="container mt-5">
					{/* <p className="thankyou-order"> {t("order_Information.Thank you")} </p> */}
					<ul className="woocommerce-order-overview woocommerce-thankyou-order-details order_details">
						<li className="woocommerce-order-overview__order order">
							{t('order_Information.order_number')}: <strong>{orderDetail?.order_number}</strong>
						</li>
						<li className="woocommerce-order-overview__date date">
							{t('order_Information.date')}:{" "}
							<strong>
								{moment(orderDetail?.created_at).format("MMMM D, YYYY")}
							</strong>
						</li>
						<li className="woocommerce-order-overview__email email">
							{t('order_Information.order_email')}: <strong>{orderDetail?.orderUserInfo?.billing_email}</strong>
						</li>
						<li className="woocommerce-order-overview__total total">
						{t("CART12.Total")}
							{" "}
							<strong>
								<span className="woocommerce-Price-amount amount">
									<bdi>
										<span className="woocommerce-Price-currencySymbol">$</span>
										{parseFloat(orderDetail?.sub_total).toFixed(2)} SGD
									</bdi>
								</span>
							</strong>
						</li>
					</ul>

					<section className="woocommerce-order-details">
						<h2 className="woocommerce-order-details__title">{t('order_Information.order_details')}</h2>
						<table className="woocommerce-table woocommerce-table--order-details shop_table order_details">
							<thead>
								<tr>
									<th className="woocommerce-table__product-name product-name">
										{t('CART12.Product')}
									</th>
									<th className="woocommerce-table__product-table product-total">
										{t('CART12.Total')}
									</th>
								</tr>
							</thead>
							<tbody>
								<tr className="woocommerce-table__line-item order_item">
									<td className="woocommerce-table__product-name product-name">

										<ul>
											{orderDetail?.orderProducts.map((item, index) => {
												let variationProduct=JSON.parse(orderDetail?.grouped_product_attributes);

												return (
													<li>
														<Link to="#">
															{item?.product?.title}
														</Link>
														<strong className="product-quantity"> × {item?.quantity}</strong>

														{variationProduct?.Gender && (
															<ViewVarient title="Gender" value={variationProduct?.Gender} />
														)}

														{variationProduct?.Weight && (
															<ViewVarient title="Weight" value={variationProduct?.Weight} />
														)}

														{variationProduct?.Height && (
															<ViewVarient title="Height" value={variationProduct?.Height} />
														)}

														{variationProduct?.Customized && (
															<ViewVarient title="Customized Report" value={variationProduct?.Customized} />
														)}

														{variationProduct?.Language && (
															<ViewVarient title="Language" value={variationProduct?.Language} />
														)}

														{variationProduct?.Size && (
															<ViewVarient title="Size" value={variationProduct?.Size} />
														)}

														{variationProduct?.Tool && (
															<ViewVarient title="Tool" value={variationProduct?.Tool} />
														)}

														{variationProduct?.Image && (
															<Fragment>
																<div className="variation-UploadedFile">
																	Uploaded File:
																</div>
																<div className="variation-UploadedFile">
																	<p>
																		<img
																			decoding="async"
																			width="280"
																			height="205"
																			src={variationProduct?.Image}
																			className="attachment-thumbnail size-thumbnail"
																			alt=""
																		/>
																	</p>
																</div>
															</Fragment>
														)}
													</li>
												);
											})}
										</ul>
									</td>

									<td className="woocommerce-table__product-total product-total">
										<span className="woocommerce-Price-amount amount">
											<bdi>
												<span className="woocommerce-Price-currencySymbol">$</span>
												{parseFloat(orderDetail?.total_amount).toFixed(2)} SGD
											</bdi>
										</span>
									</td>
								</tr>
							</tbody>

							<tfoot>
								<ViewTrVarient title={t("order_Information.Subtotal")} value={orderDetail?.total_amount} />
								
								{(orderDetail?.coupon) ? (
									<ViewTrVarient title={t("order_Information.Discount")} value={orderDetail?.coupon} />
								) : null}
									
								{(orderDetail?.orderUserInfo && orderDetail?.shipping_method_name)  ? (
									<tr>
										<th scope="row">{t('CART12.Shipping')}:</th>
										<td>
											{orderDetail?.shipping_method_name} ({orderDetail?.orderUserInfo.shipping_address_1} {orderDetail?.orderUserInfo.shipping_address_2}, {orderDetail?.orderUserInfo.shipping_city} {orderDetail?.orderUserInfo.shipping_postcode})
										</td>
									</tr>
								) : null}

								<ViewTrVarient title={t("order_Information.Tax")} value={orderDetail?.gst_tax} />

								<ViewTrVarient title={t('CART12.Total')} value={orderDetail?.sub_total} />
							</tfoot>
						</table>
					</section>

					<section className="woocommerce-customer-details">
						<h2 className="woocommerce-column__title">{t('order_Information.order_billing_address')}</h2>
						{orderDetail ? (
							<address>
								<div>
									<span className="billingh-address">
										<p>{orderDetail?.orderUserInfo.billing_first_name} {orderDetail?.orderUserInfo.billing_last_name}</p>
										<p>{orderDetail?.orderUserInfo.billing_address_1}</p>
										<p>{orderDetail?.orderUserInfo.billing_address_2}</p>
										<p>{orderDetail?.orderUserInfo.billing_city} ({orderDetail?.orderUserInfo.billing_country})</p>
										<p>{orderDetail?.orderUserInfo.billing_postcode}</p>
									</span>
								</div>

								{/*<div className="oder-number">
									<i className="fa fa-phone" aria-hidden="true"></i>
									<p className="woocommerce-customer-details--phone">
										{orderDetail?.phone}
									</p>
								</div>

								<div className="oder-gmail">
									<i className="fa fa-envelope" aria-hidden="true"></i>
									<p className="woocommerce-customer-details--email">
										{orderDetail?.email}
									</p>
								</div>*/}
							</address>
						) : (
							<p>No order details found</p>
						)}
					</section>
				</div>
			</div>
		</Fragment>
  	);
};

const ViewTrVarient = (props) => {
	const { title, value } = props;

	return (
		<tr>
			<th scope="row">{ title }:</th>
			<td>
				<span className="woocommerce-Price-amount amount">
					<span className="woocommerce-Price-currencySymbol">$</span>
					{parseFloat(value).toFixed(2)} SGD
				</span>
			</td>
		</tr>
	)
}

const ViewVarient = (props) => {
	const { title, value } = props;

	return (
		<div className="varient-vals">
			<b>{title}:</b> <span>{value}</span>
		</div>
	)
}

export default Order;