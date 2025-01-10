import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, Carousel, CarouselItem, CarouselControl, ModalHeader } from "reactstrap";
import $ from 'jquery';

const CustomModelPopup = (props) => {
	const { checkClass = '' } = props;
	const [images, setImages] = useState([]);
	const [triggered, setTriggered] = useState(true);
	const [show, setShow] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);

	const toggleModal = () => {
		setShow(!show);
	}

	const generateImages = (parent, element) => {
		var _images = parent.querySelectorAll('img'), arrayValue = [];

		for (var i = 0; i < _images.length; i++) {
			var img = _images[i];
			arrayValue.push(img.src);

			if(img == element) {
				setActiveIndex(i);
			}
		}
		setImages(arrayValue);
		toggleModal()
	}

	const checkClassPage = () => {
		$(document).on('click', `.${checkClass} img`, function(e) {
			var _parent = e.target.closest(`.${checkClass}`);
			generateImages(_parent, e.target);
		});

		setTriggered(false);
	}

	const next = () => {
		if (activeIndex < images.length - 1) {
			setActiveIndex(activeIndex + 1);
		} else {
			setActiveIndex(0);
		}
	};

	const previous = () => {
		if (activeIndex > 0) {
			setActiveIndex(activeIndex - 1);
		} else {
			setActiveIndex(images.length - 1);
		}
	};

	useEffect(() => {
		if(checkClass && triggered) {
			checkClassPage();
		}
	}, [checkClass])

	return (
		<Modal isOpen={show} toggle={toggleModal} size="md">
			<ModalHeader toggle={toggleModal}></ModalHeader>

			<ModalBody>
				<Carousel activeIndex={activeIndex} next={next} previous={previous}>
					{(images && images.length) &&
						images.map((item, index) => (
							<CarouselItem key={index}>
								<img src={item} alt="" style={{ width: "100%" }} />
							</CarouselItem>
						))
					}

					<CarouselControl direction="prev" onClickHandler={previous} />
					<CarouselControl direction="next" onClickHandler={next} />
				</Carousel>
			</ModalBody>
		</Modal>
	)
}

export default CustomModelPopup;