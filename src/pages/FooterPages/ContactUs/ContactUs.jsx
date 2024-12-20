import React from "react";
import { Wrapper } from "../../../shared/Wrapper";
import { Breadcrumb } from "../../../shared/Breadcrumb";

const ContactUs = () => {
  const collectionBreadCrumb = [
    {
      url: "/",
      title: "Home",
    },
    {
      url: "/contact-us",
      title: "Contact us",
    },
  ];
  return (
    <>
      <Wrapper>
        <Breadcrumb items={collectionBreadCrumb} classes={"mt-[10px]"} />
      </Wrapper>
      <div className="flex items-center mt-[20px] sm:mt-[10px] justify-center text-[32px] font-bold text-white h-[160px] sm:h-[450px] w-full bg-gray-400">
        <img
          className="absolute h-[160px] sm:h-[450px] w-full object-cover opacity-[0.5]"
          src="https://images.pexels.com/photos/7689734/pexels-photo-7689734.jpeg?auto=compress&cs=tinysrgb&w=800"
        />
        <p className="relative text-[24px] sm:text-[54px]">Contact Us</p>
      </div>
      <Wrapper>
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1 text-[18px] sm:text-[60px] font-semibold text-start sm:text-center sm:text-start p-5">
            We’re the full package. reach out and we'll see how we can help.
          </div>
          <div className="flex-1 p-5 sm:p-10">
            <form>
              <div className="flex-col mb-[20px]">
                <p className="text-[#64748B] text-[16px]">Name*</p>
                <input placeholder="" className="border-b-2 w-[100%]" />
              </div>
              <div className="flex-col mb-[20px]">
                <p className="text-[#64748B] text-[16px]">Email*</p>
                <input placeholder="" className="border-b-2 w-[100%]" />
              </div>
              <div className="flex-col mb-[20px]">
                <p className="text-[#64748B] text-[16px]">Profession*</p>
                <input placeholder="" className="border-b-2 w-[100%]" />
              </div>
              <div className="flex-col mb-[20px]">
                <p className="text-[#64748B] text-[16px]">Company (optional)</p>
                <input placeholder="" className="border-b-2 w-[100%]" />
              </div>
              <div className="flex-col mb-[20px]">
                <p className="text-[#64748B] text-[16px]">Phone Number*</p>
                <input placeholder="" className="border-b-2 w-[100%]" />
              </div>
              <div className="flex-col mb-[20px]">
                <p className="text-[#64748B] text-[16px]">
                  How did you hear about us*
                </p>
                <input placeholder="" className="border-b-2 w-[100%]" />
              </div>
              <div className="flex-col mb-[20px]">
                <p className="text-[#64748B] text-[16px]">Message*</p>
                <input placeholder="" className="border-b-2 w-[100%]" />
              </div>
              <button className="flex items-center justify-center text-white rounded bg-[#186737] h-[40px] w-[100%] sm:w-[198px] px-[40px] py-[10px]">
                Send Message
              </button>
            </form>
          </div>
        </div>
        <div>
          <h1 className="font-bold ml-[15px] leading-[35.19px] text-[30px]">
            Our Locations
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-[100px] p-[15px]">
            <div className=" rounded">
              <div>
                <img
                  className="hidden sm:block object-cover w-[527px] h-[200px] sm:h-[353px] rounded"
                  src="https://images.pexels.com/photos/29497729/pexels-photo-29497729/free-photo-of-iconic-view-of-burj-khalifa-in-dubai-skyline.jpeg?auto=compress&cs=tinysrgb&w=800"
                />
              </div>
              <div className="py-5">
                <p className="text-[24px] font-normal leading-[28.15px]">
                  Dubai, United Arab Emirates 
                  <span className="text-[14px] text-[#64748B]">
                    (Headquarters)
                  </span>
                </p>
                <p className="text-[16px] leading-[24px] font-light text-[#64748B] mb-[10px]">
                  Showroom 01 - Building No 9-1 19 Street - Al Quoz - Al Quoz
                  Industrial Area 3 - Dubai - United Arab Emirates
                </p>
                <p className="text-[16px] leading-[24px] font-light text-[#64748B] mb-[10px]">
                  Ph .+91 9650726956
                </p>
                <p className="text-[16px] leading-[24px] font-light text-[#64748B] mb-[10px]">
                  danish@gmail.com
                </p>
              </div>
            </div>
            <div className=" h-[100%] rounded">
              <div>
                <img
                  className="hidden sm:block object-cover w-[527px] h-[200px] sm:h-[353px] rounded"
                  src="https://images.pexels.com/photos/29497729/pexels-photo-29497729/free-photo-of-iconic-view-of-burj-khalifa-in-dubai-skyline.jpeg?auto=compress&cs=tinysrgb&w=800"
                />
              </div>
              <div className="py-5">
                <p className="text-[24px] font-normal leading-[28.15px]">
                  Dubai, United Arab Emirates 
                  <span className="text-[14px] text-[#64748B]">
                    (Headquarters)
                  </span>
                </p>
                <p className="text-[16px] leading-[24px] font-light text-[#64748B] mb-[10px]">
                  Showroom 01 - Building No 9-1 19 Street - Al Quoz - Al Quoz
                  Industrial Area 3 - Dubai - United Arab Emirates
                </p>
                <p className="text-[16px] leading-[24px] font-light text-[#64748B] mb-[10px]">
                  Ph .+91 9650726956
                </p>
                <p className="text-[16px] leading-[24px] font-light text-[#64748B] mb-[10px]">
                  danish@gmail.com
                </p>
              </div>
            </div>
            <div className=" h-[100%] rounded">
              <div>
                <img
                  className="hidden sm:block object-cover w-[527px] h-[200px] sm:h-[353px] rounded"
                  src="https://images.pexels.com/photos/2730356/pexels-photo-2730356.jpeg?auto=compress&cs=tinysrgb&w=800"
                />
              </div>
              <div className="py-5">
                <p className="text-[24px] font-normal leading-[28.15px]">
                  Karachi, Pakistan 
                  <span className="text-[14px] text-[#64748B]">
                    (Headquarters)
                  </span>
                </p>
                <p className="text-[16px] leading-[24px] font-light text-[#64748B] mb-[10px]">
                  Showroom 01 - Building No 9-1 19 Street - Al Quoz - Al Quoz
                  Industrial Area 3 - Dubai - United Arab Emirates
                </p>
                <p className="text-[16px] leading-[24px] font-light text-[#64748B] mb-[10px]">
                  Ph .+91 9650726956
                </p>
                <p className="text-[16px] leading-[24px] font-light text-[#64748B] mb-[10px]">
                  danish@gmail.com
                </p>
              </div>
            </div>
            <div className=" h-[100%] rounded">
              <div>
                <img
                  className="hidden sm:block object-cover w-[527px] h-[200px] sm:h-[353px] rounded"
                  src="https://media.istockphoto.com/id/1452888631/photo/corniche-in-old-town-jeddah.jpg?b=1&s=612x612&w=0&k=20&c=E9oQfnilMZIFLMpggPWgJr4BP6D87PZk9pRr2GqvaxQ="
                />
              </div>
              <div className="py-5">
                <p className="text-[24px] font-normal leading-[28.15px]">
                  Jeddah, The Kingdom of Saudi Arabia 
                  <span className="text-[14px] text-[#64748B]">
                    (Headquarters)
                  </span>
                </p>
                <p className="text-[16px] leading-[24px] font-light text-[#64748B] mb-[10px]">
                  Showroom 01 - Building No 9-1 19 Street - Al Quoz - Al Quoz
                  Industrial Area 3 - Dubai - United Arab Emirates
                </p>
                <p className="text-[16px] leading-[24px] font-light text-[#64748B] mb-[10px]">
                  Ph .+91 9650726956
                </p>
                <p className="text-[16px] leading-[24px] font-light text-[#64748B] mb-[10px]">
                  danish@gmail.com
                </p>
              </div>
            </div>
            <div className=" h-[100%] rounded">
              <div>
                <img
                  className="hidden sm:block object-cover w-[527px] h-[200px] sm:h-[353px] rounded"
                  src="https://media.istockphoto.com/id/482787909/photo/corniche-doha-qatar-modern-urban-skyscrapers.jpg?b=1&s=612x612&w=0&k=20&c=RrRJ9RTn6aCqwl_BvD3U9vILcIFSOgmmt1pTgaii7Io="
                />
              </div>
              <div className="py-5">
                <p className="text-[24px] font-normal leading-[28.15px]">
                  Doha, Qatar 
                  <span className="text-[14px] text-[#64748B]">
                    (Headquarters)
                  </span>
                </p>
                <p className="text-[16px] leading-[24px] font-light text-[#64748B] mb-[10px]">
                  Showroom 01 - Building No 9-1 19 Street - Al Quoz - Al Quoz
                  Industrial Area 3 - Dubai - United Arab Emirates
                </p>
                <p className="text-[16px] leading-[24px] font-light text-[#64748B] mb-[10px]">
                  Ph .+91 9650726956
                </p>
                <p className="text-[16px] leading-[24px] font-light text-[#64748B] mb-[10px]">
                  danish@gmail.com
                </p>
              </div>
            </div>
            <div className=" h-[100%] rounded">
              <div>
                <img
                  className="hidden sm:block object-cover w-[527px] h-[353px] rounded"
                  src="https://images.pexels.com/photos/27858202/pexels-photo-27858202/free-photo-of-a-train-with-a-city-skyline-in-the-background.jpeg?auto=compress&cs=tinysrgb&w=800"
                />
              </div>
              <div className="py-5">
                <p className="text-[24px] font-normal leading-[28.15px]">
                  Texas, United State of America{" "}
                  <span className="text-[14px] text-[#64748B]">
                    (Headquarters)
                  </span>
                </p>
                <p className="text-[16px] leading-[24px] font-light text-[#64748B] mb-[10px]">
                  Showroom 01 - Building No 9-1 19 Street - Al Quoz - Al Quoz
                  Industrial Area 3 - Dubai - United Arab Emirates
                </p>
                <p className="text-[16px] leading-[24px] font-light text-[#64748B] mb-[10px]">
                  Ph .+91 9650726956
                </p>
                <p className="text-[16px] leading-[24px] font-light text-[#64748B] mb-[10px]">
                  danish@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default ContactUs;
