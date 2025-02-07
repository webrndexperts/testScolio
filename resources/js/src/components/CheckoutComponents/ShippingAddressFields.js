import React, { Fragment } from "react";
import Select from 'react-select';

const ShippingAddressFields = (props) => {
	let {
		billingForm, billingError, t, selectedShippingState, selectedShippingCountry, shippingCountries, shippingStates,
		onShippingCountryChange, onShippingStateChange
	} = props;

	return (
		<Fragment>
            <div className="input_form" id="shippingCountry">
            	<label>{t("checkOut.Country / Region")}</label>
	            <Select
					className="select-serchable checkout-country"
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

            <div className="input_form">
                <div className="row">
                    <div className="col-md-6">
                        <div className="input_box_cart">
                        	<label>{t("checkOut.First Name")} <span className="required_form">*</span></label>
                            <input
	                            type="text"
	                            id="shippingFirstName"
	                            placeholder={t("checkOut.First Name")}
	                            {...billingForm("shippingFirstName", { required: true })}
                            />

                            {billingError.shippingFirstName && (
								<p className="validations">
									{t("checkOut.Please enter your first name.")}
								</p>
							)}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input_box_cart">
                            <label>{t("checkOut.Last Name")} <span className="required_form">*</span></label>
                            <input
	                            type="text"
	                            id="shippingLastName"
	                            placeholder={t("checkOut.Last Name")}
	                            {...billingForm("shippingLastName", { required: true })}
                            />

                            {billingError.shippingLastName && (
								<p className="validations">
									{t("checkOut.Please enter your last name.")}
								</p>
							)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="input_box_cart">
                    	<label>{t("checkOut.Company Name")}</label>
                        <input
	                        type="text"
	                        placeholder={t("checkOut.Company Name")}
	                        {...billingForm("shippingCompany")}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="input_box_cart">
                    	<label>{t("checkOut.Street Address")} <span className="required_form">*</span></label>
                        <input
	                        type="text"
	                        id="shippingStreet"
	                        placeholder={t("checkOut.Street Address")}
	                        {...billingForm("shippingStreet", { required: true })}
                        />
                        {billingError.shippingStreet && (
							<p className="validations">
								{t("checkOut.Please enter your street address.")}
							</p>
						)}
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="input_box_cart">
                    	<label></label>
                        <input
	                        type="text"
	                        placeholder={t("checkOut.Apartment, suite, unit, etc. (optional)")}
	                        {...billingForm("shippingApartment")}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <div className="input_box_cart">
                    	<label>{t("checkOut.Town / City")} <span className="required_form">*</span></label>
                        <input
	                        type="text"
	                        id="shippingTown"
	                        placeholder={t("checkOut.Town / City")}
	                        {...billingForm("shippingTown", { required: true })}
                        />

                        {billingError.shippingTown && (
	                    	<p className="validations">
	                      		{t("checkOut.Please enter your town / city.")}
	                    	</p>
	                  	)}
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="input_box_cart" id="shippingState">
                    	<label>{t("CART12.State/Country")} <span className="required_form">*</span></label>
                        <Select
							className="select-serchable checkout-state"
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
                </div>
                <div className="col-md-4">
                    <div className="input_box_cart">
                    	<label>{t("checkOut.Postcode / ZIP")} <span className="required_form">*</span></label>
                        <input
	                        type="text"
	                        placeholder={t("checkOut.Postcode / ZIP")}
	                        className="form-control"
	                        id="shippingPostcode"
	                        {...billingForm("shippingPostcode", { required: true })}
                        />

                        {billingError.shippingPostcode && (
							<p className="validations">
								{t("checkOut.Please enter your postcode / ZIP.")}
							</p>
						)}
                    </div>
                </div>
            </div>

            <div className="input_form">
                <div className="row">
                    <div className="col-md-6">
                        <div className="input_box_cart">
                        	<label>{t("checkOut.Phone")} <span className="required_form">*</span></label>
                            <input
	                            type="number"
	                            id="shippingPhone"
	                            placeholder={t("checkOut.Phone")}
	                            {...billingForm("shippingPhone", {
	                            	required: true,
	                            	pattern: {
	                            		value: /^\+?[0-9\s-]*$/,
	                            	}
	                        	})}
                            />
							
							{(billingError.shippingPhone && billingError.shippingPhone.type == "required") && (
								<p className="validations">
									{t("form.Please enter your phone number")}
								</p>
							)}
							{(billingError.shippingPhone && billingError.shippingPhone.type == "pattern") &&
								<p className='validations'>{t("form.error.phoneType")}</p>
							}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input_box_cart">
                            <label>{t("checkOut.Email Address")} <span className="required_form">*</span></label>
                            <input
	                            type="email"
	                            id="shippingEmail"
	                            placeholder={t("checkOut.Email Address")}
	                            {...billingForm("shippingEmail", {
	                            	required: true,
	                            	pattern: {
							            value: /\S+@\S+\.\S+/,
							        },
	                            })}
                            />

							{(billingError.shippingEmail && billingError.shippingEmail.type == "required") && (
								<p className="validations">
									{t("checkOut.Please enter your email.")}
								</p>
							)}
							{(billingError.shippingEmail && billingError.shippingEmail.type == "pattern") &&
								<p className='validations'>{t("form.error.emailType")}</p>
							}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="input_box_cart">
                    	<label>{t("checkOut.Order Notes")} ({t("checkOut.Optional")})</label>
						<textarea
							className="form-control rounded border-white mb-3 form-text-area"
							rows="5"
							cols="30"
							placeholder={t("checkOut.Message")}
							{...billingForm("additionalInfo")}
						></textarea>
                    </div>
                </div>
            </div>
		</Fragment>
	)
}

export default ShippingAddressFields;