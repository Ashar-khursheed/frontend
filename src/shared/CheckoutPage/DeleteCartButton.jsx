import React, { useState } from "react";
import { apiClient } from "../../utils/apiWrapper";
import { notify } from "../../utils/notify";
import { useCart } from "../../context/CartContext";



export const DeleteCartButton = ({ product, setFetchCall, fetchCall, setCartSummaryFlag, cartSummaryFlag, temp, setTempCartItems, forMobile }) => {

    const [deleteCartLoader, setDeleteCartLoader] = useState(false);
    const [saveForLaterLoader, setSaveForLaterLoader] = useState(false);
    const { triggerUpdateCart, updateTempCart } = useCart();
    let saveForLaterItems = localStorage.getItem("SaveForLater");
    let saveForLaterItemsTemp = localStorage.getItem("SaveForLaterTemp");
    const authToken = localStorage.getItem("authToken");
    const handlerRemoveItemsFromCart = async (product) => {
        setDeleteCartLoader(true)
        if (authToken) {
            try {
                const response = await apiClient.delete(`/cart/${product.product_id}`, {
                    params: { product_id: product.product_id }
                });
                triggerUpdateCart();
                setFetchCall(!fetchCall);
                // setCartSummaryFlag(!cartSummaryFlag);
                notify(product.product.name, " has been removed from cart.")
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setDeleteCartLoader(false)
            }
        }
    }
    const handlerRemoveItemsFromCartTemp = async (id) => {
        const products = await JSON.parse(localStorage.getItem('CartItems'));
        const updateProduct = products.filter((item) => item.product_id != id);
        localStorage.setItem('CartItems', JSON.stringify(updateProduct));
        localStorage.setItem('TotalCartItems', updateProduct.length);
        updateTempCart(updateProduct.length);
        setTempCartItems(updateProduct);

    }


    const saveForLater = async (prod) => {
        setSaveForLaterLoader(true);

        if (authToken) {
            try {
                const response = await apiClient.post('save-for-later', {
                    "product_id": prod.product_id
                });

                triggerUpdateCart();
                setFetchCall(!fetchCall);

                let tempObj = prod;
                let itemsArray = saveForLaterItems ? JSON.parse(saveForLaterItems) : [];
                let itemExists = itemsArray.findIndex(item => item.product_id === prod.product.product_id);

                if (itemExists === -1) {
                    itemsArray.push(tempObj);
                }

                localStorage.setItem("SaveForLater", JSON.stringify(itemsArray));
            } catch (error) {
                console.log("error", error);
            } finally {
                setSaveForLaterLoader(false);  // Ensure loader is set to false here.
            }
        } else {
            handlerRemoveItemsFromCartTemp(prod.product_id);

            let tempObj = prod;
            let itemsArray = saveForLaterItemsTemp ? JSON.parse(saveForLaterItemsTemp) : [];
            let itemExists = itemsArray.findIndex(item => item.product_id === prod.product_id);

            if (itemExists === -1) {
                itemsArray.push(tempObj);
            }

            localStorage.setItem("SaveForLater", JSON.stringify(itemsArray));
            setSaveForLaterLoader(false);  // Ensure loader is set to false here as well.
        }

    }

    return (
        <>

            {temp ? <button disabled={deleteCartLoader} className={`${forMobile ? "bg-[#E2E8F0] text-[#64748B] p-2 rounded-md" : "text-primary text-xs"}   ${deleteCartLoader ? "" : "cursor-pointer"}`} onClick={() => handlerRemoveItemsFromCartTemp(product.product_id)}>{deleteCartLoader ? forMobile ? <img src={process.env.PUBLIC_URL + "/icons/delete.png"} /> : "Deleting" : forMobile ? <img src={process.env.PUBLIC_URL + "/icons/delete.png"} /> : "Delete"}</button> : <button disabled={deleteCartLoader} className={`${forMobile ? "bg-[#E2E8F0] text-[#64748B] p-2 rounded-md" : "text-primary text-xs"}  ${deleteCartLoader ? "" : "cursor-pointer"}`} onClick={() => handlerRemoveItemsFromCart(product)}>{deleteCartLoader ? forMobile ? <img src={process.env.PUBLIC_URL + "/icons/delete.png"} /> : "Deleting" : forMobile ? <img src={process.env.PUBLIC_URL + "/icons/delete.png"} /> : "Delete"}</button>}
            {forMobile ? "" : <span className="mx-3 text-[#E2E8F0]">|</span>}
            <button disabled={saveForLaterLoader} className={`${forMobile ? "bg-[#E2E8F0] text-[#64748B] text-sm font-medium p-2  hover:bg-gray-200" : "text-primary text-xs"}  ${saveForLaterLoader ? "" : "cursor-pointer"}`} onClick={() => saveForLater(product)}>{saveForLaterLoader ? "Saving..." : "Save For Later"}</button>


        </>





    )
}