import React from "react";

const ImagePopup = ({ setShowPopup, imageView }) => {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="modal-bg absolute inset-0 bg-gray-800 opacity-50"></div>
        <div className="modal relative bg-white w-[650px] flex flex-col rounded-lg shadow-lg">
          <div className="flex p-[10px] items-center justify-between bg-[#def9ec] rounded-t-lg">
            <p>Image View</p>
            <button className="text-[22px]" onClick={() => setShowPopup(false)}>
              x
            </button>
          </div>
          <div className="flex items-center justify-center">
            <img
              className="w-[650px] h-[650px] rounded-b-lg object-cover"
              src={imageView}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;
