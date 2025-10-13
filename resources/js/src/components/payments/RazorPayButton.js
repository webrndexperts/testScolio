import React, { useState, useEffect } from "react";
import { useRazorpay } from "react-razorpay";
import { getRazorPayOrder, verifyRazorPayPayment } from "../../Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { removeDirectBuyItem, replaceItem } from "../../reducers/cartSlice";
import { useDispatch } from "react-redux";

const RazorPayButton = ({
    amount,
    currency,
    user,
    onPaymentSuccess,
    onPaymentError,
    t,
    billingError,
    isFormValid,
    phone,
    cart,
    urlLanguage,
    cartType,
    digital
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const { error, Razorpay } = useRazorpay();
    const [isLoading, setisLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [errorState, setErrorState] = useState({
        login: false,
        amount: false,
        shipping: false,
        form: false,
    });

    const isLoggedIn = () => user && user.id;
    const dispatch = useDispatch();
    useEffect(() => {
        const checkEligibility = () => {
            const price = parseFloat(amount);
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
            const errors = {
                login: false,
                amount: false,
                shipping: false,
            };

            if (!isLoggedIn()) {
                errors.login = true;
                disable = true;
            }

            if (!isCouponCode && price < minimumAmount) {
                errors.amount = true;
                disable = true;
            }

            // if (!selectedCourier) {
            //     errors.shipping = true;
            //     disable = true;
            // }

            // Skip shipping validation if digital is true
            if (!digital && !selectedCourier) {
                errors.shipping = true;
                disable = true;
            }

            if (!isFormValid) {
                errors.form = true;
                disable = true;
            }
            setErrorState(errors);
            setIsButtonDisabled(disable);
        };

        checkEligibility();
    }, [
        user,
        amount,
        sessionStorage.getItem("discountCoupon"),
        localStorage.getItem("checkAddressSelect"),
        isFormValid,
        digital
    ]);

    const navigate = useNavigate();
    const handlePayment = async () => {
        if (isButtonDisabled) {
            if (errorState.login) toast.error(t("toast.validate.login"));
            if (errorState.amount) toast.error(t("minimum.amount"));
            if (errorState.shipping) toast.error(t("checkOut.select_shipping"));
            if (errorState.form) toast.error(t("checkOut.invalid form"));
            return;
        }

        setisLoading(true);
        const response = await getRazorPayOrder(amount, currency);

        if (!response || !response.order_id) {
            setisLoading(false);
            return;
        }

        const {
            order_id,
            razorpay_key,
            amount: resAmount,
            currency: resCurrency,
        } = response;

        // if (order_id) {
        //     localStorage.setItem("razropayOrderId", order_id);
        // }

        const options = {
            key: razorpay_key,
            amount: resAmount,
            currency: resCurrency,
            name: "ScolioLife™",
            description: `Payment for products: ${cart
                .map((item) => item.title)
                .join(", ")}`,
            order_id: order_id,
            handler: async function (response) {
                if (response.razorpay_payment_id) {
                    const res = await verifyRazorPayPayment(response);
                    if (res.success) {
                        localStorage.setItem("razropayOrderId", response.razorpay_payment_id);
                        onPaymentSuccess(response.razorpay_payment_id);

                        // if (cartType == "directCart") {
                        //     dispatch(removeDirectBuyItem());
                        // } else {
                        //     dispatch(replaceItem([]));
                        //     localStorage.removeItem("cart");
                        // }

                        // localStorage.removeItem("razorpayPay");
                        // sessionStorage.removeItem("discountCoupon");
                        // localStorage.removeItem("shippingData");
                        // localStorage.removeItem("checkAddressSelect");

                        // navigate(
                        //     `${urlLanguage}/order/complete/${res?.order_id}`,
                        //     { state: res?.order_id }
                        // );
                        // localStorage.removeItem("razropayOrderId");
                    } else {
                        onPaymentError("Payment verification failed !");
                    }
                }
            },
            prefill: {
                name: user?.name || "",
                email: user?.email || "",
                contact: Array.isArray(phone) ? phone[0] : String(phone || ""),
            },
            theme: {
                color: "#fba700",
            },
            modal: {
                escape: false,
                backdropclose: false,
                ondismiss: (err) => onPaymentError("Payment dismissed"),
            },
        };

        const rzp = new Razorpay(options);
        rzp.on("payment.failed", function (response) {
            console.log(response);
            onPaymentError(response.error.description);
        });
        rzp.open();

        setisLoading(false);
    };

    return (
        <div className="razorpay-button-container">
            <button
                className="razorpay-button d-flex align-items-center justify-content-center gap-2 fw-bold border-0 rounded-pill"
                style={{
                    backgroundColor:
                        isButtonDisabled || isLoading ? "#f5f5f5" : "#FFC439",
                    padding: "18px 28px",
                    fontSize: "1rem",
                    color: isButtonDisabled || isLoading ? "#999" : "#111",
                    transition: "opacity 0.3s ease-in-out",
                    cursor:
                        isButtonDisabled || isLoading
                            ? "not-allowed"
                            : "pointer",
                    opacity:
                        isHovered || isButtonDisabled || isLoading ? 0.85 : 1,
                    borderRadius: "50px",
                    width: "100%",
                }}
                onClick={handlePayment}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                disabled={isButtonDisabled || isLoading}
            >
                <span className="button-text-wrapper d-flex align-items-center">
                    <span className="pay-with-text">Pay with </span>
                    <span className="razorpay-text">
                        <span style={{ color: "#003087", fontWeight: 700 }}>
                            Razor
                        </span>
                        <span style={{ color: "#009cde", fontWeight: 700 }}>
                            Pay
                        </span>
                    </span>
                </span>
                {isLoading && (
                    <div
                        className="spinner-border spinner-border-sm ms-2"
                        role="status"
                    >
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )}
            </button>

            {error && (
                <div className="text-center mt-2">
                    <p className="text-danger">{error}</p>
                </div>
            )}
            {errorState.login && (
                <div className="text-center mt-2">
                    <p className="text-danger">{t("toast.validate.login")}</p>
                </div>
            )}
            {errorState.amount && (
                <div className="text-center mt-2">
                    <p className="text-danger">{t("minimum.amount")}</p>
                </div>
            )}
            {errorState.shipping && (
                <div className="text-center mt-2">
                    <p className="text-danger">
                        {t("checkOut.select_shipping")}
                    </p>
                </div>
            )}
            {errorState.form && (
                <div className="text-center mt-2">
                    <p className="text-danger">{t("checkOut.invalid form")}</p>
                </div>
            )}
        </div>
    );
};

export default RazorPayButton;
