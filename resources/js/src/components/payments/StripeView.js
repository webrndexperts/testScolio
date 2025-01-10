import React from 'react';
import { CardElement } from "@stripe/react-stripe-js";

const StripeView = (props) => {
	const { billingError, billingForm, handleCardElementChange } = props;

	return (
		<div className="stripe-view">
			<CardElement
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
						base: "card-number",
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
		</div>
	)
}

export default StripeView;