// Slife.js
import React, { useEffect, useState } from 'react';
import { HiMiniMinus, HiPlus } from 'react-icons/hi2';

import { selectLanguage, setLanguage, selectUrlLanguage, setUrlLanguage } from '../reducers/languageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useDynamicLanguage } from '../i18n';
import Sidebar from '../components/Sidebar';
import TopBanner from '../components/TopBanner';
import useDynamicTitle from '../hooks/useDynamicTitle';
import MetaCreator from '../components/MetaCreator';

function Slife() {
    useDynamicLanguage();
    const { lang } = useParams();
    // const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const currentLanguage = useSelector(selectLanguage);
    const urlLanguage = useSelector(selectUrlLanguage);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [openItemLeft, setOpenItemLeft] = useState(null);
    const [metaProps, setMetaProps] = useState(null);
   
    // Define getImageData function before useEffect
    const getImageData = (language) => {
        switch (language) {
            case 'en_SG':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/03/ScolioLife-FAQ-EN.webp',
                    title: 'Scoliolife™ Frequently Asked Questions',
                    maintitle: 'SCOLIOLIFE FAQ'
                };
            case 'es_ES':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/01/ScolioLife-FAQ-ES.png',
                    title: 'Preguntas Frecuentes Sobre Scoliolife™',
                    maintitle: 'PREGUNTAS FRECUENTES SOBRE SCOLIOLIFE™'

                };
            case 'fr_FR':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/01/ScolioLife-FAQ-FR.png',
                    title: 'Foire Aux Questions Sur Scoliolife™',
                    maintitle: 'FOIRE AUX QUESTIONS SUR SCOLIOLIFE™'
                };
            case 'id_ID':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/01/ScolioLife-FAQ-ID.png',
                    title: 'Scoliolife™ Pertanyaan Yang Sering Diajukan',
                    maintitle: 'SCOLIOLIFE ™ PERTANYAAN YANG SERING DIAJUKAN'
                };
            case ' it_IT':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/01/ScolioLife-FAQ-IT.webp',
                    title: 'Domande Frequenti Su Scoliolife™',
                    maintitle: 'DOMANDE FREQUENTI SU SCOLIOLIFE™'
                };
            case 'es_MX':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/04/ScolioLife-FAQ-ES.png',
                    title: 'Preguntas Frecuentes Sobre Scoliolife™',
                    maintitle: 'PREGUNTAS FRECUENTES SOBRE SCOLIOLIFE™'
                };
                case 'de_DE':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/03/ScolioLife-FAQ-DE.webp',
                    title: 'Häufig gestellte Fragen',
                    maintitle: 'PREGUNTAS FRECUENTES SOBRE SCOLIOLIFE™'
                };
            case 'zh_CN':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/04/ScolioLife-FAQ-CS.webp',
                    title: 'Scoliolife™常见问题',
                    maintitle: 'SCOLIOLIFE™ 常见问题'
                };
            case 'zh_HK':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/01/ScolioLife-FAQ-CT.webp',
                    title: 'SCOLIOLIFE™常見問題',
                    maintitle: 'SCOLIOLIFE™ 常見問題'
                };
            case 'ja_JP':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/01/ScolioLife-FAQ-JP.webp',
                    title: 'スコリオライフ™に関するよくある質問',
                    maintitle: 'スコリオライフ™に関するよくある質問'
                };
            default:
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/03/ScolioLife-FAQ-EN.webp',
                    title: 'Scoliolife™ Frequently Asked Questions',
                    maintitle: 'SCOLIOLIFE FAQ'
                };
        }
    };

    useEffect(() => {
        const navigateToAboutUS = () => {
            navigate(`${urlLanguage}/scoliolife-faq`);
        };

        if (typeof lang != 'undefined' && lang !== currentLanguage) {
            dispatch(setUrlLanguage(i18n.language));
            dispatch(setLanguage(i18n.language));
            navigateToAboutUS();
        }

        if(typeof lang == 'undefined') {
            dispatch(setUrlLanguage('en_US'));
            dispatch(setLanguage('en_US'));
            navigateToAboutUS();
        }
    }, [i18n.language, currentLanguage, dispatch, navigate, lang, urlLanguage]);
    
    // Retrieve image URL and title using getImageData function
    const { imageUrl, title, maintitle } = getImageData(currentLanguage);
    
    // Rest of your code remains unchanged
    const API = `${process.env.REACT_APP_API_URL}accordions-pages/scoliolife-faq/${currentLanguage}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const responseData = await response.json();
                setData(responseData);
             
                let _metaProps = {
                    tags: (responseData && responseData.seo_meta_tag) ? responseData.seo_meta_tag : '',
                    title: (responseData && responseData.seo_meta_title) ? responseData.seo_meta_title : '',
                    description: (responseData && responseData.seo_meta_description) ? responseData.seo_meta_description : '',
                  }
          
                  setMetaProps(_metaProps);
         
                // setIsLoading(false);
            } catch (error) {
                console.log('Error fetching data:', error);
                // setIsLoading(false);
            }
        };
        fetchData();
        
    }, [API]);

    // useDynamicTitle(maintitle);

    const toggleAccordion = (index) => {
        setOpenItemLeft((prevOpenItem) => (prevOpenItem === index ? null : index));
    };

    return (
        <>
            <TopBanner title={maintitle} />
            <MetaCreator {...metaProps} />
            <div className="about-section">
                <div className="container">
                    <Sidebar />
                    <div className='about'>
                    <div>
                        <div className="elementor-widget-container">
                            <img loading="lazy" decoding="async" width="660" height="390" src={imageUrl} alt="" />
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>
                                <div className="faq-sections">
                                    <div className="container">
                                        <h2>{title}</h2>
                                        <div className="elementor-element elementor-element-653ff25 elementor-widget elementor-widget-shortcode" data-id="653ff25" data-element_type="widget" data-widget_type="shortcode.default">
                                        <div className="accordion-single js-acc-single">
                                            {data.map((acc, index) => (
                                                <div
                                                    key={index}
                                                    className={`accordion-single-item js-acc-item ${openItemLeft === index ? 'is-open' : ''
                                                        }`}
                                                >
                                                    <h4
                                                        className="accordion-single-title js-acc-single-trigger"
                                                        onClick={() => toggleAccordion(index)}
                                                    >
                                                        {openItemLeft === index ? <HiMiniMinus /> : <HiPlus />}
                                                        {acc.title}
                                                    </h4>
                                                    <div className="accordion-single-content">
                                                        <div dangerouslySetInnerHTML={{ __html: acc.description }} />
                                                    </div>
                                                </div>
                                               
                                            ))}
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default Slife;
