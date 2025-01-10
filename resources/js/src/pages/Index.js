import React, { useEffect, useState } from 'react';
import NonTreatments from '../components/HomeComponents/NonTreatments';
import Faq from '../components/HomeComponents/Faq';
import Banner from '../components/HomeComponents/Banner';
import Benifits from '../components/HomeComponents/Benifits';
import Form from '../components/Form';
import Special from '../components/HomeComponents/Special';
import { useTranslation } from 'react-i18next';
import { useDynamicLanguage } from '../i18n';
import  { Helmet } from 'react-helmet';
import Youtube from '../components/HomeComponents/Youtube';
import Featured from '../components/HomeComponents/Featured';
import Subscribe from '../components/HomeComponents/Subscribe';
import ApiHook from '../components/CustomHooks/ApiHook';
import {  useNavigate, useParams } from 'react-router-dom';
import Discount from '../components/Discount';
import VideoSection from '../components/HomeComponents/VideoSection';
import SocialMetaTags from '../components/SocialMetaTags';

import { selectLanguage, setLanguage, selectUrlLanguage, setUrlLanguage } from '../reducers/languageSlice';
import { useDispatch, useSelector } from 'react-redux';
import MetaCreator from '../components/MetaCreator';


export default function Index() {
    const [currentLanguage, urlLanguage] = ApiHook();
    const navigate = useNavigate();
    const isModel = window.sessionStorage.getItem("discount");
    const { lang, slug } = useParams();
    const { i18n } = useTranslation();
    const dispatch = useDispatch();
    const [metaProps, setMetaProps] = useState(null);
    const API = process.env.REACT_APP_API_URL + `pages/home/filter/${currentLanguage}`;

    useDynamicLanguage();
   
    const navigateHomePage = () => {
        navigate(`${urlLanguage}`);
    };

    const fetchData = async () => {
        try {
            const response = await fetch(API);
            if (!response.ok) {
                return false;
            }
            const responseData = await response.json();

            let _metaProps = {
                tags: (responseData && responseData.seo_meta_tag) ? responseData.seo_meta_tag : '',
                title: (responseData && responseData.seo_meta_title) ? responseData.seo_meta_title : '',
                description: (responseData && responseData.seo_meta_description) ? responseData.seo_meta_description : '',
            }

            setMetaProps(_metaProps);
            return true;
        } catch (error) {
            console.log("Error fetching data:", error);
            return false;
        }
    }

    useEffect(() => {
        // if (i18n.language) {
        //     dispatch(setUrlLanguage(i18n.language));
        //     dispatch(setLanguage(i18n.language));
            navigateHomePage();
        // }
    }, [i18n.language]);

    useEffect(() => {
        fetchData();
    }, [API, currentLanguage])
    return (
        <>
            <MetaCreator  {...metaProps}/>
            <SocialMetaTags {...metaProps} />

            <Banner />
            <NonTreatments />
            <Special />
            {/* video section start here */}
            <Youtube />

            {/* video section end here */}
            {/* logo section start here */}
            <Featured />
            <VideoSection/>
            <Benifits />

            <Form />
            <Faq />
            {/* faq section end here */}
            {/* newsletter section start here */}
            <Subscribe />
            {/* {isModel === true || isModel === null ?
                <Discount />
                :
                false
            } */}
        </>
    )
}
