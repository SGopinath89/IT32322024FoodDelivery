
import { Button, IconButton } from '@mui/material';
import React from 'react'
import { MdAddShoppingCart } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CarouselItem = ({ image, title, price, restaurantId }) => {

    const navigate = useNavigate();
    const { auth } = useSelector(store => store);
    const handleAddItemToCart = () => {
        if (auth.user) {
            navigate(`/restaurant/${restaurantId}`);
        } else {
            navigate('/account/login');
        }


    }

    return (

        <div className='flex flex-col items-center justify-center gap-1 p-6 '>
            <img src={image} alt="" className='w-[10rem] h-[10rem] lg:h-[14rem] lg:w-[14rem] rounded-full object-cover object-center' />
            <br />
            <span className='font-semibold text-gray-400 tex1t-lg'>{title}</span>
            <span className='font-semibold text-gray-400 tex1t-lg '>Rs : {price}.00</span>
            <Button
                onClick={handleAddItemToCart}
                variant="contained"
                color="primary"
                startIcon={<MdAddShoppingCart />}
                sx={{ '& .MuiButton-startIcon': { mr: 1 } }}
            >
                Add Cart
            </Button>
        </div>

    )
}

export default CarouselItem