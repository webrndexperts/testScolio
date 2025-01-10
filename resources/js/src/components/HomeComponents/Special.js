import React, { useState, useEffect, useMemo, useRef } from 'react';
import SpecialImg from '../../images/knee.webp';
import TreatedImg from '../../images/Scoliosis-Treated.webp';
import BracedImg from '../../images/Braced.webp';
import WorldwideImg from '../../images/Worldwide.webp';
import ProductImg from '../../images/Products.webp';
import { fetchSpecial } from '../../reducers/homeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectLanguage, setLanguage } from '../../reducers/languageSlice';
import { useDynamicLanguage } from '../../i18n';
import { useTranslation } from 'react-i18next';
export default function Special() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { specialData } = useSelector((state) => state.special);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [numTreated, setNumTreated] = useState(0);
    const [numBraced, setNumBraced] = useState(0);
    const [numOverseasTreated, setNumOverseasTreated] = useState(0);
    const [numProductSold, setNumProductSold] = useState(0);
    useDynamicLanguage();
    const { lang, slug } = useParams();
    const navigate = useNavigate();
 
    const currentLanguage = useSelector(selectLanguage);
    useEffect(() => {
        dispatch(fetchSpecial());
    }, [dispatch, lang]);

    const API = useMemo(() => `${process.env.REACT_APP_API_URL}specailoffer`, []);
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setIsDataLoaded(true);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, [API]);

    useEffect(() => {
        if (!isDataLoaded) {
            animateCount(setNumTreated, 2034);
            animateCount(setNumBraced, 1403);
            animateCount(setNumOverseasTreated, 874);
            animateCount(setNumProductSold, 5623);
        }
    }, []);

    const animateCount = (setter, countTo) => {
        const duration = 500; // milliseconds
        const start = 0;
        const stepTime = Math.abs(Math.floor(duration / countTo));
        const increment = countTo > start ? 1 : -1;

        let current = start;
        const timer = setInterval(() => {
            current += increment;
            setter(current);
            if (current === countTo) {
                clearInterval(timer);
            }
        }, stepTime);
    };

    const getImageData = (language) => {
        switch (language) {
            case 'en_SG':
                return {
                    imgbanner: '/specialOfferImages/NewPatientOfferEN.png',
                };
            case 'en_MY':
                return {
                    imgbanner: '/specialOfferImages/NewPatientOfferMY.png',
                };
            case 'es_ES':
                return {
                    imgbanner: '/specialOfferImages/NewPatientOfferES.png',
                };
            case 'fr_FR':
                return {
                    imgbanner: '/specialOfferImages/NewPatientOfferFR.png',
                
                };
            case 'id_ID':
                return {
                    imgbanner: '/specialOfferImages/NewPatientOfferID.png',
                };
            case 'it_IT':
                return {
                    imgbanner: '/specialOfferImages/NewPatientOfferIT.png',
                };
            case 'de_DE':
                return {
                    imgbanner: '/specialOfferImages/NewPatientOfferDE.png',
            };    
            case 'es_MX':
                return {
                    imgbanner: '/specialOfferImages/NewPatientOfferES.png',
                };
            case 'zh_CN':
                return {
                    imgbanner: '/specialOfferImages/NewPatientOfferCS.png',
                };
            case 'zh_HK':
                return {
                    imgbanner: '/specialOfferImages/NewPatientOfferCT.png',
                  
                };
            case 'ja_JP':
                return {
                    imgbanner: '/specialOfferImages/NewPatientOfferJP.png',
                };
            default:
                return {
                    imgbanner: '/specialOfferImages/NewPatientOfferEN.png',
                };
        }
    };

  
    const { imgbanner} = getImageData(currentLanguage);


    return (
        <>
            <div className="special-offer"  style={{ backgroundImage: `url(${SpecialImg})` }}>
                <div className="container-fluid">
                    <div className="row">
                        {
                            specialData?.map((image, index) => (
                                <div key={index} className="col-sm-6">
                                    <div className="special-offer-image">
                                        <img src={imgbanner} alt={imgbanner} loading="lazy" />
                                    </div>
                                </div>
                            ))
                        }
                        <div className="col-sm-6">
                            {specialData?.map((item, index) => (
                                <div key={index} className="special-offer-box" data-aos="fade-right" >
                                    <h2>{item.title}</h2>
                                    <ul>
                                        <li><div dangerouslySetInnerHTML={{ __html: item.description }} /></li>
                                    </ul>
                                </div>
                            ))}
                            <div className="counter" data-aos="fade-left">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="content">
                                            <div className="counter-box">
                                                <div className="counter-icon-box">
                                                    <img src="/Scoliosis Treated/Treated.webp" alt='Treated.webp' />
                                                </div>
                                                <div className="counter-dis-box">
                                                    <div className="value" >{numTreated}</div>
                                                    <p> {t('specials.treated')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="content">
                                            <div className="counter-box">
                                                <div className="counter-icon-box">
                                                    <img src="/Scoliosis Treated/Braced.webp" alt='Braced.webp' />
                                                </div>
                                                <div className="counter-dis-box">
                                                    <div className="value" >{numBraced}</div>
                                                    <p> {t('specials.braced')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row counter-row-2 mt-5">
                                    <div className="col-sm-6">
                                        <div className="content">
                                            <div className="counter-box">
                                                <div className="counter-icon-box">
                                                    <img src="/Scoliosis Treated/Worldwide.webp" alt='Worldwide.webp' />
                                                </div>
                                                <div className="counter-dis-box">
                                                    <div className="value" >{numOverseasTreated}</div>
                                                    <p> {t('specials.oversea_treated')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="content">
                                            <div className="counter-box counter-box45">
                                                <div className="counter-icon-box">
                                                    <img src="/Scoliosis Treated/Products.webp" alt='Products.webp' />
                                                </div>
                                                <div className="counter-dis-box">
                                                    <div className="value" >{numProductSold}</div>
                                                    <p> {t('specials.product_sold')} </p>
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

