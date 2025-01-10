import React, { Fragment } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';

const StripeCardFields = (props) => {
	const { handleCardElementChange, stripeError, t } = props;

	return (
		<Fragment>
			{(stripeError && stripeError) ? <p className="validations">{ stripeError }</p> : null}
			<div className="mb-3" id="stripe-card-view">
				<label className="form-label">{t('payments.card')}</label>

				<div className="checkout-card-field">
					<CardNumberElement
						options={{
							style: {
								base: {
									fontSize: '16px',
									color: '#424770',
									'::placeholder': {
										color: '#aab7c4',
									},
								},
								invalid: {
									color: '#9e2146',
								},
							},
						}}
						onChange={handleCardElementChange}
					/>

				</div>
			</div>
			<div className="row">
				<div className="col-lg-6">
					<div className="mb-6">
						<label className="form-label">{t('payments.expiry')}</label>

						<div className="checkout-card-field">
							<CardExpiryElement
								options={{
									style: {
										base: {
											fontSize: '16px',
											color: '#424770',
											'::placeholder': {
												color: '#aab7c4',
											},
										},
										invalid: {
											color: '#9e2146',
										},
									},
								}}
							/>
						</div>
					</div>
				</div>
				<div className="col-lg-6">
					<div className="mb-6">
						<label className="form-label">{t('payments.cvv')}</label>

						<div className="checkout-card-field">
							<CardCvcElement
								options={{
									style: {
										base: {
											fontSize: '16px',
											color: '#424770',
											'::placeholder': {
												color: '#aab7c4',
											},
										},
										invalid: {
											color: '#9e2146',
										},
									},
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default StripeCardFields;