import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { userLogin } from '../reducers/authSlice';
import { useDispatch,useSelector } from 'react-redux';
import ApiHook from "../components/CustomHooks/ApiHook";
import useDynamicTitle from "../hooks/useDynamicTitle";
import { t } from "i18next";
function AccountDetail() {
  const { authData, authLogin } = useSelector((state) => state.auth);
  const [currentLanguage, urlLanguage]=ApiHook();

  const {
    register: loginForm,
    handleSubmit: handleLogin,
    reset: loginReset,
    formState: { errors: loginError },
  } = useForm();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    changepassword: "",
  });
  useEffect(() => {
    if (authData) {
      setFormData({
        firstname: authData.name,
        lastname: "",
        email: authData.email,
        password: "",
        changepassword: "",
      });
    }
  }, [authData]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("", formData);

      setSuccess("Form submitted successfully!");
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        changepassword: "",
      });
    } catch (error) {
      console.log("Error submitting form:", error);
      setError("Failed to submit form. Please try again.");
    }
  };
let data ={
  message: "User logout successfully.",
  success: false,
  user_id: null
}
  const userLogout = ()=>{
    localStorage.removeItem('isLogin')
    localStorage.removeItem('userData')
    dispatch(userLogin(data))
    navigate(`/login`)
 }
useDynamicTitle(t('order_Information.Account details'))
  return (
    <>
      <div className="my-account">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-3">
              <nav className="woocommerce-MyAccount-navigation">
                <ul>
                  <li className="navigation-link--dashboard is-active">
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="navigation-link--orders_info">
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                    <Link to={`${urlLanguage}/order`}>Orders</Link>
                  </li>
                  {/* <li className="navigation-link--downloads"><i className="fa fa-angle-right" aria-hidden="true"></i>
                                        <Link to="">Downloads</Link>
                                    </li> */}
                  {/* <li className="navigation-link--edit-address"><i className="fa fa-angle-right" aria-hidden="true"></i>
                                        <Link>Addresses</Link>
                                    </li>
                                    <li className="navigation-link--payment-methods"><i className="fa fa-angle-right" aria-hidden="true"></i>
                                        <Link to="">Payment methods</Link>
                                    </li> */}
                  <li className="navigation-link--edit-account">
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                    <Link to={`${urlLanguage}/account-details`}>
                      Account details
                    </Link>
                  </li>
                  <li
                    onClick={() => userLogout()}
                    className="navigation-link--customer-logout"
                  >
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                    <Link>Log out</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-md-9">
              <h2>My Account</h2>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {success && <p style={{ color: "green" }}>{success}</p>}
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="firstname">First Name:</label>
                  <input
                    type="text" readOnly
                    className="form-control"
                    id="inputEmail4"
                    name="firstname"
                    value={formData.firstname}
                  />
                </div>
                <div>
                  <label htmlFor="lastname">Last Name:</label>
                  <input readOnly
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input readOnly
                    type="email"
                    className="form-control"
                    value={formData.email}
                    id="inputEmail4"
                    {...loginForm("name", { required: true })}
                  />
                  {loginError.email && (
                    <p className="validations">Enter your email</p>
                  )}
                </div>
                <div style={{display:"none"}}>
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div style={{display:"none"}}>
                  <label htmlFor="changepassword">Change Password:</label>
                  <input
                    type="password"
                    id="changepassword"
                    name="changepassword"
                    value={formData.changepassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" style={{display:"none"}} >Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    
    </>
  );
}

export default AccountDetail;
