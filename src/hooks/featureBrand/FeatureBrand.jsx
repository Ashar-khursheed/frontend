import React, { useEffect, useState, lazy } from "react";
import { Wrapper } from "../../shared/Wrapper";
import { FeatureHeader } from "../../shared/FeatureHeader";
import Skeleton from "react-loading-skeleton";
const ProductCard = lazy(() => import("../../shared/ProductCard"));
const FeatureBrand = ({
  brandCat,
  brandCatList,
  selectedBrand,
  brandCatLoader,
  setSelectedBrand,
}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const showFeatureProduct = brandCat
      .filter((product) => selectedBrand === product.brand_name)
      .map((product) => product.products);
    setProducts(showFeatureProduct[0]);
  }, [selectedBrand, brandCat]);

  const smallScreenCss =
    "flex grid-cols-5 sm:grid md:grid lg:grid 2xl:grid gap-5 sm:gap-5 sm:grid sm:space-x-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5";

  const bigScreenCss =
    "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-5 w-full";

  const productList =
    products &&
    products.filter((item) => {
      if (item.sale_price == null) {
        item.sale_price = item.price;
      }
      return true;
    });

  return (
    <Wrapper>
      <FeatureHeader
        data={brandCatList}
        classes={"mt-8 sm:mt-14 sm:mb-6"}
        title="Feature Brands"
        selectedItem={selectedBrand}
        setSelectedItem={setSelectedBrand}
        loader={brandCatLoader}
      />
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
        className={window?.innerWidth > 640 ? bigScreenCss : smallScreenCss}
      >
        {brandCatLoader ? (
          Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="col-span-1 mt-1 min-h-[550px]" />
          ))
        ) : (
          <React.Fragment>
            {window?.innerWidth < 640 ? (
              <>
                {productList && productList.length > 0 ? (
                  productList.map((product, index) =>
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
              </>
            ) : (
              <>
                {/* <div className="grid grid-cols-1 gap-4 w-[85vw] sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"> */}
                {productList && productList.length > 0 ? (
                  productList.map((product, index) =>
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
                {/* </div> */}
              </>
            )}
          </React.Fragment>
        )}
      </div>
    </Wrapper>
  );
};

export default React.memo(FeatureBrand);
