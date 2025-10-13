import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import {
    ThankuEn,
    ThankuCs,
    ThankuCt,
    ThankuDe,
    ThankuEs,
    ThankuFr,
    ThankuId,
    ThankuJp,
    ThankuIt,
} from "../images/thank_you";
import ApiHook from "../components/CustomHooks/ApiHook";
import { scrollToTop } from "../components/Helper";
import { setLanguage, setUrlLanguage } from "../reducers/languageSlice";

const ThankYou = () => {
    const [currentLanguage, urlLanguage] = ApiHook();
    const [image, setImage] = useState(ThankuEn);
    const { lang } = useParams();
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const dispatch = useDispatch();
    const conversionIds = {
        en_SG: "AW-1006314203/DfMYCJCelssaENvF7N8D", // Singapore
        en_MY: "AW-16748735355/yhPHCKfGlcsaEPvWtbI-", // Malaysia (using the ID you provided)
        default: "AW-1006314203/DfMYCJCelssaENvF7N8D", // Fallback for other languages
    };
    const getImage = () => {
        var _image = ThankuEn;

        switch (currentLanguage) {
            case "fr_FR":
                _image = ThankuFr;
                break;
            case "id_ID":
                _image = ThankuId;
                break;
            case "id_IT":
                _image = ThankuIt;
                break;
            case "es_ES":
                _image = ThankuEs;
                break;
            case "de_DE":
                _image = ThankuDe;
                break;
            case "zh_HK":
                _image = ThankuCs;
                break;
            case "zh_CN":
                _image = ThankuCt;
                break;
            case "ja_JP":
                _image = ThankuJp;
                break;
            default:
                _image = ThankuEn;
                break;
        }

        return _image;
    };

    const navigateToThanks = () => {
        navigate(`${urlLanguage}/thank-you`);
    };

    // Append gtag conversion script to head based on language
    const appendGtagConversionScript = () => {
        if (currentLanguage === "en_SG" || currentLanguage === "en_MY") {
            const conversionId = conversionIds[currentLanguage] || conversionIds["default"];
            const scriptId = `gtag-conversion-${currentLanguage}`; // Unique ID to avoid duplicates
            const existingScript = document.getElementById(scriptId);

            if (!existingScript) {
                const script = document.createElement("script");
                script.id = scriptId;
                script.innerHTML = `gtag('event', 'conversion', {'send_to': '${conversionId}'});`;
                document.head.appendChild(script);
            }
        }
    };

    useEffect(() => {
        scrollToTop();

        if (typeof lang != "undefined" && lang !== currentLanguage) {
            dispatch(setUrlLanguage(i18n.language));
            dispatch(setLanguage(i18n.language));
            navigateToThanks();
        }

        if (typeof lang == "undefined") {
            dispatch(setUrlLanguage("en_US"));
            dispatch(setLanguage("en_US"));
            navigateToThanks();
        }
        appendGtagConversionScript();
    }, [i18n.language, currentLanguage, dispatch, navigate, lang, urlLanguage]);

    return (
        <div className="thank-you-page">
            <img src={getImage()} alt={getImage()} />
        </div>
    );
};

export default ThankYou;
