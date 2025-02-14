import axios from "axios";
import { toast } from "react-toastify";

const API = process.env.REACT_APP_API_URL;

export const subscribeEmail = async (subsrcibe_email) => {
    try {
        const subscribed = await axios.post(API + `subsrcibe_mailchimp`, subsrcibe_email)
        toast.success(subscribed.data.message)
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
export const registration = async (data) => {
    try {
        const registerData = await axios.post(API + `register`, data)
        toast.success(registerData.data.message)
        return registerData.data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
export const login = async (data) => {
    // console.log("authLogin", authLogin);
    try {
        const loginData = await axios.post(API + `login`, data)
        if (loginData) {
            // console.log("loginData====api",loginData);
            // authLogin(loginData.data)
            localStorage.setItem('isLogin',true);
            localStorage.setItem('userData', JSON.stringify(loginData.data));
        }
        toast.success(loginData.data.message)
        return loginData.data;
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const enquiry = async (data, showToast = true) => {
    try {
        const enquiryData = await axios.post(`${API}contactform`, data);
        console.log(enquiryData)    
        if(showToast) {
            toast.success(enquiryData?.data.message, {
                className: 'full-green-alert',
                autoClose: 5000
            });
        }

        return true;
    } catch (error) {
        toast.error(error.response?.data.message)
        console.log("enquiry Data----erorr", error);
        return false;
    }
}

export const rateReveiw = async (data) => {
 try {
    const ratingData = await axios.post(`${API}product-reviews`,data);
    toast.success(ratingData.data.message);
    return ratingData;
    // console.log("reating Data ",ratingData)
 } catch (error) {
    toast.error(error.response.data.message)
    console.log("enquiryData----erorr", error);
 }
}

export const applyCoupon = async(data)=>{
    try {
        const couponData = await axios.post(`${API}coupons-code`,data);
   // toast.success(couponData.data.message);
    // console.log("reating Data ",couponData)
    return couponData.data;
    } catch (error) {
       // toast.error(error.response.data.message)
        return error.response.data;
        console.log("enquiryData----erorr", error);
    }
}

export const checkCoupon = async (data) => {
    try {
        const check = await axios.post(`${API}check-coupon`,data);
        return check.data;
    } catch (error) {
       // toast.error(error.response.data.message)
        return error.response.data;
        console.log("enquiryData----erorr", error);
    }
}

export const getAddress = async (id) => {
    try {
        const address = await axios.get(`${API}get-user-addresses-info/${id}`);
        return { status: true , data: address?.data };
    } catch(err) {
        return { status: false , data: err };
    }
}

export const forgotPassword = async (formData, lang) => {
    try {
        const forgot = await axios.post(`${API}reset/forgot?lang=${lang}`, formData);
        return forgot;
    } catch(error) {
        return false;
        console.log('Forgot Password Error: ', error);
    }
}

export const checkForgetToken = async (token, email) => {
    try {
        const check = await axios.get(`${API}reset/check-token/${token}/${email}`);
        return (check && check.data) ? check.data : null;
    } catch(error) {
        return false;
        console.log('Check Token Error: ', error);
    }
}

export const resetPassword = async (formData) => {
    try {
        const reset = await axios.post(`${API}reset/change-password`, formData);
        return (reset && reset.data) ? reset.data : null;
    } catch(error) {
        return false;
        console.log('Reset Password Error: ', error);
    }
}

export const getWishlist = async (user, lang) => {
    try {
        const wishlist = await axios.get(`${API}wishlists/${user}/${lang}`);
        return wishlist.data
    } catch (error) {
        toast.error(error?.response?.data.message)
    }
}

export const addWishlist = async (data, showToast = true) => {
    try {
        const wishlist = await axios.post(`${API}wishlists/add`, data);
        if(showToast) { toast.success(wishlist?.data.message); }
        return wishlist.data
    } catch (error) {
        toast.error(error?.response?.data.message)
    }
}

export const deleteAllWishlist = async (data) => {
    try {
        const wishlist = await axios.post(`${API}wishlists/delete/multiple`, data);
        return wishlist.data
    } catch (error) {
        toast.error(error?.response?.data.message)
    }
}

export const uploadFileApi = async (data) => {
    try {
        const img = await axios.post(`${API}products/aws3/uploadimages`, data);
        return img.data
    } catch (error) {
        toast.error(error?.response?.data.message)
    }
}
export const getNumberApi = async (lang = 'en_SG') => {
    try {
        const num = await axios.get(`${API}number/get?lang=${lang}`);
        return num.data
    } catch (error) {
        toast.error(error?.response?.data.message)
    }
}

export const getCurrentCountry = async () => {
    try {
        const countryData = await axios.get(`https://api.country.is/`);
        return countryData.data
    } catch (error) {
        toast.error(error?.response?.data.message)
    }
}
export const getIpCountry = async () => {
    try {
        const countryData = await axios.get(`https://api.ipapi.is/`);
        return countryData.data?.location
    } catch (error) {
        toast.error(error?.response?.data.message)
    }
}

