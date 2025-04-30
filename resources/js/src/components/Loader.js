import React from 'react';

const Loader = () => {
	return (
		<div className="language_spinner">
	        <div
	            className="spinner-border text-warning language_spinner"
	            role="status"
	        >
	            <span className="sr-only">Loading...</span>
	        </div>
	        <span className="empty_layer"></span>
	    </div>
	);
};

export default Loader;
