import React, { Fragment, useState, useEffect } from 'react';
import { Outlet, useLocation  } from "react-router-dom";
import MainHeader from "./MainHeader";
import Footer from "./Footer";
import SocialConnection from './SocialConnection';
import WhatsApp from './WhatsApp';

const Layout = () => {
	const [showIcons, setShowIcons] = useState(true);
	const location = useLocation();

	useEffect(() => {
		if(location) {
			var segments = location.pathname.split('/'),
  			lastSegment = segments[segments.length - 1], _value = true;

  			if(lastSegment == 'cart' || lastSegment == 'checkout' || lastSegment == 'wishlists') { _value = false; }

  			setShowIcons(_value);
		}
	}, [location])

	return (
		<Fragment>
			<MainHeader ></MainHeader>
			{(showIcons) ? <SocialConnection /> : null}
			<Outlet></Outlet>
			<WhatsApp />
			<Footer></Footer>
		</Fragment>
	)
};

export default Layout;