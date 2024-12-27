import React, { useState, useEffect } from "react";
import { Wrapper } from "../shared/Wrapper";
import { Breadcrumb } from "../shared/Breadcrumb";
import { firstBreadCrumb, shipmentOne, recomendProduct, buyProducts } from "../data/checkoutConfig";
import { CustomCheckbox } from "../shared/CustomCheckbox";
import { FiMinus, FiPlus } from "react-icons/fi"
import { FaLongArrowAltRight, FaCheck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ProductCard } from "../shared/ProductCard";
import Slider from "react-slick"
import { settings } from "../utils/slicksettings";
import { apiClient } from "../utils/apiWrapper";
import { useCart } from "../context/CartContext";
import { useLocalCartCount } from "../context/LocalCartCount";
import { toast } from "react-toastify";
import { useWishlist } from "../context/WishListContext";
import { DeleteCartButton } from "../shared/CheckoutPage/DeleteCartButton";
import { WishListButton } from "../shared/CheckoutPage/WishListButton.jsx";
import { Counter } from "../shared/CheckoutPage/Counter.jsx";
import { InfinitySpin } from 'react-loader-spinner';
import { notify } from "../utils/notify.js";


  const FirstCheckout = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('saved');
    const [loader, setLoader] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [listOfStore, setListOfStore] = useState([]);
    const navigate = useNavigate();
    const [fetchCall, setFetchCall] = useState(false);
    const [cartSummaryFlag, setCartSummaryFlag] = useState(false);
    const [summary, setSummary] = useState({});
    const [sameDeliveryTime, setSameDeliveryTime] = useState(false);
    const [couponCodeValue, setCouponCodeValue] = useState();
    const [cardSummaryLoader, setCartSummaryLoader] = useState(false);
    const [maxDeliveryDate, setMaxDeliveryDate] = useState(0)
    const [removeItemsLoader, setRemoveItemsLoader] = useState(false);
    const { triggerUpdateCart } = useCart();

    const [totalOrderPrice, setTotalOrderPrice] = useState(0);
    const [discountPercent, setDiscountPercent] = useState(0);
    const [couponError, setCouponError] = useState("");
    const [couponCodeLoader, setCouponCodeLoader] = useState(false)

    const getDeliveryDate = (days) => {
        days = Number(days)
        let temp = !isNaN(days) ? days : 5
        const futureDate = new Date(new Date().setDate(new Date().getDate() + Number(temp)));
        const day = String(futureDate.getDate()).padStart(2, '0');
        const month = String(futureDate.getMonth() + 1).padStart(2, '0');
        const year = futureDate.getFullYear();
        return `${day}/${month}/${year}`
    };



    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible((prev) => !prev);  // Toggle visibility
        }, 1500);  // Every 3 seconds

        return () => clearInterval(interval);  // Cleanup on unmount
    }, []);


    const fetchingCart = async () => {
        setLoader(true)
        try {
            const response = await apiClient.get('/cart');
            setCartItems(response.data.data)
            let temp = [];
            response.data.data.map((prod) => {
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
    }, [fetchCall])



    const handlerCartSummary = async () => {

        setCartSummaryLoader(true)
        try {
            const response = await apiClient.get(`/cart-summary`);
            setSummary(response.data)
            setTotalOrderPrice(response.data.total_with_tax)
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setCartSummaryLoader(false)
        }
    }


    useEffect(() => {
        handlerCartSummary();
    }, [cartSummaryFlag])


    const handlerSameDeliveryDate = (e) => {
        setSameDeliveryTime(e.target.checked)
        let maxDeliveryDates;
        if (e.target.checked) {
            cartItems.map((item) => {
                maxDeliveryDates = maxDeliveryDate > Number(item.product.delivery_days) ? maxDeliveryDate : Number(item.product.delivery_days)
            })
        }
        else {
            maxDeliveryDates = 0;
        }

        setMaxDeliveryDate(maxDeliveryDates)
    }

    const handlerApplyCoupon = async (e) => {
        e.preventDefault();
        setDiscountPercent(0);
        setCouponCodeLoader(true);
        setCouponError("");
        if (discountPercent) {
            setDiscountPercent(0);
            setCouponCodeLoader(false);
            setCouponCodeValue("");
        }
        else {
            try {
                const response = await apiClient.post(`/apply-coupon`, {
                    "coupon_code": couponCodeValue,
                    "total_order_price": totalOrderPrice
                });
                setDiscountPercent(response.data.discount_amount);
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

    const handlerRemoveAllItemsFromCart = async () => {
        setRemoveItemsLoader(true)
        try {
            const response = await apiClient.delete(`/cart`, {
            });
            notify("All Cart Items Succesfully Deleted")
            setFetchCall(!fetchCall)
            triggerUpdateCart();
            setCartSummaryFlag(!cartSummaryFlag)
            setDiscountPercent(0);
            setCouponCodeValue("");
            setCouponError("")

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setRemoveItemsLoader(false)
        }
    }



    return (
        <React.Fragment>

        </React.Fragment>
    )
}

export default React.memo(FirstCheckout);
const SideWrapper = ({ children, classes }) => {
    return (
        <div className={`${classes} bg-[#F6F8FA] border-[#E2E8F033] border-2 rounded-[10px] p-5`}>{children}</div>
    )
}




