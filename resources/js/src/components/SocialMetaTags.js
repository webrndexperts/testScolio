import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ApiHook from "./CustomHooks/ApiHook";

const SocialMetaTags = (props) => {
	const { title = '', description = '', tags = '' } = props;
	const [metas, setMetas] = useState([]);
	const [currentLanguage, urlLanguage] = ApiHook();
	let pageUrl = window.location.href;
	const generateMetas = () => {
		let values = [
			{ 'property': "og:locale", 'content': currentLanguage },
			{ 'property': "og:type", 'content': "website" },
			{ 'property': "og:title", 'content': title },
			{ 'property': "og:description", 'content': description },
			{ 'property': "og:url", 'content': `https://scoliolife.com${urlLanguage}` },
			{ 'property': "og:site_name", 'content': "ScolioLife™" },
			{ 'property': "article:publisher", 'content': "https://www.facebook.com/ScolioLife" },
			{ 'property': "article:modified_time", 'content': "2024-02-29T08:43:58+00:00" },
			{ 'property': "og:image", 'content': "https://sladmin.scoliolife.com/uploads/2023/07/Award-1-EN.webp" },
			{ 'name': "twitter:card", 'content': "summary_large_image" },
			{ 'name': "twitter:site", 'content': "@scoliolife" }
		];

		setMetas(values);
	}

	useEffect(() => {
		generateMetas();
	}, [currentLanguage])
	
	return (
		<Helmet>
			{(title) ? <title>{title}</title> : null}
            {(description) ? <meta name="description" content={description} /> : null}
            {(tags) ? <meta name="keywords" content={tags} /> : null}

			{metas.map((item, key) => (
				(item.name) ? (
					<meta name={item.name} content={item.content} key={key}/>
				) : (
            		<meta property={item.property} content={item.content} key={key}/>
            	)
			))} 
			<link rel="canonical" href={pageUrl} />
        </Helmet>
	)
}

export default SocialMetaTags;