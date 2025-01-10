import React, { useState, useEffect } from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { t } from "i18next";
import { useSelector } from "react-redux";

const WhatsApp = () => {
  const { contactData } = useSelector((state) => state.cart);
  const [userNumber, setUserNumber] = useState("6589078900");
  useEffect(() => {
    if (contactData && contactData.id) {
      setUserNumber(
        contactData.whatsapp_number ? formatWhatsAppNumber(contactData.whatsapp_number) : "6589078900"
      );
    }
  }, [contactData]);
  const formatWhatsAppNumber = (number) => {
    return number?.replace(/[\+\(\)\s]/g, '');
  };
  return (
    <FloatingWhatsApp
      phoneNumber={userNumber}
      accountName="" // Set accountName to an empty string
      avatar={false}
      chatMessage={t("whatsApp.description")}
      statusMessage={t("whatsApp.title")}
      placeholder=""
      allowClickAway={true}
      allowEsc={true}
      className="whatsapp-button"
      chatboxClassName="custom-chat"
      notification={false}
    />
  );
};

export default WhatsApp;
