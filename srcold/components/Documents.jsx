import React, { memo } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const Documents = ({ docs }) => {
  let documents = [];
  try {
    if (docs) {
      documents = JSON.parse(docs);
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }

  // Convert object to array if documents is an object
  const documentArray = Array.isArray(documents)
    ? documents
    : Object.values(documents);

  const handleOpenPdf = (path) => {
    const url = `https://testhssite.com/storage/${path}`;
    window.open(url, "_blank");
  };
  return (
    <div className="bg-white rounded-md p-5 border-2 border-[#E2E8F0] mt-3">
      {/* Badge Section */}
      <span className="text-black-200 document-text mb-3">
        Resources And Downloads
      </span>
      <div class="grid grid-cols-3 gap-2 mt-3">
        {/* Ensure documentArray is an array before using .map */}
        {documentArray.length > 0 ? (
          documentArray.map((item, index) => {
            return (
              <div
                className="flex flex-col relative p-1 flex justify-center items-center"
                key={index}
              >
                <iframe
                  src={`https://testhssite.com/storage/${item.path}`}
                  title={item.title}
                  className="w-full border h-full border-none"
                  width="500"
                  style={{ border: "1px solid black", height: "151px" }}
                />

                {/* Overlay div on top of iframe */}
                <div
                  onClick={() => handleOpenPdf(item.path)}
                  className="absolute bg-[red] cursor-pointer top-0 left-0 w-full h-full bg-transparent z-10"
                >
                  {/* Content inside the overlay */}
                  <span
                    // style={{ marginLeft: "45px" }}
                    className="absolute top-1/2 h-[150px] mt-[-14px] border-r border-t border-black broder-[1px] ml-[42px] w-[12px] bg-[white] ml-[45px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
                  ></span>
                </div>

                <span className="mt-3 text-xs text-[#186737] font-semibold">
                  {item.title}
                </span>
              </div>
            );
          })
        ) : (
          <Skeleton count={3} />
        )}
      </div>
    </div>
  );
};

export default memo(Documents);
