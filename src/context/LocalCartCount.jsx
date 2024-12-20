import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const LocalCartCountContext = createContext();

// Create the provider component
export const LocalCartCountProvider = ({ children }) => {
    // Initialize totalCartItems from localStorage or default to 0
    const [totalCartItems, setTotalCartItems] = useState(() => {
        const storedCount = localStorage.getItem("TotalCartItems");
        return storedCount ? parseInt(storedCount) : 0;
    });

    // Initialize totalWishListItems from localStorage or default to 0
    const [totalWishListItems, setTotalWishListItems] = useState(() => {
        const storedCount = localStorage.getItem("TotalWishList");
        return storedCount ? parseInt(storedCount) : 0;
    });

    // Sync the state with localStorage on mount (in case the localStorage is changed externally)
    useEffect(() => {
        const storedCartItems = localStorage.getItem("TotalCartItems");
        const storedWishListItems = localStorage.getItem("TotalWishList");

        if (storedCartItems) {
            setTotalCartItems(parseInt(storedCartItems));
        }

        if (storedWishListItems) {
            setTotalWishListItems(parseInt(storedWishListItems));
        }
    }, []); // Only run once when the component mounts

    // Function to increment the cart items
    const incrementCartItems = (quantity) => {
        setTotalCartItems((prevCount) => {
            const newCount = prevCount + quantity;
            localStorage.setItem("TotalCartItems", newCount); // Update localStorage
            return newCount;
        });
    };

    // Function to increment the wishlist items
    const incrementWishListItems = (quantity) => {
        setTotalWishListItems((prevCount) => {
            const newCount = prevCount + quantity;
            localStorage.setItem("TotalWishList", newCount); // Update localStorage
            return newCount;
        });
    };

    // Function to decrement the cart items
    const decrementCartItems = (quantity) => {
        setTotalCartItems((prevCount) => {
            const newCount = prevCount - quantity;
            localStorage.setItem("TotalCartItems", newCount); // Update localStorage
            return newCount;
        });
    };

    // Function to reset the cart items
    const deleteCartItems = () => {
        setTotalCartItems(0);
        localStorage.setItem("TotalCartItems", 0); // Update localStorage
    };

    return ( <LocalCartCountContext.Provider value = {
            {
                totalCartItems,
                totalWishListItems,
                incrementWishListItems,
                incrementCartItems,
                decrementCartItems,
                deleteCartItems
            }
        } > { children } </LocalCartCountContext.Provider>
    );
};

// Custom hook for easy access to the context
export const useLocalCartCount = () => {
    return useContext(LocalCartCountContext);
};