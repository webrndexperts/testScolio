import React from 'react';
import ThankuIco from '../../../images/icons/thankyou.png';

const ThanksView = (props) => {
	const { message = '' } = props;
	return (
		<div className="thanks-view" >
			<div className='thankyou '>
				<img src={ThankuIco} alt="" />
				<p dangerouslySetInnerHTML={{ __html: message }} />
			</div>
		</div>
	)
}

export default ThanksView;