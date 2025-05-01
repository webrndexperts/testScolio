import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RouteChangeHandler = (props) => {
    const location = useLocation(); 

    useEffect(() => {
    	let blockedPaths = [ 'login', 'register', 'password/reset', 'forgot' ];

	    const shouldBlock = blockedPaths.some(path =>
	      	location.pathname.includes(path)
	    );

	    if (!shouldBlock) {
	    	let urlWithoutDomain = window.location.pathname + window.location.search + window.location.hash;
  			sessionStorage.setItem('lastUrl', urlWithoutDomain);
	    }
    }, [location]);

    return null;
};

export default RouteChangeHandler;
