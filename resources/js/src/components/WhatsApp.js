// import React, { useState, useEffect } from "react";
// import { FloatingWhatsApp } from "react-floating-whatsapp";
// import { t } from "i18next";
// import { useSelector } from "react-redux";
// import { selectLanguage } from "../reducers/languageSlice";

// const WhatsApp = () => {
//   const { contactData } = useSelector((state) => state.cart);
//   const [userNumber, setUserNumber] = useState("6589078900");
//   const currentLanguage = useSelector(selectLanguage);

//   useEffect(() => {
//     if (contactData && contactData.id) {
//       setUserNumber(
//         contactData.whatsapp_number ? formatWhatsAppNumber(contactData.whatsapp_number) : "6589078900"
//       );
//     }
//   }, [contactData]);
//   const formatWhatsAppNumber = (number) => {
//     return number?.replace(/[\+\(\)\s]/g, '');
//   };
//   return (
//     <FloatingWhatsApp
//       phoneNumber={userNumber}
//       accountName="" // Set accountName to an empty string
//       // avatar={false}
//       chatMessage={t("whatsApp.description")}
//       statusMessage={t("whatsApp.title")}
//       placeholder=""
//       allowClickAway={true}
//       allowEsc={true}
//       className="whatsapp-button"
//       chatboxClassName="custom-chat"
//       notification={false}
//     />
//   );
// };

// export default WhatsApp;

import React, { useState, useEffect, useRef } from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { t } from "i18next";
import { useSelector } from "react-redux";
import { selectLanguage } from "../reducers/languageSlice";

const WhatsApp = () => {
    const { contactData } = useSelector((state) => state.cart);
    const [userNumber, setUserNumber] = useState("6589078900");
    const currentLanguage = useSelector(selectLanguage);
    const containerRef = useRef(null);

    useEffect(() => {
        if (contactData && contactData.id) {
            setUserNumber(
                contactData.whatsapp_number
                    ? formatWhatsAppNumber(contactData.whatsapp_number)
                    : "6589078900"
            );
        }
    }, [contactData]);

    const formatWhatsAppNumber = (number) => number?.replace(/[\+\(\)\s]/g, "");

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const button = container.querySelector(".floating-whatsapp-button");
        if (!button) return;

        if (currentLanguage === "en_SG") {
            button.classList.add("whatsapp-btn-en_SG");
            button.classList.remove("whatsapp-btn-en_MY");
        } else if (currentLanguage === "en_MY") {
            button.classList.add("whatsapp-btn-en_MY");
            button.classList.remove("whatsapp-btn-en_SG");
        } else {
            button.classList.remove("whatsapp-btn-en_MY");
            button.classList.remove("whatsapp-btn-en_SG");
        }
    }, [currentLanguage]);

    return (
        <div ref={containerRef}>
            <FloatingWhatsApp
                phoneNumber={userNumber}
                accountName=""
                chatMessage={t("whatsApp.description")}
                statusMessage={t("whatsApp.title")}
                placeholder=""
                allowClickAway={true}
                allowEsc={true}
                className="whatsapp-button"
                chatboxClassName="custom-chat"
                notification={false}
            />
        </div>
    );
};

export default WhatsApp;
