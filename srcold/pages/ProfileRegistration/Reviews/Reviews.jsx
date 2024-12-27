import React, { useEffect, useState,lazy } from "react";
import { Wrapper } from "../../../shared/Wrapper";
import SidebarProfile from "../../../components/SidebarProfile";
import ReviewCard from "./Components/ReviewCard";
import { apiClient } from "../../../utils/apiWrapper";
import { Breadcrumb } from "../../../shared/Breadcrumb";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router";
 
import { notify } from "../../../utils/notify";
import ReviewPopup from "../../../components/ReviewPopup";
const  ProductCard =lazy(()=>import("../../../shared/ProductCard"));
const Reviews = () => {
  const [loader, setLoader] = useState(true);
  const [showPopup,setShowPopup]=useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [products, setProducts] = useState([]);
  const [reviewId,setReviewId]=useState(0);
  const [productId,setProductId]=useState(0);
  const [updateReviews,setUpdateReviews]=useState(false);
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
 
  const fetchAllReviews = async () => {
    if (!authToken) {
      navigate("/login");
    }
    try {
      const response = await apiClient.get("/customer-reviews");
      setReviewData(response?.data);
      setLoader(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoader(false);
    }
  };

  const fetchProducts = async () => {

    const response = await apiClient.get(
      `${authToken ? "/products" : "/products-guest"}`
    );
    setProducts(response.data.data.data);
  };

  const deleteReview=async(id)=>{
    try{
      const response = await apiClient.delete(`customer-reviews-delete/${id}`);
        notify("Success", response.data.message);
        setUpdateReviews(!updateReviews);
    }
      catch(error){
        console.log(error);
      }
    }

    const updateReview=(id,pid)=>{
      setReviewId(id);
      setProductId(pid);
      setShowPopup(true);
    }
  
  
  useEffect(() => {
    fetchProducts();
    fetchAllReviews();
  }, []);

  useEffect(()=>{
    fetchAllReviews();
  },[updateReviews]);

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
      
      title: "Your Reviews",
    },
  ];
  const bigScreenCss =
    "flex grid-cols-5 sm:grid md:grid lg:grid 2xl:grid gap-5 sm:gap-5 sm:grid sm:space-x-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5";

  return (
    <>
      <Wrapper>
        <Breadcrumb items={collectionBreadCrumb} classes={"mt-4 mb-2"} />
      </Wrapper>
      <h1 className="block sm:hidden text-center border-b-2 p-2">My Reviews</h1>
      <Wrapper>
        <div className="flex">
          <SidebarProfile />
          {/* Reviews Section */}
          <div className="flex flex-col p-[10px] justify-between w-[100%] h-[100%]">
            <h1 className="hidden sm:block">My Reviews</h1>
            <div>
              {/*  */}
              {loader ? (
                Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className="col-span-1">
                    <Skeleton count={1} height="250px" />
                  </div>
                ))
              ) : (
                <React.Fragment>
                  {reviewData.length > 0 ? (
                    reviewData?.map((items) => {
                      return <ReviewCard reviewData={items}  deleteReview={deleteReview} updateReview={updateReview}/>;
                    })
                  ) : (
                    <div className="flex items-center h-[60vh] text-[26px] justify-center">
                      <p>No Reviews Found</p>
                    </div>
                  )}
                </React.Fragment>
              )}
              {/*  */}
            </div>
          </div>
        </div>
        {window?.innerWidth < 640 && (
          <div>
            <div className="mb-10 mt-[20px] p-[10px]">
              <img
                className="h-[160px] w-[100vw] rounded-md"
                src={process.env.PUBLIC_URL + "/images/RegistrationProfile.png"}
              />
              <div className="flex items-center justify-between mx-2 my-[10px] sm:my-8">
                <h2 className=" font-medium sm:font-semibold text-[16px] sm:text-2xl text-black-100 ">
                  Products you may also like
                </h2>
              </div>
              <div
                style={
                  window.innerWidth < 640
                    ? {
                      overflow: "auto",
                      scrollbarWidth: "none", // For Firefox
                      msOverflowStyle: "none", // For Internet Explorer and Edge
                    }
                    : {}
                }
                className={bigScreenCss}
              >
                {false ? (
                  Array.from({ length: 10 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="col-span-1 mt-1 min-h-[400px]"
                    />
                  ))
                ) : (
                  <React.Fragment>
                    {products && products.length > 0 ? (
                      products.map((product, index) =>
                        index < 10 ? (
                          <ProductCard
                            key={index}
                            classes="col-span-1 mt-1"
                            product={product}
                          />
                        ) : null
                      )
                    ) : (
                      <p className="col-span-5 font-semibold text-center text-base">
                        No Product Found
                      </p>
                    )}
                  </React.Fragment>
                )}
              </div>
            </div>
            <div className="mb-10">
              <div className="flex items-center justify-between mx-2 my-[10px] sm:my-8">
                <h2 className=" font-medium sm:font-semibold text-[16px] sm:text-2xl text-black-100 ">
                  Inspired by your browsing history
                </h2>
              </div>
              <div
                style={
                  window.innerWidth < 640
                    ? {
                      overflow: "auto",
                      scrollbarWidth: "none", // For Firefox
                      msOverflowStyle: "none", // For Internet Explorer and Edge
                    }
                    : {}
                }
                className={bigScreenCss}
              >
                {false ? (
                  Array.from({ length: 10 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="col-span-1 mt-1 min-h-[400px]"
                    />
                  ))
                ) : (
                  <React.Fragment>
                    {products && products.length > 0 ? (
                      products.map((product, index) =>
                        index < 10 ? (
                          <ProductCard
                            key={index}
                            classes="col-span-1 mt-1"
                            product={product}
                          />
                        ) : null
                      )
                    ) : (
                      <p className="col-span-5 font-semibold text-center text-base">
                        No Product Found
                      </p>
                    )}
                  </React.Fragment>
                )}
              </div>
            </div>
      
          </div>
        )}
               {showPopup? <ReviewPopup setShowPopup={setShowPopup} popupHeading="Update Review" reviewId={reviewId}  setUpdateReviews={setUpdateReviews} updateReviews={updateReviews} id={productId}/>:''}
      </Wrapper>
    </>
  );
};

export default Reviews;
