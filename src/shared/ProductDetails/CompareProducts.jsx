import React, { useState, useEffect } from "react";
import { FaShareAlt } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { apiClient } from "../../utils/apiWrapper";
import { useCart } from "../../context/CartContext";
import { IoPrintOutline } from "react-icons/io5";
import { CartButton } from "../CartButton";
import generatePDF, { usePDF, Resolution, Margin } from "react-to-pdf";

export const CompareProducts = ({
  productLoader,
  product,
  compareProductFields,
}) => {
  const [firstLayer, setFirstLayer] = useState([]);
  const [secondLayer, setSecondLayer] = useState([]);
  const [thirdLayer, setThirdLayer] = useState([]);
  const [forthLayer, setForthLayer] = useState([]);
  const [fifthLayer, setFifthLayer] = useState([]);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const [priceLayer, setPriceLayer] = useState([]);
  const options = {
    method: "open",
    resolution: Resolution.HIGH,
    page: {
      margin: Margin.SMALL,
      format: "letter",
      orientation: "landscape",
    },
    canvas: {
      mimeType: "image/png",
      qualityRatio: 1,
    },
    overrides: {
      pdf: {
        compress: true,
      },
      canvas: {
        useCORS: false,
      },
    },
  };

  useEffect(() => {
    if (product.compare_products) {
      const prices = [
        product.price || "N/A", // Price for the main product
        ...product.compare_products
          .slice(0, 3)
          .map((compare) => compare.price || "N/A"), // Prices for compared products
      ];
      setPriceLayer(prices);
    }
    if (product.specifications && product.compare_products) {
      const firstLayerTemp = product.specifications
        .map((spec) => spec.spec_name)
        .sort();
      setFirstLayer(firstLayerTemp);

      const secondLayerTemp = firstLayerTemp.map((first) => {
        const spec = product.specifications.find(
          (sec) => sec.spec_name === first
        );
        return spec ? spec.spec_value : "N/A";
      });
      setSecondLayer(secondLayerTemp);

      const thirdLayerTemp = firstLayerTemp.map((first) => {
        const spec = product.compare_products[0]?.specifications.find(
          (sec) => sec.spec_name === first
        );
        return spec ? spec.spec_value : "N/A";
      });
      setThirdLayer(thirdLayerTemp);

      const forthLayerTemp = firstLayerTemp.map((first) => {
        const spec = product.compare_products[1]?.specifications.find(
          (sec) => sec.spec_name === first
        );
        return spec ? spec.spec_value : "N/A";
      });
      setForthLayer(forthLayerTemp);

      const fifthLayerTemp = firstLayerTemp.map((first) => {
        const spec = product.compare_products[2]?.specifications.find(
          (sec) => sec.spec_name === first
        );
        return spec ? spec.spec_value : "N/A";
      });
      setFifthLayer(fifthLayerTemp);

      // Extract prices
      const priceTemp = [
        product.price || "N/A",
        product.compare_products[0]?.price || "N/A",
        product.compare_products[1]?.price || "N/A",
        product.compare_products[2]?.price || "N/A",
      ];
      setPrice(priceTemp);
    }
  }, [product]);

  const [price, setPrice] = useState([]);

  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      generatePDF(targetRef, { filename: "CompareTable.pdf" }, options);
      setIsPrinting(false);
    }, 500);
  };

  return (
    <React.Fragment>
      {!productLoader ? (
        <div ref={targetRef} className=" p-[10px] col-span-12 my-4 mt-12">
          {product &&
          product.compare_products &&
          product.compare_products.length &&
          product.specifications ? (
            <div class="relative rounded-md overflow-x-auto">
              {isPrinting && (
                <div className="flex pb-[10px] items-center justify-between">
                  <img
                    className=""
                    src={`${process.env.PUBLIC_URL}/images/logo.png`}
                    alt="logo"
                  />
                  <h1 className="text-center text-[24px]">
                    Compare with similar products <br />
                    فاتورة ضريبية
                  </h1>
                  <div className="text-right p-3 text-[14px]">
                    <p>Horeca Store UAE</p>
                    <p>
                      SO1, Building 9 AI Quoz <br />
                      Ind.3 PO Box 122851Dubai, UAE
                    </p>
                  </div>
                </div>
              )}
              <table className="min-w-full table-auto border-collapse border-4 border-gray-300 rounded-md">
                <thead>
                  <tr className="bg-green-100">
                    <th className="w-1/5 p-5 text-start bg-white relative ">
                      <div className="absolute top-8 w-[80%]">
                        <h2 className="text-black-100 text-2xl font-semibold py-2">
                          Compare with similar products
                        </h2>
                        <p className="text-[#4A4A4A] text-sm font-normal ">
                          Lorem ipsum dolor sit amet consectetur. Non nunc
                          tincidunt mattis ut. Lobortis donec eget enim euismod
                          quam molestie. Leo pellentesque ante amet felis
                          dignissim ac. Lectus non volutpat tincidunt semper
                          est. Platea quis libero eu tincidunt iaculis ut.
                        </p>
                      </div>
                    </th>
                    <th className="w-1/5 p-5  relative  border border-x-[1px] bg-[#DEF9EC80]">
                      <div className="flex flex-col mt-5">
                        <span className="font-semibold text-base text-white bg-primary py-2 mb-[10px] absolute top-0 left-0 w-full">
                          This Product
                        </span>
                        <span className="mt-5 text-black-100 text-base font-semibold m-[10px]">
                          {product.name}
                        </span>
                        <img
                          className="mx-auto my-5 w-[200px]"
                          src={
                            "https://testhssite.com/storage/" + product.image
                          }
                          // src="http://localhost:3000/profileIcons/Frame-1.png"
                          // https://testhssite.com/storage/mmv700s-2.jpg
                          //
                           alt={product.name}
                        />
                        <CartButton
                          productId={product.id}
                          quantity={1}
                          productName={product.name}
                        />
                      </div>
                    </th>
                    {product.compare_products
                      ? product.compare_products.map((compare, index) => {
                          return (
                            <React.Fragment key={compare.id}>
                              {index < 3 ? (
                                <th className="w-1/5 p-5  relative  border border-x-[1px] bg-white">
                                  <div className="flex flex-col mt-5">
                                    <span className=" flex  items-center h-[40px]  justify-center font-semibold text-base text-primary bg-[#DEF9EC] py-2 mb-[10px] absolute top-0 left-0 w-full">
                                      {/* Change Product */}
                                      <img
                                        className="hidden ml-2"
                                        src={
                                          process.env.PUBLIC_URL +
                                          "/icons/write.png"
                                        }
                                        alt={compare.name}
                                      />
                                    </span>
                                    <span className="mt-5 text-black-100 text-base font-semibold m-[10px]">
                                      {compare.name}
                                    </span>
                                    <img
                                      className="mx-auto my-5 w-[200px]"
                                      src={
                                        "https://testhssite.com/storage/" +
                                        compare.image
                                      }
                                      alt={compare.name}
                                    />
                                    <CartButton
                                      product_id={compare.id}
                                      quantity={1}
                                      productName={compare.name}
                                    />
                                  </div>
                                </th>
                              ) : null}
                            </React.Fragment>
                          );
                        })
                      : null}
                  </tr>
                </thead>
                <tbody className="text-[#64748B] font-semibold text-base">
                  <tr className="bg-[#DEF9EC]">
                    <td className="px-5 py-3 font-bold">Price</td>
                    {priceLayer.map((price, index) => (
                      <td key={`price-${index}`} className="px-5 py-3">
                        USD <strong> {price}</strong>
                      </td>
                    ))}
                  </tr>
                  {firstLayer
                    ? firstLayer.map((item, index) => {
                        return (
                          <tr
                            className={`${
                              index % 2 === 0 ? "bg-white  " : "bg-[#DEF9EC]"
                            }`}
                            key={`spec-row-${index}`}
                          >
                            <td className="px-5 py-3">{firstLayer[index]}</td>
                            <td className="px-5 py-3">{secondLayer[index]}</td>
                            <td className="px-5 py-3">{thirdLayer[index]}</td>
                            <td className="px-5 py-3">{forthLayer[index]}</td>
                            <td className="px-5 py-3">{fifthLayer[index]}</td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>{" "}
            </div>
          ) : (
            <div></div>
          )}
          {isPrinting && (
            <div className="flex items-center mt-[0px] py-[20px]">
              <p>Order Online for Fast Shipping & Lower Prices at</p>
              <p className="text-[#1B6738] font-medium ml-[10px]">
                www.horecastore.ae
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="col-span-12 my-8">
          <Skeleton className="w-full h-[900px] " />
        </div>
      )}

      {product.compare_products ? (
        <div className="col-span-12 mr-[10px]">
          <div className="flex items-end justify-end">
            <button className="text-white bg-[#64748B] rounded-md py-2 px-5 text-base font-semibold flex items-center mr-4">
              <FaShareAlt className="mr-1" />
              <p>Share</p>
            </button>
            <button
              onClick={() => handlePrint()}
              className="text-white bg-primary rounded-md py-2 px-5 text-base font-semibold flex items-center"
            >
              <IoPrintOutline className="mr-1" />
              <p>Print</p>
            </button>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};
