import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import { ForgetForm, ThanksView } from './components';
import ApiHook from "../../components/CustomHooks/ApiHook";
import { forgotPassword } from '../../Api';
import TopBanner from '../../components/TopBanner';

const ForgotPassword = (props) => {
	const [loader, setLoader] = useState(false);
	const [showThanks, setShowThanks] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [status, setStatus] = useState(false);
	const { i18n, t } = useTranslation();
	const [currentLanguage] = ApiHook();
	const [email, setEmail] = useState('');

	const {
		register,
		handleSubmit,
		reset,
		getValues: getFormValues,
		formState: { errors },
	} = useForm();

  	const handleForgot = async (data) => {
  		setLoader(true);
  		setEmail(data['email']);
  		let response = await forgotPassword(data, currentLanguage);

  		setStatus(response.status);
  		setShowThanks(response.status);
    	if(!response.status) {
    		setErrorMsg(response.message);
    	} else {
    		setErrorMsg('');
    	}

	    setLoader(false);
	    reset();
  	}

  	let formProps = { handleSubmit, handleForgot, loader, register, errors, t };

	return (
		<div className="forgot-page">
			<TopBanner title={t("checkOut.Forgot Password")} />

			<div className="row">
				{(showThanks) ? (
					<ThanksView 
						message={ t("passwords.forgot.thanks_message").replace("{x}", email) }
                    />
				) : (
	          		<div className="col-sm-12 form-design">
						<h2>{t("checkOut.Forgot Password")}</h2>
						<p> {t("checkOut.send email")}</p>
	          			{(errorMsg) ? (
		          			<div class="alert alert-danger" role="alert">
							  	{t(errorMsg)}
							</div>
						) : null}

						<ForgetForm {...formProps} />
					</div>
				)}
			</div>
		</div>
		
	)
}


export default ForgotPassword;