
import { Button, IconButton } from '@mui/material';
import React from 'react'
import { MdAddShoppingCart } from "react-icons/md";

const CarouselItem = ({ image, title, price }) => {
    return (

        <div className='flex flex-col items-center justify-center gap-1 p-6 border'>
            <img src={image} alt="" className='w-[10rem] h-[10rem] lg:h-[14rem] lg:w-[14rem] rounded-full object-cover object-center' />
            <br/>
            <span className='font-semibold text-gray-400 tex1t-lg'>{title}</span>
            <span className='font-semibold text-gray-400 tex1t-lg '>Rs : {price}.00</span>
            <div className='flex justify-between px]'>
                <Button><MdAddShoppingCart />Add Cart</Button>
            </div>
        </div>

    )
}

export default CarouselItem