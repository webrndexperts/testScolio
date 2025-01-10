import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ImagePanorama, Viewer } from 'panolens';

import Img1 from '../images/Waiting-Area-scaled.jpg';
import Img2 from '../images/Front-Reception-scaled.jpg';
import Img3 from '../images/Treatment-Room-scaled.jpg';
import Img4 from '../images/Exercise-Room-scaled.jpg';

const ImageRotator = (props) => {
	const { id = 'rotatorCount', image } = props;
	const containerRef = useRef(null);
	const panorama = useRef(null);
	const viewer = useRef(null);
	const [fullPage, setFullPage] = useState(false);

	const createRotator = () => {
		if (panorama.current || viewer.current) {
	      	containerRef.current.innerHTML = '';
	    }

	    let ImgVal = Img1;

	    if(image == 'Img2') { ImgVal = Img2; }
	    else if(image == 'Img3') { ImgVal = Img3; }
	    else if(image == 'Img4') { ImgVal = Img4; }



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
		createRotator();
	}, [])

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