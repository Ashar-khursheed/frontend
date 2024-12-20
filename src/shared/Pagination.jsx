import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

export const Pagination = ({ paginationData, setPage, page }) => {
  const handlerPrev = (tempPage) => {
    if (page > 1) {
      setPage(tempPage);
    }
  };
  const handlerNext = (tempPage, pageLength) => {
    if (page < pageLength) {
      setPage(tempPage);
    }
  };

  const renderUI = (index, pageLength, link) => {
    let tempPage = link?.url?.split("=")[1];
    if (index === 0) {
      return (
        <span
          key={index}
          style={{ opacity: `${page == 1 ? "0.3" : "1"}` }}
          className={`cursor-pointer text-[#64748B] flex items-center flex-row text-sm p-[10px] sm:p-5 font-bold uppercase`}
          onClick={() => handlerPrev(tempPage)}
        >
          <FaChevronLeft className="mr-2" color="#64748B" size={"12px"} />{" "}
          Previous
        </span>
      );
    } else if (index === pageLength) {
      return (
        <span
          key={index}
          style={{ opacity: `${pageLength - 1 == page ? "0.3" : "1"}` }}
          className={`cursor-pointer text-[#64748B] flex items-center flex-row text-sm p-[10px] sm:p-5 font-bold uppercase`}
          onClick={() => handlerNext(tempPage, pageLength - 1)}
        >
          Next <FaChevronRight className="ml-2" color="#64748B" size={"12px"} />
        </span>
      );
    } else {
      return (
        <span
          onClick={() => setPage(tempPage)}
          key={index}
          className={`border-transparent border transition-all hover:border-[#030303] cursor-pointer text-[#030303] rounded sm:rounded-0 py-[0px] px-[10px] sm:py-4 sm:px-6 block ${
            link.active ? "bg-primary text-white" : ""
          }`}
        >
          {link.label}
        </span>
      );
    }
  };

  return (
    <div className="block text-center w-[96vw] sm:w-[100%] ">
      <div className="mb-8 w-[96vw] sm:w-[100%] text-center inline-flex flex-row justify-center flex-wrap items-center border border-[#E2E8F0] rounded-[4px]">
        {paginationData.links
          ? paginationData.links.map((link, index) => {
              return renderUI(index, paginationData.links.length - 1, link);
            })
          : null}
      </div>
    </div>
  );
};
