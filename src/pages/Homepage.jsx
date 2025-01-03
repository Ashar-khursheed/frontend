import React, { useState, useEffect, lazy } from "react";

import { Hero } from "../hooks/hero/Hero";
import { RowNews } from "../hooks/rownews/RowNews";
import { TimerBanner } from "../hooks/timerBanner/TimerBanner";
import { apiClient } from "../utils/apiWrapper";
import { Wrapper } from "../shared/Wrapper";
import HomepageBanner from "../shared/HomepageBanner";
import HomepageContent from "../shared/HomepageContent";
import HomepagePopularSearches from "../shared/HomepagePopularSearches";
const FeatureProduct = lazy(() =>
  import("../hooks/featureproducts/FeatureProducts")
);
const FeatureClearance = lazy(() =>
  import("../hooks/featureClearance/FeatureClearance")
);
const FeatureBrand = lazy(() => import("../hooks/featureBrand/FeatureBrand"));
const BlogsCard = lazy(() => import("../shared/BlogsCard"));
const Categories = lazy(() => import("../hooks/categories/Categories"));

const sideBanner = [
  {
    imgSource: `${process.env.PUBLIC_URL}/images/homepageSidefirst.png`,
    redirectSource: "#",
  },
  {
    imgSource: `${process.env.PUBLIC_URL}/images/homepageSideSecond.svg`,
    redirectSource: "#",
  },
];

const Homepage = ({ categories }) => {
  const [featureCat, setFeatureCat] = useState([]);
  const [featureCatList, setFeatureCatList] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  const [featureCatLoader, setFeatureCatLoader] = useState(true);
  const [brandCat, setBrandCat] = useState([]);
  const [brandCatList, setBrandCatList] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [heroSlider, setHeroSlider] = useState([]);
  const [sliderLoader, setSliderLoader] = useState(true);
  const [brandCatLoader, setBrandCatLoader] = useState(true);
  const authToken = localStorage.getItem("authToken");

  const fetchCategoriesProducts = async (tempCat) => {
    try {
      const response = await apiClient.get(
        `${authToken ? "/categoryproducts" : "categoryguestproducts"}`
      );
      setFeatureCat(response.data.data);
      response.data.data.map((item, index) => {
        index < 5 ? tempCat.push(item.category_name) : console.log("");
      });
      setFeatureCatList(tempCat);
      setSelectedCat(tempCat[0]);
      setFeatureCatLoader(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  const fetchSlider = async () => {
    // setLoader(true);
    try {
      const response = await apiClient.get("/simple-slider/1");
      setHeroSlider(response.data.slider_items);
      setSliderLoader(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      //   setLoader(false);
    }
  };

  const fetchBrandProducts = async (tempBrand) => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await apiClient.get(
        `${authToken ? "/brandproducts" : "/brandguestproducts"}`
      );
      setBrandCat(response.data.data);
      response.data.data.map((item, index) => {
        index < 5 ? tempBrand.push(item.brand_name) : console.log("");
      });
      setBrandCatList(tempBrand);
      setSelectedBrand(tempBrand[0]);
      setBrandCatLoader(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      //   setLoader(false);
    }
  };

  useEffect(() => {
    setSliderLoader(true);
    setFeatureCatLoader(true);
    setBrandCatLoader(true);
    let tempCat = [];
    let tempBrand = [];

    fetchCategoriesProducts(tempCat);
    fetchSlider();
    fetchBrandProducts(tempBrand);
  }, []);

  return (
    <div>
      <Hero heroSlider={heroSlider} sliderLoader={sliderLoader} />
      {/* <RowNews /> */}
      <Categories categories={categories} />
      <FeatureProduct
        featureCat={featureCat}
        featureCatList={featureCatList}
        selectedCat={selectedCat}
        featureCatLoader={featureCatLoader}
        setSelectedCat={setSelectedCat}
      />
      <Wrapper>
        <img
          className="mt-[50px]"
          src={`${process.env.PUBLIC_URL}/images/DummyHomepageBanner.png`}
        />
      </Wrapper>
      <FeatureBrand
        brandCat={brandCat}
        brandCatList={brandCatList}
        selectedBrand={selectedBrand}
        brandCatLoader={brandCatLoader}
        setSelectedBrand={setSelectedBrand}
      />
      {/* <FeatureClearance /> */}
      <TimerBanner />
      <BlogsCard />
      <HomepageBanner />
      <HomepageContent />
      <HomepagePopularSearches />
    </div>
  );
};

export default React.memo(Homepage);
