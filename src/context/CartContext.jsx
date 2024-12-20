import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from "../utils/apiWrapper";
import { useLocalCartCount } from './LocalCartCount';
const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [totalCartCount, setTotalCartCount] = useState(0);
    const [updateCart, setUpdateCart] = useState(false); // Track updates
    const { totalCartItems, incrementCartItems, deleteCartItems, decreamentCartItems } = useLocalCartCount();


    const fetchCartCount = async () => {
        let authToken = localStorage.getItem("authToken");
        if (authToken) {
            try {
                const response = await apiClient.get(`/cart/total${!authToken ? "/guest" : ""}`);
                setTotalCartCount(response.data.total);
            } catch (error) {
                console.error('Error fetching cart count:', error);
            }
        } else {
            setTotalCartCount(totalCartItems);
        }
    };


    useEffect(() => {
        fetchCartCount();
    }, [updateCart]);

    const triggerUpdateCart = () => {
     
        setUpdateCart(prev => !prev); // Toggle to trigger re-fetch
    };
    const updateTempCart = (quantity) => {
        setTotalCartCount(quantity);
        deleteCartItems(quantity);

    }

    return (<CartContext.Provider value={{ totalCartCount, triggerUpdateCart, updateTempCart }}>
        {children}
    </CartContext.Provider>
    );
};