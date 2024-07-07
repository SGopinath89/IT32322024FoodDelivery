import React, { useState } from 'react'
import './Home.css';
import MultiItemCarousel from './MultiItemCarousel';
import RestaurantCard from '../Restaurant/RestaurantCard';
import { Button, Divider, Grid, IconButton, InputAdornment } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents, getAllFoods, getAllRestaurantAction } from '../State/Restaurant/Action';
import { useEffect } from 'react';
import EventCard from '../Profile/EventCard';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import { CiSearch } from "react-icons/ci";
import { high } from '@cloudinary/url-gen/qualifiers/videoCodecProfile';
import { useNavigate } from 'react-router-dom';



const Home = () => {

    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant, auth } = useSelector(store => store);
    const restaurants = restaurant?.restaurants;
    const [selectedRestaurnt, setSelectRestaurant] = useState('');
    const [selectedRestaurntId, setSelectRestaurantId] = useState('');

    const restaurantNameList = new Array();
    const navigator = useNavigate();
    //create for add search bar list
    restaurants?.map((item) => {
        if (item?.open) restaurantNameList.push(item?.name);
    });


    const StyledAutocomplete = styled(Autocomplete)({
        '& .MuiAutocomplete-endAdornment': {
            display: 'none',

        },

    });


    //i want to know resturant open or not on time so i use useEffect run again again within 3 min
    useEffect(() => {
        const fetchData = () => {
            dispatch(getAllRestaurantAction());
            const now = new Date().getTime();
            const nextThreeMinuteBoundary = Math.ceil(now / (3 * 60 * 1000)) * (3 * 60 * 1000);
            const delay = Math.max(nextThreeMinuteBoundary - now, 3000);

            setTimeout(fetchData, delay);
        };

        fetchData();

        return () => {
            clearTimeout();
        };
    }, []);


    const handleRestaurantChange = async (event, value) => {
        setSelectRestaurant(value);
        await restaurants.map(async (item) => {
            if (item.name == value) {

                setSelectRestaurantId(item.id);
                return;
            }
        });
    };
    const goToRestaurant = () => {

        if (auth.user) {
            navigator(`/restaurant/${selectedRestaurntId}`);
        } else {
            navigator('/account/login');
        }
    };




    return (
        <div className='pb-10'>
            <div>
                <section className='relative flex flex-col items-center justify-evenly banner'>
                    
                    <Grid container spacing={2} className='items-center justify-center'>
                        <Grid item xs={8}>
                            <StyledAutocomplete

                                id="restaurant-search"
                                options={restaurantNameList}
                                onChange={handleRestaurantChange}
                                value={selectedRestaurnt}
                                freeSolo
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder='Search Opened Restaurant'
                                        margin="normal"
                                        variant="outlined"
                                        InputProps={{ ...params.InputProps, type: 'search' }}
                                    />
                                )}
                            />

                        </Grid>
                        
                        <Grid item >
                            <Button
                                color='primary'
                                variant='contained'
                                style={{ height: "54px", width: "120px" }}

                                onClick={() => goToRestaurant()}
                            >Serach</Button>
                        </Grid>

                    </Grid>
                    <div className='w-[50vw] z-10 text-center banner-content'>
                        <p className='py-5 text-2xl font-bold lg:text-7xl' style={{ letterSpacing: '0.4rem' }}>
                            Fast Foods
                        </p>
                        <p className='text-xl lg:text-5xl'>
                            Taste the Convenience Food, Fast and Delivered.
                        </p>
                    </div>
                </section>
            </div>



            <section className='p-10 lg:py-10 lg:px-20'>
                <p className='py-3 pb-5 text-2xl font-semibold text-gray-400'>Top Meels</p>
                <MultiItemCarousel foods={restaurant?.foods} />
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

            {<div>
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