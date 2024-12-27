import React from "react";
import { Wrapper } from "../../../shared/Wrapper";
import { Breadcrumb } from "../../../shared/Breadcrumb";
import { CiSearch } from "react-icons/ci";
const SellOnHoreca = () => {
  const collectionBreadCrumb = [
    {
      url: "/",
      title: "Home",
    },
    {
      url: "/career",
      title: "Career",
    },
  ];
  return (
    <>
      <Wrapper>
        <Breadcrumb items={collectionBreadCrumb} classes={"mt-[10px]"} />
      </Wrapper>
      <div className="flex mt-[10px] text-[32px] font-bold text-white h-[160px] sm:h-[450px] w-full bg-gray-400">
        <img
          className="absolute h-[160px] sm:h-[450px] w-full object-cover opacity-[0.5]"
          src="https://images.pexels.com/photos/7689734/pexels-photo-7689734.jpeg?auto=compress&cs=tinysrgb&w=800"
        />
        <div className="relative p-[10px] sm:p-20 w-[100%]">
          <p className="text-[20px] ml-0 sm:ml-[3%] text-center sm:text-left sm:text-[54px] leading:[10px] sm:leading-[63.34px] w-full sm:w-[50vw]">
            Our global reach is your playground.
          </p>
          <p className="hidden sm:block text-[12px] sm:text-[16px] ml-0  sm:ml-[3%] text-center sm:text-left sm:text-start w-[100%] sm:w-[914px] font-normal leading-[22px] text-white mt-[0px] sm:mt-[20px]">
            At Sell at HORECA, we specialize in helping businesses sell more by
            acting fast while minimizing risk. Our solutions are tailored to the
            hospitality industry's needs, ensuring success and profitability.
          </p>
          <p className="block sm:hidden text-[12px] sm:text-[16px] ml-0  sm:ml-[3%] text-center sm:text-left sm:text-start w-[100%] sm:w-[914px] font-normal leading-[22px] text-white mt-[0px] sm:mt-[20px]">
            At Sell at HORECA, we specialize in helping businesses sell more by
            acting fast while minimizing risk.
          </p>
          <div className="flex items-center justify-center sm:justify-start mt-[10px]">
            <button className="w-[150px] text-center ml-[3%] sm:w-[204px] h-[32px] sm:h-[40px] sm:h-[60px] bg-[#186737] text-[12px] sm:text-[16px] mt-[10px] sm:mt-[30px] rounded font-semibold">
              Join Marketplace
            </button>
          </div>
        </div>
      </div>
      <Wrapper>
        <div className="flex flex-col items-center justify-center text-center mt-[60px]">
          <h1 className="text-[18px] sm:text-[30px] font-semibold leading-[21px] sm:leading-[35px] text-center">
            Discover our programs designed to help you scale
          </h1>
          <p className="text-[12px] sm:text-[16px] font-normal mt-[5px] sm:mt-[20px] mb-[20px] leading-[18px] sm:leading-[30px] text-[#64748B] w-[100%] sm:w-[60%] text-center">
            At HorecaStore, you can sell a wide range of products tailored for
            the hospitality industry, from kitchen equipment to dining
            essentials. Explore our platform to list everything from
            high-quality Products!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-[0xp] sm:mb-[30px] p-[15px]">
          <div className=" rounded">
            <div>
              <img
                className=" object-cover w-[520px] h-[200px] sm:h-[280px] rounded-md"
                src="https://images.pexels.com/photos/29497729/pexels-photo-29497729/free-photo-of-iconic-view-of-burj-khalifa-in-dubai-skyline.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
            </div>
            <div className="py-5">
              <p className="text-[16px] sm:text-[24px] font-normal leading-[30px]">
                Advertise to millions of customers
              </p>
              <p className="text-[12px] sm:text-[16px] leading-[24px] font-light text-[#64748B] mb-[10px]">
                At HorecaStore, you can sell a wide range of products tailored
                for the hospitality industry, from kitchen equipment to dining
                essentials. Explore our platform to list everything from
                high-quality Products!
              </p>
            </div>
          </div>
          <div className=" h-[100%] rounded">
            <div>
              <img
                className=" object-cover w-[527px] h-[200px] sm:h-[280px] rounded-md"
                src="https://images.pexels.com/photos/29497729/pexels-photo-29497729/free-photo-of-iconic-view-of-burj-khalifa-in-dubai-skyline.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
            </div>
            <div className="py-5">
              <p className="text-[16px] sm:text-[24px] font-normal leading-[30px]">
                Choose our flexible fulfillment options
              </p>{" "}
              <p className="text-[12px] sm:text-[16px] leading-[24px] font-light text-[#64748B] mb-[10px]">
                At HorecaStore, you can sell a wide range of products tailored
                for the hospitality industry, from kitchen equipment to dining
                essentials. Explore our platform to list everything from
                high-quality Products!
              </p>
            </div>
          </div>
          <div className=" h-[100%] rounded">
            <div>
              <img
                className=" object-cover w-[527px] h-[200px] sm:h-[280px] rounded-md"
                src="https://images.pexels.com/photos/2730356/pexels-photo-2730356.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
            </div>
            <div className="py-5">
              <p className="text-[16px] sm:text-[24px] font-normal leading-[30px]">
                Expand to international markets with ease
              </p>
              <p className="text-[12px] sm:text-[16px] leading-[24px] font-light text-[#64748B] mb-[10px]">
                At HorecaStore, you can sell a wide range of products tailored
                for the hospitality industry, from kitchen equipment to dining
                essentials. Explore our platform to list everything from
                high-quality Products!
              </p>
            </div>
          </div>
          <div className=" h-[100%] rounded">
            <div>
              <img
                className=" object-cover w-[527px] h-[200px] sm:h-[280px] rounded-md"
                src="https://media.istockphoto.com/id/1452888631/photo/corniche-in-old-town-jeddah.jpg?b=1&s=612x612&w=0&k=20&c=E9oQfnilMZIFLMpggPWgJr4BP6D87PZk9pRr2GqvaxQ="
              />
            </div>
            <div className="py-5">
              <p className="text-[16px] sm:text-[24px] font-normal leading-[30px]">
                Take control of your growth
              </p>
              <p className="text-[12px] sm:text-[16px] leading-[24px] font-light text-[#64748B] mb-[10px]">
                At HorecaStore, you can sell a wide range of products tailored
                for the hospitality industry, from kitchen equipment to dining
                essentials. Explore our platform to list everything from
                high-quality Products!
              </p>{" "}
            </div>
          </div>
          <div className=" h-[100%] rounded">
            <div>
              <img
                className=" object-cover w-[527px] h-[200px] sm:h-[280px] rounded-md"
                src="https://media.istockphoto.com/id/482787909/photo/corniche-doha-qatar-modern-urban-skyscrapers.jpg?b=1&s=612x612&w=0&k=20&c=RrRJ9RTn6aCqwl_BvD3U9vILcIFSOgmmt1pTgaii7Io="
              />
            </div>
            <div className="py-5">
              <p className="text-[16px] sm:text-[24px] font-normal leading-[30px]">
                Advertise to millions of customers
              </p>
              <p className="text-[12px] sm:text-[16px] leading-[24px] font-light text-[#64748B] mb-[10px]">
                At HorecaStore, you can sell a wide range of products tailored
                for the hospitality industry, from kitchen equipment to dining
                essentials. Explore our platform to list everything from
                high-quality Products!
              </p>
            </div>
          </div>{" "}
          <div className=" h-[100%] rounded">
            <div>
              <img
                className=" object-cover w-[527px] h-[280px] rounded"
                src="https://images.pexels.com/photos/27858202/pexels-photo-27858202/free-photo-of-a-train-with-a-city-skyline-in-the-background.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
            </div>
            <div className="py-5">
              <p className="text-[24px] font-normal leading-[30px]">
                Advertise to millions of customers
              </p>
              <p className="text-[12px] sm:text-[16px] leading-[24px] font-light text-[#64748B] mb-[10px]">
                At HorecaStore, you can sell a wide range of products tailored
                for the hospitality industry, from kitchen equipment to dining
                essentials. Explore our platform to list everything from
                high-quality Products!
              </p>
            </div>
          </div>
        </div>
        <div className=" w-full mt-[0px] sm:mt-5">
          {" "}
          <img
            className="w-full"
            src={process.env.PUBLIC_URL + "/images/categoryBanner.png"}
            alt=""
          />{" "}
        </div>
        <div className="flex flex-col items-center justify-center mb-[40px] text-center mt-[60px]">
          <h1 className="text-[18px] sm:text-[30px] font-semibold leading-[21px] sm:leading-[35px] text-center">
            What You Can Sell On Horecastore
          </h1>
          <p className="text-[12px] sm:text-[16px] font-normal mt-[20px] leading-[18px] sm:leading-[30px] text-[#64748B] w-[100%] sm:w-[60%] text-center">
            At HorecaStore, you can sell a wide range of products tailored for
            the hospitality industry, from kitchen equipment to dining
            essentials. Explore our platform to list everything from
            high-quality Products!
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-[0px] sm:mb-[30px] p-[15px]">
          <div className=" rounded">
            <div>
              <img
                className=" object-cover w-[383px] h-[200px] sm:h-[383px] rounded"
                src="https://images.pexels.com/photos/29497729/pexels-photo-29497729/free-photo-of-iconic-view-of-burj-khalifa-in-dubai-skyline.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
            </div>
            <div className="py-5">
              <p className="text-[15px] sm:text-[24px] text-center text-[#186737] font-normal leading-[17px] sm:leading-[30px]">
                Commercial Equipment
              </p>
            </div>
          </div>
          <div className=" rounded">
            <div>
              <img
                className=" object-cover w-[383px] h-[200px] sm:h-[383px] rounded"
                src="https://images.pexels.com/photos/29497729/pexels-photo-29497729/free-photo-of-iconic-view-of-burj-khalifa-in-dubai-skyline.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
            </div>
            <div className="py-5">
              <p className="text-[15px] sm:text-[24px] text-center text-[#186737] font-normal leading-[17px] sm:leading-[30px]">
                Restaurant Supplies
              </p>
            </div>
          </div>
          <div className=" rounded">
            <div>
              <img
                className=" object-cover w-[383px] h-[200px] sm:h-[383px] rounded"
                src="https://images.pexels.com/photos/29497729/pexels-photo-29497729/free-photo-of-iconic-view-of-burj-khalifa-in-dubai-skyline.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
            </div>
            <div className="py-5">
              <p className="text-[15px] sm:text-[24px] text-center text-[#186737] font-normal leading-[17px] sm:leading-[30px]">
                Food & Beverages
              </p>
            </div>
          </div>
          <div className=" rounded">
            <div>
              <img
                className=" object-cover w-[383px] h-[200px] sm:h-[383px] rounded"
                src="https://images.pexels.com/photos/29497729/pexels-photo-29497729/free-photo-of-iconic-view-of-burj-khalifa-in-dubai-skyline.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
            </div>
            <div className="py-5">
              <p className="text-[15px] sm:text-[24px] text-center text-[#186737] font-normal leading-[17px] sm:leading-[30px]">
                Hotel Supplies
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mb-[60px]">
          <button className="bg-[#186737] font-normal w-[280px] text-white rounded-md h-[38px] sm:h-[60px] text-[16px] leading-[16px]">
            Be the next success story
          </button>
        </div>
        <div className=" w-full  mt-[0px] sm:mt-5">
          {" "}
          <img
            className="w-full"
            src={process.env.PUBLIC_URL + "/images/categoryBanner.png"}
            alt=""
          />{" "}
        </div>
        <div className="flex flex-col items-center justify-center text-center mt-[60px]">
          <h1 className="text-[18px] sm:text-[30px] font-semibold leading-[21px] sm:leading-[35px] text-center">
            Meet the success stories of our Partners
          </h1>
          <p className="text-[12px] sm:text-[16px] font-normal mt-[20px] leading-[18px] sm:leading-[30px] text-[#64748B] w-[100%] sm:w-[60%] text-center">
            At HorecaStore, you can sell a wide range of products tailored for
            the hospitality industry, from kitchen equipment to dining
            essentials. Explore our platform to list everything from
            high-quality Products!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-[0px] sm:mb-[30px] p-[15px]">
          <div className=" rounded">
            <div>
              <img
                className=" object-cover w-[383px] h-[200px] sm:h-[580px] rounded-md"
                src="https://images.pexels.com/photos/29497729/pexels-photo-29497729/free-photo-of-iconic-view-of-burj-khalifa-in-dubai-skyline.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
            </div>
            <div className="py-5">
              <p className="text-[15px] sm:text-[24px] text-center text-[#186737] font-normal leading-[17px] sm:leading-[30px]">
                Commercial Equipment
              </p>
            </div>
          </div>
          <div className=" rounded">
            <div>
              <img
                className=" object-cover w-[383px] h-[200px] sm:h-[580px] rounded-md"
                src="https://images.pexels.com/photos/29497729/pexels-photo-29497729/free-photo-of-iconic-view-of-burj-khalifa-in-dubai-skyline.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
            </div>
            <div className="py-5">
              <p className="text-[15px] sm:text-[24px] text-center text-[#186737] font-normal leading-[17px] sm:leading-[30px]">
                Restaurant Supplies
              </p>
            </div>
          </div>
          <div className=" rounded">
            <div>
              <img
                className=" object-cover w-[383px] h-[200px] sm:h-[580px] rounded-md"
                src="https://images.pexels.com/photos/29497729/pexels-photo-29497729/free-photo-of-iconic-view-of-burj-khalifa-in-dubai-skyline.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
            </div>
            <div className="py-5">
              <p className="text-[15px] sm:text-[24px] text-center text-[#186737] font-normal leading-[17px] sm:leading-[30px]">
                Food & Beverages
              </p>
            </div>
          </div>
          <div className=" rounded">
            <div>
              <img
                className=" object-cover w-[383px] h-[200px] sm:h-[580px] rounded-md"
                src="https://images.pexels.com/photos/29497729/pexels-photo-29497729/free-photo-of-iconic-view-of-burj-khalifa-in-dubai-skyline.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
            </div>
            <div className="py-5">
              <p className="text-[15px] sm:text-[24px] text-center text-[#186737] font-normal leading-[17px] sm:leading-[30px]">
                Hotel Supplies
              </p>
            </div>
          </div>
        </div>
        {/* Button */}
        <div className=" w-full mt-[0px] sm:mt-5">
          {" "}
          <img
            className="w-full"
            src={process.env.PUBLIC_URL + "/images/categoryBanner.png"}
            alt=""
          />{" "}
        </div>
        <div className="flex flex-col items-center justify-center text-center mt-[60px]">
          <h1 className="text-[18px] sm:text-[30px] font-semibold leading-[21px] sm:leading-[35px] text-center">
            Meet our on-boarded vendors
          </h1>{" "}
          <p className="text-[12px] sm:text-[16px] font-normal mt-[20px] leading-[18px] sm:leading-[30px] text-[#64748B] w-[100%] sm:w-[60%] text-center">
            At HorecaStore, you can sell a wide range of products tailored for
            the hospitality industry, from kitchen equipment to dining
            essentials. Explore our platform to list everything from
            high-quality Products!
          </p>
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
          className="flex sm:grid sm:grid-cols-6 gap-4 mb-[30px] p-[15px]"
        >
          {Array.from({ length: 18 }).map((_, index) => (
            <img
              src={
                process.env.PUBLIC_URL +
                `/images/SellonHoreca/Rectangle-${index + 1}.png`
              }
              alt=""
              className="rounded"
            />
          ))}
        </div>
      </Wrapper>
    </>
  );
};

export default SellOnHoreca;
