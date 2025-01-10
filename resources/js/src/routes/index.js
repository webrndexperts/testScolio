import React from 'react'
import Shop from '../pages/Shop';
import Articles from '../pages/articles/Articles';
import ContactUs from '../pages/contactUs';
import Article from '../pages/articles/Article';
import AboutUs from '../pages/AboutUs';
import ShoppingCartPage from '../pages/ShoppingCartPage';
import CheckoutPage from '../pages/CheckoutPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import Result from '../pages/ResultsPage/Result';
import WorldWide from '../pages/ResultsPage/WorldWide';
import Testimonials from '../pages/ResultsPage/Testimonials';

import ProductCategory from '../pages/ProductCategory';
import Order from '../pages/Order';
import MyAccount from '../pages/MyAccount';
import ThankYou from '../pages/ThankYou';
import Wide from '../Pagess/world';
import Slife from '../Pagess/Scoliolifefaq';
import Chiro from '../Pagess/Chiropractic';
import MediaA from '../Pagess/Mediaapperence';
import Track from '../Pagess/Scoliotrack';
import Clinic from '../Pagess/Clinic';
import AccountDetail from '../Pagess/AccountDetail';
import OrdersComponent from '../Pagess/Orderss';
import ConsultationForm from '../Pagess/BookConsulation';
import Index from '../pages/Index';
import ThanksOrderView from '../pages/ThanksOrderView';

const languageRoutes = [
	{
		path: "/:lang",
		element: <Index />
	},
	{
		path: "/:lang/shop",
		element: <Shop />
	},
	{
		path: "/:lang/product/:slug",
		element: <ProductDetailPage />
	},
	{
		path: "/:lang/cart",
		element: <ShoppingCartPage />
	},
	{
		path: "/:lang/checkout",
		element: <CheckoutPage />
	},
	{
		path: "/:lang/articles",
		element: <Articles />
	},
	{
		path: "/:lang/articles/:postId",
		element: <Article />
	},
	{
		path: "/:lang/contact-us",
		element: <ContactUs />
	},
	{
		path: "/:lang/:slug",
		element: <AboutUs />
	},
	{
		path: "/:lang/results",
		element: <Result />
	},
	{
		path: "/:lang/patients-worldwide",
		element: <WorldWide />
	},
	{
		path: "/:lang/testimonials",
		element: <Testimonials />
	},
	{
		path: "/:lang/product-category/:slug",
		element: <ProductCategory />
	},
	{
		path: "/:lang/thank-you",
		element: <ThankYou />
	},
	{
		path: "/:lang/world",
		element: <Wide />
	},
	{
		path: "/:lang/scoliolife-faq",
		element: <Slife />
	},
	{
		path: "/:lang/chiropractic-faq",
		element: <Chiro />
	},
	{
		path: "/:lang/media-appearances",
		element: <MediaA />
	},
	{
		path: "/:lang/scoliotrack-faq",
		element: <Track />
	},
	{
		path: "/:lang/tour-our-clinic",
		element: <Clinic />
	},
	{
		path: "/:lang/my-account",
		element: <MyAccount />
	},
	{
		path: "/:lang/account-details",
		element: <AccountDetail />
	},
	{
		path: "/:lang/order",
		element: <OrdersComponent />
	},
	{
		path: "/:lang/orders/:orderId",
		element: <Order />
	},
	{
		path: "/:lang/order/complete/:orderId",
		element: <ThanksOrderView />
	},
	{
		path: "/:lang/ConsultationForm",
		element: <ConsultationForm />
	},
]

const withoutLanguageRoutes = [
	{
		path: "/",
		element: <Index />,
		exact: true
	},
	{
		path: "/shop",
		element: <Shop />
	},
	{
		path: "/product/:slug",
		element: <ProductDetailPage />
	},
	{
		path: "/cart",
		element: <ShoppingCartPage />
	},
	{
		path: "/checkout",
		element: <CheckoutPage />
	},
	{
		path: "/articles",
		element: <Articles />
	},
	{
		path: "/articles/:postId",
		element: <Article />
	},
	{
		path: "/contact-us",
		element: <ContactUs />
	},
	{
		path: "/:slug",
		element: <AboutUs />
	},
	{
		path: "/results",
		element: <Result />
	},
	{
		path: "/patients-worldwide",
		element: <WorldWide />
	},
	{
		path: "/testimonials",
		element: <Testimonials />
	},
	{
		path: "/product-category/:slug",
		element: <ProductCategory />
	},
	{
		path: "/thank-you",
		element: <ThankYou />
	},
	{
		path: "/world",
		element: <Wide />
	},
	{
		path: "/scoliolife-faq",
		element: <Slife />
	},
	{
		path: "/chiropractic-faq",
		element: <Chiro />
	},
	{
		path: "/media-appearances",
		element: <MediaA />
	},
	{
		path: "/scoliotrack-faq",
		element: <Track />
	},
	{
		path: "/tour-our-clinic",
		element: <Clinic />
	},
	{
		path: "/my-account",
		element: <MyAccount />
	},
	{
		path: "/account-details",
		element: <AccountDetail />
	},
	{
		path: "/order",
		element: <OrdersComponent />
	},
	{
		path: "/orders/:orderId",
		element: <Order />
	},
	{
		path: "/order/complete/:orderId",
		element: <ThanksOrderView />
	},
	{
		path: "/ConsultationForm",
		element: <ConsultationForm />
	},
]

export {
	languageRoutes,
	withoutLanguageRoutes
}

