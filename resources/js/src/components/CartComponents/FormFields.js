import React from 'react';
import Select from 'react-select';

const FormFields = (props) => {
	const {
		handleValuesChange, handleFormSubmit, form, onCountryChangeChange, onStateChangeChange, setShippingPin, setShippingCity,
		searchcountries, states, formErrors, t, billingForm,
		selectedCountry, selectedState, shippingCity, shippingPin
	} = props;

	return (
		<form onSubmit={handleFormSubmit} ref={form}>
			<div
			// id="flush-collapseThree"
			// className="accordion-collapse collapse"
			// aria-labelledby="flush-headingThree"
			// data-bs-parent="#accordionFlushExample"
			>
				<Select
					className="select-serchable"
					classNamePrefix="select"
					value={selectedCountry}
					onChange={onCountryChangeChange}
					isSearchable={true}
					name="country_alpha2"
					options={searchcountries}
					getOptionLabel={option => option.name}
					getOptionValue={option => option.isoCode}
				/>

				{(formErrors && formErrors.country) && (
					<p className="validations">
						{t("checkOut.Please enter your country.")}
					</p>
				)}

				<Select
					className="select-serchable"
					classNamePrefix="select"
					value={selectedState}
					onChange={onStateChangeChange}
					isSearchable={true}
					name="state"
					options={states}
					getOptionLabel={option => option.name}
					getOptionValue={option => option.name}
				/>

				{(formErrors && formErrors.state) && (
					<p className="validations">
						{t("checkOut.Please select your state / county.")}
					</p>
				)}

				<input
					type="text"
					className="form-control input-text"
					value={shippingCity}
					placeholder={t("CART12.Town/City")}
					{...billingForm("city", {
						required: true,
						onChange: (e) => { handleValuesChange(e, setShippingCity, 'city') }
					})}
				/>

				{(formErrors && formErrors.city) && (
					<p className="validations">
						{t("checkOut.Please enter your town / city.")}
					</p>
				)}

				<input
					type="text"
					className="form-control input-text"
					value={shippingPin}
					placeholder={t("CART12.Postcode/ZIP")}
					{...billingForm("postal_code", {
						required: true,
						onChange: (e) => { handleValuesChange(e, setShippingPin, 'postal_code') }
					})}
				/>

				{(formErrors && formErrors.postal_code) && (
					<p className="validations">
						{t("checkOut.Please enter your postcode / ZIP.")}
					</p>
				)}

				<button type="submit" name="calc_shipping" value="1" className="button">
					{t("CART12.UPDATE")}
				</button>
			</div>
		</form>
	)
}

export default FormFields;