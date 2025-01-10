import React from 'react';
import LoaderIco from '../../../images/button-loader.svg'
import FormEmail from '../../../images/form email.webp';

const ForgetForm = (props) => {
	const { handleSubmit, handleForgot, loader, register, errors, t } = props;

	return (
		<form onSubmit={handleSubmit(handleForgot)}>
			<div className={`col-md-12`}>
				{/* <label className="form-label">{t("form.Email")}</label> */}
				<input
				    type="email"
				    placeholder={t("form.Email")}
				    className="form-control"
				    {...register("email", {
				        required: true,
				        pattern: {
				            value: /\S+@\S+\.\S+/,
				        },
				    })}
				/>
				<span className="icon-form-home">
					<img src={FormEmail} alt={FormEmail} />
				</span>

				{(errors.email && errors.email.type === "required") &&
					<p className='validations'>{t("form.Please enter your email")}</p>
				}
				{(errors.email && errors.email.type === "pattern") &&
					<p className='validations'>{t("form.error.emailType")}</p>
				}
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

export default ForgetForm;