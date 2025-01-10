import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ReadLessMore = (props) => {
    const { html = '', words = 200 } = props;
    const [text, setText] = useState('');
    const [more, setMore] = useState(false);
    const [show, setShow] = useState(true);
    const { t } = useTranslation();

    const readMore = () => {
        setText(html);
        setMore(true);
    }

    const readLess = () => {
        var _txt = (html.length > words) ? html.slice(0, words) + '<span id="ellipsis">...</span>' : html;
        
        setText(_txt);
        setMore(false);
        setShow((html.length > words) ? true : false);
    }

    
    useEffect(() => {
        if(html) {
            readLess();
        }
    }, [html])

    return (
        <Fragment>
            <div dangerouslySetInnerHTML={{ __html: text }} />
            
            {(show) &&
                (more) ? (
                    <Link onClick={readLess}>{t("Patients.read_less")}</Link>
                ) : (
                    <Link onClick={readMore}> {t("Patients.read_more")}</Link>
                )
            }
        </Fragment>
    )
}

export default ReadLessMore;