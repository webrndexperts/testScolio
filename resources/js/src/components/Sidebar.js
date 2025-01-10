import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLanguage, selectUrlLanguage } from '../reducers/languageSlice';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL
const Sidebar = () => {
    const { t } = useTranslation();
    const { lang } = useParams();
    const currentLanguage = useSelector(selectLanguage);
    const urlLanguage = useSelector(selectUrlLanguage);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [topRatedProduct, setTopRatedProduct] = useState([]);

    // const API1 = process.env.REACT_APP_API_URL + "resultssidebar/filter/" + currentLanguage;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API}resultssidebar/filter/${currentLanguage}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                // console.log("resultssidebar===============", data);

                setData(data);

            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, [lang, currentLanguage]);
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await fetch(`${API}productcount_category/${currentLanguage}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // console.log("catagoryies===============", data);
                setCategoryData(data);
                // setData(data);

            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchCategory();
    }, [lang, currentLanguage]);
    useEffect(() => {
        const fetchTopRatedProducts = async () => {
            try {
                const response = await fetch(`${API}top-rated-reviewsproduct`);
                if (!response) {
                    throw new Error('Network response was not ok');
                }
                const fetchData = await response.json();
                setTopRatedProduct(fetchData)
                // console.log('fetchDAATA =', fetchData);
            } catch (error) {
                console.log('Error top rated api', error);
            }
        }
        fetchTopRatedProducts();
    }, [lang, currentLanguage])

    // const API2 = process.env.REACT_APP_API_URL + "ourpromisesidebar/filter/" + currentLanguage;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API}ourpromisesidebar/filter/${currentLanguage}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data1 = await response.json();
                // console.log("ourpromisesidebar===============", data);
                setData1(data1);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, [currentLanguage, lang]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API}bottomimagesidebar/filter/${currentLanguage}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data2 = await response.json();
                // console.log("ourpromisesidebar===============", data);
                setData2(data2);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, [currentLanguage, lang]);

    return (
        <>
            <div className="sidebar">
                <div className="sidebar-design">
                    <div className="sidebar-sec">

                        {data?.map((item, index) => (
                            <div key={index}>
                               <h2 className="widget-title">{t("widget-title.scolfoloio_heading")}</h2>
                                <div className="textwidget custom-html-widget">
                                    <div className="ads_scoliopillow_offers">
                                        <Link to={`${urlLanguage}/product/scoliosis-pillow`} rel="noopener">
                                            <img
                                                loading="lazy"
                                                src={item?.photo}
                                                style={{ width: "100%", height: "222px" }}
                                                alt=""
                                            />
                                        </Link>
                                        <div className="ads_scoliopillow_text"></div>
                                    </div>
                                </div>
                            </div>
                        ))}



                        <div className="textwidget custom-html-widget">

                            <ul className="product-categories">
                            <h2 className="widget-title">{t("widget-title.PRODUCT CATEGORIES")}</h2>
                                {categoryData &&
                                    categoryData?.map((item, index) => {
                                        return (
                                            <li className="cat-item cat-item-1590" key={item.id}><Link to={`${urlLanguage}/product-category/${item?.slug}`}>{item?.title}</Link> <span className="count">({`${item?.products[0]?.total_products ? item?.products[0]?.total_products : 0}`})</span></li>
                                            // <li className="cat-item cat-item-1590"><a href="/">{t("sidebar.Consultation")}</a> <span className="count">(2)</span></li>
                                            // <li className="cat-item cat-item-49"><a href="/">{t("sidebar.Scoliosis Books")}</a> <span className="count">(5)</span></li>
                                            // <li className="cat-item cat-item-46"><a href="/">{t("sidebar.Scoliosis Equipments")}</a> <span className="count">(12)</span></li>
                                            // <li className="cat-item cat-item-48"><a href="/">{t("sidebar.Scoliosis Videos")}</a> <span className="count">(2)</span></li>
                                            // <li className="cat-item cat-item-1291"><a href="/">{t("sidebar.Supplement")}</a> <span className="count">(1)</span></li>
                                        )
                                    })}
                            </ul>
                            {/* <h2 className="widget-title">Our promise</h2>
                            <div className="sidebar_promise_img">
                                <img src="https://sladmin.scoliolife.com/uploads/2022/12/Our-Promise-EN.png" alt='Our-Promise-EN.png' />
                            </div> */}

                            {data1?.map((item, index) => (
                                <div key={index}>
                                    <h2 className="widget-title">{item?.title}</h2>
                                    <div className="textwidget custom-html-widget">
                                        <div className="ads_scoliopillow_offers">
                                            <Link to="/" rel="noopener">
                                                <img
                                                    loading="lazy"
                                                    src={item?.photo}
                                                    style={{ width: "100%", height: "222px" }}
                                                    alt=""
                                                />
                                            </Link>
                                            <div className="ads_scoliopillow_text"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/*
                            <h2 className="widget-title">{t("sidebar.Top rated products")}</h2>
                            <ul className="product_list_widget">
                                {topRatedProduct?.map((item, index) => {
                                    return (
                                        <li>
                                            <Link to={`${urlLanguage}/${item?.slug}`}>
                                                <img loading="lazy" width="300" height="300" src={item?.photo} className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" decoding="async" sizes="(max-width: 300px) 100vw, 300px" /><span className="product-title">{item?.title}</span>
                                            </Link>
                                            <div className="star-rating" role="img" aria-label="Rated 5.00 out of 5"><span style={{ width: '100%' }}>{t("sidebar.Rated")} <strong className="rating">5.00</strong> {t("sidebar.out of")} 5</span></div>
                                            <span className="woocommerce-Price-amount amount"><bdi><span className="woocommerce-Price-currencySymbol">$</span>{item?.price}&nbsp;SGD</bdi></span>
                                        </li>
                                    )
                                })}
                                                                
                                <li>
                                    <a href="/">
                                        <img loading="lazy" width="300" height="300" src="https://scoliolife.com/uploads/2021/06/Zoom-Consult-300x300.png" className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" decoding="async" srcSet="https://scoliolife.com/uploads/2021/06/Zoom-Consult-300x300.png 300w, https://scoliolife.com/uploads/2021/06/Zoom-Consult-100x100.png 100w, https://scoliolife.com/uploads/2021/06/Zoom-Consult-600x600.png 600w, https://scoliolife.com/uploads/2021/06/Zoom-Consult-75x75.png 75w, https://scoliolife.com/uploads/2021/06/Zoom-Consult.png 900w" sizes="(max-width: 300px) 100vw, 300px" /> <span className="product-title">Online Teleconsultation</span>
                                    </a>
                                    <div className="star-rating" role="img" aria-label="Rated 5.00 out of 5"><span style={{ width: '100%' }}>{t("sidebar.Rated")} <strong className="rating">5.00</strong> {t("sidebar.out of")} 5</span></div>
                                    <span className="woocommerce-Price-amount amount"><bdi><span className="woocommerce-Price-currencySymbol">$</span>250.00&nbsp;SGD</bdi></span> – <span className="woocommerce-Price-amount amount"><bdi><span className="woocommerce-Price-currencySymbol">$</span>280.00&nbsp;SGD</bdi></span>
                                </li>
                                <li>
                                    <a href="/">
                                        <img loading="lazy" width="300" height="300" src="https://scoliolife.com/uploads/2019/05/Book5-EN-300x300.png" className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="Scoliosis Surgery Handbook" decoding="async" srcSet="https://scoliolife.com/uploads/2019/05/Book5-EN-300x300.png 300w, https://scoliolife.com/uploads/2019/05/Book5-EN-100x100.png 100w, https://scoliolife.com/uploads/2019/05/Book5-EN-600x600.png 600w, https://scoliolife.com/uploads/2019/05/Book5-EN-75x75.png 75w, https://scoliolife.com/uploads/2019/05/Book5-EN.png 900w" sizes="(max-width: 300px) 100vw, 300px" /> <span className="product-title" >Scoliosis Surgery Handbook</span>
                                    </a>
                                    <div className="star-rating" role="img" aria-label="Rated 5.00 out of 5"><span style={{ width: '100%' }}>{t("sidebar.Rated")} <strong className="rating">5.00</strong> {t("sidebar.out of")} 5</span></div>
                                    <span className="woocommerce-Price-amount amount"><bdi><span className="woocommerce-Price-currencySymbol">$</span>40.00&nbsp;SGD</bdi></span>
                                </li>
                                <li>
                                    <a href="/">
                                        <img loading="lazy" width="300" height="300" src="https://scoliolife.com/uploads/2022/12/Report-EN-300x300.png" className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" decoding="async" srcSet="https://scoliolife.com/uploads/2022/12/Report-EN-300x300.png 300w, https://scoliolife.com/uploads/2022/12/Report-EN-120x120.png 120w, https://scoliolife.com/uploads/2022/12/Report-EN-75x75.png 75w, https://scoliolife.com/uploads/2022/12/Report-EN-600x600.png 600w, https://scoliolife.com/uploads/2022/12/Report-EN-100x100.png 100w, https://scoliolife.com/uploads/2022/12/Report-EN.png 900w" sizes="(max-width: 300px) 100vw, 300px" /> <span className="product-title">X-Ray Report &amp; Analysis Service</span>
                                    </a>
                                    <div className="star-rating" role="img" aria-label="Rated 5.00 out of 5"><span style={{ width: '100%' }}>{t("sidebar.Rated")} <strong className="rating">5.00</strong> {t("sidebar.out of")} 5</span></div>
                                    <span className="woocommerce-Price-amount amount"><bdi><span className="woocommerce-Price-currencySymbol">$</span>80.00&nbsp;SGD</bdi></span>
                                </li>

                            </ul>
                            */}
                           
                            {data2?.map((item, index) => (
                                <div key={index}>
                                        <div className="ads_scoliopillow_offers">
                                            <Link to={`${urlLanguage}/${item?.slug}`} rel="noopener">
                                                <img
                                                    loading="lazy"
                                                    src={item?.photo}
                                                    style={{ width: "100%", height: "222px" }}
                                                    alt=""
                                                />
                                            </Link>
                                            <div className="ads_scoliopillow_text"></div>
                                        </div>
                                   
                                </div>
                            ))}
                            </div>
                        
                    </div>
                </div>
            </div>
        </> 

    );
};

export default Sidebar;
