import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDynamicLanguage } from "../i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import MainNavbar from "./MainNavbar";
import { useForm } from "react-hook-form";
import { subscribeEmail } from "../Api";
import ApiHook from "./CustomHooks/ApiHook";
import { scrollToTop } from "./Helper";

import { AiOutlinePhone } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { GoMail } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";
import { appointmentCalander } from "../providers/constants";
import { useSelector } from "react-redux";
import { selectLanguage,selectUrlLanguage } from "../reducers/languageSlice";

export default function MainHeader() {
  const [ urlLanguage] = ApiHook();
  const { t } = useTranslation();
  const { contactData } = useSelector((state) => state.cart);
  const [scolioContact, setscolioContact] = useState(null);
    const currentLanguage = useSelector(selectLanguage);
    const currentUrlLanguage = useSelector(selectUrlLanguage);
  useEffect(() => {
    if (contactData && contactData.id) {
      setscolioContact(contactData);
    }
  }, [contactData]);
  useDynamicLanguage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const subscribe = async (data) => {
    try {
      const subscribedData = await subscribeEmail(data);
      reset();
    } catch (error) {
      console.log("errror", error);
    }
  };

  const formatWhatsAppNumber = (number) => {
    return number?.replace(/[\+\(\)\s]/g, '');
  };
  return (
    <>
      {/* top header start here*/}
      {/* <AiOutlinePhone/> */}
      {/* <CiMail/> */}
      {/* <CiLocationOn/> */}
      {/* <MdOutlineMail/> */}
      {/* <GoMail/> */}

      <div className="top-header">
        <div className="container">
          <div className="row">
            <div className="col-sm-7">
              <p>{t("top-header.para")}</p>
            </div>
            <div className="col-sm-5">
              <section className="news-letter" id="News-letter">
                <div className="news ">
                  <form
                    className="top-button"
                    onSubmit={handleSubmit(subscribe)}
                  >
                    <input
                      type="email"
                      id="subsrcibe_email"
                      {...register("subsrcibe_email", {
                        required: "Please enter your email.",
                      })}
                      maxLength="50"
                      required
                      placeholder={t("top-header.Your email here....")}
                    />
                    {/* {errors.subsrcibe_email && <p>Email is required.</p>} */}
                    <button type="submit" className="bt">
                      {t("top-header.Subscribe")}
                    </button>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      {/* top header end here*/}

      {/* middle header start here */}
      <div className="middle-header">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 left_data">
              <div className="header-details">
                <div className="header-number-wrapper cll">
                  <div className="mobile-icon">
                    <FaWhatsapp />
                  </div>

                  <a
                    target="_blank"
                    href={`https://api.whatsapp.com/send/?phone=${formatWhatsAppNumber(scolioContact?.whatsapp_number)}&text=Hello%21%0A%0A%2AFOR+NEW+PATIENT%2A%0AName%3A%0ARelation+%28if+inquirer+is+not+patient%29%3A%0A%0A%2AENQUIRY%3A%2A%0A&type=phone_number&app_absent=0`}
                    // href={`https://wa.me/${formatWhatsAppNumber(scolioContact?.whatsapp_number)}`}
                  >
                    {scolioContact?.whatsapp_number}
                  </a>
                </div>

                <div className="header-number-wrapper">
                  {/* <AiOutlinePhone/> */}
                  <div className="mobile-icon">
                    {/* <img src='/assets/images/phone icon.webp' alt="" /> */}
                    <AiOutlinePhone />
                  </div>

                  <a href={`tel:${scolioContact?.phone_number.split(",")[0]}`}>
                    {scolioContact?.phone_number.split(",")[0]}
                  </a>
                </div>
                <div className="header-email-wrapper">
                  <div className="email-icon">
                    {/* <img src='/assets/images/email icon.webp' alt="" /> */}
                    <CiMail />
                  </div>

                  <a href={`mailto:${scolioContact?.email}`}>
                    {scolioContact?.email}
                  </a>
                </div>
                <div className="header-location-wrapper">
                  <div className="location-icon">
                    {/* <img src='/assets/images/location icon.webp' alt="" /> */}
                    <CiLocationOn />
                  </div>
                  <a
                    href={(scolioContact?.address_href) ? scolioContact?.address_href : '#'}
                    target="_blank"
                    rel="noopener"
                  dangerouslySetInnerHTML={{ __html: scolioContact?.address.replace(/<[^>]*>/g, '') }}
                  />
                   
                  
                  {/*<a
                    href="https://www.google.com/maps/place/Scoliosis+%26+Spine+Correction+Clinic,+Health+in+Your+Hands,+Dr.+Kevin+Lau/@1.3040545,103.8326609,17z/data=!3m1!4b1!4m5!3m4!1s0x31da19923dade207:0xcfa5a744a9975033!8m2!3d1.3040491!4d103.8348496"
                    target="_blank"
                    rel="noopener"
                  >
                    302 Orchard Road #10-02, Singapore 238862
                  </a>*/}
                  {/* <a href="tel:(+65) 6635 2550">302 Orchard Road #10-02A, Singapore 23886</a> */}
                </div>
              </div>
            </div>
            <div className="col-sm-6 right_data">
              <div className="right-btn-wrapper">
                <div className="book_consultation">
                  <Link rel="noopener noreferrer" to={"/online-booking"}>
                    <span>
                      <img
                        src="/assets/images/consultation-icon.webp"
                        alt="consultation-icon"
                      />
                    </span>
                    {t("top-header.Book Consultation")}
                  </Link>
                </div>
                <div className="js">
                  <div
                    className="language-picker js-language-picker"
                    data-trigger-classname="btn btn--subtle"
                  >
                    <LanguageSwitcher key={currentLanguage}/>
                  </div>
                </div>
                <Link
                  to={`${currentUrlLanguage}/shop`}
                  className="shop-btn"
                  onClick={scrollToTop}
                >
                  <span>
                    <img src="/assets/images/shop icon.webp" alt="shop icon" />
                  </span>
                  {t("top-header.Shop")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MainNavbar />
    </>
  );
}
