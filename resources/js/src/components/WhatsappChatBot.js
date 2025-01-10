import React, { Fragment, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import ApiHook from './CustomHooks/ApiHook';

const WhatsappChatBot = (props) => {
	const { language = '' } = props;
	const { t } = useTranslation();
	const [currentLanguage] = ApiHook();

	const checkAvailable = () => {
		var _head = document.querySelector('.floating-wpp-head'),
		_body = document.querySelector('.floating-wpp-message');

		var titleheader = t("whatsApp.title"),
      	popmsg = t("whatsApp.description");


		if(typeof _head != 'undefined' && _head) {
			_head.firstChild.textContent = (titleheader) ? titleheader : 'Chat with us on WhatsApp!';
		}

		if(typeof _body != 'undefined' && _body) {
			_body.textContent = (popmsg) ? popmsg : 'Hello, how can we help you?';
		}
	}

	useEffect(() => {
		if(currentLanguage) {
			checkAvailable();
		}
	}, [currentLanguage])

	return (
		<Fragment />
	)


}

export default WhatsappChatBot;