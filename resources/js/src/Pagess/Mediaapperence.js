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
import CustomModelPopup from "../components/CustomModelPopup";
import ApiHook from "../components/CustomHooks/ApiHook";
import { setLanguage, setUrlLanguage } from "../reducers/languageSlice";
import axios from "axios";
import TopBanner from "../components/TopBanner";
import MetaCreator from "../components/MetaCreator";

const MediaA = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();
  const [currentLanguage, urlLanguage] = ApiHook();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [modal, setModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [singleImg, setSingleImg] = useState([]);
  const [metaProps, setMetaProps] = useState(null);

  const toggleModal = () => setModal(!modal);

  const handleImageClick = (photos, index = 0) => {
    setModal(true);
    setSingleImg(photos); // Assuming photos is an array of image URLs
    setActiveIndex(index); // Resetting active index to start from the first image
  };

  const next = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === singleImg.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previous = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? singleImg.length - 1 : prevIndex - 1
    );
  };

  const API =
    process.env.REACT_APP_API_URL +
    `radio_tv_section/filter/${currentLanguage}`;
  const API1 =
    process.env.REACT_APP_API_URL +
    `print_appearances_section/filter/${currentLanguage}`;
  const API2 =
    process.env.REACT_APP_API_URL +
    `media_personalities_section/filter/${currentLanguage}`;

  useEffect(() => {
    const navigateToAboutUS = () => {
      navigate(`${urlLanguage}/media-appearances`);
    };

    if (typeof lang != "undefined" && lang !== currentLanguage) {
      dispatch(setUrlLanguage(i18n.language));
      dispatch(setLanguage(i18n.language));
      navigateToAboutUS();
    }

    if (typeof lang == "undefined") {
      dispatch(setUrlLanguage("en_US"));
      dispatch(setLanguage("en_US"));
      navigateToAboutUS();
    }
  }, [i18n.language, currentLanguage, dispatch, navigate, lang, urlLanguage]);

  useEffect(() => {
    navigate(`${urlLanguage}/media-appearances`);
  }, [currentLanguage, navigate, urlLanguage]);

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
        let _metaProps = {
          tags:
            response.data && response.data.seo_meta_tag
              ? response.data.seo_meta_tag
              : "",
          title:
            response.data && response.data.seo_meta_title
              ? response.data.seo_meta_title
              : "",
          description:
            response.data && response.data.seo_meta_description
              ? response.data.seo_meta_description
              : "",
        };

        setMetaProps(_metaProps);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
    fetchData1();
    fetchData2();
  }, [API, API1, API2]);

  const getImageData = (language) => {
    switch (language) {
      case "en_SG":
        return {
          imageUrl: "/media-apperence/Media-Appearance-EN.webp",
        };
      case "es_ES":
        return {
          imageUrl: "/media-apperence/Media-Appearance-ES.webp",
        };
      case "fr_FR":
        return {
          imageUrl: "/media-apperence/Media-Appearance-FR.webp",
        };
      case "id_ID":
        return {
          imageUrl: "/media-apperence/Media-Appearance-ID.webp",
        };
      case "it_IT":
        return {
          imageUrl: "/media-apperence/Media-Appearance-IT.webp",
        };
      case "es_MX":
        return {
          imageUrl: "/media-apperence/Media-Appearance-ES.webp",
        };
      case "zh_CN":
        return {
          imageUrl: "/media-apperence/Media-Appearance-CS.webp",
        };
      case "zh_HK":
        return {
          imageUrl: "/media-apperence/Media-Appearance-CT.webp",
        };
      case "ja_JP":
        return {
          imageUrl: "/media-apperence/Media-Appearance-JP.webp",
        };
      case "de_DE":
        return {
          imageUrl:
            "https://sladmin.scoliolife.com/uploads/2023/01/Media-Appearance-DE.webp",
        };
      default:
        return {
          imageUrl: "/media-apperence/Media-Appearance-EN.webp",
        };
    }
  };

  const { imageUrl } = getImageData(currentLanguage);
// 
  return (
    <>
      <TopBanner title={t("media-ap.MEDIA APPEARANCES")} />
      <MetaCreator {...metaProps} />
      <div className="container">
        <Sidebar />
        <div className="main-article about">
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
            <div className="appearances_APlus">
              <div class="row">
                <div class="col-sm-4">
                  <div class="print-img">
                    <img src="/assets/images/media-appearance/article1.webp"   alt="" />
                    <a
                      href="https://aplussingapore.com/article/dr-kevin-lau-scoliolife-scioliosis-care"
                      target="_blank"
                    >
                      {t('media-ap.article1')}
                    </a>
                  </div>
                </div>
                <div class="col-sm-4">
                  <div class="print-img">
                    <img src="/assets/images/media-appearance/article2.webp" alt="" />
                    <a
                      href="https://www.forbesindia.com/article/brand-connect/celebrating-excellence-in-health-amp-wellness-forttuna-global-excellence-award-winners/94866/1"
                      target="_blank"
                    >
                      {t('media-ap.article2')}
                    </a>
                  </div>
                </div>
                <div class="col-sm-4">
                  <div class="print-img">
                    <img src="/assets/images/media-appearance/article3.webp" alt="" />
                    <a
                      href="https://apnews.com/press-release/ein-presswire-newsmatics/kevin-lau-medical-technology-dubai-849d6a0cc34ecaae8242b4c4b549d204"
                      target="_blank"
                    >
                    {t('media-ap.article3')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {data.map((item) => (
                <div key={item.id}>
                  <h1 className="Bone-Spur">{item.title}</h1>
                  <div dangerouslySetInnerHTML={{ __html: item.description }} />
                </div>
              ))}
              <h1 className="Bone-Spur">{t("media-ap.PRINT APPEARANCES")}</h1>
              <Card>
                <CardBody>
                  <div className="row">
                    {data1.map((printItem, _ind) => (
                      <div className="col-md-4" key={printItem.id}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: printItem.description,
                          }}
                        />
                        <div className="print-img">
                          <img
                            src={printItem.photo.trim()}
                            alt={printItem.title}
                            onClick={() =>
                              handleImageClick(
                                data1.map((printItem) => printItem.photo),
                                _ind
                              )
                            }
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              height: "auto",
                            }}
                          />

                          <h3>{printItem.title}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              <h1 className="Bone-Spur">{t("media-ap.MEDIA PERONALITIES")}</h1>
              <Card>
                <CardBody>
                  <div className="row">
                    {data2.map((item, index) => (
                      <div className="col-md-4" key={item.id}>
                        <div
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                        <div className="print-img">
                          <img
                            src={item.photo}
                            alt={item.title}
                            onClick={() =>
                              handleImageClick(
                                data2.map((item) => item.photo),
                                index
                              )
                            }
                            style={{
                              cursor: "pointer",
                              width: "280px",
                              height: "205px",
                            }}
                          />

                          <h3>{item.title}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="col-md-6">
          <Modal isOpen={modal} toggle={toggleModal} size="md">
            <ModalBody className="test-body">
              <Button
                close
                onClick={toggleModal}
                style={{ position: "absolute", top: "10px", right: "10px" }}
              />
              <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
              >
                {singleImg.map((item, index) => (
                  <CarouselItem key={item}>
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

      <CustomModelPopup checkClass="maimages" />
    </>
  );
};

export default MediaA;
