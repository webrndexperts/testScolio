import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom'

import { ResetForm, ThanksView } from './components';
import { checkForgetToken, resetPassword } from '../../Api';
import TopBanner from '../../components/TopBanner';

const ResetPassword = (props) => {
	const [loader, setLoader] = useState(false);
	const [showThanks, setShowThanks] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [status, setStatus] = useState(false);
	const { i18n, t } = useTranslation();
	const { token } = useParams();

	const {
		register,
		handleSubmit,
		reset,
		control,
		getValues,
		setValue: setResetValue,
		formState: { errors },
	} = useForm();

	const checkQueryParams = async () => {
		const params = new URLSearchParams(window.location.search);
	    const queryParamsObj = {};
	    for (const [key, value] of params.entries()) {
	      	queryParamsObj[key] = value;
	    }

	    if(queryParamsObj && queryParamsObj.email) {
	    	setResetValue('email', queryParamsObj.email);
	    	var data = await checkForgetToken(token, queryParamsObj.email);
	
			setStatus(data.status);
	    	if(!data.status) {
	    		setErrorMsg(data.message);
	    	} else {
	    		setErrorMsg('');
	    	}
	    }
	}

  	const handleForgot = async (data) => {
  		setLoader(true);
  		data['token'] = token;
  		let response = await resetPassword(data);

  		setStatus(response.status);
  		setShowThanks(response.status);
    	if(!response.status) {
    		setErrorMsg(response.message);
    	} else {
    		setErrorMsg('');
    	}
  		
	    setLoader(false);
  	}

  	useEffect(() => {
  		checkQueryParams();
  	}, [token])

	let resetProps = { handleSubmit, control, handleForgot, loader, register, getValues, errors, t };

	return (
		<div className="forgot-page">
			<TopBanner title={t("passwords.reset.title")} />

			<div className="row">
				{(showThanks) ? (
					<ThanksView 
						message={ t("passwords.reset.thanks_message") }
                    />
				) : (
	          		<div className="col-sm-12 form-design">
						<h2>{t("passwords.reset.title")}</h2>
	          			{(errorMsg) ? (
		          			<div class="alert alert-danger" role="alert">
							  	{t(errorMsg)}
							</div>
						) : null}

						{(status) ? (
							<ResetForm {...resetProps} />
						) : null}
					</div>
				)}
			</div>
		</div>
	)
}

export default ResetPassword;