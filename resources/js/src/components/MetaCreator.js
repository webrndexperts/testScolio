import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

const MetaCreator = (props) => {
  const { title = "", description = "", tags = "" } = props;
  let pageUrl = window.location.href;
  const { contactData } = useSelector((state) => state.cart);
  const [scolioContact, setscolioContact] = useState(null);
  useEffect(() => {
    if (contactData && contactData.id) {
      setscolioContact(contactData);
    }
  }, [contactData]);
  return (
    <Helmet>
      {title ? <title>{title}</title> : null}
      {description ? <meta name="description" content={description} /> : null}
      {tags ? <meta name="keywords" content={tags} /> : null}
      <link rel="canonical" href={pageUrl} />
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?${scolioContact?.gtag}`}
      ></script>

      {/* Insert inline JavaScript for Google Tag Manager */}
      <script>
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config',  ${JSON.stringify(scolioContact?.gtag || '')});
        `}
      </script>
    </Helmet>
  );
};

export default MetaCreator;
