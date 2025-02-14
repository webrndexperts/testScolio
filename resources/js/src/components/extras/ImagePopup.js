import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";

const ImagePopup = (props) => {
    const { item, toogleImageModel, showImagePopup } = props;
    const [title, setTitle] = useState('');
    const [photo, setPhoto] = useState('');

    useEffect(() => {
        if(item) {
            setTitle(item.title);
            setPhoto(item.photo);
        }
    }, [item])
    

    return (
        <Modal
            isOpen={showImagePopup}
            toggle={toogleImageModel}
            className="custom-image-popup"
        >
            <ModalHeader toggle={toogleImageModel}>
                { title }
            </ModalHeader>

            <ModalBody>
                {(photo) ? (
                    <img src={photo} className='w-100' alt={title} />
                ) : (
                    <span>Image not found.</span>
                )}
            </ModalBody>
        </Modal>
    )
}

export default ImagePopup;