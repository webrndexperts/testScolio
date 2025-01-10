import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { enquiry } from "../Api";
import { useTranslation } from "react-i18next";
import "react-awesome-slider/dist/styles.css";
import FormUser from "../images/form user.webp";
import FormEmail from "../images/form email.webp";
import FormNumber from "../images/form number.webp";
import FormCountry from "../images/form country.webp";
import ApiHook from "../components/CustomHooks/ApiHook";
import ContactComponent from "../components/ContactComponent";
import { trimInputValues } from "../components/Helper";
import { toast } from "react-toastify";

export default function AppoitmentForm() {
  const { t } = useTranslation();
  const [currentLanguage] = ApiHook();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const generalEnquiry = (data) => {
    let formData = new FormData();

    formData.append('name', data.name);
    formData.append('email_address', data.email_address);
    formData.append('phone_number', data.phone_number);
    formData.append('country', data.country);
    formData.append('contact_enquiry', data.contact_enquiry);
    formData.append('description', data.description);
    formData.append('lang', currentLanguage);
    formData.append('form_type', "General Enquiry Home");
    formData.append('file', (data.file && data.file.length) ? data.file[0] : '');

    enquiry(formData);
    reset();
  };

  return (
    <>
    <div className="franchising-form">
    <div className="container">
      <h2>
        <b>Online</b> Appointment Form
      </h2>
      <div className="row">
        <div className="col-sm-6">
          <img
            decoding="async"
            src="https://sladmin.scoliolife.com/uploads/2023/03/Backgrond-2.png"
          />
        </div>
        <div className="col-sm-6">
        
            <div className="form-landing-wrapper">
              <div className="my-form dfsdfsf">
                {/* main form */}

                <ContactComponent
                  type="General Enquiry Home"
                  labels={false}
                />

              </div>
            </div>
          </div>
        </div>
     </div>
     </div>
    </>
  );
}
