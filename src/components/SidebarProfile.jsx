import React from "react";
import { useNavigate } from "react-router";
import { navItems } from "../data/sidebar";
const SidebarProfile = () => {
  const userData=JSON.parse(localStorage.getItem('userProfile'));
  const navigate = useNavigate();
  
  return (
    <div className="w-[320px] mb-[20px] hidden md:block mr-[30px]">
      <div className="flex items-center w-[280px] h-[170px] bg-[#def9ec] mt-[10px] rounded-md">
        <div className="flex-col m-[10px]">
          <p className="font-work-sans text-[18px] font-normal">
            Hello, {userData.name}
          </p>
          <p className="font-work-sans text-[12px] ">{userData.email}</p>
          <p className="font-work-sans text-lg font-bold mt-[5px] mb-[5px] leading-6 text-left underline-from-font decoration-none text-[#186737]">
            2000 SAR
          </p>
          <p className="font-work-sans text-[14px] font-normal leading-5 text-left decoration-skip-none">
            Congratulations! You've successfully save 200 sar
          </p>
        </div>
      </div>
      <div className="flex flex-col w-[280px] border bg-[#f9fafc] mt-[20px] rounded-md">
        {navItems.map((button, index) => {
          return (
            <div
              key={index}
              onClick={() => navigate(button.link)}
              className="flex cursor-pointer hover:bg-[#def9ec] m-[7px] rounded-md items-center p-[5px]"
            >
              <img className="h-[25px] mr-[10px]" src={button.icon} />
              <p className="font-work-sans text-base font-normal leading-6 text-left underline-from-font decoration-none">
                {button.name}
              </p>
            </div>
          );
        })}
        <div className="flex items-center justify-center border p-[5px] rounded border-black m-[15px]">
          <button>Sign Out</button>
        </div>
      </div>
    </div>
  );
};

export default SidebarProfile;
