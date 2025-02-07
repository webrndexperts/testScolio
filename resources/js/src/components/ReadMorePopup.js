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

                        <ModalBody>
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
