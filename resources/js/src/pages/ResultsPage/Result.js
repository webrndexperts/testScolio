import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next';
import Sidebar from '../../components/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import ApiHook from '../../components/CustomHooks/ApiHook';
import { useDispatch, useSelector } from 'react-redux';
import { fetchXrays } from '../../reducers/resultsSlices';
import ReactPlayer from 'react-player';
import Pagination from '../../components/Pagination';
import { toast } from 'react-toastify';
import { setLanguage, setUrlLanguage } from '../../reducers/languageSlice'; 
import TopBanner from '../../components/TopBanner';
import MetaCreator from '../../components/MetaCreator';


const API = process.env.REACT_APP_API_URL
const Result = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentLanguage, urlLanguage] = ApiHook();
  const dispatch = useDispatch();
  const { lang } = useParams();
  const [XrayData, setXrayData] = useState([]);
  const [XrayData2, setXrayData2] = useState([]);
  const [ageValue, setAgeValue] = useState('');
  
  const [metaProps, setMetaProps] = useState(null);
  
  const getVideoData = (language) => {
    switch (language) {
      case 'en_SG':
        return {
          videoUrl: 'https://youtu.be/yW21Lgc9VL0',

        };
      case 'es_ES':
        return {
          videoUrl: 'https://youtu.be/IRxv0wP129A',
        };
      case 'fr_FR':
        return {
          videoUrl: 'https://youtu.be/NfWyh6dtp4s',

        };
      case 'id_ID':
        return {
          videoUrl: 'https://youtu.be/8DsIVzubUMM',

        };
      case ' it_IT':
        return {
          videoUrl: 'https://youtu.be/0FHCy_Hm5Vs',

        };
      case 'es_MX':
        return {
          videoUrl: 'https://youtu.be/IRxv0wP129A',

        };
      case 'zh_CN':
        return {
          videoUrl: 'https://youtu.be/1VJgAvMWZHM',

        };
      case 'zh_HK':
        return {
          videoUrl: 'https://youtu.be/-j4T3oc9D8k',

        };
      case 'ja_JP':
        return {
          videoUrl: 'https://youtu.be/jzSHuy5k-kw',

        };
      default:
        return {
          videoUrl: 'https://youtu.be/yW21Lgc9VL0',

        };
    }
  };
  const { videoUrl } = getVideoData(currentLanguage);
  const { i18n } = useTranslation();
  const { slug } = useParams();
  useEffect(() => {
    const navigateToAboutUS = () => {
      navigate(`${urlLanguage}/results`);
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
  }, [i18n.language, currentLanguage, dispatch, navigate, lang, slug]);


  useEffect(() => {
    dispatch(fetchXrays())
  }, [lang, dispatch])
  // console.log("XrayData", XrayData);

  useEffect(() => {
    navigate(`${urlLanguage}/results`)
  }, [currentLanguage, navigate]);

  useEffect(() => {
    if(!ageValue) {
      fetch(`${API}xrays/filter/${currentLanguage}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          return response.json();
        })
        .then(data => {
          setXrayData(data)
          setXrayData2(data)
          let _metaProps = {
            tags: (data && data.seo_meta_tag) ? data.seo_meta_tag : '',
            title: (data && data.seo_meta_title) ? data.seo_meta_title : '',
            description: (data && data.seo_meta_description) ? data.seo_meta_description : '',
          }
  
          setMetaProps(_metaProps);

        })
        .catch(error => {
          console.log('Fetch error:', error);
        });
    } else {
      FilterByAge();
    }
  }, [currentLanguage, ageValue])

  const FilterByAge = async () => {
    console.log('event', ageValue);
    try {
      await fetch(`${API}xrays-dropdown-filter-age/${currentLanguage}/${ageValue}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (data.data.length) {
            setXrayData(data.data)
          } else {
            toast('Not available comming soon...');
            setXrayData([]);
            setXrayData(XrayData2)
          }
          
        })
        .catch(error => {
          console.log('Fetch error:', error);
        });
    } catch (error) {
      console.log('Fetch error:', error);
    }
  }

  const FilterByCurveDegree = async (event) => {
    console.log('event', event.target.value);
    try {
      await fetch(`${API}xrays-dropdown-filter-curve-degree/${event.target.value}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (data?.data?.length > 1) {
            setXrayData(data)
          } else {
            toast('No data found');
            setXrayData(XrayData2)
          }
          
        })
        .catch(error => {
          console.log('Fetch error:', error);
        });
    } catch (error) {
      console.log('Fetch error:', error);
    }
  }
  return (
    <>
      <TopBanner title={t("main-nav.X-RAY BEFORE & AFTER")} />
      <MetaCreator   {...metaProps} />
      <div className="container">
        <Sidebar></Sidebar>
        <div className='main-article'>
          <div className="row">
            {XrayData &&
              <div className='filterby-age dddd'>

                <select className='select-age' onChange={(e) => { setAgeValue(e.target.value) }} placeholder='filter by age'>
                  <option value=''>filter by age</option>
                  <option value='1-10'>1-10</option>
                  <option value='11-20'>11-20</option>
                  <option value='20-30'>20-30</option>
                  <option value='30-40'>30-40</option>
                  <option value='40-50'>40-50</option>
                  <option value='more'>50+</option>
                </select>


                {/*
                  <select className='select-age' onChange={FilterByAge} placeholder='filter by age'>
                    <option value=''>filter by age</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                    <option value='13'>13</option>
                    <option value='14'>14</option>
                  </select>
                  
                  <select className='select-Curve' onChange={FilterByCurveDegree}>
                    <option value=''>filter by curve_degree</option>
                    <option value='30'>30</option>
                    <option value='35'>35</option>
                    <option value='40'>40</option>
                    <option value='45'>45</option>
                    <option value='50'>50</option>
                  </select>
                */}
              </div>
            }
            <div className='results-videos'>
              <ReactPlayer
                // url={XrayData2.data ? XrayData2?.video_url : ""}
                // controls  
                loading="lazy" decoding="async" width="660" height="390" url={videoUrl}
              />
            </div>

            {(XrayData && XrayData.length) ? (
              <Pagination XrayData={XrayData} popup={true} slidable={true} showImage={true} />
            ) : (
              <div className="no-results">
                <p>{t("results.empty")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Result
