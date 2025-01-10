import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenuItem } from "../reducers/menuItemSlice";
import { selectLanguage, selectUrlLanguage } from "../reducers/languageSlice";
import { scrollToTop } from "./Helper";
import { userLogin } from "../reducers/authSlice";
import { useNavigate } from "react-router-dom";
// import { PiUserCircleBold } from "react-icons/pi";
import { PiUserCircle } from "react-icons/pi";
import { GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import $ from 'jquery';
import { mobileScreen, googleClientId as clientId } from '../providers/constants';

import { DesktopMenus, MobileAuthMenu } from './elements';

// const clientId = "577793062457-7rhqd6k1pso814kdm50irrpg9hij9ug2.apps.googleusercontent.com";
const MainNavbar = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentLanguage = useSelector(selectLanguage);
  const urlLanguage = useSelector(selectUrlLanguage);
  // const [currentLanguage] = ApiHook();
  const { cart } = useSelector((state) => state.cart);
  const { menuData } = useSelector((state) => state.menu);
  const { authLogin } = useSelector((state) => state.auth);
  const [openMenus, setOpenMenus] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const handleMouseOver = () => {
    setShowMenu(true);
  };

  const handleMouseOut = () => {
    setShowMenu(false);
  };

  const toggleMenu = (itemId) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  const onMenuClick = () => {
    scrollToTop();
    showHideMenu()
  }

  const showHideMenu = () => {
    if(window.innerWidth <= mobileScreen) {
      $('.mobile-toogler').click();
      // $('.mobile-toogler').toggle()

    }
  }

  // const handleMouseEnter = (itemId) => {
  //   setOpenMenus(prevState => ({
  //     ...prevState,
  //     [itemId]: true
  //   }));
  // };

  const handleMouseEnter = (itemId) => {
    if (window.innerWidth >= mobileScreen) {
      setOpenMenus((prevState) => ({
        ...prevState,
        [itemId]: true,
      }));
    }
  };

  const handleMouseLeave = (itemId) => {
    if (window.innerWidth >= mobileScreen) {
      setOpenMenus((prevState) => ({
        ...prevState,
        [itemId]: false,
      }));
    }
  };
  // const imgNameLogo = '../../images/logo.webp';
  // console.log("menuData===",menuData);
  // const [hoveredDropdown, setHoveredDropdown] = useState(null);

  useEffect(() => {
    dispatch(fetchMenuItem());
  }, [dispatch, currentLanguage, lang]);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };

  const filteredMenuData = useMemo(() => {
    return menuData?.filter((item) => item.lang === currentLanguage) || [];
  }, [menuData, currentLanguage]);
  let data = {
    message: "User logout successfully.",
    success: false,
    user_id: null,
  };
  // const userLogout = () => {
  //   localStorage.removeItem("isLogin");
  //   localStorage.removeItem("userData");
  //   dispatch(userLogin(data));
  //   navigate(`/login`);
  // };

  const handleGoogleLogoutSuccess = () => {
    // Handle the logout logic here
    // For example, dispatch a logout action, clear user data, etc.
    localStorage.removeItem("isLogin");
    localStorage.removeItem("userData");
    dispatch(userLogin(data));
    navigate(`/login`);
  };

  const handleGoogleLogoutFailure = (error) => {
    console.log("Google logout failure", error);
    // Handle the logout failure if needed
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= mobileScreen);
    };

    // Initial check
    handleResize();

    // Listen to window resize events
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  // console.log("sdasdasd::", openMenus);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light sticky-top">
        <div className="container">
          <Link className="navbar-brand" to={`${urlLanguage}`}>
            <img src="/logo (11).png" alt="logo(11)" />
          </Link>
          <button
            className="navbar-toggler mobile-toogler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile_nav"
            aria-controls="mobile_nav"
            aria-expanded="false"
            aria-label="Toggle navigation"

            // data-bs-toggle="collapse"
            //  data-bs-target="#mobile_nav" 
            //  aria-controls="mobile_nav"
            // aria-expanded="false" 
            // aria-label="Toggle navigation"


          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mobile_nav">
            <ul
              className={
                `navbar-nav navbar-light${(currentLanguage) ? ' class-'+currentLanguage : ''} 
                ${(isMobile) ? 'mobile-main' : ''}`
              }
            >
              <li className="nav-item"></li>

              {(isMobile) ? (
                <MobileAuthMenu
                  t={t}
                  currentLanguage={urlLanguage}
                  scrollToTop={onMenuClick}
                  handleMouseEnter={handleMouseEnter}
                  toggleMenu={toggleMenu}
                  handleMouseLeave={handleMouseLeave}
                  menuData={menuData}
                  openMenus={openMenus}
                  mobileScreen={mobileScreen}
                  authLogin={authLogin}
                  getTotalQuantity={getTotalQuantity}
                  clientId={clientId}
                  logoutSuccess={handleGoogleLogoutSuccess}
                  logoutFailure={handleGoogleLogoutFailure}
                />
              ) : null}

              {filteredMenuData[0]?.items.map((menuItem, index) => (
                <React.Fragment key={menuItem.id}>
                  
                  <DesktopMenus
                    menuItem={menuItem}
                    currentLanguage={urlLanguage}
                    scrollToTop={onMenuClick}
                    handleMouseEnter={handleMouseEnter}
                    toggleMenu={toggleMenu}
                    handleMouseLeave={handleMouseLeave}
                    index={index}
                    menuData={menuData}
                    openMenus={openMenus}
                    isMobile={isMobile}
                    mobileScreen={mobileScreen}
                  />

                </React.Fragment>
              ))}
              <div className="cart-header-design">
                <Link to={`${urlLanguage}/cart`}>
                  <img
                    src="/assets/images/shopping-basket.webp"
                    alt="shop"
                    onClick={onMenuClick}
                  />
                </Link>
                <div className="cart-header">
                  <p className="quantity">{getTotalQuantity() || 0}</p>
                </div>
                <div
                  className="login-btns"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  <div className="login-btn-user">
                    <PiUserCircle />
                  </div>

                  {showMenu && (
                    <div className="login-hover">
                      {/* <ul> */}
                      {authLogin === true ? (
                        <ul>
                          <li>
                            <Link to={`${urlLanguage}/my-account`}>
                              {t("main-nav.My Account")}
                            </Link>
                          </li>
                          <li>
                            {(getTotalQuantity() && getTotalQuantity() > 0) ? (
                              <Link to={`${urlLanguage}/checkout`}>
                                {t("main-nav.Checkout")}
                              </Link>
                            ) : (
                            <Link to={`${urlLanguage}/shop`}>
                                {t("main-nav.Checkout")}
                              </Link>
                            )}
                          </li>
                          <li>
                            <Link to={`${urlLanguage}/cart`}>
                              {t("main-nav.Cart")}
                            </Link>
                          </li>
                          <li>
                            <Link to="/wishlists">
                              {t("product_dropdown.wishlist.title")}
                            </Link>
                          </li>
                          {/* <li onClick={() => userLogout()}>
                        <GoogleLogout
                        clientId={clientId}
                        onSuccess={handleLoginSuccess}
                        onFailure={handleLoginFailure}
                        buttonText='Logout'
                        isSignedIn={true}
                        className="googel-login-inner"
                      />
                        <Link to={`/login`}>Logout</Link>
                      </li> */}
                          <li>
                            <GoogleLogout
                              clientId={clientId}
                              buttonText="Logout"
                              onLogoutSuccess={handleGoogleLogoutSuccess}
                              onFailure={handleGoogleLogoutFailure}
                              render={(renderProps) => (
                                <button
                                  onClick={renderProps.onClick}
                                  disabled={renderProps.disabled}
                                >
                                  {t("main-nav.Logout")}
                                </button>
                              )}
                            />
                          </li>
                        </ul>
                      ) : (
                        <ul>
                          <li>
                            {" "}
                            <Link to="/login">
                              {" "}
                              {t("main-nav.Login/Register")}
                            </Link>
                          </li>
                          <li>
                            <Link to={`${urlLanguage}/cart`}> {t("main-nav.Cart")}</Link>
                          </li>
                          {/* <li> <Link to="/world" className="login-btn-user"></Link></li> */}
                        </ul>
                      )}
                      {/* </ul> */}
                    </div>
                  )}
                </div>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MainNavbar;
