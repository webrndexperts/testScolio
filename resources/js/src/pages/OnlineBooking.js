import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TopBanner from "../components/TopBanner";
import MetaCreator from "../components/MetaCreator";
import { useSelector } from "react-redux";
import { selectLanguage } from "../reducers/languageSlice";
import { useNavigate } from "react-router-dom";
import ApiHook from "../components/CustomHooks/ApiHook";

const OnlineBooking = () => {
    const { t } = useTranslation();
    let metaProps = { title: t("page.online-booking") };
    const navigate = useNavigate();
    const [currentLanguage,urlLanguage] = ApiHook();

    useEffect(() => {
        navigate(`${urlLanguage}/online-booking`);
    }, [currentLanguage, navigate, urlLanguage]);

    return (
        <Fragment>
            <TopBanner title={t("page.online-booking")} />
            <MetaCreator {...metaProps} />

            {currentLanguage === "en_MY" ? (
                <div className="custom-iframe">
                    <iframe
                        src="https://calendar.google.com/calendar/u/0/appointments/AcZssZ2TqAIY5UIPxzP-EDaEkKISdkTf2qniUQmsIQw="
                        style={{
                            border: "0",
                            width: "100%",
                            height: "600",
                            frameBorder: "0",
                        }}
                    />
                </div>
            ) : (
                <div className="custom-iframe">
                    <iframe
                        src="https://calendar.google.com/calendar/appointments/AcZssZ2ZSvJEdJjQgBwtDftJ1R_ne-M7HEtSlAg7fUk=?gv=true"
                        style={{
                            border: "0",
                            width: "100%",
                            height: "600",
                            frameBorder: "0",
                        }}
                    />
                </div>
            )}
        </Fragment>
    );
};

export default OnlineBooking;
