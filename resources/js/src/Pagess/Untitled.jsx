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
import { setLanguage, setUrlLanguage } from "../reducers/languageSlice";

const MediaA = () => {
  const { t } = useTranslation();
  const img = "/assets/images/banner-bg-1-scaled.jpg";
  const { i18n } = useTranslation();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [currentLanguage, urlLanguage] = ApiHook();
  const dispatch = useDispatch();
  const { lang } = useParams();
  useEffect(() => {
    const navigateToAboutUS = () => {
      navigate(`${urlLanguage}/media-appearances`);
    };

    if (typeof lang != 'undefined' && lang !== currentLanguage) {
      dispatch(setUrlLanguage(i18n.language));
      dispatch(setLanguage(i18n.language));
      navigateToAboutUS();
    }

    if(typeof lang == 'undefined') {
      dispatch(setUrlLanguage('en_US'));
      dispatch(setLanguage('en_US'));
      navigateToAboutUS();
    }
  }, [i18n.language, currentLanguage, dispatch, navigate, lang, slug]);

  useEffect(() => {
    navigate(`${urlLanguage}/media-appearances`);
  }, [currentLanguage, navigate]);

  const dummyWorldPatientData = [
    {
      id: 1,
      title: "PRINT-APPEARANCES",
      photo: [
        "https://sladmin.scoliolife.com/uploads/2016/03/pmaimg1.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/pmaimg2.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/pmaimg3.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/pmaimg4.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/pmaimg5.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/pmaimg6.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/pmaimg7.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/pmaimg8.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/pmaimg9.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/pmaimg10.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/pmaimg11.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/pmaimg12.jpg",
      ],
      // para: ["Complementary Therapy – Vol. 2, Issue 5 2009", "Ezyhealth & Beauty - Mars 2010", "Berita Harian Mars 2010", "Todays Parents Avril 2010", "Lianhe Zaobao Avril 2010", "Lifestyle NTUC Mai 2010", "Lifestyle NTUC Mai 2010", "Lianhe Zaobao Août 2010", "DC Product Review Septembre 2010", "Shape Novembre 2010", "The American Chiropractor March 2012 ", "The American Chiropractor March 2012"]
    },
    {
      id: 2,
      title: "MEDIA-PERONALITIES",
      photo: [
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg1.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg2.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg3.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg4.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg5.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg6.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg7.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg8.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg9.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg10.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg11.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg12.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg13.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg14.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg15.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg16.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg17.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg18.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg19.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg20.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg21.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg22.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg23.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg24.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg25.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg26.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg27.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg28.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg29.jpg",
        "https://sladmin.scoliolife.com/uploads/2016/03/mpimg30.jpg",
      ],
      // para: ["Bebe Battsetseg Miss Mongolia 2009", "Stanley Leong And Pamela Ho 983Live", "Steven Chia And Yvonne Yong Primetime Morning", "Bernard Tay President Automobile Association Of Singapore", "Laura Jane  International Model", "Darren Stephen Lim Et Jason    Chee Personal Trainers   Cleo Most Eligible Bachelor 2009  Singapore Calendar Guys 2010 Winner", "Michelle Goh Actress", "Jakub Koniar  International Model", "Peter Tong Model And Actor", "Olya Dzuba International Model", "Richard Garcia Professional Footballer For  Premiere League For Hull City And Internationally For Australia ", "Paul Foster  Actor, Model And Host", "Antonino Russo International Model", "Jayce Izuma   International Model", "Julian Low Acteur, Mannequin, Hôte", "Patrick Holford Nutritionist And Author", "Yohan Passos International Model", "Melody Reilly International Model", "Jee Choi International Model", "Jason Chee International Model", "Monika Zimaniova International Model", "Hossan Leong Actor", "Ekaterina Ilyukhina International Model", "Natalia Gandina International Model", "Ekaterina Nushtaeva International Model", "Irina LysiukInternational Model", "Ekaterina Shaydurova International Model", "Marina Vorobeva International Model", "Michael TetsuoInternational Model", "Ambassador Seychelles"]
    },

    // Add more dummy data as needed
  ];
  const getImageData = (language) => {
    switch (language) {
      case "en_SG":
        return {
          imageUrl:
            "https://sladmin.scoliolife.com/uploads/2023/01/Media-Appearance-EN.webp",
        };
      case "es_ES":
        return {
          imageUrl:
            "https://sladmin.scoliolife.com/uploads/2023/01/Media-Appearance-ES.webp",
        };
      case "fr_FR":
        return {
          imageUrl:
            "https://sladmin.scoliolife.com/uploads/2023/01/Media-Appearance-FR.webp",
        };
      case "id_ID":
        return {
          imageUrl:
            "https://sladmin.scoliolife.com/uploads/2023/01/Media-Appearance-ID.webp",
        };
      case " it_IT":
        return {
          imageUrl:
            "https://sladmin.scoliolife.com/uploads/2023/01/Media-Appearance-IT.webp",
        };
      case "es_MX":
        return {
          imageUrl:
            "https://sladmin.scoliolife.com/uploads/2023/01/Media-Appearance-ES.webp",
        };
        case "de_DE":
          return {
            imageUrl:
              "https://sladmin.scoliolife.com/uploads/2023/01/Media-Appearance-DE.webp",
          };
      case "zh_CN":
        return {
          imageUrl:
            "https://sladmin.scoliolife.com/uploads/2023/01/Media-Appearance-CS.webp",
        };
      case "zh_HK":
        return {
          imageUrl:
            "https://sladmin.scoliolife.com/uploads/2023/01/Media-Appearance-CT.webp",
        };
      case "ja_JP":
        return {
          imageUrl:
            "https://sladmin.scoliolife.com/uploads/2023/01/Media-Appearance-JP.webp",
        };
      default:
        return {
          imageUrl:
            "https://sladmin.scoliolife.com/uploads/2023/01/Media-Appearance-EN.webp",
        };
    }
  };
  const { imageUrl } = getImageData(currentLanguage);
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [activeIndex, setActiveIndex] = useState(0);
  const [singleImg, setSingleImg] = useState([]);

  const handleImageClick = (imageUrlArray, index) => {
    setModal(true);
    setActiveIndex(index);
    setSingleImg(imageUrlArray);
  };

  const next = () => {
    if (activeIndex < singleImg.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0);
    }
  };
  useEffect(() => {
    const translations = {
      "media-a": {
        "Complementary Therapy – Vol. 2, Issue 5 2009":
          "Complementary Therapy – Vol. 2, Issue 5 2009",
        "Ezyhealth & Beauty - Mars 2010": "Ezyhealth & Beauty - Mars 2010",
        "Berita Harian Mars 2010": "Berita Harian Mars 2010",
        "Todays Parents Avril 2010": "Todays Parents Avril 2010",
        "Lianhe Zaobao Avril 2010": "Lianhe Zaobao Avril 2010",
        "Lifestyle NTUC Mai 2010": "Lifestyle NTUC Mai 2010",
        "Lifestyle NTUC Mai 2010.": "Lifestyle NTUC Mai 2010",
        "Lianhe Zaobao Août 2010": "Lianhe Zaobao Août 2010",
        "DC Product Review Septembre 2010": "DC Product Review Septembre 2010",
        "Shape Novembre 2010": "Shape Novembre 2010",
        "The American Chiropractor March 2012 ":
          "The American Chiropractor March 2012 ",
        "The American Chiropractor March 2012":
          "The American Chiropractor March 2012",
        "Bebe Battsetseg Miss Mongolia 2009":
          "Bebe Battsetseg Miss Mongolia 2009",
        "Stanley Leong And Pamela Ho 983Live":
          "Stanley Leong And Pamela Ho 983Live",
        "Steven Chia And Yvonne Yong Primetime Morning":
          "Steven Chia And Yvonne Yong Primetime Morning",
        "Bernard Tay President Automobile Association Of Singapore":
          "Bernard Tay President Automobile Association Of Singapore",
        "Laura Jane  International Model": "Laura Jane  International Model",
        "Darren Stephen Lim Et Jason    Chee Personal Trainers   Cleo Most Eligible Bachelor 2009  Singapore Calendar Guys 2010 Winner":
          "Darren Stephen Lim Et Jason    Chee Personal Trainers   Cleo Most Eligible Bachelor 2009  Singapore Calendar Guys 2010 Winner",
        "Michelle Goh Actress": "Michelle Goh Actress",
        "Jakub Koniar  International Model":
          "Jakub Koniar  International Model",
        "Peter Tong Model And Actor": "Peter Tong Model And Actor",
        "Olya Dzuba International Model": "Olya Dzuba International Model",
        "Richard Garcia Professional Footballer For  Premiere League For Hull City And Internationally For Australia ":
          "Richard Garcia Professional Footballer For  Premiere League For Hull City And Internationally For Australia ",
        "Paul Foster  Actor, Model And Host":
          "Paul Foster  Actor, Model And Host",
        "Antonino Russo International Model":
          "Antonino Russo International Model",
        "Jayce Izuma International Model": "Jayce Izuma International Model",
        "Julian Low Acteur, Mannequin, Hôte":
          "Julian Low Acteur, Mannequin, Hôte",
        "Patrick Holford Nutritionist And Author":
          "Patrick Holford Nutritionist And Author",
        "Yohan Passos International Model": "Yohan Passos International Model",
        "Melody Reilly International Model":
          "Melody Reilly International Model",
        "Jee Choi International Model": "Jee Choi International Model",
        "Jason Chee International Model": "Jason Chee International Model",
        "Monika Zimaniova International Model":
          "Monika Zimaniova International Model",
        "Hossan Leong Actor": "Hossan Leong Actor",
        "Ekaterina Ilyukhina International Model":
          "Ekaterina Ilyukhina International Model",
        "Natalia Gandina International Model":
          "Natalia Gandina International Model",
        "Ekaterina Nushtaeva International Model":
          "Ekaterina Nushtaeva International Model",
        "Irina LysiukInternational Model": "Irina LysiukInternational Model",
        "Ekaterina Shaydurova International Model":
          "Ekaterina Shaydurova International Model",
        "Marina Vorobeva International Model":
          "Marina Vorobeva International Model",
        "Michael TetsuoInternational Model":
          "Michael TetsuoInternational Model",
        "Ambassador Seychelles": "Ambassador Seychelles",
      },
    };
    i18n.addResourceBundle("en", "translation", translations, true, true);
  }, [i18n]);
  const previous = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      setActiveIndex(singleImg.length - 1);
    }
  };

  return (
    <>
      <div
        className="inner-banner"
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}${img})` }}
      >
        <h1>{t("media-ap.MEDIA APPEARANCES")}</h1>
      </div>
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
                />
              </div>
            </div>
            <h1 className="Bone-Spur">
              {t("media-ap.RADIO & TV INTERVIEWS WITH DR KEVIN LAU")}
            </h1>
            <div className="media-video">
              <div className="mavideo">
                <iframe
                  className="ma-video"
                  width="436"
                  height="328"
                  frameborder="0"
                  allowfullscreen=""
                  src="https://www.youtube.com/embed/BUe8GxIEG4g?rel=0&amp;wmode=transparent"
                ></iframe>
              </div>
              <div className="mavideoinfo">
                <p className="radikal-light">
                  Primetime Morning –{" "}
                  <span className="orange">3rd February 2010</span> - Channel News
                  Asia
                </p>
                <h3 className="black">Alternative Treatment for Scoliosis</h3>
                <p>
                  {" "}
                  Test Bracing and surgery are typically the only two options offered
                  by medical doctors to treat scoliosis, which refers to an
                  abnormal curvature in the spine. A degenerative disease, it
                  usually begins at puberty. We talk to a chiropractor who says
                  the cure lies in diet, exercise and special medical devices,
                  and there's no need to use a brace or undergo surgery.
                </p>
              </div>
              <div className="maimages">
                <a href="">
                  <img
                    src="https://sladmin.scoliolife.com/uploads/2016/03/mav-img1.jpg"
                    alt=""
                  />
                </a>
                <a href="">
                  <img
                    src="https://sladmin.scoliolife.com/uploads/2016/03/mav-img2.jpg"
                    alt=""
                  />
                </a>
                <a href="">
                  <img
                    src="https://sladmin.scoliolife.com/uploads/2016/03/mav-img3.jpg"
                    alt=""
                  />
                </a>
              </div>
            </div>

            {dummyWorldPatientData.map((item) => (
              <div className="world-patient" key={item.id}>
                <h1 className="Bone-Spur">{t("media-ap.PRINT APPEARANCES")}</h1>
                <Card>
                  <CardBody>
                    <div className="row">
                      {item.photo.map((imageUrl, index) => {
                        const paraText = item.para && item.para[index];
                        return (
                          <div className="col-md-4" key={index}>
                            <div className="print-img">
                              <img
                                src={imageUrl.trim()}
                                alt=""
                                onClick={() =>
                                  handleImageClick(item.photo, index)
                                }
                                style={{
                                  cursor: "pointer",
                                  width: "100%",
                                  height: "auto",
                                }}
                              />
                              {t("media-a.Complementary_Therap")}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="col-md-6">
          <Modal isOpen={modal} toggle={toggleModal} size="md">
            <ModalBody>
              <Button
                close
                onClick={toggleModal}
                style={{ position: "absolute", top: "10px", right: "10px" }}
              />
              <Carousel activeIndex={activeIndex}>
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

export default MediaA;
