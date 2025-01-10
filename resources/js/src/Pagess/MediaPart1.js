import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Modal,
  ModalBody,
  Carousel,
  CarouselItem,
  CarouselControl,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import Sidebar from "../components/Sidebar";
import ApiHook from "../components/CustomHooks/ApiHook";
import { setLanguage } from "../reducers/languageSlice";
import axios from "axios";

const MediaA = () => {
  const { t, i18n } = useTranslation();
  const { slug, lang } = useParams();
  const navigate = useNavigate();
  const [currentLanguage, urlLanguage] = ApiHook();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [modal, setModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [singleImg, setSingleImg] = useState([]);

  const toggleModal = () => setModal(!modal);

  const handleImageClick = (photo, item) => {
    setModal(true);
    setActiveIndex(item);
    setSingleImg([photo]); // Wrap the single image URL in an array
  };
  

  const next = () => {
    setActiveIndex((prevItem) => (prevItem + 1) % singleImg.length);
  };

  const previous = () => {
    setActiveIndex((prevItem) => (prevItem === 0 ? singleImg.length - 1 : prevItem - 1));
  };

  const API = process.env.REACT_APP_API_URL + `radio_tv_section/filter/${currentLanguage}`;
  const API1 = process.env.REACT_APP_API_URL + `print_appearances_section/filter/${currentLanguage}`;
  const API2 = process.env.REACT_APP_API_URL + `media_personalities_section/filter/${currentLanguage}`;

  useEffect(() => {
    const navigateToAboutUS = () => {
      navigate(`${urlLanguage}/media-appearances`);
    };

    if (lang !== currentLanguage) {
      dispatch(setLanguage(i18n.language));
      navigateToAboutUS();
    }
  }, [i18n.language, currentLanguage, dispatch, navigate, lang, slug]);

  useEffect(() => {
    navigate(`${urlLanguage}/media-appearances`);
  }, [currentLanguage, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API);
        setData(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    const fetchData1 = async () => {
      try {
        const response = await axios.get(API1);
        setData1(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    const fetchData2 = async () => {
      try {
        const response = await axios.get(API2);
        setData2(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
    fetchData1();
    fetchData2();
  }, [API, API1, API2]);

  

  return (
    <>
    
          <div className="row">
            <div>
              <div className="elementor-widget-container">
                <img
                  loading="lazy"
                  decoding="async"
                  width="100%"
                  height="100%"
                  src={imageUrl}
                  alt="Media Appearances"
                />
              </div>
            </div>

            <div>
              {data.map((item) => (
                <div key={item.id}>
                  <h2>{item.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: item.description }} />
                </div>
              ))}
              <h1 className="Bone-Spur">{t("media-ap.PRINT APPEARANCES")}</h1>
              <div className="row">
                {data1.map((printItem) => (
                  <div className="col-md-4" key={printItem.id}>
                    <div className="print-img">
                      <img src={printItem.photo} alt={printItem.title} />
                      <h3>{printItem.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
              <h1 className="Bone-Spur">{t("media-ap.MEDIA PERONALITIES")}</h1>
              <Card>
                <CardBody>
                  <div className="row">
                    {data2.map((item) => (
                      <div className="col-md-4" key={item}>
                        <div dangerouslySetInnerHTML={{ __html: item.description }} />
                        <div className="print-img">
                          <img src={item.photo}  onClick={() => handleImageClick(item.photo)} style={{ cursor: 'pointer', width: '100%', height: 'auto' }} />
                          <h3>{item.title}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        
      <div className="container">
        <div className="col-md-6">
          <Modal isOpen={modal} toggle={toggleModal} size="md">
            <ModalBody>
              <Button close onClick={toggleModal} style={{ position: 'absolute', top: '10px', right: '10px' }} />
              <Carousel activeIndex={activeIndex} next={next} previous={previous}>
                {singleImg.map((item) => (
                  <CarouselItem key={item}>
                    <img src={item} alt={item} style={{ width: '100%' }} />
                  </CarouselItem>
                ))}
                 <CarouselControl direction="prev" onClickHandler={previous} />
                                <CarouselControl direction="next" onClickHandler={next} />
              </Carousel>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default MediaA;
