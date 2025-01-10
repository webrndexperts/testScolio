import React from 'react';
import useDynamicTitle from '../hooks/useDynamicTitle';
import MetaCreator from './MetaCreator';
const TopBanner = (props) => {
	const { title = '', pageClass = '' } = props;
	const img = `/assets/images/banner_new.webp`;

	// useDynamicTitle(title);

	return (
		<div
	        className={`inner-banner ${pageClass}`}
	        style={{ backgroundImage: `url(${img})` }}
      	>
			<MetaCreator title={title} />
        	<h1>{ title }</h1>
      	</div>
	)
}

export default TopBanner;