import React from "react";
 import { Wrapper } from "../../shared/Wrapper";
 import {useLocation,Link} from 'react-router-dom';

const PaymentFailed = () => {
 
 
  return (
    <>
      
     
      <Wrapper className="h-screen">
        <div className="flex flex-col items-center justify-center text-center mt-[100px] mb-[100px]">
          <h1 className="leading-[70.38px] text-[60px] font-semibold">
            <span>Oops</span>
            
          </h1>
          <div className=" w-[80%]">
          <h3 className="leading-[70.38px] text-[60px] font-semibold">
             <span>Sorry ! Your payment is failed</span>
             </h3>
             
             <br/>
             <Link to="/home">
             <button className=" items-center justify-center bg-[#F1F1F2] rounded-full py-2 px-4 text-sm mr-3 mt-3">Home</button>
             </Link>
             <Link to="/checkout">
             <button className=" items-center justify-center bg-[#F1F1F2] rounded-full py-2 px-4 text-sm mr-3 mt-3">Retry</button>
             </Link>
          </div>
        </div>
        
      </Wrapper>
    </>
  );
};

export default PaymentFailed;
