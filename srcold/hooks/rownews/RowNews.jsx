import React from "react";
import { Wrapper } from "../../shared/Wrapper";
import { Link } from "react-router-dom";

export const RowNews = () => {
    return (
        <Wrapper classes="mt-5">
            <div className="flex flex-col xl:flex-row items-center justify-center p-3 bg-[#F0F6FD] text-[#075985] rounded-[4px]">
                <h2 className="text-sm xl:text-[22px] font-bold">RETURN CASH BACK</h2>
                <p className="mx-8  text-sm xl:text-base text-center"><span className="font-semibold">Earn 5% cash back on horecastore.com</span> See if you’re pre-approved with no credit risk.</p>
                <Link to="/" className="text-center text-sm xl:text-base border-2 rounded-[4px] font-semibold border-[#075985] border-dashed px-4 py-2">Discover More</Link>
            </div>
        </Wrapper>
    )
} 
