import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { trimInputValues } from '../components/Helper';
import { Link } from 'react-router-dom';
import { login } from '../Api';
import { CiMail } from "react-icons/ci";
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
// import ApiHook from '../components/CustomHooks/ApiHook';
import { userLogin } from '../reducers/authSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import TopBanner from '../components/TopBanner';
import { googleClientId as clientId } from '../providers/constants';

const LoginPage = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API = process.env.REACT_APP_API_URL;

  // const { authData, authLogin } = useSelector((state) => state.auth);
  // const [currentLanguage] = ApiHook();
  
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: 'email',
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  // const CartLoginStatus=useSelector((state)=>state)
  const userLoginForm = (data) => {
    const trimData = trimInputValues(data)
    login(trimData).then((data) => {
      if (data.success === true) {
        dispatch(userLogin(data))
          navigate(`/`)
      }
      // console.log("data++++",data);
    });
    reset();
  }

  const handleLoginSuccess = (response) => {
    // console.log("Login Success ", response);
    let googleLogin ={
      name:response?.profileObj.givenName+' '+response?.profileObj.familyName,
      email:response?.profileObj.email,
      role:"user",
      imageUrl:response?.profileObj.imageUrl,
      register_type:"google",
      googleId:response?.profileObj.googleId,
      status:'active'
    }
    // console.log("sdf========",googleLogin);
      axios.post(`${API}google_with_login`, googleLogin).then((res)=>{
       // console.log("sdf=GoogleLogData=======",res.data);
       if (res.data.success === true) {
        dispatch(userLogin(res.data))
        localStorage.setItem('isLogin',true);setIsLogin(true)
        localStorage.setItem('userData', JSON.stringify(res.data));
        navigate(`/`)
      }
      //  console.log("GoogleLogData=======",GoogleLogData);
    }).catch((error)=>{
      console.log("error=======",error);              
    });
  }

  const handleLoginFailure = error => {
    console.log("Login Failure ", error);
  }


  return (
    <>
      <TopBanner title={t("main-nav.MY ACCOUNT")} />
      
      <div className="login-page">
        <div className="row">
          <div className="col-sm-6">
            <div className="login-img">
              <img src="https://sladmin.scoliolife.com/uploads/2023/05/login-bg-600x587-1.webp" alt='https://sladmin.scoliolife.com/uploads/2023/05/login-bg-600x587-1.webp' />
              <div className="side-btn">
                <Link to="/login" className={isLogin ? "login" : "register"}>{t("loginReg.Log In")}</Link>
                <Link to="/register" className={isLogin ? "register" : "login"}>{t("loginReg.Register")}</Link>
              </div>
            </div>
          </div>

          <div className="col-sm-6">
            <div className="log-sec">
              <h3>{t("loginReg.Log In")}</h3>
              <p>{t("loginReg.Log in to continue in our website")}</p>
              <form onSubmit={handleSubmit(userLoginForm)}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">{t("loginReg.Username or Email")}</label>
                  <div className='gmail-login'>
                    <input type="text" className='form-control' id="email" name="usernameOrEmail"
                      {...register("email", { required: true })}
                    />
                    <CiMail />
                  </div>
                  {errors.email && <p className='validations'>{t("loginReg.Please enter your username or email.")}</p>}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">{t("loginReg.Password")}</label>
                  <div className='password-login'>
                    <input type={showPassword ? "text" : "password"} className='form-control' id="password" name="password"
                      {...register("password", {
                        required: true,
                      })}
                    />
                    {showPassword ?
                      <FaEyeSlash onClick={() => setShowPassword((prev) => !prev)} className='eye-icon' />
                      :
                      <FaEye onClick={() => setShowPassword((prev) => !prev)} className='eye-icon' />
                    }
                    {/* <FaEye /> */}
                  </div>
                  {errors.password && <p className='validations'>
                    {t("loginReg.Please enter your password.")}
                  </p>}
                </div>
                <div className="mb-3 checkbox">
                  <input type='checkbox' ></input>
                  <p>{t("loginReg.Remember Me")}</p>
                </div>
                <button type="submit" className="log-btn" name="wp-submit" id="wppb-submit" value="Log In">
                  {t("loginReg.Login")}
                </button>
              </form>

              <div className='googel-login'>
                <GoogleLogin
                  clientId={clientId}
                  onSuccess={handleLoginSuccess}
                  onFailure={handleLoginFailure}
                  buttonText='Continue with Google'
                  isSignedIn={true}
                  className="googel-login-inner"
                />
              </div>


              <Link to="/forgot" className="forgot-password">{t("loginReg.forgotPassword")}</Link>


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

