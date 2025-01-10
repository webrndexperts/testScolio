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

function Chiro() {
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
   
    // Define getImageData function before it's used
    const getImageData = (language) => {
        switch (language) {
            case 'en_SG':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/04/Chiropractic-FAQ-EN-1-1.webp',
                    title: 'Chiropractic Faq',
                    maintitle: 'CHIROPRACTIC FAQ'
                };
            case 'es_ES':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/01/Chiropractic-FAQ-ES.png',
                    title: 'Chiropractic Faq',
                    maintitle: 'PREGUNTAS FRECUENTES SOBRE QUIROPRÁCTICA'

                };
            case 'fr_FR':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/01/Chiropractic-FAQ-FR.webp',
                    title: 'FAQ Sur La Chiropraxie',
                    maintitle: 'FAQ SUR LA CHIROPRAXIE'
                };
            case 'id_ID':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/01/Chiropractic-FAQ-ID.png',
                    title: 'Faq Kiropraktik',
                    maintitle: 'FAQ KIROPRAKTIK'
                };
                case 'de_DE':
                    return {
                        imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/01/Chiropractic-FAQ-DE.webp',
                        title: 'Häufig gestellte Fragen zur Chiropraktik',
                        maintitle: 'CHIROPRACTIC FAQ'
                    };
            case ' it_IT':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/01/Chiropractic-FAQ-IT.webp',
                    title: 'DOMANDE FREQUENTI SULLA CHIROPRATICA',
                    maintitle: 'DOMANDE FREQUENTI SULLA CHIROPRATICA'
                };
            case 'es_MX':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/01/Chiropractic-FAQ-ES.png',
                    title: 'Chiropractic Faq',
                    maintitle: 'PREGUNTAS FRECUENTES SOBRE QUIROPRÁCTICA'
                };
            case 'zh_CN':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/01/Chiropractic-FAQ-CS.webp',
                    title: '整脊治疗 常见问题',
                    maintitle: '整脊治疗 常见问题'
                };
            case 'zh_HK':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/01/Chiropractic-FAQ-CT.webp',
                    title: '整脊治療 常見問題',
                    maintitle: '整脊治療 常見問題'
                };
            case 'ja_JP':
                return {
                    imageUrl: '/media-apperence/Media-Appearance-JP.webp',
                    title: 'カイロプラクティックに関するよくある質問',
                    maintitle: 'カイロプラクティックに関するよくある質問'
                };
            default:
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/04/Chiropractic-FAQ-EN-1-1.webp',
                    title: 'Chiropractic Faq',
                    maintitle: 'CHIROPRACTIC FAQ'
                };
        }
    };

    useEffect(() => {
        const navigateToAboutUS = () => {
            navigate(`${urlLanguage}/chiropractic-faq`);
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

    const API = process.env.REACT_APP_API_URL + `accordions-pages/chiropractic-faq/${currentLanguage}`;
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
                                <img loading="lazy" decoding="async" width="660" height="390" src={imageUrl} alt='IMG' />
                            </div>
                        </div>
                        <div className="faq-sections">
                            <div className="container">
                                <h2>{title}</h2>
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
                        </div> </div> </div></div>
        </>
    );
}

export default Chiro;
