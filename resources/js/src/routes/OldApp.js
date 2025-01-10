import './App.css';
import React, { useEffect, useState ,useCallback } from 'react';
import Layout from './components/layout';
import Index from './pages/Index';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Articles from './pages/articles/Articles';
import ContactUs from './pages/contactUs';
import Article from './pages/articles/Article';
import JobListing from './pages/JobListings';
import AboutUs from './pages/AboutUs';
import ShoppingCartPage from './pages/ShoppingCartPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import { CartProvider } from './context/CartContext';
import ProductDetailPage from './pages/ProductDetailPage';
import StripeProvider from './providers/StripeProvider';
import Shop from './pages/Shop';
import { useAuth } from './context/authContext';
import { useDispatch, useSelector } from 'react-redux';
import { replaceItem } from './reducers/cartSlice';
import Result from './pages/ResultsPage/Result';
import WorldWide from './pages/ResultsPage/WorldWide';
import Testimonials from './pages/ResultsPage/Testimonials';
import NotFoundPage from './pages/NotFoundPage';
import ProductCategory from './pages/ProductCategory';
import Order from './pages/Order';
import MyAccount from './pages/MyAccount';
// import { AuthProvider } from './context/authContext';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { userLogin } from './reducers/authSlice';
import ThankYou from './pages/ThankYou';
import Wide from './Pagess/world';
import Slife from './Pagess/Scoliolifefaq';
import Chiro from './Pagess/Chiropractic';
import MediaA from './Pagess/Mediaapperence';
import Track from './Pagess/Scoliotrack';
import Clinic from './Pagess/Clinic';
import i18n from './i18n';
import Total from './components/CartComponents/Total';
import Account_detail from './Pagess/Account_details';
import OrdersComponent from './Pagess/Orderss';
import ConsultationForm from './Pagess/BookConsulation';
import FranForm from './pages/FranForm';
import Form from './components/Form';
import WhatsappChatBot from './components/WhatsappChatBot';
// import ScolioLife from './pages/ScolioLife';
const App = () => {
  const [loginData ,setLoginData]=useState(localStorage.getItem('isLogin'))
  const { authData, authLogin } = useSelector((state) => state.auth);
  const storedLanguage = localStorage.getItem('i18nextLng');
  
  const defaultLanguage = storedLanguage || 'en_SG';
  console.log("defaultLanguage ", defaultLanguage);
  // Set i18next language
  i18n.changeLanguage(defaultLanguage);
  const dispatch = useDispatch();
  console.log("authData", authData);
  console.log("loginData", loginData);

// import Main from "./component-s/ShoppingCart/Main"
// import Slick from "./component-s/Slick"
// import Slider from "./component-s/Slider"

  const memoizedAuthLogin = useCallback(() => {
    // authLogin();
  }, [authLogin]);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('userData'));
    let loginDATA = localStorage.getItem('isLogin');
    // console.log("data++=", data);
    if (data) {
    setLoginData(loginDATA)
      dispatch(userLogin(data));
    }
  }, [dispatch,authLogin])

  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      dispatch(replaceItem(cart))
    }
  }, [dispatch])


  function RequireAuth() {
    // let { authed } = useAuth();
    let location = useLocation();
    if (!loginData) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
    return <Outlet />;
  }

  return (
    <StripeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="/:lang/shop" element={<Shop />} />
            <Route path="/:lang/product/:slug" element={<ProductDetailPage />} />
            {/* <Route path="/products/:slug/:lang" element={<ProductDetailPage />} /> */}
            <Route path="/:lang/cart" element={<ShoppingCartPage />} />
            <Route path="/:lang/checkout" element={<CheckoutPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/form" element={<Form/>} />
            <Route path="/franform" element={<FranForm/>} />
            <Route path="/register" element={<RegistrationPage />} />
            {<Route path="/:lang" element={<Index />} />}
            <Route path="/:lang/articles/" element={<Articles />} />
            <Route path="/:lang/articles/:postId" element={<Article />} />
            <Route path="/jobs/:lang" element={<JobListing />} />
            <Route path="/:lang/contact-us" element={<ContactUs />} />
            <Route path="/:lang/:slug" element={<AboutUs />} />
            <Route path="/:lang/results" element={<Result />} />
            <Route path="/:lang/patients-worldwide" element={<WorldWide />} />
            <Route path="/:lang/testimonials" element={<Testimonials />} />
            <Route path="/:lang/product-category/:slug" element={<ProductCategory />} />
            <Route path="/:lang/thank-you" element={<ThankYou />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path='/:lang/world' element={<Wide />}></Route>
            <Route path='/:lang/scoliolife-faq' element={<Slife />}></Route>
            <Route path='/:lang/chiropractic-faq' element={<Chiro />}></Route>
            <Route path='/:lang/media-appearances' element={<MediaA />}></Route>
            <Route path='/:lang/scoliotrack-faq' element={<Track />}></Route>
            <Route path='/:lang/tour-our-clinic' element={<Clinic />}></Route>
            <Route path='/:lang/my-account' element={<MyAccount />}></Route>
            <Route path='/:lang/account-details' element={<Account_detail />}></Route>
            <Route path='/:lang/order' element={<OrdersComponent />}></Route>
            <Route path="/:lang/orders/:orderId" element={<Order />} />
            <Route path="/:lang/ConsultationForm/" element={<ConsultationForm />} />
            {/* Protected Routes */}
            <Route element={<RequireAuth />}>
              {/* <Route path="/:lang/order" element={<Order />} /> */}
              {/* <Route path="/:lang/my-account" element={<MyAccount />} /> */}
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
      <WhatsappChatBot language={defaultLanguage} />
    </StripeProvider>
    
    
  );

  function RequireAuth() {
    let { authed } = useAuth();
      let location = useLocation();
      if (!authed) {
        return <Navigate to="/" state={{ from: location }} replace />;
      }
      return <Outlet />;
    }
}

export default App;

// function App () {
//   return(
//     <div>
     
//    <div className="ner">
//    <h1 style={{color:"blue",textAlign:"center"}}>Slider</h1>
//       <Slick /> </div>
//       <Main />
//     </div>
//   )
// }
// export default App