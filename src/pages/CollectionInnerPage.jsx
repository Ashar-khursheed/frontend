import React, { useState } from "react";
import {
  collectionCategories,
  BrandPicks,
  ListofProducts,
} from "../data/Collections";
import { Link } from "react-router-dom";
import { Wrapper } from "../shared/Wrapper";
import { Breadcrumb } from "../shared/Breadcrumb";
import { CiSearch } from "react-icons/ci";
import MultiRangeSlider from "multi-range-slider-react";
import { Rating } from "../shared/Rating";
import Slider from "react-slick";
import { ProductCard } from "../shared/ProductCard";
import { settings } from "../utils/slicksettings";
import { collectionInnerBreadCrumb } from "../data/CollectionInner.js";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { GoTasklist } from "react-icons/go";
import { CiGrid41 } from "react-icons/ci";
import { Pagination } from "../shared/Pagination.jsx";
export const CollectionInnerPage = () => {
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#33FFF5",
    "#FFEE33",
    "#FF9933",
    "#A833FF",
    "#33A1FF",
    "#FF3381",
    "#FF3333",
    "#33FF99",
    "#3333FF",
    "#FF33D1",
    "#33FFD5",
    "#FF7F50",
    "#FFD700",
    "#4B0082",
    "#7FFF00",
    "#DC143C",
    "#8B008B",
    "#B8860B",
    "#FF4500",
    "#2E8B57",
    "#4682B4",
    "#DA70D6",
    "#6B8E23",
    "#FF69B4",
    "#CD5C5C",
    "#FFA500",
    "#8A2BE2",
    "#A52A2A",
    "#5F9EA0",
    "#D2691E",
    "#FF1493",
    "#00FF7F",
    "#ADFF2F",
    "#800000",
    "#808000",
    "#00CED1",
    "#40E0D0",
    "#EE82EE",
    "#B22222",
    "#228B22",
  ];

  const [minValue, set_minValue] = useState(25);
  const [maxValue, set_maxValue] = useState(75);
  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };
  return (
    <div>
      <Wrapper>
        <Breadcrumb items={collectionInnerBreadCrumb} classes={"mt-7"} />
      </Wrapper>

      {/* Main Page  */}

      <Wrapper>
        <div className="grid grid-cols-9 gap-4">
          <div className="col-span-2 h-[100vh] overflow-auto pr-3 mt-8">
            {/* Price Section  */}
            <React.Fragment>
              <FilterTitle title="Price" />
              <span className="text-gray-700 text-sm text-center block my-1">
                ${minValue} - ${maxValue}+
              </span>
              <MultiRangeSlider
                min={0}
                max={400}
                step={1}
                minValue={minValue}
                maxValue={maxValue}
                ruler={false}
                style={{ border: "none", boxShadow: "none", padding: "3px 0" }}
                className="border-none"
                thumbLeftColor="#186737"
                label="false"
                thumbRightColor="#186737"
                onInput={(e) => {
                  handleInput(e);
                }}
              />
              <p className="flex items-center justify-between text-gray-700 text-sm mt-1">
                <span>$0</span>
                <span>$200</span>
                <span>$400</span>
              </p>

              <div className="h-[1px] w-full bg-gray-300 my-3 "></div>
            </React.Fragment>
            <React.Fragment>
              <FilterTitle title={"Brand"} />
              <div className="relative mt-1">
                <CiSearch
                  size={"18px"}
                  color="#707070"
                  className="absolute top-3 left-3"
                />
                <input
                  className="w-full border border-gray-300  rounded-full py-2 pl-10 pr-6 outline-none"
                  placeholder="Find a brand..."
                  type="text"
                />

                <div className="mt-3">
                  <CustomCheckbox
                    id={1}
                    title="Brand Name Here"
                    quantity="25"
                  />
                  <CustomCheckbox
                    id={2}
                    title="Brand Name Here"
                    quantity="25"
                  />
                  <CustomCheckbox
                    id={3}
                    title="Brand Name Here"
                    quantity="25"
                  />
                  <CustomCheckbox
                    id={4}
                    title="Brand Name Here"
                    quantity="25"
                  />
                  <CustomCheckbox
                    id={5}
                    title="Brand Name Here"
                    quantity="25"
                  />
                  <p className="underline text-gray-700 text-xs mt-2">
                    See More
                  </p>
                </div>
              </div>
              <div className="w-full h-[1px] bg-[#E2E8F0] my-5"></div>
            </React.Fragment>

            <React.Fragment>
              <FilterTitle title="Fulfillment Speed" />
              <div className="relative flex flex-row h-1 w-full bg-gray-700 items-center justify-between mt-3">
                <span className="size-[15px] rounded-full bg-gray-700 hover:bg-primary transition-all cursor-pointer"></span>
                <span className="size-[15px] rounded-full bg-gray-700 hover:bg-primary transition-all cursor-pointer"></span>
                <span className="size-[15px] rounded-full bg-gray-700 hover:bg-primary transition-all cursor-pointer"></span>
                <span className="size-[15px] rounded-full bg-gray-700 hover:bg-primary transition-all cursor-pointer"></span>
              </div>
              <div className="relative flex flex-row h-1 w-full items-center justify-between mt-6 text-sm text-gray-700">
                <span className="">Today</span>
                <span className="">5 days</span>
                <span className="">10 days</span>
                <span className="">anytime</span>
              </div>
              <div className="w-full h-[1px] bg-[#E2E8F0] mt-4 mb-3"></div>
            </React.Fragment>

            <React.Fragment>
              <FilterTitle title={"Microwave Oven Type"} />
              <div className="mt-3">
                <CustomCheckbox id={1} title="Oven Type Here" quantity="25" />
                <CustomCheckbox id={2} title="Oven Type Here" quantity="25" />
                <CustomCheckbox id={3} title="Oven Type Here" quantity="25" />
                <CustomCheckbox id={4} title="Oven Type Here" quantity="25" />
                <p className="underline text-gray-700 text-xs mt-2">See More</p>
              </div>
              <div className="w-full h-[1px] bg-[#E2E8F0] mt-4 mb-3"></div>
            </React.Fragment>

            <React.Fragment>
              <FilterTitle title={"Height (Base to Top)"} />
              <div className="mt-3">
                <CustomCheckbox id={1} title="10’’ - 11’’" quantity="25" />
                <CustomCheckbox id={2} title="14’’ - 15’’" quantity="25" />
                <CustomCheckbox id={3} title="18’’ - 19’’" quantity="25" />
                <CustomCheckbox id={4} title="22’’ - $above’’" quantity="25" />
                <p className="underline text-gray-700 text-xs mt-2">See More</p>
              </div>
              <div className="w-full h-[1px] bg-[#E2E8F0] mt-4 mb-3"></div>
            </React.Fragment>

            <React.Fragment>
              <FilterTitle title={"Width (Front to Back)"} />
              <div className="mt-3">
                <CustomCheckbox id={1} title="15’’ - & Below’’" quantity="25" />
                <CustomCheckbox id={2} title="16’’ - 17’’" quantity="25" />
                <CustomCheckbox id={3} title="20’’ - 21’’" quantity="25" />
                <CustomCheckbox id={4} title="22’’ - 23’" quantity="25" />
                <p className="underline text-gray-700 text-xs mt-2">See More</p>
              </div>
              <div className="w-full h-[1px] bg-[#E2E8F0] mt-4 mb-3"></div>
            </React.Fragment>

            <React.Fragment>
              <FilterTitle title={"Interior Capacity"} />
              <div className="mt-3">
                <CustomCheckbox
                  id={1}
                  title="0.9 to 1.3 Cu. Ft.’’"
                  quantity="25"
                />
                <CustomCheckbox
                  id={2}
                  title="Less than 0.9 Cu. Ft.’’"
                  quantity="25"
                />
                <p className="underline text-gray-700 text-xs mt-2">See More</p>
              </div>
              <div className="w-full h-[1px] bg-[#E2E8F0] mt-4 mb-3"></div>
            </React.Fragment>

            <React.Fragment>
              <FilterTitle title={"Watts"} />
              <div className="mt-3">
                <CustomCheckbox id={1} title="1000w & Above" quantity="25" />
                <CustomCheckbox id={2} title="700w & below" quantity="25" />
                <CustomCheckbox id={3} title="700w & 999w" quantity="25" />
                <p className="underline text-gray-700 text-xs mt-2">See More</p>
              </div>
              <div className="w-full h-[1px] bg-[#E2E8F0] mt-4 mb-3"></div>
            </React.Fragment>

            <React.Fragment>
              <FilterTitle title={"Oven Feature"} />
              <div className="mt-3">
                <CustomCheckbox
                  id={1}
                  title="Automatic Defrost"
                  quantity="25"
                />
                <CustomCheckbox
                  id={2}
                  title="One Touch Cooking"
                  quantity="25"
                />
                <CustomCheckbox
                  id={3}
                  title="Programmed Cooking Mode"
                  quantity="25"
                />
                <CustomCheckbox id={4} title="Safety Lock" quantity="25" />
                <p className="underline text-gray-700 text-xs mt-2">See More</p>
              </div>
              <div className="w-full h-[1px] bg-[#E2E8F0] mt-4 mb-3"></div>
            </React.Fragment>

            <React.Fragment>
              <FilterTitle title={"Condition"} />
              <div className="mt-3">
                <CustomRadio id={1} rating={5} quantity={25} />
                <CustomRadio id={1} rating={4} quantity={25} />
                <CustomRadio id={1} rating={3} quantity={25} />
                <CustomRadio id={1} rating={2} quantity={25} />
                <CustomRadio id={1} rating={1} quantity={25} />
              </div>
              <div className="w-full h-[1px] bg-[#E2E8F0] mt-4 mb-3"></div>
            </React.Fragment>

            <React.Fragment>
              <FilterTitle title={"Colors"} />
              <div className="mt-3">
                <div className="flex items-center flex-wrap gap-4 gap-y-5">
                  {colors.map((col, index) => {
                    return (
                      <span
                        key={index}
                        className={`size-4 rounded-full cursor-pointer`}
                        style={{ backgroundColor: col }}
                      ></span>
                    );
                  })}
                </div>
              </div>
            </React.Fragment>
          </div>
          <div className="col-span-7 mt-8">
            <h2 className="font-semibold text-lg text-black-100">
              Cooking Equipments
            </h2>
            <div className="w-full h-[1px] bg-[#E2E8F0] my-5"></div>

            <div className="flex flex-row items-center justify-between">
              <span className="text-sm text-gray-700">
                Showing all 51606 results
              </span>
              <div className="flex flex-row items-center ">
                <span className="text-sm text-gray-700 mr-6">
                  Sort:
                  <span className="text-black-100 ml-1 relative">
                    <Menu
                      arrow={true}
                      className={"top-0"}
                      menuButton={
                        <button type="button">Default Sorting</button>
                      }
                    >
                      <MenuItem>Greater Price</MenuItem>
                      <MenuItem>Best Seller</MenuItem>
                      <MenuItem>Keyword Match</MenuItem>
                    </Menu>
                  </span>
                </span>
                <span className="text-sm text-gray-700 mr-6">
                  Show:
                  <span className="text-black-100 ml-1 relative">
                    <Menu
                      className={"top-0"}
                      arrow={true}
                      align="center"
                      top="0px"
                      menuButton={<button type="button">80 Items</button>}
                    >
                      <MenuItem>10 Items</MenuItem>
                      <MenuItem>20 Items</MenuItem>
                      <MenuItem>100 Items</MenuItem>
                    </Menu>
                  </span>
                </span>
                <div className="flex flex-row items-center">
                  <CiGrid41 className="bg-gray-300 cursor-pointer" size={26} />
                  <GoTasklist className="ml-2 cursor-pointer" size={26} />
                </div>
              </div>
            </div>
            <div className="w-full h-[1px] bg-[#E2E8F0] my-4"></div>

            {/* Collection Category  */}
            <div className="grid grid-cols-6 gap-5 mt-8">
              {collectionCategories.map((cat, index) => {
                return (
                  <Link
                    to={cat.url}
                    key={index}
                    className="col-span-1 flex items-center justify-center flex-col"
                  >
                    <img src={cat.imgSrc} alt="" />
                    <h4 className="mt-2 text-base font-semibold text-primary">
                      {cat.title}
                    </h4>
                  </Link>
                );
              })}
            </div>

            <div className="grid grid-cols-4 gap-4 mt-4 mb-10">
              {ListofProducts.map((product, index) => {
                return (
                  <ProductCard
                    classes="col-span-1 mt-1  min-h-[600px]"
                    key={index}
                    product={product}
                  />
                );
              })}
            </div>

            <Pagination />
          </div>
        </div>
      </Wrapper>

      <div className="w-full">
        <img
          src={
            process.env.PUBLIC_URL +
            "/images/collections/full-width-short-banner.png"
          }
          alt=""
        />
      </div>

      <Wrapper>
        <div className="mb-10">
          <div className="flex items-center justify-between mx-2 my-8">
            <h2 className="font-semibold text-black-100 text-2xl">
              Products you may also like
            </h2>
            <span className="text-gray-700 text-sm">Page 1 of 5</span>
          </div>
          <Slider {...settings} className="arrow__wrapper">
            {BrandPicks.map((product, index) => {
              return (
                <ProductCard
                  classes="min-h-[600px] mx-2"
                  key={index}
                  product={product}
                />
              );
            })}
          </Slider>
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between mx-2 my-8">
            <h2 className="font-semibold text-black-100 text-2xl">
              Inspired by your browsing history
            </h2>
            <span className="text-gray-700 text-sm">Page 1 of 5</span>
          </div>
          <Slider {...settings} className="arrow__wrapper">
            {BrandPicks.map((product, index) => {
              return (
                <ProductCard
                  classes="min-h-[600px] mx-2"
                  key={index}
                  product={product}
                />
              );
            })}
          </Slider>
        </div>
      </Wrapper>
    </div>
  );
};

const FilterTitle = ({ classes, title }) => {
  return (
    <h2 className={`${classes} text-black-100 font-semibold text-lg`}>
      {title}
    </h2>
  );
};
const CustomCheckbox = ({ children, title, quantity, id }) => {
  return (
    <div className="flex items-center justify-between text-gray-700 mt-1">
      <div className="flex items-center">
        <input
          id={title.split("")[0] + id}
          type="checkbox"
          value=""
          className="outline-none w-4 h-4  border-primary rounded accent-primary"
        />
        <label htmlFor={title.split("")[0] + id} className="ml-2 text-sm ">
          {title}
        </label>
      </div>
      <span>{quantity}</span>
    </div>
  );
};

const CustomRadio = ({ children, id, rating, quantity }) => {
  return (
    <div className="flex items-center mb-2 ">
      <input
        type="radio"
        name={id}
        className="w-4 h-4  mr-2 accent-primary cursor-pointer"
      />
      <label
        htmlFor={id}
        className="w-full flex items-center justify-between text-gray-700 text-sm"
      >
        <div className="flex items-center">
          <Rating rating={rating} />
          <span className="">& Up </span>
        </div>
        <span>{quantity}</span>
      </label>
    </div>
  );
};
