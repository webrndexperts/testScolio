import React, { useMemo, useState } from 'react';
// import Youtube from '../HomeComponents/Youtube';
// import Mediacrop from '../../images/mediacrop.webp';
// import Apple from '../../images/apple ios.webp';
// import Amazon from '../../images/amazon.webp';
// import GogglePlay from '../../images/google play.webp';
// import Mediacrop1 from '../../images/mediacrop.webp';
// import Apple1 from '../../images/apple ios.webp';
// import Mediacrop2 from '../../images/mediacrop.webp';
// import GogglePlay1 from '../../images/google play.webp';
// import Mediacro3 from '../../images/mediacrop.webp';
import { Modal, ModalBody, Carousel, CarouselItem, CarouselControl,ModalHeader } from 'reactstrap';
import ReactPlayer from 'react-player';
const ImageSlider = ({ productDetail }) => {
//   console.log("productDetail------------",productDetail);
    // const imagePath = [Mediacrop, Apple, Amazon, GogglePlay, Mediacrop1, Apple1, Mediacrop2, GogglePlay1, Mediacro3]
    //  imageUrlArray.push()
    
    // console.log("imageUrlArray----", imageUrlArray);
    const productDetails = useMemo(() => productDetail, [productDetail])
    const imageUrlArray = productDetails?productDetails?.product_gallery?.split(','):[''];
    imageUrlArray?.splice(0, 0,productDetail?.photo);
    // console.log("productDetail", productDetails);
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
            // setModal(false)
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
                // <iframe width="980" height="450" src="https://www.youtube.com/embed/r32oLAKDPkk" frameborder="0" allowfullscreen=""></iframe>
                :
                <img src={productDetails?.photo} alt={productDetails?.photo}></img>
            }
            </div>
            </div>
            <div className="col-md-2">
                <div className='product-img'>
                    {imageUrlArray?.slice(0, 4).map((item, index) => (
                        <div key={index} onClick={() => handleImageClick(index)}>
                            <img src={item} alt={item} ></img>
                        </div>
                    ))}
                </div>
                </div>
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
