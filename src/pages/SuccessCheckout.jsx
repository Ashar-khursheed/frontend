import React from "react";
import { Wrapper } from "../shared/Wrapper";
import { HiOutlineMail } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";


  const SuccessCheckout = () =>{
    return(
        <Wrapper>
            <div className="p-5 bg-[#E2E8F066] rounded-[10px] my-5">
                <div className="bg-white rounded-[10px] ">
                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-9 p-5">
                            <span className="flex items-center justify-start"><span className="bg-primary size-8 rounded-full flex items-center justify-center"><img src={process.env.PUBLIC_URL + "/icons/checkround.png"} alt="" /></span><span className="text-primary text-lg font-semibold ml-2">Congratulations, Successfully Order Placed</span></span>
                            <p className="text-[#64748B] text-base font-semibold mt-4">Confirmation will be sent to your email at <span className="text-primary">nomanpeera@gmail.com</span> </p>
                            <div className="mt-0 flex items-center justify-between">
                                <p className="text-[15px] text-[#64748B] font-semibold">Our Representative will call you at <span className="text-[#030303] font-bold">055 4744551.</span> Kindly ensure the number is correct to delivery delays or add an</p>
                               <span className="text-base text-[#64748B]bg-[#E2E8F0] border rounded-[4px] px-9 py-3 flex items-center justify-center">
                                <span className="bg-primary size-5 rounded-full flex items-center justify-center mr-2">
                                    <img src={process.env.PUBLIC_URL + "/icons/checkround.png"}  alt="" />
                                    </span>
                                    <span>
                                    055 4744551
                                    </span>
                                </span>
                            </div>

                            <div className="mt-5">
                                <p className="text-[#030303] font-bold text-lg ">Being Delivered To Rapid Warehouse</p>
                                <p className="font-semibold text-[#030303] text-base">Showroom 01 - Building No 9-1 19 Street - Al Quoz - Al Quoz, Al Quoz, Dubai, Abu Hail, United Arab Emirates</p>
                            </div>

                            <div className="w-full h-[1px] bg-[#E2E8F0] my-5"></div>


                            <div className="flex items-center">
                                    <div className="flex items-start flex-col justify-center mr-6 text-sm">
                                        <span className="text-[#030303] font-bold">Sunday, Oct. 6 </span>
                                        <span className="text-[#64748B] font-semibold">Estimated delivery</span>
                                    </div>
                                    <div className="flex items-center">
                                        <img className="mx-2" src={process.env.PUBLIC_URL + "/images/checkout/thumbnail.png"} alt="" />
                                        <img className="mx-2" src={process.env.PUBLIC_URL + "/images/checkout/thumbnail.png"} alt="" />
                                        <img className="mx-2" src={process.env.PUBLIC_URL + "/images/checkout/thumbnail.png"} alt="" />
                                        <img className="mx-2" src={process.env.PUBLIC_URL + "/images/checkout/thumbnail.png"} alt="" />
                                    </div>
                            </div>

                            <div className="w-full h-[1px] bg-[#E2E8F0] my-5"></div>

                            <div className="flex items-center">
                                    <div className="flex items-start flex-col justify-center mr-6 text-sm">
                                        <span className="text-[#030303] font-bold">Sunday, Oct. 6 </span>
                                        <span className="text-[#64748B] font-semibold">Estimated delivery</span>
                                    </div>
                                    <div className="flex items-center">
                                        <img className="mx-2" src={process.env.PUBLIC_URL + "/images/checkout/thumbnail.png"} alt="" />
                                    </div>
                            </div>


                            <div className="w-full h-[1px] bg-[#E2E8F0] my-5"></div>

                            <div className="flex items-center">
                                <span className=" font-semibold text-base text-[#262626] mr-5">Share this Details</span>
                                <span className="border-2 border-[#E2E8F0] rounded-full p-3 mx-1"><FaWhatsapp size={24}/></span>
                                <span className="border-2 border-[#E2E8F0] rounded-full p-3 mx-1"><HiOutlineMail size={24}/></span>
                            </div>

                            <div className="w-full h-[1px] bg-[#E2E8F0] my-5"></div>

                            <div>
                                <p className="text-base font-semibold text-[#262626]">Want to receive notification on WhatsApp?</p>
                                <p className="text-[#64748B] font-semibold text-sm mt-2">Get notified on WhatsApp when we need more details to deliver your package. If you agree to receive WhatsApp notifications, you agree with the <span className="font-bold">Terms & Condition</span></p>

                                <button className="text-white rounded-[4px] bg-[#64748B] text-base py-3 px-4 mt-5">Get WhatApp Notification</button>
                            </div>
                        </div>
                        <div className="col-span-3 p-5">
                            <img src={process.env.PUBLIC_URL + "/images/checkout/congratesbanner.png"} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default React.memo(SuccessCheckout);