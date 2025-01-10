import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import $ from 'jquery';

const CustomLinkTrigger = (props) => {
	const { checkClass = '', currentLanguage } = props;
	const [triggered, setTriggered] = useState(true);
	const navigate = useNavigate();

	const redirectPage = (url) => {
		navigate(`${currentLanguage}${url}`)
	}

	const checkClassPage = () => {
		$(document).on('click', `a.${checkClass}`, function(e) {
			let { dataset } = e.target;

			if(dataset && dataset.href) {
				redirectPage(dataset.href);
			}
		});

		setTriggered(false);
	}

	useEffect(() => {
		if(checkClass && triggered) {
			checkClassPage();
		}
	}, [checkClass])

	return (
		<Fragment />
	)
}

export default CustomLinkTrigger