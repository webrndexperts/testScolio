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
import { trimInputValues } from "../components/Helper";
import ContactComponent from "../components/ContactComponent";

export default function FranForm() {
  const { t } = useTranslation();
  const [currentLanguage] = ApiHook();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  

  const getVideo = () => {
    var _image = 'https://www.youtube.com/embed/bRZVY5HLhv0?feature=share';

    switch (currentLanguage) {
      case 'fr_FR':
        _image = 'https://youtube.com/embed/fTqZb6uVn0M?feature=share';
        break;
      case 'id_ID':
        _image = 'https://youtube.com/embed/oQ9q0SGC_JE?feature=share';
        break;
      case 'id_IT':
        _image = 'https://youtube.com/embed/r7LixU5aiYM?feature=share';
        break;
      case 'es_ES':
        _image = 'https://youtube.com/embed/3ttDWFBhOWg?feature=share';
        break;
      case 'de_DE':
        _image = 'https://youtube.com/embed/FtYODrahgMc?feature=share';
        break;
      case 'zh_HK':
        _image = 'https://youtube.com/embed/E6JowAF8bc0?feature=share';
        break;
      case 'zh_CN':
        _image = 'https://youtube.com/embed/R17ifqGWtCI?feature=share';
        break;
      case 'ja_JP':
        _image = 'https://youtube.com/embed/_W5WOhQS8Sg?feature=share';
        break;
      default:
        _image = 'https://www.youtube.com/embed/bRZVY5HLhv0?feature=share';
        break;
    }

    console.log(currentLanguage, _image)

    return _image;
}




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
    <div className="contact-form1">
      <div className="container ">
      <div className="row">
        <div className="col-sm-7">
          <div className="my-form">
            {/* main form */}

              <ContactComponent
                title={t("Contact")}
                col="6"
                labels={false}
                type="General Enquiry Home"
                optionPosition="other"
              />

          </div>
        </div>
        <div className="col-sm-5">
        <div className="videos">
        <iframe width="390" height="700" src={getVideo()} title="Achieve a Straighter, Healthier Back with Dr. Kevin Lau | ScolioLife" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          </div>
      </div>
    </div>
    </div>
  );
}
