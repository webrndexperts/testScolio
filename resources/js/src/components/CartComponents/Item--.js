
import React,{ useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { addToCart } from '../../reducers/cartSlice';
import { useDispatch,useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ApiHook from '../CustomHooks/ApiHook';
import { useTranslation } from 'react-i18next';
const Item = (props) => {
    const {
        id,slug, title, image, price,quantity,dimension_height,dimension_length,dimension_weight,
        product_actual_weight,product_type,lang,productType, buttonDisabled, disabled, onCartClick,
        userData, consultationSize = null
    } = props;

    const navigate = useNavigate();
    const {cart}=useSelector((state)=>state.cart)
    const dispatch = useDispatch()
    const [currentLanguage, urlLanguage] = ApiHook();
    const { t } = useTranslation();
    const [buttonUrl, setButtonUrl] = useState('https://calendar.app.google/7VnE6mQMV3kp5rSs7');


    useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cart));
    },[cart])

   
    const addItemToCart = () => {
        // if()
        dispatch(addToCart({
            id, title, image, price,slug,quantity,dimension_height,dimension_length,dimension_weight,product_actual_weight,product_type,lang,productType
        }));
        navigate(`${urlLanguage}/cart`)
     }
    const handleClick = () => {
        navigate(`${urlLanguage}/product/${userData}`)
    };

    useEffect(() => {
        if(consultationSize) {
            var _url = 'https://calendar.app.google/7VnE6mQMV3kp5rSs7';
            if(
                consultationSize == 'Follow Up Teleconsultation (Zoom or Meet)' ||
                consultationSize == 'Folge-Telekonsultation (Zoom oder Meet)' ||
                consultationSize == 'Téléconsultation de suivi (Zoom ou Meet)' ||
                consultationSize == 'Teleconsulta de seguimiento (Zoom o Meet)' ||
                consultationSize == 'Teleconsulenza di follow-up (Zoom o Meet)' ||
                consultationSize == 'Konsultasi Daring Lanjutan (Zoom atau Meet)' ||
                consultationSize == '跟进远程咨询（Zoom或Meet）' ||
                consultationSize == '跟進遠程諮詢（Zoom或Meet）'
            ) {
                _url = 'https://calendar.app.google/zMXutDLCVH4Yb1Tp8';
            }
            setButtonUrl(_url);
        }
    }, [consultationSize])

    return (
        <div>
            {(price || price > 0) ? (
                (slug == 'skype-zoom-consultation' || id == '74') ? (
                    <Link
                        className="btn btn-primary"
                        role="button"
                        to={buttonUrl}
                        target="_blank"
                    >
                        {t('top-header.Book Consultation')}
                    </Link>
                ) : (
                    <button className='btn btn-primary'
                        // onClick={handleClick} >Add to Cart
                        onClick={onCartClick} >{t("product_dropdown.add_to_cart")}
                    </button>
                )
            ) : (
                <Link className="btn btn-primary" to={`${urlLanguage}/contact-us`}>
                    {t("product_dropdown.contact_us")}
                </Link>
            )}
        </div>
    )
}

export default Item
