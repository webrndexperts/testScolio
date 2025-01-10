import React, { Fragment, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useDynamicLanguage } from '../i18n';
import ApiHook from './CustomHooks/ApiHook';
import { scrollToTop } from './Helper';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchFooterMenu, fetchContactInfo, fetchTelephone, fetchOpeningHours } from '../reducers/footerSlice';
// import { useParams } from 'react-router-dom';

import FaceIco from '../images/facebook.webp'
import InstaIco from '../images/instagram.webp'
import YoutIco from '../images/youtube.webp'
import LinkedIco from '../images/linkedin.webp'


const API = process.env.REACT_APP_API_URL

const Footer = () => {
    const imgNameWithPath1 = "/assets/images/right-arrow.webp"
    const [currentLanguage, urlLanguage] = ApiHook();
    const [footerMeduData, setFooterMeduData] = useState();
    const [contactInfoData, setContactInfoData] = useState();
    const [telephoneData, setTelephoneData] = useState();
    const [openingHourData, setOpeningHourData] = useState();
    const [footClass, setFootClass] = useState('');

    let languageCode = 'en';
    let facebookPageURL='';
    const { t } = useTranslation();
    useDynamicLanguage();

    // useEffect(() => {
    // dispatch(fetchFooterMenu());
    // dispatch(fetchContactInfo());
    // dispatch(fetchTelephone());
    // dispatch(fetchOpeningHours());
    // }, [dispatch, lang])

    const addExtraClass = () => {
        var _class = '';

        if(window.location.href.includes('thank-you')) {
            _class = ' thank-you-footer';
        }

        setFootClass(_class);
    }

    useEffect(() => {
        addExtraClass();
        // Menu links
        fetch(`${API}menuitem/footer/${currentLanguage}`)
            .then(response => {
                if (!response.ok) {
                    console.log(`HTTP error! Status: ${response.status}`);
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setFooterMeduData(data)
            })
            .catch(error => {
                console.log('Fetch error:', error);
            });

        //   Contact info
        fetch(`${API}contactinfo/filter/${currentLanguage}`)
            .then(response => {
                if (!response.ok) {
                    console.log(`HTTP error! Status: ${response.status}`);
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setContactInfoData(data)
                // console.log("data---------",data);
            })
            .catch(error => {
                console.log('Fetch error:', error);
            });

        // Telephone info
        fetch(`${API}telephonewidget/filter/${currentLanguage}`)
            .then(response => {
                if (!response.ok) {
                    console.log(`HTTP error! Status: ${response.status}`);
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setTelephoneData(data)
                // console.log("data---------", data);
            })
            .catch(error => {
                console.log('Fetch error:', error);
            });

        // Open hour 
        fetch(`${API}openinghourswidget/filter/${currentLanguage}`)
            .then(response => {
                if (!response.ok) {
                    console.log(`HTTP error! Status: ${response.status}`);
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setOpeningHourData(data)
            })
            .catch(error => {
                console.log('Fetch error:', error);
            });
    }, [currentLanguage]);

    switch (currentLanguage) {
        case 'en_SG':
            languageCode = 'en';
            break;  
        case 'en_MY':
            languageCode = 'my';
            break;  
        case 'en_US':
            languageCode = 'en';
            break;
        case 'es_ES':
            languageCode = 'es';
            break;
        case 'fr_FR':
            languageCode = 'fr';
            break;
        case 'id_ID':
            languageCode = 'id';
            break;
        case 'it_IT':
            languageCode = 'it';
            break;
        case 'es_MX':
            languageCode = 'es';
            break;
        case 'de_DE':
            languageCode = 'de';
            break;
        case 'zh_CN':
            languageCode = 'cn';
            break;
        case 'zh_HK':
            languageCode = 'hk';
            break;
        case 'ja_JP':
            languageCode = 'jp';
            break;
        default :
            languageCode = 'en';
        // Default code for unknown language
    }

    if( languageCode == 'en'){
        facebookPageURL = 'https://www.facebook.com/scoliolife';
    } else {
        facebookPageURL = 'https://www.facebook.com/scoliolife.' + languageCode;
    }
console.log(currentLanguage)
console.log(facebookPageURL)
    return (
        <Fragment>
            <div className={`footer-section${footClass}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="quick-links">
                                <h3>{t('bottom-footer.quick_link')}</h3>
                                <ul>
                                    {(footerMeduData && footerMeduData.length) &&
                                        footerMeduData[0].items.map(item => (
                                            <div className={`footer_menu ${(item.class) ? item.class : ''}`} key={item.id}>
                                                {(item.child_recursive && item.child_recursive.length) ? (
                                                    item.child_recursive.map(childEle => (
                                                        <li key={childEle.id} className={`url-footer ${(childEle.class) ? childEle.class : ''}`}>
                                                            <img src={`${imgNameWithPath1}`} alt='right-arrow' />
                                                            <Link className="nav-link1" to={`${urlLanguage}/${childEle.link}`} onClick={scrollToTop}>{childEle.label}</Link>
                                                        </li>
                                                    ))
                                                ) : null}
                                            </div>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            {contactInfoData?.map((item1, index) => (
                                <div className="row mt-4 info" key={index}>
                                    <div className="col-sm-12">
                                        <div className="contact-info">
                                            <h3>{item1.title}</h3>
                                            <div className="location-discription time-discription">
                                                <img src={item1.photo} alt='item-photo' />
                                                <p dangerouslySetInnerHTML={{ __html: item1.description }}>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {(telephoneData && telephoneData.length) ? (
                                (typeof telephoneData === 'object' && telephoneData instanceof Array) ? (
                                    telephoneData?.map((item1, index) => {
                                        return (
                                            <TelephoneView {...item1} key={index} />
                                        )
                                    })
                                ) : (
                                    <TelephoneView {...telephoneData} />
                                )
                            ) : null}

                            {openingHourData?.map((item1, index) => (
                                <div className="row mt-4" key={index}>
                                    <div className="col-sm-12">
                                        <div className="contact-info">
                                            <h3>{item1.title}</h3>
                                            <div className="location-discription time-discription">
                                                <img src={item1.photo} alt={item1.title} className='open-hour' />
                                                <p dangerouslySetInnerHTML={{ __html: item1.description }}></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-sm-4">
                            <div className="facebook-dis">
                                <h3>{t('footer-section.facebook')}</h3>
                                <iframe
                                    name="f13a2655a47217"
                                    width="500px"
                                    height="380px"
                                    ata-testid="fb:page Facebook Social Plugin"
                                    title="fb:page Facebook Social Plugin"
                                    frameBorder="0"
                                    allowtransparency="true"
                                    allowFullScreen="allowFullScreen"
                                    allow="encrypted-media"
                                    src={`https://www.facebook.com/v2.5/plugins/page.php?adapt_container_width=true&app_id=&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df318a4edf11138%26domain%3Dscoliolife.com%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fscoliolife.com%252Ffb1839846f28e4%26relation%3Dparent.parent&container_width=400&height=380&hide_cover=true&href=${encodeURIComponent(facebookPageURL)}&locale=en_GB&sdk=joey&show_facepile=false&small_header=true&tabs=timeline&width=500`}
                                    style={{ border: "none", visibility: "visible", width: "400px", height: "380px" }}
                                    className=""
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <p className="text-center">Developed with ♥ by RND Experts</p> */}
            </div>

        </Fragment>
    )
}

const TelephoneView = (props) => {
    const { photo, title, description } = props;
    const telephone = description.split(',');

    const stripHtmlTags = (html) => {
        return html.replace(/<[^>]*>?/gm, '');
    }

    return (
        <div className="row mt-4">
            <div className="col-sm-12">
                <div className="contact-info">
                    <h3>{title}</h3>
                    <div className="location-discription time-discription">
                        <img src={photo} alt={title} />
                        <p>
                            {telephone.map((tel, i) => (
                                <p>
                                <a
                                    key={tel}
                                    href={`tel:${stripHtmlTags(tel)}`}
                                    dangerouslySetInnerHTML={{ __html: tel }}
                                />
                                </p>
                            ))}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;