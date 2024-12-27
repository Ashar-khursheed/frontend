import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { notify } from "../../utils/notify.js";
import { useLocalCartCount } from "../../context/LocalCartCount";
import { DeleteCartButton } from "../../shared/CheckoutPage/DeleteCartButton";
import { Counter } from "../../shared/CheckoutPage/Counter.jsx";
import { useCart } from "../../context/CartContext";
import { apiClient } from "../../utils/apiWrapper.js";
import { Layout } from "./Layout.jsx";
import { FaArrowRightLong } from "react-icons/fa6";
import Popup from "../ProfileRegistration/Addresses/Components/Popup.jsx";
import Skeleton from 'react-loading-skeleton';
import { reviewCheckout } from "../../data/checkoutConfig";
import { Breadcrumb } from "../../shared/Breadcrumb";
  const ReviewCheckout = ({ currentLocation }) => {
    const authToken = localStorage.getItem("authToken");
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));

    const { triggerUpdateCart, updateTempCart } = useCart();
    const location = useLocation();
    const navigate = useNavigate();
    const { currencyTitle, savings, shippingRate, tax, totalAmount, sub_total,discountAmount } = location.state || {};
 
 
    const [popupHeading, setPopupHeading] = useState("Add New Address");
    const [showPopup, setShowPopup] = useState(false);
    const { incrementCartItems } = useLocalCartCount();
    const [loader, setLoader] = useState(false)
    const [activeTab, setActiveTab] = useState('saved');
    const [cartItems, setCartItems] = useState([]);
    const [tempCartItems, setTempCartItems] = useState(JSON.parse(localStorage.getItem('CartItems')));
    const [saveForLaterTemp, setTempSaveForLater] = useState(JSON.parse(localStorage.getItem('SaveForLater')));
    const [listOfStore, setListOfStore] = useState([]);
    const [fetchCall, setFetchCall] = useState(false);
    const [cartSummaryFlag, setCartSummaryFlag] = useState(false);
    const [sameDeliveryTime, setSameDeliveryTime] = useState(false);
    const [maxDeliveryDate, setMaxDeliveryDate] = useState(0)
    const [removeItemsLoader, setRemoveItemsLoader] = useState(false);
    const [discountPercent, setDiscountPercent] = useState(0)
    const [couponCodeValue, setCouponCodeValue] = useState("");
    const [couponError, setCouponError] = useState("");
    const [getData, setData] = useState('');
    const [placeOrderResponse, setOrderResponse] = useState('');
    const getDeliveryDate = (days) => {

        days = isNaN(Number(days)) ? 5 : Number(days);
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + days);
        const dayOfWeek = futureDate.toLocaleString('en-US', { weekday: 'long' });
        const day = futureDate.getDate();
        const month = futureDate.toLocaleString('en-US', { month: 'long' });
        return `${dayOfWeek}, ${day} ${month}`;
    };


    const fetchingCart = async () => {
        setLoader(true)
        try {
            const response = await apiClient.get('/cart');
            setCartItems(response.data.data);
            let temp = [];
            response.data.data.forEach((prod) => {
                if (!temp.includes(prod.product.store_id)) {
                    temp.push(prod.product.store_id)
                }
            })
            setListOfStore(temp)
        } catch (error) {
            console.error('Error:', error);
        }
        finally {
            setLoader(false)
        }
    }


    useEffect(() => {
        fetchingCart();
    }, [fetchCall]);

    useEffect(() => {
        if (cartItems.length == 0) {
            let temp = [];
            if (tempCartItems && tempCartItems.length > 0) {
                tempCartItems.forEach((prod) => {
                    if (!temp.includes(prod.store_id)) {
                        temp.push(prod.store_id)
                    }
                })
                setListOfStore(temp)
            }
        }
    }, [cartItems, fetchCall]);

    useEffect(() => {
        if (sameDeliveryTime) {
            const deliveryDate = getDeliveryDate(maxDeliveryDate);
            localStorage.setItem('sameDeliveryDate', JSON.stringify({ sameDeliveryTime, deliveryDate }));
        } else {
            localStorage.removeItem('sameDeliveryDate');
        }
    }, [sameDeliveryTime]);

    useEffect(() => {
        setTempCartItems(JSON.parse(localStorage.getItem('CartItems')));
        setTempSaveForLater(JSON.parse(localStorage.getItem('SaveForLater')));
    }, [triggerUpdateCart])

    const handlePayments = async (data) => {

        const datas = {
            "amount": data.amount,
            // "currency": data.currency.toUpperCase(),
            "currency": "USD",
            "description": userProfile.name,
            "customer_name": userProfile.name,
            "customer_email": userProfile.email
        };


        try {
            setLoader(true);
            const response = await apiClient.post(`/create-payment`, datas);
            setData(response.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoader(false);
        }
    }

    const placeOrder = async (data) => {
        
        try {
            setLoader(true);
            const response = await apiClient.post(`/orders`, data);
            setOrderResponse(response.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoader(false);
        }
    }

    const confirmAndPay = () => {

        if (authToken) {
 
            const products = !!cartItems && cartItems.map((item) => ({
                quantity: item.quantity,
                id: item.product_id,
              
            }));

            const data = {
                "shipping_method": "default",
                "shipping_option": null,
                "shipping_amount": shippingRate,
                "discount_amount": discountAmount.toFixed(2),
                "discount_description": null,
                "discount_description": null,
                "coupon_code": JSON.parse(localStorage.getItem("couponCodeValue")),
                "customer_id": userProfile.id,
                "note": null,
                "sub_amount": sub_total,
                "tax_amount": tax,
                "amount": totalAmount.toFixed(2),
                "discount_type": "amount",
                "discount_custom_value": JSON.parse(localStorage.getItem("discountPercetage")),
                "shipping_type": "free-shipping",
                "payment_id": null,
                "payment_status": "pending",
                "payment_channel": "cod",
                "payment_type": "confirm",
                "completed_at": null,
                "token": authToken,
                "store_id": 1,
                "proof_file": null,
                "products": products,
            }
 
            placeOrder(data);
            handlePayments(data);
        } else {
            navigate('/login', { state: { totalAmount, currencyTitle } });
        }
    }

    const handleClick = () => {
        // Navigate to another route
        navigate('/checkout');
    };

    useEffect(() => {
        if (getData.status == "success" && getData.redirect_url) {
            window.location.href = getData.redirect_url;
        }
    }, [getData]);

    const addNewAddress = () => {
        setShowPopup(true);
    }

 
 
    return (
        <React.Fragment>

            {loader ? <div className="col-span-1 mt-3">
                <Skeleton className='w-full h-[500px]' />
            </div> :
                <Layout cartItems={cartItems} tempCartItems={tempCartItems} cartSummaryFlag={cartSummaryFlag} removeItemsLoader={removeItemsLoader} listOfStore={listOfStore} confirmAndPayFn={confirmAndPay} >
                <Breadcrumb items={reviewCheckout} classes={"mt-7"} />


                    {authToken ? <div className="border-2 rounded-[10px] border-[#E2E8F0] mt-[18px]">
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
                                <span className="ml-3 text-[#212121] text-sm"><span className="font-semibold">Mr. {userProfile.name}</span> {currentLocation.city} {currentLocation.regionName}, {currentLocation.zip}, {currentLocation.country}<span className="underline text-primary text-base" >Edit</span></span>
                            </div>
                            <span className="mt-3 block text-[#64748B] text-base cursor-pointer" onClick={addNewAddress}>+ Add a new Address</span>

                        </div>
                    </div> : ''}

                    {/* show cart item */}
                    {!!cartItems && cartItems.length > 0 ?
                        <div className="border-2 rounded-[10px] border-[#E2E8F0] mt-6">

                            <div className="flex items-center justify-between bg-[#E2E8F0] px-8 py-3">
                                <h2 className="text-[#424242] text-[28px] font-semibold">Review products and shipping</h2>
                                <span className="text-primary text-lg font-semibold">{!!cartItems && cartItems.length} items</span>
                            </div>

                            {listOfStore && listOfStore.length && cartItems.length > 0 ? listOfStore.map((store, index) => {
                                const filteredItems = cartItems && cartItems.filter(item => item.product.store_id === listOfStore[index]);
                                return (
                                    <>
                                        {filteredItems.length > 0 ?
                                            <div className="px-8" key={index}>
                                                <div className="bg-[#E2E8F04D] rounded-[10px] px-4 pt-2 pb-4 mt-5">
                                                    <div className="flex items-center justify-between  my-2">
                                                        <span className="text-[#424242] text-lg font-semibold">Shipment {index + 1}</span>
                                                        <span className="text-primary text-lg font-semibold cursor-pointer" onClick={handleClick}>Edit</span>
                                                    </div>

                                                    {cartItems && cartItems.filter(item => item.product.store_id === listOfStore[index]).map((prod, index) => {
                                                        return (
                                                            <React.Fragment>
                                                                <div className="h-[1px] w-full bg-[#E2E8F0]"></div>
                                                                <div className="mt-2" key={index}>
                                                                    <p className="text-[#B12704] text-lg font-semibold">{getDeliveryDate(prod.product.delivery_days)}</p>
                                                                    <div className="flex mt-3">
                                                                        <Link to={`/product/${prod.product_id}`}>
                                                                            <img className="max-w-[130px]" src={"https://testhssite.com/storage/" + prod.product.image} alt={prod.product.name} />
                                                                        </Link>
                                                                        <div className=" ml-4">
                                                                            <p className="text-[#030303] text-lg max-w-[500px] ">{prod.product.name}</p>
                                                                            <h2 className="font-semibold text-xl text-[#030303] my-3">Quantity : {prod.quantity}</h2>
                                                                            <p className="text-[#030303] font-bold"><span className="text-base font-semibold">{prod.product.currency_title}</span> {prod.product.sale_price ? prod.product.sale_price.toFixed(2) : prod.product.original_price.toFixed(2)}<span className="text-xl font-semibold">.00</span></p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </React.Fragment>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            : null}
                                    </>
                                )
                            }) : <div className="w-full  h-[300px] text-gray-400 flex items-center justify-center font-semibold mb-10">No Product Items Available</div>}
                        </div> :

                        //show temp cart items
                        <div className="border-2 rounded-[10px] border-[#E2E8F0] mt-5">

                            <div className="flex items-center justify-between bg-[#E2E8F0] px-8 py-3">
                                <h2 className="text-[#424242] text-[28px] font-semibold">Review products and shipping</h2>
                                <span className="text-primary text-lg font-semibold">{!!tempCartItems && tempCartItems.length} items</span>
                            </div>

                            {listOfStore && listOfStore.length && tempCartItems.length > 0 ? listOfStore.map((store, index) => {
                                const filteredItems = tempCartItems && tempCartItems.filter(item => item.store_id === listOfStore[index]);
                                return (
                                    <>
                                        {filteredItems.length > 0 ?
                                            <div className="px-8  ">
                                                <div className="bg-[#E2E8F04D] rounded-[10px] px-4 pt-2 pb-4 mt-5">
                                                    <div className="flex items-center justify-between  my-2">
                                                        <span className="text-[#424242] text-lg font-semibold">Shipment {index + 1}</span>
                                                        <span className="text-primary text-lg font-semibold cursor-pointer" onClick={handleClick}>Edit</span>
                                                    </div>
                                                    {tempCartItems && tempCartItems.filter(item => item.store_id === listOfStore[index]).map((prod, index) => {
                                                        return (
                                                            <React.Fragment>
                                                                <div className="h-[1px] w-full bg-[#E2E8F0]"></div>
                                                                <div className="mt-2" key={index}>
                                                                    <p className="text-[#B12704] text-lg font-semibold">{getDeliveryDate(prod.delivery_days)}</p>
                                                                    <div className="flex mt-3">
                                                                        <Link to={`/product/${prod.product_id}`}>
                                                                            <img className="max-w-[130px]" src={"https://testhssite.com/storage/" + prod.image} alt={prod.name} />
                                                                        </Link>
                                                                        <div className=" ml-4">
                                                                            <p className="text-[#030303] text-lg max-w-[500px] ">{prod.name}</p>
                                                                            <h2 className="font-semibold text-xl text-[#030303] my-3">Quantity : {prod.quantity}</h2>
                                                                            <p className="text-[#030303] font-bold"><span className="text-base font-semibold">{prod.currency_title}</span> {prod.original_price.toFixed(2)}<span className="text-xl font-semibold">.00</span></p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </React.Fragment>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            : null}
                                    </>
                                )
                            }) : <div className="w-full  h-[300px] text-gray-400 flex items-center justify-center font-semibold mb-10">No Product Items Available</div>}



                        </div>
                    }
                    <div className="my-5 px-8 flex items-center justify-between py-5 border-2 rounded-[10px] border-[#E2E8F0] mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5">
                        <div className="flex justify-between flex-col col-span-12 sm:col-span-2 lg:col-span-8">
                            <h4 className="text-[#B12704] text-xl font-bold">
                                Order Total : {currencyTitle && currencyTitle} {totalAmount && totalAmount.toFixed(2)}
                            </h4>
                            <p className="text-[#64748B] text-xs">
                                By placing your order, you agree to Horeca store{" "}
                                <span className="font-semibold">Privacy Notice</span> and{" "}
                                <span className="font-semibold">Conditions Of Use.</span>
                            </p>
                        </div>

                        <div className="col-span-12 sm:col-span-2 lg:col-span-4">
                            <button
                                className="bg-primary text-white flex items-center justify-center py-2 px-3 font-semibold text-base min-w-[300px] rounded-[4px]"
                                onClick={confirmAndPay}
                            >
                                <span className="mr-2">Confirm & Pay</span>
                                <FaArrowRightLong />
                            </button>
                        </div>
                    </div>

                    <div>
                        {showPopup ? <Popup setShowPopup={setShowPopup} popupHeading={popupHeading} /> : ''}
                    </div>
                </Layout>
            }
        </React.Fragment>
    )
}

export default React.memo(ReviewCheckout);