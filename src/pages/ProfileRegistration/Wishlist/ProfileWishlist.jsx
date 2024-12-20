import React, { useEffect, useState } from "react";
import { Wrapper } from "../../../shared/Wrapper";
import SidebarProfile from "../../../components/SidebarProfile";
import WishlistBox from "./Components/WishlistBox";
import { apiClient } from "../../../utils/apiWrapper";
import Skeleton from "react-loading-skeleton";
import { Breadcrumb } from "../../../shared/Breadcrumb";
import { useNavigate } from "react-router";
import { useLocalCartCount } from "../../../context/LocalCartCount";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishListContext";
import { ToastContainer, toast } from "react-toastify";
import { ProductCard } from "../../../shared/ProductCard";
import CommonProducts from "../CommonProducts/CommonProducts";

const ProfileWishlist = () => {
  const [wishListData, setWishListData] = useState([]);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const fetchAllReviews = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
    }
    try {
      const response = await apiClient.get("/wishlist");
      setWishListData(response?.data?.wishlist);
      setLoader(false);
      console.log(response?.data?.wishlist);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      return;
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
        console.log(response);
        setLoader(false);
        fetchAllReviews();
      } catch (error) {
        console.error("Error:", error);
      } finally {
        return;
      }
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
        setLoader(false);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoader(false);
      }
    }
  };

  const bigScreenCss =
    "flex grid-cols-5 sm:grid md:grid lg:grid 2xl:grid gap-5 sm:gap-5 sm:grid sm:space-x-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5";
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const authToken = localStorage.getItem("authToken");
    const response = await apiClient.get(
      `${authToken ? "/products" : "/products-guest"}`
    );
    setProducts(response.data.data.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchAllReviews();
  }, []);

  const collectionBreadCrumb = [
    {
      url: "/",
      title: "Your Account",
    },
    {
      url: "/",
      title: "Profile",
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
          <SidebarProfile />
          {/* WishList Section */}
          <div className="flex flex-col p-[10px] justify-between w-[100%] h-[100%]">
            {window?.innerWidth > 640 && (
              <p className=" font-light font-sans text-[18px] font-normal leading-[24px] text-left decoration-slice">
                My Wishlist
              </p>
            )}
            {window?.innerWidth < 640 && (
              <p className=" font-light font-sans text-[18px] mt-[5px] font-normal leading-[24px] text-center decoration-slice">
                Wishlist
              </p>
            )}
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
        <CommonProducts />
      </Wrapper>
    </>
  );
};

export default ProfileWishlist;
