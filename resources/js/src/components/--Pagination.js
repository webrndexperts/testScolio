import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import ReactPaginate from 'react-paginate';
import ReadLessMore from './ReadLessMore';
import ReadMorePopup from './ReadMorePopup';


const Pagination = ({ XrayData, popup = false }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        // Perform any actions you need when the page changes
    };

    // const data = Array.from({ length: 50 }, (_, index) => index + 1);
    const itemsPerPage = 12;
    const pageCount = Math.ceil(XrayData?.length / itemsPerPage);

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = XrayData?.slice(startIndex, endIndex);
    // console.log("XrayData====", XrayData);
    // console.log("pageCount====", pageCount);
    // console.log("startIndex====", startIndex);
    // console.log("endIndex====", endIndex);
    // console.log("currentData====", currentData);

    return (
        <>
            <div className="row">
                {currentData?.map((item) => (
                    <div className='col-md-4'>
                        <div className='results-sections' key={item.id}>
                            <h2> { item.title } </h2>
                            {(popup) ? (
                                <ReadMorePopup item={item} words={300} />
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
        </>
    )
}

export default Pagination
