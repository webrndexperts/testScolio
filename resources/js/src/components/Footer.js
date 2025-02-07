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
import { useSelector } from 'react-redux';


const API = process.env.REACT_APP_API_URL

const Footer = () => {
    const imgNameWithPath1 = "/assets/images/right-arrow.webp"
    const [currentLanguage, urlLanguage] = ApiHook();
    const [footerMeduData, setFooterMeduData] = useState();
    const [contactInfoData, setContactInfoData] = useState();
    const [telephoneData, setTelephoneData] = useState();
    const [openingHourData, setOpeningHourData] = useState();
    const [footClass, setFootClass] = useState('');
    const { contactData } = useSelector((state) => state.cart);
    const [scolioContact, setscolioContact] = useState(null);
    
    let languageCode = 'en';
    let facebookPageURL='';
    const { t } = useTranslation();
    useDynamicLanguage();
      useEffect(() => {
        if (contactData && contactData.id) {
          setscolioContact(contactData);
        }
      }, [contactData]);
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
                           

                                <WhatsappView {...scolioContact} />

                            

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
const WhatsappView = (props) => {
    const { whatsapp_number } = props;
    const formatWhatsAppNumber = (number) => {
        return number?.replace(/[\+\(\)\s]/g, "");
    };
    return (
        <div className="row mt-4">
            <div className="col-sm-12">
                <div className="contact-info">
                    <h3>WhatsApp</h3>
                    <div className="location-discription time-discription">
                        {/* <img src={photo} alt={title} /> */}
                        {/* <FaWhatsapp /> */}
                        <img
                            src={`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="%2325D366" d="M380.9 97.1c-41.5-41.5-96.6-64.3-155.1-64.3S112.2 55.6 70.7 97.1C29.2 138.6 6.4 193.7 6.4 252.2c0 40.1 11.5 79.3 33.1 113l-35.1 127.9 131.4-34.5c32 17.4 67.9 26.7 104.5 26.7 58.5 0 113.6-23 155.1-64.3 41.5-41.5 64.3-96.6 64.3-155.1s-22.8-113.6-64.3-155.1zm-12.3 297.5c-37.6 37.6-87.5 58.3-140.8 58.3-32.6 0-64.3-7.9-92.6-22.9l-6.6-3.6-77.7 20.5 20.8-75.7-4.3-7c-19.7-31.7-30.1-68.4-30.1-106c0-53.3 20.7-103.2 58.3-140.8s87.5-58.3 140.8-58.3 103.2 20.7 140.8 58.3 58.3 87.5 58.3 140.8-20.7 103.2-58.3 140.8zm-47.6-90.5c-4.2-2.1-24.8-12.3-28.6-13.7-3.9-1.4-6.7-2.1-9.5 2.1s-10.9 13.7-13.4 16.5-4.9 3.2-9 1.1c-4.2-2.1-17.6-6.5-33.5-20.8-12.4-11.1-20.8-24.9-23.2-29.1-2.4-4.2-.3-6.5 1.8-8.6 2.1-2.1 4.2-4.9 6.3-7.4 2.1-2.4 2.8-3.9 4.2-6.7s.7-5-0.4-7.4c-1.1-2.4-9.5-22.9-13-31.3-3.4-8.3-6.9-7.2-9.5-7.3-2.4-0.1-5-0.1-7.6-0.1s-7 1-10.7 5c-3.7 4.1-14 13.7-14 33.5s14.3 38.9 16.3 41.6c2.1 2.8 28.1 42.9 68.1 60.2 40.1 17.3 40.1 11.5 47.3 10.8 7.2-0.7 24.8-10.1 28.3-19.8 3.5-9.7 3.5-18 2.4-19.7-1.1-1.7-4.2-2.9-8.4-5z"/></svg>`
                            )}`}
                            alt="WhatsApp Icon"
                            style={{ width: 46, height: 46 }}
                        />
                        <p>
                            <a
                                target="_blank"
                                href={`https://api.whatsapp.com/send/?phone=${formatWhatsAppNumber(
                                    whatsapp_number
                                )}&text=Hello%21%0A%0A%2AFOR+NEW+PATIENT%2A%0AName%3A%0ARelation+%28if+inquirer+is+not+patient%29%3A%0A%0A%2AENQUIRY%3A%2A%0A&type=phone_number&app_absent=0`}
                                // href={`https://wa.me/${formatWhatsAppNumber(scolioContact?.whatsapp_number)}`}
                            >
                                {whatsapp_number}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;