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

function Track() {
    useDynamicLanguage();
    const { lang } = useParams();
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const currentLanguage = useSelector(selectLanguage);
    const urlLanguage = useSelector(selectUrlLanguage);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [pageData, setPageData] = useState([]);
    const [openItemLeft, setOpenItemLeft] = useState(null);
    const [metaProps, setMetaProps] = useState(null);
  
    // Define getImageData function before it's used
    const getImageData = (language) => {
        switch (language) {
            case 'en_SG':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/04/ScolioTrack%20FAQ%20EN.webp',
                    title: 'Scoliotrack™ Frequently Asked Questions',
                    maintitle: 'SCOLIOTRACK FAQ'
                };
            case 'es_ES':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/04/ScolioTrack%20FAQ%20ES.webp',
                    maintitle: 'SCOLIOTRACK FAQ'

                };
            case 'fr_FR':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/04/ScolioTrack%20FAQ%20FR.webp',
                    title: 'Scoliotrack™ Foire Aux Questions',
                    maintitle: 'SCOLIOTRACK FAQ'
                };
            case 'de_DE':
                    return {
                        imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/04/ScolioTrack%20FAQ%20DE.webp',
                        title: 'Scoliotrack™ Häufig Gestellte Fragen',
                        maintitle: 'Häufig gestellte Fragen zu SCOLIOTRACK'
               };
            case 'id_ID':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/04/ScolioTrack%20FAQ%20ID.webp',
                    title: 'Scoliotrack™pertanyaan Yang Sering Diajukan',
                    maintitle: 'SCOLIOTRACK FAQ'
                };
            case ' it_IT':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/04/ScolioTrack%20FAQ%20IT.webp',
                    title: 'Scoliotrack™domande Frequenti',
                    maintitle: 'SCOLIOTRACK FAQ'
                };
            case 'es_MX':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/04/Chiropractic-FAQ-EN-1-2.webp',
                    title: 'Scoliotrack™preguntas Más Frecuentes',
                    maintitle: 'SCOLIOTRACK FAQ'
                };
            case 'zh_CN':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/04/ScolioTrack%20FAQ%20CS.webp',
                    title: 'Scoliotrack™pertanyaan Yang Sering Diajukan',
                    maintitle: 'SCOLIOTRACK FAQ'
                };
            case 'zh_HK':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/04/ScolioTrack%20FAQ%20CT.webp',
                    title: 'Scoliotrack™常問問題',
                    maintitle: 'SCOLIOTRACK FAQ'
                };
            case 'ja_JP':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/04/ScolioTrack%20FAQ%20JP.webp',
                    title: 'Scoliotrack™よくある質問',
                    maintitle: 'SCOLIOTRACK FAQ'
                };
            default:
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/04/ScolioTrack%20FAQ%20EN.webp',
                    title: 'Scoliotrack™ Frequently Asked Questions',
                    maintitle: 'SCOLIOTRACK FAQ'
                };
        }
    };

    useEffect(() => {
        const navigateToAboutUS = () => {
            navigate(`${urlLanguage}/scoliotrack-faq`);
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

    const getPageData = async () => {
        try {
            var _uri = `${process.env.REACT_APP_API_URL}pages/scoliotrack-faq-content/filter/${currentLanguage}`;
            const response = await fetch(_uri);
            if (!response.ok) {
                console.log("Network response was not ok");
            }
            const responseData = await response.json();
            setPageData(responseData);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    }

    const API = process.env.REACT_APP_API_URL + `accordions-pages/scoliotrack-faq/${currentLanguage}`;
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
                    tags: (responseData && responseData.seo_meta_tag) ? responseData.seo_meta_tag :title,
                    title: (responseData && responseData.seo_meta_title) ? responseData.seo_meta_title : '',
                    description: (responseData && responseData.seo_meta_description) ? responseData.seo_meta_description : '',
                  }
          
                  setMetaProps(_metaProps);
         
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
        fetchData();
        getPageData();
    }, [API]);

    // useDynamicTitle(title);

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
                    <div className="faq-sections ffggfgfgf">
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

                                <div
                                    className="row"
                                    dangerouslySetInnerHTML={{ __html: pageData?.description }}
                                />
                            </div>
                        </div>
                    </div> </div> </div></div>
        </>
    );
}

export default Track;
