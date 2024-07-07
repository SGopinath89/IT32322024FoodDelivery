import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Navbar from '../component/Navbar/Navbar';
import Home from '../component/Home/Home';
import RestaurantDetails from '../component/Restaurant/RestaurantDetails';
import Cart from '../component/Cart/Cart';
import Profile from '../component/Profile/Profile';
import Auth from '../component/Auth/Auth';
import PaymentSuccess from '../component/Payment/PaymentSuccess';
import PaymentFail from '../component/Payment/PaymentFail';
import ProfileNavigation from '../component/Profile/ProfileNavigation';

const CustomerRouter = () => {
    const location = useLocation();

    // Check if the current path matches the payment success or fail paths
    const showNavbar = !location.pathname.includes('/success-payment') &&
        !location.pathname.includes('/fail-payment') &&
        !location.pathname.startsWith('/profile');

    return (
        <div>
            {showNavbar && <Navbar />}

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/account/:register' element={<Home />} />
                <Route path='/restaurant/:id' element={<RestaurantDetails />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/profile/*' element={<Profile />} />
                <Route path='/success-payment' element={<PaymentSuccess />} />
                <Route path='/fail-payment' element={<PaymentFail />} />
            </Routes>
            <Auth />
        </div>
    );
}

export default CustomerRouter;
