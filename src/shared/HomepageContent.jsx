import React, { useState } from "react";
import { Wrapper } from "./Wrapper";

// Reusable Paragraph Component
const Paragraph = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-8">
      <p className="text-[16px] mt-[30px] leading-[18.77px] font-normal">
        {title}
      </p>
      <p
        className={`text-[15px] leading-[25px] mt-[20px] font-light text-[#64748B] ${
          isExpanded ? "line-clamp-none" : "line-clamp-3"
        }`}
      >
        {content}
      </p>
      <button
        className="text-[#3866DF] text-[16px] leading-[25px] font-normal mt-2"
        onClick={toggleContent}
      >
        {isExpanded ? "Read Less" : "Read More"}
      </button>
    </div>
  );
};

const HomepageContent = () => {
  const contentText = `As the leading destination for online shopping in the UAE, noon has
        everything you need under one roof. Whether you’re shopping for the
        latest electronic products, fashion, homeware, products for kids and
        babies, books and stationery, sports and health essentials, beauty
        products, or groceries, we have millions of products in the noon UAE
        store. As a customer-centric online store, we make it easier to buy
        online with flexible payment plans that help you save, along with
        regular sales across our extensive product range, gift cards, wishlists,
        our exclusive Mashreq VIP card, our easy-to-use shopping app, As a customer-centric online store, we make it easier to buy
        online with flexible payment plans that help you save, along with
        regular sales across our extensive product range, gift cards, wishlists,
        our exclusive Mashreq VIP card, our easy-to-use shopping app, and so
        much more...`;

  return (
    <Wrapper>
      <Paragraph
        title="Superior online shopping in the UAE"
        content={contentText}
      />
      <Paragraph
        title="Shop the best products & brands at Horecastore UAE"
        content={contentText}
      />
      <Paragraph
        title="Hassle-free UAE online shopping"
        content={contentText}
      />
    </Wrapper>
  );
};

export default HomepageContent;
