import React from "react" 
 const DeiveryInfoCard=()=>{
        return (
            <>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-2 p-2">
              {/* Left column: Delivery Info */}
              <div className="flex flex-col">
                <p className="mt-1 text-[#212121] font-semibold text-[14px]">
                  Sunday, Oct. 6
                </p>
                <p className="text-[#64748B] font-semibold text-[14px]">
                  Estimated delivery
                </p>
              </div>

              {/* Right column: Product Info */}
              <div className="flex flex-col items-start space-y-4">
                <div className="flex space-x-4">
                  <div className="w-20 h-20 bg-[#D9D9D9] rounded-md"></div>
                  <div className="w-20 h-20 bg-[#D9D9D9] rounded-md"></div>
                  <div className="w-20 h-20 bg-[#D9D9D9] rounded-md"></div>
                  <div className="w-20 h-20 bg-[#D9D9D9] rounded-md"></div>

                </div>
              </div>
            </div>


            <div className="mt-5 mb-3 border-t-2 border-[#E2E8F0]" />
            </>
        );
 }
 
 export default DeiveryInfoCard;