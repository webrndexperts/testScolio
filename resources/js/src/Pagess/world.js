import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal, ModalBody, Carousel, CarouselItem, CarouselControl, Button } from 'reactstrap';
import ReactPlayer from 'react-player';
import Sidebar from '../components/Sidebar';
import TopBanner from '../components/TopBanner';
import useDynamicTitle from '../hooks/useDynamicTitle';

const Wide = () => {
    const { t } = useTranslation();
    const dummyWorldPatientData = [
        {
            id: 1,
            title: "Austrila",
            photo: ["https://rndexperts.in/backend-laravel/custom_images/patients-worldwide/Overseas-1a-EN-300x277.jpg", "https://rndexperts.in/backend-laravel/custom_images/patients-worldwide/Overseas-1b-EN-300x277.jpg", "https://rndexperts.in/backend-laravel/custom_images/patients-worldwide/Overseas-1c-EN-300x277.jpg","https://rndexperts.in/backend-laravel/custom_images/patients-worldwide/Overseas-1d-EN-300x277.jpg"]
        },
        {
            id: 2,
            title: "China",
            photo: ["https://rndexperts.in/backend-laravel/custom_images/patients-worldwide/Overseas-3-EN-300x277.jpg", "https://rndexperts.in/backend-laravel/custom_images/patients-worldwide/Overseas-5-EN-300x277.jpg", "https://rndexperts.in/backend-laravel/custom_images/patients-worldwide/Overseas-6-EN-300x277.jpg"]
        },
        {
            id: 3,
            title: "Cambodia",
            photo: ["https://rndexperts.in/backend-laravel/custom_images/patients-worldwide/Overseas-9-EN-300x277.jpg",]
        },
        {
            id: 4,
            title: "India",
            photo: ["https://rndexperts.in/backend-laravel/custom_images/patients-worldwide/API-Integration-for-Modern-Cloud-Based-Applications.jpg", "https://rndexperts.in/backend-laravel/custom_images/patients-worldwide/emded.png", "https://rndexperts.in/backend-laravel/custom_images/patients-worldwide/image_2023_10_06T11_15_11_872Z.png"]
        },
        {
            id: 5,
            title: "Italya",
            photo: ["https://rndexperts.in/backend-laravel/custom_images/patients-worldwide/Overseas-20-EN-300x277.jpg"]
        },
        {
            id: 6,
            title: "Testing Sg",
            photo: ["https://rndexperts.in/backend-laravel/custom_images/patients-worldwide/Overseas-6-EN-300x277.jpg", "https://rndexperts.in/backend-laravel/custom_images/patients-worldwide/Overseas-7-EN-300x277.jpg"]
        },
        // Add more dummy data as needed
    ];

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
    const [activeIndex, setActiveIndex] = useState(0);
    const [singleImg, setSingleImg] = useState([]);

    const handleImageClick = (imageUrlArray, index) => {
        setModal(true)
        setActiveIndex(index);
        setSingleImg(imageUrlArray)
    };

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

            <Sidebar />
            <div className="container">
                <div className='main-article'>
                    <div className="row">
                        <div className='worldwide-section'>
                            <h1 className='worldwide-design'>{t("main-nav.PATIENTS WORLDWIDE")}</h1>
                        </div>
                        <div className='results-videos'>
                            <ReactPlayer
                                url="https://www.youtube.com/watch?v=ONxjA7IiW3U&t=3s"
                                controls
                            />
                        </div>
                        {dummyWorldPatientData.map((item) => {
                            const imageUrlArray = item.photo;
                            return (
                                <div className='world-patient' key={item.id}>
                                    <h4>{item.title}</h4>
                                    {imageUrlArray.map((imageUrl, index) => (
                                        <img key={index} src={imageUrl.trim()} alt={imageUrl.trim()} onClick={() => handleImageClick(imageUrlArray, index)} />
                                    ))}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="col-md-6">
                    <Modal isOpen={modal} toggle={toggleModal} size="md">
                        <ModalBody>
                            <Button close onClick={toggleModal} style={{ position: 'absolute', top: '10px', right: '10px' }} />
                            <Carousel activeIndex={activeIndex}>
                                {singleImg?.map((item, index) => (
                                    <CarouselItem key={index}>
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
    )
}

export default Wide;
