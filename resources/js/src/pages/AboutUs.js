import React, { useEffect, useState, Fragment } from "react";
import { selectLanguage, setLanguage, selectUrlLanguage, setUrlLanguage } from "../reducers/languageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, Navigate, useLocation } from "react-router-dom";
import $ from 'jquery';
import AOS from "aos";
import "aos/dist/aos.css";
import { useDynamicLanguage } from "../i18n";
import Sidebar from "../components/Sidebar";
import "./AboutUs.css";
import FranForm from "./FranForm";
import AppoitmentForm from "./AppointmentForm";
import CustomLinkTrigger from "../components/CustomLinkTrigger";
import useDynamicTitle from '../hooks/useDynamicTitle';
import { checkUrlRoute } from '../hooks/customFunctions';
import TopBanner from '../components/TopBanner';
import MetaCreator from '../components/MetaCreator';
import NotFoundPage from "./NotFoundPage";
import { render } from "@testing-library/react";
import { Helmet } from "react-helmet";


export default function AboutUs() {
  const { lang, slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [customTrigger, setCustomTrigger] = useState(true);
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLanguage = useSelector(selectLanguage);
  const urlLanguage = useSelector(selectUrlLanguage);
  const dispatch = useDispatch();
  let location = useLocation();

  const isSidebarHidden = ["company-history", "franchising"].includes(slug);
  const API = process.env.REACT_APP_API_URL + `pages/${slug}/filter/${currentLanguage}`;
  const [data, setData] = useState({});
  const [pageTitle, setPageTitle] = useState('');
  const [metaProps, setMetaProps] = useState(null);
  const [noDataFount, setNoDataFound] = useState(false);

  const triggerCustomFunction = () => {
    let audio = document.getElementById('pronounce_audio'),
    playButton = document.getElementById('scolio_pronounci_btn');

    if(playButton) {
      playButton.addEventListener('click', () => {
        audio.play();
      });
    }
  }

  const triggerCustomScript = () => {
    $(document).on('click', '.single-accordion h2', function(e) {
      let { parentElement } = this;

      if(parentElement) {
        var { lastElementChild } = parentElement;
        if(lastElementChild) {
          if(lastElementChild.classList.contains('hide-acc')) {
            lastElementChild.classList.remove('hide-acc');
            $(this).removeClass('open-icon');
          } else {
            lastElementChild.classList.add('hide-acc');
            $(this).addClass('open-icon');
          }
        }
      }
    });
  }

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      // Global settings:
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
      initClassName: "aos-init", // class applied after initialization
      animatedClassName: "aos-animate", // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 120, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 1200, // values from 0 to 3000, with step 50ms
      easing: "ease", // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them

      // Specify which elements you want to animate (optional)
      // selector: '.your-class',
    });
  }, []);

  useEffect(() => {
    const navigateToAboutUs = () => {
      navigate(`${urlLanguage}/${slug}`);
    };

    if (typeof lang != 'undefined' && lang !== currentLanguage) {
      dispatch(setUrlLanguage(i18n.language));
      dispatch(setLanguage(i18n.language));
      navigateToAboutUs();
    }

    if(typeof lang == 'undefined') {
      dispatch(setUrlLanguage('en_US'));
      dispatch(setLanguage('en_US'));
      navigateToAboutUs();
    }
  }, [i18n.language, currentLanguage, dispatch, navigate, lang, slug]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API);
       
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        
        if(responseData === 'null'){
          navigate('/')
          return;
        }

        setData(responseData);

        let _metaProps = {
          tags: (responseData && responseData.seo_meta_tag) ? responseData.seo_meta_tag : pageTitle,
          title: (responseData && responseData.seo_meta_title) ? responseData.seo_meta_title : '',
          description: (responseData && responseData.seo_meta_description) ? responseData.seo_meta_description : '',
        }

        setMetaProps(_metaProps);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [API]);

  useEffect(() => {
    if(data && data.title) {
      setPageTitle(data.title);
    }

    if(data && data.description) {
      setTimeout(function() {
        triggerCustomFunction();
      }, 2000)
    }
  }, [data])

  useEffect(() => {
    if(data && data.description && customTrigger) {
      setCustomTrigger(false);
      triggerCustomScript();
    }
  }, [data])

  // useDynamicTitle(pageTitle); 
  // wswswsawswswsdsadwsaswsasd

  const containerClassName = isSidebarHidden
    ? "container-without-sidebar"
    : "container";
  const aboutClassName = isSidebarHidden ? "about-franchising" : "about";

  if(checkUrlRoute()) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return (
    <Fragment>

        
          <TopBanner title={data?.title} />
          <MetaCreator {...metaProps} />
          
          <div className={`about-section`}>
            <div className={`${containerClassName}`}>
              {!isSidebarHidden && <Sidebar />}
              <div className={`${aboutClassName}`}>
                {(data && data.photo) ? <img src={data?.photo} alt="" /> : null}
                <div className="main-about">
                  <div
                    className="row"
                    dangerouslySetInnerHTML={{ __html: data?.description }}
                  />
                </div>
              </div>
            </div>
          </div>
          {(slug === "franchising" )  && <AppoitmentForm />}
          {(slug === "scoliosis-treatment" ||
            slug === "chiropractic-care" ||
            slug === "pectus-excavatum-treatment" ||
            slug === "kyphosis-treatment" ||
            slug === "schroth-method-of-scoliosis" ||
            slug === "skype-consultation")  && <FranForm />}


          <CustomLinkTrigger checkClass="custom-condition-btn" currentLanguage={urlLanguage} />
        
    </Fragment>
  );
}
