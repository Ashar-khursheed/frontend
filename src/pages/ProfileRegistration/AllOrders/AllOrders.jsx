import React, { useEffect, useState, lazy } from "react";
import AllOrdersBox from "./components/AllOrdersBox";
import { Wrapper } from "../../../shared/Wrapper";
import SidebarProfile from "../../../components/SidebarProfile";
import { apiClient } from "../../../utils/apiWrapper";
import Skeleton from "react-loading-skeleton";
import { Breadcrumb } from "../../../shared/Breadcrumb";
import ImagePopup from "../../../components/ImagePopup";
import { useNavigate } from "react-router";
import CommonProducts from "../CommonProducts/CommonProducts";
const ProductCard = lazy(() => import("../../../shared/ProductCard"));
const AllOrders = () => {
  const [viewedLoader, setViewedLoader] = useState(true);
  const [ordersData, setOrdersData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [imageView, setImageView] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const navigation = (data) => {
    navigate("/order-details", data);
  };

  const fetchAllOrders = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
    }
    try {
      const response = await apiClient.get("/orders");
      setOrdersData(response?.data);
      setViewedLoader(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setViewedLoader(false);
    }
  };

  const fetchProducts = async () => {
    const authToken = localStorage.getItem("authToken");
    const response = await apiClient.get(
      `${authToken ? "/products" : "/products-guest"}`
    );
    setProducts(response.data.data.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchAllOrders();
  }, []);

  const collectionBreadCrumb = [
    {
      url: "/",
      title: "Your Account",
    },
    {
      url: "/",
      title: "Profile",
    },
    {
      title: "All Orders",
    },
  ];
  const bigScreenCss =
    "flex grid-cols-5 sm:grid md:grid lg:grid 2xl:grid gap-5 sm:gap-5 sm:grid sm:space-x-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5";

  const [activeTab, setActiveTab] = useState("All Orders");

  const tabs = ["All Orders", "Processing", "Shipped", "Delivered", "Returns"];

  return (
    <>
      <Wrapper>
        <Breadcrumb items={collectionBreadCrumb} classes={"mt-4 mb-2"} />
      </Wrapper>
      <div className="block sm:hidden">
        <h1 className="border-bottom-2 text-center mt-[15px]">Your Orders</h1>
        <div className="flex py-[10px] justify-between w-[100%]">
          <div className="flex flex-wrap w-full sm:w-[45%] p-[10px] mb-[10px] border-b border-gray-300 justify-between mt-[5px]">
            {tabs.map((tab) => (
              <p
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-work-sans text-base font-normal leading-6 text-left cursor-pointer relative ${
                  activeTab === tab
                    ? "text-[#186737] after:content-[''] after:absolute after:bottom-[-2px] after:left-1/2 after:-translate-x-1/2 after:w-[50%] after:h-[2px] after:bg-[#186737] after:rounded-full"
                    : "text-[#666666]"
                }`}
              >
                {tab}
              </p>
            ))}
          </div>

          <div className="hidden sm:block w[100%]">
            <input
              className="border rounded-[20px] border-2 w-[200px] sm:w-[350px] p-[5px]"
              type="input"
              placeholder="Item Name / Order ID / Tracking No."
            />
          </div>
        </div>
      </div>
      <Wrapper>
        <div className="hidden sm:flex">
          <SidebarProfile />
          <div className="flex flex-col  w-[100%]">
            {/* Sub-Navbar */}
            <h1 className="block sm:hidden text-center mt-[15px]">
              Your Orders
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 w-full">
              <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-[5px]">
                <p className="font-work-sans text-[#186737] text-base font-normal leading-6 text-left decoration-none">
                  All Orders
                </p>
                <p className="font-work-sans text-[#666666] text-base font-normal leading-6 text-left decoration-none">
                  Processing
                </p>
                <p className="font-work-sans text-[#666666] text-base font-normal leading-6 text-left decoration-none">
                  Shipped
                </p>
                <p className="font-work-sans text-[#666666] text-base font-normal leading-6 text-left decoration-none">
                  Delivered
                </p>
                <p className="font-work-sans text-[#666666] text-base font-normal leading-6 text-left decoration-none">
                  Returns
                </p>
              </div>

              <div className="w-full  mx-auto">
                <input
                  className="border rounded-[20px] border-2 w-full p-[5px]"
                  type="text"
                  placeholder="Item Name / Order ID / Tracking No."
                />
              </div>
            </div>

            {viewedLoader ? (
              Array.from({ length: 10 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="col-span-1 mt-1 min-h-[180px]"
                />
              ))
            ) : (
              <React.Fragment>
                {ordersData && ordersData.length > 0 ? (
                  ordersData?.map((item, index) => {
                    return (
                      <AllOrdersBox
                        data={item}
                        id={index}
                        setImageView={setImageView}
                        setShowPopup={setShowPopup}
                        navigation={navigation}
                      />
                    );
                  })
                ) : (
                  <div className="flex items-center justify-center">
                    <p className="col-span-5 font-semibold text-center text-base">
                      No Product Found
                    </p>
                  </div>
                )}
              </React.Fragment>
            )}
          </div>
          {showPopup && (
            <ImagePopup setShowPopup={setShowPopup} imageView={imageView} />
          )}
        </div>
        <CommonProducts />
      </Wrapper>
    </>
  );
};

export default AllOrders;
