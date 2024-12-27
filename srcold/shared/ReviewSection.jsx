import React, { useEffect, useState } from "react";
import { SimpleDropDown } from "../shared/SimpleDropDown";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { FaRegThumbsUp } from "react-icons/fa6";
import axios from "axios";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { apiClient } from "../utils/apiWrapper";
import { Link, Navigate } from "react-router-dom";
import ReviewPopup from "../components/ReviewPopup";
export const ReviewSection = ({ id }) => {
  const [reviewsLoader, setReviewsLoader] = useState(false);
  const [reviewsData, setReviewsData] = useState([]);
  const [reviewsSort, setReviewsSort] = useState("lowest");
  const [AllStar, setAllStar] = useState("All Star");
  const [starValue, setStarValue] = useState();
  const [TopReviews, setTopReviews] = useState("Top Reviews");
  const [topReviewsValue, setTopReviewsValue] = useState("");
  const [token, setToken] = useState("");
  const [showPopup,setShowPopup]=useState(false);
  const [updateReviews,setUpdateReviews]=useState(false);

  const convertTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const fetchProductReviews = async () => {
    setReviewsLoader(true);
    try {
      const response = await apiClient.get("/reviews", {
        params: {
          product_id: id,
          ...(starValue && { star: starValue }),
          ...(topReviewsValue && { sort: topReviewsValue }),
        },
      });

      setReviewsData(response.data.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setReviewsLoader(false);
    }
  };
  const productReview=async()=>{
        if(token){
          setShowPopup(true);

        }else{
          Navigate('/login')
        }
  }

  useEffect(() => {
    let authToken = localStorage.getItem("authToken");
    setToken(authToken);
  }, []);

  useEffect(() => {
    setReviewsLoader(true);
    fetchProductReviews();
  }, [AllStar, TopReviews,updateReviews]);

  
  return (
    <React.Fragment>
      {reviewsData ? (
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <h2 className="text-[#262626] font-semibold text-lg">
              Product Ratings & Reviews
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 lg:col-span-4">
            <div className="p-5 mt-4 border border-[#E2E8F0] rounded-[4px]">
              <h3 className="font-semibold text-base text-black-100 ">
                Leave a review of this product
              
              </h3>
              <p className="text-[#64748B] text-sm mt-3 min-h-[100px]">
                Share your thoughts by posting a detailed review, and in return,
                receive valuable promotional credit as a token of appreciation
                for your feedback.
              </p>
              {!token ? (
                <Link
                  to="/login"
                  className="block mx-auto text-center bg-primary text-white text-base font-semibold rounded-sm p-2 w-full mt-3 py-3"
                >
                  Login OR Register
                </Link>
              ) :   <button    className="block mx-auto text-center bg-primary text-white text-base font-semibold rounded-sm p-2 w-full mt-3 py-3" onClick={productReview}>Add  Review</button>}
            </div>
            <div className="p-5 mt-4 border border-[#E2E8F0] rounded-[4px]">
              <h3 className="text-[#262626] font-semibold text-lg">
                Overall Rating
              </h3>
              <h2 className="text-[#404553] text-3xl font-extrabold">
                {reviewsData.average_rating ? reviewsData.average_rating : ""}
              </h2>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    color={
                      index + 1 < reviewsData.average_rating
                        ? "#ffd700"
                        : "#d7d7d7"
                    }
                    size="24px"
                    className="mr-1"
                  />
                ))}
              </div>

              <p className="text-[#7E859B] text-xs mt-2">
                {" "}
                Based on{" "}
                {reviewsData.reviews && reviewsData.reviews.total
                  ? reviewsData.reviews.total
                  : ""}{" "}
                ratings
              </p>

              <div className="flex items-center mt-2">
                <span className="text-xs font-semibold">5</span>
                <Star color="#737373" size="16px" className="mx-1" />
                <ProgressBar
                  color="#38AE04"
                  width={
                    reviewsData.star_counts &&
                    reviewsData.reviews &&
                    reviewsData.total_reviews
                      ? (reviewsData.star_counts["5_star"] /
                          reviewsData.total_reviews) *
                        100
                      : ""
                  }
                />
                <span className="ml-2 text-xs font-semibold">
                  {reviewsData.star_counts
                    ? (() => {
                        const percentage =
                          (reviewsData.star_counts["5_star"] /
                            reviewsData.total_reviews) *
                          100;
                        if (isNaN(percentage) || percentage === Infinity) {
                          return "0%";
                        }
                        return `${percentage.toFixed(0)}%`;
                      })()
                    : ""}
                </span>{" "}
              </div>

              <div className="flex items-center mt-2">
                <span className="text-xs font-semibold">4</span>
                <Star color="#737373" size="16px" className="mx-1" />
                <ProgressBar
                  color="#82AE04"
                  width={
                    reviewsData.star_counts &&
                    reviewsData.reviews &&
                    reviewsData.total_reviews
                      ? (reviewsData.star_counts["4_star"] /
                          reviewsData.total_reviews) *
                        100
                      : ""
                  }
                />
                <span className="ml-2 text-xs font-semibold">
                  {reviewsData.star_counts
                    ? (() => {
                        const percentage =
                          (reviewsData.star_counts["4_star"] /
                            reviewsData.total_reviews) *
                          100;
                        if (isNaN(percentage) || percentage === Infinity) {
                          return "0%";
                        }
                        return `${percentage.toFixed(0)}%`;
                      })()
                    : ""}
                </span>{" "}
              </div>

              <div className="flex items-center mt-2">
                <span className="text-xs font-semibold">3</span>
                <Star color="#737373" size="16px" className="mx-1" />
                <ProgressBar
                  color="#F3AC30"
                  width={
                    reviewsData.star_counts &&
                    reviewsData.reviews &&
                    reviewsData.total_reviews
                      ? (reviewsData.star_counts["3_star"] /
                          reviewsData.total_reviews) *
                        100
                      : ""
                  }
                />
                <span className="ml-2 text-xs font-semibold">
                  {reviewsData.star_counts
                    ? (() => {
                        const percentage =
                          (reviewsData.star_counts["3_star"] /
                            reviewsData.total_reviews) *
                          100;
                        if (isNaN(percentage) || percentage === Infinity) {
                          return "0%";
                        }
                        return `${percentage.toFixed(0)}%`;
                      })()
                    : ""}
                </span>{" "}
              </div>

              <div className="flex items-center mt-2">
                <span className="text-xs font-semibold">2</span>
                <Star color="#737373" size="16px" className="mx-1" />
                <ProgressBar
                  color="#F36C32"
                  width={
                    reviewsData.star_counts &&
                    reviewsData.reviews &&
                    reviewsData.total_reviews
                      ? (reviewsData.star_counts["2_star"] /
                          reviewsData.total_reviews) *
                        100
                      : ""
                  }
                />
                <span className="ml-2 text-xs font-semibold">
                  {reviewsData.star_counts
                    ? (() => {
                        const percentage =
                          (reviewsData.star_counts["2_star"] /
                            reviewsData.total_reviews) *
                          100;
                        if (isNaN(percentage) || percentage === Infinity) {
                          return "0%";
                        }
                        return `${percentage.toFixed(0)}%`;
                      })()
                    : ""}
                </span>{" "}
              </div>

              <div className="flex items-center mt-2">
                <span className="text-xs font-semibold">1</span>
                <Star color="#737373" size="16px" className="mx-1" />
                <ProgressBar
                  color="#F36C32"
                  width={
                    reviewsData.star_counts &&
                    reviewsData.reviews &&
                    reviewsData.total_reviews
                      ? (reviewsData.star_counts["1_star"] /
                          reviewsData.total_reviews) *
                        100
                      : ""
                  }
                />
                <span className="ml-2 text-xs font-semibold">
                  {reviewsData.star_counts
                    ? (() => {
                        const percentage =
                          (reviewsData.star_counts["1_star"] /
                            reviewsData.total_reviews) *
                          100;
                        if (isNaN(percentage) || percentage === Infinity) {
                          return "0%";
                        }
                        return `${percentage.toFixed(0)}%`;
                      })()
                    : ""}
                </span>{" "}
              </div>

              <div className="">
                <p className="text-[#404553] font-semibold text-base mt-8 flex items-center">
                  <img
                    className="mr-2"
                    src={process.env.PUBLIC_URL + "/icons/profile.png"}
                    alt=""
                  />
                  How do I review this product?
                </p>
                <p className="text-[#404553] text-sm mt-2">
                  If you recently purchased this product from horecastore, you
                  can go to your Orders page and click on the Submit Review
                  button
                </p>
              </div>
              <div className="">
                <p className="text-[#404553] font-semibold text-base mt-8 flex items-center">
                  <img
                    className="mr-2"
                    src={process.env.PUBLIC_URL + "/icons/profile.png"}
                    alt=""
                  />
                  How do I review this product?
                </p>
                <p className="text-[#404553] text-sm mt-2">
                  If you recently purchased this product from horecastore, you
                  can go to your Orders page and click on the Submit Review
                  button
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-8 p-5 mt-4 border border-[#E2E8F0] rounded-[4px]">
            <div className="flex items-center justify-center sm:justify-between flex-wrap">
              <p className="text-black-100 font-semibold text-base mr-4">
                {reviewsData.reviews ? reviewsData.total_reviews : ""} Reviews
              </p>
              <div className="flex items-center space-x-4 flex-wrap">
                {/* All Star Dropdown */}
                <Menu
                  menuButton={
                    <MenuButton className="border border-[#E2E8F0] px-6 py-2 text-[#030303] font-semibold min-w-[150px] sm:min-w-[170px]">
                      {AllStar}
                    </MenuButton>
                  }
                  transition
                >
                  <MenuItem
                    onClick={() => {
                      setAllStar("All Star");
                      setStarValue("");
                    }}
                    className="min-w-[150px] sm:min-w-[170px]"
                  >
                    All Star
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAllStar("Five Star");
                      setStarValue(5);
                    }}
                  >
                    Five Star
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAllStar("Four Star");
                      setStarValue(4);
                    }}
                  >
                    Four Star
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAllStar("Three Star");
                      setStarValue(3);
                    }}
                  >
                    Three Star
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAllStar("Two Star");
                      setStarValue(2);
                    }}
                  >
                    Two Star
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAllStar("One Star");
                      setStarValue(1);
                    }}
                  >
                    One Star
                  </MenuItem>
                </Menu>

                {/* Top Reviews Dropdown */}
                <Menu
                  menuButton={
                    <MenuButton className="border border-[#E2E8F0] px-6 py-2 text-[#030303] font-semibold min-w-[150px] sm:min-w-[200px]">
                      {TopReviews}
                    </MenuButton>
                  }
                  transition
                >
                  <MenuItem
                    className={"min-w-[150px] sm:min-w-[200px]"}
                    onClick={() => {
                      setTopReviews("Top Reviews");
                      setTopReviewsValue("");
                    }}
                  >
                    Top Reviews
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setTopReviews("Highest");
                      setTopReviewsValue("highest");
                    }}
                  >
                    Highest
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setTopReviews("Lowest");
                      setTopReviewsValue("lowest");
                    }}
                  >
                    Lowest{" "}
                  </MenuItem>
                </Menu>
              </div>
            </div>

            <div className="w-full bg-[#E2E8F0] h-[1px] my-5"></div>
            <div className="overflow-auto max-h-[500px] mt-10">
              <React.Fragment>
                {reviewsData.reviews && reviewsData.reviews.data.length ? (
                  reviewsData.reviews.data.map((review, index) => {
                    let length = reviewsData.reviews.data.length;
                    return (
                      <React.Fragment key={index}>
                        <div className="flex items-center">
                          <img
                            className="mr-3"
                            src={process.env.PUBLIC_URL + "/icons/F-Review.png"}
                            alt={"Customer Review"}
                          />
                          <div className="flex justify-center flex-col">
                            <p className="text-black-100 font-bold text-base flex items-center ">
                              {review.customer_name}
                              <span className="ml-3 border-l-2 border-l-[#d3d3d3] text-primary text-sm font-normal flex items-center">
                                <IoCheckmarkCircleSharp
                                  color="#186737"
                                  className="mx-2"
                                  size={16}
                                />
                                Verified Purchase
                              </span>
                            </p>
                            <p className="text-gray-700 text-sm">
                              {" "}
                              {review.updated_at
                                ? convertTimestamp(review.updated_at)
                                : ""}{" "}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center my-2">
                          {Array.from({ length: review.star }, (_, index) => (
                            <Star
                              key={index}
                              color="#666"
                              size="14px"
                              className="mr-1 my-2"
                            />
                          ))}
                        </div>
                        <div className="mt-2 flex items-center ">
                          {review.images ? (
                            <img
                              className="mr-2 w-[60px]"
                              src={
                                "https://testhssite.com/storage/" +
                                review.images[1]
                              }
                              alt=""
                            />
                          ) : null}
                        </div>
                        <p className="mt-3 text-gray-700 text-sm">
                          {review.comment}
                        </p>
                        {length - 1 !== index ? (
                          <div className="w-full bg-[#E2E8F0] h-[1px] my-5"></div>
                        ) : null}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <p className="font-semibold text-lg text-center">
                    No Review Found
                  </p>
                )}
              </React.Fragment>
            </div>
          </div>
          {showPopup? <ReviewPopup setShowPopup={setShowPopup} popupHeading="Add Review" setUpdateReviews={setUpdateReviews} updateReviews={updateReviews} id={id}/>:''}
         
        </div>
      ) : null}
    </React.Fragment>
  );
};

const Star = ({ color, size, className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      color={color}
      fill={color}
    >
      <path
        d="M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ProgressBar = ({ width, color }) => {
  return (
    <div className={`w-full bg-[#f3f3f3] rounded-full h-1.5 `}>
      <div
        className={`h-1.5 rounded-full`}
        style={{ width: `${width ? width : "0"}%`, backgroundColor: color }}
      ></div>
    </div>
  );
};
