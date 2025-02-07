import "./App.css";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import Layout from "./components/layout";
import Index from "./pages/Index";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import PaymentPage from "./pages/PaymentPage";
import { CartProvider } from "./context/CartContext";
// import StripeProvider from "./providers/StripeProvider";
import { useAuth } from "./context/authContext";
import { useDispatch, useSelector } from "react-redux";
import { replaceItem } from "./reducers/cartSlice";
import NotFoundPage from "./pages/NotFoundPage";
// import { AuthProvider } from './context/authContext';
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { userLogin } from "./reducers/authSlice";

import NewCheckout from "./pages/NewCheckout";
import OnlineBooking from "./pages/OnlineBooking";

import { ForgotPassword, ResetPassword } from "./pages/passwords";

import i18n from "./i18n";
import FranForm from "./pages/FranForm";
import Form from "./components/Form";
import WhatsappChatBot from "./components/WhatsappChatBot";
import { matchUrlAndStoredLanguage } from "./hooks/customFunctions";

import { languageRoutes, withoutLanguageRoutes, commonRoutes } from "./routes";
import { initializeLanguage, selectLanguage } from "./reducers/languageSlice";
import AOS from "aos";
import "aos/dist/aos.css";
import WishlistView from "./pages/WishlistView";
import useGeoLocation from "react-ipgeolocation";
import StripeProvider from "./providers/StripeProvider";
import { setLanguage, setUrlLanguage } from "./reducers/languageSlice";
import LanguageRoute from "./components/LanguageRoute ";
const App = () => {
    const [loginData, setLoginData] = useState(localStorage.getItem("isLogin"));
    const { authData, authLogin } = useSelector((state) => state.auth);
    const [checkLanguage, setCheckLanguage] = useState(false);
    const currentLanguage = useSelector(selectLanguage);
    const [loading, setLoading] = useState(true);

    const { slug, lang: slugLang } = useParams();
    const dispatch = useDispatch();
    // Set i18next language
    const defaultLanguage = matchUrlAndStoredLanguage();
    // i18n.changeLanguage(defaultLanguage);
    const urlLang = location.pathname.split("/")[1];
    const langRegex = /^[a-z]{2}_[A-Z]{2}$/;
    const isValidLang = langRegex.test(urlLang);
    const storedLanguage = localStorage.getItem("i18nextLng");
    const initialSet = JSON.parse(localStorage.getItem("initialLanguageSet"));
    const defaultLang = "en_US";

    // const  finalLang = storedLanguage === 'en_US' || !isValidLang  ? "en_US" : (isValidLang ? urlLang : storedLanguage || defaultLang);
    const finalLang = useMemo(() => {
        return storedLanguage === "en_US" || !isValidLang
            ? "en_US"
            : isValidLang
            ? urlLang
            : storedLanguage || defaultLang;
    }, [storedLanguage, isValidLang, urlLang, defaultLang]);

    useEffect(() => {
        const initialize = async () => {
            setLoading(true);
            localStorage.removeItem("i18nextLng");
            setLoading(false);
        };
        initialize();
    }, []);

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("userData"));
        let loginDATA = localStorage.getItem("isLogin");
        // console.log("data++=", data);
        if (data) {
            setLoginData(loginDATA);
            dispatch(userLogin(data));
        }
    }, [dispatch, authLogin]);

    useEffect(() => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (cart) {
            dispatch(replaceItem(cart));
        }
    }, [dispatch]);

    function RequireAuth() {
        let location = useLocation();
        if (!loginData) {
            return <Navigate to="/" state={{ from: location }} replace />;
        }
        return <Outlet />;
    }

    useEffect(() => {
        if (i18n) {
            setCheckLanguage(i18n.language == "en_US" ? false : true);
        }

        if (currentLanguage == 'en_MY') {
            document.body.classList.add("my-header");
            document.body.classList.remove("id-header");
        } else if (currentLanguage == 'id_ID') {
            document.body.classList.add("id-header");
            document.body.classList.remove("my-header");
        } else {
            document.body.classList.remove("my-header");
            document.body.classList.remove("id-header");
        }

    }, [i18n, currentLanguage]);
    useEffect(() => {
        // AOS.init();
        AOS.init({
            offset: 200,
            duration: 1000,
            easing: "ease-in-sine",
            delay: 200,
        });

        // AOS.refresh();
    }, []);

    if (loading) {
        return (
            <>
                <div className="language_spinner">
                    <div
                        className="spinner-border text-warning language_spinner"
                        role="status"
                    >
                        <span className="sr-only">Loading...</span>
                    </div>
                    <span className="empty_layer"></span>
                </div>
            </>
        );
    }
    return (
        <StripeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Index />} />
                        <Route path="/not-found" element={<NotFoundPage />} />

                        {/* {checkLanguage
              ? languageRoutes.map((item, indKey) => {
                  // console.log('~~~~~~~~~~~~~~', item)
                  return <Route {...item} key={indKey} />;
                })
              : null}

            {!checkLanguage
              ? withoutLanguageRoutes.map((item, indKey) => {
                  // console.log('~~~~~~~~~~~~~~', item)
                  return <Route {...item} key={indKey} />;
                })
              : null} */}

                        {finalLang === "en_US"
                            ? withoutLanguageRoutes.map((item, indKey) => {
                                  // console.log('~~~~~~~~~~~~~~', item)
                                  return <Route {...item} key={indKey} />;
                              })
                            : null}

                        {finalLang !== "en_US"
                            ? languageRoutes.map((item, indKey) => {
                                  // console.log('~~~~~~~~~~~~~~', item)
                                  return <Route {...item} key={indKey} />;
                              })
                            : null}

                        <Route path="/payment" element={<PaymentPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/form" element={<Form />} />
                        <Route path="/franform" element={<FranForm />} />
                        <Route
                            path="/register"
                            element={<RegistrationPage />}
                        />
                        <Route path="/forgot" element={<ForgotPassword />} />
                        <Route
                            path="/password/reset/:token"
                            element={<ResetPassword />}
                        />
                        <Route path="/new-checkout" element={<NewCheckout />} />
                        <Route
                            path="/online-booking"
                            element={<OnlineBooking />}
                        />
                        <Route path="/wishlists" element={<WishlistView />} />

                        <Route
                            path="/en_US/*"
                            element={<Navigate to="/" replace />}
                        />
                        <Route path="*" element={<NotFoundPage />} />
                        {/* Protected Routes */}
                        <Route element={<RequireAuth />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
            <WhatsappChatBot language={defaultLanguage} />
        </StripeProvider>
    );
};

export default App;
