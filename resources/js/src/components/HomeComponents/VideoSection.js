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
            {isDataLoaded?.map((item, index) => {
                let allVideos = [];
                if (item.extra_video_urls && item.extra_video_urls.length > 0) {
                    allVideos = [item.video_url, ...item.extra_video_urls].filter(Boolean).slice(0, 4);
                } else {
                    allVideos = [item.video_url];
                }

                return (
                <section className="video-patients" key={`key-${index}`}  data-aos="fade-up">
                  <h2>{item?.title}</h2>
                        <div className={`${item.extra_video_urls && item.extra_video_urls.length > 0 ? 'video-grid' : 'video-grid-single'}`}>
                            {allVideos.map((url, i) => (
                                <div className="video-item" key={i}>
                                    <ReactPlayer
                                        url={url}
                                        controls
                                        width="100%"
                                    />
                                </div>
                            ))}
                        </div>
                </section>
            )})}
        </>
    );
};

export default VideoSection;
