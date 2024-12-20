import React, { useState, useEffect } from "react";
import { Wrapper } from "../shared/Wrapper";
import { FaLongArrowAltRight, FaCheck } from "react-icons/fa"
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";


  const FinalCheckout = () => {

    const [isVisible, setIsVisible] = useState(false);


    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible((prev) => !prev);  // Toggle visibility
        }, 1500);  // Every 3 seconds

        return () => clearInterval(interval);  // Cleanup on unmount
    }, []);
    return (
        <Wrapper>
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-9 mt-5">
                    <div className="border-2 rounded-[10px] border-[#E2E8F0] mt-6">
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
                </div>
                <div className="col-span-3 mt-5">
                    <SideWrapper>
                        <h3 className="text-[#424242] text-xl font-semibold">Coupon Code</h3>
                        <input type="text" placeholder="Free Standard Delivery" className="text-[#212121] rounded-[4px] border border-[#66666666] text-sm px-4 py-3 w-full mt-2" />
                    </SideWrapper>

                    <SideWrapper classes={"mt-4"}>
                        <h3 className="text-[#424242] text-[28px] font-semibold">Cart Summary</h3>
                        <div className="w-full h-[1px] bg-gray-300 my-3"></div>
                        <div className="flex items-center justify-between text-[#030303] text-base my-3 mt-5">
                            <span className="">Subtotal (3 items)</span>
                            <span className="">SAR 585.00</span>
                        </div>

                        <div className="flex items-center justify-between text-[#38AE04] font-bold text-base my-3">
                            <span className="">Savings</span>
                            <span className="">SAR 140.00</span>
                        </div>

                        <div className="flex items-center justify-between text-[#030303] text-base my-3">
                            <span className="">Shipping & Handling</span>
                            <span className="">SAR 14.00</span>
                        </div>

                        <div className="flex items-center justify-between text-[#030303] text-base my-3">
                            <span className="">Cash on Delivery Fee</span>
                            <span className="">SAR 14.00</span>
                        </div>

                        <div className="flex items-center justify-between text-[#030303] text-base my-3">
                            <span className="">Taxes</span>
                            <span className="">SAR 14.00</span>
                        </div>
                        <div className="flex items-center justify-between text-[#030303] text-base my-3">
                            <span className="">Coupon Discount (SA524)</span>
                            <span className="">SAR 185.00</span>
                        </div>
                        <div className="w-full h-[1px] bg-gray-300 my-3"></div>


                        <div className="flex items-center justify-between text-[#030303] text-xl font-semibold my-3">
                            <span className="">Total Amount</span>
                            <span className="">SAR 14.00</span>
                        </div>

                        <button className="text-white text-base font-semibold text-center flex items-center justify-center py-3 px-3 bg-primary w-full rounded-md mt-5"><span className="mr-2">Confirm & Pay</span> <span className=""><FaLongArrowAltRight /></span>
                        </button>

                        <div className="text-[#64748B] text-xs flex items-center justify-center text-center flex-col mt-4">
                            <p>By placing your order, you agree to Horeca store</p>
                            <p><span className="font-bold">privacy notice</span> and <span className="font-bold">conditions of Use. </span></p>
                        </div>
                    </SideWrapper>

                    <SideWrapper classes={"mt-4"}>
                        <div className="flex items-center ">
                            <img src={process.env.PUBLIC_URL + "/icons/certificate.png"} alt="" />
                            <span className="ml-2 text-primary text-base font-semibold">Horecastore protects your payment
                                information</span>
                        </div>

                        <div className="mt-5">
                            <div className="flex items-center mt-2">
                                <FaCheck color="black" size={20} />
                                <span className="ml-3 text-[#64748B] text-base">Every transaction is secure and encrypted</span>
                            </div>
                            <div className="flex items-center  mt-2">
                                <FaCheck color="black" size={30} />
                                <span className="ml-3 text-[#64748B] text-base">We do not store your payment cards CVV sensuring your privacy</span>
                            </div>
                            <div className="flex items-center mt-2">
                                <FaCheck color="black" size={20} />
                                <span className="ml-3 text-[#64748B] text-base">Every transaction is secure and encrypted</span>
                            </div>
                            <div className="flex items-center mt-2">
                                <FaCheck color="black" size={20} />
                                <span className="ml-3 text-[#64748B] text-base">Every transaction is secure and encrypted</span>
                            </div>
                            <div className="flex items-center mt-2">
                                <FaCheck color="black" size={20} />
                                <span className="ml-3 text-[#64748B] text-base">Every transaction is secure and encrypted</span>
                            </div>
                            <div className="flex items-center mt-2 justify-center gap-4 mt-5">
                                <img src={process.env.PUBLIC_URL + "/images/certificate/visa.png"} alt="" />
                                <img src={process.env.PUBLIC_URL + "/images/certificate/master.png"} alt="" />
                                <img src={process.env.PUBLIC_URL + "/images/certificate/pci.png"} alt="" />
                                <img src={process.env.PUBLIC_URL + "/images/certificate/ssl.png"} alt="" />
                            </div>
                        </div>
                    </SideWrapper>

                    {/* Specialist  */}
                    <SideWrapper classes={"mt-5"}>
                        <div className='flex items-center justify-between'>
                            <p
                                className={`font-bold text-[#BF2536] text-base transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'
                                    }`}
                            >Need Help Placing Order
                            </p>
                            <p className='text-[#4A4A4A] text-sm relative'> <span className='absolute  size-[8px] rounded-full bg-primary left-[-12px] top-1/2 translate-y-[-50%]'></span> Online Now</p>
                        </div>
                        <div className='rounded-[4px] bg-[#DEF9EC] flex items-center justify-between px-4 py-2 mt-4'>
                            <p className='text-[#4A4A4A] text-sm'>Our customer service will be glad to assist you</p>
                            <img className='size-[40px]' src={process.env.PUBLIC_URL + "/images/productDetails/specialist.png"} alt="" />
                        </div>

                        <div className='flex items-center justify-between mt-5'>
                            <Link className='text-[10px] text-primary font-semibold flex items-center mx-2' to="/"><img src={process.env.PUBLIC_URL + "/icons/chat.png"} className='mr-1' alt="" /> Chat Now</Link>
                            <Link className='text-[10px] text-primary font-semibold flex items-center mx-2' to="/"><img src={process.env.PUBLIC_URL + "/icons/phone-2.png"} className='mr-1' alt="" /> 800 HORECA (467322)</Link>
                            <Link className='text-[10px] text-primary font-semibold flex items-center mx-2' to="/"><img src={process.env.PUBLIC_URL + "/icons/email.png"} className='mr-1' alt="" /> Email Us</Link>
                        </div>
                    </SideWrapper>
                </div>
            </div>
        </Wrapper>
    )
}
export default React.memo(FinalCheckout);

const SideWrapper = ({ children, classes }) => {
    return (
        <div className={`${classes} bg-[#F6F8FA] border-[#E2E8F033] border-2 rounded-[10px] p-5`}>{children}</div>
    )
}
