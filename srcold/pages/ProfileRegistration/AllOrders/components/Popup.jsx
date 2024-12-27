import React from "react";

const Popup = ({ setShowPopup }) => {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="modal-bg absolute inset-0 bg-gray-800 opacity-50"></div>
        <div className="modal relative bg-white w-[650px] flex flex-col rounded-lg shadow-lg">
          <div className="flex items-center justify-between bg-[#DEF9EC] rounded-t-lg p-2">
            <p className="font-sans p-[5px] text-lg text-[#000000] font-medium leading-[21.11px] text-left decoration-skip-ink-none underline-offset-4">
              Enter a new shipping Address
            </p>
            <button onClick={() => setShowPopup(false)}>X</button>
          </div>
          <div className="p-[5px]">
            <div className="mt-[10px]">
              <p className="font-sans ml-[10px] p-[5px] text-lg text-[#000000] font-medium leading-[21.11px] text-left decoration-skip-ink-none underline-offset-4">
                Name :
              </p>
              <input
                className="border-2 rounded ml-[2%] p-[5px] w-[96%]"
                placeholder="Name"
              />
            </div>
            <div className="mt-[10px]">
              <p className="font-sans ml-[10px] p-[5px] text-lg text-[#000000] font-medium leading-[21.11px] text-left decoration-skip-ink-none underline-offset-4">
                Phone :
              </p>
              <input
                className="border-2 rounded ml-[2%] p-[5px] w-[96%]"
                placeholder="Phone No."
              />
            </div>
            <div className="mt-[10px]">
              <p className="font-sans ml-[10px] p-[5px] text-lg text-[#000000] font-medium leading-[21.11px] text-left decoration-skip-ink-none underline-offset-4">
                Address :
              </p>
              <input
                type="text"
                className="border-2 rounded ml-[2%] p-[5px] w-[96%]"
                placeholder="Address"
              />
            </div>
            <div className="flex items-center justify-end p-[15px]">
              <button
                onClick={() => setShowPopup(false)}
                className="flex m-[10px] items-center justify-center rounded-md font-sans w-[180px] h-[40px] border border-[#666666] text-[16px] text-[#666666] font-medium leading-[16px] text-left underline-offset-auto decoration-slice"
              >
                Cancel
              </button>
              <button className="flex mb-[5px] bg-[#DEF9EC] items-center justify-center rounded-md font-sans w-[180px] h-[40px] text-[#186737] text-[16px] font-medium leading-[16px] text-left underline-offset-auto decoration-slice">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
