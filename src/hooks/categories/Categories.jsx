import React, { useState } from "react";
import { Wrapper } from "../../shared/Wrapper";
import { Link } from "react-router-dom";
import { Category } from "./Category";

export const Categories = ({ categories }) => {
  return (
    <Wrapper>
      {/* Categories Header  */}
      <div className="flex items-center justify-between mt-11">
        <h2 className="text-black-100  font-semibold text-[16px] sm:text-2xl">
          Shop by Categories
        </h2>
        <Link
          to="/collections"
          className="text-gray-700 text-[14px] sm:text-[16px]"
        >
          All Categories
        </Link>
      </div>

      {/* categories List  */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-5 mt-8">
        {categories.map((category, index) => {
          const isSmallScreen = window.innerWidth < 640;
          const maxCategories = isSmallScreen ? 6 : 14;

          if (index < maxCategories) {
            return (
              <React.Fragment key={index}>
                <Category category={category} />
              </React.Fragment>
            );
          }
          return null;
        })}
      </div>
    </Wrapper>
  );
};
