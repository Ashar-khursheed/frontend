import React from "react";
import { Wrapper } from "./Wrapper";

const HomepagePopularSearches = () => {
  const keywords = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <>
      <div className="bg-[#E2E8F0] h-[4px] w-full"></div>
      <Wrapper>
        <div className="mt-[40px] w-full">
          <p className="ml-[5px]">Popular searches</p>
          <div className="flex flex-wrap">
            {keywords?.map((item) => {
              return (
                <p className="m-[5px] px-[5px] border rounded-[4px] border-[#64748B] text-[#64748B]">
                  Best Restaurant Equipment
                </p>
              );
            })}
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default HomepagePopularSearches;
