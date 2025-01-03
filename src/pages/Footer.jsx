import React, { useEffect, useState } from "react";
// import { footerMenu } from "../data/footer"
import { Link } from "react-router-dom";
import { Wrapper } from "../shared/Wrapper";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";
import axios from "axios";
import { apiClient } from "../utils/apiWrapper";

const Footer = () => {
  const [footerMenu, setFooterMenu] = useState([]);
  const [footerIndex, setFooterIndex] = useState(0);

  const FooterHeading = {
    "Restaurant Equipment": [
      "Cooking Equipment",
      " Commercial Ovens",
      " Food Display",
      "Commercial Tables",
      "Food Holding",
      "Food Warmer",
      "Dish Washing Equipment",
      "Food Preparation",
      "Beverage Equipment",
    ],
    Refrigeration: [
      "Cooking Equipment",
      "Commercial Ovens",
      "Food Display",
      "Commercial Tables",
      "Food Holding",
      "Food Warmer",
      "Dish Washing Equipment",
      "Food Preparation",
      "Beverage Equipment",
    ],
    Tableware: [
      "Cooking Equipment",
      " Commercial Ovens",
      " Food Display",
      "Commercial Tables",
      "Food Holding",
      "Food Warmer",
      "Dish Washing Equipment",
      "Food Preparation",
      "Beverage Equipment",
    ],
    "Kitchen & Pastry": [
      "Cooking Equipment",
      " Commercial Ovens",
      " Food Display",
      "Commercial Tables",
      "Food Holding",
      "Food Warmer",
      "Dish Washing Equipment",
      "Food Preparation",
      "Beverage Equipment",
    ],
    "Food & Beverage": [
      "Cooking Equipment",
      " Commercial Ovens",
      " Food Display",
      "Commercial Tables",
      "Food Holding",
      "Food Warmer",
      "Dish Washing Equipment",
      "Food Preparation",
      "Beverage Equipment",
    ],
    "Top Brands": [
      "Santos",
      "Simonelli",
      "Rational",
      "Robot Coupe",
      "Hamilton Beach",
      "Empero",
      "Solay",
      "Turkay",
    ],

    "Discover Horeca": [
      "Your Orders",
      "Returns & Replacement",
      "Shipping Rates & Policies",
      "Refund and Returns Policy",
      "Privacy Policy",
      "Terms & Conditions",
      "(FAQ's)",
      "Sell on Horeca",
    ],
  };

  const fetchMenu = async () => {
    try {
      const response = await apiClient.get("/menus");
      setFooterMenu(response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // setLoader(false);
    }
  };
  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div className="bg-gray-500">
      {/* News Letter  */}
      <Wrapper classes="flex flex-row items-center justify-center py-5">
        <img
          className="hidden sm:block"
          src={process.env.PUBLIC_URL + "/images/footer/newsletter.png"}
          alt="newsletter"
        />
        <div className="mx-10 hidden sm:block">
          <h4 className="text-black-100 text-[1.375rem] font-semibold">
            Learn first about discounts
          </h4>
          <p className="text-[0.937rem] text-gray-700 ">
            As well as news, special offers and promotions
          </p>
        </div>
        <form className="relative hidden sm:block w-[100%] sm:w-1/3">
          <input
            className="w-full py-[16px] pr-44 pl-5 text-[0.95rem] text-gray-800 bg-white rounded-md border border-gray-300 outline-none"
            type="email"
            placeholder="Enter your email address"
          />
          <button
            type="submit"
            className="right-2 absolute top-[8px] text-base font-semibold bg-secondary rounded-sm px-7 py-2"
          >
            Subscribe
          </button>
        </form>
        {window?.innerWidth < 640 && (
          <div className="flex flex-col w-[100%] mt-[20px]">
            <h1 className="text-[16px] leading-[18.77px] font-semibold py-[10px]">
              Subscribe Our News Letter
            </h1>
            <form className="relative w-[100%] sm:w-1/3">
              <input
                className="w-full py-[16px] pr-44 pl-5 h-[47px] text-[0.95rem] text-gray-800 bg-white rounded-md border border-gray-300 outline-none"
                type="email"
                placeholder="Enter your email address"
              />
              <button
                type="submit"
                className="flex items-center justify-center w-[90px] right-2 absolute top-[8px] h-[30px] text-base font-semibold bg-secondary rounded-sm px-7 py-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        )}
      </Wrapper>
      <hr />
      <Wrapper classes="pt-0 lg:pt-7 pb-0 lg:pb-10">
        <div className="">
          <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7">
            {Object.entries(FooterHeading).map(([category, items]) => {
              return (
                <div
                  key={category}
                  className="border-t lg:border-none mt-3 text-black-100"
                >
                  <h4 className="mt-[20px] text-[18px] leading-[21.11px] font-normal">
                    {category}
                  </h4>
                  <ul>
                    {items.map((menu, index) => {
                      return (
                        <li
                          key={index}
                          className="text-[15px] leading-[24px] font-light text-[#64748B] my-[10px]"
                        >
                          <Link to={menu}>{menu}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
          {window.innerWidth < 640 &&
            footerMenu.map((footer, index) => {
              return (
                <div key={index} className="">
                  <div
                    onClick={() => {
                      if (footerIndex !== index + 1) {
                        setFooterIndex(index + 1);
                      } else {
                        setFooterIndex(0);
                      }
                    }}
                    className="flex items-center justify-between border-t-2 py-5"
                  >
                    <h4 className="leading-[25px] text-[16px] font-semibold">
                      {footer.name}
                    </h4>
                    {footerIndex !== index + 1 ? (
                      <img
                        src={process.env.PUBLIC_URL + "/icons/arrow-down.png"}
                      />
                    ) : (
                      <img
                        src={process.env.PUBLIC_URL + "/icons/arrow-up.png"}
                      />
                    )}
                  </div>
                  {index == 3 && (
                    <>
                      <h4 className="border-t-2  leading-[25px] text-[16px] font-semibold pt-5">
                        We Used Secured Payment Gateways
                      </h4>
                      <div className="flex flex-row mb-[10px]">
                        <img
                          className="mr-3 w-14 mt-5 rounded-md"
                          src={process.env.PUBLIC_URL + "/icons/visa.jpg"}
                          alt="visa"
                        />
                        <img
                          className="mr-3 w-14 mt-5 rounded-md"
                          src={process.env.PUBLIC_URL + "/icons/mastero.jpg"}
                          alt="mastero"
                        />
                        <img
                          className="mr-3 w-14 mt-5 rounded-md"
                          src={process.env.PUBLIC_URL + "/icons/mastercard.jpg"}
                          alt="mastercard"
                        />
                      </div>
                    </>
                  )}
                  {footerIndex === index + 1 && (
                    <ul>
                      {footer.menu_nodes.map((menu, index) => {
                        return (
                          <li
                            key={index}
                            className="leading-[16.42px] text-[14px] font-normal py-[10px]"
                          >
                            <Link to={menu.url}>{menu.title}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          {/* <div className="basis-1/5 mt-7 hidden md:block">
            <h4 className=" text-[1.375rem] font-semibold">Download</h4>
            <p className="text-gray-700 text-base mt-5">
              You can download our mobile application from app stores
            </p>
            <div className=" text-gray-700 flex flex-row items-center mt-5 ">
              <img
                className="rounded-md"
                src={process.env.PUBLIC_URL + "/icons/apple.jpg"}
                alt="App Store Horeca"
              />
              <div className="ml-3">
                <span className="text-sm">Download App</span>
                <br />
                <span className="text-sm">Get -10% Discount</span>
              </div>
            </div>
            <div className=" text-gray-700 flex flex-row items-center mt-3 ">
              <img
                className="rounded-md"
                src={process.env.PUBLIC_URL + "/icons/google.jpg"}
                alt="Google Store Horeca"
              />
              <div className="ml-3">
                <span className="text-sm">Download App</span>
                <br />
                <span className="text-sm">Get -10% Discount</span>
              </div>
            </div>
            <h4 className=" text-[1.375rem] font-semibold mt-5">
              Secured Payment Gateways
            </h4>
            <div className="flex flex-row ">
              <img
                className="mr-3 w-14 mt-5 rounded-md"
                src={process.env.PUBLIC_URL + "/icons/visa.jpg"}
                alt="visa"
              />
              <img
                className="mr-3 w-14 mt-5 rounded-md"
                src={process.env.PUBLIC_URL + "/icons/mastero.jpg"}
                alt="mastero"
              />
              <img
                className="mr-3 w-14 mt-5 rounded-md"
                src={process.env.PUBLIC_URL + "/icons/mastercard.jpg"}
                alt="mastercard"
              />
            </div>
          </div> */}
        </div>
      </Wrapper>
      <hr />

      {/* Bottom Navigation  */}

      <Wrapper classes="flex flex-col items-start sm:items-center inline-block sm:flex justify-between py-8 sm:flex-row">
        <div className="text-sm text-gray-700 ">
          © 2024,{" "}
          <Link to="#" className="font-bold text-primary">
            {" "}
            Horeca Store AE{" "}
          </Link>{" "}
          All rights reserved
        </div>
        <div className="hidden lg:block">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center mx-5 hidden sm:flex m-[10px]">
              <img
                src={process.env.PUBLIC_URL + "/icons/phone.png"}
                alt="Horeca Store"
              />
              <div className="ml-3">
                <p className="text-primary text-[1.625rem] font-bold leading-6">
                  1900 - 6666
                </p>
                <span className="text-xs text-gray-700 font-semibold">
                  Working 8:00 - 22:00
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center mx-5">
              <img
                src={process.env.PUBLIC_URL + "/icons/phone.png"}
                alt="Horeca Store"
              />
              <div className="ml-3">
                <p className="text-primary text-[1.625rem] font-bold leading-6">
                  1900 - 8888
                </p>
                <span className="text-xs text-gray-700 font-semibold">
                  24/7 Support Center
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center ">
          <div className="flex flex-row items-center ">
            <h4 className="mr-5 text-black-100 text-base font-semibold">
              Follow Us
            </h4>
            <div className="flex items-center justify-between">
              <Link
                to="#"
                className="border border-gray-300 size-[35px] p-1 flex items-center justify-center ml-2 rounded-full"
              >
                <FaFacebookF color="#186737" />
              </Link>
              <Link
                to="#"
                className="border border-gray-300 size-[35px] p-1 flex items-center justify-center ml-2 rounded-full"
              >
                <FaTwitter color="#186737" />
              </Link>
              <Link
                to="#"
                className="border border-gray-300 size-[35px] p-1 flex items-center justify-center ml-2 rounded-full"
              >
                <FaInstagram color="#186737" />
              </Link>
              <Link
                to="#"
                className="border border-gray-300 size-[35px] p-1 flex items-center justify-center ml-2 rounded-full"
              >
                <FaPinterestP color="#186737" />
              </Link>
              <Link
                to="#"
                className="border border-gray-300 size-[35px] p-1 flex items-center justify-center ml-2 rounded-full"
              >
                <FaYoutube color="#186737" />
              </Link>
            </div>
          </div>
          <span className="text-sm text-black-100 mt-2">
            Up to 15% discount on your first subscribe
          </span>
        </div>
      </Wrapper>
    </div>
  );
};

export default React.memo(Footer);
