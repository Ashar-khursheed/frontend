import React from "react";

const ReviewCard = ({ reviewData,deleteReview,updateReview }) => {
 
  const deleteReviews=(id)=>{
    deleteReview(id)
  }

  const updateReviews=(id,pid)=>{
 
    updateReview(id,pid);
  }
 
  return (
    <div
      key={reviewData?.product?.id}
      className="border-2 w-[100%] mt-[10px] rounded"
    >
      <div className="flex items-center border-b-2 p-[20px]">
        {reviewData?.product?.images?.map((img) => {
          return (
            <img
              className="w-[80px] ml-[10px] h-[80px] mr-[10px] object-cover rounded"
              src={"https://testhssite.com/storage/" + img}
            />
          );
        })}
        {/* <p className="font-work-sans text-[18px] font-medium leading-[24px] text-left decoration-skip-ink-none underline-from-font">
          {reviewData?.product?.name}
        </p> */}
      </div>
      <div className="p-[10px]">
        <div className="flex p-[4px]">
          {Array.from({ length: reviewData?.product.star }).map((_, index) => (
            <img
              key={index}
              className=" ml-[3px]  mr-[3px]"
              src={process.env.PUBLIC_URL + "/icons/star.png"}
            />
          ))}
        </div>
        <p className="font-work-sans text-[16px] mt-[5px] font-medium leading-[24px] text-left decoration-skip-ink-none underline-from-font p-[2px]">
          {reviewData?.product?.name}
        </p>
        <p className="font-work-sans text-[16px] font-normal leading-[24px] text-left decoration-skip-ink-none underline-from-font p-[2px]">
          {reviewData?.comment}
        </p>
        <p className="font-work-sans text-[12px] font-normal leading-[16px] text-left decoration-skip-ink-none underline-from-font p-[2px]">
          Yes, I recommend this product
        </p>
        <div className="flex items-center justify-between ">
          <p className="font-work-sans text-[12px] font-medium leading-[16px] text-left decoration-skip-ink-none underline-from-font text-[#818181] m-[5px]">
            {reviewData?.product?.updated_at.split("T")[0]}
          </p>
          <div className="flex flex-row items-center justify-between">
            <div>
          <button onClick={()=>updateReviews(reviewData.id,reviewData?.product_id)} className="font-work-sans border-2 rounded-md p-[10px] text-[#808080] text-[14px] font-medium leading-[16px] text-left  decoration-skip-ink-none underline-from-font">
            Update Review
          </button>
          </div>
          <div>
          <button onClick={()=>deleteReviews(reviewData.id)} className="font-work-sans border-2 rounded-md p-[10px] text-[#808080] text-[14px] font-medium leading-[16px] text-left  decoration-skip-ink-none underline-from-font">
            Delete Review
          </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
