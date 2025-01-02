import React from "react";

const PopularPosts = () => {
  return (
    <>
      <div className="hidden lg:block w-[25%] mt-[90px]">
        <div className="border-2 my-[10px] rounded-lg p-[10px]">
          <h1 className="font-Montserrat m-[5px] text-[20px] leading-[30px] font-semibold">
            Popular Posts
          </h1>
          <div className="flex items-center  p-[10px]">
            {/* Image Section */}
            <div className="w-1/3">
              <img
                src={`${process.env.PUBLIC_URL}/images/blog/blog-1.png`} // Replace with your actual image URL
                alt="Knife Station"
                className="w-full h-auto rounded-md"
              />
            </div>
            {/* Content Section */}
            <div className="ml-[10px]">
              <h1 className="text-[14px] mb-[5px] font-semibold text-black leading-[18px]">
                Elevate Your Culinary Business With HorecaStore.Ae
              </h1>
              <p className="text-[14px] leading-[17px] font-light">
                Posted 08-August-2024
              </p>
            </div>
          </div>
          <div className="flex items-center  p-[10px]">
            {/* Image Section */}
            <div className="w-1/3">
              <img
                // src={`${process.env.PUBLIC_URL}/images/`} // Replace with your actual image URL
                alt="Knife Station"
                className="w-full h-auto rounded-md"
              />
            </div>
            {/* Content Section */}
            <div className="ml-[10px]">
              <h1 className="text-[14px] mb-[5px] font-semibold text-black leading-[18px]">
                Elevate Your Culinary Business With HorecaStore.Ae
              </h1>
              <p className="text-[14px] leading-[17px] font-light">
                Posted 08-August-2024
              </p>
            </div>
          </div>
          <div className="flex items-center  p-[10px]">
            {/* Image Section */}
            <div className="w-1/3">
              <img
                // src={process.PUBLIC_URL.env} // Replace with your actual image URL
                alt="Knife Station"
                className="w-full h-auto rounded-md"
              />
            </div>
            {/* Content Section */}
            <div className="ml-[10px]">
              <h1 className="text-[14px] mb-[5px] font-semibold text-black leading-[18px]">
                Elevate Your Culinary Business With HorecaStore.Ae
              </h1>
              <p className="text-[14px] leading-[17px] font-light">
                Posted 08-August-2024
              </p>
            </div>
          </div>
          <div className="flex items-center  p-[10px]">
            {/* Image Section */}
            <div className="w-1/3">
              <img
                // src={process.PUBLIC_URL.env} // Replace with your actual image URL
                alt="Knife Station"
                className="w-full h-auto rounded-md"
              />
            </div>
            {/* Content Section */}
            <div className="ml-[10px]">
              <h1 className="text-[14px] mb-[5px] font-semibold text-black leading-[18px]">
                Elevate Your Culinary Business With HorecaStore.Ae
              </h1>
              <p className="text-[14px] leading-[17px] font-light">
                Posted 08-August-2024
              </p>
            </div>
          </div>
          <div className="flex items-center  p-[10px]">
            {/* Image Section */}
            <div className="w-1/3">
              <img
                src={`${process.env.PUBLIC_URL}/images/blog/blogImg/blog-1.png`} // Replace with your actual image URL
                alt="Knife Station"
                className="w-full h-auto rounded-md"
              />
            </div>
            {/* Content Section */}
            <div className="ml-[10px]">
              <h1 className="text-[14px] mb-[5px] font-semibold text-black leading-[18px]">
                Elevate Your Culinary Business With HorecaStore.Ae
              </h1>
              <p className="text-[14px] leading-[17px] font-light">
                Posted 08-August-2024
              </p>
            </div>
          </div>
        </div>
        <div className="border-2 m-[10px] rounded-lg">
          <img
            className="h-[626px] object-cover rounded-lg"
            src={`${process.env.PUBLIC_URL}/images/blog/blogImg/blog-1.png`}
          />
        </div>
        <div className="border-2 m-[10px] rounded-lg p-[10px]">
          <h1 className="font-Montserrat m-[5px] text-[20px] leading-[30px] font-semibold">
            Tags
          </h1>
          <div className="flex flex-wrap items-center">
            <p className="py-[7px] m-[5px] px-[20px] text-[#666666] text-[14px] bg-[#EEEEEE] rounded-full">
              Hospitality Trends
            </p>
            <p className="py-[7px] m-[5px] px-[20px] text-[#666666] text-[14px] bg-[#EEEEEE] rounded-full">
              Chef Tools
            </p>
            <p className="py-[7px] m-[5px] px-[20px] text-[#666666] text-[14px] bg-[#EEEEEE] rounded-full">
              Hos
            </p>
            <p className="py-[7px] m-[5px] px-[20px] text-[#666666] text-[14px] bg-[#EEEEEE] rounded-full">
              Chepotle
            </p>
            <p className="py-[7px] m-[5px] px-[20px] text-[#666666] text-[14px] bg-[#EEEEEE] rounded-full">
              fyi
            </p>
            <p className="py-[7px] m-[5px] px-[20px] text-[#666666] text-[14px] bg-[#EEEEEE] rounded-full">
              Dyi
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularPosts;
