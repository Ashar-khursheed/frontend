import React from "react";
import { Link } from "react-router-dom";

export const Category = ({ category }) => {
  return (
    <Link
      to={"/collections/" + category.slug}
      className="min-h-[230px] relative font-semibold bg-gray-100 flex items-center justify-center flex-col sm:basis[24%] lg:basis-[20%] xl:basis-[12.5%]  hover:drop-shadow-lg  px-3 text-center group rounded-md border border-gray-100 transition-all hover:border-primary"
    >
      <img
        className="w-[120px] group-hover:brightness-105 transition-all"
        src={category.image}
        alt={category.name}
      />
      <p className="text-gray-700 text-[16px] text-[16px] sm:text-[12px] md:text-[16px] lg:text-[16px] xl:text-[14px] mt-4 font-normal ">
        {category.name}
      </p>
    </Link>
  );
};
