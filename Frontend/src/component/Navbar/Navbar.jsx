import { Alert, Avatar, Badge, IconButton, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React, { useEffect, useState } from 'react';
import { pink } from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { IoMenu } from "react-icons/io5";

const Navbar = ({ handleDrawer, isAddmin }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth, cart } = useSelector(store => store);
    const isSmallScreen = useMediaQuery('(max-width:1024px)');
    const prodileMenuShow= location.pathname.includes('/profile') ||location.pathname.includes('/admin/restaurants')
  


    const handleAvatarClick = () => {
        if (auth.user.role === "ROLE_CUSTOMER") {
            navigate("/profile");
        } else {
            navigate("/admin/restaurants/details");
        }
    }

    const handleCart = () => {
        if (auth.user) {
            navigate("/cart");
        } else {
            Swal.fire({
                icon: "error",
                title: "Waring..!!",
                text: "You need to login first",
                footer: '<a href="/account/login">Click hear to login</a>'

            });
        }
    }

    return (
        <>
            <div className='px-5 sticky top-0 z-50 py-[0.8rem] bg-black lg:px-20 flex justify-between'>
                <div className='flex items-center space-x-4 cursor-pointer lg:mr-10'>
                    {
                        isSmallScreen && prodileMenuShow&& <IconButton onClick={handleDrawer}><IoMenu /></IconButton>
                    }
                    <li className='list-none logo text-[28px]'>
                        {
                            !isAddmin ? (<Link to='/'><div>FAST  FOODS</div></Link>) : (<Link to='/admin/restaurants'>{isSmallScreen?(<div>FAST  FOODS</div>):(<div className='pl-[400px]'>FAST FOODS ADMIN</div>)}</Link>)
                        }

                            </li>
                </div>
                <div className='flex items-center space-x-2 lg:space-x-10'>
                    <div>
                        <IconButton>
                            <SearchIcon sx={{ fontSize: "1.5rem" }} />
                        </IconButton>
                    </div>
                    <div>
                        {auth.user ? (
                            <IconButton>
                                <Avatar onClick={handleAvatarClick} sx={{ bgcolor: "white", color: pink.A400, width: 32, height: 32 }}>
                                    {auth.user?.fullName[0].toUpperCase()}
                                </Avatar>
                            </IconButton>
                        ) : (
                            <IconButton onClick={() => navigate("/account/login")}>
                                <PersonIcon />
                            </IconButton>
                        )}
                    </div>
                    {!isAddmin && <div>
                        <IconButton onClick={handleCart}>
                            <Badge color='primary' badgeContent={cart?.cartItems?.length}>
                                <ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
                            </Badge>
                        </IconButton>
                    </div>}
                </div>
            </div >

        </>
    )
}

export default Navbar;
