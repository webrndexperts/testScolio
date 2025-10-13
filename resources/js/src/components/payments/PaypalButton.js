import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
    paypalLiveSecret,
    paypalLive,
    paypalApiUrl,
    paypalSandbox,
    paypalSandboxUrl,
    paypalSandboxSecret,
} from "../../providers/constants";
import { toast } from "react-toastify";

const PaypalButton = (props) => {
    const {
        paypalRef,
        paypalPaymentApprove,
        totalPrice,
        t,
        currency = "SGD",
        paypalPaymentFailed,
        authData,isFormValid
    } = props;
    const isLoggedIn = () => authData && authData.id;

    const [isButtonDisabled, setIsButtonDisabled] = useState(!isLoggedIn());
    const [error, setError] = useState(false);
    const [ammountError, setammountError] = useState(false);
    const [shipError, setShipError] = useState(false);
    const [formError, setFormError] = useState(false);

    useEffect(() => {
        const checkEligibility = () => {
            const price = parseFloat(totalPrice);
            const minimumAmount = parseFloat(
                process.env.REACT_APP_MININUM_AMOUNT
            );
            const isCouponCode = JSON.parse(
                sessionStorage.getItem("discountCoupon")
            );
            const selectedCourier = JSON.parse(
                localStorage.getItem("checkAddressSelect")
            );

            let disable = false;

            if (!isLoggedIn()) {
                setError(true);
                disable = true;
            } else {
                setError(false);
            }

            if (!isCouponCode && price < minimumAmount) {
                setammountError(true);
                disable = true;
            } else {
                setammountError(false);
            }

            if (!selectedCourier) {
                setShipError(true);
                disable = true;
            } else {
                setShipError(false);
            }

            if (!isFormValid) {
                setFormError(true);
                disable = true;
            }

            setIsButtonDisabled(disable);
        };

        checkEligibility();
    }, [
        authData,
        totalPrice,
        sessionStorage.getItem("discountCoupon"),
        localStorage.getItem("checkAddressSelect"),
        isFormValid
    ]);

    const apiUrl = paypalApiUrl;
    // const apiUrl = paypalSandboxUrl;

    const initialOptions = {
        clientId: paypalLive,
        // clientId: paypalSandbox,
        currency,
        intent: "capture",
    };

    // change amount once things gets better.
    // value: parseFloat(totalPrice).toFixed(2).

    const generateAccessToken = async () => {
        let response = await fetch(`${apiUrl}/v1/oauth2/token`, {
            method: "POST",
            headers: {
                Authorization:
                    "Basic " + btoa(`${paypalLive}:${paypalLiveSecret}`),
                // 'Authorization': 'Basic ' + btoa(`${paypalSandbox}:${paypalSandboxSecret}`)
            },
            body: new URLSearchParams({
                grant_type: "client_credentials",
            }),
        });

        let data = await response.json();

        return data;
    };

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
    };

    const onApprovePayment = async (data, actions) => {
        var orderData = await capturePayment(data.orderID);
        paypalPaymentApprove(orderData);
    };
    const handlePayPalClick = (data, actions) => {
        if (!isLoggedIn()) {
            toast.error(t("toast.validate.login"), {
                className: "full-red-alert",
                autoClose: 5000,
            });
            setError(!isLoggedIn());
            return actions.reject(); // Stop the PayPal flow
        }
        const minimumAmount = parseFloat(process.env.REACT_APP_MININUM_AMOUNT);
        const price = parseFloat(totalPrice);
        const isCouponCode = JSON.parse(
            sessionStorage.getItem("discountCoupon")
        );

        if (!isCouponCode && price < minimumAmount) {
            toast.error(t("minimum.amount"), {
                className: "full-red-alert",
                autoClose: 5000,
            });
            setammountError(true);
            return actions.reject(); // Stop the PayPal flow
        }
        const selectedCourirer = JSON.parse(
            localStorage.getItem("checkAddressSelect")
        );

        if (!selectedCourirer) {
            toast.error(t("checkOut.select_shipping"), {
                className: "full-red-alert",
                autoClose: 5000,
            });
            setShipError(true);
            return actions.reject();
        }

        if (!isFormValid) {
            toast.error(t("checkOut.invalid form"), {
                className: "full-red-alert",
                autoClose: 5000,
            });
             setFormError(true);
            return actions.reject();
        }
        setError(!isLoggedIn());
        return actions.resolve();
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
                ref={paypalRef}
                key={authData?.id}
                style={{
                    layout: "horizontal",
                    label: "pay",
                    tagline: false,
                    shape: "pill",
                }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: parseFloat(totalPrice).toFixed(2),
                                },
                            },
                        ],
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
            {ammountError && (
                <div className="text-center">
                    <p className="text-danger">{t("minimum.amount")}</p>
                </div>
            )}
            {shipError && (
                <div className="text-center">
                    <p className="text-danger">
                        {t("checkOut.select_shipping")}
                    </p>
                </div>
            )}
            {formError && (
                <div className="text-center">
                    <p className="text-danger">
                        {t("checkOut.invalid form")}
                    </p>
                </div>
            )}
        </PayPalScriptProvider>
    );
};

export default PaypalButton;
