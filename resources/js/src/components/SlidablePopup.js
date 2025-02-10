import React, { Fragment, useEffect, useState, forwardRef } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const SlidablePopup = (props) => {
    const {
        popupData, slideIndex, toogleSliderModel, showSlidePopup, getSliderDataTrigger,
        dataCount, slidePopupRef
    } = props;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');
    const [slug, setSlug] = useState('');
    const [disablePrev, setDisablePrev] = useState(false);
    const [disableNext, setDisableNext] = useState(false);

    const manageDisableButtons = (key) => {
        var _ct = dataCount - 1;
        if(key == 0) {
            setDisablePrev(true);
        } else {
            setDisablePrev(false);
        }

        if(key == _ct) {
            setDisableNext(true);
        } else {
            setDisableNext(false);
        }
    }

    const nextSlide = () => {
        var _key = slideIndex;
        _key = _key+ + 1;

        if(_key < dataCount) {
            getSliderDataTrigger(_key);
        }
    }

    const prevSlide = () => {
        var _key = slideIndex;
        _key = _key - 1;

        if(_key >= 0) {
            getSliderDataTrigger(_key);
        }
    }

    useEffect(() => {
        manageDisableButtons(slideIndex);
    }, [slideIndex])

    useEffect(() => {
        if(popupData) {
            setTitle(popupData.title);
            setDescription(popupData.description);
            setPhoto(popupData.photo);
            setSlug(popupData.slug);
        }
    }, [popupData])

    return (
        <Fragment>
            <Modal
                isOpen={showSlidePopup}
                toggle={toogleSliderModel}
                className="read-more-popup custom-slider-popup"
            >
                <ModalHeader toggle={toogleSliderModel}>
                    { title }
                </ModalHeader>

                <ModalBodyTags ref={slidePopupRef}>
                    <div className="main-data">
                        {description?.includes("<img ") ? (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: description,
                                }}
                            />
                        ) : (
                            <div>
                                {photo && (
                                    <p>
                                        <img
                                            src={photo}
                                            alt={slug}
                                            className="alignleft size-full"
                                        />
                                    </p>
                                )}
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: description,
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    
                    <div className="slide-btns">
                        <Button className="prev" disabled={disablePrev} onClick={prevSlide}>
                            <FaAngleLeft />
                        </Button>
                        <Button className="next" disabled={disableNext} onClick={nextSlide}>
                            <FaAngleRight />
                        </Button>
                    </div>
                </ModalBodyTags>
            </Modal>
        </Fragment>
    )
}

const ModalBodyTags = forwardRef((props, ref) => {
    return (
        <ModalBody ref={ref} {...props}>
            {props.children}
        </ModalBody>
    );
});

export default SlidablePopup;