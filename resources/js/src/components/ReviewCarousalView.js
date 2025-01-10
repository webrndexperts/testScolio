import React, { useEffect, useState, Fragment } from 'react';
import Carousel from 'better-react-carousel';
import axios from "axios";
import { TbStarFilled } from "react-icons/tb";
import StarRatingComponent from 'react-star-rating-component';
import ApiHook from './CustomHooks/ApiHook';
import ReadLessMore from './ReadLessMore';

const ReviewCarousalView = (props) => {
	const { cols = 2, rows = 1, gap = 10, loop = false } = props;
	const API = process.env.REACT_APP_API_URL;
	const [reviews, setReviews] = useState([]);
	const [currentLanguage] = ApiHook();

	const gatherReviews = async () => {
      	try {
	        const reviewData = await axios.get(`${API}googlereviews/filter/${currentLanguage}`);
	        var _reviews = (reviewData && reviewData.data && reviewData.data.data) ? reviewData.data.data : [];
	        setReviews(_reviews);
      	} catch (error) {
        	console.log("reviews----erorr", error);
      	}
	}

	useEffect(() => {
		if(currentLanguage) {
			gatherReviews();
		}
	}, [currentLanguage])

	return (
		<Fragment>
			{(reviews && reviews.length) ? (
				<Carousel className="custom-reviews" cols={cols} rows={rows} gap={10}>
					{reviews.map((item, k) => {
						return (
							<Carousel.Item key={`carousal-${item.id}`}>
								<div className="testimonial-box">
				                    <div className="box-top">
				                        <div className="profile">
				                            <div className="profile-img">
				                                <img src={item.image} />
				                            </div>
				                            <div className="name-user">
				                                <strong>{item.name}</strong>
				                                <span>{item.publish_date}</span>
				                            </div>
				                        </div>
				                        <div className="reviews">
				                            <StarRatingComponent
				                            	name="rate1" 
									          	starCount={5}
									          	value={item.rating}
				                            />
				                        </div>
				                    </div>
				                    <div className="client-comment">
				                    	<p>
				                    		<ReadLessMore html={item.description} words={70} />
				                    	</p>
				                    </div>
				                </div>
							</Carousel.Item>
						)
					})}
				</Carousel>
			) : null}
		</Fragment>
	)
}

export default ReviewCarousalView;