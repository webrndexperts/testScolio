import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';
import ApiHook from '../../components/CustomHooks/ApiHook';
import { useDispatch, } from 'react-redux';
import { setLanguage } from '../../reducers/languageSlice';

const VideoSection = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [currentLanguage] = ApiHook();
    const dispatch = useDispatch();
    const { lang } = useParams(); 
    const [isDataLoaded, setIsDataLoaded] = useState();

    const API = `${process.env.REACT_APP_API_URL}praisepatients/filter/${currentLanguage}`;
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API);
               
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setIsDataLoaded(data);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, [API]);

    return (
        <>
            {isDataLoaded?.map((item, index) => (
                <section className="video-patients" key={`key-${index}`}  data-aos="fade-up">
                  <h2>{item?.title}</h2>
             
                    <ReactPlayer
                        url={item.video_url}
                        controls
                        width="850px"
                        height="420px"
                    />
                </section>
            ))}
        </>
    );
};

export default VideoSection;
