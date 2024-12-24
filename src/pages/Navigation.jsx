import React, { useState, useRef, useEffect, useCallback } from "react";
import { Wrapper } from "../shared/Wrapper";
import { Link } from "react-router-dom";
import {
  ControlledMenu,
  useHover,
  useMenuState,
  SubMenu,
  MenuItem,
} from "@szhsin/react-menu";
import { useCart } from "../context/CartContext";
import { CiSearch } from "react-icons/ci";
import { useLocalCartCount } from "../context/LocalCartCount";
import { getCurrencyMenu } from "../data/navbar";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../utils/apiWrapper";
import { useLocation } from "react-router-dom";
import { useWishlist } from "../context/WishListContext";
import { debounce } from "lodash";
import ProfileDrawer from "./ProfileRegistration/ProfileDrawer/ProfileDrawer";
import SidebarProfile from "../components/SidebarProfile";

const Navigation = ({ categories, currentLocation }) => {
  const token = localStorage.getItem("authToken");
  const [currencyMenu, setCurrencyMenu] = useState(getCurrencyMenu(token));
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [currency, setCurrency] = useState(["USD", "AED", "PKR"]);
  const [selectedLang, setSelectedLang] = useState("English");
  const [lang, setLang] = useState(["English", "العربية"]);
  const navigate = useNavigate();
  const ref = useRef(null);
  const [menuState, toggle] = useMenuState({ transition: true });
  const { anchorProps, hoverProps } = useHover(menuState.state, toggle);
  const { totalCartCount } = useCart();
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { triggerUpdateCart } = useCart();
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [isFocused, setIsFocused] = useState(false); // State to track focus
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [openModel, setOpenModel] = useState(false);
  const [maxIndex, setMaxIndex] = useState(4); // Default for lg screen
  const { totalWishListCount, triggerUpdateWishList } = useWishlist();

  useEffect(() => {
    // Whenever the authToken changes, update the menu
    setCurrencyMenu(getCurrencyMenu(token));
  }, [token]);

  const combinedItems = [
    ...(products ? products.slice(0, 7) : []),
    ...(categoryList ? categoryList.slice(0, 4) : []),
    ...(brands ? brands.slice(0, 4) : []),
  ];
  const [onHoverProfile, setOnHoverProfile] = useState(false);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [childCategory, setChildCategory] = useState([]);
  const [grandChildCategory, setGrandChildCategory] = useState([]);
  const [catChildTitle, setCatChildTitle] = useState("");
  const [grandChildTitle, setGrandChildTitle] = useState("");
  const divRef = useRef(null);
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev + 1) % combinedItems.length);
    } else if (e.key === "ArrowUp") {
      setSelectedIndex(
        (prev) => (prev - 1 + combinedItems.length) % combinedItems.length
      );
    }
  };

  const handleFocus = () => setIsFocused(true);

  const handlerFormSubmit = (e) => {
    e.preventDefault();
    navigate(`products?search=${searchValue}`);
  };

  const handlerSignOut = () => {
    localStorage.clear();
    setUserName("");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    setActiveCategory(null); // Reset active category when drawer is closed
  };

  const goBackToMain = () => {
    setActiveCategory(null); // Reset to main drawer
  };
  const fetchProducts = async (search) => {
    setLoader(true);
    try {
      const params = search ? { query: search } : {};
      const response = await apiClient.get(`/search`, { params });
      setBrands(response.data.brands);
      setCategoryList(response.data.categories);
      setProducts(response.data.products);
      setLoader(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoader(false);
    }
  };

  // Debounce the fetchProducts call
  const debouncedFetchProducts = useCallback(
    debounce((value) => fetchProducts(value), 300),
    []
  );

  const handlerSearchValue = (value) => {
    setSearchValue(value);
  };

  const navigateToProduct = (id, name) => {
    setSearchValue(name);
    setIsFocused(false);
    navigate(`product/${id}`);
  };

  // Function to highlight the matched text
  const highlightText = (text, search) => {
    if (!search) return text; // If no search term, return the text as is

    // Split the text into parts, keeping the search term intact
    const parts = text.split(new RegExp(`(${search})`, "gi"));

    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part // Non-highlighted part
      )
    );
  };

  useEffect(() => {
    debouncedFetchProducts(searchValue); // Call debounced fetch when searchValue changes
    return () => debouncedFetchProducts.cancel(); // Cancel debounce when component unmounts or searchValue changes
  }, [searchValue, debouncedFetchProducts]);

  useEffect(() => {
    if (isFocused) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isFocused]);

  useEffect(() => {
    const name = localStorage.getItem("username");
    if (token) {
      setIsLoggedIn(true);
      setUserName(name);
    } else {
      setIsLoggedIn(false);
    }
    triggerUpdateCart();
    triggerUpdateWishList();
    setOpenModel(false);
  }, [location.pathname]);

  useEffect(() => {
    let search = location.search ? location.search.split("=")[1] : "";
    let filterName = search.replaceAll("-", " ");
    setSearchValue(filterName);
  }, [location.search]);

  // Handle clicks outside of the div to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setIsFocused(false); // Set isFocused to false if click is outside
      }
    };
    const updateMaxIndex = () => {
      const width = window.innerWidth;

      if (width >= 1536) {
        setMaxIndex(4); // 2xl: index <= 4
      } else if (width >= 1280) {
        setMaxIndex(3); // xl: index <= 3
      } else if (width >= 1024) {
        setMaxIndex(2); // lg: index <= 2
      } else if (width >= 768) {
        setMaxIndex(1); // md: index <= 1
      } else {
        setMaxIndex(0); // sm: index <= 0
      }
    };

    updateMaxIndex(); // Set initial value
    window.addEventListener("resize", updateMaxIndex);
    // Add event listener to the document
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateMaxIndex);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  return (
    <React.Fragment>
      {openModel && !token ? (
           <React.Fragment>
           <div
             className="bg-[#000000a1] primary w-full h-[100vh] z-[999] fixed flex items-center justify-center"
             onClick={() => setOpenModel(false)}
           ></div>
           <div className="w-[375px] bg-white rounded-[10px] z-[9999] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
             <div className="bg-[#f6f8fb] border-b  border-b-[#e2e8f0] flex items-center justify-between p-5 py-3 rounded-t-[10px]">
               <span className="text-[#2E2F32] text-sm font-semibold">
                
               </span>
               <span
                 className="cursor-pointer"
                 onClick={() => setOpenModel(false)}
               >
                 <IoMdClose size={20} />
               </span>
             </div>
             <div className="px-5">
               <p className="text-sm text-[#2E2F32]  my-5">
               Delivery options and delivery speeds may vary for different
               locations
               </p>
             
               <button
                onClick={() => {
                  navigate("/login");
                  setOpenModel(false);
                }}
                className=" p-3  text-white bg-primary block text-sm rounded-md mb-7 w-full "
              >
                Sign in to update your location
              </button>
             </div>
           </div>
         </React.Fragment>
      ) : null}

      {openModel && token ? (
        <React.Fragment>
          <div
            className="bg-[#000000a1] primary w-full h-[100vh] z-[999] fixed flex items-center justify-center"
            onClick={() => setOpenModel(false)}
          ></div>
          <div className="w-[375px] bg-white rounded-[10px] z-[9999] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <div className="bg-[#f6f8fb] border-b  border-b-[#e2e8f0] flex items-center justify-between p-5 py-3 rounded-t-[10px]">
              <span className="text-[#2E2F32] text-sm font-semibold">
                Choose your delivery location
              </span>
              <span
                className="cursor-pointer"
                onClick={() => setOpenModel(false)}
              >
                <IoMdClose size={20} />
              </span>
            </div>
            <div className="px-5">
              <p className="text-sm text-[#2E2F32]  my-5">
                Delivery options and delivery speeds may vary for different
                locations
              </p>
              <div className="rounded-md border-2 border-primary px-4 py-4">
                {currentLocation ? (
                  <p className="text-black text-sm font-semibold">
                    {currentLocation.org}
                  </p>
                ) : null}
                {currentLocation ? (
                  <p className="text-[13px] text-black mt-2">
                    {currentLocation.city}, {currentLocation.zip}, {currentLocation.regionName}, {currentLocation.country}
                  </p>
                ) : null}
                <p className="text-sm text-[#64748B] mt-2">Default Address</p>
              </div>
              <Link to={token ? "registration/addresses" : "login"}>
                <p className="text-primary text-sm mt-3 mb-6 cursor-pointer">
                  Manage your addresses
                </p>
              </Link>
            </div>
          </div>
        </React.Fragment>
      ) : null}
      {window.innerWidth < 640 && (
        <div className="flex items-center bg-[#186737] p-[10px]">
          <img
            className="p-[2px] rounded-[2px]"
            src={process.env.PUBLIC_URL + "/icons/location.svg"}
            alt="Location"
          />
          <p className="text-[14px] ml-[10px] leading-[16.42px] font-semibold text-[white]">
            Deliver To :
          </p>
          {currentLocation ? (
            <span className="text-[white] text-sm ml-3">
              {currentLocation.city}, {currentLocation.country}
            </span>
          ) : (
            <span className="text-[white] text-sm ml-3">
              Fetching Location...
            </span>
          )}
        </div>
      )}
      <div className="bg-gray-200 hidden sm:block">
        <Wrapper classes="flex items-center justify-between text-sm text-gray-400 py-2">
          <p className="">
            Discover Exceptional Products and Unmatched Service.
          </p>
          <ul className="flex items-center">
            {currencyMenu
              ? currencyMenu.map((currency, index) => {
                  return (
                    <li
                      key={index}
                      className="after:content-['|'] after:mx-2 after:text-gray-700"
                    >
                      <Link to={currency.redirectUrl}>{currency.title}</Link>
                    </li>
                  );
                })
              : null}
            {/* Currency Selector  */}
            <div className="cursor-pointer relative  group h-full w-16 ">
              <div className="flex after:content-['|'] after:mx-1 after:text-gray-700 ">
                <span className="font-semibold">{selectedCurrency}</span>
                <img
                  className={`ml-1 transition-all group-hover:rotate-180`}
                  src={process.env.PUBLIC_URL + "/icons/arrow.svg"}
                  alt="arrow"
                />
              </div>
              <ul
                className={`absolute top-5 left-[-10px] w-full hidden group-hover:block bg-gray-200 rounded-md `}
              >
                {currency.map((curr, index) => {
                  return (
                    <li
                      key={index}
                      className=" px-3 border border-white text-xs"
                      onClick={() => {
                        setSelectedCurrency(curr);
                      }}
                    >
                      {curr}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Language Selector  */}
            <div className="cursor-pointer relative  group h-full w-16 ">
              <div className="flex after:mx-1 after:text-gray-700 ">
                {selectedLang === "English" ? (
                  <img
                    className="w-[20px] mr-2"
                    src={process.env.PUBLIC_URL + "/icons/english.png"}
                    alt=""
                  />
                ) : (
                  <img
                    className="w-[20px] mr-2"
                    src={process.env.PUBLIC_URL + "/icons/arabic.png"}
                    alt=""
                  />
                )}
                <span className="font-semibold">{selectedLang}</span>
                <img
                  className={`ml-1 transition-all group-hover:rotate-180`}
                  src={process.env.PUBLIC_URL + "/icons/arrow.svg"}
                  alt="arrow"
                />
              </div>
              <ul
                className={`absolute top-5 left-[-10px] w-full hidden group-hover:block bg-gray-200 rounded-md `}
              >
                {lang.map((lang, index) => {
                  return (
                    <li
                      key={index}
                      className=" px-3 border border-white text-xs"
                      onClick={() => {
                        setSelectedLang(lang);
                      }}
                    >
                      {lang}
                    </li>
                  );
                })}
              </ul>
            </div>
          </ul>
        </Wrapper>
      </div>

      {/* Main Nav*/}
      <Wrapper classes="flex items-center flex-row justify-start sm:justify-between py-5">
        {/* Drawer */}
        <div>
          {/* Main Drawer */}
          <div
            className={`fixed inset-y-0 left-0 w-[80vw] bg-white z-[1000] text-black transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out lg:hidden xl:hidden`}
          >
            {activeCategory == null ? (
              // Main Categories
              <div>
                <ul className="z-[999]">
                  <li className="text-[14px] font-light border-b-[1px] text-[black] cursor-pointer">
                    <p className="p-4 bg-[#186737] text-[20px] leading-[23.46px] font-normal text-white">
                      Main Menu
                    </p>
                  </li>
                  {categories?.map((item, index) => {
                    return (
                      <li
                        key={item.id}
                        onClick={() => {
                          if (item?.children?.length > 0) {
                            setChildCategory(item?.children);
                            setActiveCategory(1);
                            setCatChildTitle(item?.name);
                          } else {
                            navigate(`/collections/${item.slug}`);
                            setIsOpen(false);
                          }
                        }}
                        className="hover:bg-[#0171dc] border-b-[1px] text-[black] cursor-pointer"
                      >
                        <div
                          key={index}
                          className="flex items-center justify-between p-4"
                        >
                          <p className="text-[16px] leading-[18.77px] text-[#186737]">
                            {item?.name}
                          </p>
                          {item?.children?.length > 0 && (
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/icons/arrow-right.png"
                              }
                            />
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : activeCategory == 1 ? (
              // Subcategories Drawer
              <div>
                <div className="text-[14px] bg-[#186737] font-light border-b-[1px] text-[black] hover:rounded cursor-pointer">
                  <button
                    className="p-4 bg-[#186737] text-[20px] leading-[23.46px] font-normal text-white"
                    onClick={goBackToMain}
                  >
                    ← Back
                  </button>
                </div>
                <p className="text-[16px] p-4 border-b-2 font-bold leading-[18.77px] text-[#186737]">
                  {catChildTitle}
                </p>
                <ul className="">
                  {childCategory?.map((item, index) => {
         

                    return (
                      <li
                        onClick={() => {
                          setGrandChildCategory(item?.children);
                          setActiveCategory(2);
                          setGrandChildTitle(item?.name);
                        }}
                        className=" border-b-[1px] text-[black] cursor-pointer"
                      >
                        <div
                          key={index}
                          className="flex items-center justify-between p-4"
                        >
                          <p className="text-[16px] leading-[18.77px] text-[#186737]">
                            {item?.name}
                          </p>
                          {item?.children?.length > 0 && (
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/icons/arrow-right.png"
                              }
                            />
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : activeCategory == 2 ? (
              // Subcategories Drawer
              <div>
                <div className="text-[14px] bg-[#186737] font-light border-b-[1px] text-[black] hover:rounded cursor-pointer">
                  <button
                    className="p-4 bg-[#186737] text-[20px] leading-[23.46px] font-normal text-white"
                    onClick={() => setActiveCategory(1)}
                  >
                    ← Back
                  </button>
                </div>
                <p className="text-[16px] p-4 border-b font-bold leading-[18.77px] text-[#186737]">
                  {grandChildTitle}
                </p>
                <ul className="">
                  {grandChildCategory?.map((item, index) => {
                    return (
                      <li className=" border-b-[1px] text-[black] cursor-pointer">
                        <div
                          key={index}
                          onClick={() => {
                            navigate(`/collections/${item.slug}`);
                            setIsOpen(false);
                          }}
                          className="flex items-center justify-between p-4"
                        >
                          <p className="text-[16px] leading-[18.77px] text-[#186737]">
                            {item?.name}
                          </p>
                          {item?.children?.length > 0 && (
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/icons/arrow-right.png"
                              }
                            />
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>

          {/* Backdrop */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black z-[999] bg-opacity-50 lg:hidden xl:hidden"
              onClick={toggleDrawer}
            />
          )}
        </div>
        <div className={window.innerWidth < 640 ? "mr-[15%]" : "ml-[0]"}>
          <Link to="/home">
            <img
              onClick={toggleDrawer}
              src={process.env.PUBLIC_URL + "/icons/Drawer.png"}
              alt="Horeca Store"
              className="block sm:hidden"
            />
          </Link>
        </div>
        <Link to="/home">
          <img
            className="ml-[40px] sm:ml-[0px]"
            src={process.env.PUBLIC_URL + "/images/logo.png"}
            alt="Horeca Store"
          />
        </Link>

        {/* Location Search Bar  */}
        <div
          className="cursor-pointer relative w-[12.8rem]  flex items-center border border-gray-300 rounded-full h-12 px-3 ml-14 hidden sm:flex"
          onClick={() => setOpenModel(true)}
        >
          <img
            src={process.env.PUBLIC_URL + "/icons/location.svg"}
            alt="Location"
          />
          {currentLocation ? (
            <span className="text-[#64748B] text-sm ml-3 address">
            {currentLocation.city}, {currentLocation.zip}, {currentLocation.regionName}, {currentLocation.country}
            </span>
          ) : (
            <span className="text-[#64748B] text-sm ml-3">
              Fetching Location...
            </span>
          )}
          <img
            className="absolute right-3"
            src={process.env.PUBLIC_URL + "/icons/arrow.svg"}
            alt="arrow"
          />
        </div>

        {/* Search Option Button */}
        <div className="w-[50%] rounded-full border border-gray-300  relative ml-2 hidden sm:block">
          <form
            className="flex items-center h-12"
            onSubmit={(e) => handlerFormSubmit(e)}
          >
            <span className="ml-2 text-primary text-base px-5">All</span>
            <input
              type="text"
              className="h-full w-full border-l border-r-gray-300 px-3 text-base text-[#64748B] outline-none"
              placeholder="I'm shopping for..."
              // value={searchValue}
              onChange={(e) => handlerSearchValue(e.target.value)}
              onFocus={handleFocus}
            />
            <button type="submit" className="bg-primary p-2 rounded-full mr-2">
              <CiSearch color="white" size={26} />
            </button>
          </form>

          {isFocused && (products || categoryList || brands) ? (
            <div
              ref={divRef}
              className="max-h-[700px] rounded-lg absolute w-full z-[999] mt-3"
            >
              {products && products.length > 0 && (
                <div className="flex border-b-2 border-b-[#e2e8f0] rounded-lg bg-[#f6f8fb]">
                  <div className="basis-1/4 py-4 px-3 text-primary font-semibold text-base border-r-2 border-r-[#e2e8f0]">
                    Products
                  </div>
                  <div className="basis-3/4 py-4 px-3 bg-white">
                    {products.slice(0, 7).map((prod, index) => (
                      <div
                        onClick={() => navigateToProduct(prod.id, prod.name)}
                        key={prod.id}
                        className={`flex p-2 ${
                          selectedIndex === index
                            ? "bg-[#def9ec]"
                            : "hover:bg-[#def9ec]"
                        }`}
                      >
                        <div>
                          <img
                            className="max-w-[40px]"
                            src={`${prod.image}`}
                            alt={prod.name}
                          />
                        </div>
                        <div className="ml-3">
                          <span className="line-clamp-1 text-[#2E2F32] font-semibold text-[14px]">
                            {highlightText(prod.name, searchValue)}
                          </span>
                          <span className="text-[#64748B] text-sm">
                            SAR {prod.sale_price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {categoryList && categoryList.length > 0 && (
                <div className="flex border-b-2 border-b-[#e2e8f0] rounded-lg bg-[#f6f8fb]">
                  <div className="basis-1/4 py-4 px-3 text-primary font-semibold text-base border-r-2 border-r-[#e2e8f0]">
                    Categories
                  </div>
                  <div className="basis-3/4 py-4 px-3 bg-white">
                    {categoryList.slice(0, 4).map((cat, index) => (
                      <Link
                        to={`/collections/${cat.slug}`}
                        key={cat.id}
                        className={`flex p-2 ${
                          selectedIndex === index + products.length
                            ? "bg-[#def9ec]"
                            : "hover:bg-[#def9ec]"
                        }`}
                      >
                        <span className="line-clamp-1 text-[#64748B] font-semibold text-base">
                          {cat.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {brands && brands.length > 0 && (
                <div className="flex  border-[#e2e8f0] rounded-lg bg-[#f6f8fb]">
                  <div className="basis-1/4 py-4 px-3 text-primary font-semibold border-r-2 text-base">
                    Brands
                  </div>
                  <div className="basis-3/4 py-4 px-3 bg-white">
                    {brands.slice(0, 4).map((brand, index) => (
                      <Link
                        to={`/collections/${brand.id}`}
                        key={brand.id}
                        className={`flex p-2 ${
                          selectedIndex ===
                          index + products.length + categoryList.length
                            ? "bg-[#def9ec]"
                            : "hover:bg-[#def9ec]"
                        }`}
                      >
                        <span className="line-clamp-1 text-[#64748B] font-semibold text-base">
                          {brand.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            isFocused && (
              <div className="max-h-[300px] rounded-lg absolute w-full z-[999] mt-3">
                No Product Found...
              </div>
            )
          )}
        </div>

        <div className="flex flex-row  items-center justify-evenly ml-[10%] sm:ml-6  sm:mr-2  sm:min-w-[125px] ">
          {/* <div className="relative mx-2 hidden sm:flex">
            <img src={process.env.PUBLIC_URL + "/icons/graph.svg"} alt="" />
            <span className="absolute bottom-[-10px] right-[-6px] text-white bg-primary size-[22px] flex items-center justify-center text-sm rounded-full">
              0
            </span>
          </div> */}

          <div
            className="relative mx-2 hidden sm:flex cursor-pointer"
            onClick={() => navigate("/wishlist")}
          >
            <img
              src={process.env.PUBLIC_URL + "/icons/heart.svg"}
              alt="wishlist"
            />
            <span className="absolute bottom-[-10px] right-[-6px] text-white bg-primary size-[22px] flex items-center justify-center text-sm rounded-full">
              {totalWishListCount}
            </span>
          </div>
          <div
            className="relative mx-2 cursor-pointer"
            onClick={() => navigate("/checkout")}
          >
            <img src={process.env.PUBLIC_URL + "/icons/cart.svg"} alt="" />
            <span className="absolute bottom-[-10px] right-[-6px] text-white bg-primary size-[22px] flex items-center justify-center text-sm rounded-full">
              {totalCartCount}
            </span>
          </div>
        </div>
        <div className="flex flex-row">
          <img
            onMouseEnter={() => {
              window?.innerWidth > 640
                ? setOnHoverProfile(true)
                : setShowProfileDrawer(true);
            }}
            src={process.env.PUBLIC_URL + "/icons/user.svg"}
            alt=""
            className="w-[35px] rounded-full cursor-pointer"
            onClick={() => {
              window?.innerWidth > 640
                ? navigate("/registration/all-orders")
                : setShowProfileDrawer(!showProfileDrawer);
            }}
          />
          <div className="flex hidden sm:flex flex-col ml-2 ">
            {isLoggedIn ? (
              <span
                onClick={() => {
                  handlerSignOut();
                }}
                className="cursor-pointer text-[11px] text-gray-700"
              >
                Sign out
              </span>
            ) : (
              <Link to="/login" className="text-[11px] text-gray-700">
                Login
              </Link>
            )}
            {isLoggedIn ? (
              <span
                to=""
                onClick={() => navigate("registration/all-orders")}
                className="text-black text-sm font-semibold capitalize cursor-pointer"
              >
                {userName}
              </span>
            ) : (
              <Link to="/sign-up" className="text-black text-sm font-semibold">
                Register
              </Link>
            )}
          </div>
        </div>
      </Wrapper>
      {onHoverProfile && (
        <div
          onMouseEnter={() => setOnHoverProfile(true)}
          onMouseLeave={() => {
            window?.innerWidth > 640
              ? setOnHoverProfile(false)
              : setShowProfileDrawer(false);
          }}
          style={{ zIndex: 1000 }}
          className="hidden sm:grid  grid grid-cols-1 sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12 bg-[white] absolute z-1000 overflow-hidden w-[80vw] border-2 shadow-md m-[10px] ml-[12%] mt-[-20px] rounded-[10px] h-[714px] overflow-x-auto overflow-y-auto"
        >
          <div className="col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-3 p-4  border-r-2 mr-[20px]">
            <h1 className="text-[16px] leading-[16px] font-semibold">
              Reorder In One Click
            </h1>
            <h2 className="text-[14px] mb-[10px] text-[#186737] mt-[5px] leading-[16px] font-normal">
              View All & Manage
            </h2>
            <div className="flex py-[10px]">
              <img
                className="h-[90px] w-[90px] rounded-[4px] mr-[10px]"
                src="https://images.pexels.com/photos/2299028/pexels-photo-2299028.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
              <div className="flex-col">
                <p className="text-[14px] leading-[16.42px]">
                  Lorem ipsum dolor sit amet consectetur, amet consectetur
                </p>
                <p className="text-[16px] leading-[18.77px] mt-[5px]">
                  SAR : 550.0
                </p>
                <button className="flex items-center justify-center text-[white] mt-[5px] rounded-[4px] h-[28px] bg-[#186737] p-[10px] ">
                  Re Order
                </button>
              </div>
            </div>
            <div className="flex py-[10px]">
              <img
                className="h-[90px] w-[90px] rounded-[4px] mr-[10px]"
                src="https://images.pexels.com/photos/2299028/pexels-photo-2299028.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
              <div className="flex-col">
                <p className="text-[14px] leading-[16.42px]">
                  Lorem ipsum dolor sit amet consectetur, amet consectetur
                </p>
                <p className="text-[16px] leading-[18.77px] mt-[5px]">
                  SAR : 550.0
                </p>
                <button className="flex items-center justify-center text-[white] mt-[5px] rounded-[4px] h-[28px] bg-[#186737] p-[10px] ">
                  Re Order
                </button>
              </div>
            </div>
            <div className="flex py-[10px]">
              <img
                className="h-[90px] w-[90px] rounded-[4px] mr-[10px]"
                src="https://images.pexels.com/photos/2299028/pexels-photo-2299028.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
              <div className="flex-col">
                <p className="text-[14px] leading-[16.42px]">
                  Lorem ipsum dolor sit amet consectetur, amet consectetur
                </p>
                <p className="text-[16px] leading-[18.77px] mt-[5px]">
                  SAR : 550.0
                </p>
                <button className="flex items-center justify-center text-[white] mt-[5px] rounded-[4px] h-[28px] bg-[#186737] p-[10px] ">
                  Re Order
                </button>
              </div>
            </div>
            <div className="flex py-[10px]">
              <img
                className="h-[90px] w-[90px] rounded-[4px] mr-[10px]"
                src="https://images.pexels.com/photos/2299028/pexels-photo-2299028.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
              <div className="flex-col">
                <p className="text-[14px] leading-[16.42px]">
                  Lorem ipsum dolor sit amet consectetur, amet consectetur
                </p>
                <p className="text-[16px] leading-[18.77px] mt-[5px]">
                  SAR : 550.0
                </p>
                <button className="flex items-center justify-center text-[white] mt-[5px] rounded-[4px] h-[28px] bg-[#186737] p-[10px] ">
                  Re Order
                </button>
              </div>
            </div>
            <div className="flex py-[10px]">
              <img
                className="h-[90px] w-[90px] rounded-[4px] mr-[10px]"
                src="https://images.pexels.com/photos/2299028/pexels-photo-2299028.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
              <div className="flex-col">
                <p className="text-[14px] leading-[16.42px]">
                  Lorem ipsum dolor sit amet consectetur, amet consectetur
                </p>
                <p className="text-[16px] leading-[18.77px] mt-[5px]">
                  SAR : 550.0
                </p>
                <button className="flex items-center justify-center text-[white] mt-[5px] rounded-[4px] h-[28px] bg-[#186737] p-[10px] ">
                  Re Order
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-3 p-4 border-r-2 mr-[20px] ">
            <h1 className="text-[16px] leading-[16px] font-semibold">
              Track Your Order
            </h1>
            <Link to={token ? "registration/all-orders" : "login"}>
              <h2 className="text-[14px] mb-[10px] text-[#186737] mt-[5px] leading-[16px] font-normal">
                View All & Manage
              </h2>
            </Link>
            <div className="flex py-[10px]">
              <img
                className="h-[90px] w-[90px] rounded-[4px] mr-[10px]"
                src="https://images.pexels.com/photos/2299028/pexels-photo-2299028.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
              <div className="flex-col">
                <p className="text-[14px] leading-[16.42px] mt-[10px]">
                  Lorem ipsum dolor sit amet consectetur, amet consectetur
                </p>
                <p className="text-[12px] leading-[14.08px] font-normal mt-[8px]">
                  Status : Dispatch
                </p>
                <p className="text-[12px] text-[#186737] font-normal leading-[14.08px] mt-[8px]">
                  Tomorrow, Sunday, 6 Oct
                </p>
              </div>
            </div>
            <div className="flex py-[10px]">
              <img
                className="h-[90px] w-[90px] rounded-[4px] mr-[10px]"
                src="https://images.pexels.com/photos/2299028/pexels-photo-2299028.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
              <div className="flex-col">
                <p className="text-[14px] leading-[16.42px] mt-[10px]">
                  Lorem ipsum dolor sit amet consectetur, amet consectetur
                </p>
                <p className="text-[12px] leading-[14.08px] font-normal mt-[8px]">
                  Status : Dispatch
                </p>
                <p className="text-[12px] text-[#186737] font-normal leading-[14.08px] mt-[8px]">
                  Tomorrow, Sunday, 6 Oct
                </p>
              </div>
            </div>
            <div className="flex py-[10px]">
              <img
                className="h-[90px] w-[90px] rounded-[4px] mr-[10px]"
                src="https://images.pexels.com/photos/2299028/pexels-photo-2299028.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
              <div className="flex-col">
                <p className="text-[14px] leading-[16.42px] mt-[10px]">
                  Lorem ipsum dolor sit amet consectetur, amet consectetur
                </p>
                <p className="text-[12px] leading-[14.08px] font-normal mt-[8px]">
                  Status : Dispatch
                </p>
                <p className="text-[12px] text-[#186737] font-normal leading-[14.08px] mt-[8px]">
                  Tomorrow, Sunday, 6 Oct
                </p>
              </div>
            </div>
            <div className="flex py-[10px]">
              <img
                className="h-[90px] w-[90px] rounded-[4px] mr-[10px]"
                src="https://images.pexels.com/photos/2299028/pexels-photo-2299028.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
              <div className="flex-col">
                <p className="text-[14px] leading-[16.42px] mt-[10px]">
                  Lorem ipsum dolor sit amet consectetur, amet consectetur
                </p>
                <p className="text-[12px] leading-[14.08px] font-normal mt-[8px]">
                  Status : Dispatch
                </p>
                <p className="text-[12px] text-[#186737] font-normal leading-[14.08px] mt-[8px]">
                  Tomorrow, Sunday, 6 Oct
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-1 sm:col-span-2 md:col-span-12 lg:col-span-6     p-5">
            {/* <SidebarProfile/> */}
            <div className="flex items-center p-5 border-b-2 justify-between">
              <p className="text-[16px] leading-[18.77px]">Account</p>
              <p className="text-[13px] leading-[15.75px]">
                Your info at a glance
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="bg-[#DEF9EC] py-3 hidden sm:flex">
        <Wrapper classes="flex flex-row items-center justify-between">
          <div className="flex group relative group/cat1 mr-3  items-center justify-between w-full">
            <div
              className="flex flex-row items-center justify-center mr-3 cursor-pointer"
              ref={ref}
              {...anchorProps}
            >
              <img
                src={process.env.PUBLIC_URL + "/icons/category.svg"}
                alt=""
              />
              <span className="font-bold text-lg text-primary ml-2">
                Shop By Categories
              </span>
              <img
                className="ml-1  size-5 mt-[2px]"
                src={process.env.PUBLIC_URL + "/icons/arrow.svg"}
                alt=""
              />
            </div>
            <div className="w-[80%] flex flex-row items-center justify-between">
              {categories
                ? categories.map((cat, index) => {
                    return (
                      <React.Fragment key={index}>
                        {index <= maxIndex && (
                          <Link
                            className="text-base text-primary mx-2"
                            to={`/collections/${cat.slug}`}
                          >
                            {cat.name}
                          </Link>
                        )}
                        {index === 7 && (
                          <Link
                            className="text-base text-primary mx-2 font-bold"
                            to="/collections/deal-of-a-days"
                          >
                            Deal of the day
                          </Link>
                        )}
                      </React.Fragment>
                    );
                  })
                : null}
            </div>
            <ControlledMenu
              {...hoverProps}
              {...menuState}
              anchorRef={ref}
              onClose={() => toggle(false)}
              className="desktop__menu relative flex-col"
            >
              {categories.map((cat1, index) => {
                if (cat1.children.length > 0) {
                  const totalItems = cat1.children.length;
                  // Calculate base items per column and remaining items
                  const baseItemsPerColumn = Math.floor(totalItems / 3);
                  const extraItems = totalItems % 3;
                  // const extraItems = totalItems === 6 ? totalItems % 2 : totalItems % 3;
                  // Initialize the columns array
                  const columns = [[], [], []];
                  // Track the current index of subcategories
                  let currentIndex = 0;

                  // Distribute extra items across columns first
                  for (let i = 0; i < 3; i++) {
                    const itemsToAdd =
                      baseItemsPerColumn + (i < extraItems ? 1 : 0);
                    columns[i] = cat1.children.slice(
                      currentIndex,
                      currentIndex + itemsToAdd
                    );
                    currentIndex += itemsToAdd;
                  }
                  return (
                    <SubMenu
                      key={index}
                      label={
                        <span
                          className="w-full h-full block"
                          onClick={() => {
                            navigate(`/collections/${cat1.slug}`);
                          }}
                        >
                          {cat1.name}
                        </span>
                      }
                    >
                      <div className="grid grid-cols-3 w-[1100px] h-[600px] absolute overflow-y-auto px-10 py-1 gap-x-8 bg-[#def9ec]">
                        {columns.map((column, colIndex) => (
                          <div key={colIndex} className="col-span-1">
                            <ul>
                              {column.map((cat2, index2) => (
                                <React.Fragment key={cat2.name + index2}>
                                  {cat2.children.length > 0 ? (
                                    <React.Fragment>
                                      <Link to={"/collections/" + cat2.slug}>
                                        <li className="font-semibold mb-4 mt-5 text-base">
                                          {cat2.name}
                                        </li>
                                      </Link>
                                      {cat2.children &&
                                        cat2.children.map((cat3, index3) => (
                                          <Link
                                            to={"/collections/" + cat3.slug}
                                            key={cat3.name + index3}
                                          >
                                            <li className="mt-4 text-base text-gray-700">
                                              {cat3.name}
                                            </li>
                                          </Link>
                                        ))}
                                    </React.Fragment>
                                  ) : null}
                                </React.Fragment>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </SubMenu>
                  );
                } else {
                  return (
                    <Link to={`/collections/${cat1.slug}`} key={cat1.name}>
                      <MenuItem>{cat1.name}</MenuItem>
                    </Link>
                  );
                }
              })}
            </ControlledMenu>
          </div>
        </Wrapper>
      </div>
      <div className="w-[94%] m-auto rounded-[5px] sm:rounded-full border  border-gray-300 relative block sm:hidden">
        <form
          className="flex items-center h-10"
          onSubmit={(e) => handlerFormSubmit(e)}
        >
          <span className="ml-2 text-primary text-base px-5">All</span>
          <input
            type="text"
            className="h-full w-full border-l border-r-gray-300 px-3 text-base text-[#64748B] outline-none"
            placeholder="I'm shopping for..."
            value={searchValue}
            onChange={(e) => handlerSearchValue(e.target.value)}
            onFocus={handleFocus}
            //  onBlur={handleBlur}
          />
          <button
            type="submit"
            className="bg-primary p-2 rounded-[5px] sm:rounded-full mr-1"
          >
            <CiSearch color="white" size={18} />
          </button>
        </form>

        {isFocused && (products || categoryList || brands) ? (
          <div className="max-h-[700px] rounded-lg absolute w-full z-[999] mt-3">
            {products && products.length > 0 && (
              <div className="flex border-b-2 border-b-[#e2e8f0] rounded-lg bg-[#f6f8fb]">
                <div className="basis-1/4 py-4 px-3 text-primary font-semibold text-base border-r-2 border-r-[#e2e8f0]">
                  Products
                </div>
                <div className="basis-3/4 py-4 px-3 bg-white">
                  {products.slice(0, 7).map((prod, index) => (
                    <Link
                      to={`product/${prod.id}`}
                      key={prod.id}
                      className={`flex p-2 ${
                        selectedIndex === index
                          ? "bg-[#def9ec]"
                          : "hover:bg-[#def9ec]"
                      }`}
                    >
                      <div>
                        <img
                          className="max-w-[40px]"
                          src={`${prod.image}`}
                          alt={prod.name}
                        />
                      </div>
                      <div className="ml-3">
                        <span className="line-clamp-1 text-[#2E2F32] font-semibold text-[14px]">
                          {prod.name}
                        </span>
                        <span className="text-[#64748B] text-sm">
                          SAR {prod.sale_price}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {categoryList && categoryList.length > 0 && (
              <div className="flex border-b-2 border-b-[#e2e8f0] rounded-lg bg-[#f6f8fb]">
                <div className="basis-1/4 py-4 px-3 text-primary font-semibold text-base border-r-2 border-r-[#e2e8f0]">
                  Categories
                </div>
                <div className="basis-3/4 py-4 px-3 bg-white">
                  {categoryList.slice(0, 4).map((cat, index) => (
                    <Link
                      to={`/collections/${cat.slug}`}
                      key={cat.id}
                      className={`flex p-2 ${
                        selectedIndex === index + products.length
                          ? "bg-[#def9ec]"
                          : "hover:bg-[#def9ec]"
                      }`}
                    >
                      <span className="line-clamp-1 text-[#64748B] font-semibold text-base">
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {brands && brands.length > 0 && (
              <div className="flex  border-[#e2e8f0] rounded-lg bg-[#f6f8fb]">
                <div className="basis-1/4 py-4 px-3 text-primary font-semibold border-r-2 text-base">
                  Brands
                </div>
                <div className="basis-3/4 py-4 px-3 bg-white">
                  {brands.slice(0, 4).map((brand, index) => (
                    <Link
                      to={`/collections/${brand.id}`}
                      key={brand.id}
                      className={`flex p-2 ${
                        selectedIndex ===
                        index + products.length + categoryList.length
                          ? "bg-[#def9ec]"
                          : "hover:bg-[#def9ec]"
                      }`}
                    >
                      <span className="line-clamp-1 text-[#64748B] font-semibold text-base">
                        {brand.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          isFocused && (
            <div className="max-h-[300px] rounded-lg absolute w-full z-[999] mt-3">
              No Product Found...
            </div>
          )
        )}
      </div>
      {showProfileDrawer && (
        <div>
          <ProfileDrawer />
        </div>
      )}
    </React.Fragment>
  );
};

export default React.memo(Navigation);
