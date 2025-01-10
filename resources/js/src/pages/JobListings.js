import React, { useEffect,useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectLanguage, setLanguage } from '../reducers/languageSlice';
import moment from 'moment';
import { Link,useNavigate } from "react-router-dom";
function JobListing() {
   const { lang } = useParams();
   const navigate = useNavigate();
  const { i18n } = useTranslation();
  console.log('lang ',lang);
  const currentLanguage = useSelector(selectLanguage);
  console.log('currentLanguage ',currentLanguage );
  console.log('i18n.language ',i18n.language);
  const dispatch = useDispatch();
  const API = process.env.REACT_APP_API_URL+"pages";
  const [data, setData] = useState([]);

   // Effect for something else (priority: 2)
   useEffect(() => {
    const navigateToContacts = () => {
        // 👇️ navigate to /contacts
        navigate(`/jobs/${currentLanguage}`);
      };
      console.log('Cleanup for count effect 1');
   // Check if the language has changed
   if (lang !== currentLanguage) {
    console.log('Cleanup for count effect 2');
    // If the language has changed, update the Redux state
    dispatch(setLanguage(i18n.language));
    navigateToContacts();
  } else {
   
  }
  }, [i18n.language, currentLanguage, dispatch,navigate,lang]);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
       
        const response = await fetch(API);
        const data = await response.json();
        console.log('lang ',data);
        setData(data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    console.log('Cleanup for count effect 3');
    // Check if the language has changed
    if (i18n.language !== currentLanguage) {
      // If the language has changed, update the Redux state
      dispatch(setLanguage(i18n.language));
      // Fetch data again using the new language
      fetchData();
    } else {
      // If the language has not changed, simply fetch data
      fetchData();
    }
  }, [API,currentLanguage,dispatch,i18n.language]);

  return (
    <div>
      
      {/* Your component content... */}
      {data &&
        data.map(userData => (
    
            <div key={userData.id} className="non-treatments" >
              <div className="container">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="treatments-wrpper">
                      <img src={userData.photo} alt={userData.photo} />
                      <h3>{userData.title}</h3>
                      {/* <p>{userData.summary}</p> */}

                      <p>{moment(userData.created_at).format('MMMM Do YYYY')}  </p>
                      <div dangerouslySetInnerHTML={{ __html: userData.summary }} />
                      <div className="pt-cv-readmore">
                        {/* <a type="button" href={userData.id} className="rnd-readmore-btn  btn btn-success _self pt-cv-readmore">Read More</a> */}
                        <Link className="rnd-readmore-btn  btn btn-success _self pt-cv-readmore" to={`/articles/${currentLanguage}/${userData.slug}`}>Read More</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
        ))
      }
    </div>
  );
}

export default JobListing;
