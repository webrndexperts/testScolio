import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import TopBanner from "../components/TopBanner";
import MetaCreator from "../components/MetaCreator";
import { useSelector } from "react-redux";
import { selectLanguage } from "../reducers/languageSlice";
import { useNavigate } from "react-router-dom";
import ApiHook from "../components/CustomHooks/ApiHook";
import { getOnlineBookingUrl } from "../Api";

const OnlineBooking = () => {
    const { t } = useTranslation();
    let metaProps = { title: t("page.online-booking") };
    const navigate = useNavigate();
    const [currentLanguage, urlLanguage] = ApiHook();
    const [bookingUrl, setBookingUrl] = useState("");

    useEffect(() => {
        navigate(`${urlLanguage}/online-booking`);
    }, [currentLanguage, navigate, urlLanguage]);

    useEffect(() => {
        const fetchBookingUrl = async () => {
            const data = await getOnlineBookingUrl();
            const matched = data.find(
                (item) => item.language === currentLanguage
            );
            const fallback = data.find((item) => item.language === "default");
            setBookingUrl(matched ? matched.url : fallback?.url || "");
        };

        fetchBookingUrl();
    }, [currentLanguage]);

    return (
        <Fragment>
            <TopBanner title={t("page.online-booking")} />
            <MetaCreator {...metaProps} />

            {bookingUrl && (
                <div className="custom-iframe">
                    <iframe
                        src={bookingUrl}
                        style={{
                            border: "0",
                            width: "100%",
                            height: "600px",
                        }}
                        frameBorder="0"
                        allowFullScreen
                    />
                </div>
            )}
            
        </Fragment>
    );
};

export default OnlineBooking;
