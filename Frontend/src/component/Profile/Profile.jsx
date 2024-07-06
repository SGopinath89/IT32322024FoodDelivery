import React, { useState } from 'react';
import { Divider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import ProfileNavigation from './ProfileNavigation';
import UserProfile from './UserProfile';
import Orders from './Orders';
import Event from './Event';
import Favorite from './Favorites';
import Notification from './Notifications';
import Payment from './Payment';
import Address from './Address';

const Profile = () => {
    const [openSidebar, setOpenSidebar] = useState(true);

    const handleDrawer = () => {
        setOpenSidebar(!openSidebar);
    };

    return (
        <div>
            <Navbar handleDrawer={handleDrawer} />

            <div className="flex flex-col lg:flex-row">
                <div className="flex mx-auto lg:flex-1 lg:mx-0"> {/* Centering content on small screens */}
                    <div className={`sticky top-0 h-[80vh] lg:w-[20%] ${openSidebar ? '' : 'hidden lg:block'}`}>
                        <ProfileNavigation open={openSidebar} />
                    </div>
                    <Divider orientation="vertical" flexItem className="hidden lg:block" />
                    <div className="lg:flex-1">
                        <Routes>
                            <Route path="/" element={<UserProfile />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/events" element={<Event />} />
                            <Route path="/address" element={<Address />} />
                            <Route path="/favorites" element={<Favorite />} />
                            <Route path="/notifications" element={<Notification />} />
                            <Route path="/payments" element={<Payment />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
