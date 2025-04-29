import React, { useMemo, useState } from 'react';
import { Modal, ModalBody, Carousel, CarouselItem, CarouselControl,ModalHeader } from 'reactstrap';
import ReactPlayer from 'react-player';
const ImageSlider = ({ productDetail }) => {

    const productDetails = useMemo(() => productDetail, [productDetail])
    const galleryImages = productDetails?.product_gallery ? productDetails.product_gallery.split(',').filter(img => img.trim() !== '') : [];
    const imageUrlArray = [productDetail?.photo, ...galleryImages];
    const [modal, setModal] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleImageClick = (index) => {
        setModal(true)
        setActiveIndex(index);
    };
    const toggleModal = () => setModal(!modal);
    const next = () => {
        if (activeIndex < imageUrlArray.length - 1) {
            setActiveIndex(activeIndex + 1);
        } else {
            setActiveIndex(0);
        }
    };
    const previous = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        } else {
            setActiveIndex(imageUrlArray.length - 1);
        }
    };

    return (
        <>
        {/* <div className="container"> */}
            <div className="col-md-5">
                <div className='product-video' data-test={ productDetails?.featured_video_url }>
                {productDetails?.featured_video_url !== ""?
                <ReactPlayer
                   url={productDetails?.featured_video_url}
                    controls
                />
                :
                <img src={productDetails?.photo} alt={productDetails?.photo}></img>
            }
            </div>
            </div>
            {(galleryImages.length > 0 || productDetail?.photo) && (
            <div className="col-md-2">
                <div className='product-img'>
                    {imageUrlArray?.slice(0, 4).map((item, index) => (
                        <div key={index} onClick={() => handleImageClick(index)}>
                            <img src={item} alt={item} />
                        </div>
                    ))}
                </div>
                </div>
                )}
        {/* </div> */}


{/* // model */}
    <Modal isOpen={modal} toggle={toggleModal} size="lg">
        <ModalHeader toggle={toggleModal}></ModalHeader>
        {/* <span className="close-btn" onClick={() => setModal((modal) => !modal)}><i className="fa fa-times" aria-hidden="true"></i></span> */}
        <ModalBody>
            <Carousel activeIndex={activeIndex} next={next} previous={previous}>
                {imageUrlArray?.map((item, index) => (
                    <CarouselItem key={index}>
                        <img src={item} alt={item} style={{ width: '100%' }} />
                    </CarouselItem>
                ))}
                <CarouselControl direction="prev" onClickHandler={previous} />
                <CarouselControl direction="next" onClickHandler={next} />
            </Carousel>
            {/* <img src={imagePath[activeIndex]} alt={item} style={{ width: '100%' }} /> */}
        </ModalBody>
    </Modal>
</>
    )
}

export default ImageSlider
