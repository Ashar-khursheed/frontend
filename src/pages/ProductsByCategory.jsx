import React, { lazy, useEffect, useState } from "react";
import { Wrapper } from "../shared/Wrapper";
import { Breadcrumb } from "../shared/Breadcrumb";
import { Menu, MenuItem } from "@szhsin/react-menu";

import { Pagination } from "../shared/Pagination";
import { SuggestionSlider } from "../hooks/suggestionSlider/SuggestionSlider";
import Skeleton from "react-loading-skeleton";
import { apiClient } from "../utils/apiWrapper";
import { useLocation, useNavigate } from "react-router";
import { useParams, Link, useSearchParams } from "react-router-dom";
import FilterSection from "../components/FilterSection";

const  ProductCard =lazy(()=>import('../shared/ProductCard'));
 const ProductsByCategory = () => {
  const authToken = localStorage.getItem("authToken");
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const { id, category, subcategory } = useParams();
  const [page, setPage] = useState("1");
  const [perPage, setPerPage] = useState("20");
  const [loader, setLoader] = useState(true);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState([]);
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
  const [dynamicParams,setDynamicParams]=useState(null);




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
      
    }
  };

  const fetchProducts = async () => {

    setLoader(true);
    try {
      let search = location.search ? location.search.split("=")[1] : "";

      const params = {
        category_id: id,
        per_page: perPage,
        page: page,
        ...(dynamicParams && { dynamicParams }),
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
      const response = await apiClient.get(`/categories/filters`, {
        params,
      });

     

      setFilters(response?.data?.filters);
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
          element?.tags?.map((element2) => {
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
    dynamicParams
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
          products={!!products && products}
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
            setDynamicParams={setDynamicParams}
              filters={filters}
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
                            src={`${item.images}`}
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
                          className={`bg-[#F5F5F5] m-[10px] w-none sm:w-[183px] border-[#186737] sm:border-[#D9D9D9] col-span-1 flex items-center justify-center flex-col cursor-pointer transition-all border hover:border-primary p-[5px] sm:p-4 rounded-md  border-primary"}`}
                        >
                          <Link
                            key={cat.id}
                            className="mt-1 block text-[#666666] text-base"
                            to={`/collections/${category}/${cat.slug}/${cat.id}?type=1`}
                          >
                            <img
                              className="sm:w-20 md:w-28 lg:w-36 xl:w-48 mx-auto"
                              src={`${cat.image}`}
                              alt={cat.name}
                            />
                            <h4 className=" mt-2 text-base font-semibold text-primary text-center">
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

 



 