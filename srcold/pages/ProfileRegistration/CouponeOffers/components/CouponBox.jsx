import React from "react";

const CouponBox = ({ data }) => {
  return (
    <>
      {data?.type == "coupon" ? (
        <div>
          <div className="">
            <div className="flex border-[#186737] h-[130px] sm:h-[100%]">
              <div className="flex border-[#186737] border-t-[2px] border-b-[2px] border-l-[2px] bg-[#e6f8f8] p-4 rounded-md flex-col w-[70%]">
                <p className="font-sans text-[#186737] text-base font-medium leading-6 text-left decoration-skip-ink-none">
                  {data.value}% Discount {data?.type}
                </p>
                <p className="font-sans text-[#666666] text-xs mt-[10px] font-normal leading-6 text-left decoration-skip-ink-none">
                  Compatible with Horeca fulfilled Products | One Use Only
                </p>
                <p className="font-sans text-[#151515] text-xs mt-[0px] sm:mt-[20px] font-medium leading-6 text-left decoration-skip-ink-none">
                  Valid until:{" "}
                  {data?.end_date == null ? "Lifetime" : data?.end_date}
                </p>
              </div>
              {/* border dashed */}
              <div className="border border-dashed border-[#186737]"></div>
              {/* border dashed */}
              <div className="flex  border-[#186737] items-center justify-center border-t-[2px] border-b-[2px] border-r-[2px] bg-[#e6f8f8] p-4 rounded-md flex-col w-[30%]">
                <div className="bg-[white] rounded p-[2px]">
                  <p className="p-[4px] text-[#186737] font-sans text-sm font-medium leading-[16.42px] text-left decoration-skip-ink-none underline-offset-4">
                    0 points{" "}
                  </p>
                </div>
                <p className="font-sans text-center text-[#186737] text-sm font-medium leading-6 text-left decoration-skip-ink-none underline-offset-4">
                  Insufficient Points
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="">
          <div className="flex border-[#186737] h-[130px] sm:h-[100%]">
            <div className="flex  border-[#E4BDC6] border-t-[2px] border-b-[2px] border-l-[2px] bg-[#faf7f8] p-4  rounded-md flex-col w-[70%]">
              <p className="font-sans text-[#782B51] text-base font-medium leading-6 text-left decoration-skip-ink-none">
                {data.value}% Discount {data?.type}
              </p>
              <p className="font-sans text-[#666666] text-xs mt-[10px] font-normal leading-6 text-left decoration-skip-ink-none">
                Compatible with Horeca fulfilled Products | One Use Only
              </p>
              <p className="font-sans text-[#151515] text-xs mt-[0px] sm:mt-[20px] font-medium leading-6 text-left decoration-skip-ink-none">
                Valid until:{" "}
                {data?.end_date == null ? "Lifetime" : data?.end_date}
              </p>
            </div>
            {/* border dashed */}
            <div className="border border-dashed border-[#E4BDC6]"></div>
            {/* border dashed */}
            <div className="flex   border-[#E4BDC6] items-center justify-center border-t-[2px] border-b-[2px] border-r-[2px] bg-[#faf7f8] p-4 rounded-md flex-col w-[30%]">
              <div className="bg-[white] rounded p-[2px]">
                <p className="p-[4px] text-[#782B51] font-sans text-sm font-medium leading-[16.42px] text-left decoration-skip-ink-none underline-offset-4">
                  0 points{" "}
                </p>
              </div>
              <p className="font-sansb text-center text-[#782B51] text-sm font-medium leading-6 text-left decoration-skip-ink-none underline-offset-4">
                Insufficient Points
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CouponBox;
