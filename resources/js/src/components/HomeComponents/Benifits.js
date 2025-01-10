import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBenifits } from '../../reducers/homeSlice';
import { useParams } from 'react-router-dom';

export default function Benifits() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { lang } = useParams();
    const { benifitData } = useSelector((state) => state.benifits);

    useEffect(() => {
        dispatch(fetchBenifits());
    }, [dispatch, lang])
    
    return (
        <>
            <div className="banifits-section">
                <div className="container">
                    <h2  data-aos="fade-down">  {t("newsletter-section.The benefits of the world-class scoliosis treatment at ScolioLife™Clinic include")}</h2>
                  
                    <div className="row">
                        {benifitData?.map((item, index) => (
                            <div key={index} className="col-sm-3" data-aos="slide-up">
                                <div className="benifits-box-wrapper">
                                    <div className="counting-box">
                                       <p>{item.count_numbers}</p>
                                    </div>
                                    <div className="benifits-icon-box">
                                        <div className="benifits-icon">
                                            <img src={item.photo} alt='item.photo' loading="lazy" />
                                        </div>
                                        <h3>{item.title}</h3>
                                        <div dangerouslySetInnerHTML={{ __html: item.description }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

