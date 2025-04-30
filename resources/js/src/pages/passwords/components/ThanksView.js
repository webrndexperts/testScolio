import React from 'react';
import ThankuIco from '../../../images/icons/thankyou.png';
import { Link } from "react-router-dom";

const ThanksView = (props) => {
	const { message = '', login = 'Back to Login' } = props;
	return (
		<div className="thanks-view" >
			<div className='thankyou '>
				<img src={ThankuIco} alt="" />
				<p dangerouslySetInnerHTML={{ __html: message }} />
			</div>

			<Link className="back-login" to={`/login`}>{ login }</Link>
		</div>
	)
}

export default ThanksView;