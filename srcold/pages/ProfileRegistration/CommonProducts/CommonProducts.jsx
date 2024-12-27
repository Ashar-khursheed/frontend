import React, { useEffect, useState,lazy } from "react";
 
import Skeleton from "react-loading-skeleton";
import { apiClient } from "../../../utils/apiWrapper";
const  ProductCard =lazy(()=>import("../../../shared/ProductCard"));
const CommonProducts = () => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const fetchProducts = async () => {
    setLoader(true);
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await apiClient.get(
        `${authToken ? "/products" : "/products-guest"}`
      );
      setProducts(response.data.data.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const bigScreenCss =
    "flex grid-cols-5 sm:grid md:grid lg:grid 2xl:grid gap-5 sm:gap-5 sm:grid sm:space-x-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5";

  return (
    <>
      <div className="block sm:hidden">
        <div className="mb-10 mt-[20px] p-[10px]">
          <img
            className="h-[160px] w-[100vw] rounded-md"
            src={process.env.PUBLIC_URL + "/images/RegistrationProfile.png"}
          />
          <div className="flex items-center justify-between mx-2 my-[10px] sm:my-8">
            <h2 className=" font-medium sm:font-semibold text-[16px] sm:text-2xl text-black-100 ">
              Products you may also like
            </h2>
          </div>
          <div
            style={
              window.innerWidth < 640
                ? {
                    overflow: "auto",
                    scrollbarWidth: "none", // For Firefox
                    msOverflowStyle: "none", // For Internet Explorer and Edge
                  }
                : {}
            }
            className={bigScreenCss}
          >
            {loader ? (
              Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="col-span-1">
                  <Skeleton count={1} height="400px" width="200px" />
                </div>
              ))
            ) : (
              <React.Fragment>
                {products && products.length > 0 ? (
                  products.map((product, index) =>
                    index < 10 ? (
                      <ProductCard
                        key={index}
                        classes="col-span-1 mt-1"
                        product={product}
                      />
                    ) : null
                  )
                ) : (
                  <p className="col-span-5 font-semibold text-center text-base">
                    No Product Found
                  </p>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
        <div className="mb-10">
          <div className="flex items-center justify-between mx-2 my-[10px] sm:my-8">
            <h2 className=" font-medium sm:font-semibold text-[16px] sm:text-2xl text-black-100 ">
              Inspired by your browsing history
            </h2>
          </div>
          <div
            style={
              window.innerWidth < 640
                ? {
                    overflow: "auto",
                    scrollbarWidth: "none", // For Firefox
                    msOverflowStyle: "none", // For Internet Explorer and Edge
                  }
                : {}
            }
            className={bigScreenCss}
          >
            {loader ? (
              Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="col-span-1">
                  <Skeleton count={1} height="400px" width="200px" />
                </div>
              ))
            ) : (
              <React.Fragment>
                {products && products.length > 0 ? (
                  products.map((product, index) =>
                    index < 10 ? (
                      <ProductCard
                        key={index}
                        classes="col-span-1 mt-1"
                        product={product}
                      />
                    ) : null
                  )
                ) : (
                  <p className="col-span-5 font-semibold text-center text-base">
                    No Product Found
                  </p>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommonProducts;
