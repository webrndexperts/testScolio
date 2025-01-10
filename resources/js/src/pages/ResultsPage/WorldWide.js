import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import ApiHook from "../../components/CustomHooks/ApiHook";
import { fetchWorldPatients } from "../../reducers/resultsSlices";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Modal,
  ModalBody,
  Carousel,
  CarouselItem,
  CarouselControl,
  ModalHeader
} from "reactstrap";
import ReactPlayer from "react-player";
import TopBanner from '../../components/TopBanner';
import useDynamicTitle from "../../hooks/useDynamicTitle";

const WorldWide = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentLanguage, urlLanguage] = ApiHook();
  const dispatch = useDispatch();
  const { lang } = useParams();
  const { WorldPatientData } = useSelector((state) => state.worldPatient);
  // console.log("WorldPatientData", WorldPatientData);
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [activeIndex, setActiveIndex] = useState(0);
  const [singleImg, setSingleImg] = useState([]);

  useEffect(() => {
    dispatch(fetchWorldPatients());
  }, [currentLanguage, dispatch]);

  useEffect(() => {
    navigate(`${urlLanguage}/patients-worldwide`);
  }, [currentLanguage, navigate]);

  const handleImageClick = (imageUrlArray, index) => {
    setModal(true);
    setActiveIndex(index);
    setSingleImg(imageUrlArray);
  };
  // const toggleModal = () => setModal(!modal);
  const next = () => {
    if (activeIndex < singleImg.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0);
    }
  };
  const previous = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      setActiveIndex(singleImg.length - 1);
    }
  };
  useDynamicTitle(t("main-nav.PATIENTS WORLDWIDE"))
  return (
    <>
      <TopBanner title={t("main-nav.PATIENTS WORLDWIDE")} />
      
      <div className="container">
        <Sidebar></Sidebar>
        <div className="main-article">
          <div className="row">
            {/* https://maps.app.goo.gl/Xa88CtvV3tmGueku5 */}
            <div className="worldwide-section">
              <h1 className="worldwide-design">
                {t("main-nav.PATIENTS WORLDWIDE")}
              </h1>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d47468151.21505948!2d123.7235990607885!3d43.43499515815636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1706871951075!5m2!1sen!2sin"
                width="600"
                height="450"
                style={{ border: "0" }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="google"
              ></iframe>
            </div>
            <div className="results-videos">
              <ReactPlayer
                url="https://www.youtube.com/watch?v=ONxjA7IiW3U&t=3s"
                controls
              />
            </div>
            {/* {WorldPatientData.map((item) => {
                            const imageUrlArray = item.photo.split(',');
                            return (
                                <div className='world-patient' key={item.id}>
                                    <h4>{item.title}</h4>
                                    {imageUrlArray.map((imageUrl, index) => (
                                        <img key={index} src={imageUrl.trim()}alt={imageUrl.trim()} onClick={() => handleImageClick(imageUrlArray,index)}/>
                                    ))}
                                </div>
                            )
                        }
                        )} */}
            {WorldPatientData.map((item) => {
              const imageUrlArray = item.photo ? item.photo.split(",") : [];
              return (
                <div className="world-patient" key={item.id}>
                  <h4>{item.title}</h4>
                  {imageUrlArray.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl.trim()}
                      alt=""
                      onClick={() => handleImageClick(imageUrlArray, index)}
                    />
                  ))}
                </div>
              );
            })}

            {/* <iframe aria-hidden="true" frameborder="0" tabindex="-1"></iframe> */}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="col-md-6">
          <Modal isOpen={modal} toggle={toggleModal} size="md">
            <ModalHeader toggle={toggleModal}></ModalHeader>

            <ModalBody>
              <Carousel activeIndex={activeIndex} next={next} previous={previous}>
                {singleImg?.map((item, index) => (
                  <CarouselItem key={index}>
                    <img src={item} alt="" style={{ width: "100%" }} />
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

export default WorldWide;
