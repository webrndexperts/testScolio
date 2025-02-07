import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { paypalLiveSecret, paypalLive, paypalApiUrl, paypalSandbox, paypalSandboxUrl, paypalSandboxSecret} from '../../providers/constants';
import { toast } from 'react-toastify';

const PaypalButton = (props) => {
	const { paypalRef, paypalPaymentApprove, totalPrice, t, currency = 'SGD', paypalPaymentFailed ,authData} = props;
	const isLoggedIn = () => authData && authData.id;

	const [isButtonDisabled, setIsButtonDisabled] = useState(!isLoggedIn());
	const [error, setError] = useState(false);

		
	useEffect(() => {
		setIsButtonDisabled(!isLoggedIn());
	}, [authData,authData?.id]);

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
	const handlePayPalClick = (data, actions) => {
        if (!isLoggedIn()) {
            toast.error(t("toast.validate.login"), {
                className: "full-red-alert",
                autoClose: 5000,
            });
			setError(!isLoggedIn());
            return actions.reject(); // Stop the PayPal flow
        }
		setError(!isLoggedIn());
        return actions.resolve(); // Proceed normally
    };

	return (
		<PayPalScriptProvider options={initialOptions}>
        	<PayPalButtons
            	ref={paypalRef}
				key={authData?.id}
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
				onClick={handlePayPalClick}
				disabled={isButtonDisabled}
        	/>
			{error && (
				<div className="text-center">
					<p className="text-danger">{t("toast.validate.login")}</p>
				</div>
			)}
    	</PayPalScriptProvider>
	)
}

export default PaypalButton;