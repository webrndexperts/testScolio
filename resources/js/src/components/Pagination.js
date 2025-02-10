import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import ReactPaginate from 'react-paginate';
import ReadLessMore from './ReadLessMore';
import ReadMorePopup from './ReadMorePopup';
import SlidablePopup from './SlidablePopup';
import ImagePopup from './extras/ImagePopup';


const Pagination = ({ XrayData, popup = false, slidable = false, showImage = false }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [popupData, setPopupData] = useState(null);
    const [slideIndex, setSlideIndex] = useState(0);
    const [dataCount, setDataCount] = useState(0);
    const [showSlidePopup, setShowSlidePopup] = useState(false);
    const slidePopupRef = useRef(null);
    const [showImagePopup, setShowImagePopup] = useState(false);
    const [imageData, setImageData] = useState(null);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        // Perform any actions you need when the page changes
    };

    const toogleImageModel = (val = null) => {
        setImageData(val);
        setShowImagePopup(!showImagePopup);
    }

    const toogleSliderModel = (val = null, ind = 0) => {
        setPopupData(val);
        setSlideIndex(ind);
        setShowSlidePopup(!showSlidePopup);
    }

    const getSliderDataTrigger = (kVal) => {
        let item = XrayData[kVal];
        setPopupData(item);
        setSlideIndex(kVal);

        if (slidePopupRef && slidePopupRef?.current) {
            slidePopupRef.current.scrollTop = 0;  // Scroll the modal body to the top
        }

        console.log('slidePopupRef', slidePopupRef);
    }

    // const data = Array.from({ length: 50 }, (_, index) => index + 1);
    const itemsPerPage = 12;
    const pageCount = Math.ceil(XrayData?.length / itemsPerPage);

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // const currentData = XrayData?.slice(startIndex, endIndex);

    const findItemIndex = (id) => {
        return XrayData?.findIndex((item) => item.id === id);
    }

    const currentData = XrayData?.slice(startIndex, endIndex).map((item, index) => ({
        ...item,
        originalKey: findItemIndex(item.id), // or whatever key you use to identify each item
    }));


    useEffect(() => {
        if (!showSlidePopup) {
            setDataCount(XrayData.length);
        }
    }, [XrayData])

    // Properties for the slider popup.
    let sliderPopupProps = {
        popupData, slideIndex, toogleSliderModel, showSlidePopup, getSliderDataTrigger, dataCount, slidePopupRef
    }

    // Properties for image popup.
    let imagePopup = {
        toogleImageModel, showImagePopup, item: imageData
    }

    // Normal popup props.
    let popupProps = {
        words: 300, slidable, toogleSliderModel, showImage, toogleImageModel
    }

    return (
        <>
            <div className="row">
                {currentData?.map((item, key) => (
                    <div className='col-md-4' key={item.id}>
                        <div className='results-sections' data-key={item.originalKey} key={item.id}>
                            <h2> {item.title} </h2>
                            {(popup) ? (
                                <ReadMorePopup item={item} {...popupProps} caseIndex={item.originalKey} />
                            ) : (
                                <ReadLessMore html={item.description} words={300} />
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {XrayData &&
                <ReactPaginate
                    pageCount={pageCount}
                    onPageChange={handlePageChange}
                    containerClassName="pagination"
                    activeClassName="active"
                    previousLabel={currentPage === 0 ? null : 'previous'}
                    nextLabel={currentPage === pageCount - 1 ? null : 'next'}
                />
            }

            {(popup && slidable) ? (
                <SlidablePopup {...sliderPopupProps} />
            ) : null}

            {(showImage) ? (
                <ImagePopup {...imagePopup} />
            ) : null}
        </>
    )
}

export default Pagination
