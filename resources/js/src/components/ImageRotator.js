import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ImagePanorama, Viewer } from 'panolens';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../reducers/languageSlice';

import Img1 from '../images/Waiting-Area-scaled.jpg';
import Img2 from '../images/Front-Reception-scaled.jpg';
import Img3 from '../images/Treatment-Room-scaled.jpg';
import Img4 from '../images/Exercise-Room-scaled.jpg';

import IdImg1 from '../images/id-waiting.jpg';
import IdImg2 from '../images/id-front.jpg';
import IdImg3 from '../images/id-treatment.jpg';
import IdImg4 from '../images/id-gym.jpg';

import MyImg1 from '../images/my-waiting.jpg';
import MyImg2 from '../images/my-front.jpg';
import MyImg3 from '../images/my-treatment.jpg';
import MyImg4 from '../images/my-gym.jpg';

const ImageRotator = (props) => {
	const { id = 'rotatorCount', image } = props;
	const containerRef = useRef(null);
	const panorama = useRef(null);
	const viewer = useRef(null);
	const [fullPage, setFullPage] = useState(false);
	const currentLanguage = useSelector(selectLanguage);
	const getImageForLanguage = () => {
		let ImgVal;

		if (currentLanguage === 'id_ID') {
		  if (image === 'Img2') { ImgVal = IdImg2; }
		  else if (image === 'Img3') { ImgVal = IdImg3; }
		  else if (image === 'Img4') { ImgVal = IdImg4; }
		  else { ImgVal = IdImg1; } // Default to IdImg1
		} else if (currentLanguage === 'en_MY') {
			if (image === 'Img2') { ImgVal = MyImg2; }
			else if (image === 'Img3') { ImgVal = MyImg3; }
			else if (image === 'Img4') { ImgVal = MyImg4; }
			else { ImgVal = MyImg1; }
		} else {
		  if (image === 'Img2') { ImgVal = Img2; }
		  else if (image === 'Img3') { ImgVal = Img3; }
		  else if (image === 'Img4') { ImgVal = Img4; }
		  else { ImgVal = Img1; } // Default to Img1
		}

		return ImgVal;
	}
	const createRotator = (ImgVal) => {
		if (panorama.current || viewer.current) {
	      	containerRef.current.innerHTML = '';
	    }

	    panorama.current = new ImagePanorama(ImgVal);

	    viewer.current = new Viewer({ container: containerRef.current });      
	    viewer.current.add(panorama.current);
	    viewer.current.enableAutoRate();
	    viewer.current.autoRotateSpeed = 1;

	    var div = document.getElementById(id);
	    if (div) {
	    	var _last = div.lastChild;

	    	if (_last) {
		      	var numChildren = _last.children.length,
		      	span = _last.children[numChildren - 2];

		      	_last.classList.add('older-icons');
		      	span.style.display = 'none';
		    }
	    }
	}

	const zoomIn = () => {
		const fov = viewer.current.camera.fov - 5; // Adjust zoom increment as needed
		viewer.current.camera.fov = Math.max(30, fov); // Limit FOV to prevent extreme zoom
		viewer.current.camera.updateProjectionMatrix();
	}

	const zoomOut = () => {
		const fov = viewer.current.camera.fov + 5; // Adjust zoom increment as needed
		viewer.current.camera.fov = Math.min(100, fov); // Limit FOV to prevent extreme zoom
		viewer.current.camera.updateProjectionMatrix();
	}

	const toggleFullscreen = () => {
		if (document.fullscreenElement) {
			document.exitFullscreen();
			setFullPage(false);
		} else {
			containerRef.current.requestFullscreen().catch((err) => {
				console.log('Failed to enter fullscreen mode:', err);
			});

			setFullPage(true);
		}
	}

	useEffect(() => {
		const ImgVal = getImageForLanguage();
		createRotator(ImgVal);
	}, [currentLanguage]); // Trigger update when language or image changes

	return (
		<Fragment>
			<div ref={containerRef} style={{ width: '100%', height: '300px', margin: '0 auto' }} id={id}></div>

			<div className="custom-buttons" >
				<div className='Zoom-in'onClick={zoomIn}>
					<i className="fa fa-plus" aria-hidden="true"></i>
				</div>
				<div className='Zoom-out'onClick={zoomOut}>
					<i className="fa fa-minus" aria-hidden="true"></i>
				</div>
			</div>
		</Fragment>
	)
}

export default ImageRotator;