/**
 * Function to get last value of url.
 * 
 * @return String value;
 */
const getLastSlug = () => {
	const path = window.location.pathname;
	const pathSegments = path.split('/').filter(segment => segment.trim() !== '');
	const lastSegment = pathSegments[pathSegments.length - 1];

	return lastSegment;
}

/**
 * Function to check if slug is language code or not.
 * @param slug string value.
 * 
 * @return Boolen value;
 */
const containsLanguageCode = (slug) => {
	// Regular expression to match language codes like en, en-US, en_gb, etc.
	const languageCodeRegex = /^[a-zA-Z]{2}(-[a-zA-Z]{2})?(_[a-zA-Z]{2})?$/;

	return languageCodeRegex.test(slug);
}

/**
 * Function to check if first param of url is language code or not.
 * @param url URL string.
 * 
 * @return Object;
 */
const isFirstParamLanguage = (url) => {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const firstSegment = pathname.split('/')[1];
    
    const langPattern = /^[a-zA-Z]{2}(-[a-zA-Z]{2})?(_[a-zA-Z]{2})?$/;
    return { status: langPattern.test(firstSegment), language: firstSegment };
}

/**
 * Function to add or remove language in url.
 * @param language String value.
 * @param values Object.
 * @param path URL pathname string.
 * 
 * @return Boolen value;
 */
const addOrRemoveLanguage = (language, values, path) => {
	var url = path;

	if(language == 'en_US' && values.status) {
		url = path.replace(`/${values.language}`, '');
	} else if(!values.status && language != 'en_US') {
		url = `/${language}${path}`;
	}

	return url;
}

/**
 * Function to check weather slug has language or not.
 * 
 * @return Boolen value;
 */
const checkUrlRoute = () => {
	var slug = getLastSlug();
	return containsLanguageCode(slug);
}

/**
 * Function to check if url has right language.
 * @param language String value of language code.
 * 
 * @return String value;
 */
const checkUrlLanguage = (language) => {
	var url = '', check = isFirstParamLanguage(window.location.href);
	if(check.language != language) {
		var path = window.location.pathname;
		url = addOrRemoveLanguage(language, check, path);
	}

	return url;
}

/**
 * Function to detect language code.
 * @param lang String value of stored language.
 * 
 * @return String language code.
 */
const checkCurrentRoute = (lang) => {
	var path = window.location.pathname,
	pathSegments = path.split('/').filter(segment => segment.trim() !== ''),
	lastSegment = pathSegments[0],

	defaultLanguage = lang || 'en_SG';

	if(containsLanguageCode(lastSegment)) {
		if(defaultLanguage != lastSegment) {
			defaultLanguage = lastSegment;
		}
	} else {
		defaultLanguage = 'en_US';
	}
	
	return defaultLanguage;
}

/**
 * Fuunction to check if the stored language and url languages are same.
 * 
 * @return String value.
 */
const matchUrlAndStoredLanguage = () => {
	let storedLanguage = localStorage.getItem('i18nextLng'),
	lang = checkCurrentRoute(storedLanguage);

	return lang;
}

/**
 * Function to set selected Shipping values.
 * @param Function from useForm Hook.
 * @param values Object of different values.
 * 
 * @return Boolen
 */
const setCartSetValues = (setValue, values) => {
	let cartValues = localStorage.getItem('shippingCartAddress');

	let {
		billing_country = '', billing_city = '', billing_state = '', billing_postcode = '', shipping_country = '',
		shipping_city = '', shipping_state = '', shipping_postcode = '', options
	} = values

	if(cartValues && typeof cartValues != 'undefined') {
		cartValues = JSON.parse(cartValues);

		billing_country = cartValues.country_alpha2;
		shipping_country = cartValues.country_alpha2;

		billing_state = cartValues.state;
		shipping_state = cartValues.state;

		setValue('country', cartValues.country_alpha2);
		setValue('town', cartValues.city);
		setValue('state', cartValues.state);
		setValue('postcode', cartValues.postal_code);

		setValue('shippingCountry', cartValues.country_alpha2);
		setValue('shippingTown', cartValues.city);
		setValue('shippingState', cartValues.state);
		setValue('shippingPostcode', cartValues.postal_code);
	} else if(values && values) {
		setValue('country', billing_country);
		setValue('town', billing_city);
		setValue('state', billing_state);
		setValue('postcode', billing_postcode);

		setValue('shippingCountry', shipping_country);
		setValue('shippingTown', shipping_city);
		setValue('shippingState', shipping_state);
		setValue('shippingPostcode', shipping_postcode);
	}

	if(options && options.page) {
		let {
	        setSelectedCountry, setSelectedState, setSelectedShippingState, setSelectedShippingCountry,
	        countries, states, setStates, setShippingStates
	    } = options;

	    var stateList = states.getStatesOfCountry(billing_country),
	    shipStateList = states.getStatesOfCountry(shipping_country),
	    countrySelected = countries.find(o => o.isoCode === billing_country),
	    shipCountrySelected = countries.find(o => o.isoCode === shipping_country),
	    stateSelected = stateList.find(o => o.name === billing_state),
	    shipStateSelected = shipStateList.find(o => o.name === shipping_state);

	    // Setting billing and shipping states according to countries selected.
	    setStates(stateList);
	    setShippingStates(shipStateList);

	    // Setting selected billing and shipping country values.
	    setSelectedCountry(countrySelected);
	    setSelectedShippingCountry(shipCountrySelected);

	    // Setting selected billing and shipping state values.
	    setSelectedState(stateSelected);
	    setSelectedShippingState(shipStateSelected);
	}

	return true;
}

/**
 * Function to set checkout page values.
 * @param setValue Function from useForm Hook.
 * @param response Object Api response.
 * @param options Object Vaues to be set.
 * 
 * @return Boolen.
 */
const setCheckoutDetails = (setValue, response, options = null) => {
	let values = { options };

	if(response && response.status) {
		if(response.data.status || response.data.success) {

			let {
				billing_address_1 = '', billing_address_2 = '', billing_city = '', billing_country = '', billing_email = '',
				billing_first_name = '', billing_last_name = '', billing_phone = '', billing_postcode = '', billing_state = '',
				company = '', shipping_address_1 = '', shipping_address_2 = '', shipping_postcode = '', shipping_country = '',
				shipping_first_name = '', shipping_last_name = '', shipping_phone = '', shipping_city = '', shipping_state = ''
			} = response.data.user_address_info;

			values = {
				billing_country, billing_city, billing_state, billing_postcode, shipping_country, shipping_city,
				shipping_state, shipping_postcode, options
			}

			setValue('firstName', billing_first_name);
			setValue('lastName', billing_last_name);
			setValue('company', company);
			setValue('street', billing_address_1);
			setValue('apartment', billing_address_2);
			setValue('phone', billing_phone);
			setValue('email', billing_email);

			setValue('shippingFirstName', shipping_first_name);
			setValue('shippingLastName', shipping_last_name);
			setValue('shippingCompany', company);
			setValue('shippingStreet', shipping_address_1);
			setValue('shippingApartment', shipping_address_2);
			setValue('shippingPhone', shipping_phone);
			setValue('shippingEmail', billing_email);
		}
	}

	setCartSetValues(setValue, values);

	return true;
}

export {
	checkUrlRoute,
	checkUrlLanguage,
	matchUrlAndStoredLanguage,
	setCheckoutDetails
}