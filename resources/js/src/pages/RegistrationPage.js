import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { trimInputValues } from "../components/Helper";
import { registration } from "../Api";
import { CiMail } from "react-icons/ci";
// import { FaEye } from "react-icons/fa";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { userLogin } from "../reducers/authSlice";
import { useNavigate } from "react-router-dom";
import TopBanner from '../components/TopBanner';
import ApiHook from "../components/CustomHooks/ApiHook";

let checkLoader = false;
const RegistrationPage = () => {
  const [currentLanguage, urlLanguage] = ApiHook();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const userRegistration = async (data) => {
    
    const trimData = trimInputValues(data);
    checkLoader= true
    trimData["role"] = "user";
    trimData["status"] = "active";
    var _lang = 'en';
		if(!currentLanguage.includes('en')) {
			var _arr = currentLanguage.split('_');
			_lang = _arr[1].toLowerCase();
		}
    trimData["lang"] = _lang;
    try {
      await registration(trimData).then((res) => {

        if (res.success == true) {
          dispatch(userLogin(res));
          checkLoader=false
          localStorage.setItem("isLogin", true);
          setIsLogin(true)
          localStorage.setItem("userData", JSON.stringify(res));
          navigate("/");
        }
      });
      reset();
    } catch (error) {
      checkLoader=false
      console.log("error", error);
    }
  };


  return (
    <>
    {checkLoader && (
        <div className="language_spinner">
          <div
            className="spinner-border text-warning language_spinner"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
          <span className="empty_layer"></span>
        </div>
      )}

      <TopBanner title={t("main-nav.MY ACCOUNT")} />
      
      <div className="register-page">
        <div className="row">
          <div className="col-sm-6">
            <div className="login-img">
              <img src="https://sladmin.scoliolife.com/uploads/2023/05/login-bg-600x587-1.webp" alt="" />
              <div className="side-btn">
                <Link to="/login" className={isLogin ? "register" : "login"}>
                  {t("loginReg.Log In")}
                </Link>
                <Link to="/register" className={isLogin ? "login" : "register"}>
                  {t("loginReg.Register")}
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="register-sec">
              <h3>{t("loginReg.Register")}</h3>
              <p>{t("loginReg.Register for an Account")}</p>
              <form onSubmit={handleSubmit(userRegistration)}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    {t("loginReg.Username")}
                    {/* {/ pattern:/^[a-zA-Z]+$/ /} */}
                  </label>
                  <div className="gmail-login">
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      {...register("name")}
                      // pattern: /^[a-zA-Z]+$/
                    />
                    <FaRegUserCircle />
                  </div>
                  {errors.name && (
                    <p className="validations">
                      {t("loginReg.Please enter your username")}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    {t("loginReg.Email")}
                  </label>
                  <div className="gmail-login">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      {...register("email", { required: true })}
                    />
                    <CiMail />
                  </div>
                  {errors.email && (
                    <p className="validations">
                      {t("loginReg.Please enter your email")}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    {t("loginReg.Password")}
                  </label>
                  <div className="gmail-login">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      name="password"
                      {...register("password", {
                        required: true,
                        // pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      })}
                    />
                    {showPassword ? (
                      <FaEyeSlash
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="eye-icon"
                      />
                    ) : (
                      <FaEye
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="eye-icon"
                      />
                    )}
                  </div>
                  {errors.password && (
                    <p className="validations">
                      {/* {/ Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character. /} */}
                      {t("loginReg.Please enter your password.")}
                    </p>
                  )}
                </div>
                <div className="mb-3 checkbox">
                  <input
                    type="checkbox"
                    id="subscribe"
                    name="subscribe"
                    {...register("subscribe", { required: true })}
                  ></input>
                  <p>
                    {t(
                      "loginReg.Subscribe to our newsletter to unlock the latest deals and access to high quality scoliosis articles."
                    )}
                  </p>
                  {errors.subscribe && (
                    <p className="validations">
                      {t("loginReg.This field is required")}
                    </p>
                  )}
                </div>
                {/* <div className="mb-3 checkbox">
                  <input
                    type="checkbox"
                    id="credentials "
                    name="credentials "
                    {...register("credentials ")}
                  ></input>
                  <p>{t("loginReg.Send these credentials via email.")}</p>
                </div> */}
                <button
                  type="submit"
                  className="log-btn"
                  name="wp-submit"
                  value="Register"
                >
                  {t("loginReg.Register")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
