import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ErrorImg from '../images/404error-1.jpg';
import i18n from '../i18n';
import { useNavigate } from 'react-router-dom';
import { checkUrlLanguage } from '../hooks/customFunctions';

const NotFoundPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        var url = checkUrlLanguage(i18n.language);
        if(url) {
            navigate(url);
        }
    }, [])

    return (
        <div className="page-not-found">
            <div className="container mt-5">
                <div className="entry-content">
                    <div className="content-block">
                        <h1 className="page-title"><span>Oops!</span>That page can’t be found.</h1>
                        <p>It appears you’ve missed your intended destination, either through an outdated link, or a typo in
                            the page you were hoping to reach.</p>
                        <p>If you were looking for specific content, please try the above menu bar. </p>
                        <p><Link className="go-home" to="/">Back to Homepage</Link></p>
                    </div>
                    <img src={ErrorImg} alt="404error-1"/>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
