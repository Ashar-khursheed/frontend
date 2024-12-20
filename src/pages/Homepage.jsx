import React, { useState, useEffect } from "react";
import { Categories } from "../hooks/categories/Categories";
import { Hero } from "../hooks/hero/Hero";
import { RowNews } from "../hooks/rownews/RowNews";
import { productCategory, featureBrand } from "../data/homepage";
import { FeatureBrand } from "../hooks/featureBrand/FeatureBrand";
import { BlogsCard } from "../shared/BlogsCard";
import { FeatureProduct } from "../hooks/featureproducts/FeatureProducts";
import { FeatureClearance } from "../hooks/featureClearance/FeatureClearance";
import { TimerBanner } from "../hooks/timerBanner/TimerBanner";
import axios from "axios";
import { apiClient } from "../utils/apiWrapper";

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
  const data = [
    {
      redirectLink: "#",
      blogImg: "images/blog/blogImg/blog-1.png",
      writerImg: "images/blog/writer/writer-1.png",
      writtenBy: "Gabriel Kreuther",
      postedDate: "posted 08-august-2024",
      title:
        "Lorem ipsum dolor sit amet consectetur Pharetra non feugiat habitant ",
      describe:
        "Lorem ipsum dolor sit amet consectetur. Odio lectus sita ai quisque a suscipit hendrerit pretium volutpat turpis non ultrices. Amet mauris quis at venenatis Eu non congue egestas convallis proin Netus sed.",
      viewCount: "1",
      commentCount: "6",
      shareCount: "1",
      isFavorite: false,
    },
    {
      redirectLink: "#",
      blogImg: "images/blog/blogImg/blog-2.png",
      writerImg: "images/blog/writer/writer-2.png",
      writtenBy: " Don Bradman",
      postedDate: "posted 08-august-2024",
      title:
        "Lorem ipsum dolor sit amet consectetur Pharetra non feugiat habitant ",
      describe:
        "Lorem ipsum dolor sit amet consectetur. Odio lectus sita ai quisque a suscipit hendrerit pretium volutpat turpis non ultrices. Amet mauris quis at venenatis Eu non congue egestas convallis proin Netus sed.",
      viewCount: "1",
      commentCount: "6",
      shareCount: "1",
      isFavorite: false,
    },
    {
      redirectLink: "#",
      blogImg: "images/blog/blogImg/blog-3.png",
      writerImg: "images/blog/writer/writer-3.png",
      writtenBy: "gautam Khurrana",
      postedDate: "posted 08-august-2024",
      title:
        "Lorem ipsum dolor sit amet consectetur Pharetra non feugiat habitant ",
      describe:
        "Lorem ipsum dolor sit amet consectetur. Odio lectus sita ai quisque a suscipit hendrerit pretium volutpat turpis non ultrices. Amet mauris quis at venenatis Eu non congue egestas convallis proin Netus sed.",
      viewCount: "1",
      commentCount: "6",
      shareCount: "1",
      isFavorite: false,
    },
  ];

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
      <RowNews />
      <Categories categories={categories} />
      <FeatureProduct
        featureCat={featureCat}
        featureCatList={featureCatList}
        selectedCat={selectedCat}
        featureCatLoader={featureCatLoader}
        setSelectedCat={setSelectedCat}
      />
      <FeatureBrand
        brandCat={brandCat}
        brandCatList={brandCatList}
        selectedBrand={selectedBrand}
        brandCatLoader={brandCatLoader}
        setSelectedBrand={setSelectedBrand}
      />
      <FeatureClearance />
      <TimerBanner />
      <BlogsCard data={data} />
    </div>
  );
};

export default React.memo(Homepage);