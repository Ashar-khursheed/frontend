import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notify } from "../../utils/notify.js";
import { InfinitySpin } from 'react-loader-spinner';
import { Wrapper } from "../../shared/Wrapper";
import { FaLongArrowAltRight, FaCheck } from "react-icons/fa";
import { apiClient } from "../../utils/apiWrapper.js";

export const Layout = ({ children, cartItems, cartSummaryFlag, removeItemsLoader, tempCartItems, listOfStore, confirmAndPayFn }) => {


    const authToken = localStorage.getItem('authToken');
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const [summary, setSummary] = useState({});
    const [couponCodeValue, setCouponCodeValue] = useState(JSON.parse(localStorage.getItem('couponCodeValue')));
    const [cardSummaryLoader, setCartSummaryLoader] = useState(false);
    const [totalOrderPrice, setTotalOrderPrice] = useState(0);
    const [discountPercent, setDiscountPercent] = useState(localStorage.getItem('discountPercetage') ? JSON.parse(localStorage.getItem('discountPercetage')) : 0);
    const [couponError, setCouponError] = useState("");
    const [couponCodeLoader, setCouponCodeLoader] = useState(false);
    const [tempSubTotal, setSubTotal] = useState(0);
    const [tempCurrencyTitle, setTempCurrencyTitle] = useState('USD');
    const [tempTempSaving, setTempSaving] = useState(0);
    const [tempShippingRate, setShippingRate] = useState(10);
    const [tempTax, setTempTax] = useState(0);
    const [tempDiscountPercent, setTempDiscountPercent] = useState(10);
    const [tempTotalAmount, setTempTotalAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [discountAmount,setDiscountAmount]=useState(0);
    


    const handlerApplyCoupon = async (e) => {
        e.preventDefault();
        setDiscountPercent(0);
        setCouponCodeLoader(true);
        setCouponError("");
        if (discountPercent) {
            setDiscountPercent(0);
            setCouponCodeLoader(false);
            setCouponCodeValue("");
            localStorage.removeItem('couponCodeValue');
            localStorage.removeItem('discountPercetage');
        }
        else {
            try {
                const response = await apiClient.post(`/apply-coupon`, {
                    "coupon_code": couponCodeValue,
                    "total_order_price": tempTotalAmount
                });
                setDiscountPercent(response.data.discount_amount);
                localStorage.setItem('discountPercetage', JSON.stringify(response.data.discount_amount));
                localStorage.setItem('couponCodeValue', JSON.stringify(couponCodeValue));
                notify("Coupon Code Added.", "")

            }
            catch (error) {
                setCouponError("Coupon Code is not valid.")
                console.error('Error:', error);
            }
            finally {
                setCouponCodeLoader(false)
            }
        }

    }

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible((prev) => !prev);
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let tempSubtotal = 0;
        let tempTempSaving = 0;
        let tempTax = 0;
        let tempTotalAmount = 0;
    
        const items = authToken == null ? tempCartItems : cartItems;
    
        if (items && items.length > 0) {
            items.forEach((item) => {
                const price = item.product ? (item.product.sale_price || item.product.original_price) : item.original_price;
                tempSubtotal += price * item.quantity;
                tempTempSaving += item.product ? item.product.price * item.quantity : item.front_sale_price * item.quantity;
            });
    
            tempTax = tempSubtotal * (tempDiscountPercent / 100);
            tempTotalAmount = tempSubtotal + tempTax + tempShippingRate;
    
            setSubTotal(tempSubtotal);
            setTempSaving(tempTempSaving - tempSubtotal);  // Assuming you want savings minus subtotal
            setTempTax(tempTax);
            setTempTotalAmount(tempTotalAmount);
    
            if (discountPercent) {
                setDiscountAmount(tempTotalAmount / discountPercent);
                setTotalAmount(tempTotalAmount * ((100 - discountPercent) / 100));
            } else {
                setTotalAmount(tempTotalAmount);
            }
        }
    }, [tempCartItems, cartItems, authToken, tempDiscountPercent, discountPercent, tempShippingRate]);
    

    const navigation = (data) => {
        
        navigate('/review-checkout', data);
    }
 
 
 
    return (
        <React.Fragment>
            <Wrapper>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 items-start gap-2 mb-20 w-full">
                    {/* Left panel */}
                    <div className="col-span-12 sm:col-span-12 lg:col-span-9 mb-5">
                        {children}
                    </div>

                    {/* Right panel */}
                    <div className={`col-span-12 sm:col-span-12 lg:col-span-3 border-[#E2E8F0] ${authToken ? "mt-[65px]" : "mt-[50px]"}`}>
                        {cartItems && cartItems.length ? (<SideWrapper>
                            <form onSubmit={(e) => handlerApplyCoupon(e)}>
                                <h3 className="text-[#424242] text-xl font-semibold">Coupon Code</h3>
                                <input disabled={discountPercent} type="text" value={couponCodeValue} onChange={(e) => setCouponCodeValue(e.target.value)} placeholder="Enter Your Coupon Code" className="text-[#212121] rounded-[4px] border border-[#66666666] text-sm px-4 py-3 w-full mt-2" />
                                {couponError ? <span className="mt-2 block text-red-500 text-sm">{couponError}</span> : null}
                                {!discountPercent ?
                                    <button type="submit" className={`bg-primary text-center text-white block p-3 mt-2 w-full rounded-md font-semibold `} style={{ opacity: `${couponCodeLoader ? "0.5" : "1"}` }} disabled={couponCodeLoader}>{couponCodeLoader ? "Applying Coupon" : "Apply Coupon"}</button> :
                                    <button type="submit" className="bg-primary text-center text-white block p-3 mt-2 w-full rounded-md font-semibold">Remove Coupon</button>}
                            </form>
                        </SideWrapper>) : null}
                        {(tempSubTotal && cartItems.length > 0) && authToken? (
                            <SideWrapper classes={"mt-4"}>
                                {!cardSummaryLoader ? <React.Fragment>

                                    <h3 className="text-[#424242] text-[28px] font-semibold">Cart Summary</h3>
                                    <div className="w-full h-[1px] bg-gray-300 my-3"></div>
                                    {tempSubTotal && tempSubTotal ? (
                                        <div className="flex items-center justify-between text-[#030303] text-base my-3 mt-5">
                                            <span className="">Subtotal ({cartItems.length} items)</span>
                                            <span className="">{tempCurrencyTitle} {(tempSubTotal).toFixed(2)}</span>
                                        </div>
                                    ) : null}

                                    {tempTempSaving ? (
                                        <div className="flex items-center justify-between text-primary font-bold text-base my-3">
                                            <span className="">Savings</span>
                                            <span className="">{tempCurrencyTitle} {(tempTempSaving).toFixed(2)}</span>
                                        </div>
                                    ) : null}

                                    {tempShippingRate ? (
                                        <div className="flex items-center justify-between text-[#030303] text-base my-3">
                                            <span className="">Shipping & Handling</span>
                                            <span className="">{tempCurrencyTitle} {(tempShippingRate)}</span>
                                        </div>
                                    ) : null}
                                    {tempTax ? (
                                        <div className="flex items-center justify-between text-[#030303] text-base my-3">
                                            <span className="">Taxes</span>

                                            <span className="">{tempCurrencyTitle} {(tempTax).toFixed(2)}</span>
                                        </div>
                                    ) : null}

                                    {discountPercent ? (
                                        <div className="flex items-center justify-between text-[#030303] text-base my-3">
                                            <span className="">Coupon Discount <span className="text-primary text-sm font-semibold">({discountPercent}%)</span></span>
                                            <span className="">{tempCurrencyTitle} {(tempTotalAmount / discountPercent).toFixed(2)}</span>
                                        </div>
                                    ) : null}
 
                                    <div className="w-full h-[1px] bg-gray-300 my-3"></div>

                                    {discountPercent && tempTotalAmount ? (
                                        <div className="flex items-center justify-between text-[#030303] text-xl font-semibold my-3">
                                            <span className="">Total Amount</span>
                                            <span className="">{tempCurrencyTitle}  {((tempTotalAmount) * ((100 - discountPercent) / 100)).toFixed(2)}</span>
                                        </div>
                                    ) : <div className="flex items-center justify-between text-[#030303] text-xl font-semibold my-3">
                                        <span className="">Total Amount</span>
                                        <span className="">{tempCurrencyTitle} {(tempTotalAmount).toFixed(2)} </span>
                                    </div>}

                                    {confirmAndPayFn && confirmAndPayFn ? <button onClick={confirmAndPayFn} className="text-white text-base font-semibold text-center flex items-center justify-center py-3 px-3 bg-primary w-full rounded-md mt-5">
                                        <span className="mr-2">Confirm & Pay</span> <FaLongArrowAltRight />
                                    </button> :
                                        <button onClick={() => navigation({ state: { totalAmount: totalAmount, sub_total: tempSubTotal, tax: tempTax, shippingRate: tempShippingRate, savings: tempTempSaving, currencyTitle: tempCurrencyTitle,discountAmount:discountAmount } })} className="text-white text-base font-semibold text-center flex items-center justify-center py-3 px-3 bg-primary w-full rounded-md mt-5">
                                            <span className="mr-2">Confirm & Pay</span> <FaLongArrowAltRight />
                                        </button>}



                                    <div className="text-[#64748B] text-xs flex items-center justify-center text-center flex-col mt-4">
                                        <p>By placing your order, you agree to Horeca store</p>
                                        <p><span className="font-bold">privacy notice</span> and <span className="font-bold">conditions of Use. </span></p>
                                    </div>

                                </React.Fragment> :
                                    <div className="w-full h-[350px] flex items-center justify-center ml-[-25px]">
                                        <InfinitySpin
                                            visible={true}
                                            height="120"
                                            width="120"
                                            color="#186737"
                                            ariaLabel="infinity-spin-loading"
                                        />
                                    </div>}
                            </SideWrapper>
                        ) :
                            // for temporary cart items
                            <>
                                {!!tempCartItems && tempCartItems && authToken == null ? <SideWrapper classes={"mt-4"}>
                                    <React.Fragment>

                                        <h3 className="text-[#424242] text-[28px] font-semibold">Cart Summary</h3>
                                        <div className="w-full h-[1px] bg-gray-300 my-3"></div>

                                        {tempSubTotal && tempSubTotal ? (
                                            <div className="flex items-center justify-between text-[#030303] text-base my-3 mt-5">
                                                <span className="">Subtotal ({tempCartItems.length} items)</span>
                                                <span className="">{tempCurrencyTitle} {(tempSubTotal).toFixed(2)}</span>
                                            </div>
                                        ) : null}

                                        {tempTempSaving ? (
                                            <div className="flex items-center justify-between text-primary font-bold text-base my-3">
                                                <span className="">Savings</span>
                                                <span className="">{tempCurrencyTitle} {(tempTempSaving).toFixed(2)}</span>
                                            </div>
                                        ) : null}

                                        {tempShippingRate ? (
                                            <div className="flex items-center justify-between text-[#030303] text-base my-3">
                                                <span className="">Shipping & Handling</span>
                                                <span className="">{tempCurrencyTitle} {(tempShippingRate)}</span>
                                            </div>
                                        ) : null}


                                        {tempTax ? (
                                            <div className="flex items-center justify-between text-[#030303] text-base my-3">
                                                <span className="">Taxes</span>

                                                <span className="">{tempCurrencyTitle} {(tempTax).toFixed(2)}</span>
                                            </div>
                                        ) : null}

                                        <div className="w-full h-[1px] bg-gray-300 my-3"></div>
                                        <div className="flex items-center justify-between text-[#030303] text-xl font-semibold my-3">
                                            <span className="">Total Amount</span>
                                            <span className="">{tempCurrencyTitle} {(tempTotalAmount).toFixed(2)} </span>
                                        </div>
                                        {confirmAndPayFn && confirmAndPayFn ? <button onClick={confirmAndPayFn} className="text-white text-base font-semibold text-center flex items-center justify-center py-3 px-3 bg-primary w-full rounded-md mt-5">
                                            <span className="mr-2">Confirm & Pay</span> <FaLongArrowAltRight />
                                        </button> : <button onClick={() => navigation({ state: { totalAmount: tempTotalAmount, subTotal: tempSubTotal, tax: tempTax, shippingRate: tempShippingRate, savings: tempTempSaving, currencyTitle: tempCurrencyTitle } })} className="text-white text-base font-semibold text-center flex items-center justify-center py-3 px-3 bg-primary w-full rounded-md mt-5">
                                            <span className="mr-2">Confirm & Pay</span> <FaLongArrowAltRight />
                                        </button>}



                                        <div className="text-[#64748B] text-xs flex items-center justify-center text-center flex-col mt-4">
                                            <p>By placing your order, you agree to Horeca store</p>
                                            <p><span className="font-bold">privacy notice</span> and <span className="font-bold">conditions of Use. </span></p>
                                        </div>

                                    </React.Fragment>
                                </SideWrapper> : ''}
                            </>


                        }

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
        </React.Fragment>
    )
}


const SideWrapper = ({ children, classes }) => {
    return (
        <div className={`${classes} bg-[#F6F8FA] border-[#E2E8F033] border-2 rounded-[10px] p-5`}>{children}</div>
    )
}
