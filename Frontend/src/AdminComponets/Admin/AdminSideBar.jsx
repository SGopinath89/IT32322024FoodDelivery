import { Dashboard, ShoppingBag } from '@mui/icons-material'
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import CategoryIcon from '@mui/icons-material/Category';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EventIcon from '@mui/icons-material/Event';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';

import React from 'react'
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../component/State/Authentication/Action';

const menu = [
    { title: "Dashboard", icon: <Dashboard />, path: '/' },
    { title: "Orders", icon: <ShoppingBag />, path: '/orders' },
    { title: "Menu", icon: <ShopTwoIcon />, path: '/menu' },
    { title: "Food Category", icon: <CategoryIcon />, path: '/category' },
    { title: "Ingredients", icon: <FastfoodIcon />, path: '/ingredients' },
    { title: "Events", icon: <EventIcon />, path: '/events' },
    { title: "Details", icon: <AdminPanelSettingsIcon />, path: '/details' },
    { title: "Logout", icon: <LogoutIcon />, path: '/' }
]

const AdminSideBar = ({ open}) => {
    const isSmallScreen = useMediaQuery("(max-width:1024px)");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = (item) => {

        navigate(`/admin/restaurants${item.path}`);

        if (item.title == "Logout") {
            navigate("/");
            dispatch(logout());
            handleClose();
        }

    }

    return (
        <Drawer
            variant={isSmallScreen ? "temporary" : "permanent"}
           
            open={open}
            anchor='left'
            sx={{ zIndex: 10 }}
        >
            <div className='w-[40vw] lg:w-[20vw] h-screen flex flex-col 
            justify-center text-xl space-y-[1.65rem]'>

                {
                    menu.map((item, index) =>
                        <>
                            <div onClick={() => handleNavigate(item)} className='flex items-center gap-5 px-5 cursor-pointer'>
                                {item.icon}
                                <span>{item.title}</span>
                            </div>
                            {index !== (menu.length - 1) && <Divider />}
                            {/* index start from 0 thats why menu.length-1 */}
                        </>
                    )
                }
            </div>
        </Drawer>
    )
}

export default AdminSideBar
