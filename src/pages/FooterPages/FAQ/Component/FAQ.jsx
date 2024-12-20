import React from "react";
import { Wrapper } from "../../../../shared/Wrapper";
import { Breadcrumb } from "../../../../shared/Breadcrumb";

const FAQ = () => {
  const collectionBreadCrumb = [
    {
      url: "/",
      title: "Home",
    },
    {
      url: "/faq",
      title: "faq",
    },
  ];
  return (
    <>
      <Wrapper>
        <Breadcrumb items={collectionBreadCrumb} classes={"mt-[10px]"} />
      </Wrapper>
      <div className="flex mt-[10px] text-[32px] font-bold text-white h-[450px] w-full bg-gray-400">
        <img
          className="absolute h-[450px] w-full object-cover opacity-[0.5]"
          src="https://images.pexels.com/photos/7689734/pexels-photo-7689734.jpeg?auto=compress&cs=tinysrgb&w=800"
        />
        <div className="relative p-20 w-[100%]">
          <p className="text-[35px] ml-[3%] sm:text-[54px] leading:[10px] sm:leading-[63.34px] w-[300px] sm:w-[478px]">
            Frquently Asked Questions
          </p>
          <p className="text-[16px] ml-[3%] text-start sm:text-start w-[100%] sm:w-[914px] font-normal leading-[22px] text-white mt-[20px]">
            At Sell at HORECA, we specialize in helping businesses sell more by
            acting fast while minimizing risk. Our solutions are tailored to the
            hospitality industry's needs, ensuring success and profitability.
          </p>
          <button className="w-[150px] ml-[3%] sm:w-[204px] h-[40px] sm:h-[60px] bg-[#186737] text-[12px] sm:text-[16px] mt-[30px] rounded font-semibold">
            Join Marketplace
          </button>
        </div>
      </div>
      <Wrapper>
        <div className="py-10 mb-[20px] text-center sm:text-start text-[#000000] mb-[50px]">
          <h1 className="text-[30px] leading-[35.19px] font-semibold">
            Find More Solutions
          </h1>
          <input
            className="border-2 rounded w-[50%] h-[50px] mt-[20px] border-[#64748B]"
            type="input"
          />
        </div>
        <div className="text-[#000000] text-center sm:text-start">
          <h1 className="text-[30px] my-[10px] leading-[35.19px] font-semibold">
            Horeca Store
          </h1>
          <div className="px-[10px]">
            <p className="text-[24px] text-[#000000] my-[10px] leading-[30px] font-normal">
              1. What are Prime Exclusive Products?
            </p>
            <p className="text-[16px]  text-center sm:text-start font-light leading-[30px] mb-[10px] w-[100%] sm:w-[70%]">
              Lorem ipsum dolor sit amet consectetur. Faucibus sed duis
              consequat dolor donec lorem. Eu sit eleifend massa urna cras sit
              quis. Purus arcu auctor a eget condimentum massa. Odio suscipit
              viverra nec nullam egestas velit non. Arcu lobortis donec tellus
              quisque. Elit odio quis purus quis nisi. Massa lacinia integer
              eget pretium at neque.
            </p>
          </div>
          <div className="px-[10px]">
            <p className="text-[24px] text-[#000000] my-[10px] leading-[30px] font-normal">
              2. What are Prime Exclusive Products?
            </p>
            <p className="text-[16px]  text-center sm:text-start font-light leading-[30px] mb-[10px] w-[100%] sm:w-[70%]">
              Lorem ipsum dolor sit amet consectetur. Faucibus sed duis
              consequat dolor donec lorem. Eu sit eleifend massa urna cras sit
              quis. Purus arcu auctor a eget condimentum massa. Odio suscipit
              viverra nec nullam egestas velit non. Arcu lobortis donec tellus
              quisque. Elit odio quis purus quis nisi. Massa lacinia integer
              eget pretium at neque.
            </p>
          </div>
          <div className="px-[10px]">
            <p className="text-[24px] text-[#000000] my-[10px] leading-[30px] font-normal">
              3. What are Prime Exclusive Products?
            </p>
            <p className="text-[16px]  text-center sm:text-start font-light leading-[30px] mb-[10px] w-[100%] sm:w-[70%]">
              Lorem ipsum dolor sit amet consectetur. Faucibus sed duis
              consequat dolor donec lorem. Eu sit eleifend massa urna cras sit
              quis. Purus arcu auctor a eget condimentum massa. Odio suscipit
              viverra nec nullam egestas velit non. Arcu lobortis donec tellus
              quisque. Elit odio quis purus quis nisi. Massa lacinia integer
              eget pretium at neque.
            </p>
          </div>
        </div>
        <div className=" text-center sm:text-start">
          <h1 className="text-[30px] leading-[35.19px] font-semibold">
            Pricing
          </h1>
          <div className="px-[10px]">
            <p className="text-[24px] text-[#000000] my-[10px] leading-[30px] font-normal">
              1. What are Prime Exclusive Products?
            </p>
            <p className="text-[16px]  text-center sm:text-start font-light leading-[30px] mb-[10px] w-[100%] sm:w-[70%]">
              Lorem ipsum dolor sit amet consectetur. Faucibus sed duis
              consequat dolor donec lorem. Eu sit eleifend massa urna cras sit
              quis. Purus arcu auctor a eget condimentum massa. Odio suscipit
              viverra nec nullam egestas velit non. Arcu lobortis donec tellus
              quisque. Elit odio quis purus quis nisi. Massa lacinia integer
              eget pretium at neque.
            </p>
          </div>
          <div className="px-[10px]">
            <p className="text-[24px] text-[#000000] my-[10px] leading-[30px] font-normal">
              2. What are Prime Exclusive Products?
            </p>
            <p className="text-[16px]  text-center sm:text-start font-light leading-[30px] mb-[10px] w-[100%] sm:w-[70%]">
              Lorem ipsum dolor sit amet consectetur. Faucibus sed duis
              consequat dolor donec lorem. Eu sit eleifend massa urna cras sit
              quis. Purus arcu auctor a eget condimentum massa. Odio suscipit
              viverra nec nullam egestas velit non. Arcu lobortis donec tellus
              quisque. Elit odio quis purus quis nisi. Massa lacinia integer
              eget pretium at neque.
            </p>
          </div>
          <div className="px-[10px]">
            <p className="text-[24px] text-[#000000] my-[10px] leading-[30px] font-normal">
              3. What are Prime Exclusive Products?
            </p>
            <p className="text-[16px]  text-center sm:text-start font-light leading-[30px] mb-[10px] w-[100%] sm:w-[70%]">
              Lorem ipsum dolor sit amet consectetur. Faucibus sed duis
              consequat dolor donec lorem. Eu sit eleifend massa urna cras sit
              quis. Purus arcu auctor a eget condimentum massa. Odio suscipit
              viverra nec nullam egestas velit non. Arcu lobortis donec tellus
              quisque. Elit odio quis purus quis nisi. Massa lacinia integer
              eget pretium at neque.
            </p>
          </div>
        </div>
        <div className="mb-[40px]  text-center sm:text-start">
          <h1 className="text-[30px] leading-[35.19px] font-semibold">
            Horeca Business
          </h1>
          <div className="px-[10px]">
            <p className="text-[24px] text-[#000000] my-[10px] leading-[30px] font-normal">
              1. What are Prime Exclusive Products?
            </p>
            <p className="text-[16px]  text-center sm:text-start font-light leading-[30px] mb-[10px] w-[100%] sm:w-[70%]">
              Lorem ipsum dolor sit amet consectetur. Faucibus sed duis
              consequat dolor donec lorem. Eu sit eleifend massa urna cras sit
              quis. Purus arcu auctor a eget condimentum massa. Odio suscipit
              viverra nec nullam egestas velit non. Arcu lobortis donec tellus
              quisque. Elit odio quis purus quis nisi. Massa lacinia integer
              eget pretium at neque.
            </p>
          </div>
          <div className="px-[10px]">
            <p className="text-[24px] text-[#000000] my-[10px] leading-[30px] font-normal">
              2. What are Prime Exclusive Products?
            </p>
            <p className="text-[16px]  text-center sm:text-start font-light leading-[30px] mb-[10px] w-[100%] sm:w-[70%]">
              Lorem ipsum dolor sit amet consectetur. Faucibus sed duis
              consequat dolor donec lorem. Eu sit eleifend massa urna cras sit
              quis. Purus arcu auctor a eget condimentum massa. Odio suscipit
              viverra nec nullam egestas velit non. Arcu lobortis donec tellus
              quisque. Elit odio quis purus quis nisi. Massa lacinia integer
              eget pretium at neque.
            </p>
          </div>
          <div className="px-[10px]  text-center sm:text-start">
            <p className="text-[24px] text-[#000000] my-[10px] leading-[30px] font-normal">
              3. What are Prime Exclusive Products?
            </p>
            <p className="text-[16px]  text-center sm:text-start font-light leading-[30px] mb-[10px] w-[100%] sm:w-[70%]">
              Lorem ipsum dolor sit amet consectetur. Faucibus sed duis
              consequat dolor donec lorem. Eu sit eleifend massa urna cras sit
              quis. Purus arcu auctor a eget condimentum massa. Odio suscipit
              viverra nec nullam egestas velit non. Arcu lobortis donec tellus
              quisque. Elit odio quis purus quis nisi. Massa lacinia integer
              eget pretium at neque.
            </p>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default FAQ;
