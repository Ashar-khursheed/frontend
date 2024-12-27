import React from "react";

const ReturnImageSlider = () => {
  return (
    <>
      <div className="hidden xl:block w-[25%] rounded-md mt-[25px] h-[626px] bg-[#DEF9EC]">
        <img
          src={`${process.env.PUBLIC_URL}/images/blog/blogImg/blog-1.png`} // Replace with your actual image URL
          alt="Knife Station"
          className="w-full h-[650px] rounded-md object-cover"
        />
      </div>
    </>
  );
};

export default ReturnImageSlider;
