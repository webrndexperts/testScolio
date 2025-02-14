import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const ReadMorePopup = (props) => {
    const { item = "", words = 200 } = props;
    const [heading, setHeading] = useState("");
    const [text, setText] = useState("");
    const [description, setDescription] = useState("");
    const [show, setShow] = useState(true);
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();

    const toggleModal = () => {
        setOpen(!open);
    };

    const triggerCheck = () => {
        var _txt =
            item.description.length > words
                ? item.description.slice(0, words) +
                  '<span id="ellipsis">...</span>'
                : item.description;

        setHeading(item.title);
        setDescription(item.description);
        setText(_txt);
        setShow(item.description.length > words ? true : false);
    };

    useEffect(() => {
        if (item) {
            triggerCheck();
        }
    }, [item]);

    useEffect(() => {
        if (open) {
            // Wait for images to load using setTimeout
            setTimeout(() => {
                const images = document.querySelectorAll(".result-modal img");
                if (images.length > 0) {
                    images.forEach((img) => {
                        img.onload = () => {
                            img.classList.add("loaded-img");
                        };
                        img.addEventListener("click", () => {
                            img.classList.toggle("result-img-clicked");
                            if (img.classList.contains("result-img-clicked")) {
                                img.style.width = "100%";
                                img.style.cursor = "zoom-out";
                            } else {
                                img.style.width = ""; 
                                img.style.cursor = "zoom-in"; 
                            }
                        });
                    });
                }
            }, 500); // Delay to wait for images to load
        }
    }, [open]);

    
    return (
        <Fragment>
            {text.includes("<img ") ? (
                <div
                    dangerouslySetInnerHTML={{
                        __html: text,
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
                            __html: text,
                        }}
                    />
                </div>
            )}
            {show ? (
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

                        <ModalBody className="result-modal">
                            {description.includes("<img ") ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: description,
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
                                            __html: description,
                                        }}
                                    />
                                </div>
                            )}
                        </ModalBody>
                    </Modal>
                </Fragment>
            ) : null}
        </Fragment>
    );
};

export default ReadMorePopup;
