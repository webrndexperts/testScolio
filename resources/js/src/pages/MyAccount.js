import React,{useEffect, useLayoutEffect} from 'react'
import { Link } from 'react-router-dom';
import ApiHook from '../components/CustomHooks/ApiHook';
import { useParams } from 'react-router-dom';
import { userLogin } from '../reducers/authSlice';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { scrollToTop } from '../components/Helper';
import { useTranslation } from "react-i18next";
import useDynamicTitle from '../hooks/useDynamicTitle';

const MyAccount = () => {
    const [currentLanguage, urlLanguage]=ApiHook();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {lang,slug}=useParams();
    const {authData}=useSelector((state)=>state.auth);
    // console.log("authData",authData);
    const { t } = useTranslation()

    useEffect(()=>{
        scrollToTop();
    },[])

    let data ={
        message: "User logout successfully.",
        success: false,
        user_id: null
    }

    const userLogout = ()=>{
        localStorage.removeItem('isLogin')
        localStorage.removeItem('userData')
        dispatch(userLogin(data))
        navigate(`/login`)
    }
useDynamicTitle(t('main-nav.MY ACCOUNT'))
    return (
        <>
            <div className="my-account">
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-3">
                            <nav className="woocommerce-MyAccount-navigation">
                                <ul>
                                    
                                    <li className="navigation-link--dashboard is-active"><i className="fa fa-angle-right" aria-hidden="true"></i>
                                        <Link to="/">{t('order_Information.Dashboard')}</Link>
                                    </li>
                                    <li className="navigation-link--orders_info"><i className="fa fa-angle-right" aria-hidden="true"></i>
                                    <Link to={`${urlLanguage}/order`}>{t('order_Information.Orders')}</Link>
                                 
                                    </li>
                                    {/* <li className="navigation-link--downloads"><i className="fa fa-angle-right" aria-hidden="true"></i>
                                        <Link to="">Downloads</Link>
                                    </li> */}
                                    {/* <li className="navigation-link--edit-address"><i className="fa fa-angle-right" aria-hidden="true"></i>
                                        <Link>Addresses</Link>
                                    </li>
                                    <li className="navigation-link--payment-methods"><i className="fa fa-angle-right" aria-hidden="true"></i>
                                        <Link to="">Payment methods</Link>
                                    </li> */}
                                    <li className="navigation-link--edit-account"><i className="fa fa-angle-right" aria-hidden="true"></i>
                                        <Link to={`${urlLanguage}/account-details`} >{t('order_Information.Account details')}</Link>
                                    </li>
                                    <li onClick={()=>userLogout()} className="navigation-link--customer-logout"><i className="fa fa-angle-right" aria-hidden="true"></i>
                                        <Link>{t('main-nav.Logout')}</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-md-9">
                            <div className="woocommerce-MyAccount-content">
                                <div className="woocommerce-notices-wrapper"></div>
                                <p>
                                    Hello <strong>{authData?.name}</strong> (not <strong>{authData?.name}</strong>? <span  onClick={()=>userLogout()}>{t('main-nav.Logout')}</span>)
                                </p>
                                <p>
                                    From your account dashboard you can view your <Link to={`${urlLanguage}/order`}>recent orders</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyAccount
