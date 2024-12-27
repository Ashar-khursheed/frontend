import React, { useState, useEffect } from "react";
import { Layout } from "./Layout";
import { Link,useLocation } from "react-router-dom";
import { Wrapper } from "../../shared/Wrapper";
import { FaLongArrowAltRight, FaCheck } from "react-icons/fa"
import { FaArrowRightLong } from "react-icons/fa6";

export const ReviewCheckout = () => {
    const location = useLocation();
    
    const [isVisible, setIsVisible] = useState(false);
    const { currencyTitle, savings, shippingRate,tax,totalAmount,tempCartItems} = location.state || {};
    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible((prev) => !prev);
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <React.Fragment>
            <Layout >
                <div className="border-2 rounded-[10px] border-[#E2E8F0] mt-[80px]">
                    <div className="flex items-center justify-between bg-[#E2E8F0] px-8 py-3">
                        <h2 className="text-[#424242] text-[28px] font-semibold">Your Address</h2>
                        <span className="text-primary text-lg font-semibold">Edit</span>
                    </div>

                    <div className="px-8 pb-8">
                        <div className="flex items-center justify-between py-4 border-b-[2px] border-b-[#E2E8F0]">
                            <h3 className="text-[#212121] text-lg font-semibold">Shipping Address</h3>
                            <p className="text-[#64748B] text-sm font-semibold">Shipping to more than one address?</p>
                        </div>

                        <div className="flex items-center justify-start py-4 border border-primary rounded-[4px] bg-[#DEF9EC] px-4">
                            <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4" />
                            <span className="ml-3 text-[#212121] text-sm"><span className="font-semibold">Mr. Noman Peer</span> Showroom 01 - Building No 9-1 19 Street - Al Quoz - Al Quoz Industrial Area 3 - Dubai - United Arab Emirates <span className="underline text-primary text-base">Edit</span></span>
                        </div>
                        <span className="mt-3 block text-[#64748B] text-base">+ Add a new Address</span>

                    </div>
                </div>


                <div className="border-2 rounded-[10px] border-[#E2E8F0] mt-6">
                    <div className="flex items-center justify-between bg-[#E2E8F0] px-8 py-3">
                        <h2 className="text-[#424242] text-[28px] font-semibold">Review products and shipping</h2>
                        <span className="text-primary text-lg font-semibold">04 items</span>
                    </div>

                    <div className="px-8  ">
                        <div className="bg-[#E2E8F04D] rounded-[10px] px-4 pt-2 pb-4 mt-5">
                            <div className="flex items-center justify-between  my-2">
                                <span className="text-[#424242] text-lg font-semibold">Shipment 1</span>
                                <span className="text-primary text-lg font-semibold">Edit</span>
                            </div>

                            <div className="h-[1px] w-full bg-[#E2E8F0]"></div>

                            <div className="mt-2">
                                <p className="text-[#B12704] text-lg font-semibold">Arriving 6 Oct 2024</p>
                                <div className="flex mt-3">
                                    <img src={process.env.PUBLIC_URL + "/images/checkout/product-2.png"} alt="" />
                                    <div className=" ml-4">
                                        <p className="text-[#030303] text-lg max-w-[500px] ">Roomwell Adjustable Height Prestige Anti-Theft Flame Retardant Metallic Cover Ironing Board, L 139 x W 40.5 cm</p>
                                        <h2 className="font-semibold text-xl text-[#030303] my-3">Quantity : 04</h2>
                                        <p className="text-[#030303] font-bold"><span className="text-base font-semibold">SAR</span> 50,000<span className="text-xl font-semibold">.00</span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-[2px] bg-[#E2E8F0] my-4"></div>
                            <div className="mt-2">
                                <div className="flex mt-3">
                                    <img src={process.env.PUBLIC_URL + "/images/checkout/product-2.png"} alt="" />
                                    <div className=" ml-4">
                                        <p className="text-[#030303] text-lg max-w-[500px] ">Roomwell Adjustable Height Prestige Anti-Theft Flame Retardant Metallic Cover Ironing Board, L 139 x W 40.5 cm</p>
                                        <h2 className="font-semibold text-xl text-[#030303] my-3">Quantity : 04</h2>
                                        <p className="text-[#030303] font-bold"><span className="text-base font-semibold">SAR</span> 50,000<span className="text-xl font-semibold">.00</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="px-8  ">
                        <div className="bg-[#E2E8F04D] rounded-[10px] px-4 pt-2 pb-4 mt-5">
                            <div className="flex items-center justify-between  my-2">
                                <span className="text-[#424242] text-lg font-semibold">Shipment 2</span>
                                <span className="text-primary text-lg font-semibold">Edit</span>
                            </div>

                            <div className="h-[1px] w-full bg-[#E2E8F0]"></div>

                            <div className="mt-2">
                                <p className="text-[#B12704] text-lg font-semibold">Arriving 6 Oct 2024</p>
                                <div className="flex mt-3">
                                    <img src={process.env.PUBLIC_URL + "/images/checkout/product-2.png"} alt="" />
                                    <div className=" ml-4">
                                        <p className="text-[#030303] text-lg max-w-[500px] ">Roomwell Adjustable Height Prestige Anti-Theft Flame Retardant Metallic Cover Ironing Board, L 139 x W 40.5 cm</p>
                                        <h2 className="font-semibold text-xl text-[#030303] my-3">Quantity : 04</h2>
                                        <p className="text-[#030303] font-bold"><span className="text-base font-semibold">SAR</span> 50,000<span className="text-xl font-semibold">.00</span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-[2px] bg-[#E2E8F0] my-4"></div>
                            <div className="mt-2">
                                <div className="flex mt-3">
                                    <img src={process.env.PUBLIC_URL + "/images/checkout/product-2.png"} alt="" />
                                    <div className=" ml-4">
                                        <p className="text-[#030303] text-lg max-w-[500px] ">Roomwell Adjustable Height Prestige Anti-Theft Flame Retardant Metallic Cover Ironing Board, L 139 x W 40.5 cm</p>
                                        <h2 className="font-semibold text-xl text-[#030303] my-3">Quantity : 04</h2>
                                        <p className="text-[#030303] font-bold"><span className="text-base font-semibold">SAR</span> 50,000<span className="text-xl font-semibold">.00</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mx-8 my-5 px-8 border-2 border-[#E2E8F0] rounded-[10px] flex items-center justify-between py-5">
                        <div className="flex justify-between flex-col">
                            <h4 className="text-[#B12704] text-xl font-bold">Order Total : SAR 467.83</h4>
                            <p className="text-[#64748B] text-xs">By placing your order, you agree to Horeca store <span className="font-semibold">Privacy Notice</span>  and <span className="font-semibold">Conditions Of Use.</span></p>
                        </div>
                        <button className="bg-primary text-white flex items-center justify-center py-2 px-3 font-semibold text-base min-w-[300px] rounded-[4px] "><span className="mr-2">Confirm & Pay</span> <FaArrowRightLong /></button>
                    </div>
                </div>
            </Layout>
        </React.Fragment>
    )
}


const SideWrapper = ({ children, classes }) => {
    return (
        <div className={`${classes} bg-[#F6F8FA] border-[#E2E8F033] border-2 rounded-[10px] p-5`}>{children}</div>
    )
}
