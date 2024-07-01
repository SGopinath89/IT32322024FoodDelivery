import React, { useState } from 'react'
import './Home.css';
import MultiItemCarousel from './MultiItemCarousel';
import RestaurantCard from '../Restaurant/RestaurantCard';
import { Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents, getAllRestaurantAction } from '../State/Restaurant/Action';
import { useEffect } from 'react';
import EventCard from '../Profile/EventCard';





const Home = () => {

    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant } = useSelector(store => store);

    console.log(restaurant)


    useEffect(() => {
        dispatch(getAllRestaurantAction());
        //dispatch(getAllEvents(jwt))

    }, [])




    return (
        <div className='pb-10'>
            <section className='relative flex flex-col items-center justify-center banner -z-50'>
                <div className='w-[50vw] z-10 text-center text-black'>

                    <p className='z-10 py-5 text-2xl font-bold lg:text-7xl '>
                        Fast Food
                    </p>
                    <p className='z-10 text-xl text-red-90 lg:text-5xl'>
                        Taste the Convenience Food, Fast and Deliverd.
                    </p >

                </div>


            </section>

            <section className='p-10 lg:py-10 lg:px-20'>
                <p className='py-3 pb-5 text-2xl font-semibold text-gray-400'>Top Meels</p>
                <MultiItemCarousel />
            </section>
            <Divider />

            <section className='px-5 pt-10 lg:px-20'>
                <h1 className='pb-8 text-2xl font-semibold text-gray-400'>Restaurants</h1>
                <div className='flex flex-wrap items-center justify-around gap-5 '>
                    {
                        restaurant?.restaurants?.map((item) => <RestaurantCard key={item?.id} item={item} />)
                    }
                </div>
            </section>


            <Divider className='pt-10' />

            {jwt && <div>
                <Divider />
                <section className='px-5 pt-10 lg:px-20'>
                    <h1 className='pb-8 text-2xl font-semibold text-gray-400'>Events </h1>
                    <div className='flex flex-wrap items-center justify-around gap-5 '>
                        {
                            restaurant?.restaurantsEvents?.map((item) => <EventCard key={item?.id} event={item} />)
                        }
                    </div>
                    <Divider className='pt-10' />
                </section>

            </div>}

          
        </div>
    )
}

export default Home