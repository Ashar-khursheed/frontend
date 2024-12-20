import React, { useEffect, useState } from "react";
import { Wrapper } from "../shared/Wrapper";
import { Breadcrumb } from "../shared/Breadcrumb";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { GoTasklist } from "react-icons/go";
import { CiGrid41 } from "react-icons/ci";
import { ProductCard } from "../shared/ProductCard";
import MultiRangeSlider from "multi-range-slider-react";
import { Pagination } from "../shared/Pagination";
import { RelatedSearch } from "../hooks/productListingHooks/RelatedSearch";
import { SuggestionSlider } from "../hooks/suggestionSlider/SuggestionSlider";
import Skeleton from "react-loading-skeleton";
import { apiClient } from "../utils/apiWrapper";
import { useLocation, useNavigate } from "react-router";
import { IoClose } from "react-icons/io5";
import { useParams, Link, useSearchParams } from "react-router-dom";

 const ProductsByCategory = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const { id, category, subcategory } = useParams();
  const [page, setPage] = useState("1");
  const [perPage, setPerPage] = useState("20");
  const [loader, setLoader] = useState(true);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceMin, setPriceMin] = useState(10);
  const [priceMax, setPriceMax] = useState(20000);
  const [lengthMin, setLengthMin] = useState("");
  const [lengthMax, setLengthMax] = useState("");
  const [widthMin, setWidthMin] = useState("");
  const [widthMax, setWidthMax] = useState("");
  const [heightMin, setHeightMin] = useState("");
  const [heightMax, setHeightMax] = useState("");
  const [selectedReview, setSelectedReview] = useState();
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRangeBool, setPriceRangeBool] = useState(false);
  const location = useLocation();
  const [paginationData, setPaginationData] = useState([]);
  const [products, setProducts] = useState([]);
  const [producttypes, setProducttypes] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [sortByText, setSortByText] = useState("Default");
  const [minDelivery, setMinDelivery] = useState(0);
  const [maxDelivery, setMaxDelivery] = useState(10);
  const [selectedDelivery, setSelectedDelivery] = useState();
  const [selectedMinPrice, setSelectedMinPrice] = useState();
  const [selectedMaxPrice, setSelectedMaxPrice] = useState();
  const [openFilterPopup, setOpenFilterPopup] = useState(false);

  const breadcrumb = [
    {
      url: "/",
      title: "Home",
    },
    { url: "/collections/" + category, title: category.split("-").join(" ") },
    {
      title: subcategory.split("-").join(" "),
    },
  ];
  const fetchCategories = async () => {
    try {
      const params = {
        limit: 12,
        id: id,
      };
      const response = await apiClient.get(`/categories`, { params });
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    const authToken = localStorage.getItem("authToken");
    setLoader(true);
    try {
      let search = location.search ? location.search.split("=")[1] : "";

      const params = {
        per_page: perPage,
        page: page,
        ...(selectedReview && { rating: selectedReview }),
        ...(selectedBrands.length > 0 && { brand_id: String(selectedBrands) }),
        ...(search && { search: search }),
      };
      if (sortBy === "asc" || sortBy === "desc") {
        params.sort_direction = sortBy;
        params.sort_by = "sale_price";
      }
      if (selectedDelivery) {
        params.delivery_days = selectedDelivery;
      }

      if (selectedMinPrice) {
        params.price_min = selectedMinPrice;
      }
      if (selectedMaxPrice) {
        params.price_max = selectedMaxPrice;
      }
      const response = await apiClient.get(`/categories/${id}/products`, {
        params,
      });
      console.log("productType", response?.data);
      setProducts(response?.data?.products.data);
      setPaginationData(response?.data?.products?.total);
      setProducttypes(response?.data?.producttypes);
      setLengthMin(response?.data?.length_min);
      setLengthMax(response?.data?.length_max);
      setWidthMin(response?.data?.width_min);
      setWidthMax(response?.data?.width_max);
      setHeightMin(response?.data?.height_min);
      setHeightMax(response?.data?.height_max);
      setBrands(response?.data?.brands);
      setMinDelivery(response?.data?.delivery_min);
      setMaxDelivery(response?.data?.delivery_max);
      let related = [];
      response.data?.products?.data?.forEach((element) => {
        if (element) {
          element.tags.map((element2) => {
            if (element2) {
              let tempRelated = {
                name: element2.name,
                id: element2.id,
              };
              related.push(tempRelated);
            }
          });
        }
      });

      setLoader(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    fetchProducts();
  }, [
    page,
    perPage,
    selectedReview,
    selectedBrands,
    priceRangeBool,
    location.search,
    sortBy,
    selectedDelivery,
    selectedMinPrice,
    selectedMaxPrice,
    id,
  ]);

  useEffect(() => {
    setPage(1);
  }, [sortBy, perPage]);

  useEffect(() => {
    if (type == null) {
      fetchCategories();
    }
  }, [type]);

  const bigScreenCss =
    "flex grid-cols-5 sm:grid md:grid lg:grid 2xl:grid gap-5 sm:gap-5 sm:grid sm:space-x-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5";

  return (
    <div>
      <div
        style={{ zIndex: 999 }}
        className={`lg:hidden xl:hidden w-[80vw] h-[100vh] p-5 bg-[white] border absolute z-999 mt-[-215px] 
          ${openFilterPopup ? "translate-x-[0%]" : "translate-x-[-100%]"} 
          transition-transform duration-300 ease-in-out`}
      >
        <div className="flex p-3 items-center justify-between border-b border-gray">
          <p className="text-[16px] leading-[18px] font-bold">Filters</p>
          <p onClick={() => setOpenFilterPopup(false)}>x</p>
        </div>
        <div className="flex p-[12px] flex-row items-center justify-between">
          <span className="text-sm text-gray-700 mr-6">
            Sort:
            <span className="text-black-100 ml-1 relative">
              <Menu
                arrow={true}
                className={"top-0"}
                menuButton={<button type="button">{sortByText}</button>}
              >
                {sortByText !== "Default" ? (
                  <MenuItem
                    onClick={() => {
                      setSortBy("");
                      setSortByText("Default");
                    }}
                  >
                    Default
                  </MenuItem>
                ) : null}
                <MenuItem
                  onClick={() => {
                    setSortBy("desc");
                    setSortByText("Highest Price");
                  }}
                >
                  Highest Price
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setSortBy("asc");
                    setSortByText("Lowest Price");
                  }}
                >
                  Lowest Price
                </MenuItem>
              </Menu>
            </span>
          </span>
          <span className="text-sm text-gray-700 ">
            Show:
            <span className="text-black-100 ml-1 relative">
              <Menu
                className={"top-0"}
                arrow={true}
                align="center"
                top="0px"
                menuButton={<button type="button">{perPage} Items</button>}
              >
                <MenuItem onClick={() => setPerPage(20)}>20 Items</MenuItem>
                <MenuItem onClick={() => setPerPage(30)}>30 Items</MenuItem>
                <MenuItem onClick={() => setPerPage(50)}>50 Items</MenuItem>
              </Menu>
            </span>
          </span>
          {/* <div className="flex flex-row items-center">
                                    <CiGrid41 className="bg-gray-300 cursor-pointer" size={26} />
                                    <GoTasklist className="ml-2 cursor-pointer" size={26} />
                                </div> */}
        </div>
        <FilterSection
          minDelivery={minDelivery}
          maxDelivery={maxDelivery}
          priceRangeBool={priceRangeBool}
          setPriceRangeBool={setPriceRangeBool}
          brands={brands}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          categories={categories}
          priceMin={priceMin}
          priceMax={priceMax}
          lengthMin={lengthMin}
          lengthMax={lengthMax}
          widthMin={widthMin}
          widthMax={widthMax}
          heightMin={heightMin}
          heightMax={heightMax}
          selectedReview={selectedReview}
          setSelectedReview={setSelectedReview}
          products={products}
          setSelectedDelivery={setSelectedDelivery}
          selectedDelivery={selectedDelivery}
          setSelectedMinPrice={setSelectedMinPrice}
          setSelectedMaxPrice={setSelectedMaxPrice}
        />
      </div>
      <Wrapper>
        <Breadcrumb items={breadcrumb} classes={"mt-7 mb-7"} />
        <div className="grid grid-cols-4 sm:grid-cols-9 gap-4">
          <div className="col-span-2 hidden sm:hidden md:hidden lg:block">
            <FilterSection
              minDelivery={minDelivery}
              maxDelivery={maxDelivery}
              priceRangeBool={priceRangeBool}
              setPriceRangeBool={setPriceRangeBool}
              brands={brands}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              categories={categories}
              priceMin={priceMin}
              priceMax={priceMax}
              lengthMin={lengthMin}
              lengthMax={lengthMax}
              widthMin={widthMin}
              widthMax={widthMax}
              heightMin={heightMin}
              heightMax={heightMax}
              selectedReview={selectedReview}
              setSelectedReview={setSelectedReview}
              products={!!products && products}
              setSelectedDelivery={setSelectedDelivery}
              selectedDelivery={selectedDelivery}
              setSelectedMinPrice={setSelectedMinPrice}
              setSelectedMaxPrice={setSelectedMaxPrice}
            />
          </div>
          <div className="sm:col-span-12 lg:col-span-7 md-col-span-7 col-span-12">
            <span className="title">{subcategory.split("-").join(" ")}</span>
            <div className="w-full h-[1px] bg-[#E2E8F0] my-4"></div>
            <div className="flex flex-row items-center justify-between">
              <span className="text-sm text-gray-700">
                Showing all {paginationData ? paginationData : "0"} results
              </span>
              <div
                onClick={() => setOpenFilterPopup(true)}
                className="lg:hidden xl:hidden bg-[#E2E8F0] p-[10px] rounded"
              >
                <img src={`${process.env.PUBLIC_URL}/icons/FilterIcon.png`} />
              </div>
              <div className="hidden lg:flex flex-row items-center ">
                <span className="text-sm text-gray-700 mr-6">
                  Sort:
                  <span className="text-black-100 ml-1 relative">
                    <Menu
                      arrow={true}
                      className={"top-0"}
                      menuButton={<button type="button">{sortByText}</button>}
                    >
                      {sortByText !== "Default" ? (
                        <MenuItem
                          onClick={() => {
                            setSortBy("");
                            setSortByText("Default");
                          }}
                        >
                          Default
                        </MenuItem>
                      ) : null}
                      <MenuItem
                        onClick={() => {
                          setSortBy("desc");
                          setSortByText("Highest Price");
                        }}
                      >
                        Highest Price
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setSortBy("asc");
                          setSortByText("Lowest Price");
                        }}
                      >
                        Lowest Price
                      </MenuItem>
                    </Menu>
                  </span>
                </span>
                <span className="text-sm text-gray-700 ">
                  Show:
                  <span className="text-black-100 ml-1 relative">
                    <Menu
                      className={"top-0"}
                      arrow={true}
                      align="center"
                      top="0px"
                      menuButton={
                        <button type="button">{perPage} Items</button>
                      }
                    >
                      <MenuItem onClick={() => setPerPage(20)}>
                        20 Items
                      </MenuItem>
                      <MenuItem onClick={() => setPerPage(30)}>
                        30 Items
                      </MenuItem>
                      <MenuItem onClick={() => setPerPage(50)}>
                        50 Items
                      </MenuItem>
                    </Menu>
                  </span>
                </span>
                {/* <div className="flex flex-row items-center">
                                    <CiGrid41 className="bg-gray-300 cursor-pointer" size={26} />
                                    <GoTasklist className="ml-2 cursor-pointer" size={26} />
                                </div> */}
              </div>
            </div>
            <div className="w-full h-[1px] bg-[#E2E8F0] my-4"></div>
            {type == 1 ? (
              <>
                <div className="flex items-center justify-center">
                  <div className="title">Choose Container Type</div>
                </div>

                <div className="grid grid-cols-6 gap-6 mt-8">
                  {producttypes &&
                    producttypes?.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className={`bg-[#F5F5F5] h-[67.2px] w-[67.2px] sm:h-[100%] sm:w-[100%] border-[#D9D9D9] col-span-1 flex items-center justify-center flex-col cursor-pointer transition-all border-2 hover:border-primary p-1 sm:p-4 rounded-md  border-primary"}`}
                        >
                          <img
                            className="w-28"
                            src={`https://testhssite.com/storage/${item.images}`}
                            alt={item.name}
                          />
                        </div>
                      );
                    })}
                </div>
              </>
            ) : (
              ""
            )}

            {/* Categories Display Here  */}
            {type == null ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 md:grid-cols-4 gap-2 sm:gap-6 mt-8">
                {!!categories
                  ? categories.map((cat, index) => {
                      return (
                        <div
                          key={cat.id}
                          className={`bg-[#F5F5F5] m-[10px] border-[#186737] sm:border-[#D9D9D9] col-span-1 flex items-center justify-center flex-col cursor-pointer transition-all border hover:border-primary p-[5px] sm:p-4 rounded-md  border-primary"}`}
                        >
                          <Link
                            key={cat.id}
                            className="mt-1 block text-[#666666] text-base underline"
                            to={`/collections/${category}/${cat.slug}/${cat.id}?type=1`}
                          >
                            <img
                         className="sm:w-20 md:w-28 lg:w-36 xl:w-48 mx-auto" 
                              src={`https://testhssite.com/storage/${cat.image}`}
                              alt={cat.name}
                            />
                            <h4 className="lg:hidden xl:hidden mt-2 text-base font-semibold text-primary text-center">
                              {cat.name}
                            </h4>
                          </Link>
                        </div>
                      );
                    })
                  : Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="col-span-1">
                        <Skeleton count={1} height="100px" />
                      </div>
                    ))}
              </div>
            ) : null}

            <br />
            {/* Products  Display Here  */}
            <div
              className={`grid grid-cols-2 sm:grid-cols-4 ${
                loader ? "lg:grid-cols-4" : "lg:grid-cols-12"
              } gap-4  mt-4 mb-10`}
            >
              {loader ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="col-span-1">
                    <Skeleton count={1} height="320px" />
                  </div>
                ))
              ) : (
                <React.Fragment>
                  {!!products && products.length > 0 ? (
                    products.map((product, index) => {
                      return (
                        <React.Fragment key={index}>
                          <ProductCard
                            classes="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-3    mt-1"
                            key={index}
                            product={product}
                          />
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <p className="mt-2 font-semibold text-center text-xl col-span-4">
                      No Product Found
                    </p>
                  )}
                </React.Fragment>
              )}
            </div>

            {/* Related Searched  */}
            {!loader && products.length == perPage ? (
              <Pagination
                page={page}
                paginationData={paginationData}
                setPage={setPage}
              />
            ) : null}
          </div>
        </div>
        {window?.innerWidth > 640 && (
          <SuggestionSlider
            title={"Products you may also like"}
            productList={products}
          />
        )}
        {window?.innerWidth < 640 && (
          <>
            <img
              className="w-[100vw] h-[162px] rounded"
              src={`${process.env.PUBLIC_URL}/images/categoryBanner.png`}
            />
            <h1 className="mt-[20px]">Products you may also like</h1>
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
                    className="col-span-1 mt-1 min-h-[320px]"
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
          </>
        )}
        {window?.innerWidth > 640 && (
          <SuggestionSlider
            title={"Inspired by your browsing history"}
            productList={products}
          />
        )}
        {window?.innerWidth < 640 && (
          <>
            <h1 className="mt-[40px]">Inspired by your browsing history</h1>
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
                    className="col-span-1 mt-1 min-h-[320px]"
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
          </>
        )}
      </Wrapper>
    </div>
  );
};

export default React.memo(ProductsByCategory)
// Filter Title
const FilterTitle = ({ classes, title }) => {
  return (
    <h2 className={`${classes} text-black-100 font-semibold text-lg`}>
      {title}
    </h2>
  );
};

// Custom Checkbox Component
const CustomCheckbox = ({ children, title, quantity, id, onClick }) => {
  return (
    <div className="flex items-center justify-between text-gray-700 mt-1">
      <div className="flex items-center">
        <input
          id={title.split("")[0] + id}
          type="checkbox"
          value=""
          className="outline-none w-4 h-4  border-primary rounded accent-primary"
          onClick={() => onClick()}
        />
        <label htmlFor={title.split("")[0] + id} className="ml-2 text-sm ">
          {title}
        </label>
      </div>
      <span>{quantity}</span>
    </div>
  );
};

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
// Filter Section
const FilterSection = ({
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
  const [seeMoreBrand, setSeeMoreBrand] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  let count = 6;
  const breadcrumb = [
    {
      url: "#",
      title: "Home",
    },
    {
      url: "#",
      title: "Shop",
    },
    {
      title: "Search results for “microwave”",
    },
  ];
  const [minValue, set_minValue] = useState(priceMin);
  const [maxValue, set_maxValue] = useState(priceMax);

  const numberOfRanges = 5;
  // let timeoutId; // Keep track of the timeout ID

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
            <FilterTitle title="Fulfillment Speed" />
            <span
              className="font-semibold text-gray-400 text-sm underline cursor-pointer"
              onClick={() => setSelectedDelivery()}
            >
              Clear All
            </span>
          </div>
          <div className="relative flex flex-row h-1 w-full bg-gray-700 items-center justify-between mt-3">
            <span
              className={`size-[15px] rounded-full  hover:bg-primary transition-all cursor-pointer ${
                selectedDelivery === minDelivery ? "bg-primary" : "bg-gray-700"
              }`}
              onClick={() => setSelectedDelivery(minDelivery)}
            ></span>
            <span
              className={`size-[15px] rounded-full  hover:bg-primary transition-all cursor-pointer ${
                selectedDelivery === maxDelivery ? "bg-primary" : "bg-gray-700"
              }`}
              onClick={() => setSelectedDelivery(maxDelivery)}
            ></span>
          </div>
          <div className="relative flex flex-row h-1 w-full items-center justify-between mt-6 text-sm text-gray-700">
            <span onClick={() => setSelectedDelivery(minDelivery)}>
              {minDelivery}
            </span>
            <span className="" onClick={() => setSelectedDelivery(maxDelivery)}>
              {maxDelivery}
            </span>
          </div>
          <div className="w-full h-[1px] bg-[#E2E8F0] mt-4 mb-3"></div>
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
      </div>
    </React.Fragment>
  );
};
