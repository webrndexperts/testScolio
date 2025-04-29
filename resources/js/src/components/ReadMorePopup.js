import React, { Fragment, useEffect, useRef, useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ReadMorePopup = (props) => {
    const {
        item = "", words = 100, slidable = false, caseIndex, toogleSliderModel, showImage, toogleImageModel
    } = props;
    const [heading, setHeading] = useState("");
    const [text, setText] = useState("");
    const [description, setDescription] = useState("");
    const [show, setShow] = useState(true);
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const imageRef = useRef(null);

    const toggleModal = () => {
        if(slidable) {
            toogleSliderModel(item, caseIndex);
        } else {
            setOpen(!open);
        }
    };

    const handleImageClick = (e) => {
        toggleModal()
    }

    const manageCustomScript = () => {
        let doc = imageRef?.current,
        image = doc.querySelector('img');

        if(image && typeof image != "undefined") {
            image.addEventListener("click", handleImageClick);
        }
    }

    const triggerCheck = () => {
        // Extract image tags
        const imgTags = item.description.match(/<img[^>]*>/g) || [];
    
        // Remove all HTML tags except images
        const textWithoutHtml = item.description
            .replace(/<img[^>]*>/g, '')
            .replace(/<[^>]*>/g, '')
            .replace(/^(&nbsp;|\s)+|(&nbsp;|\s)+$/g, '')
            .replace(/\s+/g, ' ');
    
        // Trim the text if it exceeds the character limit
        let _txt = textWithoutHtml.length > words
            ? textWithoutHtml.slice(0, words) + '<span id="ellipsis">...</span>'
            : textWithoutHtml;
    
        // Reinsert image tags at the beginning
        _txt = imgTags.join(' ') + ' ' + _txt;
    
        setHeading(item.title);
        setDescription(item.description);
        setText(_txt);
        setShow(textWithoutHtml.length > words);
    };
    
    useEffect(() => {
        if (item) {
            triggerCheck();
        }
    }, [item]);

    useEffect(() => {
        if (text && showImage) {
            manageCustomScript();
        }
    }, [text, showImage]);

    return (
        <Fragment>
            <MainContainer ref={imageRef}>
                {text.includes("<img ") ? (
                    <p
                        className="trigger-image custom-single-img"
                        dangerouslySetInnerHTML={{
                            __html: text?.replaceAll('<br>',  ''),
                        }}
                    />
                ) : (
                    <div className="trigger-image custom-single-img">
                        {item?.photo && (
                            <p>
                                <img
                                    src={item?.photo}
                                    alt={item?.slug}
                                    className="alignleft size-full"
                                />
                            </p>
                        )}
                        <p
                            dangerouslySetInnerHTML={{
                                __html: text?.replaceAll('<br>',  ''),
                            }}
                        />
                    </div>
                )}
            </MainContainer>

            {(show && !slidable) ? (
                <Fragment>
                    <Link onClick={toggleModal}>
                        {" "}
                        {t("Patients.read_more")}
                    </Link>

                    <Modal
                        isOpen={open}
                        toggle={toggleModal}
                        className="read-more-popup"
                    >
                        <ModalHeader toggle={toggleModal}>
                            {heading}
                        </ModalHeader>

                        <ModalBody>
                            {description.includes("<img ") ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: description?.replaceAll('<br>',  ''),
                                    }}
                                />
                            ) : (
                                <div>
                                    {item?.photo && (
                                        <p>
                                            <img
                                                src={item?.photo}
                                                alt={item?.slug}
                                                className="alignleft size-full"
                                            />
                                        </p>
                                    )}
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: description?.replaceAll('<br>',  ''),
                                        }}
                                    />
                                </div>
                            )}
                        </ModalBody>
                        <ModalFooter></ModalFooter>
                    </Modal>
                </Fragment>
            ) : (
                (slidable) ? (
                <Link onClick={toggleModal}>
                    {" "}
                    {t("Patients.read_more")}
                </Link>
                ) : null
            )}
        </Fragment>
    );
};

const MainContainer = forwardRef((props, ref) => {
    return (
        <div className="result-contect" ref={ref} {...props}>
            {props.children}
        </div>
    );
});

export default ReadMorePopup;
