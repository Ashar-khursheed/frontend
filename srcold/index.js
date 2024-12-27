import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/zoom.css';
import 'react-loading-skeleton/dist/skeleton.css'
import { CartProvider } from './context/CartContext';
import { LocalCartCountProvider } from './context/LocalCartCount';
import 'react-toastify/dist/ReactToastify.css';
import { WishListProvider } from './context/WishListContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode >

    <LocalCartCountProvider >
        < WishListProvider >
            <CartProvider >
                <BrowserRouter >
                    <App />
                </BrowserRouter>
            </CartProvider >
        </WishListProvider>
    </LocalCartCountProvider >
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();