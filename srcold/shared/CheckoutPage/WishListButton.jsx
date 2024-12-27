import React, { useState } from "react";
import { useWishlist } from "../../context/WishListContext";
import { apiClient } from "../../utils/apiWrapper";
import { notify } from "../../utils/notify";
import { Link } from "react-router-dom";
export const WishListButton = ({ product,temp }) => {
  let wishListItems = localStorage.getItem("wishListItems");
  const [wishListLoader, setWishListLoader] = useState();
  const { triggerUpdateWishList } = useWishlist();

  const handlerRemoveWishlist = async (product) => {
    setWishListLoader(true);
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      try {
        const response = await apiClient.delete(`/wishlist/remove`, {
          params: { product_id: product.id },
        });
        product.in_wishlist = false;
        triggerUpdateWishList();
        notify(product.name, response.data.message);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setWishListLoader(false);
      }
    }else{
      if (wishListItems) {
        let itemsArray = JSON.parse(wishListItems);
        let itemExists = itemsArray.findIndex(item => item.product_id === product.product_id);
        if (itemExists != -1) {
            // If the item exists, delete from  wishlist
         itemsArray.splice(itemExists,1);
         localStorage.setItem("wishListItems", JSON.stringify(itemsArray));
        } 
       
    }


      product.in_wishlist = false;
      triggerUpdateWishList();
      notify(product.productName, "Product removed from wishlist");
      setWishListLoader(false);
    }
  };

  const handlerAddWishList = async (product) => {
    setWishListLoader(true);
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      try {
        const response = await apiClient.post(`/wishlist/add`, {
          product_id: product.id,
        });
        product.in_wishlist = true;
        triggerUpdateWishList();
        notify(product.name, response.data.message);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setWishListLoader(false);
      }
    }else{
      if (wishListItems) {
        let itemsArray = JSON.parse(wishListItems);
        let itemExists = itemsArray.findIndex(item => item.product_id === product.product_id);
        if (itemExists != -1) {
            // If the item exists, update the quantity
            itemsArray[itemExists].quantity = product.quantity;
        } else {
            itemsArray.push(product); 
        }
        localStorage.setItem("wishListItems", JSON.stringify(itemsArray));
    } else {
        localStorage.setItem("wishListItems", JSON.stringify([product]));
      
    }

      product.in_wishlist = true;
      triggerUpdateWishList();
      notify(product.productName, "Product added to wishlist");
      setWishListLoader(false);
    }
  };

  return (
    <React.Fragment>
 {temp==true?<>
 {/* for temporary data */}
 
 {product.in_wishlist ? (
    <button
      disabled={wishListLoader}
      className={`text-primary text-xs ${
        wishListLoader ? "" : "cursor-pointer "
      }`}
      onClick={() => handlerRemoveWishlist(product)}
    >
      {" "}
      {wishListLoader ? "Removing from Wishlist" : "Remove from Wishlist"}
    </button>
  ) : (
    <button
      disabled={wishListLoader}
      className={`text-primary text-xs ${
        wishListLoader ? "" : "cursor-pointer "
      }`}
      onClick={() => handlerAddWishList(product)}
    >
      {wishListLoader ? "Adding to Wishlist" : "Add to Wishlist"}{" "}
    </button>
  )}
 </>:
 <>
  {product.product.in_wishlist ? (
    <button
      disabled={wishListLoader}
      className={`text-primary text-xs ${
        wishListLoader ? "" : "cursor-pointer "
      }`}
      onClick={() => handlerRemoveWishlist(product.product)}
    >
      {" "}
      {wishListLoader ? "Removing from Wishlist" : "Remove from Wishlist"}
    </button>
  ) : (
    <button
      disabled={wishListLoader}
      className={`text-primary text-xs ${
        wishListLoader ? "" : "cursor-pointer "
      }`}
      onClick={() => handlerAddWishList(product.product)}
    >
      {wishListLoader ? "Adding to Wishlist" : "Add to Wishlist"}{" "}
    </button>
  )}
 </>
 }
      
    </React.Fragment>
  );
};
