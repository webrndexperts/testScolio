import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import './Banner.css';
import banner from '../../images/banner.webp';
import Scolio from '../../images/Scoliosis-Treatment-topbanner.png'
import { Link } from 'react-router-dom';
import ApiHook from '../CustomHooks/ApiHook';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectLanguage, setLanguage, selectUrlLanguage, setUrlLanguage } from '../../reducers/languageSlice';
import { useDynamicLanguage } from '../../i18n';
export default function Banner() {
    useDynamicLanguage();
    const { lang, slug } = useParams();
    // const [currentLanguage]=ApiHook();
    const currentLanguage = useSelector(selectLanguage);
    const urlLanguage = useSelector(selectUrlLanguage);
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [data, setData] = useState([])
    const getImageData = (language) => {
        switch (language) {
            case 'en_SG':
                return {
                    Award1: '/homeLogo/Award-1-EN.webp',
                    Awrad2: '/homeLogo/Award-2-EN.webp'           
                };
            case 'es_ES':
                return {
                    Award1: '/homeLogo/Award-1-ES.webp',
                    Awrad2: '/homeLogo/Award-2-ES.webp'             

                };
            case 'fr_FR':
                return {
                    Award1: '/homeLogo/Award-1-ES.webp',
                    Awrad2: '/homeLogo/Award-2-FR.webp'     
                     };
            case 'id_ID':
                return {
                    Award1: '/homeLogo/Award-1-ID.webp',
                    Awrad2: '/homeLogo/Award-2-ID.webp'         
                };
            case ' it_IT':
                return {
                    Award1: '/homeLogo/Award-1-IT.webp',
                    Awrad2: '/homeLogo/Award-2-IT.webp'  
                        };
            case 'es_MX':
                return {
                    Award1: '/homeLogo/Award-1-ES.webp',
                    Awrad2: '/homeLogo/Award-2-ES.webp'    
                      };
            case 'zh_CN':
                return {
                    Award1: '/homeLogo/Award-1-CS.webp',
                    Awrad2: '/homeLogo/Award-2-CS.webp'      
                   };
            case 'zh_HK':
                return {
                    Award1: '/homeLogo/Award-1-CT.webp',
                    Awrad2: '/homeLogo/Award-2-CT.webp'    
                      };
            case 'ja_JP':
                return {
                    Award1: '/homeLogo/Award-1-JP.webp',
                   Awrad2: '/homeLogo/Award-2-JP.webp'  
                       };
            default:
                return {
                    Award1: '/homeLogo/Award-1-EN.webp',
                   Awrad2: '/homeLogo/Award-2-EN.webp'  
                       };
        }
    };

    useEffect(() => {
        // const navigateToAboutUS = () => {
        //     navigate(`${urlLanguage}/`);
        // };

        // if (typeof lang != 'undefined' && lang !== currentLanguage) {
        //     dispatch(setUrlLanguage(i18n.language));
        //     dispatch(setLanguage(i18n.language));
        //     navigateToAboutUS();
        // }

        // if(typeof lang == 'undefined') {
        //     dispatch(setUrlLanguage('en_US'));
        //     dispatch(setLanguage('en_US'));
        //     navigateToAboutUS();
        // }
    }, [i18n.language, currentLanguage, dispatch, navigate, lang, slug]);

    // Retrieve image URL and Awrad2ageData function
    const { Award1, Awrad2} = getImageData(currentLanguage);

    return (
        <>
            <div className="banner">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6" data-aos="fade-right">
                            <div className="banner-logo">
                                <img src={Award1} alt={Award1} />
                                <img src={Awrad2} alt={Awrad2} />
                            </div>
                            <div className="banner-left-discription">
                                <h4>{t('banner.straightenSpine')}</h4>
                                <h1 dangerouslySetInnerHTML={{__html: currentLanguage == 'en_MY' ? t('banner.sayGoodbyeMY') : t('banner.sayGoodbye')}} />
                                <Link to={`${urlLanguage}/scoliosis-treatment`} className="banner-btn">{t('banner.treatScoliosis')}</Link>
                                {/* <a href="/" className="banner-btn">{t('banner.treatScoliosis')}</a> */}
                            </div>
                        </div>
                        <div className="col-sm-6" data-aos="fade-left">
                            <div className="banner-right-image">
                                <img src={Scolio} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
