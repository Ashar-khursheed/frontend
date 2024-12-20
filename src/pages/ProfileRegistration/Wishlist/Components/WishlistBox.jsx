import React from "react";

const WishlistBox = ({ data, handlerRemoveWishlist, handleAddToCart }) => {
 
  return (
    <>
      <div className="flex overflow-hidden flex-col lg:flex-row items-start lg:items-between rounded-md border-2 w-[100%] mt-[20px]">
        <div className="flex mb-[-20px] items-center jusfify-center">
          <img
            className="p-[15px] h-[100px]  w-[100px] lg:h-[260px] lg:w-[260px] md:h-[100px] md:w-[100px]"
            src={"https://testhssite.com/storage/" + data.image}
          />
          <div className="lg:hidden xl:hidden">
            <p className="font-sans p-[5px] text-[14px] font-normal leading-[24px] text-left decoration-slice">
              {data?.name}
            </p>
            </div>
        </div>
        <div className="flex-col p-[15px] w-[100%] lg:w-[70%]">
           <div className="hidden  md:hidden lg:block">
            <p className="font-sans p-[5px] text-[18px] font-normal leading-[24px] text-left decoration-slice">
              {data?.name}
            </p>
            </div>
          <p
            className="font-sans text-[12px] lg:text-[16px] text-[#64748b] px-[5px] lg:p-[5px] font-light leading-[24px] text-left decoration-slice line-clamp-4 overflow-hidden hover:line-clamp-none hover:overflow-visible transition-all duration-300 cursor-pointer"
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></p>
          <div className="flex flex-row lg:flex-col justify-between">
            <p className="font-sans text-[20px] p-[5px] text-[#186737] font-semibold leading-[24px] text-left decoration-slice">
              {data.currency_title ? data.currency_title : "USD"}{" "}
              {data.original_price.toFixed(2)}
            </p>
            <p className="font-sans text-[16px] p-[5px] text-[#030303] font-light leading-[24px] text-left underline-offset-auto decoration-slice">
              Delivery Days : {data.delivery_days}
            </p>
          </div>
        </div>
        <div className="flex items-center w-[100%] h-[100%] lg:h-[230px] mt-[-20px] lg:mt-[0] lg:w-[20%] justify-between lg:justify-center flex-row lg:flex-col md:flex-row p-[15px]">
  <button
    onClick={() => handleAddToCart(data)}
    className="flex mb-0 lg:mb-[5px] bg-[#DEF9EC] items-center justify-center rounded-md font-sans w-[175px] lg:w-[180px] h-[40px] text-[#186737] text-[16px] font-medium leading-[16px] text-left underline-offset-auto decoration-slice"
  >
    Add To Cart
  </button>
  <button
    onClick={() => handlerRemoveWishlist(data)}
    className="flex mt-0 lg:mt-[5px] items-center justify-center rounded-md font-sans w-[175px] lg:w-[180px] h-[40px] border border-[#666666] text-[16px] text-[#666666] font-medium leading-[16px] text-left underline-offset-auto decoration-slice"
  >
    Remove
  </button>
</div>

      </div>
    </>
  );
};

export default WishlistBox;
