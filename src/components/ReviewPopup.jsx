import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiClient } from "../utils/apiWrapper";
import { InfinitySpin } from "react-loader-spinner";
import { notify } from "../utils/notify";
const ReviewPopup = ({ setShowPopup, popupHeading, id,setUpdateReviews,updateReviews,reviewId}) => {
  let url='add-customer-reviews';
   if(reviewId){
      url=`customer-reviews-update/${reviewId}`;
   }
  

  const [loader, setLoader] = useState(false);
  const [getData, setData] = useState([]);
  const [rating, setRating] = useState(0);  
  const [hoveredRating, setHoveredRating] = useState(0);  

 // Handle click on a star
 const handleClick = (index) => {
  setRating(index);
};

// Handle hover event
const handleMouseEnter = (index) => {
  setHoveredRating(index);
};

const handleMouseLeave = () => {
  setHoveredRating(0);
};

// Render the stars
const renderStars = () => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const isFilled = i <= (hoveredRating || rating); // If hovered or selected, fill the star
    stars.push(
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        className={`w-6 h-6 cursor-pointer transition-all duration-200 ${
          isFilled ? "text-yellow-500" : "text-gray-300"
        }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        onClick={() => handleClick(i)}
        onMouseEnter={() => handleMouseEnter(i)}
        onMouseLeave={handleMouseLeave}
      >
        <path
          d="M12 17.75l6.125 3.25-1.625-7.25 5.25-4.5-7.25-.625L12 2 8.5 8.75l-7.25.625 5.25 4.5-1.625 7.25L12 17.75z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return stars;
};


  const handleForm = async (data) => {
    const formData = new FormData();
    formData.append('star', rating);
    formData.append('product_id', id);
    formData.append('comment', data.comment);
    // Append image if present
    if (data.image?.[0]) {
      formData.append('image', data.image[0]);
    }
 
    try {
      setLoader(true);
      let response;
      if(reviewId){
         response = await apiClient.put(url, formData,{
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setUpdateReviews(!updateReviews);
      }else{
        console.log('no');
         response = await apiClient.post(url, formData,{
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
     
      setData(response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoader(false);
    }
  };

  const schema = yup
    .object({
      comment: yup.string().required(),
      image: yup
      .mixed()
      .test('fileSize', 'File size is too large', (value) => !value || value[0]?.size <= 2000000) // 2MB limit
      .test('fileType', 'Only .jpg, .jpeg, .png files are allowed', (value) => {
        return !value || ['image/jpeg', 'image/png'].includes(value[0]?.type);
      }),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    handleForm(data);
    reset();
    setRating(0);
    setHoveredRating(0);
    // setShowPopup(false);
  };

  useEffect(()=>{
    if(getData.success){
      notify("Success",getData.message);
      setShowPopup(false);
      setUpdateReviews(!updateReviews);
    } 
     
  },[getData]);
 
 
 
  return (
    <div>
      <div className="fixed inset-0 p-[10px] flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="modal-bg absolute inset-0 bg-gray-800 opacity-50"></div>
        <div className="modal relative bg-white w-[650px] flex flex-col rounded-lg shadow-lg">
          <div className="flex items-center justify-between bg-[#DEF9EC] rounded-t-lg p-2">
            <p className="font-sans p-[5px] text-base text-[#000000] font-medium leading-[21.11px] text-left decoration-skip-ink-none underline-offset-4">
              {popupHeading}
            </p>
            <button onClick={() => setShowPopup(false)}>X</button>
          </div>
 
          <form onSubmit={handleSubmit(onSubmit)}>
            {getData.messa}
            <div className="p-[5px]">
              

              <div className="mt-[10px]">
                <p className="font-sans ml-[10px] p-[5px] text-base text-[#000000] font-medium leading-[21.11px] text-left decoration-skip-ink-none underline-offset-4">
                  Images :
                </p>
                <input
                  type="file"
                  multiple
                  className="border-2 rounded ml-[2%] p-[5px] w-[96%]"

                  // {...register("images")}
                />
                <span>{errors.address?.images}</span>
              </div>
              <div className="mt-[10px]">
                <p className="font-sans ml-[10px] p-[5px] text-base text-[#000000] font-medium leading-[21.11px] text-left decoration-skip-ink-none underline-offset-4">
                  Comment :
                </p>
                <textarea
                  type="text"
                  className="border-2 rounded ml-[2%] p-[5px] w-[96%]"
                  placeholder="Enter your comment"
                  {...register("comment")}
                />
                <span>{errors.state?.comment}</span>
              </div>
              <div className="flex items-center space-x-2 ml-10">  
      {renderStars()}
      
    </div>
              <div className="flex items-center justify-end p-[15px]">
                <button
                  onClick={() => setShowPopup(false)}
                  className="flex m-[10px] items-center justify-center rounded-md font-sans w-[180px] h-[40px] border border-[#666666] text-[16px] text-[#666666] font-medium leading-[16px] text-left underline-offset-auto decoration-slice"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex mb-[5px] bg-[#DEF9EC] items-center justify-center rounded-md font-sans w-[180px] h-[40px] text-[#186737] text-[16px] font-medium leading-[16px] text-left underline-offset-auto decoration-slice"
                >
                  Submit
                </button>
                {loader ? (
                  <InfinitySpin
                    visible={true}
                    height="120"
                    width="120"
                    color="#186737"
                    ariaLabel="infinity-spin-loading"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;
