import React, { useState, useRef, useEffect } from "react";
import { Wrapper } from "../shared/Wrapper";
import { Breadcrumb } from "../shared/Breadcrumb";
// import { frequentlyBought, productDetails, recomendProduct } from "../data/productDetails";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FiMinus, FiPlus } from "react-icons/fi";
import Slider from "react-slick";
import { Rating } from "../shared/Rating";
import { BsPlusLg } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import { VscGraph } from "react-icons/vsc";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { ReviewSection } from "../shared/ReviewSection";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Md3dRotation } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { TbRotate360 } from "react-icons/tb";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { apiClient } from "../utils/apiWrapper";
import { SameProducts } from "../shared/ProductDetails/SameProduct";
import { CompareProducts } from "../shared/ProductDetails/CompareProducts";
import { CartButton } from "../shared/CartButton";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useLocalCartCount } from "../context/LocalCartCount";
import { toast } from "react-toastify";
import Documents from "../components/Documents";
function Model({ url, onLoaded }) {
  const { scene, isLoading } = useGLTF(url);

  useEffect(() => {
    if (!isLoading) {
      onLoaded();
    }
  }, [isLoading, onLoaded]);

  return <primitive object={scene} />;
}

  const ProductDetail = () => {
  const { id } = useParams(); // Access the id from the URL
  const [seeMore, setSeeMore] = useState(true);
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  // const slider1 = useRef();
  // const slider2 = useRef();
  const [openTab, setOpenTab] = useState(null);
  const [autoplay, setAutoplay] = useState(false);
  const sliderRef = useRef();
  // const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0); // Track active slide
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDesc, setSelectedDesc] = useState(1);
  const [threeDView, setThreeDView] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [loader, setLoader] = useState(true);
  const [cameraPosition, setCameraPosition] = useState([0, 0, 500]); // Set a better initial camera position
  const [apiLoader, setApiLoader] = useState(true);
  const [product, setProduct] = useState([]);
  const [productLoader, setProductLoader] = useState(true);
  const [selectedDetail, setSelectedDetail] = useState(1);
  const [buyMore, setBuyMore] = useState([]);
  const { triggerUpdateCart } = useCart();
  const [sameProductLoader, setSameProductLoader] = useState(false);
  const [compareProductFields, setCompareProductsFields] = useState([]);
  const [selectedBuyMore, setSelectedBuyMore] = useState();
  const [maxBuyMoreSaveMore, setMaxBuyMoreSaveMore] = useState();
  const [variants, setVariants] = useState([]);
  const [mediaArray, setMediaArray] = useState([]);
  const [showCountButton, setShowCountButton] = useState(false);
  const handleModelLoaded = () => {
    setLoader(false);
  };

  const price = product.sale_price
    ? parseFloat(product.sale_price).toFixed(2)
    : parseFloat(product.front_sale_price).toFixed(2);

  // Split the price into integer and decimal parts
  const [integerPart, decimalPart] = price.split(".");

  const productDetailsBreadCrumb = [
    {
      url: "/",
      title: "Home",
    },
    {
      url: "/product",
      title: "Products",
    },
    {
      title: product ? product.name : "",
    },
  ];

  const fetchProductById = async () => {
    const authToken = localStorage.getItem("authToken");
    setLoader(true);
    try {
      const response = await apiClient.get(
        `${authToken ? "/products" : "/products-guest"}`,
        {
          params: { id },
        }
      );

      setProduct(response?.data?.data?.data[0]);
      let temp = [];
      response?.data?.data?.data[0].specifications.map((item) => {
        temp.push(item.spec_name);
      });
      setVariants(response?.data?.data?.data[0]?.sameBrandSkuProducts);
      temp.sort();
      setCompareProductsFields(temp);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoader(false);
    }
  };

  const fetchProductDiscounts = async () => {
    setProductLoader(true);
    const params = {
      product_id: id,
    };

    try {
      const response = await apiClient.get("/product-discounts", params);

      setBuyMore(response?.data?.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setProductLoader(false);
    }
  };

  const postRecentlyViewed = async () => {
    try {
      const response = await apiClient.post("/recently-viewed", {
        product_id: id,
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setProductLoader(false);
    }
  };
  useEffect(() => {
    postRecentlyViewed();
    setProductLoader(true);
    fetchProductById();
    fetchProductDiscounts();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev); // Toggle visibility
    }, 1500); // Every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling effect
    });
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  const handlerSendWhatsapp = () => {
    const message = `Check out this product: \n${
      product.name
    }\nOriginal Price: ${product.original_price}\nSale Price: ${
      product.sale_price
    }\nLink: ${process.env.PUBLIC_URL + "products/" + product.id}\nImage: ${
      product.images[0]
    }`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  const handlerSendEmail = () => {
    const emailSubject = `Check out this amazing product: ${product.name}`;

    const emailBody = `
    Hi there,
    
    I wanted to share this great product with you:

    ${product.name}
    
    You can check it out here: ${
      process.env.PUBLIC_URL + "product/" + product.id
    }
    
    ${product.sale_price ? `Sale Price: $${product.sale_price}` : ""}
    ${
      product.original_price && !product.sale_price
        ? `Original Price: $${product.original_price}`
        : ""
    }
    
    ${
      product.sale_price && product.original_price
        ? `Original Price: $${product.original_price} (Now: $${product.sale_price})`
        : ""
    }
    
    Check out the product image here: ${product.images[0]}
    
    Best regards
  `;

    const encodedSubject = encodeURIComponent(emailSubject);
    const encodedBody = encodeURIComponent(emailBody);

    // Open the default email client with a mailto link via window.open
    const mailtoLink = `mailto:?subject=${encodedSubject}&body=${encodedBody}`;

    // Use window.open() to open the mail client
    window.open(mailtoLink, "_blank");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: autoplay,
    autoplaySpeed: 1000,
    cssEase: "linear",
  };

  const mainSliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    asNavFor: nav2,
    fade: false,
    infinite:
      product && product.images && product.images.length < 4 ? false : true,
    afterChange: (current) => setActiveSlide(current), // Update active slide index
  };

  const handlePrev = () => {
    nav1.slickPrev();
  };

  const handleNext = () => {
    nav1.slickNext();
  };

  const thumbnailSliderSettings = {
    slidesToShow:
      product && product.images && product.images.length < 4
        ? product.images.length
        : 8,
    // slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: nav1,
    dots: false,
    arrows: true,
    focusOnSelect: true,
    infinite:
      product && product.images && product.images.length < 4 ? false : true,
    // infinite: true,

    swipeToSlide: true,
  };

  const PRODUCT_DETAIL = [
    {
      id: 1,
      title: "Product Description",
    },
    {
      id: 2,
      title: "Technical Information",
    },
    {
      id: 3,
      title: "Warranty Information",
    },
    {
      id: 4,
      title: "Shipping Policy",
    },
    {
      id: 5,
      title: "Refund & Return",
    },
  ];
  const handlerAddItems = async (id) => {
    const authToken = localStorage.getItem("authToken");
    try {
      setSameProductLoader(true);
      const response = await apiClient.post(
        `/cart${authToken ? "" : "/guest"}`,
        { product_id: id, quantity: 1 }
      );
      triggerUpdateCart();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSameProductLoader(false);
    }
  };

  useEffect(() => {
    if (!!product && product.images) {
      if (product.video_path) {
        setMediaArray([...product.images, ...JSON.parse(product.video_path)]);
      } else {
        setMediaArray(product.images);
      }
    }
  }, [product]);

  // Function to check if an item is an image
  const isImage = (filename) => {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];
    return imageExtensions.some((ext) =>
      filename?.toLowerCase()?.endsWith(ext)
    );
  };

  return (
    <Wrapper>
      {product ? (
        <React.Fragment>
          {!productLoader ? (
            <Breadcrumb items={productDetailsBreadCrumb} classes={"mt-7"} />
          ) : (
            <Skeleton className="mt-7" width="30%" height="30px" count={1} />
          )}
          <div className="grid grid-cols-12 gap-x-8 ">
            <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-9 xl:col-span-9">
              <div className="grid grid-cols-12 md:grid-cols-12 lg:grid-cols-12 gap-6">
                {/*  product images */}
                <div className="col-span-12 md:col-span-12  lg:col-span-6 mt-4">
                  <div className="mx-auto">
                    <div className="product-slider-container">
                      <div className="flex flex-col items-center w-full">
                        <div className="flex flex-col items-center w-full">
                          <div className="w-full relative">
                            {!threeDView ? (
                              <React.Fragment>
                                {!productLoader &&
                                product.images &&
                                product.images.length > 2 ? (
                                  <React.Fragment>
                                    <span
                                      onClick={handlePrev}
                                      className="absolute top-1/2 left-5 transform -translate-y-1/2 z-[9999] bg-white rounded-full p-2 text-white flex items-center justify-center cursor-pointer"
                                    >
                                      <IoIosArrowBack
                                        color="#666666"
                                        size="18"
                                      />
                                    </span>
                                    <span
                                      onClick={handleNext}
                                      className="absolute top-1/2 right-5 transform -translate-y-1/2 z-[9999] bg-white rounded-full p-2 text-white flex items-center justify-center cursor-pointer"
                                    >
                                      <IoIosArrowForward
                                        color="#666666"
                                        size="18"
                                      />
                                    </span>
                                  </React.Fragment>
                                ) : null}

                                {!productLoader ? (
                                  <Slider
                                    {...mainSliderSettings}
                                    ref={(slider1) => setNav1(slider1)}
                                    className="product__slide h-[392px] sm:h-[100%]"
                                  >
                                    {mediaArray
                                      ? mediaArray.map((item, index) => (
                                          <React.Fragment key={index}>
                                            <div className="flex justify-center relative">
                                              {isImage(item) ? (
                                                <>
                                                  {/* Hide 3d button for the first phase */}
                                                  <div
                                                    className="hidden absolute right-4 top-4 bg-primary text-white flex items-center justify-center rounded-full p-2 cursor-pointer"
                                                    onClick={() =>
                                                      setThreeDView(true)
                                                    }
                                                  >
                                                    <Md3dRotation size={24} />
                                                  </div>
                                                  <img
                                                    src={item}
                                                    alt={`Slide ${index}`}
                                                    className="w-full h-[392px] sm:h-[100%] h-auto object-contain rounded-lg"
                                                  />
                                                </>
                                              ) : (
                                                <video
                                                  width="100%"
                                                  controls
                                                  ref={videoRef}
                                                  autoPlay={false}
                                                  muted={true}
                                                  loop={true}
                                                  className="w-full  object-contain rounded-lg"
                                                  style={
                                                    window.innerWidth < 630
                                                      ? { height: "350px" }
                                                      : { height: "565px" }
                                                  }
                                                >
                                                  <source
                                                    src={item}
                                                    type="video/mp4"
                                                  />
                                                  Your browser does not support
                                                  the video tag.
                                                </video>
                                              )}
                                            </div>
                                          </React.Fragment>
                                        ))
                                      : null}
                                  </Slider>
                                ) : (
                                  <Skeleton
                                    count={1}
                                    className="h-[600px] w-full"
                                  />
                                )}
                              </React.Fragment>
                            ) : (
                              <React.Fragment>
                                {loader ? (
                                  <React.Fragment>
                                    <div className="h-full w-full min-h-[500px] flex items-center justify-center">
                                      <div className="spinner">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                      </div>
                                    </div>
                                  </React.Fragment>
                                ) : (
                                  <React.Fragment>
                                    {/* hidden for the 3d view */}
                                    <div className="hidden relative">
                                      <div
                                        className="absolute top-4 right-4 z-[50] p-2 bg-primary text-white rounded-full cursor-pointer"
                                        onClick={() => setThreeDView(false)}
                                      >
                                        <AiOutlineProduct size={24} />
                                      </div>
                                      <div
                                        className={`absolute top-16 right-4 p-2 z-[50] bg-primary text-white rounded-full cursor-pointer ${
                                          autoRotate ? "opacity-50" : ""
                                        } `}
                                        onClick={() =>
                                          setAutoRotate(!autoRotate)
                                        }
                                      >
                                        <TbRotate360 size={24} />
                                      </div>
                                    </div>
                                    <Canvas
                                      style={{ height: "500px", width: "100%" }}
                                      camera={{
                                        position: cameraPosition,
                                        fov: 50,
                                      }}
                                    >
                                      <ambientLight intensity={0.5} />
                                      <directionalLight
                                        position={[5, 5, 5]}
                                        intensity={1}
                                      />

                                      <Model
                                        url="/animateImages/sample.glb"
                                        onLoaded={handleModelLoaded}
                                      />

                                      <OrbitControls
                                        enableZoom={true}
                                        zoomSpeed={1}
                                        maxDistance={1000}
                                        minDistance={loader ? 500 : 100}
                                        autoRotate={autoRotate}
                                        autoRotateSpeed={5}
                                      />
                                    </Canvas>
                                  </React.Fragment>
                                )}
                              </React.Fragment>
                            )}
                          </div>

                          <div className="hidden sm:block w-full mt-4">
                            {!productLoader ? (
                              <Slider
                                {...thumbnailSliderSettings}
                                ref={(slider2) => setNav2(slider2)}
                              >
                                {mediaArray && mediaArray.length > 1
                                  ? mediaArray.map((item, index) => (
                                      <div
                                        key={index}
                                        className={`px-1 ${
                                          activeSlide === index
                                            ? "border-2 border-primary rounded-md"
                                            : ""
                                        }`}
                                      >
                                        {isImage(item) ? (
                                          <img
                                            src={item}
                                            alt={`Thumbnail ${index}`}
                                            className="w-full h-16 object-contain rounded-lg cursor-pointer "
                                          />
                                        ) : (
                                          <video
                                            ref={videoRef}
                                            autoPlay={false}
                                            muted={true}
                                            loop={true}
                                            className="w-full h-16 object-contain rounded-lg cursor-pointer "
                                          >
                                            <source
                                              src={item}
                                              type="video/mp4"
                                            />
                                            Your browser does not support the
                                            video tag.
                                          </video>
                                        )}
                                      </div>
                                    ))
                                  : null}
                              </Slider>
                            ) : (
                              <Skeleton
                                count={1}
                                className="w-full h-[100px]"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[1px] border border-[#E2E8F0] my-3"></div>
                  <div className="flex hidden sm:flex  items-center justify-end mt-3">
                    <h2 className="text-[#262626] font-semibold text-base">
                      Share this product
                    </h2>
                    <div
                      className="border-[#E2E8F0] border-2 rounded-full p-3 ml-5 cursor-pointer hover:bg-primary transition-all hover:text-white"
                      onClick={() => handlerSendWhatsapp()}
                    >
                      <FaWhatsapp size={16} />
                    </div>
                    {/* hidden because we don't have full functionality of sendEmail */}
                    <div
                      className="hidden border-[#E2E8F0] border-2 rounded-full p-3 ml-3 cursor-pointer hover:bg-primary transition-all hover:text-white"
                      onClick={() => handlerSendEmail()}
                    >
                      <MdOutlineEmail size={16} />
                    </div>
                  </div>
                </div>
                {/* product details content  */}
                <div className="col-span-12 md:col-span-12 lg:col-span-6 mt-4 ">
                  {/* Tag Wrapper  */}
                  {!productLoader ? (
                    <div className="flex items-center text-xs text-gray-700">
                      <div className=" rounded-[4px] border border-[#E2E8F0] py-1 px-3 mr-3">
                        200+ bought Last Month
                      </div>
                      <div className="rounded-[4px] border border-[#E2E8F0] py-1 px-3 mr-3">
                        In 50+ people's carts
                      </div>
                    </div>
                  ) : (
                    <Skeleton count={1} width={"60%"} height={"30px"} />
                  )}

                  {/* Store Title  */}

                  {!productLoader ? (
                    <div className="rounded-[60px] bg-gray-300 inline-flex items-center mt-4 pr-8">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/images/productDetails/storeIcon.png"
                        }
                        alt=""
                      />
                      <h4 className="uppercase text-[16px] sm:text-[1.25rem] text-lg font-semibold text-black ml-3">
                        Menumaster
                      </h4>
                      <div className="relative text-[16px] sm:text-[1.25rem]">
                        <ul className="relative  h-3 overflow-hidden pt-[1px]">
                          <li className="animate-slide-sequence-store text-primary delay-2000  font-semibold text-base flex items-center">
                            <span className="ml-3">Visit The Store</span>
                          </li>
                          <li className="animate-slide-sequence-store delay-4000 text-primary font-bold text-base flex items-center">
                            <span className="ml-3">Find 100+ Products</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <Skeleton
                      count={1}
                      width={"75%"}
                      className="my-2"
                      height={"40px"}
                    />
                  )}

                  {/* Product Title  */}
                  <div className="">
                    <h2 className="mt-1 text-[16px] sm:text-[1.25rem] font-semibold text-black-100 text-xl">
                      {!productLoader ? (
                        product.name
                      ) : (
                        <Skeleton className="w-full h-[30px] " count={2} />
                      )}
                    </h2>
                    {!productLoader ? (
                      <p className="mt-2 text-gray-700 text-[14px] sm:text-[0.875rem] text-sm flex items-center">
                        {product.sku}
                        <img
                          className="ml-2"
                          src={process.env.PUBLIC_URL + "/icons/star.png"}
                          alt=""
                        />
                      </p>
                    ) : (
                      <div className="w-[50%]">
                        <Skeleton
                          className="w-full   mt-3 h-[20px]"
                          count={1}
                        />
                      </div>
                    )}
                    {/* Horizontal Line  */}
                    <div className="w-full h-[1px] border border-[#E2E8F0] my-3 "></div>
                  </div>

                  {/* Color Variant Section  */}
                  {!productLoader ? (
                    <div className="mt-3">
                      <p className="text-black-100 font-semibold text-base">
                        Color : <span className="text-[#666666]">Red</span>
                      </p>
                      <div className="flex items-center mt-2">
                        <img
                          className={`mr-2 transition-all rounded-[4px] border-2 max-w-[70px]  hover:border-primary cursor-pointer border-primary`}
                          src={`${`${
                            product.images ? product.images[0] : ""
                          }`}`}
                          alt={product.name}
                        />

                        {variants
                          ? variants.map((item, index) => {
                              return (
                                <Link to={`/product/${item.id}`} key={index}>
                                  <img
                                    className={`mr-2 transition-all rounded-[4px] border-2 max-w-[70px] border-transparent hover:border-primary cursor-pointer ${
                                      product.id === item.id
                                        ? "border-primary"
                                        : ""
                                    }`}
                                    src={`${
                                      item.images ? item.images[0] : ""
                                    }`}
                                    alt={item.name}
                                  />
                                </Link>
                              );
                            })
                          : null}
                        {/* <img className='mr-2 transition-all rounded-[4px] border-2 border-transparent  hover:border-primary cursor-pointer' src={process.env.PUBLIC_URL + "/images/productDetails/color-variant.png"} alt="" />
                    <img className='mr-2 transition-all rounded-[4px] border-2 border-transparent hover:border-primary cursor-pointer' src={process.env.PUBLIC_URL + "/images/productDetails/color-variant.png"} alt="" /> */}
                      </div>
                      <div className="w-full h-[1px] border border-[#E2E8F0] my-3"></div>
                    </div>
                  ) : (
                    <div>
                      <Skeleton width={"40%"} />
                      <Skeleton
                        width={"50%"}
                        height={"100px"}
                        count={1}
                        className="mt-3"
                      />
                    </div>
                  )}

                  {/* At a Glance Section  */}
                  {!productLoader && product ? (
                    <div>
                      <h4 className="text-base font-semibold text-black-100 mb-2">
                        At a Glance
                      </h4>
                      <div className="flex items-center justify-center flex-wrap ">
                        {product.specifications
                          ? product.specifications.map((spec, index) => {
                              return (
                                <React.Fragment key={index}>
                                  {index < 6 ? (
                                    <div className="bg-[#DEF9EC] rounded-[4px] p-2 flex items-center flex-col basis-[30%] my-2 mx-1">
                                      <h2 className="text-sm font-semibold text-primary text-center">
                                        {spec.spec_name}
                                      </h2>
                                      <div className="text-gray-700 text-xs text-center mt-1">
                                        <p>
                                          {spec.spec_value
                                            ? spec.spec_value
                                            : ""}
                                        </p>
                                      </div>
                                    </div>
                                  ) : null}
                                </React.Fragment>
                              );
                            })
                          : null}
                      </div>
                      <div className="w-full h-[1px] border border-[#E2E8F0] my-3"></div>
                    </div>
                  ) : (
                    <div>
                      <Skeleton width={"40%"} />
                      <Skeleton
                        width={"100%"}
                        height={"100px"}
                        count={1}
                        className="mt-3"
                      />
                      <Skeleton
                        width={"100%"}
                        height={"100px"}
                        count={1}
                        className="mt-3"
                      />
                    </div>
                  )}

                  <div className="col-span-12 md:col-span-3 lg:col-span-3 mt-4 lg:hidden xl:hidden">
                    <div className="bg-gray-100 rounded-md  p-5 border-2 border-[#E2E8F0]">
                      {/* Badge Section  */}
                      {!productLoader ? (
                        <span className="text-primary bg-[#DEF9EC] px-4 py-2 rounded-[4px] text-xs font-semibold text-capitalize">
                          {product.refund}
                        </span>
                      ) : (
                        <Skeleton count={1} width={"40%"} height={"25px"} />
                      )}
                      {/* Price Section  */}

                      {/* Sub Price Section  */}
                      {!productLoader && product ? (
                        <React.Fragment>
                          <div className="flex items-center mt-3">
                            <span className="text-black-100 font-semibold text-xl">
                              {product.currency_title}{" "}
                              <span className="text-3xl font-bold">
                                {product.sale_price
                                  ? String(product.sale_price).split(".")[0]
                                  : ""}
                                .
                              </span>
                              <span className="text-black-100 font-semibold text-xl">
                                {String(product.sale_price).split(".")[1]
                                  ? String(product.sale_price).split(".")[1]
                                  : "00"}
                              </span>
                            </span>
                            <div className="flex items-center ml-3 mt-2 ">
                              <img
                                src={
                                  process.env.PUBLIC_URL + "/icons/delivery.png"
                                }
                                alt=""
                              />
                              <span className="ml-2 uppercase text-xs text-[#BF2536] font-semibold">
                                Free Delivery
                              </span>
                            </div>
                          </div>
                          <div className="text-base text-gray-700 mt-2">
                            <span className="">{product.currency_title}</span>
                            <span className="line-through ml-2">
                              {product.original_price
                                ? String(product.original_price).split(".")[0]
                                : ""}
                              .
                              {String(product.original_price).split(".")[1]
                                ? String(product.original_price).split(".")[1]
                                : "00"}
                            </span>
                            <span className="ml-2 text-[#FF311C]">
                              Save {product.currency_title}{" "}
                              {product.original_price && product.sale_price
                                ? (
                                    product.original_price - product.sale_price
                                  ).toFixed(2)
                                : ""}
                            </span>
                          </div>
                          <div className="text-base text-gray-700 mt-2 flex items-center">
                            <span className="text-sm">As low as </span>
                            <span className="text-black-100 text-xs font-semibold ml-1">
                              SAR
                            </span>
                            <span className="text-black-100 text-base font-bold ml-1">
                              {" "}
                              3125/
                            </span>
                            <span className="text-[#64748B] text-xs ml-1">
                              Monthly with
                            </span>
                            <img
                              src={process.env.PUBLIC_URL + "/icons/tamara.png"}
                              className="ml-2"
                              alt=""
                            />
                          </div>
                        </React.Fragment>
                      ) : (
                        <div>
                          <Skeleton
                            className="mt-4"
                            count={1}
                            height={"50px"}
                          />
                          <Skeleton className="my-1" count={1} width={"50%"} />
                          <Skeleton count={1} />
                        </div>
                      )}

                      <div className="w-full h-[1px] border border-[#E2E8F0] my-5"></div>
                      {/* Buy more save more  */}
                      <BuyMoreSaveMore
                        setMaxBuyMoreSaveMore={setMaxBuyMoreSaveMore}
                        maxBuyMoreSaveMore={maxBuyMoreSaveMore}
                        selectedBuyMore={selectedBuyMore}
                        setSelectedBuyMore={setSelectedBuyMore}
                        buyMore={buyMore && buyMore}
                        productLoader={productLoader}
                        product={product}
                      />

                      <p className=" text-[#64748B] my-3 text-end text-xs">
                        Buying in bulk made easy with Horeca{" "}
                        <Link
                          className="text-primary font-semibold underline"
                          to="/"
                        >
                          Made a Quote
                        </Link>
                      </p>
                      {/* Protection Plan  */}

                      <div className="w-full h-[1px] border border-[#E2E8F0]  my-4"></div>
                      {/* hidden for the second phase developement do not remove the components */}
                      <div className="hidden">
                        {!productLoader && product.same_sku_product_ids ? (
                          <React.Fragment>
                            <h3 className="font-semibold text-black-100 text-base">
                              {product.same_sku_product_ids
                                ? product.same_sku_product_ids.length
                                : ""}{" "}
                              Other Offers Available for the same products
                            </h3>
                            {!productLoader && product.same_sku_product_ids
                              ? product.same_sku_product_ids.map(
                                  (prod, index) => {
                                    return <SameProducts product={prod} />;
                                  }
                                )
                              : null}
                            <div className="w-full h-[1px] border border-[#E2E8F0]  my-4"></div>
                          </React.Fragment>
                        ) : null}
                      </div>
                      {/* Specialist  */}
                      <div className="flex items-center justify-between">
                        <p
                          className={`font-bold text-[#BF2536] text-base transition-opacity duration-1000 ${
                            isVisible ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          Available 24/7
                        </p>{" "}
                        <p className="text-[#4A4A4A] text-sm relative">
                          {" "}
                          <span className="absolute  size-[8px] rounded-full bg-primary left-[-12px] top-1/2 translate-y-[-50%]"></span>{" "}
                          Online Now
                        </p>
                      </div>

                      <div className="rounded-[4px] bg-[#DEF9EC] flex items-center justify-between px-4 py-2 mt-4">
                        <p className="text-[#4A4A4A] text-sm">
                          Our Product Specialists are here for you.
                        </p>
                        <img
                          className="size-[40px]"
                          src={
                            process.env.PUBLIC_URL +
                            "/images/productDetails/specialist.png"
                          }
                          alt=""
                        />
                      </div>

                      <div className="flex items-center justify-between mt-5">
                        <img
                          onClick={() => handlerSendWhatsapp()}
                          src={process.env.PUBLIC_URL + "/icons/chat.png"}
                          className="mr-1"
                          alt=""
                        />{" "}
                        Chat Now
                        <img
                          src={process.env.PUBLIC_URL + "/icons/phone-2.png"}
                          className="mr-1"
                          alt=""
                        />{" "}
                        800 HORECA (467322)
                        <img
                          src={process.env.PUBLIC_URL + "/icons/email.png"}
                          className="mr-1"
                          alt=""
                        />{" "}
                        Email Us
                      </div>
                      <div className="w-full h-[1px] border border-[#E2E8F0]  my-4"></div>
                      <div className="flex items-center justify-between my-2">
                        <div className="flex items-center">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/images/productDetails/logo.png"
                            }
                            alt=""
                          />
                          <p className="ml-4 text-primary text-xs font-semibold ">
                            Empero Group Refrigeration Reach-In Freezers
                          </p>
                        </div>
                      </div>
                    </div>
                    <Documents docs={!!product && product.documents} />
                  </div>

                  {/* About Items  */}
                  <div className="p-[10px]">
                    {!productLoader ? (
                      <React.Fragment>
                        <h2 className="text-base font-semibold text-black-100">
                          About This item
                        </h2>
                        <div
                          className={`content__wrapper transition-all overflow-y-hidden max-h-[210px]`}
                          dangerouslySetInnerHTML={{ __html: product.content }}
                        />
                        <p className="flex items-center mt-2">
                          <a
                            href="#description"
                            className="underline text-[#666] text-base cursor-pointer"
                          >
                            See More
                          </a>{" "}
                          <img
                            className={`ml-1 transition-all`}
                            src={process.env.PUBLIC_URL + "/icons/arrow.svg"}
                            alt=""
                          />
                        </p>
                        <p className="mt-3 flex items-center">
                          <img
                            className="mr-2"
                            src={process.env.PUBLIC_URL + "/icons/question.png"}
                            alt=""
                          />{" "}
                          <span className="text-base text-[#A6131D]">
                            Report an issue with this product
                          </span>
                        </p>
                      </React.Fragment>
                    ) : (
                      <div>
                        <Skeleton count={1} width="40%" className="mt-3" />
                        <Skeleton count={1} height="100px" className="w-full" />
                        <Skeleton
                          count={1}
                          height="100px"
                          className="w-full mt-3"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* end product details contents */}
                <FrequentlyBought
                  product={product}
                  productLoader={productLoader}
                  settings={settings}
                />

                {!productLoader ? (
                  <div className="col-span-12 mt-10">
                    {PRODUCT_DETAIL
                      ? PRODUCT_DETAIL.map((product, index) => {
                          const isSelected = selectedDetail === product.id;
                          return (
                            <React.Fragment key={index}>
                              <button
                                onClick={() => setSelectedDetail(product.id)}
                                className={`
    text-[#64748B] 
    w-[90vw] sm:w-[100%] 
    md:w-auto 
    rounded-md 
    border-gray-200 
    mr-2 
    border 
    bg-[#F9FAFC] 
    py-2 
    px-5 
    text-base 
    transition-all 
    hover:text-primary 
    hover:bg-[#DEF9EC] 
    ${isSelected ? "!bg-[#DEF9EC] m-[10px] text-primary" : ""}
  `}
                              >
                                {product.title}
                              </button>
                            </React.Fragment>
                          );
                        })
                      : null}

                    {/* Selected ID 1 */}
                    {!productLoader && selectedDetail === 1 ? (
                      <div id="description">
                        {product.description && product.content ? (
                          <React.Fragment>
                            <div
                              className="description__content w-[90vw] sm:w-[100%] mt-6 ml-[10px]"
                              dangerouslySetInnerHTML={{
                                __html: product.description,
                              }}
                            ></div>
                            <div
                              className="description__content w-[90vw] sm:w-[100%] ml-[10px]"
                              dangerouslySetInnerHTML={{
                                __html: product.content,
                              }}
                            ></div>
                          </React.Fragment>
                        ) : (
                          <p className=" text-[#4A4A4A] mt-6 text-base description__content">
                            No Description Found
                          </p>
                        )}
                      </div>
                    ) : null}

                    {selectedDetail === 2 ? (
                      <div className="border-[#EAEAEA] border rounded-md mt-8 ">
                        <div className="grid grid-cols-10 ">
                          {product.specifications
                            ? product.specifications.map((spec, index) => {
                                return (
                                  <React.Fragment key={index}>
                                    <div className="col-span-2 text-[#4A4A4A] bg-[#F5F5F5]  py-4 px-5 ">
                                      <p className="font-semibold capitalize text-lg">
                                        {spec.spec_name}
                                      </p>
                                    </div>
                                    <div className="col-span-3 text-[#4A4A4A] py-4 px-5">
                                      <p className="capitalize text-lg">
                                        {spec.spec_value ? spec.spec_value : ""}
                                      </p>
                                    </div>
                                    {index % 2 !== 0 &&
                                    product.specifications.length - 1 >
                                      index ? (
                                      <div className="border-b border-[#EAEAEA] col-span-10"></div>
                                    ) : null}
                                    {index % 2 === 0 &&
                                    index ===
                                      product.specifications.length - 1 ? (
                                      <div className="col-span-2 text-[#4A4A4A] bg-[#F5F5F5]  py-4 px-5 "></div>
                                    ) : (
                                      ""
                                    )}
                                  </React.Fragment>
                                );
                              })
                            : null}
                        </div>
                      </div>
                    ) : null}

                    {/* Selected ID 3 */}
                    {selectedDetail === 3 ? (
                      <div className="mt-6 ml-[10px]">
                        <p
                          className="description__content"
                          dangerouslySetInnerHTML={{
                            __html: product.warranty_information,
                          }}
                        ></p>
                      </div>
                    ) : null}

                    {selectedDetail === 4 ? (
                      <div className="mt-6">
                        <p className=" text-[#4A4A4A] text-base description__content">
                          No Shipping Policy Found
                        </p>
                      </div>
                    ) : null}

                    {selectedDetail === 5 ? (
                      <div className="mt-6">
                        <p className="text-[#4A4A4A] text-base description__content">
                          No Refund Policy Found
                        </p>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="col-span-10 mt-6">
                    <Skeleton className="w-full" height={"45px"} />
                    <Skeleton className="w-full mt-4 h-[70vh]" />
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-12 md:col-span-12 lg:col-span-3 xl:col-span-3 mt-4 sm:hidden lg:block">
              <div className="bg-gray-100 rounded-md  p-5 border-2 border-[#E2E8F0]">
                {/* Badge Section  */}
                {!productLoader ? (
                  <span className="text-primary bg-[#DEF9EC] px-4 py-2 rounded-[4px] text-xs font-semibold text-capitalize">
                    {product.refund}
                  </span>
                ) : (
                  <Skeleton count={1} width={"40%"} height={"25px"} />
                )}
                {/* Price Section  */}

                {/* Sub Price Section  */}
                {!productLoader && product ? (
                  <React.Fragment>
                    <div className="flex items-center mt-3">
                      <span className="text-black-100 font-semibold text-xl">
                        {product.currency_title}{" "}
                        <span className="text-3xl font-bold">
                          {integerPart && integerPart}.
                        </span>
                        <span className="text-black-100 font-semibold text-xl">
                          {decimalPart && decimalPart}
                        </span>
                      </span>
                      <div className="flex items-center ml-3 mt-2 ">
                        <img
                          src={process.env.PUBLIC_URL + "/icons/delivery.png"}
                          alt=""
                        />
                        <span className="ml-2 uppercase text-xs text-[#BF2536] font-semibold">
                          Free Delivery
                        </span>
                      </div>
                    </div>
                    <div className="text-base text-gray-700 mt-2">
                      <span className="">{product.currency_title}</span>
                      <span className="line-through ml-2">
                        {product.original_price
                          ? String(product.original_price).split(".")[0]
                          : ""}
                        .
                        {String(product.original_price).split(".")[1]
                          ? String(product.original_price).split(".")[1]
                          : "00"}
                      </span>
                      <span className="ml-2 text-[#FF311C]">
                        Save {product.currency_title}{" "}
                        {product.original_price && product.sale_price
                          ? (
                              product.original_price - product.sale_price
                            ).toFixed(2)
                          : ""}
                      </span>
                    </div>
                    <div className="text-base text-gray-700 mt-2 flex items-center">
                      <span className="text-sm">As low as </span>
                      <span className="text-black-100 text-xs font-semibold ml-1">
                        USD
                      </span>
                      <span className="text-black-100 text-base font-bold ml-1">
                        {" "}
                        3125/
                      </span>
                      <span className="text-[#64748B] text-xs ml-1">
                        Monthly with
                      </span>
                      <img
                        src={process.env.PUBLIC_URL + "/icons/tamara.png"}
                        className="ml-2"
                        alt=""
                      />
                    </div>
                  </React.Fragment>
                ) : (
                  <div>
                    <Skeleton className="mt-4" count={1} height={"50px"} />
                    <Skeleton className="my-1" count={1} width={"50%"} />
                    <Skeleton count={1} />
                  </div>
                )}

                <div className="w-full h-[1px] border border-[#E2E8F0] my-5"></div>
                {/* Buy more save more  */}
                <BuyMoreSaveMore
                  setMaxBuyMoreSaveMore={setMaxBuyMoreSaveMore}
                  maxBuyMoreSaveMore={maxBuyMoreSaveMore}
                  selectedBuyMore={selectedBuyMore}
                  setSelectedBuyMore={setSelectedBuyMore}
                  buyMore={buyMore}
                  productLoader={productLoader}
                  product={product}
                />

                <p className=" text-[#64748B] my-3 text-end text-xs">
                  Buying in bulk made easy with Horeca{" "}
                  <Link className="text-primary font-semibold underline" to="/">
                    Made a Quote
                  </Link>
                </p>
                {/* Protection Plan  */}

                <div className="w-full h-[1px] border border-[#E2E8F0]  my-4"></div>

                {/* hidden for the second phase developement do not remove the components */}
                <div className="hidden">
                  {!productLoader && product.same_sku_product_ids ? (
                    <React.Fragment>
                      <h3 className="font-semibold text-black-100 text-base">
                        {product.same_sku_product_ids
                          ? product.same_sku_product_ids.length
                          : ""}{" "}
                        Other Offers Available for the same products
                      </h3>
                      {!productLoader && product.same_sku_product_ids
                        ? product.same_sku_product_ids.map((prod, index) => {
                            return <SameProducts product={prod} />;
                          })
                        : null}
                      <div className="w-full h-[1px] border border-[#E2E8F0]  my-4"></div>
                    </React.Fragment>
                  ) : null}
                </div>
                {/* Specialist  */}
                <div className="flex items-center justify-between">
                  <p
                    className={`font-bold text-[#BF2536] text-base transition-opacity duration-1000 ${
                      isVisible ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    Available 24/7
                  </p>{" "}
                  <p className="text-[#4A4A4A] text-sm relative">
                    {" "}
                    <span className="absolute  size-[8px] rounded-full bg-primary left-[-12px] top-1/2 translate-y-[-50%]"></span>{" "}
                    Online Now
                  </p>
                </div>

                <div className="rounded-[4px] bg-[#DEF9EC] flex items-center justify-between px-4 py-2 mt-4">
                  <p className="text-[#4A4A4A] text-sm">
                    Our Product Specialists are here for you.
                  </p>
                  <img
                    className="size-[40px]"
                    src={
                      process.env.PUBLIC_URL +
                      "/images/productDetails/specialist.png"
                    }
                    alt=""
                  />
                </div>

                <div className="flex items-center justify-between mt-5">
                  <div
                    className="flex items-center justify-center cursor-pointer"
                    onClick={() => handlerSendWhatsapp()}
                  >
                    <img
                      src={process.env.PUBLIC_URL + "/icons/chat.png"}
                      className=""
                      alt=""
                    />{" "}
                    <p className="text-[10px] text-primary font-semibold flex items-center mx-2">
                      Chat Now
                    </p>
                  </div>
                  <Link
                    className="text-[10px] text-primary font-semibold flex items-center mx-2"
                    to="/"
                  >
                    <img
                      src={process.env.PUBLIC_URL + "/icons/phone-2.png"}
                      className="mr-1"
                      alt=""
                    />{" "}
                    800 HORECA (467322)
                  </Link>
                  <Link
                    className="text-[10px] text-primary font-semibold flex items-center mx-2"
                    to="/"
                  >
                    <div
                      className="flex items-center justify-center cursor-pointer"
                      onClick={() => handlerSendEmail()}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/icons/email.png"}
                        className="mr-1"
                        alt=""
                      />{" "}
                      <p className="text-[10px] text-primary font-semibold flex items-center mx-2">
                        Email Us
                      </p>
                    </div>
                  </Link>
                </div>

                <div className="w-full h-[1px] border border-[#E2E8F0]  my-4"></div>

                <div className="flex items-center justify-between my-2">
                  <div className="flex items-center">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/images/productDetails/logo.png"
                      }
                      alt=""
                    />
                    <p className="ml-4 text-primary text-xs font-semibold ">
                      Empero Group Refrigeration Reach-In Freezers
                    </p>
                  </div>
                </div>
              </div>

              <Documents docs={!!product && product.documents} />
            </div>

            <CompareProducts
              productLoader={productLoader}
              product={product}
              compareProductFields={compareProductFields}
            />

            <div className="col-span-12">
              <ReviewSection id={id} />
            </div>

            {/* <div className='col-span-12'>
            <SuggestionSlider title={"Products you may also like"} productList={recomendProduct} />
            <SuggestionSlider title={"Inspired by your browsing history"} productList={recomendProduct} />
          </div> */}
            <div className="mt-10"></div>
          </div>
        </React.Fragment>
      ) : null}
    </Wrapper>
  );
};

export default React.memo(ProductDetail);
export const BuyMoreSaveMore = ({
  buyMore,
  productLoader,
  product,
  setSelectedBuyMore,
  selectedBuyMore,
  maxBuyMoreSaveMore,
  setMaxBuyMoreSaveMore,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [showCountButton, setShowCountButton] = useState(false);
  const [loader, setLoader] = useState(false);
  const { triggerUpdateCart } = useCart();

  const handlerIncrement = () => {
    if (quantity <= 99) {
      setQuantity(quantity + 1);
    }
  };

  const handlerDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlerSubmit = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
      setLoader(true);
      const response = await apiClient.post(
        `/cart${authToken ? "" : "/guest"}`,
        {
          product_id: product.id,
          quantity: quantity,
        }
      );
      setQuantity(1);
      triggerUpdateCart();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoader(false);
    }
  };

  const handlerBuyMoreSaveMore = (count) => {
    setSelectedBuyMore(count);
    setQuantity(count);
  };
  let tempMax = 0;
  const handlerReturnBorderOnMax = (count) => {
    if (tempMax < count) {
      setMaxBuyMoreSaveMore(count);
    }
  };

  return (
    <div className="">
      {!productLoader ? (
        <React.Fragment>
          {buyMore.length && product ? (
            <React.Fragment>
              <div className="flex items-center justify-between">
                <p className="font-semibold  text-base text-black-100">
                  Buy More, Save More
                </p>
                <img
                  src={process.env.PUBLIC_URL + "/icons/exclaim.png"}
                  alt=""
                />
              </div>
              <div className="flex items-center justify-between gap-1 flex-wrap">
                {buyMore.map((buy, index) => {
                  return (
                    <div className=" mt-2 w-[48%]" key={index}>
                      <div
                        className={`flex items-center justify-between rounded-[4px] border border-[#E2E8F0] p-3 transition-all hover:border-primary cursor-pointer`}
                        style={{
                          border: `${
                            buy.product_quantity === quantity ||
                            (buy.product_quantity <= quantity &&
                              buyMore.length - 1 === index)
                              ? "1px solid #186737"
                              : ""
                          }`,
                        }}
                        onClick={() =>
                          handlerBuyMoreSaveMore(buy.product_quantity)
                        }
                      >
                        <div className="mr-2">
                          <p className="text-gray-700 text-xs">
                            Buy {buy.product_quantity} Units{" "}
                          </p>
                          <p className="font-semibold text-black-100 text-xs ">
                            {product.currency_title}{" "}
                            {(
                              (product.sale_price * (100 - buy.value)) /
                              100
                            ).toFixed(2)}
                          </p>
                        </div>
                        <div className="text-[#A6131D] font-semibold text-xs ml-2">
                          <p>-{buy.value}%</p>
                          <p>Each</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="w-full h-[1px] border border-[#E2E8F0]  my-5"></div>
            </React.Fragment>
          ) : null}
        </React.Fragment>
      ) : (
        <Skeleton height={"80px"} width={"100%"} />
      )}

      {/* Add To Card  */}
      <div className="flex items-center mt-4">
        {/* Quantity selector */}
        <div className="flex items-center rounded-[4px] border border-[#BCE3C9] p-2 cursor-pointer">
          <FiMinus
            size={16}
            className="text-gray-700"
            onClick={() => handlerDecrement()}
          />
          <span className="text-primary font-semibold text-base mx-2">
            {String(quantity).padStart(2, "0")}
          </span>
          <FiPlus
            size={16}
            className="text-gray-700"
            onClick={() => handlerIncrement()}
          />
        </div>

        {/* Stretchable Add to Cart button */}
        <CartButton
          classes={
            "bg-primary rounded-[4px] justify-center p-2 ml-3 flex items-center  text-base text-white font-semibold w-full transition-all"
          }
          icon={true}
          product_id={product.id}
          quantity={quantity}
          showCountButton={showCountButton}
          setShowCountButton={setShowCountButton}
          setQuantity={setQuantity}
          name={product.name}
          image={product.image}
          store_id={product.store_id}
          delivery_days={product.delivery_days}
          original_price={
            product.sale_price ? product.sale_price : product.original_price
          }
          front_sale_price={product.price}
          maximum_order_quantity={product.maximum_order_quantity}
          minimum_order_quantity={product.minimum_order_quantity}
          images={product.images}
          video_path={product.video_path}
          currency_title={
            product.currency_title ? product.currency_title : "USD"
          }
        >
          <MdOutlineAddShoppingCart className="text-white group-hover:text-white transition-all duration-500" />
          <span className="ml-2 font-semibold text-white text-base group-hover:text-white transition-all duration-500">
            Add To Cart
          </span>
        </CartButton>

        {/* <button onClick={() => handlerSubmit()} className='bg-primary rounded-[4px] justify-center p-2 ml-3 flex items-center  text-base text-white font-semibold w-full transition-all' disabled={loader} style={{ opacity: `${loader ? "0.5" : ""}` }}>
          <BsCartPlus className='mr-2' color='white' />
          {!loader ? "Add To Cart" : "Adding To Cart"}
        </button> */}
      </div>
    </div>
  );
};

export const ProtectionPlan = () => {
  return (
    <div className="bg-[#DEF9EC] rounded-xl px-3 py-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg text-black-100">
          Add Installation Services
        </h2>
        <img src={process.env.PUBLIC_URL + "/icons/exclaim.png"} alt="" />
      </div>
      <div className="flex items-center mt-3">
        <input
          id="link-radio"
          name="link-radio"
          type="radio"
          value=""
          className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="link-radio"
          className="text-black-100 text-sm  ml-3 font-semibold"
        >
          Installation Assistance - SAR 500.00
        </label>
      </div>
      <div className="flex items-center mt-1">
        <input
          id="link-radio"
          name="link-radio"
          type="radio"
          value=""
          className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="link-radio"
          className="text-black-100 text-sm  ml-3 font-semibold"
        >
          Complete Installation - SAR 1500.00
        </label>
      </div>

      <div className="w-full h-[2px] bg-[#E2E8F0] my-3"></div>

      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg text-black-100">
          Add a Protection Plan
        </h2>
        <img src={process.env.PUBLIC_URL + "/icons/exclaim.png"} alt="" />
      </div>
      <div className="flex items-center mt-3">
        <input
          id="link-radio-2"
          name="link-radio-2"
          type="radio"
          value=""
          className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="link-radio-2"
          className="text-black-100 text-sm  ml-3 font-semibold"
        >
          2 - Years Plan - SAR 2500.00
        </label>
      </div>
      <div className="flex items-center mt-1">
        <input
          id="link-radio-2"
          name="link-radio-2"
          type="radio"
          value=""
          className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="link-radio-2"
          className="text-black-100 text-sm  ml-3 font-semibold"
        >
          3 - Years Plan - SAR 3000.00
        </label>
      </div>
    </div>
  );
};

const RenderingBought = ({
  prod,
  index,
  settings,
  setTotalAmount,
  setTotalSaveAmount,
  setTotalProducts,
  setIds,
}) => {
  const sliderRef = useRef();
  const [isChecked, setIsChecked] = useState(false);
  const param = useParams();

  const handlerCheckboxManage = (checked, total, totalSave, ids) => {
    setIsChecked(checked);
    if (checked) {
      setTotalAmount((prev) => prev + total);
      setTotalSaveAmount((prev) => prev + totalSave);
      setTotalProducts((prev) => prev + 1);
      setIds((prevIds) => [...prevIds, ids]);
    } else {
      setTotalSaveAmount((prev) => prev - totalSave);
      setTotalAmount((prev) => prev - total);
      setTotalProducts((prev) => prev - 1);
      setIds((prevIds) => prevIds.filter((id) => id !== ids));
    }
  };
  useEffect(() => {
    setIsChecked(false);
    setTotalAmount(0);
    setTotalProducts(0);
    setTotalSaveAmount(0);
    setIds([]);
  }, [param.id]);

  return (
    <React.Fragment>
      <div
        className={`col-span-2 md:col-span-2 lg:col-span-1 border-gray-300 rounded-[4px] p-4 cursor-pointer product__card__wrapper group transition-all border-2  hover:border-primary duration-700 my-3 relative`}
        onMouseEnter={() => sliderRef.current.slickPlay()}
        onMouseLeave={() => sliderRef.current.slickPause()}
      >
        <input
          type="checkbox"
          className=" float-right cursor-pointer accent-primary size-4"
          checked={isChecked}
          onChange={(e) =>
            handlerCheckboxManage(
              e.target.checked,
              prod.sale_price,
              prod.original_price,
              prod.id
            )
          }
        />
        {index < 2 ? (
          <BsPlusLg className="cursor-pointer absolute right-[-11%] top-1/2 translate-y-[-50%]" />
        ) : null}
        <div className="overflow-hidden relative z-50">
          <Link to={`/product/${prod.id}`}>
            <Slider {...settings} ref={sliderRef} class>
              {prod && prod.images
                ? prod.images.map((image, index2) => {
                    return (
                      <div key={index2} className="">
                        <img
                          src={image}
                          alt="Product Title"
                          className="w-full"
                        />
                      </div>
                    );
                  })
                : null}
            </Slider>
          </Link>
          <div className="absolute top-[40%] translate-y-[-50%] border border-gray-300 rounded-[4px] right-[-70px] group-hover:right-[5px] transition-all duration-500">
            <VscGraph
              size={45}
              className="p-3 bg-white text-[#62666c]  hover:text-white hover:bg-primary z-10 transition-all rounded-t-[4px]"
            />
            <LuEye
              size={45}
              className="p-3 border-b bg-white border-gray-300 text-[#62666c]  hover:text-white hover:bg-primary z-10 transition-all"
            />
            <FaRegHeart
              size={45}
              className="p-3 border-b bg-white border-gray-300 text-[#62666c]  hover:text-white hover:bg-primary z-10 transition-all rounded-b-[4px] "
            />
          </div>
        </div>
        <div className="mt-1">
          <Link to={`/product/${prod.id}`}>
            <h2 className="text-base font-semibold line-clamp-3">
              {prod.name}
            </h2>
            <div className="flex items-center mt-1">
              <Rating rating={prod.avg_rating ? prod.avg_rating : "5"} />
              <span className="text-gray-700 text-xs ml-2">
                {prod.total_reviews ? prod.total_reviews : "0"}+ Sold
              </span>
            </div>
          </Link>
          <div className="flex items-center justify-between  mt-4">
            <Link
              to={`/product/${prod.id}`}
              className="flex flex-col items-start justify-start"
            >
              {prod.sale_price ? (
                <span className="text-primary font-semibold text-xs">
                  {prod.currency_title ? prod.currency_title : "USD"}{" "}
                  <span className="text-[30px] font-extrabold">
                    {String(prod.sale_price).split(".")[0]}.
                    <span className="font-semibold text-base">
                      {String(prod.sale_price).split(".")[1]
                        ? String(prod.sale_price).split(".")[1]
                        : "00"}
                    </span>
                  </span>
                </span>
              ) : null}
              {prod.original_price ? (
                <span className="text-gray-700 line-through  text-xs">
                  {prod.currency_title ? prod.currency_title : "USD"}{" "}
                  {String(prod.original_price).split(".")[0]}
                  {String(prod.original_price).split(".")[1]
                    ? `.${String(prod.original_price).split(".")[1]}`
                    : ".00"}
                </span>
              ) : null}
            </Link>
            {/* <div className="mt-2 flex items-center justify-between px-3 py-2 w-[90px] border border-[#BCE3C9] rounded-[4px]">
              <FiMinus className="cursor-pointer" />
              <span className="font-semibold text-primary mx-2">01</span>
              <BsPlusLg className="cursor-pointer" />
            </div> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const FrequentlyBought = ({ product, productLoader, settings }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalSaveAmount, setTotalSaveAmount] = useState(0);
  const [totalProduct, setTotalProducts] = useState(0);
  const [ids, setIds] = useState([]);
  const [loader, setLoader] = useState(false);
  const { triggerUpdateCart } = useCart();
  const { incrementCartItems } = useLocalCartCount();

  const notify = (text) => {
    toast.dismiss();
    toast(
      <span className="line-clamp-2">{`${text} has been added to your cart`}</span>
    );
  };

  const handlerFormSubmit = async () => {
    const authToken = localStorage.getItem("authToken");
    setLoader(true);
    if (ids.length > 0 && authToken) {
      const products = ids.map((id) => ({ product_id: id, quantity: 1 }));
      const result = {
        products: products,
      };
      try {
        setLoader(true);
        const response = await apiClient.post(`/cart/multiple"`, result);
        triggerUpdateCart();
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoader(false);
      }
    } else {
      setTimeout(() => {
        setLoader(false);
      }, 500);
      ids.forEach((element) => {
        let cartItems = localStorage.getItem("CartItems");
        if (cartItems) {
          let itemsArray = JSON.parse(cartItems);
          itemsArray.push({ productId: element, quantity: 1 });
          localStorage.setItem("CartItems", JSON.stringify(itemsArray));
          incrementCartItems(1);
          triggerUpdateCart();
        } else {
          localStorage.setItem(
            "CartItems",
            JSON.stringify([{ productId: element, quantity: 1 }])
          );
          incrementCartItems(1);
          triggerUpdateCart();
        }
      });
    }
    notify(`${ids.length} Products`);
  };

  return (
    <React.Fragment>
      {product.frequently_bought_together &&
      product.frequently_bought_together.length === 3 ? (
        <div className="col-span-12 border border-[#E2E8F0] rounded-md py-5 px-4">
          {!productLoader ? (
            <h2 className="text-lg  text-black-100 font-bold">
              Frequently bought together
            </h2>
          ) : (
            <Skeleton height={"40px"} width={"20%"} />
          )}
          <div className="grid grid-cols-4 gap-8">
            {product.frequently_bought_together ? (
              product.frequently_bought_together.map((prod, index) => {
                return (
                  <RenderingBought
                    key={index}
                    setTotalProducts={setTotalProducts}
                    prod={prod}
                    index={index}
                    settings={settings}
                    setTotalAmount={setTotalAmount}
                    setTotalSaveAmount={setTotalSaveAmount}
                    setIds={setIds}
                  />
                );
              })
            ) : (
              <React.Fragment>
                <div className="col-span-1 mt-3">
                  <Skeleton className="w-full h-[350px]" />
                </div>

                <div className="col-span-1 mt-3">
                  <Skeleton className="w-full h-[350px]" />
                </div>

                <div className="col-span-1 mt-3">
                  <Skeleton className="w-full h-[350px]" />
                </div>
              </React.Fragment>
            )}
            {!productLoader ? (
              <div className="col-span-2 md:col-span-2 lg:col-span-1">
                <div className="flex flex-col h-full items-center justify-center ">
                  {totalAmount > 0 ? (
                    <React.Fragment>
                      <h3 className="text-primary font-bold text-base">
                        <span className="">{product.currency_title} </span>
                        <span className="text-2xl">
                          {String(totalAmount).split(".")[0]}.
                        </span>
                        <span>
                          {String(totalAmount).split(".")[1]
                            ? String(totalAmount).split(".")[1]
                            : "00"}
                        </span>
                      </h3>
                      <h4 className="text-[#64748B] line-through text-sm">
                        {product.currency_title}{" "}
                        {String(totalSaveAmount).split(".")[0]}.
                        <span>
                          {String(totalAmount).split(".")[1]
                            ? String(totalAmount).split(".")[1]
                            : "00"}
                        </span>
                      </h4>
                    </React.Fragment>
                  ) : null}
                  <button
                    className="text-base text-primary font-semibold px-4 py-2 rounded-[4px] border border-primary"
                    style={{
                      opacity: `${loader || !totalProduct ? "0.5" : ""}`,
                    }}
                    disabled={loader || !totalProduct}
                    onClick={() => handlerFormSubmit()}
                  >
                    {!loader ? "Add" : "Adding"} {totalProduct} Items To Cart
                  </button>
                </div>
              </div>
            ) : (
              <Skeleton className="w-full h-[350px] mt-3" />
            )}
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};
