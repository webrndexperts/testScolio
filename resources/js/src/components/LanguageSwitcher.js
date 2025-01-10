import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setLanguage, setUrlLanguage } from "../reducers/languageSlice";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import ApiHook from "./CustomHooks/ApiHook";
import { selectLanguage } from "../reducers/languageSlice";
import { mobileScreen } from "../providers/constants";
import { matchUrlAndStoredLanguage } from "../hooks/customFunctions";
import { getCurrentCountry, getNumberApi } from "../Api";
import { addContactData } from "../reducers/cartSlice";

let checkLoader = false;

const LanguageSwitcher = () => {
    const dispatch = useDispatch();
    const [currentLanguage] = ApiHook();
    const currentLanguages = useSelector(selectLanguage);
    const savedLanguage = matchUrlAndStoredLanguage();
    const langIcon = "/assets/images/icons/sg.png";
    const { i18n } = useTranslation();
    const API = process.env.REACT_APP_API_URL + "languages";
    const [data, setData] = useState([]);
    const [name, setName] = useState(i18n.language);
    const [selectedLanguage, setSelectedLanguage] = useState(savedLanguage);
    const [isHovered, setIsHovered] = useState(false);
    // const [initialLanguageSet, setInitialLanguageSet] = useState(false);
    const [initialLanguageSet, setInitialLanguageSet] = useState(
        JSON.parse(sessionStorage.getItem("initialLanguageSet")) || false
    );
    // const [langSwiched, setlangSwiched] = useState(JSON.parse(localStorage.getItem("langSwiched")) || false );
    const urlLang = location.pathname.split("/")[1];

    const handleMouseEnter = () => {
        if (window.innerWidth >= mobileScreen) {
            setIsHovered(true);
        }
    };

    const handleMouseLeave = () => {
        if (window.innerWidth >= mobileScreen) {
            setIsHovered(false);
        }
    };

    const callContactData = async (val) => {
        const response = await getNumberApi(val);
        dispatch(addContactData(response?.number));
    };

    const changeLanguage = async (userData) => {
        if (userData.code) {
            i18n.changeLanguage(userData.code);
            localStorage.setItem("i18nextLng", userData.code);
            dispatch(setUrlLanguage(userData.code));
            dispatch(setLanguage(userData.code));
            setIsHovered(false);
            setName(userData.name);
            setSelectedLanguage(userData);
        }
    };

    const getObjectByKeyCode = (items, keyCode) => {
        // Find the object in the array with the matching key code
        return items.find((item) => item.code === keyCode);
    };

    const checkTrigger = () => {
        // if(isHovered) {
        setIsHovered(!isHovered);
        // }
    };

    const apiGet = () => {
        checkLoader = true;
        fetch(API)
            .then((response) => response.json())
            .then((json) => {
                checkLoader = false;
                setData(json);
                checkLoader = false;
                let selectedLanguage = getObjectByKeyCode(json, savedLanguage);
                setSelectedLanguage(selectedLanguage);
            })
            .catch((error) => {
                console.log("Error fetching data:", error);
                checkLoader = false;
            });
    };

    useEffect(() => {
        const initializeLang = async () => {
            try {
                const country = await getCurrentCountry();

                const langRegex = /^[a-z]{2}_[A-Z]{2}$/;
                if (!initialLanguageSet) {
                    let detectedLanguage;
                    if (langRegex.test(urlLang)) {
                        detectedLanguage = urlLang;
                    } else {
                        if (country?.country === "ID") {
                            detectedLanguage = "id_ID";
                        } else if (country?.country === "MY") {
                            detectedLanguage = "en_MY";
                        } else if (country?.country === "SG") {
                            detectedLanguage = "en_SG";
                        } else {
                            detectedLanguage = "en_US"; // Fallback language
                        }
                    }
                    //     if (country?.country === "ID") {
                    //       detectedLanguage = "id_ID";
                    //   } else if (country?.country === "MY") {
                    //       detectedLanguage = "en_MY";
                    //   } else if (country?.country === "SG") {
                    //       detectedLanguage = "en_SG";
                    //   } else {
                    //     if (langRegex.test(urlLang)) {

                    //     detectedLanguage = urlLang;
                    //   }   else {
                    //     detectedLanguage = "en_US"; // Fallback language
                    // }
                    // }

                    i18n.changeLanguage(detectedLanguage);
                    dispatch(setUrlLanguage(detectedLanguage));
                    dispatch(setLanguage(detectedLanguage));
                    setInitialLanguageSet(true);
                    sessionStorage.setItem("initialLanguageSet", true);
                    sessionStorage.setItem("i18nextLng", detectedLanguage);
                    localStorage.setItem("initialLanguageSet", true);
                    localStorage.setItem("i18nextLng", detectedLanguage);
                }
            } catch (error) {
                console.error("Error fetching country", error);
            }
        };

        initializeLang();
    }, [initialLanguageSet, urlLang]);

    //   useEffect(() => {
    //   if (typeof selectedLanguage != "undefined" && selectedLanguage.code) {
    //     // changeLanguage(selectedLanguage);
    //     localStorage.setItem("i18nextLng", selectedLanguage.code);
    //   }
    // }, [selectedLanguage]);

    // Update localStorage whenever the selected language changes
    useEffect(() => {
        if (selectedLanguage && selectedLanguage.code) {
            localStorage.setItem("i18nextLng", selectedLanguage.code);
        }
    }, [selectedLanguage]);

    useEffect(() => {
        apiGet();
    }, [API, savedLanguage]);

    useEffect(() => {
        if (currentLanguage) {
            callContactData(currentLanguage);
        }
    }, [currentLanguage]);

    useEffect(() => {
        const currentLang = i18n.language;
        const selectedLang = getObjectByKeyCode(data, currentLang);
        if (selectedLang) {
            setSelectedLanguage(selectedLang);
            setName(selectedLang.name);
        }
    }, [i18n.language, data]);

    return (
        <React.Fragment>
            {checkLoader && (
                <div className="language_spinner">
                    <div
                        className="spinner-border text-warning language_spinner"
                        role="status"
                    >
                        <span className="sr-only">Loading...</span>
                    </div>
                    <span className="empty_layer"></span>
                </div>
            )}

            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="selected-lang-item" onClick={checkTrigger}>
                    <img
                        src={selectedLanguage.icon}
                        alt={selectedLanguage.name}
                    />
                    <span>{selectedLanguage.name}</span>
                    {isHovered ? <FaAngleUp /> : <FaAngleDown />}
                </div>

                {isHovered && data && (
                    <ul className="lang-main">
                        {data.map((userData) => (
                            <li key={userData.id} className="non-treatments">
                                <div
                                    className="lang-item"
                                    onClick={() => changeLanguage(userData)}
                                >
                                    <img
                                        src={userData.icon}
                                        alt={userData.name}
                                    />
                                    <span>{userData.name}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </React.Fragment>
    );
};

export default LanguageSwitcher;
