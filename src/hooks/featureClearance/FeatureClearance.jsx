import React, { useState, useEffect } from "react";
import { Wrapper } from "../../shared/Wrapper";
import { flashClearance } from "../../data/homepage";
import { ProductCard } from "../../shared/ProductCard";
import { Link } from "react-router-dom";

export const FeatureClearance = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const timestamp = 1733746735; // Your timestamp here

  useEffect(() => {
    function updateTimeLeft() {
      const now = Math.floor(Date.now() / 1000); // Current time in seconds since epoch
      const difference = timestamp - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (24 * 3600));
      const hours = Math.floor((difference % (24 * 3600)) / 3600);
      const minutes = Math.floor((difference % 3600) / 60);
      const seconds = difference % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    }

    updateTimeLeft(); // Initial calculation

    const intervalId = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [timestamp]);

  return (
    <Wrapper>
      <img
        className="w-full my-8 rounded-md min-h-[150px]"
        src={process.env.PUBLIC_URL + "/images/blog/banner/long-banner.jpg"}
        alt=""
      />
      {/* <div className="flex items-center justify-between">
                <h3 className="text-black-100 font-semibold text-2xl">Flash Clearance Deals</h3>
                <div className="rounded-[4px] border border-gray-400 px-5 py-1 font-semibold min-w-96 text-center">
                    <span className="text-primary text-xl mx-2">Sales End in</span>
                    <span className="text-gray-700 text-lg mx-2">{String(timeLeft.days).padStart(2, '0')}</span>
                    <span className="text-gray-700 text-lg mx-2">: {String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="text-gray-700 text-lg mx-2">: {String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="text-black-100 text-lg mx-2">: {String(timeLeft.seconds).padStart(2, '0')}</span>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-5 mt-4">
                {flashClearance.map((product, index) => (
                    <ProductCard flashSale={true} classes="col-span-1 mt-1 !min-h-[450px]" key={index} product={product} />
                ))}
            </div> */}

      <div className="flex flex-col items-center justify-center p-3 bg-[#F9FAFB] text-[#4B5563] rounded-[4px] border border-gray-300 mt-8 sm:flex-row">
        <h2 className="text-[22px] font-bold text-center">
          SUMMER CLEAREANCE SALE
        </h2>
        <p className="mx-8 text-base text-center">
          Up to 50% discount offers along with unlimited campaigns and deals
        </p>
        <Link
          to="/"
          className="text-base border-2 rounded-[4px] font-semibold border-[#4B5563] sm:mt-[10px] text-center border-dashed px-4 py-2"
        >
          Discover More
        </Link>
      </div>
    </Wrapper>
  );
};
