import React from "react";
import { useNavigate } from "react-router";

const SidebarProfile = () => {
  const userData = JSON.parse(localStorage.getItem("userProfile"));
  const navigate = useNavigate();
  const navItems = [
    {
      id: "",
      name: "Your Orders",
      link: "/registration/all-orders",
      icon: `${process.env.PUBLIC_URL}/profileIcons/Frame.png`,
    },
    {
      id: "",
      name: "Return/Refund",
      link: "/registration/Return",
      icon: `${process.env.PUBLIC_URL}/profileIcons/ReturnIcon.png`,
    },
    {
      id: "",
      name: "Browsing History",
      link: "/registration/browsing-history",
      icon: `${process.env.PUBLIC_URL}/profileIcons/Frame-1.png`,
    },
    {
      id: "",
      name: "Your Reviews",
      link: "/registration/reviews",
      icon: `${process.env.PUBLIC_URL}/profileIcons/Frame-2.png`,
    },
    {
      id: "",
      name: "Wishlist ",
      link: "/registration/wishlist",
      icon: `${process.env.PUBLIC_URL}/profileIcons/Frame-3.png`,
    },
    // {
    //   id: "",
    //   name: "Your Profiles",
    //   link: "/registration/AccountSecurity",
    //   icon: `${process.env.PUBLIC_URL}/profileIcons/Frame-4.png`,
    // },
    {
      id: "",
      name: "Coupons & Offers",
      link: "/registration/coupons-offers",
      icon: `${process.env.PUBLIC_URL}/profileIcons/Frame-5.png`,
    },
    // {
    //   id: "",
    //   name: "Payment Methods",
    //   link: "/",
    //   icon: `${process.env.PUBLIC_URL}/profileIcons/Frame-6.png`,
    // },
    {
      id: "",
      name: "Addresses",
      link: "/registration/addresses",
      icon: `${process.env.PUBLIC_URL}/profileIcons/Frame-7.png`,
    },
    // {
    //   id: "",
    //   name: "Download Our Apps",
    //   link: "/",
    //   icon: `${process.env.PUBLIC_URL}/profileIcons/Frame-8.png`,
    // },
    // {
    //   id: "",
    //   name: "Credit Balance",
    //   link: "/creditBalance",
    //   icon: `${process.env.PUBLIC_URL}/profileIcons/Frame-9.png`,
    // },
    {
      id: "",
      name: "Account Security",
      link: "/registration/AccountSecurity",
      icon: `${process.env.PUBLIC_URL}/profileIcons/Frame-10.png`,
    },
    // {
    //   id: "",
    //   name: "Permissions",
    //   link: "/",
    //   icon: `${process.env.PUBLIC_URL}/profileIcons/Frame-11.png`,
    // },
    // {
    //   id: "",
    //   name: "Notifications",
    //   link: "/",
    //   icon: `${process.env.PUBLIC_URL}/profileIcons/Frame-12.png`,
    // },
  ];
  return (
    <div className="w-[320px] mb-[20px] hidden xl:block mr-[30px]">
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
