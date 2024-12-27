import React from "react";

const ReturnOrderSection = () => {
  return (
    <div
      className={`grid border-2 rounded-lg grid-cols-1 md:grid-cols-1 gap-4 p-4 w-[100%]`}
    >
      <div className="bg-[#E2E8F04D]  rounded-lg">
        <div className=" border-b-2 pl-[10px]">
          <h1 className="text-[18px] m-[10px] py-[10px] font-normal leading-[21px] border-black border-bottom-2">
            Select Items
          </h1>
        </div>
        <div className="flex items-center p-[10px]">
          <div>
            <input
              className="w-[20px] h-[20px] mr-[20px] ml-[10px]"
              type="checkbox"
            />
          </div>
          <div className="w-[220px] h-[80px] sm:h-[80px] md:h-[80px] lg:h-[80px] xl:h-[144px] 2xl-[144px] rounded-md mr-[20px]">
            <img
              className="w-[220px] h-[80px] sm:h-[80px] md:h-[80px] lg:h-[80px] xl:h-[144px] 2xl-[144px] rounded-md object-cover"
              src="https://images.pexels.com/photos/1193335/pexels-photo-1193335.jpeg?auto=compress&cs=tinysrgb&w=800"
            />
          </div>
          <div>
            <p className="font-light text-[18px] leading-[25px] ">
              Roomwell Adjustable Height Prestige Anti-Theft Flame Retardant
              Metallic Cover Ironing Board, L 139 x W 40.5 cm
            </p>
            <p className="font-medium text-[18px] leading-[30px] mt-[10px]">
              Return Quantity
            </p>
          </div>
        </div>
        <div className="flex items-center p-[10px]">
          <div>
            <input
              className="w-[20px] h-[20px] mr-[20px] ml-[10px]"
              type="checkbox"
            />
          </div>
          <div className="w-[220px] h-[80px] sm:h-[80px] md:h-[80px] lg:h-[80px] xl:h-[144px] 2xl-[144px] rounded-md mr-[20px]">
            <img
              className="w-[220px] h-[80px] sm:h-[80px] md:h-[80px] lg:h-[80px] xl:h-[144px] 2xl-[144px] rounded-md object-cover"
              src="https://images.pexels.com/photos/1193335/pexels-photo-1193335.jpeg?auto=compress&cs=tinysrgb&w=800"
            />
          </div>
          <div>
            <p className="font-light text-[18px] leading-[25px] ">
              Roomwell Adjustable Height Prestige Anti-Theft Flame Retardant
              Metallic Cover Ironing Board, L 139 x W 40.5 cm
            </p>
            <p className="font-medium text-[18px] leading-[30px] mt-[10px]">
              Return Quantity
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#E2E8F04D]  rounded-lg">
        <div className=" border-b-2 ml-[10px]">
          <h1 className="text-[18px] m-[10px] py-[10px] font-normal leading-[21px] border-black border-bottom-2">
            Select Reason(s) for Refund/Return
          </h1>
        </div>
        <div className="mt-[20px] mb-[20px] pl-[10px]">
          <div className="flex ml-[10px] mt-[20px]">
            <input className="w-[18px] h-[18px]" type="checkbox" />
            <p className="text-[16px] font-normal leading-[18.77px] ml-[10px]">
              Product is not compatible with my existing items.
            </p>
          </div>
          <div className="flex ml-[10px] mt-[20px]">
            <input className="w-[18px] h-[18px]" type="checkbox" />
            <p className="text-[16px] font-normal leading-[18.77px] ml-[10px]">
              Changed my mind or product doesn't meet expectations.
            </p>
          </div>
          <div className="flex ml-[10px] mt-[20px]">
            <input className="w-[18px] h-[18px]" type="checkbox" />
            <p className="text-[16px] font-normal leading-[18.77px] ml-[10px]">
              Product received is damaged or defective.
            </p>
          </div>
          <div className="flex ml-[10px] mt-[20px]">
            <input className="w-[18px] h-[18px]" type="checkbox" />
            <p className="text-[16px] font-normal leading-[18.77px] ml-[10px]">
              Product doesn't fit as expected.
            </p>
          </div>
          <div className="flex ml-[10px] mt-[20px]">
            <input className="w-[18px] h-[18px]" type="checkbox" />
            <p className="text-[16px] font-normal leading-[18.77px] ml-[10px]">
              Product is different from the description or photos on the
              website.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#E2E8F04D]  rounded-lg">
        <div className=" border-b-2 pl-[10px]">
          <h1 className="text-[18px] m-[10px] py-[10px] font-normal leading-[21px] border-black border-bottom-2">
            Upload Photos & Comments
          </h1>
        </div>
        <div className="mt-[20px] mb-[20px] ml-[10px]">
          <div className="flex">
            <input className="" type="file" />
          </div>
          <div>
            <img />
            <input
              type="text-area"
              className="border-2 w-[98%] p-[10px] h-[150px] mt-[10px] ml-[3px] rounded-md"
              placeholder="type your message here...."
            />
          </div>
          <div className="flex items-center justify-end mr-[20px]">
            <button className="bg-[#64748B] text-[white] w-[143px] h-[40px] rounded-[4px] mt-[20px]">
              Cancel
            </button>
            <button className="bg-[#186737] ml-[10px] text-[white] w-[143px] h-[40px] rounded-[4px] mt-[20px]">
              Return Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnOrderSection;
