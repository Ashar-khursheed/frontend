import React, { useEffect, useState,lazy,Suspense } from "react";
import { useLocation } from "react-router-dom";
const Homepage=lazy(()=>import('./pages/Homepage'));
 
import { Navigation } from "./pages/Navigation";
import { Footer } from "./pages/Footer";
import { ProductListing } from "./pages/ProductListing";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProductDetail } from "./pages/ProductDetail";
import { CollectionPage } from "./pages/CollectionPage";
import { FirstCheckout } from "./pages/FirstCheckout";
import { Login } from "./pages/Login";
import { FinalCheckout } from "./pages/FinalCheckout";
import { SuccessCheckout } from "./pages/SuccessCheckout";
import { Loader } from "./shared/Loader";
import { SignUp } from "./pages/SignUp";
import { SettingsLayout } from "./pages/settings/SettingsLayout";
import { apiClient } from "./utils/apiWrapper";
import { ToastContainer } from "react-toastify";
import { FaRegCircleCheck } from "react-icons/fa6";
import { Checkout } from "./pages/checkout/Checkout";
import { ReviewCheckout } from "./pages/checkout/ReviewCheckout";
import { ProductsByCategory } from "./pages/ProductsByCategory";

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
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
      <Navigation
        categories={categories}
        currentLocation={currentLocation}
        userProfile={userProfile}
      />

      <Routes>
      <Suspense fallback={<div>Loading ...</div>}>
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
        />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/collections/:id" element={<CollectionPage />} />
        <Route
          path="/collections/:category/:subcategory/:id"
          element={<ProductsByCategory />}
        />
        <Route path="/settings" element={<SettingsLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/review-checkout" element={<ReviewCheckout />} />
        <Route path="/" element={<Navigate replace to="/home" />} />
        </Suspense>
      </Routes>

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
      />

      <Footer />
    </>
  );
};


export default App;
