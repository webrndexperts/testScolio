import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { selectLanguage } from '../../reducers/languageSlice';
import { fetchNonTreatments } from '../../reducers/homeSlice';

export default function NonTreatments() {
    const { t } = useTranslation();
    const {lang}=useParams();
    const dispatch = useDispatch();
    const { nontreatmentData } = useSelector((state)=>state.nontreatment);

    useEffect(()=>{
        dispatch(fetchNonTreatments());
    },[dispatch,lang])

    return (
        <>
            <div className="non-treatments" data-aos="fade-up">
                <div className="container">
                    <div className="row">
                        {nontreatmentData?.map((item, index) => (
                            <div className="col-sm-4" key={index}>
                                <div className="treatments-wrpper">
                                    <img src={item.photo} alt={item.title} loading="lazy"/>
                                    <h3>{item.title}</h3>
                                    <p dangerouslySetInnerHTML={{ __html: item.description }} ></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
