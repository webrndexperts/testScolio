import React, { useState } from 'react'
// import { useSelector } from 'react-redux';
// import { selectLanguage } from '../reducers/languageSlice';
import { useForm } from 'react-hook-form';
import ApiHook from './CustomHooks/ApiHook';
import { trimInputValues } from './Helper';
import { enquiry } from '../Api';
import { useTranslation } from 'react-i18next';
import { TbStarFilled } from "react-icons/tb";
import logo from '../images/logo.png';
import Carousel from 'better-react-carousel';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import FormUser from '../images/form user.webp';
import FormEmail from '../images/form email.webp';
import FormNumber from '../images/form number.webp';
import FormCountry from '../images/form country.webp';


export default function Form() {
    const { t } = useTranslation();
    const [currentLanguage] = ApiHook();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const generalEnquiry = (data) => {
        data["lang"] = currentLanguage;
        data["form_type"] = "General Enquiry Home";
        const tirmData = trimInputValues(data);
        enquiry(tirmData);
        reset();
    }

    return (
        <>
            <div className="patients-form">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="my-form">
                                {/* main form */}
                                <form onSubmit={handleSubmit(generalEnquiry)}>
                                    <input type="hidden" className="form-control" id="name" name="form_type" />
                                    <input type="hidden" className="form-control" id="name" name="lang" />
                                    <h6>{t("form.GENERAL ENQUIRY")}</h6>
                                    <div className="first-column">
                                        <div className="single-input">
                                            <input type="text" placeholder={t("form.Name")} id="name" name="name" {...register("name", { required: true })} />
                                            {errors.name && <p className='validation'>{t("form.Please enter your name")}</p>}
                                            <span><img src={FormUser} alt='form-user' /></span>
                                        </div>
                                        <div className="single-input">
                                            <input type="email" placeholder={t("form.Email")} id="email_address" name="email_address" {...register("email_address", { required: true })} />
                                            {errors.email_address && <p className='validation'>{t("form.Please enter your email")}</p>}
                                            <span><img src={FormEmail} alt='form-email1' /></span>
                                        </div>
                                    </div>
                                    <div className="first-column">
                                        <div className="single-input">
                                            <input type="number" placeholder={t("form.contactNumber")} id="phone_number" name="phone_number" {...register("phone_number", { required: true })} />
                                            {errors.phone_number && <p className='validation'>{t("form.Please enter your phone number")}</p>}
                                            <span><img src={FormNumber} alt='Form-number' /></span>
                                        </div>
                                        <div className="single-input">
                                            <input type="text" placeholder={t("form.Country")} id="country" name="country" {...register("country", { required: true })} />
                                            {errors.country && <p className='validation'>{t("form.Please enter your country")}</p>}
                                            <span><img src={FormCountry} alt='form-country' /></span>
                                        </div>
                                    </div>
                                    <div className="single-input">
                                        <select name="contact_enquiry" defaultValue="" {...register("contact_enquiry", { required: true })}>
                                            <option value="" disabled>{t("form.Select Option")}</option>
                                            <option value="General Enquiry">{t("form.General Enquiry")}</option>
                                            <option value="Scoliosis Program Enquiry">{t("form.Scoliosis Program Enquiry")}</option>
                                            <option value="Existing Patient Enquiry">{t("form.Existing Patient Enquiry")}</option>
                                            <option value="Media Enquiry">{t("form.Media Enquiry")}</option>
                                            <option value="Others">{t("form.Others")}</option>
                                        </select>
                                        {errors.contact_enquiry && <p className='validation'>{t("form.Please select your enquiry")}</p>}
                                    </div>
                                    <div className="single-input textarea-box">
                                        <span><i className="fas fa-unlock"></i></span>
                                        <textarea className="form-control" placeholder={t("form.Your Message")} name="description" rows="3" id="comment" {...register("description")}></textarea>
                                    </div>
                                    <div className="input-group custom-file-button">
                                        <input type="file" className="form-control" id="inputGroupFile" {...register("file")} />
                                    </div>
                                    <div className="submit-btn">
                                        <input type="submit" value={t("form.Send")} />
                                    </div>
                                </form>
                            </div>
                            {/* form end */}
                        </div>
                        <div className="col-sm-7">
                            <div className="testimonial-heading">
                                <h4>Praise From Patients</h4>
                            </div>
                            <div className='row' id="review">

                                <div className="col-md-4">
                                    <div className="review-logo">
                                        <div className="profile">
                                            <div className="review-img">
                                                <img src={logo} />
                                                <p>ScolioLife</p>
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
                                            <Carousel >
                                                <Carousel.Item>
                                                    <div className='row'>
                                                        <div className='col-md-6'>
                                                            <div className="testimonial-box">
                                                                <div className="box-top">
                                                                    <div className="profile">
                                                                        <div className="profile-img">
                                                                            <img src="https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" />
                                                                        </div>
                                                                        <div className="name-user">
                                                                            <strong>William Chung</strong>
                                                                            <span>2023-06-16</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="reviews">
                                                                        <TbStarFilled />
                                                                        <TbStarFilled />
                                                                        <TbStarFilled />
                                                                        <TbStarFilled />
                                                                        <TbStarFilled />
                                                                    </div>
                                                                </div>
                                                                <div className="client-comment">
                                                                    <p>近期，我和12岁的女儿从槟城去到在新加坡的ScolioLife诊所进行了为期5天的强化训练。同时，我们也为女儿准备了脊柱侧弯支具。<a href="#">Read more</a></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-md-6'>
                                                            <div className="testimonial-box">
                                                                <div className="box-top">
                                                                    <div className="profile">
                                                                        <div className="profile-img">
                                                                            <img src="https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" />
                                                                        </div>
                                                                        <div className="name-user">
                                                                            <strong>William Chung</strong>
                                                                            <span>2023-06-16</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="reviews">
                                                                        <TbStarFilled />
                                                                        <TbStarFilled />
                                                                        <TbStarFilled />
                                                                        <TbStarFilled />
                                                                        <TbStarFilled />
                                                                    </div>
                                                                </div>
                                                                <div className="client-comment">
                                                                    <p>Dr Lau is friendly and able to answer to you needs,and most importantly they don't do hardcore hard selling their ...<a href="#">Read more</a></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Carousel.Item>
                                                <Carousel.Item>
                                                    <div className='row'>
                                                        <div className='col-md-6'>
                                                            <div className="testimonial-box">
                                                                <div className="box-top">
                                                                    <div className="profile">
                                                                        <div className="profile-img">
                                                                            <img src="https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" />
                                                                        </div>
                                                                        <div className="name-user">
                                                                            <strong>William Chung</strong>
                                                                            <span>2023-06-16</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="reviews">
                                                                        <TbStarFilled />
                                                                        <TbStarFilled />
                                                                        <TbStarFilled />
                                                                        <TbStarFilled />
                                                                        <TbStarFilled />
                                                                    </div>
                                                                </div>
                                                                <div className="client-comment">
                                                                    <p>近期，我和12岁的女儿从槟城去到在新加坡的ScolioLife诊所进行了为期5天的强化训练。同时，我们也为女儿准备了脊柱侧弯支具。<a href="#">Read more</a></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-md-6'>
                                                            <div className="testimonial-box">
                                                                <div className="box-top">
                                                                    <div className="profile">
                                                                        <div className="profile-img">
                                                                            <img src="https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" />
                                                                        </div>
                                                                        <div className="name-user">
                                                                            <strong>William Chung</strong>
                                                                            <span>2023-06-16</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="reviews">
                                                                        <TbStarFilled />
                                                                        <TbStarFilled />
                                                                        <TbStarFilled />
                                                                        <TbStarFilled />
                                                                        <TbStarFilled />
                                                                    </div>
                                                                </div>
                                                                <div className="client-comment">
                                                                    <p>Dr Lau is friendly and able to answer to you needs,and most importantly they don't do hardcore hard selling their ...<a href="#">Read more</a></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Carousel.Item>
                                                <Carousel.Item>
                                                    <div className='row'>
                                                        <div className='col-md-6'>
                                                            <div className="testimonial-box">
                                                                <div className="box-top">
                                                                    <div className="profile">
                                                                        <div className="profile-img">
                                                                            <img src="https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" />
                                                                        </div>
                                                                        <div className="name-user">
                                                                            <strong>William Chung</strong>
                                                                            <span>2023-06-16</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="reviews">
                                                                        <TbStarFilled />
                                                                        <TbStarFilled />
                                                                        <TbStarFilled />
                                                                        <TbStarFilled />
                                                                        <TbStarFilled />
                                                                    </div>
                                                                </div>
                                                                <div className="client-comment">
                                                                    <p>近期，我和12岁的女儿从槟城去到在新加坡的ScolioLife诊所进行了为期5天的强化训练。同时，我们也为女儿准备了脊柱侧弯支具。<a href="#">Read more</a></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-md-6'>
                                                            <div className="testimonial-box">
                                                                <div className="box-top">
                                                                    <div className="profile">
                                                                        <div className="profile-img">
                                                                            <img src="https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" />
                                                                        </div>
                                                                        <div className="name-user">
                                                                            <strong>William Chung</strong>
                                                                            <span>2023-06-16</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="reviews">
                                                                        <TbStarFilled />
                                                                        <TbStarFilled />
                                                                        <TbStarFilled />
                                                                        <TbStarFilled />
                                                                        <TbStarFilled />
                                                                    </div>
                                                                </div>
                                                                <div className="client-comment">
                                                                    <p>Dr Lau is friendly and able to answer to you needs,and most importantly they don't do hardcore hard selling their ...<a href="#">Read more</a></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Carousel.Item>
                                            </Carousel>
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
