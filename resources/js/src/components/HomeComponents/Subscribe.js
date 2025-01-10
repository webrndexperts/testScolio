import React from 'react';
import { useForm } from 'react-hook-form';
import { subscribeEmail } from '../../Api';
import { useTranslation } from 'react-i18next';
const Subscribe = () => {
    const { t } = useTranslation();
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const subscribe = async (data) => {
        subscribeEmail(data)
        reset();
    }
    
    return (
        <div className="newsletter-section"data-aos="zoom-in" >
            <div className="container">
                <div className="row">
                    <div className="col-sm-7">
                        <div className="newsletter-box-wrapper" >
                            <p>{t('newsletter-section.para')}</p>
                            <form onSubmit={handleSubmit(subscribe)}>
                                <input type="email" {...register('subsrcibe_email', { required: true })} maxLength="50" required placeholder={t('newsletter-section.email')} />
                                {errors.subsrcibe_email && <p>Email is required.</p>}
                                <button type='submit' className="bt">{t('newsletter-section.subs')}</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-5">
                        <div className="newsletter-logo-wrapper">
                            <img src="assets/images/ScolioLife-Logo.webp" alt='scoliolife-logo' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Subscribe
