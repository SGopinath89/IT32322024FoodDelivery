import { Alert, Avatar, Badge, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React, { useEffect, useState } from 'react';
import { pink } from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCartItems } from '../State/Cart/Action';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth, cart } = useSelector(store => store);
    const [authenticate, setAuthenticate] = useState(false);

    useEffect(() => {
        if (auth.jwt) {
            dispatch(getAllCartItems({ token: auth.jwt }));
        }
    }, [auth.jwt, dispatch]);

    const handleAvatarClick = () => {
        if (auth.user.role === "ROLE_CUSTOMER") {
            navigate("/profile");
        } else {
            navigate("/admin/restaurant");
        }
    }

    const handleCart = () => {
        if (auth.user) {
            navigate("/cart");
        } else {
            setAuthenticate(true);
            setTimeout(() => {
                setAuthenticate(false);
            }, 2000);
        }
    }

    return (
        <>
            <div className='px-5 sticky top-0 z-50 py-[0.8rem] bg-black lg:px-20 flex justify-between'>
                <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
                    <li className='list-none logo text-[26px] underline'>
                        <Link to='/'>FAST-FOODS</Link>
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
                    <div>
                        <IconButton onClick={handleCart}>
                            <Badge color='primary' badgeContent={cart.cart?.item.length}>
                                <ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
                            </Badge>
                        </IconButton>
                    </div>
                </div>
            </div>
            {authenticate && (
                <Alert severity="error" sx={{ position: 'fixed', top: 10, right: 50 }}>
                    Please you need to login first
                </Alert>
            )}
        </>
    )
}

export default Navbar;
