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
    const { i18n, t } = useTranslation();
    const currentLanguage = useSelector(selectLanguage);
    const urlLanguage = useSelector(selectUrlLanguage);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [openItemLeft, setOpenItemLeft] = useState(null);
    const [metaProps, setMetaProps] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(10); // State for items per page

    // Helper function to get translated intent label
    const getIntentLabel = (intentName) => {
        if (!intentName || intents.length === 0) return intentName?.charAt(0).toUpperCase() + intentName?.slice(1);

        const intent = intents.find(i => i.name === intentName);
        if (!intent || !intent.label) return intentName?.charAt(0).toUpperCase() + intentName?.slice(1);
        const langCode = currentLanguage?.split('_')[0] || 'en';
        return intent.label[langCode] || (intentName?.charAt(0).toUpperCase() + intentName?.slice(1));
    };

    // Define getImageData function before useEffect
    const getImageData = (language) => {
        switch (language) {
            case 'en_SG':
                return {
                    imageUrl: 'https://scoliolife.com/uploads/2023/03/ScolioLife-FAQ-EN.webp',
                    title: 'Scoliolife™ Frequently Asked Questions',
                    maintitle: 'SCOLIOLIFE FAQ'
                };
            case 'es_ES':
                return {
                    imageUrl: 'https://scoliolife.com/uploads/2023/01/ScolioLife-FAQ-ES.png',
                    title: 'Preguntas Frecuentes Sobre Scoliolife™',
                    maintitle: 'PREGUNTAS FRECUENTES SOBRE SCOLIOLIFE™'

                };
            case 'fr_FR':
                return {
                    imageUrl: 'https://scoliolife.com/uploads/2023/01/ScolioLife-FAQ-FR.png',
                    title: 'Foire Aux Questions Sur Scoliolife™',
                    maintitle: 'FOIRE AUX QUESTIONS SUR SCOLIOLIFE™'
                };
            case 'id_ID':
                return {
                    imageUrl: 'https://scoliolife.com/uploads/2023/01/ScolioLife-FAQ-ID.png',
                    title: 'Scoliolife™ Pertanyaan Yang Sering Diajukan',
                    maintitle: 'SCOLIOLIFE ™ PERTANYAAN YANG SERING DIAJUKAN'
                };
            case ' it_IT':
                return {
                    imageUrl: 'https://scoliolife.com/uploads/2023/01/ScolioLife-FAQ-IT.webp',
                    title: 'Domande Frequenti Su Scoliolife™',
                    maintitle: 'DOMANDE FREQUENTI SU SCOLIOLIFE™'
                };
            case 'es_MX':
                return {
                    imageUrl: 'https://scoliolife.com/uploads/2023/04/ScolioLife-FAQ-ES.png',
                    title: 'Preguntas Frecuentes Sobre Scoliolife™',
                    maintitle: 'PREGUNTAS FRECUENTES SOBRE SCOLIOLIFE™'
                };
                case 'de_DE':
                return {
                    imageUrl: 'https://scoliolife.com/uploads/2023/03/ScolioLife-FAQ-DE.webp',
                    title: 'Häufig gestellte Fragen',
                    maintitle: 'PREGUNTAS FRECUENTES SOBRE SCOLIOLIFE™'
                };
            case 'zh_CN':
                return {
                    imageUrl: 'https://scoliolife.com/uploads/2023/04/ScolioLife-FAQ-CS.webp',
                    title: 'Scoliolife™常见问题',
                    maintitle: 'SCOLIOLIFE™ 常见问题'
                };
            case 'zh_HK':
                return {
                    imageUrl: 'https://scoliolife.com/uploads/2023/01/ScolioLife-FAQ-CT.webp',
                    title: 'SCOLIOLIFE™常見問題',
                    maintitle: 'SCOLIOLIFE™ 常見問題'
                };
            case 'ja_JP':
                return {
                    imageUrl: 'https://scoliolife.com/uploads/2023/01/ScolioLife-FAQ-JP.webp',
                    title: 'スコリオライフ™に関するよくある質問',
                    maintitle: 'スコリオライフ™に関するよくある質問'
                };
            default:
                return {
                    imageUrl: 'https://scoliolife.com/uploads/2023/03/ScolioLife-FAQ-EN.webp',
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
                setIsLoading(true);
                setData([]); // Clear previous data before setting new data
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
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
        
    }, [API]);

    // useDynamicTitle(maintitle);

    // Pagination logic
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);
    const [intents, setIntents] = useState([]);

    // Group paginatedData by intent (no re-ordering needed - API already returns ordered data)
    const getGroupedPaginatedData = () => {
        if (!paginatedData || paginatedData.length === 0) {
            return { grouped: {}, sorted: [] };
        }
        const grouped = {};
        const order = []; // Maintain order of appearance
        paginatedData.forEach((item, index) => {
            const intent = item?.intent_label || 'general';
            if (!grouped[intent]) {
                grouped[intent] = { items: [] };
                order.push(intent); // Track order of first appearance
            }
            grouped[intent].items.push({ ...item, index, globalIndex: startIndex + index });
        });
        // Return groups in order of appearance (no re-sorting)
        return { grouped, sorted: order };
    };

    const { grouped: intentGroups, sorted: intentOrder } = getGroupedPaginatedData();

    // Reset to first page when data or itemsPerPage changes
    useEffect(() => {
        setCurrentPage(1);
        setOpenItemLeft(null);
    }, [data, itemsPerPage]);

    const toggleAccordion = (index) => {
        const globalIndex = startIndex + index;
        setOpenItemLeft((prevOpenItem) => (prevOpenItem === globalIndex ? null : globalIndex));
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setOpenItemLeft(null);
    };

    // Generate smart pagination page numbers
    const generatePageNumbers = () => {
        const pages = [];
        const range = 2; // Show 2 pages on each side of current page
        
        // Always show page 1
        if (totalPages > 0) pages.push(1);
        
        // Calculate range around current page
        let start = Math.max(2, currentPage - range);
        let end = Math.min(totalPages - 1, currentPage + range);
        
        // Add left ellipsis if needed
        if (start > 2) pages.push('...');
        
        // Add pages in range
        for (let i = start; i <= end; i++) {
            if (!pages.includes(i)) pages.push(i);
        }
        
        // Add right ellipsis if needed
        if (end < totalPages - 1) pages.push('...');
        
        // Always show last page if more than one page
        if (totalPages > 1 && !pages.includes(totalPages)) {
            pages.push(totalPages);
        }
        
        return pages;
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
                                <img loading="lazy" decoding="async" src={imageUrl} alt={maintitle} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <div className="faq-sections">
                                        <div className="container">
                                            <h2>{title}</h2>
                                            <div className="elementor-element elementor-element-653ff25 elementor-widget elementor-widget-shortcode" data-id="653ff25" data-element_type="widget" data-widget_type="shortcode.default">

                                            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-start' }}>
                                                <select
                                                    disabled={isLoading || data.length === 0}
                                                    value={itemsPerPage}
                                                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                                    style={{
                                                        padding: '8px 10px',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        backgroundColor: '#fff',
                                                        color: '#333',
                                                        fontSize: '14px',
                                                        minWidth: '100px'
                                                    }}
                                                >
                                                    <option value={10}>{t('faq.pagination.show10')}</option>
                                                    <option value={20}>{t('faq.pagination.show20')}</option>
                                                    <option value={50}>{t('faq.pagination.show50')}</option>
                                                    <option value={data?.length}>{t('faq.pagination.showAll')}</option>
                                                </select>
                                            </div>

                                            {isLoading ? (
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 20px', minHeight: '400px' }}>
                                                    <div style={{ textAlign: 'center' }}>
                                                        <div className="d-flex justify-content-center align-items-center py-5">
                                                            <div
                                                                className="spinner-border"
                                                                role="status"
                                                                style={{ color: "#fba700" }}
                                                            >
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <style>{`
                                                        @keyframes spin {
                                                            0% { transform: rotate(0deg); }
                                                            100% { transform: rotate(360deg); }
                                                        }
                                                    `}</style>
                                                </div>
                                            ) : (
                                            <>
                                            <div id="faq-accordion-section" className="accordion-single js-acc-single">
                                                {intentOrder.map((intentKey) => (
                                                    <div key={intentKey} style={{ marginBottom: '30px' }}>
                                                        <h3 style={{ 
                                                            fontSize: '18px', 
                                                            fontWeight: '600', 
                                                            color: '#333', 
                                                            marginBottom: '15px', 
                                                            paddingBottom: '10px', 
                                                            borderBottom: '2px solid #ff9500'
                                                        }}>
                                                            {getIntentLabel(intentKey)}
                                                        </h3>
                                                        {intentGroups[intentKey].items.map((acc) => (
                                                            <div
                                                                key={acc.globalIndex}
                                                                className={`accordion-single-item js-acc-item ${openItemLeft === acc.globalIndex ? 'is-open' : ''}`}
                                                            >
                                                                <h4
                                                                    className="accordion-single-title js-acc-single-trigger"
                                                                    onClick={() => setOpenItemLeft((prevOpenItem) => (prevOpenItem === acc.globalIndex ? null : acc.globalIndex))}
                                                                >
                                                                    {openItemLeft === acc.globalIndex ? <HiMiniMinus /> : <HiPlus />}
                                                                    {acc.title}
                                                                </h4>
                                                                <div className="accordion-single-content">
                                                                    <div dangerouslySetInnerHTML={{ __html: acc.description }} />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                            {totalPages > 1 && (
                                                <div className="pagination-controls" style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                                    <button
                                                        onClick={() => handlePageChange(currentPage - 1)}
                                                        disabled={currentPage === 1}
                                                        style={{
                                                            padding: '8px 10px',
                                                            border: '1px solid #ddd',
                                                            borderRadius: '4px',
                                                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                                            opacity: currentPage === 1 ? 0.5 : 1,
                                                            backgroundColor: '#fff',
                                                            color: '#333',
                                                            fontSize: '14px'
                                                        }}
                                                    >
                                                        ‹
                                                    </button>
                                                    {generatePageNumbers().map((page, idx) => (
                                                        page === '...' ? (
                                                            <span key={`ellipsis-${idx}`} style={{ padding: '8px 4px', color: '#999' }}>
                                                                ...
                                                            </span>
                                                        ) : (
                                                            <button
                                                                key={page}
                                                                onClick={() => handlePageChange(page)}
                                                                style={{
                                                                    padding: '8px 10px',
                                                                    border: currentPage === page ? '1px solid #ff9500' : '1px solid #ddd',
                                                                    borderRadius: '4px',
                                                                    cursor: 'pointer',
                                                                    backgroundColor: currentPage === page ? '#ff9500' : '#fff',
                                                                    color: currentPage === page ? '#fff' : '#333',
                                                                    fontSize: '14px',
                                                                    fontWeight: currentPage === page ? 'bold' : 'normal',
                                                                    minWidth: '36px',
                                                                    textAlign: 'center'
                                                                }}
                                                            >
                                                                {page}
                                                            </button>
                                                        )
                                                    ))}
                                                    <button
                                                        onClick={() => handlePageChange(currentPage + 1)}
                                                        disabled={currentPage === totalPages}
                                                        style={{
                                                            padding: '8px 10px',
                                                            border: '1px solid #ddd',
                                                            borderRadius: '4px',
                                                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                                            opacity: currentPage === totalPages ? 0.5 : 1,
                                                            backgroundColor: '#fff',
                                                            color: '#333',
                                                            fontSize: '14px'
                                                        }}
                                                    >
                                                        ›
                                                    </button>
                                                </div>
                                            )}
                                            </>
                                            )}
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
