import React, { useState, useEffect } from "react";
import { Wrapper } from "../../shared/Wrapper";

export const TimerBanner = () => {
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
      <div className="flex items-center gap-4 flex-col sm:flex-row">
        <div className="relative basis-1/2 rounded-lg mt-8 ">
          <img
            src={process.env.PUBLIC_URL + "/images/blog/timerBanner/1.jpg"}
            alt=""
            className="rounded-lg"
          />
          <div className="flex items-center justify-between">
            <div className="text-base text-gray-700 absolute font-semibold top-[58%] left-10">
              Remaining Time
            </div>
            <div className="rounded-[4px] mt-[12px] border border-gray-300 mt-1 bg-white px-5 py-1 font-semibold min-w-[150px] text-center absolute top-[65%] left-10">
              <span className="text-gray-700 text-lg mx-2">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="text-gray-700 text-lg mx-2">
                : {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-gray-700 text-lg mx-2">
                : {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-black-100 text-lg mx-2">
                : {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
        <div className="relative basis-1/2 rounded-lg mt-8 ">
          <img
            src={process.env.PUBLIC_URL + "/images/blog/timerBanner/2.jpg"}
            alt=""
            className="rounded-lg"
          />
          <div className="flex items-center justify-between">
            <div className="text-base text-gray-700 absolute font-semibold top-[58%] left-10">
              Remaining Time
            </div>
            <div className="rounded-[4px] mt-[12px] border border-gray-300 mt-1 bg-white  px-5 py-1 font-semibold min-w-[150px] text-center absolute top-[65%] left-10">
              <span className="text-gray-700 text-lg mx-2">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="text-gray-700 text-lg mx-2">
                : {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-gray-700 text-lg mx-2">
                : {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-black-100 text-lg mx-2">
                : {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
