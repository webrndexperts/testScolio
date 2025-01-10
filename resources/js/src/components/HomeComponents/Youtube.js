// import planeImg from "../../images/plane-shape.png";
// import featuredImg from "../../images/feature-pattern.png";
import TakeLook from '../../images/Take-a-look.webp';
import ReactPlayer from 'react-player';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import ApiHook from '../../components/CustomHooks/ApiHook';
import { useDispatch, } from 'react-redux';
import { setLanguage, setUrlLanguage } from '../../reducers/languageSlice';


const Youtube = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [currentLanguage, urlLanguage] = ApiHook();
    const dispatch = useDispatch();
    const { lang } = useParams();


    const getVideoData = (language) => {
        switch (language) {
            case 'en_SG':
                return {
                    videoUrl: 'https://youtu.be/Gmclw_6zTEg',

                    imageUrl: "	https://sladmin.scoliolife.com/uploads/2023/08/Take-a-look-inside-our-clinic-300-x-200-px.png"
                };
            case 'es_ES':
                return {
                    videoUrl: 'https://youtu.be/HG_RW8GuOdE',
                    imageUrl: "https://sladmin.scoliolife.com/uploads/2023/08/Take-a-look-inside-our-clinic-ES.png"
                };
            case 'fr_FR':
                return {
                    videoUrl: 'https://youtu.be/a5fi98ELvls',
                    imageUrl: "	https://sladmin.scoliolife.com/uploads/2023/08/Take-a-look-inside-our-clinic-FR.png"
                };
            case 'id_ID':
                return {
                    videoUrl: 'https://youtu.be/RKRuP-cRGx8',
                    imageUrl: "https://sladmin.scoliolife.com/uploads/2023/08/Take-a-look-inside-our-clinic-ID.png"
                };
            case ' it_IT':
                return {
                    videoUrl: 'https://youtu.be/CYtcH6wRMeg',
                    imageUrl: "https://sladmin.scoliolife.com/uploads/2023/08/Take-a-look-inside-our-clinic-IT.png"
                };
            case 'es_MX':
                return {
                    videoUrl: 'https://youtu.be/HG_RW8GuOdE',
                    imageUrl: "	https://sladmin.scoliolife.com/uploads/2023/08/Take-a-look-inside-our-clinic-ES.png"
                };
            case 'zh_CN':
                return {
                    videoUrl: 'https://youtu.be/HEZqTIWOi10',
                    imageUrl: "https://sladmin.scoliolife.com/uploads/2023/09/Take-a-look-inside-our-clinic-CS.png"
                };
            case 'zh_HK':
                return {
                    videoUrl: 'https://youtu.be/Gk3-6-1XCt0',
                    imageUrl: "https://sladmin.scoliolife.com/uploads/2023/09/Take-a-look-inside-our-clinic-CT.png"
                };
            case 'ja_JP':
                return {
                    videoUrl: 'https://youtu.be/mAqoeh4JDGU',
                    imageUrl: "https://sladmin.scoliolife.com/uploads/2023/08/Take-a-look-inside-our-clinic-JP.png"
                };
                case 'de_DE':
                    return {
                        videoUrl: 'https://youtu.be/Xh5_YGWZBrg',
                        imageUrl: "https://sladmin.scoliolife.com/uploads/2023/08/Take-a-look-inside-our-clinic-DE.png"
                    };
            default:
                return {
                    videoUrl: 'https://youtu.be/Gmclw_6zTEg',

                    imageUrl: "	https://sladmin.scoliolife.com/uploads/2023/08/Take-a-look-inside-our-clinic-300-x-200-px.png"
                };
        }
    };
    const { videoUrl, imageUrl } = getVideoData(currentLanguage);
    const { i18n } = useTranslation();
    const { slug } = useParams();
    useEffect(() => {
        // const navigateToAboutUS = () => {
        //     navigate(`${urlLanguage}/`);
        // };

        // if (typeof lang != 'undefined' && lang !== currentLanguage) {
        //     dispatch(setUrlLanguage(i18n.language));
        //     dispatch(setLanguage(i18n.language));
        //     navigateToAboutUS();
        // }

        // if(typeof lang == 'undefined') {
        //     dispatch(setUrlLanguage('en_US'));
        //     dispatch(setLanguage('en_US'));
        //     navigateToAboutUS();
        // }
    }, [i18n.language, currentLanguage, dispatch, navigate, lang, slug]);


    useEffect(() => {
        // navigate(`${urlLanguage}/`)
    }, [currentLanguage, navigate]);



    return (

        <div className="video-section" data-aos="fade-up">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="video-wrapper">
                            <div className="image-video">
                                <img src={imageUrl} alt={imageUrl} />
                            </div>
                            <ReactPlayer
                                url={videoUrl}
                                controls
                                width="750px"
                                height="420px"
                            />
                            {/* <iframe width="750" height="420" src="https://www.youtube.com/embed/yjDWpPHmiWA" title="Scoliosis Treatment Singapore - Non-Surgical Scoliosis Clinic" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    )
}

export default Youtube
