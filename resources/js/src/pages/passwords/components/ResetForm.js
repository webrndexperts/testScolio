import React from 'react';
import LoaderIco from '../../../images/button-loader.svg'
import FormEmail from '../../../images/form email.webp';
import { Controller } from "react-hook-form";

const ResetForm = (props) => {
	const { handleSubmit, handleForgot, loader, register, errors, t, control, getValues } = props;

	return (
		<form onSubmit={handleSubmit(handleForgot)}>
			<div className={`col-md-12`}>
				<input
				    type="email"
				    placeholder={t("form.Email")}
				    readOnly
				    className="form-control"
				    {...register("email", {
				        required: true
				    })}
				/>

				{(errors.email && errors.email.type === "required") &&
					<p className='validations'>{t("form.Please enter your email")}</p>
				}
			</div>

			<div className={`col-md-12`}>
				<Controller
					name="password"
					defaultValue=""
					control={control}
					rules={{
						required: t('loginReg.Please enter your password.'),
					}}
					render={({ field }) =>
						<input
							{...field}
							type="password"
							className="form-control"
							placeholder={t("loginReg.Password")}
						/>
					}
				/>
				{errors.password && <p className='validations'>{errors.password.message}</p>}
			</div>

			<div className={`col-md-12`}>
				<Controller
					name="password_confirmation"
					defaultValue=""
					control={control}
					rules={{
						required: t('passwords.reset.confirm_required'),
						validate: (value) => value == getValues("password") || t('passwords.reset.not_match'),
					}}
					render={({ field }) =>
						<input
							{...field}
							type="password"
							className="form-control"
							placeholder={t("passwords.reset.confirm_password")}
						/>
					}
				/>
				{errors.password_confirmation && <p className='validations'>{errors.password_confirmation.message}</p>}
			</div>

			<div className="col-md-12 submit-btn contact-us"> 
				<button type="submit" className="btn btn-primary">
					<span>{t("form.Send")}</span>
					{(loader) ? (
						<div className="btn-loader">
							<img src={LoaderIco} alt="loader-button" />
						</div>
					) : null}
				</button>
			</div>
		</form>
	)
}

export default ResetForm;