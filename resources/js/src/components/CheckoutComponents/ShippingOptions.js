// import React from 'react';

// const ShippingOptions = (props) => {
// 	const { shippingDetail, selectedOption, t, handleOptionChange } = props;

// 	return (
// 		<div className='shippping-details' id="shipping-options">
//             <h2 className='method-ses'>{t('checkOut.Shipping_method')}</h2>

//             <div className='stateShipping-method'>
//             	{/* {(shippingDetail?.data && shippingDetail?.data.length) ? (
//             		<ul className="custom-shipping-methods">
// 						{shippingDetail?.data?.map((item, index) => {

// 							return (
// 								<li className="shipping__list_item">
// 									<input
// 										type="radio"
// 										id={`option${index + 1}`}
// 										name="options"
// 										value={JSON.stringify(item)}
// 										checked={
// 											selectedOption?.courier_id === item.courier_id && selectedOption?.total_charge == item.total_charge
// 										}
// 										onChange={handleOptionChange}
// 									/>
// 									<label
// 										htmlFor={`option${index + 1}`}
// 										className="shipping__list_label"
// 									>
// 										{item.courier_name}
// 										<span className="woocommerce-Price-amount amount">
// 											<bdi>
// 												<span className="woocommerce-Price-currencySymbol">$</span>
// 												{item.total_charge} {item.currency}
// 											</bdi>
// 										</span>
// 									</label>
// 								</li>
// 							);
// 						})} */}
//             	{(shippingDetail && shippingDetail.length) ? (
//             		<ul className="custom-shipping-methods">
// 						{shippingDetail.map((item, index) => {

// 							return (
// 								<li className="shipping__list_item">
// 									<input
// 										type="radio"
// 										id={`option${index + 1}`}
// 										name="options"
// 										value={JSON.stringify(item)}
// 										checked={
// 											selectedOption?.courier_id === item.courier_id && selectedOption?.price == item.price
// 										}
// 										onChange={handleOptionChange}
// 									/>
// 									<label
// 										htmlFor={`option${index + 1}`}
// 										className="shipping__list_label"
// 									>
// 										{item.courier_name}
// 										<span className="woocommerce-Price-amount amount">
// 											<bdi>
// 												<span className="woocommerce-Price-currencySymbol">RM</span>
// 												{item.price} MYR
// 											</bdi>
// 										</span>
// 									</label>
// 								</li>
// 							);
// 						})}
// 					</ul>
//             	) : (
//                 	<p>Enter your shipping address to view available shipping methods.</p>
//                 )}
// 			</div>
//         </div>
// 	)
// }

// export default ShippingOptions;

import React from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
const ShippingOptions = ({
    shippingDetail,
    selectedOption,
    t,
    handleOptionChange,
    currentLanguage,
    ChangeAddressSubmit,
    shippingChecked,
    digital,
}) => {
    console.log(shippingDetail);
    console.log(shippingChecked);
    return (
        <div className="shipping-details" id="shipping-options">
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="method-ses">{t("checkOut.Shipping_method")}</h2>

                {currentLanguage === "en_MY" && !digital && (
                    <>
                        {!shippingChecked ? (
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip id="tooltip-shipping">
                                        Update Shipping Providers (For Shipping
                                        Address)
                                    </Tooltip>
                                }
                            >
                                <button
                                    type="button"
                                    className="ship-refresh-btn mt-2"
                                    onClick={() =>
                                        ChangeAddressSubmit("shipping")
                                    }
                                >
                                    <FiRefreshCcw />
                                </button>
                            </OverlayTrigger>
                        ) : (
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip id="tooltip-billing">
                                        Update Shipping Providers (For Billing
                                        Address)
                                    </Tooltip>
                                }
                            >
                                <button
                                    type="button"
                                    className="ship-refresh-btn mt-2"
                                    onClick={() =>
                                        ChangeAddressSubmit("billing")
                                    }
                                >
                                    <FiRefreshCcw />
                                </button>
                            </OverlayTrigger>
                        )}
                    </>
                )}
            </div>
            <div className="stateShipping-method">
                {shippingDetail && shippingDetail.length ? (
                    <ul className="custom-shipping-methods">
                        {shippingDetail.map((item, index) => (
                            <li key={index} className="shipping__list_item">
                                <input
                                    type="radio"
                                    id={`option${index + 1}`}
                                    name="options"
                                    value={JSON.stringify(item)}
                                    checked={
                                        selectedOption?.courier_id ===
                                            item.courier_id &&
                                        selectedOption?.price === item.price
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
                                                RM
                                            </span>
                                            {item.price} MYR
                                        </bdi>
                                    </span>
                                </label>
                            </li>
                        ))}
                    </ul>
                ) : shippingDetail?.data && shippingDetail.data.length ? (
                    <ul className="custom-shipping-methods">
                        {shippingDetail.data.map((item, index) => (
                            <li key={index} className="shipping__list_item">
                                <input
                                    type="radio"
                                    id={`option${index + 1}`}
                                    name="options"
                                    value={JSON.stringify(item)}
                                    checked={
                                        selectedOption?.courier_id ===
                                            item.courier_id &&
                                        selectedOption?.total_charge ===
                                            item.total_charge
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
                        ))}
                    </ul>
                ) : (
                    <p>
                        Enter your shipping address to view available shipping
                        methods.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ShippingOptions;
