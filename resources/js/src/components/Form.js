import React, { useState } from 'react'
// import { useSelector } from 'react-redux';
// import { selectLanguage } from '../reducers/languageSlice';
import { useForm } from 'react-hook-form';
import ApiHook from './CustomHooks/ApiHook';
import { trimInputValues } from './Helper';
import { enquiry } from '../Api';
import { useTranslation } from 'react-i18next';
import { TbStarFilled } from "react-icons/tb";
import logo from '../images/logos.png';
import Carousel from 'better-react-carousel';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import FormUser from '../images/form user.webp';
import FormEmail from '../images/form email.webp';
import FormNumber from '../images/form number.webp';
import FormCountry from '../images/form country.webp';
import ReviewCarousalView from './ReviewCarousalView';
import ContactComponent from './ContactComponent';


export default function Form() {
    const { t } = useTranslation();
    const [currentLanguage] = ApiHook();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

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
    }

    return (
        <>
            <div className="patients-form" data-aos="fade-up">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="my-form home-form">
                                {/* main form */}

                                <ContactComponent
                                    col="6"
                                    optionPosition="other"
                                    type="home-page"
                                    title={t("form.GENERAL ENQUIRY")}
                                    labels={false}
                                    icons={true}
                                />

                            </div>
                            {/* form end */}
                        </div>
                        <div className="col-sm-7">
                            <div className="testimonial-heading" >
                                <h4>{t('Patients.praise')}</h4>
                            </div>
                            <div id="review" className={`row carousal-lang-${currentLanguage}`}>

                                <div className="col-md-4">
                                    <div className="review-logo">
                                        <div className="profile">
                                            <div className="review-img">
                                                <img src={logo} />
                                               
                                            </div>
                                            <div className="scolio-life">
                                                <strong>ScolioLife Scoliosis & Spine Correction Clinic</strong>
                                            </div>
                                        </div>
                                        <div className="reviews">
                                            <TbStarFilled />
                                            <TbStarFilled />
                                            <TbStarFilled />
                                            <TbStarFilled />
                                            <TbStarFilled />
                                        </div>
                                        <span>81 Google reviews</span>
                                        <a href="http://search.google.com/local/reviews?placeid=ChIJB-KtPZIZ2jERM1CXqUSnpc8" target='_blank'>Write a review</a>
                                    </div>
                                </div>

                                <div className="col-md-8">
                                    <section id="testimonials">
                                        <div className="testimonial-box-container">
                                            <ReviewCarousalView cols={2} rows={1} gap={10} loop />
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

