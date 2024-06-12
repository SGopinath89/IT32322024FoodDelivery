import React, { useState } from 'react'
import ProfileNavigation from './ProfileNavigation'
import { Divider } from '@mui/material'
import { Route, Routes } from 'react-router-dom';
import UserProfile from './UserProfile';
import Orders from './Orders';
import Event from './Event';
import Favorite from './Favorites';
import Notification from './Notifications';
import Payment from './Payment';
import Address from './Address';

const Profile = () => {
    const [openSidebar, setOpenSideBar] = useState(true);
    
    return (
        <div className='lg:flex justify-between'>
            <div className='sticky top-0 h-[80vh] lg:w-[20%]'>
                <ProfileNavigation open={openSidebar} handleClose={() => setOpenSideBar(false)} />
            </div>
            <Divider orientation='vertical' flexItem />
            <div className='lg:w-[80%]'>
                <Routes>
                    <Route path='/' element={<UserProfile />} />
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/events' element={<Event />} />
                    <Route path='/address' element={<Address />} />
                    <Route path='/favorites' element={<Favorite />} />
                    <Route path='/notifications' element={<Notification />} />
                    <Route path='/payments' element={<Payment />} />
                </Routes>
            </div>
        </div>
    )
}

export default Profile
