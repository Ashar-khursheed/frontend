import React from "react";
import { Wrapper } from "../../shared/Wrapper";
import { Breadcrumb } from "../../shared/Breadcrumb";
import { BlogPostCard } from "./components/BlogPostCard";

const BlogDetails = () => {
  const collectionBreadCrumb = [
    {
      url: "/",
      title: "Home",
    },
    {
      url: "/blog-details",
      title: "BlogDetails",
    },
  ];
  return (
    <>
      <Wrapper>
        <Breadcrumb items={collectionBreadCrumb} classes={"mt-[10px]"} />
      </Wrapper>
      <Wrapper>
        <div className="flex mt-[10px] text-[32px] m-[10px] font-bold text-white h-[160px] overflow-hidden rounded-[20px] sm:h-[700px] w-full">
          <img
            className="absolute h-[160px] m-[5px] sm:h-[700px] w-[85%] object-cover rounded-[20px] opacity-[1]"
            src="https://images.pexels.com/photos/7689734/pexels-photo-7689734.jpeg?auto=compress&cs=tinysrgb&w=800"
          />
        </div>
        <div className="flex">
          {/*  */}
          {/* First Container */}
          {/*  */}
          <div className="m-[10px] w-[100%] lg:w-[75%]">
            <div className="flex items-center gap-2">
              <img
                src="https://images.pexels.com/photos/7689734/pexels-photo-7689734.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Author"
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
              <div className="flex flex-col">
                <p className="text-gray-400 text-[20px]">
                  Written By -{" "}
                  <span className="text-red-600 font-semibold">Danish</span>
                </p>
                <p className="text-gray-400 text-xs">Posted 12-December-2008</p>
              </div>
            </div>
            <div className="mt-[20px]">
              <h1 className="text-[36px] mb-[20px] font-semibold leading-[54px]">
                Lorem ipsum dolor sit amet consectetur Convallis sed erat non
                ultricies duis Et velit commodo congue faucibus.
              </h1>
              <p className="text-[20px] leading-[35px] font-light">
                Lorem ipsum dolor sit amet consectetur. Venenatis tortor nisl
                nullam dignissim mattis viverra rhoncus risus. Vitae mollis
                tortor nam nibh orci. Vulputate ornare iaculis pellentesque
                adipiscing nibh egestas placerat ultrices. Cum pulvinar
                adipiscing aliquam velit id amet. Sed sed pharetra convallis
                dolor libero. Vel neque nisl pellentesque in. Elit nunc diam sed
                blandit viverra tempus non. Ultricies eget quisque ut laoreet
                praesent pretium mattis est tortor. Consectetur sem commodo amet
                porta non at condimentum metus pharetra. Eu bibendum eu morbi
                vitae habitasse vitae sed. Sed ut tellus netus leo molestie
                mattis faucibus. A quis sit ut nunc tempus elit nec. Morbi a nec
                arcu pulvinar massa elit purus scelerisque. Venenatis lorem at
                congue feugiat. Egestas at massa eleifend nec arcu adipiscing
                pharetra. Faucibus lacus ullamcorper egestas nunc in mollis.
                Lectus tellus cras quis dictum laoreet sed mauris. Vestibulum
                consectetur ante faucibus et. Nisi diam a felis nisi vel
                egestas.Facilisis fames pellentesque facilisis quis semper. Enim
                urna dui cursus diam consequat pharetra. Vel nam blandit
                imperdiet sed non. Elit varius nunc dui nisl ante eget viverra
                diam. Mi ut faucibus in ac vitae tempor egestas nascetur.
                Vulputate nunc purus dolor arcu semper blandit ut sed arcu. In
                id cras lacus duis convallis mauris viverra purus. Eget mi sed
                auctor id eu amet enim lectus. Enim lectus quam sed tempor quis.
                Fermentum malesuada lobortis quis in cursus integer non.
                Ultrices fames vitae faucibus elit habitant euismod etiam
                condimentum commodo. Sit condimentum diam sodales turpis. Leo
                pellentesque enim tellus a aliquam a at. A tellus ut et suscipit
                pharetra. Risus dictum gravida amet morbi gravida.Consequat
                morbi turpis eget venenatis eu nulla ut dictum turpis. Sagittis
                in vitae nam placerat id interdum enim at arcu. Vel massa velit
                elit consequat etiam tempus. Sit vehicula cras fermentum
                porttitor tincidunt amet in vitae. Felis cras massa etiam cursus
                maecenas et sapien. In suspendisse ultrices velit pharetra in
                neque tincidunt at et. Dictum blandit urna nisl nisi tellus.
                Feugiat scelerisque mauris eget odio laoreet mauris velit
                fermentum. Mi sed diam facilisi in. Faucibus elementum tellus
                diam cursus facilisis. Proin eu rhoncus vel nisi massa.
                Tincidunt nisl id tortor lacinia penatibus sem hac.
              </p>
            </div>
            <div className="mt-[20px]">
              <h1 className="text-[36px] mb-[20px] font-semibold leading-[54px]">
                Lorem ipsum dolor sit amet consectetur Convallis.
              </h1>
              <p className="text-[20px] leading-[35px] font-light">
                Lorem ipsum dolor sit amet consectetur. Venenatis tortor nisl
                nullam dignissim mattis viverra rhoncus risus. Vitae mollis
                tortor nam nibh orci. Vulputate ornare iaculis pellentesque
                adipiscing nibh egestas placerat ultrices. Cum pulvinar
                adipiscing aliquam velit id amet. Sed sed pharetra convallis
                dolor libero. Vel neque nisl pellentesque in. Elit nunc diam sed
                blandit viverra tempus non. Ultricies eget quisque ut laoreet
                praesent pretium mattis est tortor. Consectetur sem commodo amet
                porta non at condimentum metus pharetra. Eu bibendum eu morbi
                vitae habitasse vitae sed. Sed ut tellus netus leo molestie
                mattis faucibus. A quis sit ut nunc tempus elit nec. Morbi a nec
                arcu pulvinar massa elit purus scelerisque. Venenatis lorem at
                congue feugiat. Egestas at massa eleifend nec arcu adipiscing
                pharetra. Faucibus lacus ullamcorper egestas nunc in mollis.
                Lectus tellus cras quis dictum laoreet sed mauris. Vestibulum
                consectetur ante faucibus et. Nisi diam a felis nisi vel
                egestas.Facilisis fames pellentesque facilisis quis semper. Enim
                urna dui cursus diam consequat pharetra. Vel nam blandit
                imperdiet sed non. Elit varius nunc dui nisl ante eget viverra
                diam. Mi ut faucibus in ac vitae tempor egestas nascetur.
                Vulputate nunc purus dolor arcu semper blandit ut sed arcu. In
                id cras lacus duis convallis mauris viverra purus. Eget mi sed
                auctor id eu amet enim lectus. Enim lectus quam sed tempor quis.
                Fermentum malesuada lobortis quis in cursus integer non.
                Ultrices fames vitae faucibus elit habitant euismod etiam
                condimentum commodo. Sit condimentum diam sodales turpis. Leo
                pellentesque enim tellus a aliquam a at. A tellus ut et suscipit
                pharetra. Risus dictum gravida amet morbi gravida.Consequat
                morbi turpis eget venenatis eu nulla ut dictum turpis. Sagittis
                in vitae nam placerat id interdum enim at arcu. Vel massa velit
                elit consequat etiam tempus. Sit vehicula cras fermentum
                porttitor tincidunt amet in vitae. Felis cras massa etiam cursus
                maecenas et sapien. In suspendisse ultrices velit pharetra in
                neque tincidunt at et. Dictum blandit urna nisl nisi tellus.
                Feugiat scelerisque mauris eget odio laoreet mauris velit
                fermentum. Mi sed diam facilisi in. Faucibus elementum tellus
                diam cursus facilisis. Proin eu rhoncus vel nisi massa.
                Tincidunt nisl id tortor lacinia penatibus sem hac.
              </p>
            </div>
            <div className="mt-[20px]">
              <h1 className="text-[36px] mb-[20px] font-semibold leading-[54px]">
                Lorem ipsum dolor sit amet consectetur Convallis.
              </h1>
              <p className="text-[20px] leading-[35px] font-light">
                Lorem ipsum dolor sit amet consectetur. Venenatis tortor nisl
                nullam dignissim mattis viverra rhoncus risus. Vitae mollis
                tortor nam nibh orci. Vulputate ornare iaculis pellentesque
                adipiscing nibh egestas placerat ultrices. Cum pulvinar
                adipiscing aliquam velit id amet. Sed sed pharetra convallis
                dolor libero. Vel neque nisl pellentesque in. Elit nunc diam sed
                blandit viverra tempus non. Ultricies eget quisque ut laoreet
                praesent pretium mattis est tortor. Consectetur sem commodo amet
                porta non at condimentum metus pharetra. Eu bibendum eu morbi
                vitae habitasse vitae sed. Sed ut tellus netus leo molestie
                mattis faucibus. A quis sit ut nunc tempus elit nec. Morbi a nec
                arcu pulvinar massa elit purus scelerisque. Venenatis lorem at
                congue feugiat. Egestas at massa eleifend nec arcu adipiscing
                pharetra. Faucibus lacus ullamcorper egestas nunc in mollis.
                Lectus tellus cras quis dictum laoreet sed mauris. Vestibulum
                consectetur ante faucibus et. Nisi diam a felis nisi vel
                egestas.Facilisis fames pellentesque facilisis quis semper. Enim
                urna dui cursus diam consequat pharetra. Vel nam blandit
                imperdiet sed non. Elit varius nunc dui nisl ante eget viverra
                diam. Mi ut faucibus in ac vitae tempor egestas nascetur.
                Vulputate nunc purus dolor arcu semper blandit ut sed arcu. In
                id cras lacus duis convallis mauris viverra purus. Eget mi sed
                auctor id eu amet enim lectus. Enim lectus quam sed tempor quis.
                Fermentum malesuada lobortis quis in cursus integer non.
                Ultrices fames vitae faucibus elit habitant euismod etiam
                condimentum commodo. Sit condimentum diam sodales turpis. Leo
                pellentesque enim tellus a aliquam a at. A tellus ut et suscipit
                pharetra. Risus dictum gravida amet morbi gravida.Consequat
                morbi turpis eget venenatis eu nulla ut dictum turpis. Sagittis
                in vitae nam placerat id interdum enim at arcu. Vel massa velit
                elit consequat etiam tempus. Sit vehicula cras fermentum
                porttitor tincidunt amet in vitae. Felis cras massa etiam cursus
                maecenas et sapien. In suspendisse ultrices velit pharetra in
                neque tincidunt at et. Dictum blandit urna nisl nisi tellus.
                Feugiat scelerisque mauris eget odio laoreet mauris velit
                fermentum. Mi sed diam facilisi in. Faucibus elementum tellus
                diam cursus facilisis. Proin eu rhoncus vel nisi massa.
                Tincidunt nisl id tortor lacinia penatibus sem hac.
              </p>
            </div>
          </div>
          {/*  */}
          {/* Second Container */}
          {/*  */}
          <div className="hidden lg:block w-[25%] mt-[90px]">
            <div className="border-2 m-[10px] rounded-lg p-[10px]">
              <h1 className="font-Montserrat m-[5px] text-[20px] leading-[30px] font-semibold">
                Popular Posts
              </h1>
              <div className="flex items-center  p-[10px]">
                {/* Image Section */}
                <div className="w-1/3">
                  <img
                    src="https://via.placeholder.com/200x200" // Replace with your actual image URL
                    alt="Knife Station"
                    className="w-full h-auto rounded-md"
                  />
                </div>
                {/* Content Section */}
                <div className="ml-[10px]">
                  <h1 className="text-[14px] mb-[5px] font-semibold text-black leading-[18px]">
                    Elevate Your Culinary Business With HorecaStore.Ae
                  </h1>
                  <p className="text-[14px] leading-[17px] font-light">
                    Posted 08-August-2024
                  </p>
                </div>
              </div>
              <div className="flex items-center  p-[10px]">
                {/* Image Section */}
                <div className="w-1/3">
                  <img
                    src="https://via.placeholder.com/200x200" // Replace with your actual image URL
                    alt="Knife Station"
                    className="w-full h-auto rounded-md"
                  />
                </div>
                {/* Content Section */}
                <div className="ml-[10px]">
                  <h1 className="text-[14px] mb-[5px] font-semibold text-black leading-[18px]">
                    Elevate Your Culinary Business With HorecaStore.Ae
                  </h1>
                  <p className="text-[14px] leading-[17px] font-light">
                    Posted 08-August-2024
                  </p>
                </div>
              </div>
              <div className="flex items-center  p-[10px]">
                {/* Image Section */}
                <div className="w-1/3">
                  <img
                    src="https://via.placeholder.com/200x200" // Replace with your actual image URL
                    alt="Knife Station"
                    className="w-full h-auto rounded-md"
                  />
                </div>
                {/* Content Section */}
                <div className="ml-[10px]">
                  <h1 className="text-[14px] mb-[5px] font-semibold text-black leading-[18px]">
                    Elevate Your Culinary Business With HorecaStore.Ae
                  </h1>
                  <p className="text-[14px] leading-[17px] font-light">
                    Posted 08-August-2024
                  </p>
                </div>
              </div>
              <div className="flex items-center  p-[10px]">
                {/* Image Section */}
                <div className="w-1/3">
                  <img
                    src="https://via.placeholder.com/200x200" // Replace with your actual image URL
                    alt="Knife Station"
                    className="w-full h-auto rounded-md"
                  />
                </div>
                {/* Content Section */}
                <div className="ml-[10px]">
                  <h1 className="text-[14px] mb-[5px] font-semibold text-black leading-[18px]">
                    Elevate Your Culinary Business With HorecaStore.Ae
                  </h1>
                  <p className="text-[14px] leading-[17px] font-light">
                    Posted 08-August-2024
                  </p>
                </div>
              </div>
              <div className="flex items-center  p-[10px]">
                {/* Image Section */}
                <div className="w-1/3">
                  <img
                    src="https://via.placeholder.com/200x200" // Replace with your actual image URL
                    alt="Knife Station"
                    className="w-full h-auto rounded-md"
                  />
                </div>
                {/* Content Section */}
                <div className="ml-[10px]">
                  <h1 className="text-[14px] mb-[5px] font-semibold text-black leading-[18px]">
                    Elevate Your Culinary Business With HorecaStore.Ae
                  </h1>
                  <p className="text-[14px] leading-[17px] font-light">
                    Posted 08-August-2024
                  </p>
                </div>
              </div>
            </div>
            <div className="border-2 m-[10px] rounded-lg">
              <img
                className="h-[626px]"
                src={`${process.env.PUBLIC_URL}/images/blogSlideBanner.png`}
              />
            </div>
            <div className="border-2 m-[10px] rounded-lg p-[10px]">
              <h1 className="font-Montserrat m-[5px] text-[20px] leading-[30px] font-semibold">
                Tags
              </h1>
              <div className="flex flex-wrap items-center">
                <p className="py-[7px] m-[5px] px-[20px] text-[#666666] text-[14px] bg-[#EEEEEE] rounded-full">
                  Hospitality Trends
                </p>
                <p className="py-[7px] m-[5px] px-[20px] text-[#666666] text-[14px] bg-[#EEEEEE] rounded-full">
                  Chef Tools
                </p>
                <p className="py-[7px] m-[5px] px-[20px] text-[#666666] text-[14px] bg-[#EEEEEE] rounded-full">
                  Hos
                </p>
                <p className="py-[7px] m-[5px] px-[20px] text-[#666666] text-[14px] bg-[#EEEEEE] rounded-full">
                  Chepotle
                </p>
                <p className="py-[7px] m-[5px] px-[20px] text-[#666666] text-[14px] bg-[#EEEEEE] rounded-full">
                  fyi
                </p>
                <p className="py-[7px] m-[5px] px-[20px] text-[#666666] text-[14px] bg-[#EEEEEE] rounded-full">
                  Dyi
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="m-[10px] w-[100%] lg:w-[100%]">
          <BlogPostCard count={3} />
        </div>
      </Wrapper>
    </>
  );
};

export default BlogDetails;
