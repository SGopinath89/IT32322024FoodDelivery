import React from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PaymentIcon from '@mui/icons-material/Payment';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LogoutIcon from '@mui/icons-material/Logout';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../State/Authentication/Action.jsx';

const ProfileNavigation = ({ open, handleClose }) => {

    const menu = [

        { title: "Orders", icon: <ShoppingBagIcon /> },
        { title: "Favorites", icon: <FavoriteIcon /> },
        { title: "Address", icon: <LocationOnIcon /> },
        { title: "Payments", icon: <PaymentIcon /> },
        { title: "Notifications", icon: <NotificationsActiveIcon /> },
        { title: "Events", icon: <EventIcon /> },
        { title: "Logout", icon: <LogoutIcon /> }

    ];

    const isSmallScreen = useMediaQuery('(max-width:768px)');
    const navigate = useNavigate();
    const dispatch =useDispatch();

    const handleNavigate =  (item) => {

        if(item.title==="Logout"){
            dispatch(logout());
            navigate("/");
        }else{
            navigate(`/profile/${item.title.toLowerCase()}`);
        }

        
    }

    return (

        <div>

            <Drawer
                open={isSmallScreen ? (open) : (true)}
                anchor='left'
                onClose={handleClose}
                sx={{ zIndex: -1 }}
                variant={isSmallScreen ? ('temporary') : ('permanent')}
            >

                <div className='w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl gap-8 pt-16 '>
                    {
                        menu.map((item, i) =>
                            <>

                                <div onClick={() => handleNavigate(item)} className='px-5 flex items-center space-x-5 cursor-pointer'>
                                    {item.icon}
                                    <span>
                                        {item.title}
                                    </span>

                                </div>
                                {i !== menu.length - 1 && <Divider />}
                            </>

                        )
                    }
                </div>
            </Drawer>

        </div>
    )
}

export default ProfileNavigation