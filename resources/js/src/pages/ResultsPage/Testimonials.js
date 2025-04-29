import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "../../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import ApiHook from "../../components/CustomHooks/ApiHook";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestimonials } from "../../reducers/resultsSlices";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import Pagination from "../../components/Pagination";
import ReadLessMore from "../../components/ReadLessMore";
import TopBanner from "../../components/TopBanner";
import ReactPaginate from "react-paginate";
import useDynamicTitle from "../../hooks/useDynamicTitle";

const Testimonials = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { lang } = useParams();
    const { Testimonial } = useSelector((state) => state.testimonial);
    console.log("testimonial", Testimonial);
    const [currentLanguage, urlLanguage] = ApiHook();
    const [read, setRead] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [videoData, setVideoData] = useState({});
    const [loadingVideos, setLoadingVideos] = useState(true);
    const [fullVideoList, setfullVideoList] = useState([]);
    
    useEffect(() => {
        dispatch(fetchTestimonials());
    }, [currentLanguage, dispatch]);

    useEffect(() => {
        navigate(`${urlLanguage}/testimonials`);
    }, [currentLanguage, navigate]);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        // Perform any actions you need when the page changes
    };
    const itemsPerPage = 10;
    // const data = Array.from({ length: 50 }, (_, index) => index + 1);
    const pageCount = Math.ceil(Testimonial?.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = Testimonial?.slice(startIndex, endIndex);

    const readMore = (index) => {
        if (read === index) {
            setRead(null);
        } else {
            setRead(index);
        }
    };
    useDynamicTitle(t("main-nav.TESTIMONIALS"));
    
    const normalizeLang = (lang) => {
        const langMap = {
            zh_CN: 'cn',
            zh_HK: 'hk',
            en_SG: 'en',
            en_US: 'en',
            en_AU: 'en',
            en_CA: 'en',
            en_IN: 'en',
            en_UK: 'en',
            en_NZ: 'en',
            de_DE: 'de',
            es_ES: 'es',
            es_MX: 'es',
            fr_FR: 'fr',
            it_IT: 'it',
            id_ID: 'id',
            ja_JP: 'ja'
        };
        return langMap[lang] || 'en'; // fallback to 'en'
    };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}testimonial-videos`)
            .then((res) => res.json())
            .then((data) => {
                setVideoData(data);
                setLoadingVideos(false);
            });
    }, []);

    useEffect(() => { 

        const langCode = normalizeLang(currentLanguage);
        const selectedVideos = videoData[langCode] || [];

        const fullVideoList = [
            ...selectedVideos,
            { title: t("mom-testimonial"), url: Testimonial?.[0]?.video_url },
        ];
        setfullVideoList(fullVideoList);
    }, [currentLanguage, videoData,Testimonial, t]);

    return (
        <>
            <TopBanner title={t("main-nav.TESTIMONIALS")} />

            <div className="container">
                <Sidebar></Sidebar>
                <div className="main-article">
                    <div className="row">
                        <div className="results-videos-new mt-4">
                            {/* <ReactPlayer
                            url={Testimonial && Testimonial.length > 0 ? Testimonial[0].video_url : ""}
                            controls
                        />
                         */}

                            <div className="container">
                                <div className="row">
                                    {fullVideoList.map((vid, i) => (
                                        <div
                                            className="py-2 col-12 col-md-6 mb-4"
                                            key={i}
                                        >
                                            <div className="h-100">
                                                <div className="ratio ratio-16x9">
                                                    <ReactPlayer
                                                        url={vid.url}
                                                        width="100%"
                                                        height="100%"
                                                        controls
                                                    />
                                                </div>
                                                <div className="p-2 text-center">
                                                    <p className="fw-semibold mb-0">
                                                        {vid.title}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {currentData?.map((item, i) => (
                            <div
                                className={`testimonials-section ${
                                    i % 2 == 0 ? "even" : "odd"
                                }`}
                                key={item.id}
                            >
                                <div className="testi-img">
                                    <img src={item.photo} />
                                </div>
                                <div className="testi-details">
                                    <ReadLessMore
                                        html={item.description}
                                        words={200}
                                    />

                                    <h4>{item.title}</h4>
                                    <p>{item.company_name}</p>
                                </div>
                            </div>
                        ))}

                        <ReactPaginate
                            pageCount={pageCount}
                            onPageChange={handlePageChange}
                            containerClassName="pagination"
                            activeClassName="active"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Testimonials;
