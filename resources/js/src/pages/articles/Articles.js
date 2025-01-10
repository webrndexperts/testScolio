import React, { useEffect,useState } from 'react';
import moment from 'moment';
import { Link } from "react-router-dom";
import { useDynamicLanguage } from '../../i18n';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar';
import ApiHook from '../../components/CustomHooks/ApiHook';
import { setArticleParent } from '../../reducers/articleSlice';
import UnlockArticle from '../../images/Unlock-Article-Header-EN.png';
import { useTranslation } from 'react-i18next';
import { scrollToTop } from '../../components/Helper';
import useDynamicTitle from '../../hooks/useDynamicTitle';
import TopBanner from '../../components/TopBanner';
import NoImage from '../../images/icons/no-image.png'
import MetaCreator from '../../components/MetaCreator';

const API = process.env.REACT_APP_API_URL
export default function Articles() {

  useDynamicLanguage();
  const {t}=useTranslation();
  const navigate = useNavigate();
  const [currentLanguage, urlLanguage] = ApiHook();
  const [articleData, setArticleData] = useState();
  const [metaProps, setMetaProps] = useState(null);
  const dispatch = useDispatch();

  const goToArticle = (parentId) => {
    scrollToTop();
    dispatch(setArticleParent(parentId));
  }
  
  useEffect(()=>{
     navigate(`${urlLanguage}/articles`)
  },[navigate,currentLanguage])

  useEffect(() => {
    fetch(`${API}posts/filter/${currentLanguage}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setArticleData(data)
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

  }, [currentLanguage])

  // useDynamicTitle(t("main-nav.ARTICLES"));

  return (
    <>
      <TopBanner title={t("main-nav.ARTICLES")} />
      <MetaCreator {...metaProps} />
      <div className="container">
        <Sidebar></Sidebar>
        <div className='main-article about'>
        <div className="row">
          {articleData &&
            articleData.map(userData => (
              <div key={userData.id} className="col-sm-6">
                <div className="treatments-wrpper">
                <Link className="rnd-readmore-btn  " to={`${urlLanguage}/articles/${userData.slug}`} onClick={() => goToArticle(userData.post_parent_id)}>
                  <img src={(userData.photo) ? userData.photo : NoImage} alt='no-image' /></Link>
                  <h3>{userData.title}</h3>
                  {/* <p>{userData.summary}</p> */}

                  <p>{moment(userData.created_at).format('MMMM Do YYYY')} <b>/</b> {userData.author_info?.name}</p>
                  <div dangerouslySetInnerHTML={{ __html: userData.summary }} />
                  <div className="pt-cv-readmore">
                    {/* <a type="button" href={userData.id} className="rnd-readmore-btn  btn btn-success _self pt-cv-readmore">Read More</a> */}
                    <Link className="rnd-readmore-btn  btn btn-success _self pt-cv-readmore" to={`${urlLanguage}/articles/${userData.slug}`} onClick={() => goToArticle(userData.post_parent_id)}>{t("Patients.read_more")}</Link>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        </div>
      </div>
    </>
  )
}
