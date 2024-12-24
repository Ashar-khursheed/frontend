import React, { useEffect, useState,lazy,Suspense } from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import { apiClient } from "./utils/apiWrapper";
import { ToastContainer } from "react-toastify";
import { FaRegCircleCheck } from "react-icons/fa6";
import { Loader } from "./shared/Loader";
// Lazy load components
const Footer=lazy(()=>import('./pages/Footer'));
const Navigation=lazy(()=>import('./pages/Navigation'));
const Homepage=lazy(()=>import('./pages/Homepage'));
const ProductListing = lazy(() => import("./pages/ProductListing"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const CollectionPage = lazy(() => import("./pages/CollectionPage"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const SettingsLayout = lazy(() => import("./pages/settings/SettingsLayout"));
const Checkout = lazy(() => import("./pages/checkout/Checkout"));
const ReviewCheckout = lazy(() => import("./pages/checkout/ReviewCheckout"));
const ProductsByCategory = lazy(() => import("./pages/ProductsByCategory"));
const AllOrders = lazy(() => import("./pages/ProfileRegistration/AllOrders/AllOrders"));
const Reviews = lazy(() => import("./pages/ProfileRegistration/Reviews/Reviews"));
const BrowsingHistory = lazy(() => import("./pages/ProfileRegistration/BrowsingHistory/BrowsingHistory"));
const CouponsOffers = lazy(() => import("./pages/ProfileRegistration/CouponeOffers/CouponsOffers"));
const Addresses = lazy(() => import("./pages/ProfileRegistration/Addresses/Addresses"));
const CreditBalance = lazy(() => import("./pages/ProfileRegistration/CreditBalance/CreditBalance"));
const AccountSecurity = lazy(() => import("./pages/ProfileRegistration/AccountSecurity/AccountSecurity"));
const OrderDetails = lazy(() => import("./pages/ProfileRegistration/OrderDetails/OrderDetails"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ContactUs = lazy(() => import("./pages/FooterPages/ContactUs/ContactUs"));
const FAQ = lazy(() => import("./pages/FooterPages/FAQ/Component/FAQ"));
const TermsConsition = lazy(() => import("./pages/FooterPages/TermsAndConditions/TermsConsition"));
const PrivacyPolicy = lazy(() => import("./pages/FooterPages/PrivacyPolicy/PrivacyPolicy"));
const Career = lazy(() => import("./pages/FooterPages/Career/Career"));
const PaymentSuccess = lazy(() => import("./pages/payment/PaymentSuccess"));
const PaymentFailed = lazy(() => import("./pages/payment/PaymentFailed"));
const PasswordReset = lazy(() => import("./pages/PasswordReset"));
const ProfileWishlist = lazy(() => import("./pages/ProfileRegistration/Wishlist/ProfileWishlist"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const SellOnHoreca = lazy(() => import("./pages/FooterPages/SellonHoreca/SellOnHoreca"));
const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs"));
const BlogListing = lazy(() => import("./pages/BlogsPage/BlogListing"));
const BlogDetails = lazy(() => import("./pages/BlogsPage/BlogDetails"));




const App = () => {
  const location = useLocation();
  const [loader, setLoader] = useState(true);
  const [categories, setCategories] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [userProfile, setUserProfile] = useState({});
  const [currentLocation, setCurrentLocation] = useState({});

  const fetchCategories = async () => {
    setLoader(true);
    try {
      const response = await apiClient.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoader(false);
    }
  };
  const fetchUser = async () => {
    setLoader(true);
    try {
      const response = await apiClient.get("/profile");
      setUserProfile(response.data.user);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      fetchUser();
    }
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    setLoader(true);
    try {
      const response = await apiClient.get(`/location`);
      setCurrentLocation(response.data); // Assuming the structure of the response
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoader(false);
    }
  };
 
  return (
    <>
     <Suspense fallback={<div className="w-full h-[100vh] flex items-center justify-center bg-white fixed left-0 top-0 z-[999]">
                <Loader />
              </div>}>
      <Navigation
        categories={categories}
        currentLocation={currentLocation}
        userProfile={userProfile}
      />{" "}
      <Routes>
        <Route
          path="/home"
          element={
            !loader ? (
              <Homepage categories={categories} />
            ) : (
              <div className="w-full h-[100vh] flex items-center justify-center bg-white fixed left-0 top-0 z-[999]">
                <Loader />
              </div>
            )
          }
        />{" "}
        <Route
          path="/collections/:category/:subcategory/:id"
          element={<ProductsByCategory />}
        />{" "}
        <Route path="/checkout" element={<Checkout />} />{" "}
        <Route path="/" element={<Navigate replace to="/home" />} />{" "}
        <Route path="/products" element={<ProductListing />} />{" "}
        <Route path="/product/:id" element={<ProductDetail />} />{" "}
        <Route path="/collections/:id" element={<CollectionPage />} />{" "}
        <Route path="/settings" element={<SettingsLayout />} />{" "}
        <Route path="/login" element={<Login />} />{" "}
        <Route path="/forgot-password" element={<ForgotPassword />} />{" "}
        <Route path="/sign-up" element={<SignUp />} />{" "}
        <Route path="/review-checkout"  element={<ReviewCheckout  currentLocation={currentLocation} />} />{" "}
        <Route path="/registration/all-orders" element={<AllOrders />} />{" "}
        <Route path="/registration/reviews" element={<Reviews />} />{" "}
        <Route path="/registration/browsing-history" element={<BrowsingHistory />} />{" "}
        <Route path="/registration/wishlist" element={<ProfileWishlist />} />{" "}
        <Route path="/wishlist" element={<Wishlist />} />{" "}
        <Route path="/registration/coupons-offers" element={<CouponsOffers />} />{" "}
        <Route path="/registration/addresses" element={<Addresses />} />{" "}
        <Route path="/registration/creditBalance" element={<CreditBalance />} />{" "}
        <Route path="/registration/AccountSecurity" element={<AccountSecurity />} />{" "}
        <Route path="/order-details/" element={<OrderDetails />} />{" "}
        <Route path="/contact-us" element={<ContactUs />} />{" "}
        <Route path="/faq" element={<FAQ />} />{" "}
        <Route path="/terms-condition" element={<TermsConsition />} />{" "}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />{" "}
        <Route path="/sell-on-horeca" element={<SellOnHoreca />} />{" "}
        <Route path="blog-listing" element={<BlogListing/>}/>
        <Route path="blog-details" element={<BlogDetails/>}/>
        <Route path="/career" element={<Career />} />{" "}
        <Route path="/career" element={<Career />} />{" "}AboutUs
        <Route path="/about-us" element={<AboutUs />} />{" "}
        <Route path="/forgot-password" element={<ForgotPassword />} />{" "}
        <Route path="/password-reset" element={<PasswordReset />} />{" "}
        <Route path="/payment/success" element={<PaymentSuccess />} />{" "}
        <Route path="/payment/cancel" element={<PaymentFailed />} />{" "}
      </Routes>{" "}
      <ToastContainer
        icon={<FaRegCircleCheck size={20} />}
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        limit={3}
      />{" "}
      <Footer />
      </Suspense>
    </>
  );
};

export default App;
