import React, { useRef, useEffect, useState, Fragment } from 'react';
import ContactComponent from '../ContactComponent';

const SummaryShow = (props) => {
	const { html = '' } = props;

	const renderWithForm = () => {
		const parts = html.split('[contact-form-7]');

		return (
			<Fragment>
				{parts.map((part, index) => (
		          	<Fragment key={index}>
			            <span dangerouslySetInnerHTML={{ __html: part }} />
			            {index !== parts.length - 1 && <ContactComponent />}
		          	</Fragment>
		        ))}
			</Fragment>
		)
	}

	return (
		<div className="description-with-contact">
			{ renderWithForm() }
		</div>
	);
};

export default SummaryShow;