import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { paypalLiveSecret, paypalLive, paypalApiUrl, paypalSandbox, paypalSandboxUrl, paypalSandboxSecret} from '../../providers/constants';

const PaypalButton = (props) => {
	const { paypalRef, paypalPaymentApprove, totalPrice, t, currency = 'SGD', paypalPaymentFailed } = props;
	const apiUrl = paypalApiUrl;
	// const apiUrl = paypalSandboxUrl;
	
	const initialOptions = {
    	clientId: paypalLive,
    	// clientId: paypalSandbox,
    	currency,
    	intent: "capture",
	}

	// change amount once things gets better.
	// value: parseFloat(totalPrice).toFixed(2).

	const generateAccessToken = async () => { 
		let response =  await fetch(`${apiUrl}/v1/oauth2/token`, {
			method: 'POST',
			headers: {
			  	'Authorization': 'Basic ' + btoa(`${paypalLive}:${paypalLiveSecret}`)
			  	// 'Authorization': 'Basic ' + btoa(`${paypalSandbox}:${paypalSandboxSecret}`)
			},
			body: new URLSearchParams({
			  	'grant_type': 'client_credentials'
			})
		});

		let data = await response.json();

		return data
	}

	const capturePayment = async (orderID) => {
		const accessToken = await generateAccessToken();
		const url = `${apiUrl}/v2/checkout/orders/${orderID}/capture`;

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken?.access_token}`,
			},
		});
		const data = await response.json();
		return data;
	}

	const onApprovePayment = async (data, actions) => {
		var orderData = await capturePayment(data.orderID);
		paypalPaymentApprove(orderData)
	}

	return (
		<PayPalScriptProvider options={initialOptions}>
        	<PayPalButtons
            	ref={paypalRef}
            	style={{ layout: "horizontal", label: "pay", tagline: false, shape: 'pill' }}
            	createOrder={(data, actions) => {
					return actions.order.create({
						purchase_units: [{
							amount: {
								value: parseFloat(totalPrice).toFixed(2)
							}
						}]
					});
				}}
            	// onApprove={paypalPaymentApprove}
				onApprove={onApprovePayment}
            	onError={paypalPaymentFailed}
        	/>
    	</PayPalScriptProvider>
	)
}

export default PaypalButton;