import React, { useState } from 'react'
import './Home.css';
import MultiItemCarousel from './MultiItemCarousel';
import RestaurantCard from '../Restaurant/RestaurantCard';
import { Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantAction } from '../State/Restaurant/Action';
import { useEffect } from 'react';





const Home = () => {

    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant, auth } = useSelector(store => store);

    const [data, setData] = useState([]);


    useEffect(() => {
        dispatch(getAllRestaurantAction());

    }, [])




    return (
        <div className='pb-10'>
            <section className='banner -z-50 relative flex flex-col justify-center items-center'>
                <div className='w-[50vw] z-10 text-center text-black'>

                    <p className='text-2xl lg:text-6xl font-bold z-10 py-5 '>
                        Fast Food
                    </p>
                    <p className='z-10 text-red-90 text-xl lg:text-4xl'>
                        Taste the Convenience: Food, Fast and Deliverd.
                    </p >

                </div>


            </section>

            <section className='p-10 lg:py-10 lg:px-20'>
                <p className='text-2xl font-semibold text-gray-400 py-3 pb-5'>Top Meels</p>
                <MultiItemCarousel />
            </section>
            <Divider />

            <section className='px-5 lg:px-20 pt-10'>
                <h1 className='text-2xl font-semibold text-gray-400 pb-8'>All Restaurants </h1>
                <div className='flex flex-wrap items-center justify-around gap-5 '>
                    {
                        restaurant?.restaurants?.map((item) => <RestaurantCard key={item?.id} item={item}  />)
                    }
                </div>
            </section>


            <Divider className='pt-10' />
        </div>
    )
}

export default Home