import React, { useEffect,useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../../reducers/languageSlice';
import { useTranslation } from 'react-i18next';
import { HiMiniMinus } from "react-icons/hi2";
import { HiPlus } from "react-icons/hi2";

export default function Faq() {
    const { t } = useTranslation();
    const [data, setData] = useState([]);
    const [totalHalf, setTotalHalf] = useState(0);
    const currentLanguage = useSelector(selectLanguage);
    const API = useMemo(() => `${process.env.REACT_APP_API_URL}accordions/filter/${currentLanguage}`, [currentLanguage]);
    // const API = process.env.REACT_APP_API_URL + 'accordions/filter/' + currentLanguage;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const responseData = await response.json();
                // console.log('respo--', responseData);
                let ln = responseData.data.length;
                setData(responseData.data);
                setTotalHalf(ln / 2);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
        fetchData();
    }, [API]);

    const [openItemLeft, setOpenItemLeft] = useState(null);
    const [openItemRight, setOpenItemRight] = useState(null);

    const toggleAccordion = (index, colIndex) => {
        if (colIndex === 0) {
            setOpenItemLeft((prevOpenItem) => (prevOpenItem === index ? null : index));
            setOpenItemRight(null); // Close the right column accordion when left column is opened
        } else {
            setOpenItemRight((prevOpenItem) => (prevOpenItem === index ? null : index));
            setOpenItemLeft(null); // Close the left column accordion when right column is opened
        }
    };

    return (
        <div className="faq-section" data-aos="flip-right">
            <div className="container">
                <h2>{t('form.Frequently Asked Question')}</h2>
                <div className="row">
                    {[0, 1].map((colIndex) => (
                        <div key={colIndex} className="col-md-6">
                            <div className="accordion-single js-acc-single">
                                {data
                                    .filter((acc, index) => (colIndex === 0 ? index < totalHalf : index >= totalHalf))
                                    .map((acc, index) => (
                                        <div
                                            key={index}
                                            className={`accordion-single-item js-acc-item ${
                                                (colIndex === 0 && openItemLeft === index) ||
                                                (colIndex === 1 && openItemRight === index)
                                                    ? 'is-open'
                                                    : ''
                                            }`}
                                        >
                                            <h4
                                                className="accordion-single-title js-acc-single-trigger"
                                                onClick={() => toggleAccordion(index, colIndex)}
                                            >
                                                {colIndex === 0 ? (
                                                    openItemLeft === index ? (
                                                        <HiMiniMinus />
                                                    ) : (
                                                        <HiPlus />
                                                    )
                                                ) : openItemRight === index ? (
                                                    <HiMiniMinus />
                                                ) : (
                                                    <HiPlus />
                                                )}
                                                {acc.title}
                                            </h4>
                                            <div className="accordion-single-content">
                                                <div dangerouslySetInnerHTML={{ __html: acc.description }} />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}