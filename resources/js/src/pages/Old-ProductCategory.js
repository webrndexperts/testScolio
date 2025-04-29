import React, { useEffect, useState, Fragment } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';

import Sidebar from '../components/Sidebar';
import ApiHook from '../components/CustomHooks/ApiHook';
import CurrencyConverter from '../components/CurrencyConverter';
import Rating from '../components/Rating';
import TopBanner from '../components/TopBanner';
import MetaCreator from '../components/MetaCreator';
import WishlistIcon from '../components/WishlistIcon';
import { addToDirectCart } from "../reducers/cartSlice";
import { scrollToTop } from "../components/Helper";


const ProductCategory = () => {
    const API = process.env.REACT_APP_API_URL
    const { slug, lang } = useParams();
    const dispatch = useDispatch();
    const [currentLanguage, urlLanguage] = ApiHook();
    const [categoryProducts,setCategoryProducts]=useState();
    const [categoryTitle, setCategoryTitle] = useState('');
    const [metaProps, setMetaProps] = useState(null);
    const { authData, authLogin } = useSelector((state) => state.auth);
 
    const navigate = useNavigate()
    const { t } = useTranslation();

    const onCartClick=(URL)=>{
        navigate(`${urlLanguage}/product/${URL}`)
    }

    /**
    * Function for Buy now and checkout directly for the product.
    * 
    * @return
    */
    const onBuyNowClick = async (prod) => {
        let itemData = {
            key: prod?.id,
            id: prod?.id,
            image: prod?.photo,
            title: prod?.title,
            price: (prod && prod.price) ? parseFloat(prod.price).toFixed(2) : 0,
            slug: prod?.slug,
            quantity: 1,
            dimension_height: prod?.dimension_height,
            dimension_length: prod?.dimension_length,
            dimension_weight: prod?.dimension_weight,
            product_actual_weight: prod?.product_actual_weight,
            product_type: prod?.product_type,
            lang: prod?.lang,
            productType: prod?.product_type,
            sku: prod?.product_sku,
            buttonDisabled: false,
            CustomizedImgage: ''
        }

        dispatch(addToDirectCart(itemData));
        scrollToTop();
        navigate(`${urlLanguage}/checkout`);
    }

    const getCategoryProducts = () => {
        scrollToTop();
        var params = (authData && authData.id) ? `?user=${authData?.id}` : ''

        fetch(`${API}products_by_category/${slug}${params}`).then(response => {
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
    }

    useEffect(() => {
        getCategoryProducts();
    }, [slug, currentLanguage, API, authData])

    useEffect(() => {
        if(currentLanguage != lang) {
            navigate(`${urlLanguage}/product-category/${slug}`);
        }
    }, [urlLanguage, currentLanguage, lang])

    // useDynamicTitle(categoryTitle);
    let wishProps = {
        t, currentLanguage
    }

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
                                    <WishlistIcon product={userData} {...wishProps} />

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

                                            <div 
                                                className={`shop-pg${(userData.product_type == 'simple-product') ? ' cart-buttons' : ''}`}
                                            >
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={()=>{onCartClick(userData.slug)}}
                                                >
                                                    {t("product_dropdown.add_to_cart")}
                                                </button>
                                                {(userData.product_type == 'simple-product') ? (
                                                    <button
                                                        className="btn btn-primary buy-btn"
                                                        onClick={()=>{onBuyNowClick(userData)}}
                                                    >
                                                        {t("product_dropdown.buy_now")}
                                                    </button>
                                                ) : null}
                                            </div>
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
