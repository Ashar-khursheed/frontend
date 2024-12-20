import React, { useEffect, useState } from "react";
import { Wrapper } from "../../../shared/Wrapper";
import SidebarProfile from "../../../components/SidebarProfile";
import { apiClient } from "../../../utils/apiWrapper";
import { ProductCard } from "../../../shared/ProductCard";
import Skeleton from "react-loading-skeleton";
import { Breadcrumb } from "../../../shared/Breadcrumb";
import { useNavigate } from "react-router";
import CommonProducts from "../CommonProducts/CommonProducts";

const BrowsingHistory = () => {
  const [viewedProducts, setViewedProducts] = useState([]);
  const [viewedLoader, setViewedLoader] = useState(true);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const fetchAllOrders = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
    }
    try {
      const response = await apiClient.get("/recently-viewed");
      setViewedProducts(response?.data);
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
      
      title: "Browsing History",
    },
  ];
  const bigScreenCss =
    "grid grid-cols-2 lg:grid-cols-12 xl:grid-cols-12 sm:grid-cols-4 gap-4  mt-4 mb-10";

  return (
    <>
      <Wrapper>
        <Breadcrumb items={collectionBreadCrumb} classes={"mt-4 mb-2"} />
      </Wrapper>
      {/* for mobile */}
      <h1 className="block sm:hidden mb-[10px] p-[10px] border-b-2 text-center font-medium text-[16px] leading-[24px]">
        Browsing History
      </h1>
      {/*  */}
      <Wrapper>
        <h1 className="hidden sm:block text-center font-medium text-[16px] leading-[24px]">
          Browsing History
        </h1>
        <div className="flex">
          <SidebarProfile />
          {/* Browsing History Section */}
          <div className="flex flex-col p-[10px] justify-between w-[100%] h-[100%]">
            <div className="flex items-center p-[10px] h-[50px] w-[100%] bg-[#f9fafc] border rounded-sm mb-[10px]">
              Oct 19 2024, 5:45 P.M.
            </div>
            <div
              style={{
                overflow: "auto",
                scrollbarWidth: "none", // For Firefox
                msOverflowStyle: "none", // For Internet Explorer and Edge
              }}
              className={viewedLoader ? "grid grid-cols-4 gap-4" : bigScreenCss}
            >
              {viewedLoader ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    style={{ width: "400px" }}
                    className=" mt-1 min-h-[400px] w-[280px]"
                  />
                ))
              ) : (
                <React.Fragment>
                  {Array.isArray(viewedProducts) ? (
                    viewedProducts?.map((item, index) => {
                      return (
                        <ProductCard
                          key={index}
                          classes="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-3    mt-1"
                          product={item.product}
                        />
                      );
                    })
                  ) : (
                    <div className="flex items-center justify-center">
                      <p className="mt-2 font-semibold text-center text-xl col-span-4">
                        No Browsing History
                      </p>
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

export default BrowsingHistory;
