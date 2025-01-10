import React from 'react';

const ShippingOptions = (props) => {
	const { shippingDetail, selectedOption, t, handleOptionChange } = props;

	return (
		<div className='shippping-details' id="shipping-options">
            <h2 className='method-ses'>{t('checkOut.Shipping_method')}</h2>

            <div className='stateShipping-method'>
            	{(shippingDetail?.data && shippingDetail?.data.length) ? (
            		<ul className="custom-shipping-methods">
						{shippingDetail?.data?.map((item, index) => {
					
							return (
								<li className="shipping__list_item">
									<input
										type="radio"
										id={`option${index + 1}`}
										name="options"
										value={JSON.stringify(item)}
										checked={
											selectedOption?.courier_id === item.courier_id && selectedOption?.total_charge == item.total_charge
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
												<span className="woocommerce-Price-currencySymbol">$</span>
												{item.total_charge} {item.currency}
											</bdi>
										</span>
									</label>
								</li>
							);
						})}
					</ul>
            	) : (
                	<p>Enter your shipping address to view available shipping methods.</p>
                )}
			</div>
        </div>
	)
}

export default ShippingOptions;