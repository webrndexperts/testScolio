import React, { useEffect, useState, Fragment } from 'react';
import Sidebar from '../components/Sidebar';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ApiHook from '../components/CustomHooks/ApiHook';
import CurrencyConverter from '../components/CurrencyConverter';
import Rating from '../components/Rating';
import TopBanner from '../components/TopBanner';
// import useDynamicTitle from '../hooks/useDynamicTitle';
import MetaCreator from '../components/MetaCreator';


const ProductCategory = () => {
    const API = process.env.REACT_APP_API_URL
    const { slug, lang } = useParams();
    const [currentLanguage, urlLanguage] = ApiHook();
    const [categoryProducts,setCategoryProducts]=useState();
    const [categoryTitle, setCategoryTitle] = useState('');
    const [metaProps, setMetaProps] = useState(null);
 
    const navigate = useNavigate()
    const { t } = useTranslation();

    const onCartClick=(URL)=>{
        navigate(`${urlLanguage}/product/${URL}`)
    }

    useEffect(() => {
        fetch(`${API}products_by_category/${slug}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`); 
                }
                return response.json();
            }).then(data => {
                setCategoryProducts(data)
                setCategoryTitle(data?.title);
                let _metaProps = {
                    tags: (data && data.seo_meta_tag) ? data.seo_meta_tag : '',
                    title: (data && data.seo_meta_title) ? data.seo_meta_title : '',
                    description: (data && data.seo_meta_description) ? data.seo_meta_description : '',
                  }
          
                  setMetaProps(_metaProps);
   
            }).catch(error => {
                console.log('Fetch error:', error);
            });

    }, [slug, currentLanguage,API])

    useEffect(() => {
        if(currentLanguage != lang) {
            navigate(`${urlLanguage}/product-category/${slug}`);
        }
    }, [urlLanguage, currentLanguage, lang])

    // useDynamicTitle(categoryTitle);

    return (
        <Fragment>
           <TopBanner title={categoryTitle} />
           <MetaCreator {...metaProps} />
            <div className="container">
                <Sidebar />

                <div className='shop-section'>
                    <div className="row">
                        {categoryProducts && categoryProducts.products && categoryProducts.products.map(userData =>  (
                            <div key={userData.id} className="col-sm-4">
                                <div className="shop-treatments">
                                    <Link to={`${urlLanguage}/product/${userData.slug}`}>
                                        <img src={userData.photo} alt={userData.photo} />
                                        <h3>{userData.title}</h3>
                                        <div className='price-shop'>
                                            <p className='price'>${parseFloat(userData.price).toFixed(2)} SGD</p>
                                            <p className='star'><Rating stars={4.5}/></p>
                                        </div>
                                        
                                        <CurrencyConverter currency={userData.price} />
                                    </Link>
                                    <div className="home__container">
                                        <div className="home__row">
                                            {(userData.price || userData.price > 0) ? (
                                                <button
                                                className="btn btn-primary"
                                                onClick={()=>{onCartClick(userData.slug)}}
                                                >
                                                    {t("product_dropdown.add_to_cart")}
                                                </button>
                                            ) : (
                                                <Link className="btn btn-primary" to={`${urlLanguage}/contact-us`}>
                                                    {t("contactUs.CONTACT US")}
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ProductCategory
