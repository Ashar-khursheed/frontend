import React, { useEffect, useState } from "react";
import { Wrapper } from "../../../shared/Wrapper";
import SidebarProfile from "../../../components/SidebarProfile";
import { Breadcrumb } from "../../../shared/Breadcrumb";
import Popup from "./Components/Popup";
import Skeleton from "react-loading-skeleton";
import { ProductCard } from "../../../shared/ProductCard";
import { apiClient } from "../../../utils/apiWrapper";
import CommonProducts from "../CommonProducts/CommonProducts";
import { notify } from "../../../utils/notify";

const Addresses = () => {
  const [popupHeading, setPopupHeading] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [getData, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [updateStatus, setStatus] = useState(false);
  const [items, setItems] = useState("");
  const authToken = localStorage.getItem("authToken");
  const fetchProducts = async () => {
    const response = await apiClient.get(
      `${authToken ? "/products" : "/products-guest"}`
    );
    setProducts(response.data.data.data);
  };

  const fetchAddress = async () => {
    setLoader(true);
    try {
      const response = await apiClient.get(`/addresses`);
      setData(response.data);
      setLoader(false);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader(false);
    }
  };

  const deleteAddress = async (id) => {
    setLoader(true);
    try {
      const response = await apiClient.delete(`/addresses/${id}`);
      setStatus(!updateStatus);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader(false);
    }
  };

  const defaultAddress = async (id) => {
    setLoader(true);
    try {
      const response = await apiClient.post(
        `/addresses/update-default-address`,
        {
          address_id: id,
        }
      );

      notify("Success", response.data.message);
      setStatus(!updateStatus);
    } catch (error) {
      console.log("error", error);
    } finally {
      // setLoader(false);
    }
  };

  const updateAddress = (items) => {
    setItems(items);
    setShowPopup(true);
    setPopupHeading("Update Address");
  };

  const AddAddress = () => {
    setItems(null);
    setShowPopup(true);
    setPopupHeading("Add New Address");
  };
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
      title: "Addresses",
    },
  ];
  const bigScreenCss =
    "flex grid-cols-5 sm:grid md:grid lg:grid 2xl:grid gap-5 sm:gap-5 sm:grid sm:space-x-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5";
  useEffect(() => {
    fetchProducts();
    fetchAddress();
  }, []);
  useEffect(() => {
    fetchAddress();
  }, [updateStatus]);

  return (
    <>
      <Wrapper>
        <Breadcrumb items={collectionBreadCrumb} classes={"mt-4 mb-2"} />
      </Wrapper>
      <Wrapper>
        <div className="flex">
          <SidebarProfile />
          {loader ? (
            Array.from({ length: 1 }).map((_, index) => (
              <div key={index} className="flex flex-col">
                <Skeleton count={1} height="250px" width={"70vw"} />
              </div>
            ))
          ) : (
            // Main Section
            <div className="flex flex-col p-[10px] justify-between w-[100%] h-[100%]">
              {window?.innerWidth > 640 && (
                <p className="font-light font-sans text-[18px] font-normal leading-[24px] text-left decoration-slice">
                  Your Addresses
                </p>
              )}
              {window?.innerWidth <= 640 && (
                <p className="font-light font-sans text-[18px] font-normal leading-[24px] text-center decoration-slice">
                  Addresses
                </p>
              )}
              {!!getData &&
                getData.data.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row rounded-none sm:rounded-md border-t-2 border-b-2 sm:border-2 w-[100%] mt-[10px]"
                  >
                    <div className="flex-col p-[15px] w-[100%]">
                      <div className="flex sm:flex-col items-center sm:items-start">
                        <p className="font-sans p-[5px] text-lg font-medium leading-[21.11px] text-left decoration-skip-ink-none underline-offset-4">
                          {item.name}
                        </p>
                        <p className="font-sans p-[5px] text-[#64748B] text-base font-normal leading-[18.77px] text-left decoration-skip-ink-none underline-offset-4">
                          {item.phone}
                        </p>
                      </div>
                      <p className="font-sans p-[5px] border-b py-[15px] text-[#64748B] text-base font-normal leading-[18.77px] text-left decoration-skip-ink-none underline-offset-4">
                        {item.address}, {item.zip_code}, {item.state},{" "}
                        {item.country}
                      </p>
                      <div className="flex items-center mt-[10px]">
                        <div className="flex w-[100%] items-center justify-between">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              checked={item.is_default}
                              onClick={() => defaultAddress(item.id)}
                            />
                            <p className="font-sans text-[#64748B] p-[5px] ml-[5px] text-sm font-normal leading-[17.6px] text-left decoration-skip-ink-none underline-offset-4">
                              Default
                            </p>
                          </div>
                          <div className="flex text-[14px] text-[#64748B] lg:hidden md:hidden xl:hidden sm:hidden">
                            <p
                              className="px-[10px] border-r cursor-pointer"
                              onClick={() => deleteAddress(item.id)}
                            >
                              Delete
                            </p>
                            <p
                              onClick={() => updateAddress(item.id)}
                              className="px-[10px] border-r cursor-pointer"
                            >
                              Edit
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center justify-center flex-col p-[15px]">
                      <button
                        onClick={() => updateAddress(item)}
                        className="flex m-[10px] items-center justify-center rounded-md font-sans w-[180px] h-[40px] border border-[#666666] text-[16px] text-[#666666] font-medium leading-[16px] text-left underline-offset-auto decoration-slice"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteAddress(item.id)}
                        className="flex m-[10px] items-center justify-center rounded-md font-sans w-[180px] h-[40px] border border-[#666666] text-[16px] text-[#666666] font-medium leading-[16px] text-left underline-offset-auto decoration-slice"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              <div>
                <h1
                  className="mt-[20px] font-work-sans text-[16px] text-[#186737] cursor-pointer font-normal leading-[24px] text-left underline decoration-solid decoration-from-font decoration-skip-ink-none"
                  onClick={AddAddress}
                >
                  Add New Address
                </h1>
              </div>
            </div>
          )}
          {window?.innerWidth <= 640 && (
            <div className="mb-10 mt-[20px] p-[10px]">
              <img
                className="h-[160px] w-[100vw] object-cover rounded-md"
                src={process.env.PUBLIC_URL + "/images/RegistrationProfile.png"}
              />
              <div className="flex items-center justify-between mx-2 my-[10px] sm:my-8">
                <h2 className="font-medium sm:font-semibold text-[16px] sm:text-2xl text-black-100">
                  Products you may also like
                </h2>
              </div>
              <div
                style={
                  window.innerWidth < 640
                    ? {
                        overflow: "auto",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }
                    : {}
                }
                className={bigScreenCss}
              >
                {products && products.length > 0 ? (
                  products
                    .slice(0, 10)
                    .map((product, index) => (
                      <ProductCard
                        key={index}
                        classes="col-span-1 mt-1"
                        product={product}
                      />
                    ))
                ) : (
                  <p className="col-span-5 font-semibold text-center text-base">
                    No Product Found
                  </p>
                )}
              </div>
            </div>
          )}
          {showPopup && (
            <Popup
              setShowPopup={setShowPopup}
              popupHeading={popupHeading}
              items={items}
              updateStatus={updateStatus}
              setStatus={setStatus}
            />
          )}
        </div>
      </Wrapper>
    </>
  );
};

export default Addresses;
