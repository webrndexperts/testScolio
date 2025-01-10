import React, { useEffect, useState, Fragment } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import ReactPlayer from "react-player";
import { HiMinus } from "react-icons/hi2";
import { BsPlusLg } from "react-icons/bs";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Item from "../components/CartComponents/Item";
import ImageSlider from "../components/ProductComponents/ImageSlider";
import ProductDes from "../components/ProductComponents/ProductDes";
import ApiHook from "../components/CustomHooks/ApiHook";
import Rating from "../components/Rating";
import CurrencyConverter from "../components/CurrencyConverter";
import CustomModelPopup from "../components/CustomModelPopup";
import Sidebar from "../components/Sidebar";
import { addToCart, addToDirectCart } from "../reducers/cartSlice";
import Image from "../images/Streaming_EN.png";
import ProductDropdown from "./ProductDropdown1";
import TopBanner from '../components/TopBanner';
import MetaCreator from "../components/MetaCreator";
import FranForm from "./FranForm";
import WishlistIcon from '../components/WishlistIcon';
import { scrollToTop } from "../components/Helper";
import { uploadFileApi } from '../Api';

const API = process.env.REACT_APP_API_URL;
const ProductDetailPage = () => {
  const {
    register,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentLanguage, urlLanguage] = ApiHook();
  const { slug, lang } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [productDetail, setProductDetail] = useState();
  const [IsAddToCart, setIsAddToCart] = useState(false);
  const [isProductAddedDirectly, setIsProductAddedDirectly] = useState(false);
  const [counter, setCounter] = useState(0);
  const [averageRating, setAverageRating] = useState();
  const [read, setRead] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [selectedType, setSelectedType] = useState(false);
  const [productPrice, setProductPrice] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isVariable, setIsVariable] = useState(false);
  const [checkVariable, setcheckVariable] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [updateAproxPrice, setUpdateAproxPrice] = useState(false);
  const [productTitle, setProductTitle] = useState(false);
  const { t } = useTranslation();
  const { authData } = useSelector((state) => state.auth);
  const [awsData, setAwsData] = useState(null)
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(15);
  const [metaProps, setMetaProps] = useState(null);
  const initialPosts = productDetail?.aws3_bucket_product.slice(0, index);
  let CheckLogin = JSON.parse(localStorage.getItem("isLogin"));

  const loadMore = () => {
    setIndex(index + 15);
    
    if (index >= productDetail?.aws3_bucket_product?.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };
  const toggleModal = (data, index, length) => {
    setModal((modal) => !modal);
    // var allowed = ((authData && authData.id) && (data && data.order && data.order.id)) ? true : false;
    var allowed = ((authData && authData.id) && (awsData && awsData?.data?.length)) ? true : false;
    // allowed = true;

    let modatData = {
      resialNo: index + 1,
      data: data,
      length: length,
      allowed: allowed
    };

    setModalData(modatData);
  };

  const [selectedSize, setSelectedSize] = useState("");
  const [consultationSize, setConsultationSize] = useState("");
  const [languages, setLanguages] = useState("");
  const [customized, setCustomized] = useState("");
  const [tool, setTool] = useState("");
  const [image, setimage] = useState("");

  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [showPrice, setShowPrice] = useState(false);

  
  const handleSelectSize = (size, name) => {
    debugger
    if (name == "tool") {
      setTool(size);

    } else if (name == "language") {
      setLanguages(size);
    } else if (name == "size") {
      setSelectedSize(size);
    } else if (name == "Customized") {
      setCustomized(size);
    } else if (name == "image") {
      setimage(size);
    } else if (name == "gender") {
      setGender(size);
    } else if (name == "height") {
      setHeight(size);
    } else if (name == "weight") {
      setWeight(size);
    } else if (name == "guard") {
      setSelectedSize(size);
    } else if (name == "postureSize") {
      setSelectedSize(size);
    } else if (name == "consultationSize") {
      setConsultationSize(size);
      handleConsultantChange(size);
    }

    setShowAlert(false);
  }

  /**
   * Function to check variations are selected
   * and if not then sends error to the view to select options from variations.
   * 
   * @return Object values.
   */
  const checkVariationsData = async () => {
    var variationsDet;

    if (checkVariable.includes("Language")) {
      if (languages) {
        variationsDet = {
          ...itemData,
          attriuteLang: languages,
        };
      } else {
        setShowAlert(true); // Show alert if no size selected
      }
    } else {
      setLanguages(true);
    }
    if (checkVariable.includes("Customized Report")) {
      if (customized) {
        variationsDet = {
          ...itemData,
          attriuteCustomized: customized,
        };
        if (customized == "Yes") {
          if (!image) {
            setShowAlert(false);
            setimage(true);
          }
        } else {
          setimage(true);
        }
      } else {
        setShowAlert(true); // Show alert if no size selected
      }
    } else {
      setCustomized(true);
      setimage(true);
    }
    if (checkVariable.includes("Tool")) {
      if (tool) {
        variationsDet = {
          ...itemData,
          attriuteSize: tool,
        };
      } else {
        setShowAlert(true); // Show alert if no size selected
      }
    } else {
      setTool(true);
    }

    if (
      checkVariable.includes("Size") ||
      checkVariable.includes("Support Knee Guard Size") ||
      checkVariable.includes("ScolioPosture Corrector Size") ||
      checkVariable.includes("ScolioInsole Size") ||
      checkVariable.includes("STB Size")
    ) {
      if (selectedSize) {
        variationsDet = {
          ...itemData,
          attriuteTool: selectedSize,
        };
      } else {
        setShowAlert(true); // Show alert if no size selected
      }
    } else {
      setSelectedSize(true);
    }

    if (checkVariable.includes("Consultation Type")) {
      if (gender) {
        variationsDet = {
          ...itemData,
          attriuteConsultant: consultationSize,
        };
      } else {
        setShowAlert(true); // Show alert if no size selected
      }
    } else {
      setConsultationSize(true);
    }

    if (checkVariable.includes("Gender")) {
      if (gender) {
        variationsDet = {
          ...itemData,
          attriuteGender: gender,
        };
      } else {
        setShowAlert(true); // Show alert if no size selected
      }
    } else {
      setGender(true);
    }

    if (checkVariable.includes("Height")) {
      if (height) {
        variationsDet = {
          ...itemData,
          attriuteHeight: height,
        };
      } else {
        setShowAlert(true); // Show alert if no size selected
      }
    } else {
      setHeight(true);
    }
    if (checkVariable.includes("Weight")) {
      if (weight) {
        variationsDet = {
          ...itemData,
          attriuteWeight: weight,
        };
      } else {
        setShowAlert(true); // Show alert if no size selected
      }
    } else {
      setWeight(true);
    }

    return variationsDet;
  }

  /**
   * Function to check if values are there in variations then add values to cart
   * or add that to directly for the checkout to buy single product.
   * 
   * @return Boolen values.
   */
  const checkVariableAndAddToCart = async (type = 'cart') => {
    if (selectedSize && consultationSize && languages && customized && tool && image && gender && height && weight) {
      let finalPrice = itemData.price;
      if (customized) {
        if (customized === "Yes") {
          finalPrice += 55;
        } else if (customized === "No") {
          finalPrice = itemData.price; // No change
        }
      }
      let itemDataWithLanguage = {
        ...itemData,
        attriuteTool: tool == true ? "" : tool,
        attriuteWeight: weight == true ? "" : weight,
        attriuteGender: gender == true ? "" : gender,
        attriuteHeight: height == true ? "" : height,

        attriuteSize: selectedSize == true ? "" : selectedSize,
        attriuteConsultant: consultationSize == true ? "" : consultationSize,
        attriuteCustomized: customized == true ? "" : customized,
        attriuteLang: languages == true ? "" : languages,
        attriuteImg: image == true ? "" : image,
        price: finalPrice,
      }

      if(type == 'direct') {
        dispatch(addToDirectCart(itemDataWithLanguage));
        navigate(`${urlLanguage}/checkout`);
      } else {
        dispatch(addToCart(itemDataWithLanguage));
        navigate(`${urlLanguage}/cart`);
      }
    }

    return true;
  }

  /**
   * Function to add product directly for the checkout to buy single product.
   * 
   * @return
   */
  const onBuyNowClick = async () => {
    // Implement your add to cart logic here
    let itemDataWithLanguage;
    if (isVariable) {
      itemDataWithLanguage = await checkVariationsData();

      setIsProductAddedDirectly(!isProductAddedDirectly);
    } else {
      dispatch(addToDirectCart(itemData));
      navigate(`${urlLanguage}/checkout`);
    }
  }

  /**
   * Function to add values to cart
   * 
   * @return
   */
  const handleAddToCart = async () => {
    // Implement your add to cart logic here
    let itemDataWithLanguage;
    if (isVariable) {
      itemDataWithLanguage = await checkVariationsData();

      setIsAddToCart(!IsAddToCart);
    } else {
      dispatch(addToCart(itemData));
      navigate(`${urlLanguage}/cart`);
    }
  }

  const handleChildData = () => {
    setCounter((prevCounter) => prevCounter + 1);
  }

  const handlePlusQuantity = () => {
    if (quantity <= 0) {
      setQuantity(1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleConsultantChange = (val) => {
    var _attributes = productDetail.product_dropdown_attribute, _show = false;


    if(_attributes) {
      for (var i = 0; i < _attributes.length; i++) {
        var _att = _attributes[i];
        if(_att.product_attribute && val == _att.product_attribute.title) {
          var _price = _att.product_attribute.summary.match(/\d+(\.\d+)?/g).map(Number);
          setProductPrice(_price[0]);
          _show = true;
        }
      }
    }

    setShowPrice(_show);
  }

  const handleMinusQuantity = () => {
    if (quantity <= 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  }

  let itemData = {
    key: productDetail?.id,
    id: productDetail?.id,
    image: productDetail?.photo,
    title: productDetail?.title,
    price: productPrice,
    slug: productDetail?.slug,
    quantity: quantity,
    dimension_height: productDetail?.dimension_height,
    dimension_length: productDetail?.dimension_length,
    dimension_weight: productDetail?.dimension_weight,
    product_actual_weight: productDetail?.product_actual_weight,
    product_type: productDetail?.product_type,
    lang: productDetail?.lang,
    productType: productDetail?.product_type,
    sku: productDetail?.product_sku,
    buttonDisabled: buttonDisabled,
    // CustomizedImgage:
  }

  const addItemToCart = (image) => {
    const itemDataWithImage = {
      ...itemData,
      CustomizedImgage: image,
    };
    dispatch(addToCart(itemDataWithImage));
    navigate(`${urlLanguage}/cart`);
  }

  const handleSelectChange = (event) => {
    // console.log("Selected option:", event.target.value);
    if (event.target.value === "customised_streaming") {
      setSelectedType(true);
      setProductPrice(productPrice + productPrice);
    } else {
      setSelectedType(false);
      setProductPrice(parseInt(productDetail?.price));
    }
  }
  
  const uploadImage = async (event) => {
    const { CustomizedImgage = null } = event;
    let _retImg = null;
    
    if(CustomizedImgage && typeof CustomizedImgage != 'undefined' && CustomizedImgage.length) {
      const formData = new FormData();
      formData.append("CustomizedImgage", CustomizedImgage[0]);
      const response = await uploadFileApi(formData);
      if(response && typeof response != 'undefined') {
        _retImg = response.path;
      }
    }

    return _retImg;
  }

  const UploadAddToCart = async (event) => {

    const _image = await uploadImage(event);

    // alert(_image)
    if(event?.CustomizedImgage?.[0]){
      let itemDataWithLanguage = {
        ...itemData,
        attriuteImg: URL.createObjectURL(event.CustomizedImgage[0]),
        CustomizedImgage: _image,
      };
      // debugger
      dispatch(addToCart(itemDataWithLanguage));
    }
    else{
      dispatch(addToCart(itemData));
    }


    // const formData = new FormData();
    // formData.append("files", file);
    // console.log("event", event);
    // console.log("formData", formData);
    // fetch(
    //   "https://rndexperts.in/backend-laravel/api/v1/product/aws3/uploadimages",
    //   {
    //     method: "POST",
    //     body: formData,
    //   }
    // )
    //   .then(async (response) => {
    //     if (!response.ok) {
    //       throw new Error(
    //         `File upload failed: ${response.status} - ${response.statusText}`
    //       );
    //     }
    //     const imageResponse = await response.json();
    //     console.log("Image upload successful:", imageResponse);
    //   })
    //   .catch((error) => {
    //     console.log("Error uploading file:", error);
    //   });
        
        // navigate(`${urlLanguage}/cart`);
  }

  const onAddCartClick = (URL) => {
    navigate(`${urlLanguage}/product/${URL}`);
  };

  useEffect(() => {
    if(productDetail) {
      setProductTitle(productDetail.title)
    }
  }, [productDetail])

  useEffect(() => {
    checkVariableAndAddToCart('direct');
  }, [isProductAddedDirectly])

  useEffect(() => {
    checkVariableAndAddToCart();
  }, [IsAddToCart]);

  useEffect(() => {
    navigate(`${urlLanguage}/product/${slug}`);
  }, [currentLanguage, navigate, slug]);

  useEffect(() => {
    scrollToTop()
    var params = (authData && authData.id) ? `?user=${authData?.id}` : '';

    fetch(`${API}products/${slug}/${currentLanguage}${params}`).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      }).then((data) => {
        const numericData = data.product_review.map((obj) => ({
          value: parseInt(obj.rate, 10),
        }));

      
        const sum = numericData.reduce((acc, obj) => acc + obj.value, 0);
        const average = sum / data.product_review.length;
        setAverageRating(average.toFixed(3.5));
        setProductDetail(data);
        setUpdateAproxPrice(!updateAproxPrice)
        
        let _metaProps = {
          tags: (data && data.seo_meta_tag) ? data.seo_meta_tag : '',
          title: (data && data.seo_meta_title) ? data.seo_meta_title : '',
          description: (data && data.seo_meta_description) ? data.seo_meta_description : '',
        }

        setMetaProps(_metaProps);
        if (data.attributes) {
          // setProductAttributes(data.attributes)
        }
        if (data.product_type) {
          if (data.product_type === "variable-product") {
            // console.log('buttonDisabled', buttonDisabled);
            setIsVariable(true);
            setcheckVariable(Object.keys(data.groupedProductAttributes));
            setSelectedSize("");
            setConsultationSize("");
          } else {
            setIsVariable(false);
            setcheckVariable([]);
            setSelectedSize("simple");
            setConsultationSize("simple");
          }
        }
        // console.log('attributes' , data.attributes)
        setProductPrice(data.price != null ? parseInt(data.price) : 0);

      }).catch((error) => {
        console.log("Fetch error:", error);
      });
  }, [currentLanguage, lang, slug, navigate, counter, authData]);

  let wishProps = {
    t, currentLanguage, extraClass: 'prod-wishlist'
  }


  useEffect(() => {
    try{
      const response = axios.post('https://sladmin.scoliolife.com/api/v1/get-aws-bucket-order' , {
        user_id : (authData && authData.id) ? authData.id : null
      })
      .then((response) => {
        const data = response.data;
        
        setAwsData(data)
        })
        .catch((error) => {
          console.log("Fetch error:", error);
          });
    }catch(err){
      console.log(err)
    }
    
  }, [authData,authData?.id])

  return (
    <>
      <TopBanner title={(productDetail && productDetail.title) ? productDetail.title : slug} />
      <MetaCreator {...metaProps} />
      {productDetail?.aws3_bucket_product?.length < 1 ? (
        <>
          <div className="product-section">
            <div className="container">
              <div className="row">
                <ImageSlider
                  productDetail={productDetail ? productDetail : []}
                />
                <div className="col-md-5">
                  <div className="product-text">
                    <h2>{productDetail?.title}</h2>

                    {(productDetail?.price || productDetail?.price > 0) && (
                      <Fragment>
                        <div className="rating-wishlist-div">
                          <div className="product-star">
                            <p className="star">
                              <Rating stars={averageRating} />
                            </p>
                            <p>
                              ({productDetail?.product_review?.length}{t('product.customer_reviews')})
                            </p>
                          </div>

                          <WishlistIcon product={productDetail} {...wishProps} />

                        </div>

                        <ProductPriceView price={productDetail?.price} />

                        <span className="approx_format">
                          {productDetail ? (
                            <CurrencyConverter currency={productDetail.price} updateAproxPrice={updateAproxPrice}/>
                          ) : (
                            ""
                          )}
                        </span>
                      </Fragment>
                    )}
                    
                    <p
                      dangerouslySetInnerHTML={{
                        __html: productDetail?.description,
                      }}
                    ></p>
                    {productDetail?.product_type === "variable-product" && (
                      <ProductDropdown onSelectSize={handleSelectSize} />
                    )}
                    {showAlert && (
                      <p style={{ color: "red" }}>
                        {/* Please select a size before adding to cart. */}
                        {t("product-detail.select-some-product")}
                    
                      </p>
                    )}

                    {productDetail?.product_type === "simple-product" && ""}

                    {(showPrice) ? (
                      <p className="shown-price">${ parseFloat(productPrice).toFixed(2) } SGD</p>
                    ) : null}

                    {(productDetail?.price || productDetail?.price > 0) && (
                      <div className="product-cart">
                        <span
                          className="cart-minus"
                          onClick={() => handleMinusQuantity()}
                        >
                          <HiMinus />
                        </span>
                        <h4>{quantity}</h4>
                        <span
                          className="cart-plus"
                          onClick={() => handlePlusQuantity()}
                        >
                          <BsPlusLg />
                        </span>
                      </div>
                    )}

                    <Item
                      key={productDetail?.id}
                      id={productDetail?.id}
                      image={productDetail?.photo}
                      title={productDetail?.title}
                      price={productDetail?.price}
                      slug={productDetail?.slug}
                      sku={productDetail?.product_sku}
                      quantity={quantity}
                      dimension_height={productDetail?.dimension_height}
                      dimension_length={productDetail?.dimension_length}
                      dimension_weight={productDetail?.dimension_weight}
                      product_actual_weight={
                        productDetail?.product_actual_weight
                      }
                      product_type={productDetail?.product_type}
                      lang={productDetail?.lang}
                      productType={productDetail?.product_type}
                      disabled={!selectedSize}
                      onCartClick={handleAddToCart}
                      onBuyNowClick={onBuyNowClick}
                      consultationSize={consultationSize}
                    />
                    <p className="sku">SKU: {productDetail?.product_sku}</p>
                    <span className="Category-product">
                      {t('product.category')} :
                      <Link
                        to={`${urlLanguage}/product-category/${productDetail?.cat_info.slug}`}
                      >
                        {productDetail?.cat_info.title}
                      </Link>
                    </span>
                    {/* Amazon link */}
                    {productDetail.amazon_link && (
                      <div>
                        <Link to={productDetail.amazon_link}>
                          <img
                            src={productDetail.amazon_image_link}
                            alt="amazon"
                          />{" "}
                        </Link>
                      </div>
                    )}
                    <div>
                      <a
                        href="https://www.facebook.com/scoliolife/"
                        title="Follow Us on facebook"
                        target="blank"
                      >
                        <img
                          loading="lazy"
                          width="26"
                          height="26"
                          className="scale"
                          src="/assets/images/fb.png"
                          alt="Follow us on facebook"
                        />
                      </a>
                      <a
                        href="https://x.com/i/flow/login?redirect_after_login=%2Fscoliolife"
                        title="Follow Us on X"
                        target="blank"
                      >
                        <img
                          loading="lazy"
                          width="26"
                          height="26"
                          className="scale"
                          src="/assets/images/tweet.png"
                          alt="Follow us on X"
                        />
                      </a>
                      <a
                        href="https://sg.linkedin.com/in/DrKevinLau"
                        title="Follow Us on Linkedin"
                        target="blank"
                      >
                        <img
                          loading="lazy"
                          width="26"
                          height="26"
                          className="scale"
                          src="/assets/images/linkedin.png"
                          alt="Follow us on Linkedin"
                        />
                      </a>
                      <a
                        href="https://drkevinlau.blogspot.com/"
                        title="Follow Us on Blogspot"
                        target="blank"
                      >
                        <img
                          loading="lazy"
                          width="26"
                          height="26"
                          className="scale"
                          src="/assets/images/blog.png"
                          alt="Follow us on Blogspot"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDes
            productDetail={productDetail ? productDetail : ""}
            onDataGet={handleChildData}
            slug={slug}
          />
        </>
      ) : !productDetail ? (
        <div className="container">
          <Sidebar />
        </div>
      ) : (
        <div className="container">
          <Sidebar />

          <div className="tabs-product">
            <div className="tab-content">
              <div className="product-video-section">
                {productDetail?.featured_video_url !== "" ? (
                  <ReactPlayer
                    url={productDetail?.featured_video_url}
                    controls
                  />
                ) : (
                  <img src={productDetail?.photo} alt=""></img>
                )}
              </div>
              <div className="product-listing">
                <div className="product-listing-description">
                  <div className="product-description">
                    <h2>{productDetail?.title}</h2>
                    {!read ? (
                      <div>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: productDetail?.description,
                          }}
                        ></p>
                        <p
                          className="read_more"
                          onClick={() => setRead((prevOpen) => !prevOpen)}
                        >
                           {t("Patients.read_more")}
                        
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: productDetail?.summary,
                          }}
                        ></p>
                        <p
                          className="read_more"
                          onClick={() => setRead((prevOpen) => !prevOpen)}
                        >
                          {t("Patients.read_less")}
                          
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="product-table">
                    <table className="table">
                      <tbody className="table-section">
                        {initialPosts?.map((item, index) => {
                          return (
                            <tr
                              className="product-video-tr"
                              key={item.id}
                              onClick={() =>
                                toggleModal(
                                  item,
                                  index,
                                  productDetail?.aws3_bucket_product?.length
                                )
                              }
                            >
                              <td className="product-video-index">
                                {index + 1}
                              </td>
                              <td className="product-video-title">
                                {item?.video_name}
                              </td>
                              <td className="product-video-duration">
                                {item?.video_duration}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {isCompleted ? (
                      <div className="show_more_td_empty">
                        <strong> {t("product-detail.episodes")}</strong>
                      </div>
                    ) : (
                      <div
                        className="show_more_td_empty"
                        onClick={() => loadMore()}
                      >
                        <strong>
                          +
                          {productDetail?.aws3_bucket_product?.length -
                            initialPosts.length}{" "}
                          {t("product-detail.more episodes")} {" "}
                        </strong>
                      </div>
                    )}
                  </div>
                </div>
                <div className="product-listing-sidebar-main">
                  <div className="product-listing-sidebar">
                    <div className="sidebar_images">
                      <img src={Image} alt="" />
                    </div>

                    {(!CheckLogin ||  (awsData && awsData?.data?.length === 0)) && (
                      <p className="Confused">
                        {" "}
                        {t("product-detail.Confused")}
                      </p>
                    )}
                    {/*  ((authData && authData.id) && (awsData && awsData?.data?.length)) ? true : false; 
                          (initialPosts.length && !initialPosts[0]?.order && !initialPosts[0]?.order?.id))
                    */}
                    {(!CheckLogin || (awsData && awsData?.data?.length === 0)) && (
                      <form
                        id="ProductTypeForm"
                        onSubmit={handleSubmit(UploadAddToCart)}
                      >
                        <label htmlFor="product_purchase_type">
                        {t("product-detail.Choose Product")}
                    
                        </label>
                        <select
                          name="product_purchase_type"
                          id="product_purchase_type"
                          {...register("productOption", { required: true })}
                          onChange={handleSelectChange}
                        >
                          <option value="" className="enuiry_meta">
                          {t("product-detail.Select an option")}
                        
                          </option>
                          <option
                            value="stream_plus_download"
                            className="enuiry_meta"
                          >
                            {t("product-detail.Stream Scoliosis Exercises")}
                           
                          </option>
                          <option
                            value="customised_streaming"
                            className="enuiry_meta"
                          >
                            {t("product-detail.Stream")}
                            {" "}
                          </option>
                        </select>
                        {errors.productOption && (
                          <p className="validations">
                            {t("product-detail.option")}
                           
                          </p>
                        )}
                        <input
                          name="product_custom_streaming"
                          type="hidden"
                          value="1"
                        />
                        {selectedType ? (
                          <>
                            <div className="wau_wrapper_div">
                              <label htmlFor="wau_file_addon">
                              {t("product-detail.Upload an image")}
                               {" "}
                              </label>
                              <input
                                type="file"
                                name="wau_file_addon"
                                id="wau_file_addon"
                                accept="image/*"
                                className="wau-auto-width wau-files"
                                {...register("CustomizedImgage")}
                              />
                              {errors.CustomizedImgage && (
                                <p className="validations">
                                  {t("product-detail.Upload")}
                                
                                </p>
                              )}
                            </div>{" "}
                            <span id="vaild_err"></span>
                          </>
                        ) : null}
                        <div className="ul_price_new">
                          <button
                            type="submit"
                            name="add-to-cart"
                            value="552182"
                            id="valid_add_to_cart"
                            className="single_add_to_cart_button button  product_type_simple alt"
                          >
                            <div className="pr_cont">
                              <div className="svd">
                                <img
                                  src="https://sladmin.scoliolife.com/uploads/2022/10/thumb_Streaming.png"
                                  alt=""
                                />
                              </div>
                              <div className="price_gr_p">
                                <div className="price_gr">
                                  ${parseFloat(productPrice).toFixed(2)} SGD
                                </div>
                                <span className="stream-download">
                                {t("product-detail.Customized")}
                                  {" "}
                                </span>
                              </div>
                            </div>
                          </button>
                        </div>
                      </form>
                    )}

                    {/*<div className="sidebar_images">
                      <img src={Image} alt=""></img>
                    </div>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {productDetail?.rel_prods?.length > 0 ? (
        <div className="related-product">
          <div className="row">
            <h2>{t('product.related')}</h2>
            {productDetail &&
              productDetail?.rel_prods?.slice(0, 4).map((userData) => (
                <div key={userData.id} className="col-sm-3">
                  <div className="shop-treatments">
                    <Link to={`${urlLanguage}/product/${userData.slug}`}>
                      <img src={userData.photo} alt="" />
                      <h3>{userData.title}</h3>
                      <div className="price-shop">
                        <p className="price">${parseFloat(userData.price).toFixed(2)} SGD</p>
                        <p className="star">
                          <Rating stars={4.5} />
                        </p>
                      </div>
                      {/* <CurrencyConverter currency={userData.price} /> */}
                    </Link>
                    <div className="home__container">
                      <div className="home__row">
                        <div>
                          <button
                            className="btn btn-primary w-100"
                            onClick={() => {
                              onAddCartClick(userData.slug);
                            }}
                          >
                            {t("product_dropdown.add_to_cart")}
                          </button>
                          {/* } */}
                        </div>
                        {/* <Item
                          userData={userData.slug}
                          key={userData?.id}
                          id={userData?.id}
                          image={userData?.photo}
                          title={userData?.title}
                          price={userData?.price}
                          slug={userData?.slug}
                          dimension_height={userData?.dimension_height}
                          dimension_length={userData?.dimension_length}
                          dimension_weight={userData?.dimension_weight}
                          product_actual_weight={
                            userData?.product_actual_weight
                          }
                          product_type={userData?.product_type}
                          lang={userData?.lang}
                          productType={userData?.product_type}
                        /> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : null}

      {(slug == 'skype-zoom-consultation') ? (
          <FranForm />
      ) : null}

      <Modal
        isOpen={modal}
        onRequestClose={toggleModal}
        contentLabel="Example Modal"
      >
        <div className="product-model">
          <div className="product-model-heading">
            <h5 className="product-model-heading">
              {modalData?.data?.video_name}
            </h5>
            <span
              className="close-btn"
              onClick={() => setModal((modal) => !modal)}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </span>
          </div>
          {(modalData?.allowed) ? (
            // <video src={modalData?.data?.video_link} />
            <video width="100%" height="100%" controls>
              <source src={modalData?.data?.video_link} type="video/mp4" />
              <source src={modalData?.data?.video_link} type="video/ogg" />
            </video>
          ) : null}
          {(!modalData?.allowed) && (
            <div className="product-model-image-description">
              <div className="product-model-image">
                <div className="product-image">
                  <img src={modalData?.data?.image_link} alt="" />
                </div>

                <span className="product-model-duration">
                  {t("product-detail.Duration")} {modalData?.data?.video_duration}
                </span>
              </div>

              <div className="product-model-description">
                <h4 className="product-model-title">
                  {modalData?.data?.video_name}
                </h4>
                <p className="product-model-p">
                {t("product-detail.Episode")}
                 {" "}
                  {modalData?.resialNo} of {modalData?.length}
                </p>
                <div className="product-model-buy">
                  <p> {t("product-detail.available")} </p>
                  <div className="product_price_dv">
                    <div className="iris_ic is--16">
                      <Link to="#" onClick={() => addItemToCart()}>
                        <svg viewBox="0 0 16 16">
                          <path d="M16 9.5c0-1.48-.921-2.738-2.219-3.25A3.96 3.96 0 0014 5a4 4 0 00-4-4C8.247 1 6.774 2.135 6.233 3.704A2.487 2.487 0 004.5 3 2.5 2.5 0 002 5.5c0 .273.055.531.135.776A3.49 3.49 0 003 12.95V12a2.99 2.99 0 012-2.816V8a3 3 0 116 0v1.184A2.99 2.99 0 0113 12v.95a3.49 3.49 0 003-3.45z"></path>
                          <path d="M10.707 11.293a.999.999 0 00-1.414 0L9 11.586V8a1 1 0 00-2 0v3.586l-.293-.293a.999.999 0 10-1.414 1.414l2 2a.999.999 0 001.414 0l2-2a.999.999 0 000-1.414z"></path>
                        </svg>
                        <div className="pricing_gp">
                        {t("product-detail.Buy")}
                          <span className="woocommerce-Price-amount amount">
                            <bdi>
                              <span className="woocommerce-Price-currencySymbol">
                                $
                              </span>
                              {productDetail?.price}&nbsp;SGD
                            </bdi>
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
      <CustomModelPopup checkClass="product-gallery-design" />
      <CustomModelPopup checkClass="product-gallery-design-img" />
    </>
  );
};

const ProductPriceView = (props) => {
  const { price, currency = "SGD" } = props;
  const [priceVal, setPriceVal] = useState(`$0.00 ${currency}`);
  
  // create values
  const createValue = (val) => {
    return `$${parseFloat(val).toFixed(2)} ${currency}`;
  }

  const breakCurrencyRange = () => {
    if(price.includes('-')) {
      var [min, max] = price.split('-'),
      _val = `${createValue(min)} – ${createValue(max)}`;
      setPriceVal(_val);
    } else {
      setPriceVal(createValue(price));
    }
  }

  useEffect(() => {
    if(price) {
      breakCurrencyRange();
    }
  }, [price])

  return (
      <p className="lead">{priceVal}</p>
  )
}

export default ProductDetailPage;
