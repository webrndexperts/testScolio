import React from 'react'
import { Link } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";

const CheckoutLogin = (props) => {
	const { handleLogin, Loginuser, t, checkLogin, loginForm, loginError } = props;


	return (
		<Collapse in={checkLogin}>
			<div id="flush-collapseOne">
				<div className="accordion-body">
					{t(
					"checkOut.If you have shopped with us before, please enter yourdetails below. If you are a new customer, please proceed to the Billing section."
					)}
				</div>
				
				<form
					className="row g-3"
					onSubmit={handleLogin(Loginuser)}
				>
					<div className="col-md-6">
						<label for="inputEmail4" className="form-label">
							{t("checkOut.Username Or Email")} <span>*</span>
						</label>
						<input
							type="email"
							className="form-control"
							id="inputEmail4"
							{...loginForm("email", { required: true })}
						/>
						{loginError.email && (
							<p className="validations">
								{t("checkOut.Please enter your email.")}
							</p>
						)}
					</div>

					<div className="col-md-6">
						<label
							for="inputPassword4"
							className="form-label"
						>
							{t("checkOut.Password")} <span>*</span>
						</label>
						<input
							type="password"
							className="form-control"
							id="inputPassword4"
							{...loginForm("password", {
							required: true, // pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
							})}
						/>
						{loginError.password && (
							<p className="validations">
								{t("checkOut.Please enter your password.")}
							</p>
						)}
					</div>

					<label className="woocommerce-form__label woocommerce-form__label-for-checkbox woocommerce-form-login__rememberme">
						<input
							className="woocommerce-form__input woocommerce-form__input-checkbox"
							name="rememberme"
							type="checkbox"
							id="rememberme"
							value="forever"
						/>
						<span>{t("checkOut.Remember me")}</span>
					</label>
					
					<button
						type="submit"
						className="woocommerce-button button woocommerce-form-login__submit"
						name="login"
						value="Login"
					>
						{t("checkOut.Login")}
					</button>
				</form>

				<div className="register-div">
					<span>{t('loginReg.no-account')}</span>
					<Link to="/register" className="register">
						{t("loginReg.Register")}
					</Link>
				</div>

				<p className="lost_password">
					<Link to="/forgot">
						{t("checkOut.Lost your password?")}
					</Link>
				</p>
			</div>
		</Collapse>
	)
}

export default CheckoutLogin;