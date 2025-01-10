import React, { useState, Fragment, useEffect } from 'react'
import Sidebar from '../Sidebar';
import ReactStars from 'react-stars';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { rateReveiw } from '../../Api';
import { trimInputValues } from '../Helper';
import Rating from '../Rating';
import moment from 'moment';
import ApiHook from '../CustomHooks/ApiHook';
import SummaryShow from './SummaryShow';
import { useSelector } from "react-redux";
import LoaderIco from '../../images/button-loader.svg'
import AvtarIco from '../../images/icons/avtar-img.png'
// import CurrencyConverter from '../CurrencyConverter';

const ProductDes = ({ productDetail, onDataGet }) => {
    const [activeTab, setActiveTab] = useState('tab1');
    const { t } = useTranslation();
    const [currentLanguage, urlLanguage] = ApiHook();
    const attributesObject = productDetail?.attributes ? JSON.parse(productDetail.attributes) : {};
    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue: billingSetValue,
        formState: { errors }
    } = useForm();
    const [summaryText, setSummaryText] = useState('');
    const [loader, setLoader] = useState(false);
    const { authData } = useSelector((state) => state.auth);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }

    const generateValues = () => {
        if(activeTab == 'tab3') {
            billingSetValue('rate', 1);
            billingSetValue('user_name', authData?.name);
            billingSetValue('email_address', authData?.email);
        }
    }

    const ratingReview = async (data) => {
        data['user_id'] = (authData && authData.id) ? authData.id : '';
        data['product_id'] = productDetail?.id;
        data['status'] = 'active';

        setLoader(true);
        const trimData = trimInputValues(data);
        reset();

        rateReveiw(trimData).then((response) => {
            if (response) {
                onDataGet();
            }
            setLoader(false);
            generateValues();
        }).catch((error) => {
            console.log("Error in rating data:", error);
            setLoader(false);
            generateValues();
        });
    }


    const updateContactForm = () => {
        setSummaryText(productDetail.summary);
    }

    useEffect(() => {
        if(productDetail) {
            updateContactForm();
        }
    }, [productDetail])

    useEffect(() => {
        generateValues();
    }, [activeTab])

    return (
        <>
        <div className="container">
            <Sidebar />
            <div className='tabs-product'>
                <div className="tab-bg">
                <div className="tab-buttons">
                    <button onClick={() => handleTabClick('tab1')} className={activeTab === 'tab1' ? 'active' : ''}>
                    {t("single_product_tabs.description_tabs")}
                    </button>
                    <button onClick={() => handleTabClick('tab2')} className={activeTab === 'tab2' ? 'active' : ''}>
                        {t("single_product_tabs.additional_info_tabs")}
                    </button>
                    <button onClick={() => handleTabClick('tab3')} className={activeTab === 'tab3' ? 'active' : ''}>
                    {t("single_product_tabs.ratings_tabs")}
                    </button>
                </div>
                </div>

                <div className="tab-content">
                    {activeTab === 'tab1' &&
                        <div class="prod-first-tab">
                            {(summaryText.includes('[contact-form-7]')) ? (
                                <SummaryShow html={summaryText} />
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: summaryText }}></p>
                            )}
                        </div>}
                    {activeTab === 'tab2' &&
                        <div>
                            <h2>{t('product.information')}</h2>
                            <table className="table">
                                <tbody>
                                    {(productDetail?.product_actual_weight) ? (
                                         <tr>
                                            <th>{t('product.weights')}</th>
                                            <td>{productDetail?.product_actual_weight} g</td>
                                        </tr>
                                    ): null}

                                    {(productDetail?.dimension_length || productDetail?.dimension_height || productDetail?.dimension_weight ) ? (
                                        <tr>
                                            <th>{t('product.dimensions')}</th>
                                            <td>
                                                {(productDetail?.dimension_length) ? productDetail?.dimension_length : ''}

                                                {((productDetail?.dimension_length) && (productDetail?.dimension_height || productDetail?.dimension_weight)) ? " × " : ''}
                                                {(productDetail?.dimension_weight) ? productDetail?.dimension_weight : ''}
                                                
                                                {(productDetail?.dimension_weight && productDetail?.dimension_height) ? " × " : ''}
                                                {(productDetail?.dimension_height) ? productDetail?.dimension_height : ''} cm
                                            </td>
                                        </tr>
                                    ) :null}
                                </tbody>
                            </table>
                        </div>
                    }

                    {(activeTab === 'tab3') &&
                        <div className='rating-section'>
                            <div id="comments">
                                <h2 className="woocommerce-Reviews-title">
                                    {productDetail?.product_review?.length}{t('product.reviews')}<span>{productDetail?.title} </span>
                                </h2>

                                {productDetail?.product_review?.map((item) => {
                                    return (
                                        <ol className="commentlist" key={item.id}>
                                            <li className="review even thread-even depth-1" id="li-comment-161945">
                                                <div id="comment-161945" className="comment_container">
                                                    <img alt="" src={AvtarIco} className="avatar avatar-60 photo" height="60" width="60" decoding="async" />
                                                    <p className="meta">
                                                            <strong className="woocommerce-review__author">{item?.user_name}</strong>
                                                        </p>
                                                        <div className='star_design'>
                                                        <div className="star-rating" role="img" aria-label="Rated 5 out of 5"><Rating stars={item?.rate} /></div>
                                                        <span className="woocommerce-review__dash"></span> <time className="woocommerce-review__published-date" datetime="2023-06-27T03:02:19+00:00">{moment(item?.created_at).format('MMMM D, YYYY')}</time>
                                                   </div>
                                                        
                                                        {(item.review && item.review != 'null') ? (
                                                            <div className="description">
                                                                <p>{item.review}</p>
                                                            </div>
                                                        ) : null}
                                                    
                                                </div>
                                            </li>
                                        </ol>
                                    )
                                })}
                            </div>

                            <div id="review_form_wrapper">
                                <div id="review_form">
                                    <div id="respond" className="comment-respond">
                                        <span id="reply-title" className="comment-reply-title">{t('product.add_a_review')}</span>
                                        <form onSubmit={handleSubmit(ratingReview)}>
                                            <p>{t('product.marked_message')} *</p>
                                            <p className="comment-form-comment">
                                                <label for="comment">{t('product.your_ratting')}&nbsp;<span className="required">*</span></label>
                                                <Controller
                                                    control={control}
                                                    name="rate"
                                                    rules={{
                                                        required: 'Please enter your Rating',
                                                    }}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <ReactStars
                                                            count={5}
                                                            onChange={(newRating) => onChange(newRating)}
                                                            onBlur={onBlur}
                                                            size={24}
                                                            color2={'#f29f05'}
                                                            className="star-product"
                                                            value={value ? value : 0}
                                                        />
                                                    )}
                                                />
                                                {errors.rate && <p className='validations'>{errors.rate.message}</p>}
                                            </p>
                                            <p className="comment-form-comment">
                                                <label for="comment"> {t('product.your_review')}&nbsp;<span className="required">*</span></label>
                                                <textarea {...register('review')} id="comment" name="review" cols="45" rows="8"></textarea>
                                                {errors.review && <p className='validations'>{t('product.enter_review')} </p>}
                                                {/* {t("loginReg.Please enter your review.")} */}
                                            </p>
                                            <input name="wpml_language_code" type="hidden" value="en" />
                                            <p className="comment-form-author">
                                                <label for="author">{t('product.name')}&nbsp;<span className="required">*
                                                </span></label>
                                                <input {...register('user_name', { required: true })} id="author" name="user_name" type="text" size="30" />
                                                {errors.user_name && <p className='validations'>{t('product.error.name')}</p>}
                                            </p>
                                            <p className="comment-form-email">
                                                <label for="email">{t('product.email')}&nbsp;<span className="required">*</span></label>
                                                <input {...register('email_address', { required: true })} id="email" name="email_address" type="email" size="30" />
                                                {errors.email_address && <p className='validations'>{t('product.error.email')}</p>}
                                            </p>
                                            <p className="comment-form-cookies-consent">
                                                <input id="wp-comment-cookies-consent" name="wp-comment-cookies-consent" type="checkbox" value="yes" />
                                                <label for="wp-comment-cookies-consent">
                                                   {t('product.website_comment')}
                                                </label>
                                            </p>

                                             
                                            <button type="submit" className="submit-form" id="submit">
                                                <span>{t("passwords.forgot.submit")}</span>
                                                {(loader) ? (
                                                    <div className="btn-loader">
                                                        <img src={LoaderIco} alt="loader-button" />
                                                    </div>
                                                ) : null}
                                           
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
        </>
    )
}

export default ProductDes
