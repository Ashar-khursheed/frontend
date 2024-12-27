import React, { useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { apiClient } from "../utils/apiWrapper";
import { useCart } from "../context/CartContext";
import { useLocalCartCount } from "../context/LocalCartCount";
import { notify } from "../utils/notify";
export const ProductCardCounter = ({
  product,
  cartSummaryFlag,
  setCartSummaryFlag,
  forMobile,
  setShowCountButton,
  count,
  setCount,
}) => {
  const [loader, setLoader] = useState(false);
  const authToken = localStorage.getItem("authToken");
  const { triggerUpdateCart } = useCart();
  const { incrementCartItems } = useLocalCartCount();
  const handlerIncrement = async () => {
    let cartItems = localStorage.getItem("CartItems");
    setLoader(true);
    if (authToken) {
      setCount((prevCount) => prevCount + 1);
      try {
        const response = await apiClient.post(`/cart`, {
          product_id: product.id,
          quantity: 1,
        });
        setLoader(false);
        notify("", "Item has been added to your cart.");
        triggerUpdateCart();
        setCartSummaryFlag(!cartSummaryFlag);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoader(false);
      }
    } else {
      setCartSummaryFlag(!cartSummaryFlag);
      setTimeout(() => {
        setLoader(false);
      }, 500);
      let cartItems = localStorage.getItem("CartItems");
      let tempObj = {
        product_id: product.id,
        quantity: count,
        name: product.product_name,
        image: product.image,
        store_id: product.store_id,
        delivery_days: product.delivery_days,
        original_price: product.original_price,
        front_sale_price: product.front_sale_price,
        currency_title: product.currency_title,
        images: product.images,
        video_path: product.video_path,
      };

      if (cartItems) {
        let itemsArray = JSON.parse(cartItems);
        let itemExists = itemsArray.findIndex(
          (item) => item.product_id === product.id
        );
        if (itemExists != -1) {
          // If the item exists, update the quantity
          itemsArray[itemExists].quantity = count;
        } else {
          itemsArray.push(tempObj);
        }
        localStorage.setItem("CartItems", JSON.stringify(itemsArray));
      } else {
        localStorage.setItem("CartItems", JSON.stringify([tempObj]));
      }
    }
  };

  const handlerDecrement = async () => {
    setLoader(true);
    if (count === 1) {
      setCount(1);
      setShowCountButton(false);
      setLoader(false);
      const response = await apiClient.put(`/cart/decrease`, {
        product_id: product.id,
        quantity: 1, // Use the updated value
      });
      setLoader(false);
      setCartSummaryFlag(!cartSummaryFlag);
      triggerUpdateCart();
      notify("", "has been removed from your cart.");
      return;
    }
    if (authToken) {
      try {
        if (count === 1) {
          setShowCountButton(false);
        }
        const updatedCount = count - 1; // Calculate the new count value
        setCount(updatedCount); // Update the state with the new value
        const response = await apiClient.put(`/cart/decrease`, {
          product_id: product.id,
          quantity: updatedCount, // Use the updated value
        });
        setLoader(false);
        setCartSummaryFlag(!cartSummaryFlag);
        triggerUpdateCart();
        notify("", "has been removed from your cart.");
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoader(false);
      }
    } else {
      setCartSummaryFlag(!cartSummaryFlag);
      setTimeout(() => {
        setLoader(false);
      }, 500);
      let cartItems = localStorage.getItem("CartItems");
      let tempObj = {
        product_id: product.id,
        quantity: count,
        productName: product.productName,
        image: product.image,
        store_id: product.store_id,
        deliveryDays: product.deliveryDays,
        originalPrice: product.originalPrice,
        frontSalePrice: product.frontSalePrice,
        currencyTitle: product.currencyTitle,
      };

      if (cartItems) {
        let itemsArray = JSON.parse(cartItems);
        let itemExists = itemsArray.findIndex(
          (item) => item.product_id === product.id
        );
        if (itemExists != -1) {
          // If the item exists, update the quantity
          itemsArray[itemExists].quantity = count;
        } else {
          itemsArray.push(tempObj);
        }
        localStorage.setItem("CartItems", JSON.stringify(itemsArray));
      } else {
        localStorage.setItem("CartItems", JSON.stringify([tempObj]));
      }
    }
  };
  return (
    <>
      {forMobile ? (
        <div
          className={`flex bg-[#186737] mt-[10px] w-[100%] text-white p-[4px] sm:p-[8px]  text-sm font-medium items-center justify-between rounded-[4px] border border-[#BCE3C9] relative z-[50] ${
            loader ? "" : "cursor-pointer "
          }`}
          style={{ opacity: `${loader ? "0.5" : "1"}` }}
        >
          <button
            onClick={() => handlerDecrement(product)}
            className={`${loader ? "" : "cursor-pointer "}`}
            disabled={loader}
          >
            <FiMinus size={16} className="text-white" />
          </button>
          <span className="text-white font-semibold text-base mx-1">
            {count > 0 ? count + " Added" : count + " add"}
          </span>
          <button
            onClick={() => handlerIncrement(product)}
            className={`${loader ? "" : "cursor-pointer "}`}
            disabled={loader}
          >
            <FiPlus size={16} className="text-white" />
          </button>
        </div>
      ) : (
        <div
          className={`inline-flex w-[100%] items-center rounded-[4px] border border-[#BCE3C9] relative z-[50] p-1 ${
            loader ? "" : "cursor-pointer "
          }`}
          style={{ opacity: `${loader ? "0.5" : "1"}` }}
        >
          <button
            onClick={() => handlerDecrement(product)}
            className={`${loader ? "" : "cursor-pointer "}`}
            disabled={loader}
          >
            <FiMinus size={16} className="text-gray-700" />
          </button>
          <span className="text-primary font-semibold text-base mx-1">
            {count}
          </span>
          <button
            onClick={() => handlerIncrement(product)}
            className={`${loader ? "" : "cursor-pointer "}`}
            disabled={loader}
          >
            <FiPlus size={16} className="text-gray-700" />
          </button>
        </div>
      )}
    </>
  );
};
