import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { StripeCardFields } from '../payments'
import PayPal from '../../images/PayPal.png'
import payment_me from '../../images/payment_me.png'
import papal from '../../images/papal.svg'
import visa from '../../images/visa.svg'
import discover from '../../images/discover.svg'
import mastercard from '../../images/mastercard.svg'
import amex from '../../images/amex.svg'
import ReCAPTCHA from 'react-google-recaptcha';

const PaymentsListView = (props) => {
	const { setPaymentType, stripeProps, t ,onCaptchaChange} = props;
	return (
		<div className="Credit_Card">
			<div className="row">
				<div className="col-lg-12">
					<div className="accordion" id="accordionPayment">

						<div className="accordion-item mb-3">
							<h2 className="h5 px-4 py-3 accordion-header d-flex justify-content-between align-items-center">
								<div className="form-check collapsed" data-bs-toggle="collapse" data-bs-target="#collapseCC" aria-expanded="false" onClick={() => setPaymentType('stripe')}>
									<input className="form-check-input" type="radio" name="payment" id="payment1" />
									<label className="form-check-label pt-1" for="payment1">
										{t('payments.stripe')}
									</label>
								</div>
								<span className="card_img">
									<img src={visa} alt="" />
									<img src={discover} alt="" />
									<img src={mastercard} alt="" />
									<img src={amex} alt="" />
								</span>
							</h2>

							<div id="collapseCC" className="accordion-collapse collapse show" data-bs-parent="#accordionPayment" >
								<div className="accordion-body">
									<StripeCardFields {...stripeProps} />
									<ReCAPTCHA
									sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY} // Replace with your reCAPTCHA Enterprise site key
									onChange={onCaptchaChange}
                  					/>
								</div>
							</div>
						</div>

						
							<div className="accordion-item mb-3 border pp">
							<h2 className="h5 px-4 py-3 accordion-header d-flex justify-content-between align-items-center">
								<div className="form-check w-100 collapsed" data-bs-toggle="collapse" data-bs-target="#collapsePP" aria-expanded="false" onClick={() => setPaymentType('paypal')}>
									<input className="form-check-input" type="radio" name="payment" id="payment2" />
									<label className="form-check-label pt-1" for="payment2">
										{t('payments.paypal')}
									</label>
								</div>
								<span>
									<img src={papal} alt="" />
								</span>
							</h2>

							<div id="collapsePP" className="accordion-collapse collapse" data-bs-parent="#accordionPayment" >
								<div className="accordion-body">
									<div className="px-12 col-lg-12 mb-12">
										<p>{t('payments.paypalText')}</p>
									</div>
								</div>
							</div>
						</div> 
					</div>
				</div>
			</div>
		</div>
	)
}

export default PaymentsListView;