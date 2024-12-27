import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from "../utils/apiWrapper";
import { useLocalCartCount } from './LocalCartCount';
const WishListContext = createContext();

export const useWishlist = () => {
    return useContext(WishListContext);
};

export const WishListProvider = ({ children }) => {
    const [totalWishListCount, setTotalWishListCount] = useState(0);
    const [updateWishList, setUpdateWishList] = useState(false);
    const { totalWishListItems, incrementWishListItems } = useLocalCartCount();
    const fetchTotalWishList = async () => {
        let authToken = localStorage.getItem("authToken");
        if (authToken) {
            try {
                const response = await apiClient.get(`/wishlist/count`);
                setTotalWishListCount(response.data.count);
            } catch (error) {
                console.error('Error fetching wishlist count:', error);
            }
        } else {
            setTotalWishListCount(totalWishListItems)
        }
    };

    // Fetch wishlist count when the component mounts or when the wishlist is updated
    useEffect(() => {
        fetchTotalWishList();
    }, [updateWishList]); // Re-fetch when updateWishList changes

    const triggerUpdateWishList = () => {
        setUpdateWishList(prev => !prev); // Toggle to trigger a re-fetch
    };

    return (<WishListContext.Provider value={
            { totalWishListCount, triggerUpdateWishList }
        } > {children} </WishListContext.Provider>
        );
};