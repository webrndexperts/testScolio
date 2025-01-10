import React, { useEffect, useState } from 'react'
import { useDynamicLanguage } from '../i18n';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage, setLanguage, selectUrlLanguage, setUrlLanguage } from '../reducers/languageSlice';
import MetaCreator from '../components/MetaCreator';

export default function ScolioLife() {

    useDynamicLanguage();
    const { lang,slug } = useParams();
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const currentLanguage = useSelector(selectLanguage);
    const urlLanguage = useSelector(selectUrlLanguage);
    const dispatch = useDispatch();
    const [metaProps, setMetaProps] = useState(null);

    // https://rndexperts.in/backend-laravel/api/v1/pages/about-scoliolife/filter/zh_CN
    const API = process.env.REACT_APP_API_URL +`pages/${slug}/filter/${currentLanguage}`;
    
    const [data, setData] = useState({});

    useEffect(() => {
        const navigateToAboutUS = () => {
            navigate(`${urlLanguage}/about-scoliolife`);
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
    }, [i18n.language, currentLanguage, dispatch, navigate, lang]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setData(data);

                let _metaProps = {
                    tags: (data && data.seo_meta_tag) ? data.seo_meta_tag : '',
                    title: (data && responseData.seo_meta_title) ? data.seo_meta_title : '',
                    description: (data && data.seo_meta_description) ? data.seo_meta_description : '',
                }

                setMetaProps(_metaProps);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, [API]);


  return (
    <>
        <MetaCreator {...metaProps} />
        <h1>{data?.title || "Title not available"}</h1>
        <div dangerouslySetInnerHTML={{ __html: data?.description || "Description not available" }} />
    </>
  )
}
