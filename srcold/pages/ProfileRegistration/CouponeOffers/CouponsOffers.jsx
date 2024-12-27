import React, { useEffect, useState, lazy } from "react";
import { Wrapper } from "../../../shared/Wrapper";
import SidebarProfile from "../../../components/SidebarProfile";
import { Breadcrumb } from "../../../shared/Breadcrumb";
import CouponBox from "./components/CouponBox";
import { apiClient } from "../../../utils/apiWrapper";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router";
import CommonProducts from "../CommonProducts/CommonProducts";
const CouponsOffers = () => {
  const [loader, setLoader] = useState(true);
  const [couponData, setCouponData] = useState([]);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const fetchAllCoupons = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
    }
    try {
      const response = await apiClient.get("/customer/coupons");
      setCouponData(response?.data?.coupons);

      setLoader(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoader(false);
    }
  };

  const [activeTab, setActiveTab] = useState("All Coupons");

  const tabs = ["All Coupons", "Used", "Unused", "Expired"];

  const fetchProducts = async () => {
    const authToken = localStorage.getItem("authToken");
    const response = await apiClient.get(
      `${authToken ? "/products" : "/products-guest"}`
    );
    setProducts(response.data.data.data);
  };

  useEffect(() => {
    fetchAllCoupons();
    fetchProducts();
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
      title: "Coupons & offers",
    },
  ];

  return (
    <>
      <Wrapper>
        <Breadcrumb items={collectionBreadCrumb} classes={"mt-4 mb-2"} />
      </Wrapper>
      <div className="block sm:hidden">
        <h1 className="text-center mt-[15px]">Coupons & Offers</h1>
        <div className="flex  py-[10px] justify-between m-[0px] w-[100%]">
          <div className="flex mb-[10px] flex-wrap w-[100%] sm:w-[45%] border-b-2 p-[10px] justify-between mt-[5px]">
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
              className="border rounded-[20px] border-2 w-[320px] p-[5px]"
              type="input"
              placeholder="Search Coupons or Vouchers"
            />
          </div>
        </div>
      </div>
      <Wrapper>
        <div className="flex">
          <SidebarProfile />
          {/* Coupons Section */}
          <div className="flex flex-col  w-[100%]">
            <h1 className="text-center mt-[15px]">Coupons & Offers</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-4 w-full">
              <div className="hidden sm:block">
                <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-[5px]">
                  <p className="font-work-sans text-[#186737] text-base font-normal leading-6 text-left decoration-none">
                    All Coupons
                  </p>
                  <p className="font-work-sans text-[#666666] text-base font-normal leading-6 text-left decoration-none">
                    Used
                  </p>
                  <p className="font-work-sans text-[#666666] text-base font-normal leading-6 text-left decoration-none">
                    Unused
                  </p>
                  <p className="font-work-sans text-[#666666] text-base font-normal leading-6 text-left decoration-none">
                    Expired
                  </p>
                </div>
              </div>

              <div className="w-full  mx-auto">
                <input
                  className="border rounded-[20px] border-2 w-full p-[5px]"
                  type="text"
                  placeholder="Search Coupons or Vouchers"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {loader ? (
                Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className="col-span-2">
                    <Skeleton count={1} height="200px" />
                  </div>
                ))
              ) : (
                <React.Fragment>
                  {couponData.length > 0 ? (
                    couponData?.map((items) => {
                      return <CouponBox data={items} />;
                    })
                  ) : (
                    <div className="flex items-center justify-center">
                      <p>No Coupons Found</p>
                    </div>
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
        <CommonProducts />
      </Wrapper>
    </>
  );
};

export default CouponsOffers;
