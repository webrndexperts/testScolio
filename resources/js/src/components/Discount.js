import React, { useState, useEffect } from 'react';
// import { Modal, ModalBody, Carousel, CarouselItem, CarouselControl, ModalHeader } from 'reactstrap';
// import DiscoutImg from '../images/thumb_Newsletter.png'
import { useForm } from 'react-hook-form';
import { subscribeEmail } from '../Api';
import Modal from 'react-modal';
const Discount = () => {
    const [modal, setModal] = useState(true);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const toggleModal = () => {
        setModal(!modal);
        sessionStorage.setItem('discount', false);
    }

    useEffect(() => {
        const isModel = window.sessionStorage.getItem("discount");
        // console.log("isModel", isModel);
        if (isModel === true || isModel === null) {
            setModal(true);
        } else {
            setModal(false)
        }
    }, [])

    const subscribe = async (data) => {
        try {
            const subscribedData = await subscribeEmail(data)
            setModal(false)
            reset();
        } catch (error) {
            console.log("errror", error);
        }
    }
    return (
        <Modal
            isOpen={modal}
            onRequestClose={toggleModal}
            contentLabel="Example Modal"
        >
            <div className="popup-newsletter">
                <div className="thumb-newsletter">
                    <span className="close-btn" onClick={toggleModal}> <i className="fa fa-times" aria-hidden="true"></i>
                    </span>
                    <h3 className="discount">Unlock 15% Discount</h3>
                    <p className="sign-today">Sign up to our email list and get 15% off your order today!</p>
                    <div className="mc4wp-form-fields">
                        <form onSubmit={handleSubmit(subscribe)}>
                        <input type="email" name="EMAIL" placeholder="Email Address"
                        {...register('subsrcibe_email', { required:true })}
                        />
                        {errors.subsrcibe_email && <p classNameName='validations'>Please enter your email.</p>}
                        {/* {errors.subsrcibe_email && <p>Please enter your email</p>} */}
                        <input type="submit" value="Unlock My Discount" />
                        </form>
                    </div>
                    <h4 className="offers">By signing up I agree to receive our newletter which contains scoliosis updates, research
                        and
                        special offers.
                    </h4>
                </div>
            </div>
        </Modal>
    )
}

export default Discount
