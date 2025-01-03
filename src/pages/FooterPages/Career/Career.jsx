import React from "react";
import { Wrapper } from "../../../shared/Wrapper";
import { Breadcrumb } from "../../../shared/Breadcrumb";
import { CiSearch } from "react-icons/ci";

const Career = () => {
  const collectionBreadCrumb = [
    {
      url: "/",
      title: "Home",
    },
    {
      url: "/career",
      title: "Career",
    },
  ];
  return (
    <>
      <Wrapper>
        <Breadcrumb items={collectionBreadCrumb} classes={"mt-[10px]"} />
      </Wrapper>
      <div className="flex items-center mt-[10px] justify-center font-bold text-white h-[170px] sm:h-[640px] w-full bg-gray-400">
        <img
          className="absolute h-[170px] sm:h-[640px] w-full object-cover opacity-[1]"
          src={`${process.env.PUBLIC_URL}/images/careerbanner.png`}
        />
        <div className="relative mt-[0%] sm:mt-[20%]">
          <form className="flex items-center w-[90vw] sm:w-[50vw] h-14 overflow-hidden bg-[white] p-[5px] rounded-full">
            <input
              type="text"
              className="h-full w-full border-b-2 border-l border-r-gray-300 px-3 text-base text-[#64748B] outline-none"
              placeholder="I'm Looking for..."
            />
            <button type="submit" className="bg-primary p-2 rounded-full mr-2">
              <CiSearch color="white" size={26} />
            </button>
          </form>
        </div>
      </div>
      <Wrapper>
        <div className="flex flex-col items-center justify-center text-center mt-[40px] ">
          <h1 className="leading-[21px] sm:leading-[70.38px] text-[18px] sm:text-[60px] font-semibold">
            <span>Jobs</span>
            <span> @</span>
            <span className="text-[#186737]"> HorecaStore</span>
          </h1>
          <div className="w-[100%] sm:w-[70%]">
            <p className=" text-[12px] sm:text-[15px] leading-[18px] sm:leading-[32px] font-normal text-[#666666]">
              Lorem ipsum dolor sit amet consectetur. Commodo quam id integer
              molestie amet. Accumsan sit volutpat adipiscing proin cursus urna
              leo id vitae. Eget eu pretium lorem consectetur egestas nam massa
              amet ut. Viverra etiam imperdiet magna hendrerit nunc interdum
              proin aliquet. Vel fames purus enim dolor fringilla. Sed vulputate
              lectus lorem vestibulum tempus.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 items-center p-5 py-10 justify-between">
          <div className="flex flex-col items-center justify-center p-[10px]">
            <img
              src={process.env.PUBLIC_URL + "/images/Mask_group.png"}
              alt=""
            />
            <p className="text-[16px] sm:text-[18px] leading-[18px] sm:leading-[32px] mt-[10px] font-normal">
              Receive Application{" "}
            </p>
            <p className="text-[16px] sm:text-[18px] leading-[18px] sm:leading-[32px] font-normal">
              ________ 01 ________
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-[10px]">
            <img
              src={process.env.PUBLIC_URL + "/images/Mask_group.png"}
              alt=""
            />
            <p className="text-[16px] sm:text-[18px] leading-[18px] sm:leading-[32px] mt-[10px] font-normal">
              Screen And Shortlist{" "}
            </p>
            <p className="text-[16px] sm:text-[18px] leading-[18px] sm:leading-[32px] font-normal">
              ________ 02 ________
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-[10px]">
            <img
              src={process.env.PUBLIC_URL + "/images/Mask_group.png"}
              alt=""
            />
            <p className="text-[16px] sm:text-[18px] leading-[18px] sm:leading-[32px] mt-[10px] font-normal">
              {/* Technial Test & */}
              Interview{" "}
            </p>
            <p className="text-[16px] sm:text-[18px] leading-[18px] sm:leading-[32px] font-normal">
              ________ 03 ________
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-[10px]">
            <img
              src={process.env.PUBLIC_URL + "/images/Mask_group.png"}
              alt=""
            />
            <p className="text-[16px] sm:text-[18px] leading-[18px] sm:leading-[32px] mt-[10px] font-normal">
              Leadership Interview{" "}
            </p>
            <p className="text-[16px] sm:text-[18px] leading-[18px] sm:leading-[32px] font-normal">
              ________ 04 ________
            </p>
          </div>
          <div className="hidden sm:flex flex-col items-center justify-center p-[10px]">
            <img
              src={process.env.PUBLIC_URL + "/images/Mask_group.png"}
              alt=""
            />
            <p className="text-[16px] sm:text-[18px] leading-[18px] sm:leading-[32px] mt-[10px] font-normal">
              Get Offer{" "}
            </p>
            <p className="text-[16px] sm:text-[18px] leading-[18px] sm:leading-[32px] font-normal">
              ________ 05 ________
            </p>
          </div>
        </div>
        <div className="mb-[30px] sm:mb-[100px] ">
          <img
            className="h-[160px] sm:h-full"
            src={process.env.PUBLIC_URL + "/images/Beware.png"}
          />
        </div>
        <div className=" mb-[-80px]">
          <h1 className="font-normal sm:font-bold text-left sm:text-center leading-[21px] sm:leading-[35.19px] text-[21px] m-[10px] sm:text-[30px]">
            Horeca Store Around The Globe
          </h1>
          <div className="grid grid-cols-2 ml-[4%] sm:ml-[0%] sm:grid-cols-3 gap-4 mb-[100px]">
            <div className="h-full sm:h-[539px] rounded">
              <div>
                <img
                  className="w-[184px] sm:w-[527px] h-[111px] sm:h-[353px] rounded"
                  src="https://images.pexels.com/photos/29497729/pexels-photo-29497729/free-photo-of-iconic-view-of-burj-khalifa-in-dubai-skyline.jpeg?auto=compress&cs=tinysrgb&w=800"
                />
              </div>
              <div className="py-5">
                <p className="text-[16px] sm:text-[24px] font-normal leading-[18px] sm:leading-[28.15px]">
                  Dubai, United Arab Emirates 
                  <span className="hidden sm:block text-[14px] text-[#64748B]">
                    (Headquarters)
                  </span>
                </p>
                <div className="hidden sm:block">
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
            <div className="h-full sm:h-[539px] rounded">
              <div>
                <img
                  className="w-[184px] sm:w-[527px] h-[111px] sm:h-[353px] rounded"
                  src="https://images.pexels.com/photos/29497729/pexels-photo-29497729/free-photo-of-iconic-view-of-burj-khalifa-in-dubai-skyline.jpeg?auto=compress&cs=tinysrgb&w=800"
                />
              </div>
              <div className="py-5">
                <p className="text-[16px] sm:text-[24px] font-normal leading-[18px] sm:leading-[28.15px]">
                  Dubai, United Arab Emirates 
                  <span className="hidden sm:block text-[14px] text-[#64748B]">
                    (Headquarters)
                  </span>
                </p>
                <div className="hidden sm:block">
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
            <div className="h-full sm:h-[539px] rounded">
              <div>
                <img
                  className="w-[184px] sm:w-[527px] h-[111px] sm:h-[353px] rounded"
                  src="https://images.pexels.com/photos/2730356/pexels-photo-2730356.jpeg?auto=compress&cs=tinysrgb&w=800"
                />
              </div>
              <div className="py-5">
                <p className="text-[16px] sm:text-[24px] font-normal leading-[18px] sm:leading-[28.15px]">
                  Karachi, Pakistan 
                  <span className="hidden sm:block text-[14px] text-[#64748B]">
                    (Headquarters)
                  </span>
                </p>
                <div className="hidden sm:block">
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
            <div className="h-full sm:h-[539px] rounded">
              <div>
                <img
                  className="w-[184px] sm:w-[527px] h-[111px] sm:h-[353px] rounded"
                  src="https://media.istockphoto.com/id/1452888631/photo/corniche-in-old-town-jeddah.jpg?b=1&s=612x612&w=0&k=20&c=E9oQfnilMZIFLMpggPWgJr4BP6D87PZk9pRr2GqvaxQ="
                />
              </div>
              <div className="py-5">
                <p className="text-[16px] sm:text-[24px] font-normal leading-[18px] sm:leading-[28.15px]">
                  Jeddah, The Kingdom of Saudi Arabia 
                  <span className="hidden sm:block text-[14px] text-[#64748B]">
                    (Headquarters)
                  </span>
                </p>
                <div className="hidden sm:block">
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
            <div className="h-full sm:h-[539px] rounded">
              <div>
                <img
                  className="w-[184px] sm:w-[527px] h-[111px] sm:h-[353px] rounded"
                  src="https://media.istockphoto.com/id/482787909/photo/corniche-doha-qatar-modern-urban-skyscrapers.jpg?b=1&s=612x612&w=0&k=20&c=RrRJ9RTn6aCqwl_BvD3U9vILcIFSOgmmt1pTgaii7Io="
                />
              </div>
              <div className="py-5">
                <p className="text-[16px] sm:text-[24px] font-normal leading-[18px] sm:leading-[28.15px]">
                  Doha, Qatar 
                  <span className="hidden sm:block text-[14px] text-[#64748B]">
                    (Headquarters)
                  </span>
                </p>
                <div className="hidden sm:block">
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
            <div className="h-full sm:h-[539px] rounded">
              <div>
                <img
                  className="w-[184px] sm:w-[527px] h-[111px] sm:h-[353px] rounded"
                  src="https://images.pexels.com/photos/27858202/pexels-photo-27858202/free-photo-of-a-train-with-a-city-skyline-in-the-background.jpeg?auto=compress&cs=tinysrgb&w=800"
                />
              </div>
              <div className="py-5">
                <p className="text-[16px] sm:text-[24px] font-normal leading-[18px] sm:leading-[28.15px]">
                  Texas, United State of America{" "}
                  <span className="hidden sm:block text-[14px] text-[#64748B]">
                    (Headquarters)
                  </span>
                </p>
                <div className="hidden sm:block">
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
        </div>
        <div className="mb-[10px] mt-[20px]">
          <div className="">
            <img
              className="ml-[85%] sm:ml-[94%] h-[60px] sm:h-[100%]"
              src={process.env.PUBLIC_URL + "/images/quotesImg.png"}
            />
            <p className="mt-[-25px] h-[100%] sm:h-[200px] border p-5 border-[#666666] text-[16px] leading-[32px] font-light">
              Lorem ipsum dolor sit amet consectetur. Sit mauris nisi urna amet
              dignissim ac felis. Neque senectus at sem cum ut amet elementum
              ut. Massa ut ut faucibus ut aliquam ut. Turpis in mauris dictum
              est orci. Lorem feugiat rutrum nibh tellus aliquet felis risus. Id
              nibh eros bibendum sagittis felis nam aliquam leo. Quisque
              ullamcorper mauris convallis facilisi et turpis sit consequat.
              Etiam vehicula ornare sit urna elementum blandit nibh viverra.
              Quis et ac leo dictum augue egestas orci cursus platea. Nunc id
              quam orci ut nibh. Condimentum diam vulputate id faucibus
              nunc.ornare sit urna elementum blandit nibh viverra. Quis et ac
              leo dictum augue egestas orci cursus platea. Nunc id quam orci ut
              nibh. Condimentum diam vulputate id faucibus nunc.
            </p>
          </div>
        </div>
        <div className="ml-[10px] py-10 ">
          <h1 className="text-[18px] sm:text-[45px] text-start sm:text-center sm:text-start leading-[21px] sm:leading-[52.79px] font-semibold">
            We are lifelong learners
          </h1>
          <p className=" text-[13px] sm:text-[16px] sm:text-center text-start leading-[22px] sm:leading-[32px] font-light">
            Lorem ipsum dolor sit amet consectetur. Etiam sed elementum volutpat
            ut vel mi eu libero. Nisl dui feugiat massa neque. Et tincidunt sit
            gravida quam. Scelerisque odio sed augue risus ullamcorper.
            Penatibus auctor lectus dolor egestas est tempor sit. Ultricies sit
            at lobortis enim at pharetra magna aliquam facilisi. Eget eu mauris
            tortor ultricies tristique sed luctus et nisl. Massa lacinia sed
            commodo amet. Pharetra sed tristique arcu turpis consectetur. Lectus
            cras pharetra viverra sapien turpis eget ut.
          </p>
        </div>
        <div className="pl-[10px]">
          <div className="flex mt-[10px] mb-[20px] w-[98%] sm:w-[100%]">
            <img
              className="mr-[20px] object-cover h-[106px] sm:h-[439px] w-[226px] sm:w-[60%] rounded"
              src="https://images.pexels.com/photos/7551442/pexels-photo-7551442.jpeg?auto=compress&cs=tinysrgb&w=800"
            />
            <img
              className=" object-cover h-[106px] sm:h-[439px] w-[160px] sm:w-[40%] rounded"
              src="https://images.pexels.com/photos/7689734/pexels-photo-7689734.jpeg?auto=compress&cs=tinysrgb&w=800"
            />
          </div>
          <div className="flex  w-[98%] sm:w-[100%]">
            <img
              className="mr-[20px] object-cover h-[106px] sm:h-[439px] w-[160px] sm:w-[40%] rounded"
              src="https://images.pexels.com/photos/7689734/pexels-photo-7689734.jpeg?auto=compress&cs=tinysrgb&w=800"
            />
            <img
              className=" object-cover h-[106px] sm:h-[439px] w-[226px] sm:w-[60%] rounded"
              src="https://images.pexels.com/photos/7551442/pexels-photo-7551442.jpeg?auto=compress&cs=tinysrgb&w=800"
            />
          </div>
        </div>
        <div className="mb-[10px] mt-[20px]">
          <div className="">
            <img
              className="ml-[85%] sm:ml-[94%] h-[60px] sm:h-[100%]"
              src={process.env.PUBLIC_URL + "/images/quotesImg.png"}
            />
            <p className="mt-[-25px] h-[100%] sm:h-[200px] border p-5 border-[#666666] text-[16px] leading-[32px] font-light">
              Lorem ipsum dolor sit amet consectetur. Sit mauris nisi urna amet
              dignissim ac felis. Neque senectus at sem cum ut amet elementum
              ut. Massa ut ut faucibus ut aliquam ut. Turpis in mauris dictum
              est orci. Lorem feugiat rutrum nibh tellus aliquet felis risus. Id
              nibh eros bibendum sagittis felis nam aliquam leo. Quisque
              ullamcorper mauris convallis facilisi et turpis sit consequat.
              Etiam vehicula ornare sit urna elementum blandit nibh viverra.
              Quis et ac leo dictum augue egestas orci cursus platea. Nunc id
              quam orci ut nibh. Condimentum diam vulputate id faucibus
              nunc.ornare sit urna elementum blandit nibh viverra. Quis et ac
              leo dictum augue egestas orci cursus platea. Nunc id quam orci ut
              nibh. Condimentum diam vulputate id faucibus nunc.
            </p>
          </div>
        </div>
        <div className="ml-[10px] py-10 ">
          <h1 className="text-[18px] sm:text-[45px] text-start sm:text-center sm:text-start leading-[21px] sm:leading-[52.79px] font-semibold">
            We pursue ideas and passions
          </h1>
          <p className=" text-[13px] sm:text-[16px] sm:text-center text-start leading-[22px] sm:leading-[32px] font-light">
            Lorem ipsum dolor sit amet consectetur. Etiam sed elementum volutpat
            ut vel mi eu libero. Nisl dui feugiat massa neque. Et tincidunt sit
            gravida quam. Scelerisque odio sed augue risus ullamcorper.
            Penatibus auctor lectus dolor egestas est tempor sit. Ultricies sit
            at lobortis enim at pharetra magna aliquam facilisi. Eget eu mauris
            tortor ultricies tristique sed luctus et nisl. Massa lacinia sed
            commodo amet. Pharetra sed tristique arcu turpis consectetur. Lectus
            cras pharetra viverra sapien turpis eget ut.
          </p>
        </div>
        <div className="pl-[10px]">
          <div className="flex mt-[10px] mb-[20px] w-[98%] sm:w-[100%]">
            <img
              className="mr-[20px] object-cover h-[106px] sm:h-[439px] w-[226px] sm:w-[60%] rounded"
              src="https://images.pexels.com/photos/7689734/pexels-photo-7689734.jpeg?auto=compress&cs=tinysrgb&w=800"
            />
            <img
              className="object-cover h-[106px] sm:h-[439px] w-[160px] sm:w-[40%] rounded"
              src="https://images.pexels.com/photos/7689734/pexels-photo-7689734.jpeg?auto=compress&cs=tinysrgb&w=800"
            />
          </div>
          <div className="flex w-[98%] sm:w-[100%] ">
            <img
              className="mr-[20px] object-cover h-[106px] sm:h-[439px] w-[160px] sm:w-[40%] rounded"
              src="https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=800"
            />
            <img
              className="object-cover h-[106px] sm:h-[439px] w-[226px] sm:w-[60%] rounded"
              src="https://images.pexels.com/photos/7689734/pexels-photo-7689734.jpeg?auto=compress&cs=tinysrgb&w=800"
            />
          </div>
        </div>
        <div className="mb-[10px] mt-[20px]">
          <div className="">
            <img
              className="ml-[85%] sm:ml-[94%] h-[60px] sm:h-[100%]"
              src={process.env.PUBLIC_URL + "/images/quotesImg.png"}
            />
            <p className="mt-[-25px] h-[100%] sm:h-[200px] border p-5 border-[#666666] text-[16px] leading-[32px] font-light">
              Lorem ipsum dolor sit amet consectetur. Sit mauris nisi urna amet
              dignissim ac felis. Neque senectus at sem cum ut amet elementum
              ut. Massa ut ut faucibus ut aliquam ut. Turpis in mauris dictum
              est orci. Lorem feugiat rutrum nibh tellus aliquet felis risus. Id
              nibh eros bibendum sagittis felis nam aliquam leo. Quisque
              ullamcorper mauris convallis facilisi et turpis sit consequat.
              Etiam vehicula ornare sit urna elementum blandit nibh viverra.
              Quis et ac leo dictum augue egestas orci cursus platea. Nunc id
              quam orci ut nibh. Condimentum diam vulputate id faucibus
              nunc.ornare sit urna elementum blandit nibh viverra. Quis et ac
              leo dictum augue egestas orci cursus platea. Nunc id quam orci ut
              nibh. Condimentum diam vulputate id faucibus nunc.
            </p>
          </div>
        </div>
        <div className="ml-[10px] py-10 ">
          <h1 className="text-[18px] sm:text-[45px] text-start sm:text-center sm:text-start leading-[21px] sm:leading-[52.79px] font-semibold">
            Come and Grow with us
          </h1>
          <p className=" text-[13px] sm:text-[16px] sm:text-center text-start leading-[22px] sm:leading-[32px] font-light">
            Lorem ipsum dolor sit amet consectetur. Etiam sed elementum volutpat
            ut vel mi eu libero. Nisl dui feugiat massa neque. Et tincidunt sit
            gravida quam. Scelerisque odio sed augue risus ullamcorper.
            Penatibus auctor lectus dolor egestas est tempor sit. Ultricies sit
            at lobortis enim at pharetra magna aliquam facilisi. Eget eu mauris
            tortor ultricies tristique sed luctus et nisl. Massa lacinia sed
            commodo amet. Pharetra sed tristique arcu turpis consectetur. Lectus
            cras pharetra viverra sapien turpis eget ut.
          </p>
        </div>
        <div className="pl-[10px] ">
          <div className="flex mb-[20px] w-[98%] sm:w-[100%]">
            <img
              className=" object-cover mr-[20px] h-[106px] sm:h-[439px] w-[226px] sm:w-[60%] rounded"
              src="https://images.pexels.com/photos/7551176/pexels-photo-7551176.jpeg?auto=compress&cs=tinysrgb&w=800"
            />
            <img
              className=" object-cover h-[106px] sm:h-[439px] w-[160px] sm:w-[40%] rounded"
              src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800"
            />
          </div>
          <div className="flex w-[98%] sm:w-[100%]">
            <img
              className=" object-cover mr-[20px] h-[106px] sm:h-[439px] w-[160px] sm:w-[40%] rounded"
              src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800"
            />
            <img
              className=" object-cover h-[106px] sm:h-[439px] w-[226px] sm:w-[60%] rounded"
              src="https://images.pexels.com/photos/7551176/pexels-photo-7551176.jpeg?auto=compress&cs=tinysrgb&w=800"
            />
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Career;
