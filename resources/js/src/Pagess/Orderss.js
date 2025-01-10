import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ApiHook from "../components/CustomHooks/ApiHook";
import { useParams } from "react-router-dom";
import { userLogin } from "../reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../components/Helper";
import { useTranslation } from "react-i18next";
const API = process.env.REACT_APP_API_URL;

const OrdersComponent = () => {
  const [currentLanguage, urlLanguage] = ApiHook();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null); // Track expanded order ID
  const {auth}= useSelector((state)=>state)
  const { t } = useTranslation();

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API}allOrder-byuser-id/${JSON.parse(localStorage.getItem("userData")).user_data.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setOrders(data.order_all_info);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle toggle of expanded order
  const handleToggleExpand = (orderId) => {
    setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lang, slug } = useParams();
  const { authData } = useSelector((state) => state.auth);
  // console.log("authData",authData);

  useEffect(() => {
    scrollToTop();
  }, []);

  let data = {
    message: "User logout successfully.",
    success: false,
    user_id: null,
  };
  
  const userLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("userData");
    dispatch(userLogin(data));
    navigate(`/login`);
  };


  return (
    <>
      <div className="my-account qwe">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-3">
              <nav className="woocommerce-MyAccount-navigation">
                <ul>
                  <li className="navigation-link--dashboard is-active">
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                    <Link to="/">{t("order_Information.Dashboard")}</Link>
                  </li>
                  <li className="navigation-link--orders_info">
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                    <Link to={`${urlLanguage}/order`}>{t("order_Information.Orders")}</Link>
                  </li>
                  {/* <li className="navigation-link--downloads"><i className="fa fa-angle-right" aria-hidden="true"></i>
                                        <Link to="">Downloads</Link>
                                    </li> */}
                  {/* <li className="navigation-link--edit-address"><i className="fa fa-angle-right" aria-hidden="true"></i>
                                        <Link>Addresses</Link>
                                    </li>
                                    <li className="navigation-link--payment-methods"><i className="fa fa-angle-right" aria-hidden="true"></i>
                                        <Link to="">Payment methods</Link>
                                    </li> */}
                  <li className="navigation-link--edit-account">
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                    <Link to={`${urlLanguage}/account-details`}>
                    {t("order_Information.Account details")}
                    </Link>
                  </li>
                  <li
                    onClick={() => userLogout()}
                    className="navigation-link--customer-logout"
                  >
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                    <Link>
                    {t("order_Information.Log out")}</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-md-9">
              <div>
                <h1>{t("order_Information.Orders")}</h1>
                {loading ? (
                  <p>{t("order_Information.Loading")}</p>
                ) : orders.length === 0 ? (
                  <p>{t("order_Information.No orders found")}</p>
                ) : (
                  <table className="table table-bordered orders_table">
                    <thead>
                      <tr>
                        <th>{t("order_Information.Order ID")}</th>
                        <th> {t("order_Information.Name")}</th>
                        <th> {t("order_Information.Total")} </th>
                        <th>{t("order_Information.Payment Method")}</th>
                        <th> {t("order_Information.Payment Status ")}</th>
                        {/* <th>Email</th>
                        <th>Phone</th>
                        <th>Country</th>
                        <th>Post Code</th>
                        <th>Address1</th>
                        <th>Address2</th> */}
                        <th>{t("order_Information.Actions")}</th> {/* Added Actions column */}
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <React.Fragment key={order.id}>
                          <tr>
                            <td>{order.order_number}</td>
                            <td>{order?.user.name}</td>
                            <td>{order.total_amount}</td>
                            <td>{order.payment_method}</td>
                            <td>{order.payment_status}</td>
                            <td>
                              <Link to={`${urlLanguage}/orders/${order.id}`}>
                                {t("order_Information.View")}
                              </Link>
                            </td>
                          </tr>
                          {expandedOrderId === order.id && ( // Render additional data if expanded
                            <tr>
                              <td colSpan="14">
                                <div>
                                {t("order_Information.Additional")}
                                   {order.id}
                                </div>
                                <tr>
                                  <th>{t("order_Information.First Name ")}</th>
                                  <th>{t("order_Information.Last Name ")}</th>
                                  <th> {t("order_Information.Email ")}</th>
                                  <th> {t("order_Information.Phone ")}</th>
                                  <th>{t("order_Information.Country ")} </th>
                                  <th> {t("order_Information.Post Code ")}</th>
                                  <th>{t("order_Information.Payment Method ")}</th>
                                  <th> {t("order_Information.Payment Status ")}</th>
                                  <th> {t("order_Information.Status ")}</th>
                                  <th> {t("order_Information.Total ")}</th>
                                  <th> {t("order_Information.Address1 ")}</th>
                                  <th> {t("order_Information.Address2 ")}</th>
                                </tr>
                                <td>{order.first_name}</td>
                                <td>{order.last_name}</td>
                                <td>{order.email}</td>
                                <td>{order.phone}</td>
                                <td>{order.country}</td>
                                <td>{order.post_code}</td>
                                <td>{order.payment_method}</td>
                                <td>{order.payment_status}</td>
                                <td>{order.status}</td>
                                <td>{order.total_amount}</td>
                                <td>{order.address1}</td>
                                <td>{order.address2}</td>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersComponent;