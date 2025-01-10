import React, { useState, useEffect } from 'react'
import { jsonData } from '../hooks/social-icons';
import ApiHook from "./CustomHooks/ApiHook";
import { mobileScreen } from "../providers/constants";

const SocialConnection = () => {
	const [currentLanguage] = ApiHook();
	const [icons, setIcons] = useState([]);
	const [extra, setExtra] = useState(false);

	const handleResize = () => {
		setExtra(window.innerWidth <= mobileScreen)
	}

	useEffect(() => {
		if(currentLanguage) {
			if(jsonData[currentLanguage]) {
				setIcons(jsonData[currentLanguage]);
			}
		}
	}, [currentLanguage])

	useEffect(() => {
		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
      		window.removeEventListener('resize', handleResize);
    	};
	}, [])

	return (
		<div className={`socialmedia-buttons smw_left${(extra) ? ' mobile-screen' : ''}`}>
			<ul className="socialicons">
				{(icons && icons.length) ? (
					icons.map((icon, index) => {
						return (
							<li className='watch_online' key={`icon-${index}`}>
								<a href={icon.url} title={icon.title} target='blank'>
									<img
										loading="lazy"
										width="26"
										height="26"
										className="scale"
										src={icon.icon}
										alt={icon.title}
									/>
								</a>
							</li>
						)
					})
				) : null}
			</ul>
		</div>
	)
}

export default SocialConnection;