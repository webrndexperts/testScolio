import React, {
    Fragment,
    useEffect,
    useState,
    forwardRef,
    useRef,
} from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import expand from '/images/expand.png'
import shrink from '/images/shrink.png'
const SlidablePopup = (props) => {
    const {
        popupData,
        slideIndex,
        toogleSliderModel,
        showSlidePopup,
        getSliderDataTrigger,
        dataCount,
        slidePopupRef,
        zoomed,
        setZoomed,
    } = props;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState("");
    const [slug, setSlug] = useState("");
    const [disablePrev, setDisablePrev] = useState(false);
    const [disableNext, setDisableNext] = useState(false);
    const modalRef = useRef(null);

    const manageDisableButtons = (key) => {
        var _ct = dataCount - 1;
        if (key == 0) {
            setDisablePrev(true);
        } else {
            setDisablePrev(false);
        }

        if (key == _ct) {
            setDisableNext(true);
        } else {
            setDisableNext(false);
        }
    };

    const nextSlide = () => {
        var _key = slideIndex;
        _key = _key + +1;

        if (_key < dataCount) {
            getSliderDataTrigger(_key);
        }
    };

    const prevSlide = () => {
        var _key = slideIndex;
        _key = _key - 1;

        if (_key >= 0) {
            getSliderDataTrigger(_key);
        }
    };

    useEffect(() => {
        manageDisableButtons(slideIndex);
    }, [slideIndex]);

    useEffect(() => {
        if (popupData) {
            setTitle(popupData.title);
            setDescription(popupData.description);
            setPhoto(popupData.photo);
            setSlug(popupData.slug);
        }
    }, [popupData]);




    useEffect(() => {
        if (!description) return;
    
        const modal = modalRef.current;
        if (!modal) return;
    
        const images = modal.querySelectorAll("img");
        if (!images) return;
    
        images.forEach((img) => {
            if (img.parentNode.classList.contains("img-wrapper")) return;
    
            // Create a wrapper div
            const wrapperDiv = document.createElement("div");
            wrapperDiv.classList.add("img-wrapper");
    
            // Create a help text span
            const helpText = document.createElement("span");
            helpText.innerText = "Click image to enlarge";
            helpText.classList.add("help-text");
    
            // Create an expandable icon
            const expandIcon = document.createElement("div");
            const isZoomed = img.classList.contains("result-img-clicked");
            expandIcon.classList.add("expand-icon");
            // expandIcon.style.backgroundImage = `url(${expand})`;
            expandIcon.style.backgroundImage = isZoomed ?  `url(${shrink})` : `url(${expand})`;
    
            // Insert the wrapper before the image
            img.parentNode.insertBefore(wrapperDiv, img);
            wrapperDiv.append(helpText, expandIcon, img);
    
            // Toggle zoom function
            const toggleZoom = () => {
                setZoomed((prev) => !prev);
                img.classList.toggle("result-img-clicked");
                const isZoomed = img.classList.contains("result-img-clicked");
                
                helpText.style.display = isZoomed ? "none" : "block";

                img.classList.toggle("alignleft", !isZoomed);
                expandIcon.style.backgroundImage = isZoomed ?  `url(${shrink})` : `url(${expand})`;
                expandIcon.classList.toggle("shrink-icon", isZoomed);
                expandIcon.classList.toggle("expand-icon", !isZoomed);
                
            };
    
            // Expand icon click event
            expandIcon.onclick = toggleZoom;
    
            // Image click event 
            img.onclick = (e) => {
                toggleZoom();
            };
    
            // Show icon on hover
            wrapperDiv.addEventListener("mouseenter", () => {
                expandIcon.style.display = "flex";
            });
    
            wrapperDiv.addEventListener("mouseleave", () => {
                expandIcon.style.display = "none";
            });
    
            // Apply zoom state if already zoomed
            if (zoomed && !img.classList.contains("result-img-clicked")) {
                img.classList.add("result-img-clicked");
                img.classList.toggle("alignleft", !zoomed);
                expandIcon.style.backgroundImage = zoomed ?  `url(${shrink})` : `url(${expand})`;
                expandIcon.classList.toggle("shrink-icon", zoomed);
                expandIcon.classList.toggle("expand-icon", !zoomed);
            }
        });
    }, [description, slideIndex, photo]);
    
    

    return (
        <Fragment>
            <Modal
                isOpen={showSlidePopup}
                toggle={toogleSliderModel}
                // className="read-more-popup custom-slider-popup"
                className={`read-more-popup custom-slider-popup ${
                    zoomed ? "result-box-clicked" : ""
                }`}
                innerRef={modalRef}
            >
                <ModalHeader toggle={toogleSliderModel}>{title}</ModalHeader>

                <ModalBodyTags ref={slidePopupRef}>
                    <div className="main-data">
                        {description?.includes("<img ") ? (

                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: description?.replaceAll(
                                            "<br>",
                                            ""
                                        ),
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
                                        __html: description?.replaceAll(
                                            "<br>",
                                            ""
                                        ),
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </ModalBodyTags>
                <ModalFooter className="border-0"></ModalFooter>
                <div className="slide-btns">
                    <Button
                        className="prev"
                        disabled={disablePrev}
                        onClick={prevSlide}
                    >
                        <FaAngleLeft />
                    </Button>
                    <Button
                        className="next"
                        disabled={disableNext}
                        onClick={nextSlide}
                    >
                        <FaAngleRight />
                    </Button>
                </div>
            </Modal>
        </Fragment>
    );
};

const ModalBodyTags = forwardRef((props, ref) => {
    return (
        <div className="modal-body result-modal" ref={ref} {...props}>
            {props.children}
        </div>
    );
});

export default SlidablePopup;
