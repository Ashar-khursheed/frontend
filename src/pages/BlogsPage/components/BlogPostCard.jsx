import React, { useEffect, useState } from "react";
import { Wrapper } from "../../../shared/Wrapper";
import { apiClient } from "../../../utils/apiWrapper";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

export const BlogPostCard = ({ count }) => {
  const [loader, setLoader] = useState(true);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    setLoader(true);
    try {
      const response = await apiClient.get("/posts");
      setBlogs(response.data.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);

    // Options for formatting
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options); // Format as 'DD-MMM-YYYY'

    // Replace the comma with a space and return the result
    return formattedDate.replace(",", "").replace(/\s+/g, "-").toLowerCase();
  };

  return (
    <>
      <div>
        <div className={`grid grid-cols-1 md:grid-cols-${count} gap-4`}>
          {!loader ? (
            blogs.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {index < 3 ? (
                    <div className="border-2 rounded-md p-6 border-[#EEEEEE]">
                      <React.Fragment>
                        <Link to="#">
                          <img
                            className="w-full h-[350px] col-span-1"
                            src={
                              `https://testhssite.com/storage/${item.image}`

                              // src={process.env.PUBLIC_URL + "/images/blogRestaurant.png"}
                            }
                            alt=""
                          />
                          <div className="flex justify-between items-center my-3">
                            <div className="flex justify-start items-center">
                              <img
                                src={`https://testhssite.com/storage/${item.image}`}
                                className="size-[30px] rounded-full"
                                alt="blog writer"
                              />
                              <span className="text-gray-700 text-[12px] md:text-[13] lg:text-[14px] xl:text-[14px] ml-3 whitespace-nowrap">
                                Written by -
                              </span>
                              <span className="text-[#BE2535] font-semibold ml-2 text-[12px] md:text-[13] lg:text-[14px] xl:text-[14px] ">
                                {" "}
                                {item.author.username}
                              </span>
                            </div>
                            <span className="text-gray-700 ml-2 text-[12px] md:text-[13] lg:text-[14px] xl:text-[14px] text-end ">
                              Posted {formatDateString(item.updated_at)}
                            </span>
                          </div>
                          <h3 className="text-[#262626] text-md line-clamp-1 lg:text-lg my-3">
                            {item.name}{" "}
                          </h3>
                          <p className="text-gray-700  my-5 line-clamp-4 text-sm lg:text-md xl:text-base">
                            {item.content.replace(/<\/?p>/g, "")}
                          </p>
                        </Link>

                        <hr className="h-px my-3 bg-[#EEEEEE]"></hr>
                        <div className="flex flex-row justify-between items-center">
                          <div className="flex flex-row just">
                            <span className="flex items-center cursor-pointer">
                              <img
                                src={process.env.PUBLIC_URL + "/icons/eye.png"}
                                alt=""
                              />{" "}
                              <span className="mx-3">{item.views}</span>
                            </span>
                            {/* <span className="flex items-center cursor-pointer"><img src={process.env.PUBLIC_URL + "/icons/message.png"} alt="" /><span className="mx-3">6</span></span> */}
                            {/* <span className="flex items-center cursor-pointer"><img src={process.env.PUBLIC_URL + "/icons/share/share.png"} alt="" /><span className="mx-3">1</span></span> */}
                          </div>
                          {/* <span><img className="cursor-pointer" src={process.env.PUBLIC_URL + "/icons/heart-2.png"} alt="" /></span> */}
                        </div>
                      </React.Fragment>
                    </div>
                  ) : null}
                </React.Fragment>
              );
            })
          ) : (
            <React.Fragment>
              <div>
                <Skeleton height={"300px"} />
                <Skeleton className="mt-2" count={4} height={"30px"} />
                <Skeleton className="mt-2" height={"50px"} />
              </div>
              <div>
                <Skeleton height={"300px"} />
                <Skeleton className="mt-2" count={4} height={"30px"} />
                <Skeleton className="mt-2" height={"50px"} />
              </div>
              <div>
                <Skeleton height={"300px"} />
                <Skeleton className="mt-2" count={4} height={"30px"} />
                <Skeleton className="mt-2" height={"50px"} />
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </>
  );
};
