import React from 'react';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const Rating = ({ stars }) => {
    const starRating = Array.from({ length: 5 }, (elem, index) => {
        let number = index + 0.5;

        return (
            <span key={index}>
                {
                    stars >= index + 1 ? (
                        <FaStar className='icon' />
                    ) : stars >= number ? (
                        <FaStarHalfAlt className='icon' />
                    ) : (
                        <AiOutlineStar />
                    )
                }
            </span>
        )
    })
    return (
        // <div>
        <>
        {starRating}
        </>
            
        // </div>
    )
}

export default Rating
