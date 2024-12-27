import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useLocalCartCount } from "../../context/LocalCartCount";
import { apiClient } from "../../utils/apiWrapper";
import { CartButton } from "../CartButton";

export const SameProducts = ({ product }) => {
    const [loader, setLoader] = useState(false);
    const { triggerUpdateCart } = useCart()

    const handlerAddItems = async () => {
        const authToken = localStorage.getItem("authToken");
        try {
            setLoader(true);
            const response = await apiClient.post(`/cart${authToken ? "" : "/guest"}`, {
                "product_id": product.id,
                "quantity": 1
            });
            triggerUpdateCart();

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoader(false);
        }
    }
    let { id, images, currency_title, price, name } = product;
    return (
        <React.Fragment>
            <div className='flex items-center justify-between mt-2'>
                <Link to={`/product/${id}`} className='flex items-center'>
                    <img className='w-16' src={`${images && images[0] ? images[0] : ""}`} alt="" />
                    <div className='ml-3'>
                        <p className='text-black-100 text-xs font-semibold'>{currency_title} <span className='font-bold text-base'>{price}</span></p>
                        <React.Fragment>
                            <p className='text-sm font-bold text-[#A6131D]'>FREE Delivery</p>
                            <p className='text-xs text-black-100'>Friday, 20 September</p>
                        </React.Fragment>
                    </div>
                </Link>
                <CartButton productName={name} productId={id} quantity={1} classes={"text-white font-semibold rounded-[4px] bg-primary p-2 text-xs min-w-[100px]"} />
            </div>
        </React.Fragment>
    )
}
