import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import MultiRangeSlider from "multi-range-slider-react";
import DynamicFilter from "./DynamicFIlter";
import { IoClose } from "react-icons/io5";
import { apiClient } from "../utils/apiWrapper";
import { useParams, Link, useSearchParams } from "react-router-dom";
import FilterTitle from '../components/FilterTitle';
import CustomCheckbox from "./CustomCheckbox";
const FilterSection = ({
    setDynamicParams,
    filters,
    brands,
    priceMin,
    priceMax,
    setSelectedReview,
    selectedReview,
    setSelectedBrands,
    products,
    minDelivery,
    maxDelivery,
    setSelectedDelivery,
    selectedDelivery,
    setSelectedMinPrice,
    setSelectedMaxPrice,
}) => {
    const { id } = useParams();
    const convertToSnakeCase = (obj) => {
        const newObj = {};
        for (const key in obj) {
            // Convert key to snake_case
            const newKey = key.replace(/\s+/g, '_').toLowerCase();  // replace spaces with underscores and convert to lowercase
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                newObj[newKey] = convertToSnakeCase(obj[key]); // Recursively process nested objects
            } else {
                newObj[newKey] = obj[key];
            }
        }

        return newObj;
    };


    // const [filters, setFilters] = useState(null);
    const [minValue, set_minValue] = useState(priceMin);
    const [maxValue, set_maxValue] = useState(priceMax);
    const [seeMoreBrand, setSeeMoreBrand] = useState(false);
   
    const location = useLocation();
    const navigate = useNavigate();
    const handleInput = (e) => {
        const minValue = e.minValue;
        const maxValue = e.maxValue;
        set_minValue(minValue);
        set_maxValue(maxValue);
    };
    const handleCheckboxChange = (brandId) => {
        setSelectedBrands((prev) =>
            prev.includes(brandId)
                ? prev.filter((id) => id !== brandId)
                : [...prev, brandId]
        );
    };

    const handlerPriceRange = () => {
        setSelectedMinPrice(minValue);
        setSelectedMaxPrice(maxValue);
    };


 

    return (
        <React.Fragment>

         
            <div className=" col-span-2 h-[100vh] overflow-auto px-3">
                {/* Price Section  */}
                <React.Fragment>
                    {location.search && location.search !== "?search=" ? (
                        <React.Fragment>
                            <div className="flex items-center justify-between">
                                <FilterTitle title="Applied Search" />
                                <span className="underline cursor-pointer text-gray-400 font-semibold text-sm">
                                    Clear All
                                </span>
                            </div>

                            <div className="mt-5 mb-5">
                                <span className="inline-flex items-center bg-gray-200 text-black-100 text-sm px-3 py-2 rounded-sm">
                                    {location.search
                                        ? location.search.split("=")[1].replaceAll("-", " ")
                                        : ""}{" "}
                                    <IoClose
                                        className="ml-2 cursor-pointer "
                                        onClick={() => navigate("/products?search=")}
                                    />
                                </span>
                            </div>
                            <div className="h-[1px] w-full bg-gray-300 my-3 "></div>
                        </React.Fragment>
                    ) : null}
                </React.Fragment>
                <React.Fragment>
                    <div className="flex items-center justify-between">
                        <FilterTitle title="Price" />
                        <span
                            className="text-sm underline text-gray-400 font-semibold cursor-pointer"
                            onClick={() => {
                                set_minValue(10);
                                set_maxValue(20000);
                                setSelectedMaxPrice(20000);
                                setSelectedMinPrice(10);
                            }}
                        >
                            Clear All
                        </span>
                    </div>
                    <span className="text-gray-700 text-sm text-center block my-1">
                        ${minValue} - ${maxValue}+
                    </span>
                    <MultiRangeSlider
                        min={10}
                        max={20000}
                        step={10}
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
                        onChange={() => handlerPriceRange()}
                    />
                    <p className="flex items-center justify-between text-gray-700 text-sm mt-1">
                        <span>${priceMin}</span>
                        <span>${(Math.floor(priceMin) + Math.floor(priceMax)) / 2}</span>
                        <span>${priceMax}</span>
                    </p>

                    <div className="h-[1px] w-full bg-gray-300 my-3 "></div>
                </React.Fragment>
                <React.Fragment>
                    <div className="flex items-center justify-between">
                        <FilterTitle title={"Brand"} />
                    </div>
                    <div className="relative mt-1">
                        <div className="mt-3">
                            {brands ? (
                                brands.map((brand, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            {!seeMoreBrand && index < 5 ? (
                                                <CustomCheckbox
                                                    key={index}
                                                    id={brand.id}
                                                    title={brand.name}
                                                    onClick={() => handleCheckboxChange(brand.id)}
                                                />
                                            ) : null}
                                            {seeMoreBrand ? (
                                                <CustomCheckbox
                                                    key={index}
                                                    id={brand.id}
                                                    title={brand.name}
                                                    onClick={() => handleCheckboxChange(brand.id)}
                                                />
                                            ) : null}
                                        </React.Fragment>
                                    );
                                })
                            ) : (
                                <p>No Brand Found</p>
                            )}
                            <p
                                className="underline text-gray-700 text-xs mt-2 cursor-pointer"
                                onClick={() => setSeeMoreBrand(!seeMoreBrand)}
                            >
                                {!seeMoreBrand ? "See More" : "See Less"}
                            </p>
                        </div>
                    </div>
                    <div className="w-full h-[1px] bg-[#E2E8F0] my-5"></div>
                </React.Fragment>
             

                <React.Fragment>
                    <div className="flex items-center justify-between">
                        <FilterTitle title={"Reviews"} />
                        <span
                            className="text-gray-400 font-semibold text-sm underline cursor-pointer"
                            onClick={() => setSelectedReview()}
                        >
                            Clear All
                        </span>
                    </div>
                    <div className="mt-3">
                        <CustomRadio
                            id={"ratting"}
                            rating={5}
                            checked={selectedReview === 5}
                            onClick={() => setSelectedReview(5)}
                        />
                        <CustomRadio
                            id={"ratting"}
                            rating={4}
                            checked={selectedReview === 4}
                            onClick={() => setSelectedReview(4)}
                        />
                        <CustomRadio
                            id={"ratting"}
                            rating={3}
                            checked={selectedReview === 3}
                            onClick={() => setSelectedReview(3)}
                        />
                        <CustomRadio
                            id={"ratting"}
                            rating={2}
                            checked={selectedReview === 2}
                            onClick={() => setSelectedReview(2)}
                        />
                        <CustomRadio
                            id={"ratting"}
                            rating={1}
                            checked={selectedReview === 1}
                            onClick={() => setSelectedReview(1)}
                        />
                    </div>
                </React.Fragment>

                {filters ? <DynamicFilter data={!!filters && filters}    setDynamicParams={setDynamicParams}
           /> : ""}



            </div>
        </React.Fragment>
    );
};

export default React.memo(FilterSection);





// Custom Radio Component
const CustomRadio = ({ children, id, rating, quantity, onClick, checked }) => {
    return (
        <div className="flex items-center mb-2 ">
            <input
                type="radio"
                name={id}
                checked={checked}
                className="w-5 h-5  mr-2 accent-primary cursor-pointer"
                onChange={onClick}
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

// Rating Component
const Rating = ({ rating, classes }) => {
    const [criteria, setCriteria] = useState(rating);

    useEffect(() => {
        let rate = Math.round(Number(rating));
        setCriteria(rate);
    }, [rating]);
    return (
        <div className={`flex flex-row items-center ${classes}`}>
            {Array.from({ length: 5 }, (_, i) => {
                return (
                    <span key={i} className="mr-1">
                        {criteria > i ? (
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8.00779 2.00915L9.03434 4.07923C9.17434 4.36739 9.54761 4.64379 9.86261 4.69672L11.7232 5.0084C12.9131 5.20836 13.1931 6.07873 12.3357 6.93734L10.8892 8.39579C10.6442 8.64277 10.5101 9.11912 10.5858 9.46026L11 11.2657C11.3266 12.6947 10.5742 13.2475 9.32017 12.5006L7.57618 11.4598C7.26124 11.2716 6.74213 11.2716 6.4213 11.4598L4.67734 12.5006C3.42914 13.2475 2.6709 12.6888 2.99753 11.2657L3.41165 9.46026C3.48747 9.11912 3.35332 8.64277 3.10835 8.39579L1.66184 6.93734C0.81027 6.07873 1.08441 5.20836 2.27427 5.0084L4.1349 4.69672C4.44403 4.64379 4.81733 4.36739 4.95731 4.07923L5.98385 2.00915C6.5438 0.885905 7.45368 0.885905 8.00779 2.00915Z"
                                    fill="#64748B"
                                    stroke="#64748B"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        ) : (
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8.00779 2.00915L9.03434 4.07923C9.17434 4.36739 9.54761 4.64379 9.86261 4.69672L11.7232 5.0084C12.9131 5.20836 13.1931 6.07873 12.3357 6.93734L10.8892 8.39579C10.6442 8.64277 10.5101 9.11912 10.5858 9.46026L11 11.2657C11.3266 12.6947 10.5742 13.2475 9.32017 12.5006L7.57618 11.4598C7.26124 11.2716 6.74213 11.2716 6.4213 11.4598L4.67734 12.5006C3.42914 13.2475 2.6709 12.6888 2.99753 11.2657L3.41165 9.46026C3.48747 9.11912 3.35332 8.64277 3.10835 8.39579L1.66184 6.93734C0.81027 6.07873 1.08441 5.20836 2.27427 5.0084L4.1349 4.69672C4.44403 4.64379 4.81733 4.36739 4.95731 4.07923L5.98385 2.00915C6.5438 0.885905 7.45368 0.885905 8.00779 2.00915Z"
                                    fill="#fff"
                                    stroke="#64748B"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </span>
                );
            })}
        </div>
    );
};