import React, { useEffect, useState } from "react";
import { useWishlist } from "../context/WishListContext";
import { toast } from "react-toastify";
import { useLocalCartCount } from "../context/LocalCartCount";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router";
import { apiClient } from "../utils/apiWrapper";
import { Wrapper } from "../shared/Wrapper";
import { Breadcrumb } from "../shared/Breadcrumb";
import SidebarProfile from "../components/SidebarProfile";
import Skeleton from "react-loading-skeleton";
import WishlistBox from "./ProfileRegistration/Wishlist/Components/WishlistBox";

const Wishlist = () => {
  const [wishListData, setWishListData] = useState([]);
  const notify = (text) => {
    toast.dismiss();
    toast(
      <span className="line-clamp-2">{`${text} has been added to your cart`}</span>
    );
  };
  const { incrementCartItems, incrementWishListItems } = useLocalCartCount();
  const { totalWishListCount, triggerUpdateWishList } = useWishlist();
  const { triggerUpdateCart } = useCart();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const fetchAllReviews = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setWishListData(JSON.parse(localStorage.getItem("wishListItems")));
      setLoader(false);
    } else {
      try {
        const response = await apiClient.get("/wishlist");
        setWishListData(response?.data?.wishlist);
        setLoader(false);
 
      } catch (error) {
        console.error("Error:", error);
      } finally {
        return;
      }
    }
  };

  const handlerRemoveWishlist = async (product) => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      try {
        setLoader(true);
        const response = await apiClient.delete(`/wishlist/remove`, {
          params: { product_id: product.id },
        });
        setLoader(false);
        fetchAllReviews();
      } catch (error) {
        console.error("Error:", error);
      } finally {
        return;
      }
    } else {
      const wishListItems =
        JSON.parse(localStorage.getItem("wishListItems")) || []; // Ensure it's an array, even if null
      const updateWishList = wishListItems.filter(
        (item) => item.id !== product.id
      );
      // Update the localStorage
      localStorage.setItem("wishListItems", JSON.stringify(updateWishList));
      // Update the state
      setWishListData(updateWishList); // Directly use the updated list
      incrementWishListItems(-1);
      triggerUpdateWishList();
    }
  };

  const handleAddToCart = async (product) => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      try {
        setLoader(true);
        const response = await apiClient.post(`/cart`, {
          product_id: product.id,
          quantity: 1,
        });
        handlerRemoveWishlist(product);
        setLoader(false);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoader(false);
      }
    } else {
      let cartItems = localStorage.getItem("CartItems");
      let tempObj = {
        product_id: product.id,
        quantity: 1,
        name: product.name,
        image: product.image,
        store_id: product.store_id,
        delivery_days: product.delivery_days,
        original_price: product.original_price,
        front_sale_price: product.front_sale_price,
        currency_title: product.currency_title,
        maximum_order_quantity: product.maximum_order_quantity,
        minimum_order_quantity: product.minimum_order_quantity,
        images: product.images,
        video_path: product.video_path,
      };
      if (cartItems) {
        let itemsArray = JSON.parse(cartItems);
        let itemExists = itemsArray.findIndex((item) => item.id === product.id);

        itemsArray.push(tempObj);

        localStorage.setItem("CartItems", JSON.stringify(itemsArray));
      } else {
        localStorage.setItem("CartItems", JSON.stringify([tempObj]));
      }
      incrementCartItems(1);
      triggerUpdateCart();
      notify(product.name);
      handlerRemoveWishlist(product);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const collectionBreadCrumb = [
    {
      url: "/",
      title: "Order",
    },
    {
      title: "Wishlist",
    },
  ];

  return (
    <>
      <Wrapper>
        <Breadcrumb items={collectionBreadCrumb} classes={"mt-4 mb-2"} />
      </Wrapper>
      <Wrapper>
        <div className="flex">
          {/* <SidebarProfile /> */}
          {/* WishList Section */}
          <div className="flex flex-col p-[10px] justify-between w-[100%] h-[100%]">
            <p className=" font-light font-sans text-[18px] font-normal leading-[24px] text-left decoration-slice">
              My Wishlist
            </p>
            <div>
              {loader ? (
                Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className="col-span-1">
                    <Skeleton count={1} height="250px" />
                  </div>
                ))
              ) : (
                <React.Fragment>
                  {wishListData && wishListData.length > 0 ? (
                    <>
                      {" "}
                      {wishListData?.map((item) => {
                        return (
                          <WishlistBox
                            handlerRemoveWishlist={handlerRemoveWishlist}
                            data={item.product ? item.product : item}
                            handleAddToCart={handleAddToCart}
                          />
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <div class="container mx-auto">
                        <div class="grid grid-cols-1 md:grid-cols-6">
                          <h1>Not found any products</h1>
                        </div>
                      </div>
                    </>
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Wishlist;
