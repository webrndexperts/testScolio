// components/NewPost.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useDynamicLanguage } from '../../i18n';
import { selectLanguage, setLanguage, selectUrlLanguage, setUrlLanguage } from '../../reducers/languageSlice';
import { selectArticleParent } from '../../reducers/articleSlice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import Email from '../../images/email icon.webp';
import moment from 'moment';
import { SlCalender } from "react-icons/sl";
import { FaUser } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { FaBlogger } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import useDynamicTitle from '../../hooks/useDynamicTitle';
import TopBanner from '../../components/TopBanner';
import MetaCreator from '../../components/MetaCreator';

const Article = () => {

  useDynamicLanguage();
  const { lang, postId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  // const [isLoading, setIsLoading] = useState(true);
  const currentLanguage = useSelector(selectLanguage);
  const urlLanguage = useSelector(selectUrlLanguage);
  const parentId = useSelector(selectArticleParent);
  const [metaProps, setMetaProps] = useState(null);

  const dispatch = useDispatch();

  const APIUrl = process.env.REACT_APP_API_URL;
  const API = APIUrl + `posts/${postId}/${currentLanguage}`;
  console.log('api', API)

  const [data, setData] = useState([]);
  const [pageTitle, setPageTitle] = useState('');
  const [slugsData, setSlugsData] = useState([]);

  const triggerApi = () => {
    if(parentId) {
      fetch(`${APIUrl}post_all_slug/${parentId}`).then((response) => response.json()).then((json) => {
        setSlugsData(json);
      });
    }
  }

  const navigateToArticle = () => {
    if(slugsData && slugsData.length) {
      var item = slugsData.find(item => item.lang === currentLanguage);

      if(typeof item != 'undefined' && item) {
        navigate(`${urlLanguage}/articles/${item.slug}`);
      }
    } else {
      navigate(`${urlLanguage}/articles/${postId}`);
    }
  }

  useEffect(() => {
    // Check if the language has changed
    if (typeof lang != 'undefined' && lang !== currentLanguage) {
      dispatch(setUrlLanguage(i18n.language));
      dispatch(setLanguage(i18n.language));
      navigateToArticle();
    }

    if(typeof lang == 'undefined') {
      dispatch(setUrlLanguage('en_US'));
      dispatch(setLanguage('en_US'));
      navigateToArticle();
    }
  }, [i18n.language, currentLanguage, dispatch, navigate, lang, postId]);

  useEffect(() => {
    if(parentId) {
      triggerApi();
    }
  }, [parentId, currentLanguage, lang])


  useEffect(() => {
    const apiGet = () => {
      fetch(API)
        .then((response) => response.json())
        .then((json) => {
        //  console.log(json);

          if(json === 'null'){
            navigate('/')
            return;
          }

          setData(json);
          let _metaProps = {
            tags: (json && json.seo_meta_tag) ? json.seo_meta_tag : '',
            title: (json && json.seo_meta_title) ? json.seo_meta_title : '',
            description: (json && json.seo_meta_description) ? json.seo_meta_description : '',
          }

          setMetaProps(_metaProps);
          triggerApi();
          // setIsLoading(false);
        })
    };
    apiGet();
  }, [API])

  useEffect(() => {
    if(data && data.title) {
      setPageTitle(data.title);
    }
  }, [data])

  // useDynamicTitle(pageTitle);

  return (

    <>
      <TopBanner title={t("main-nav.ARTICLES")} />
      <MetaCreator {...metaProps} />
      
      <div className='container'>
        <header className='article-titel'>
          <h1 className="entry-title">{pageTitle}</h1>
          <div>
            <span><SlCalender />{moment(data.created_at).format('MMMM D, YYYY')}</span>
            <span><FaUser />ScolioLife</span>
          </div>
          <h5 className="social-share-post">
            <div className="addtoany_shortcode">
              <a href='https://www.facebook.com/scoliolife/' title='Follow Us on facebook' target='blank'>
              <FaSquareFacebook />
                {/* <img loading="lazy" width="26" height="26" className="scale" src='/assets/images/fb.png' alt='Follow us on facebook' /> */}
              </a>
              <a href='https://twitter.com/i/flow/login?redirect_after_login=%2Fscoliolife' title='Follow Us on Twitter' target='blank'>
              <FaTwitterSquare className='twitter'/>
                {/* <img loading="lazy" width="26" height="26" className="scale" src='/assets/images/tweet.png' alt='Follow us on Twitter' /> */}
              </a>
              <a href='https://drkevinlau.blogspot.com/' title='Follow Us on Blogspot' target='blank'>
              <FaBlogger className='blogger'/>
                {/* <img loading="lazy" width="26" height="26" className="scale" src='/assets/images/blog.png' alt='Follow us on Blogspot' /> */}
              </a>
              <a href="https://www.addtoany.com/add_to/email?linkurl=https%3A%2F%2Fscoliolife.com%2Fthe-role-of-muscles-in-stabilization-of-the-spine-in-scoliosis-rehabilitation%2F&linkname=Muscles%20in%20Stabilization%20of%20the%20Spine%20In%20Scoliosis%20Rehabilitation&linknote=In%20scoliosis%20specific%20exercise%20there%20are%202%20different%20camps%20of%20thought%20when%20it%20comes%20to%20strengthening%20weakened%20muscles%20to%20help%20stabilize%20the%20spine."
                title='Email' target='blank'>
              <MdEmail className='email'/>
                {/* <img loading="lazy" width="26" height="26" className="scale" src={Email} alt='Email' /> */}
              </a>
              <a href='https://sg.linkedin.com/in/DrKevinLau' title='Follow Us on Linkedin' target='blank'>
              <FaLinkedin />
                {/* <img loading="lazy" width="26" height="26" className="scale" src='/assets/images/linkedin.png' alt='Follow us on Linkedin' /> */}
              </a>
              <a href="https://www.addtoany.com/add_to/whatsapp?linkurl=https%3A%2F%2Fscoliolife.com%2Fthe-role-of-muscles-in-stabilization-of-the-spine-in-scoliosis-rehabilitation%2F&linkname=Muscles%20in%20Stabilization%20of%20the%20Spine%20In%20Scoliosis%20Rehabilitation&linknote=In%20scoliosis%20specific%20exercise%20there%20are%202%20different%20camps%20of%20thought%20when%20it%20comes%20to%20strengthening%20weakened%20muscles%20to%20help%20stabilize%20the%20spine."
               title='WhatsUp' target='blank'>
               <FaWhatsappSquare className='whatsapp'/> 

                {/* <img loading="lazy" width="26" height="26" className="scale" src='/assets/images/linkedin.png' alt='Follow us on Linkedin' /> */}
              </a>
              
              
              {/* <a href='https://www.instagram.com/scoliolife/' title='Follow Us on Instagram' target='blank'>
                <img loading="lazy" width="26" height="26" className="scale" src='/assets/images/instagram.png' alt='Follow us on Instagram' />
              </a> */}
            </div>
          </h5>
        </header>
        <div className='inner-article'>
          <img src={data.photo} alt={data.photo} className='article-img' />
         {/* <div dangerouslySetInnerHTML={{ __html: data.summary }} /> */}
          <div dangerouslySetInnerHTML={{ __html: data.description }} />
        </div>
      </div>
    </>

  )
};

export default Article;
