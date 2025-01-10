import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ApiHook from './CustomHooks/ApiHook';
import { enquiry } from '../Api';
import { useTranslation } from "react-i18next";

import FormUser from '../images/form user.webp';
import FormEmail from '../images/form email.webp';
import FormNumber from '../images/form number.webp';
import FormCountry from '../images/form country.webp'
import LoaderIco from '../images/button-loader.svg'

const ContactComponent = (props) => {
	const {
		type = 'contact-page', multiple = true, col = '12', col2 = '6', optionPosition = 'top', labels = true,
		newsletter = true, title = '', icons = false

	} = props;
	const navigate = useNavigate();
	const { register, handleSubmit, reset, formState: { errors } } = useForm();
	const [currentLanguage, urlLanguage] = ApiHook();
	const { t } = useTranslation();
	const [files, setFiles] = useState([{ id: 0, file: null, filename: '' }]);
	const [checkBox, setCheckbox] = useState(true);
	const [loader, setLoader] = useState(false);

	const triggerSubmission = async (data) => {
		let formData = new FormData(),
		_files = [];

		for (var i = 0; i < files.length; i++) {
			if(files[i] && files[i].file) {
				formData.append('files[]', files[i].file);
			}
		}

		setLoader(true);
		var _lang = 'en';
		if(!currentLanguage.includes('en')) {
			var _arr = currentLanguage.split('_');
			_lang = _arr[1].toLowerCase();
		}
	    formData.append('name', data.name);
	    formData.append('email_address', data.email_address);
	    formData.append('phone_number', data.phone_number);
	    formData.append('contact_enquiry', data.contact_enquiry);
	    formData.append('country', data.country);
	    formData.append('description', data.description);
	    formData.append('lang', currentLanguage);
		formData.append('language',_lang);
	    formData.append('form_type', type);
	    formData.append('subscribe', (typeof data.subscribe != '	undefined') ? 'yes' : 'no');
	    formData.append('file', '');
		// debugger
	    await enquiry(formData, false);
	    setLoader(false);
	    navigate(`${urlLanguage}/thank-you`)
	    //reset();
	    setFiles([{ id: 0, file: null, filename: '' }]);
	}

	const handleFileChange = (index, event) => {
	    const newFiles = [...files];
	    const file = event.target.files[0];
    	newFiles[index] = { id: newFiles[index].id, file: file, filename: file ? file.name : '' };
    	setFiles(newFiles);
	}

	const addFileField = () => {
	    const newId = files.length;
	    setFiles([...files, { id: newId, file: null }]);
	}

	const removeFileField = (id) => {
	    setFiles(files.filter((file) => file.id !== id));
	}

	const AppendField = ({ index = 0, file }) => {
		return (
			<Fragment>
				<input size="40"
					className="form-control"
					accept=".jpg,.jpeg,.png"
					aria-invalid="false"
					type="file"
					name="file"
					onChange={(e) => handleFileChange(index, e)}
				/>

				<div className="custom-file-field form-control">
					<span className="box">{ t("form.chooseImage") }</span>
					<p>{(file.filename) ? file.filename : t("form.noImage") }</p>
				</div>
			</Fragment>
		)
	}

	return (
		<Fragment>
			<form onSubmit={handleSubmit(triggerSubmission)} className='consultation_form'>
				{title && <h6>{ title }</h6> }

				{(optionPosition == 'top') ? (
					<Fragment>
						<select
							id="select"
							defaultValue=""
							{...register("contact_enquiry", { required: true })}
						>
							<option value="" disabled>{t("form.Select Option")}</option>
		                    <option value="General Enquiry">{t("form.General Enquiry")}</option>
		                    <option value="Scoliosis Program Enquiry">{t("form.Scoliosis Program Enquiry")}</option>
		                    <option value="Existing Patient Enquiry">{t("form.Existing Patient Enquiry")}</option>
		                    <option value="Media Enquiry">{t("form.Media Enquiry")}</option>
		                    <option value="Others">{t("form.Others")}</option>
						</select>

						{errors.contact_enquiry && <p className='validations'>{t("form.Please select your enquiry")}</p>}
					</Fragment>
				) : null}

				<div className="form-design">
					<div className="row">
						<div className={`col-md-${col}`}>
							{(labels) && <label htmlFor="inputCity" className="form-label">{t("form.Name")}</label> }
							<input
								type="text"
								className="form-control"
								placeholder={t("form.Name")}
								{...register("name", { required: true })}
							/>
							{icons && <span className="icon-form-home"><img src={FormUser} alt='form-user' /></span>}

							{errors.name && <p className='validations'>{t("form.Please enter your name")}</p>}
						</div>

						<div className={`col-md-${col}`}>
							{(labels) && <label htmlFor="inputEmail4" className="form-label">{t("form.Email")}</label> }
							<input
							    type="email"
							    placeholder={t("form.Email")}
							    className="form-control"
							    {...register("email_address", {
							        required: true,
							        pattern: {
							            value: /\S+@\S+\.\S+/,
							        },
							    })}
							/>
							{icons && <span className="icon-form-home"><img src={FormEmail} alt='form-email' /></span>}

							{(errors.email_address && errors.email_address.type == "required") &&
								<p className='validations'>{t("form.Please enter your email")}</p>
							}
							{(errors.email_address && errors.email_address.type == "pattern") &&
								<p className='validations'>{t("form.error.emailType")}</p>
							}
						</div>

						<div className={`col-md-${col2}`}>
							{(labels) && <label htmlFor="inputEmail4" className="form-phone">{t("form.Contact Number")}</label> }
							<input
							    type="tel"
							    placeholder={t("form.Contact Number")}
							    className="form-control"
							    {...register("phone_number", {
							        required: true,
							        pattern: {
							            value: /^\+?[0-9\s-]*$/,
							        },
							        minLength: { value: 8 },
							    })}
							/>
							{icons && <span className="icon-form-home"><img src={FormNumber} alt='form-number' /></span>}

							{(errors.phone_number && errors.phone_number.type == "required") &&
								<p className='validations'>{t("form.Please enter your phone number")}</p>
							}
							{(errors.phone_number && errors.phone_number.type == "pattern") &&
								<p className='validations'>{t("form.error.phoneType")}</p>
							}
							{(errors.phone_number && errors.phone_number.type == "minLength") &&
								<p className='validations'>{t("form.error.phoneMinLength")}</p>
							}
						</div>

						<div className={`col-md-${col2}`}>
							{(labels) && <label htmlFor="inputCity" className="form-label">{t("form.Country")}</label> }
							<input
								type="text"
								className="form-control" 
								placeholder={t("form.Country")}
								{...register("country", { required: true })}
							/>
							{icons && <span className="icon-form-home"><img src={FormCountry} alt='form-country' /></span>}

							{errors.country && <p className='validations'>{t("form.Please enter your country")}</p>}
						</div>

						{(optionPosition != 'top') ? (
							<div className="col-md-12">
								{(labels) && <label htmlFor="inputCity" className="form-label">{t("form.Select Option")}</label> }
								<select className="form-control" defaultValue="" {...register("contact_enquiry", { required: true })}>
									<option value="" disabled>{t("form.Select Option")}</option>
				                    <option value="General Enquiry">{t("form.General Enquiry")}</option>
				                    <option value="Scoliosis Program Enquiry">{t("form.Scoliosis Program Enquiry")}</option>
				                    <option value="Existing Patient Enquiry">{t("form.Existing Patient Enquiry")}</option>
				                    <option value="Media Enquiry">{t("form.Media Enquiry")}</option>
				                    <option value="Others">{t("form.Others")}</option>
								</select>

								{errors.contact_enquiry && <p className='validations'>{t("form.Please select your enquiry")}</p>}
							</div>
						) : null}


						<div className="col-md-12">
							{(labels) && <label htmlFor="inputCity" className="form-label">{t("form.Your Message")}</label> }
							<textarea
								type="text"
								className="form-control"
								id="description"
								name="description"
								{...register("description")}
								placeholder={t("form.Your Message")}
								defaultValue=""
							></textarea>
						</div>

						<div className="col-md-12 file-options">
							<p className='form-label'>
								{t("form.fileType")} 
								<em style={{ color: '#626262' }}>(jpg/jpeg/png {t("form.size")})</em><br />
							</p>

							{(multiple) ? (
								<Fragment>
									{files.map((file, index) => (
										<div className="extra-files form-group" key={index}>
									        <AppendField key={file.id} index={index} file={file} />
									        {(file.id > 0) ? (
									        	<a href="javascript:void(0)" onClick={() => removeFileField(file.id)}>{t("form.close")}</a>
									        ) : null}
									    </div>
								    ))}

								    {(files.length < 5) ? (
										<a href="javascript:void(0)" onClick={addFileField}>{t("form.add_more")}</a>
									) : null}
								</Fragment>
							) : null}
						</div>

						{(newsletter) ? (
							<div className="col-md-12">
								<input
									type="checkbox"
									value="1"
									id="subscribe_check"
									checked={checkBox}
									{...register("subscribe", {
										onChange: (e) => { setCheckbox(!checkBox) }
									})}
								/>
								<label htmlFor="subscribe_check" className="form-label">{t("form.newsletter")}</label>
							</div>
						) : null}

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
					</div>
				</div>
			</form>
		</Fragment>
	)
}

export default ContactComponent;