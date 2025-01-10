import React, { Fragment } from 'react';
import Select from 'react-select';

const BillingAddressForm = (props) => {
	const {
		billingForm, billingError, t, selectedCountry, onCountryChange, countries, selectedState,
		onStateChange, states
	} = props;

	return (
		<Fragment>
            <div className="input_form" id="country">
            	<label>{t("checkOut.Country / Region")}</label>
	            <Select
					className="select-serchable checkout-country"
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

            <div className="input_form">
                <div className="row">
                    <div className="col-md-6">
                        <div className="input_box_cart">
                        	<label>{t("checkOut.First Name")} <span>*</span></label>
                            <input
	                            type="text"
	                            id="firstName"
	                            placeholder={t("checkOut.First Name")}
	                            {...billingForm("firstName", { required: true })}
                            />

                            {billingError.firstName && (
								<p className="validations">
									{t("checkOut.Please enter your first name.")}
								</p>
							)}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input_box_cart">
                            <label>{t("checkOut.Last Name")} <span>*</span></label>
                            <input
	                            type="text"
	                            id="lastName"
	                            placeholder={t("checkOut.Last Name")}
	                            {...billingForm("lastName", { required: true })}
                            />

                            {billingError.lastName && (
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
	                        {...billingForm("company")}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="input_box_cart">
                    	<label>{t("checkOut.Street Address")} <span>*</span></label>
                        <input
	                        type="text"
	                        id="street"
	                        placeholder={t("checkOut.Street Address")}
	                        {...billingForm("street", { required: true })}
                        />
                        {billingError.street && (
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
	                        placeholder="Apartment, suite, unit, etc. (optional)"
	                        {...billingForm("apartment")}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <div className="input_box_cart">
                    	<label>{t("checkOut.Town / City")} <span>*</span></label>
                        <input
	                        type="text"
	                        id="town"
	                        placeholder={t("checkOut.Town / City")}
	                        {...billingForm("town", { required: true })}
                        />

                        {billingError.town && (
	                    	<p className="validations">
	                      		{t("checkOut.Please enter your town / city.")}
	                    	</p>
	                  	)}
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="input_box_cart" id="state">
                    	<label>{t("CART12.State/Country")} <span>*</span></label>
                        <Select
							className="select-serchable checkout-state"
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
                </div>
                <div className="col-md-4">
                    <div className="input_box_cart">
                    	<label>{t("checkOut.Postcode / ZIP")} <span>*</span></label>
                        <input
	                        type="text"
	                        id="postcode"
	                        placeholder={t("checkOut.Postcode / ZIP")}
	                        className="form-control"
	                        {...billingForm("postcode", { required: true })}
                        />

                        {billingError.postcode && (
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
                        	<label>{t("checkOut.Phone")} <span>*</span></label>
                            <input
	                            type="number"
	                            id="phone"
	                            placeholder={t("checkOut.Phone")}
	                            {...billingForm("phone", {
	                            	required: true,
	                            	pattern: {
	                            		value: /^\+?[0-9\s-]*$/,
	                            	}
	                        	})}
                            />

                            {(billingError.phone && billingError.phone.type == "required") && (
								<p className="validations">
									{t("form.Please enter your phone number")}
								</p>
							)}
							{(billingError.phone && billingError.phone.type == "pattern") &&
								<p className='validations'>{t("form.error.phoneType")}</p>
							}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input_box_cart">
                            <label>{t("checkOut.Email Address")} <span>*</span></label>
                            <input
	                            type="email"
	                            id="email"
	                            placeholder={t("checkOut.Email Address")}
	                            {...billingForm("email", {
	                            	required: true,
	                            	pattern: {
							            value: /\S+@\S+\.\S+/,
							        },
	                            })}
                            />

                            {(billingError.email && billingError.email.type == "required") && (
								<p className="validations">
									{t("checkOut.Please enter your email.")}
								</p>
							)}
							{(billingError.email && billingError.email.type == "pattern") &&
								<p className='validations'>{t("form.error.emailType")}</p>
							}
                        </div>
                    </div>
                </div>
            </div>
		</Fragment>
	)
}

export default BillingAddressForm;