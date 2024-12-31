import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Wrapper } from "./Wrapper";
import { apiClient } from "../utils/apiWrapper";
import Skeleton from "react-loading-skeleton";
import { formatDateString } from "../utils/formatDate";

export const BlogsCard = ({ classes }) => {
  const navigate = useNavigate();
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

  const handleNavigation = (item) => {
    const blogData = {
      image: item?.images[0],
      name: item?.author?.username,
      updatedAt: item?.updated_at,
      heading: item?.name,
      content: item?.content,
      views: item?.views,
    };
    navigate("/blog-details", { state: blogData });
  };

  return (
    <Wrapper classes="my-14 hidden sm:block">
      <div className="flex items-center justify-between">
        <h2 className="text-black-100 font-semibold text-[16px] sm:text-2xl">
          Our Latest News & Blogs
        </h2>
        <span
          onClick={() => navigate("/blog-listing")}
          className=" text-gray-700 cursor-pointer text-[12px] sm:text-lg"
        >
          View All Blogs
        </span>
      </div>
      <div className={`${classes} `}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
          {!loader ? (
            blogs.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {index < 3 ? (
                    <div
                      onClick={() => handleNavigation(item)}
                      className="border-2 rounded-md p-6 border-[#EEEEEE]"
                    >
                      <React.Fragment>
                        <Link to="#">
                          <img
                            className="w-full col-span-1 h-[320px] object-cover rounded-md"
                            src={`${item.images[0]}`}
                            alt=""
                          />
                          <div className="flex justify-between items-center my-3">
                            <div className="flex justify-start items-center">
                              <img
                                src={`${item.images[0]}`}
                                className="size-[30px] rounded-full"
                                alt="blog writer"
                              />
                              <span className="text-gray-700 text-[12px] md:text-[13] lg:text-[14px] xl:text-[14px] ml-3 whitespace-nowrap">
                                Written By -
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
                          <div
                            className="text-gray-700 text-[10px]  my-5 line-clamp-4 text-sm lg:text-md xl:text-base"
                            dangerouslySetInnerHTML={{
                              __html: item.content.replace(/<\/?p>/g, ""),
                            }}
                          ></div>
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
                            <span className="flex items-center cursor-pointer">
                              <img
                                src={
                                  process.env.PUBLIC_URL + "/icons/message.png"
                                }
                                alt=""
                              />
                              <span className="mx-3">6</span>
                            </span>
                            <span className="flex items-center cursor-pointer">
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/icons/share/share.png"
                                }
                                alt=""
                              />
                              <span className="mx-3">1</span>
                            </span>
                          </div>
                          <span>
                            <img
                              className="cursor-pointer"
                              src={
                                process.env.PUBLIC_URL + "/icons/heart-2.png"
                              }
                              alt=""
                            />
                          </span>
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
    </Wrapper>
  );
};

export default React.memo(BlogsCard);
