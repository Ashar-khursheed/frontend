import React from "react";
import { Wrapper } from "../../../shared/Wrapper";
import { useNavigate } from "react-router";

const ProfileDrawer = () => {
  const navigate = useNavigate();
  const navItems = [
    // {
    //   id: "",
    //   name: "Your Orders",
    //   link: "/registration/all-orders",
    //   icon: `${process.env.PUBLIC_URL}/profileIcons/Frame.png`,
    // },
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
    // {
    //   id: "",
    //   name: "Wishlist ",
    //   link: "/registration/wishlist",
    //   icon: `${process.env.PUBLIC_URL}/profileIcons/Frame-3.png`,
    // },
    // {
    //   id: "",
    //   name: "Your Profiles",
    //   link: "/registration/AccountSecurity",
    //   icon: `${process.env.PUBLIC_URL}/profileIcons/Frame-4.png`,
    // },
    // {
    //   id: "",
    //   name: "Coupons & Offers",
    //   link: "/registration/coupons-offers",
    //   icon: `${process.env.PUBLIC_URL}/profileIcons/Frame-5.png`,
    // },
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
    <>
      <div className="w-[100vw] flex justify-center h-[0vh]">
        <div
          style={{ zIndex: "999" }}
          className="absolute z-999 w-[95%] mx-[auto] rounded-md border-2 p-5 mt-[-50px] z-999 bg-[white]"
        >
          <div className="h-[170px] p-4  rounded-md bg-[#DEF9EC] ">
            <h1 className="text-[18px] font-medium leading-[24px] text-center">
              Hello, Mohd Danish
            </h1>
            <p className="text-[12px] mt-[5px] font-light leading-[24px] text-center">
              mohddanish@horecastore.com
            </p>
            <div className="flex items-center justify-between mt-[10px]">
              <div
                onClick={() => navigate("/registration/all-orders")}
                className="flex flex-col items-center justify-center"
              >
                <img
                  className="p-[10px] bg-[#186737] h-[44px] w-[44px] rounded-full"
                  src={`${process.env.PUBLIC_URL}/profileIcons/Drawer-1.png`}
                />
                <p className="text-center text-[12px] font-normal leading-[14.08px] mt-[10px]">
                  Your Orders
                </p>
              </div>
              <div
                onClick={() => navigate("/registration/coupons-offers")}
                className="flex flex-col items-center justify-center"
              >
                <img
                  className="p-[10px] bg-[#186737] h-[44px] w-[44px] rounded-full"
                  src={`${process.env.PUBLIC_URL}/profileIcons/Drawer-2.png`}
                />
                <p className="text-center text-[12px] font-normal leading-[14.08px] mt-[10px]">
                  Coupons & Offers
                </p>
              </div>
              <div
                onClick={() => navigate("/registration/wishlist")}
                className="flex flex-col items-center justify-center"
              >
                <img
                  className="p-[10px] bg-[#186737] h-[44px] w-[44px] rounded-full"
                  src={`${process.env.PUBLIC_URL}/profileIcons/Drawer-3.png`}
                />
                <p className="text-center text-[12px] font-normal leading-[14.08px] mt-[10px]">
                  Wishlist
                </p>
              </div>
            </div>
          </div>
          {navItems?.map((item) => {
            return (
              <div
                onClick={() => navigate(item.link)}
                className="flex items-center py-[15px] border-b-2"
              >
                <img className="mr-[10px]" src={item.icon} />
                <p>{item?.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProfileDrawer;
