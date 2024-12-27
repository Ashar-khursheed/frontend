import React from "react";
import { Wrapper } from "../../shared/Wrapper";
import { Breadcrumb } from "../../shared/Breadcrumb";
import SidebarProfile from "../../components/SidebarProfile";
import PopularPosts from "../BlogsPage/components/PopularPosts";
import { BlogPostCard } from "../BlogsPage/components/BlogPostCard";
import ReturnOrderSection from "./Component/ReturnOrderSection";
import ReturnImageSlider from "./Component/ReturnImageSlider";

const ReturnOrders = () => {
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
      title: "Return/Refund",
    },
  ];
  return (
    <>
      <Wrapper>
        <Breadcrumb items={collectionBreadCrumb} classes={"mt-4 mb-2"} />
      </Wrapper>
      <h1 className="block sm:hidden text-center border-b-2 p-2">Returns</h1>
      <Wrapper>
        <div className="flex">
          <SidebarProfile />
          <div className="flex">
            {/* First Container */}
            <div className="m-[10px] mt-[0px] w-[100%] xl:w-[75%] ">
              <h1 className="text-[18px] font-normal leading-[24px]">
                Return Order
              </h1>
              <ReturnOrderSection count={2} />
            </div>
            {/* Second Container */}
            <ReturnImageSlider />
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default ReturnOrders;
