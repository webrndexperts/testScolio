import React, { useState, useEffect } from "react";
import axios from "axios";
import ApiHook from "../components/CustomHooks/ApiHook";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function ProductDropdown({ onSelectSize }) {
  const [languages, setLanguages] = useState("");
  const [customized, setCustomized] = useState("");
  const [tool, setTool] = useState("");
  const [size, setSize] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [knewGuard, setKnewGuard] = useState("");
  const [postureSize, setPostureSize] = useState("");
  const [consultationSize, setConsultationSize] = useState("");
  const { t } = useTranslation();
  const [image, setimage] = useState();

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [disableButton, setDisableButton] = useState(false); // State to manage button disabling
  const API = process.env.REACT_APP_API_URL;
  const { slug, lang } = useParams();
  const navigate = useNavigate();
  const [currentLanguage, urlLanguage] = ApiHook();
  const [selectedSize, setSelectedSize] = useState();
  const [toolUSD, setToolUSD] = useState();

  const handleSizeChange = (event, name) => {
    const size = event.target.value;

    if (name == "tool") {
      if (size == "DVD" || size == "USB") {
        setToolUSD(true);
      } else {
        setToolUSD(false);
      }
    }
    if (name == "Customized") {
      if (size == "Yes") {
        setSelectedSize(size);
      } else {
        setSelectedSize("");
      }
    }
    if (name == "image") {
      const reader = new FileReader();
      // Event handler for when the file is read
      reader.onload = () => {
        // Set the base64 string in state
        onSelectSize(reader.result,name);
      };
      // Read the file as a Data URL (base64 string)
      reader.readAsDataURL(event.target.files[0]);

    } else {
      onSelectSize(size, name);
    }
  };


  useEffect(() => {
    navigate(`${urlLanguage}/product/${slug}`);
  }, [currentLanguage, navigate, slug]);

  useEffect(() => {
    async function fetchLanguages() {
      try {
        const response = await axios.get(`${API}products/${slug}/${currentLanguage}`);
        // console.log(response.data)
        setLanguages(response.data.groupedProductAttributes.Language);
        setTool(response.data.groupedProductAttributes.Tool);
        setCustomized(
          response.data.groupedProductAttributes["Customized Report"]
        );
        Object.keys(response.data.groupedProductAttributes).map((item) => {
          if (
            item == "Support Knee Guard Size" ||
            // item == "ScolioPosture Corrector Size" || 
            item == "ScolioInsole Size"  || item == "STB Size"
          ) {
            setSize(response.data.groupedProductAttributes[item]);
          }
          else{
            setSize("");
          }
        });

        setGender(response.data.groupedProductAttributes["Gender"]);
        setHeight(response.data.groupedProductAttributes["Height"]);
        setWeight(response.data.groupedProductAttributes["Weight"]);
        setKnewGuard(response.data.groupedProductAttributes["Support Knee Guard Size"]);
        setPostureSize(response.data.groupedProductAttributes["ScolioPosture Corrector Size"]);
        setConsultationSize(response.data.groupedProductAttributes['Consultation Type']);
        // console.log(response.data.groupedProductAttributes)
      } catch (error) {
        console.log("Error fetching languages:", error);
      }
    }


    fetchLanguages();
  }, [API, slug, lang]);

  useEffect(() => {
    if (disableButton) {
      alert(
        "Please select some product options before adding this product to your cart."
      );
    }
  }, [disableButton]);

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedLanguage(selectedValue);
    setDisableButton(selectedValue === ""); // Set disableButton based on selected value
  };

  return (
    <React.Fragment>
      {customized != undefined && customized && (
        <div className="add_language_dropdown">
          <label htmlFor="customized"> {t('product_dropdown.customized_report')}</label>
          <select
            id="customized"
            onChange={(e) => {
              handleSizeChange(e, "Customized");
            }}
          >
            <option value="">{t('product_dropdown.choose_an_option')}</option>
            {customized.map((customized, index) => (
              <option key={index} value={customized}>
                {customized}
              </option>
            ))}
          </select>
        </div>
      )}

      {(typeof knewGuard != undefined && knewGuard && knewGuard.length) && (
        <div className="add_language_dropdown">
          <label htmlFor="knewGuard"> {t('product_dropdown.size')} </label>
          <select
            id="knewGuard"
            onChange={(e) => {
              handleSizeChange(e, "guard");
            }}
          >
            <option value="">{t('product_dropdown.choose_an_option')}</option>
            {knewGuard
            .sort((a, b) => a.localeCompare(b))
            .map((gard, index) => (
              <option key={index} value={gard}>
                {gard}
              </option>
            ))}
          </select>
        </div>
      )}

      {(typeof postureSize != undefined && postureSize && postureSize.length) && (
        <div className="add_language_dropdown">
          <label htmlFor="postureSize">{t('product_dropdown.size')}</label>
          <select
            id="postureSize"
            onChange={(e) => {
              handleSizeChange(e, "postureSize");
            }}
          >
            <option value=""> {t('product_dropdown.choose_an_option')}</option>
            {postureSize.map((gard, index) => (
              <option key={index} value={gard}>
                {gard}
              </option>
            ))}
          </select>
        </div>
      )}

      {(typeof consultationSize != undefined && consultationSize && consultationSize.length) && (
        <div className="add_language_dropdown">
          <label htmlFor="consultationSize">{t('product_dropdown.consultation')}</label>
          <select
            id="consultationSize"
            onChange={(e) => {
              handleSizeChange(e, "consultationSize");
            }}
          >
            <option value=""> {t('product_dropdown.choose_an_option')}</option>
            {consultationSize.map((gard, index) => (
              <option key={index} value={t(`product_dropdown.consultationOption.${gard}`)}>
                {t(`product_dropdown.consultationOption.${gard}`)}
              </option>
            ))}
          </select>
        </div>
      )}


      {languages != undefined && languages && (
        <div className="add_language_dropdown">
          <label htmlFor="languageselect"> {t('product_dropdown.varition_language')}</label>
          <select
            id="languageselect"
            onChange={(e) => {
              handleSizeChange(e, "language");
            }}
          >
            <option value="">{t('product_dropdown.choose_an_option')}</option>
            {languages.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
      )}
      {tool != undefined && tool && (
        <div className="add_language_dropdown">
          <label htmlFor="tool">{t('product_dropdown.tool')}</label>
          <select
            id="tool"
            onChange={(e) => {
              handleSizeChange(e, "tool");
            }}
          >
            <option value="">{t('product_dropdown.choose_an_option')}</option>
            {tool.map((tool, index) => (
              <option key={index} value={tool}>
                {tool}
              </option>
            ))}
          </select>
        </div>
      )}
      {gender != undefined && gender && (
        <div className="add_language_dropdown">
          <label htmlFor="gender"> {t('product_dropdown.gender')}</label>
          <select
            id="gender"
            onChange={(e) => {
              handleSizeChange(e, "gender");
            }}
          >
            <option value="">{t('product_dropdown.choose_an_option')}</option>
            {gender.map((gender, index) => (
              <option key={index} value={gender}>
                {/* {gender} */}
                {t(`product_dropdown.${gender}`)}
              </option>
            ))}
          </select>
        </div>
      )}
      {weight != undefined && weight && (
        <div className="add_language_dropdown">
          <label htmlFor="weight">{t('product_dropdown.weight')}</label>

          <select
            id="height"
            onChange={(e) => {
              handleSizeChange(e, "height");
            }}
          >
            <option value="">{t('product_dropdown.choose_an_option')}</option>
            {height.map((height, index) => (
              <option key={index} value={height}>
                {height}
              </option>
            ))}
          </select>
        </div>
      )}
      {height != undefined && height && (
        <div className="add_language_dropdown">
          <label htmlFor="height">{t('product_dropdown.height')}</label>
          <select
            id="weight"
            onChange={(e) => {
              handleSizeChange(e, "weight");
            }}
          >
            <option value="">{t('product_dropdown.choose_an_option')}</option>
            {weight.map((weight, index) => (
              <option key={index} value={weight}>
                {weight}
              </option>
            ))}
          </select>

        </div>
      )}
      {size != undefined && size && (
        <div className="add_language_dropdown">
          <label htmlFor="size">{t('product_dropdown.size')}</label>
          <select
            id="size"
            onChange={(e) => {
              handleSizeChange(e, "size");
            }}
          >
            <option value="">{t('product_dropdown.choose_an_option')}</option>
            {size.map((size, index) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedSize != undefined && selectedSize && (
        <div className="wau_wrapper_div">
          <label for="wau_file_addon">{t('product_dropdown.upload_an_image:')} </label>
          <input
            type="file"
            onChange={(e) => {
              handleSizeChange(e, "image");
            }}
            name="wau_file_addon"
            id="wau_file_addon"
            accept="image/*"
            className="wau-auto-width wau-files"
          />
        </div>
      )}
      {toolUSD && <div className="wau_wrapper_div">$55.00 SGD</div>}
    </React.Fragment>
  );
}

export default ProductDropdown;
