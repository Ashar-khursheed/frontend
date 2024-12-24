import React, { useEffect, useState } from "react";
import { Wrapper } from "../../shared/Wrapper";
import { useLocation, Link } from 'react-router-dom';
import { useCart } from "../../context/CartContext";
import DeiveryInfoCard from "../../components/DeliveryInfoCard";
import { MdOutlineEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { apiClient } from "../../utils/apiWrapper.js";

const PaymentSuccess = () => {
  const location = useLocation();
  const { triggerUpdateCart, updateTempCart } = useCart();
  const queryParams = new URLSearchParams(location.search);
  const [removeItemsLoader, setRemoveItemsLoader] = useState(false);
  const payment_id = queryParams.get('payment_id');
  const trans_id = queryParams.get('trans_id');
  const order_id = queryParams.get('order_id');

  const handlerRemoveAllItemsFromCart = async () => {
    setRemoveItemsLoader(true)
    try {
      const response = await apiClient.delete("/cart/clear");
      if(response.data.success){

      triggerUpdateCart();
      localStorage.removeItem('couponCodeValue');
      localStorage.removeItem('discountPercetage');
      }

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setRemoveItemsLoader(false)
    }
  }
  //temporary cart
  const handlerRemoveAllItemsFromCartTemp = async () => {
    setRemoveItemsLoader(true)
    localStorage.removeItem('CartItems');
    localStorage.removeItem('TotalCartItems');
    updateTempCart(0);
    setRemoveItemsLoader(false)

  }



  // const handlerSendWhatsapp = () => {
  //   const message = `Check out this product: \n${
  //     product.name
  //   }\nOriginal Price: ${product.original_price}\nSale Price: ${
  //     product.sale_price
  //   }\nLink: ${
  //     "https://test-horeca.netlify.app/product/" + product.id
  //   }\nImage: ${"https://testhssite.com/storage/" + product.images[0]}`;
  //   const encodedMessage = encodeURIComponent(message);
  //   const whatsappURL = `https://api.whatsapp.com/send?text=${encodedMessage}`;
  //   window.open(whatsappURL, "_blank");
  // };

  // //send email
  // const handlerSendEmail = () => {
  //   const emailSubject = `Check out this amazing product: ${product.name}`;

  //   const emailBody = `
  //   Hi there,

  //   I wanted to share this great product with you:

  //   ${product.name}

  //   You can check it out here: ${
  //     "https://test-horeca.netlify.app/product/" + product.id
  //   }

  //   ${product.sale_price ? `Sale Price: $${product.sale_price}` : ""}
  //   ${
  //     product.original_price && !product.sale_price
  //       ? `Original Price: $${product.original_price}`
  //       : ""
  //   }

  //   ${
  //     product.sale_price && product.original_price
  //       ? `Original Price: $${product.original_price} (Now: $${product.sale_price})`
  //       : ""
  //   }

  //   Check out the product image here: ${product.images[0]}

  //   Best regards
  // `;

  //   const encodedSubject = encodeURIComponent(emailSubject);
  //   const encodedBody = encodeURIComponent(emailBody);

  //   // Open the default email client with a mailto link via window.open
  //   const mailtoLink = `mailto:?subject=${encodedSubject}&body=${encodedBody}`;

  //   // Use window.open() to open the mail client
  //   window.open(mailtoLink, "_blank");
  // };

  useEffect(() => {
    handlerRemoveAllItemsFromCart()
    handlerRemoveAllItemsFromCartTemp();
    triggerUpdateCart();
  }, []);
 
 
  return (
    <>
      <Wrapper className="h-screen">
        <div className="mt-16 grid grid-cols-12 gap-4 p-4 container mx-auto px-4 shadow-lg ">
          {/* Left Column: Content (takes 8/12 space) */}
          <div className="col-span-12 lg:col-span-8 p-4">
            <p className="mt-3 text-[#186737] font-semibold text-[20px] inline-flex items-center">
              <img
                src={process.env.PUBLIC_URL + "/icons/Frame.png"}
                alt=""
                style={{ backgroundColor: '#186737', marginRight: '8px', borderRadius: '20px' }}
              />
              Congratulations, Successfully Order Placed
            </p>
            <br />
            <p className="mt-3 text-[#64748B] font-semibold text-[16px] inline-flex items-center">
              Confirmation will be sent to your email at nomanpeera@gmail.com
            </p>
            <br />
            <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-10 gap-4 mt-2 text-[#64748B] font-semibold text-[11px] md:text-[12px] lg:text-[14px] inline-flex items-center">
              {/* Text - Span 12 columns on small screens, 8 on medium screens, 7 on large screens */}
              <div className="col-span-12 md:col-span-8 lg:col-span-7">
                Our Representative will call you at &nbsp;
                <span className="text-[#030303] font-bold">0559585251</span>. Kindly ensure the number is correct to avoid delivery delays or add&nbsp;
              </div>

              {/* Input Field - Span 12 columns on small screens, 4 on medium screens, 3 on large screens */}
              <div className="col-span-12 md:col-span-4 lg:col-span-3 flex items-center border-2 border-green-500 rounded-lg">
                <input
                  type="tel"
                  className="text-[#030303] font-bold p-1 flex-1 rounded-l text-[12px] sm:text-[14px] w-full sm:w-[180px] md:w-[180px] lg:w-[200px]"
                  name="alteNumber"
                  placeholder="Second Number"
                />
                <img
                  src={process.env.PUBLIC_URL + "/icons/Frame.png"}
                  style={{ backgroundColor: '#186737' }}
                  alt="icon"
                  className="w-7 h-7 rounded-r sm:w-8 sm:h-9 md:w-8 md:h-9  lg:w-9 lg:h-10" // Icon size adjusted for different screen sizes
                />
              </div>
            </div>




            <br />
            <p className="mt-3 text-[#030303] font-bold text-[14px] inline-flex items-center">
              Being Delivered To Rapid Warehouse
            </p>
            <br />
            <p className="mt-1 text-[#212121] font-semibold text-[14px] inline-flex items-center">
              Showroom 01 - Building No 9-1 19 Street - Al Quoz - Al Quoz, Al Quoz, Dubai, Abu Hail, United Arab Emirates
            </p>

            <div className="mt-5 mb-3 border-t-2 border-[#E2E8F0]" />

            <DeiveryInfoCard />
            <DeiveryInfoCard />

            <div className="flex items-center justify-start mt-3">
              <h2 className="text-[#262626] font-semibold text-base">
                Share this Details
              </h2>
              <div className="border-[#E2E8F0] border-2 rounded-full p-3 ml-5 cursor-pointer hover:bg-primary transition-all hover:text-white">
                <FaWhatsapp size={16} />
              </div>
              <div className="border-[#E2E8F0] border-2 rounded-full p-3 ml-3 cursor-pointer hover:bg-primary transition-all hover:text-white">
                <MdOutlineEmail size={16} />
              </div>
            </div>

            <div className="mt-5 mb-3 border-t-2 border-[#E2E8F0]" />

            <div className="flex items-center justify-start mt-3">
              <h2 className="text-[#262626] font-semibold text-base">
                Want to receive notification on WhatsApp?
              </h2>
            </div>
            <p className="mt-1 text-[#64748B] font-semibold text-[14px] inline-flex items-center">
              Get notified on WhatsApp when we need more details to deliver your package. If you agree to receive WhatsApp notifications, you agree with the Terms & Conditions.
            </p>

            <button className="flex mt-[5px] items-center justify-center rounded-md font-sans w-[250px] sm:w-[250px] h-[40px] border border-[#666666] text-[16px] text-[#ffffff] font-medium leading-[16px] text-left underline-offset-auto decoration-slice bg-[#64748B]">
              Get WhatsApp Notification
            </button>
          </div>

          {/* Right Column: Thank You Image (takes 4/12 space) */}
          <div className="col-span-12 lg:col-span-4 flex items-center justify-center p-4">
            <img
              src={process.env.PUBLIC_URL + "/images/checkout/thank you banner.png"}
              alt="Thank You"
              className="rounded-lg shadow-md"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </Wrapper>


    </>
  );
};

export default PaymentSuccess;
