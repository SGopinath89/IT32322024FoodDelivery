import React, { useState, useEffect } from 'react';
import './Home.css';
import MultiItemCarousel from './MultiItemCarousel';
import RestaurantCard from '../Restaurant/RestaurantCard';
import { Button, Divider, Grid, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantAction } from '../State/Restaurant/Action';
import EventCard from '../Profile/EventCard';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const { restaurant, auth } = useSelector((store) => store);
    const restaurants = restaurant?.restaurants;
    const [selectedRestaurant, setSelectedRestaurant] = useState('');
    const [selectedRestaurantId, setSelectedRestaurantId] = useState('');

    const restaurantNameList = restaurants?.filter(item => item?.open).map(item => item?.name) || [];
    const navigate = useNavigate();

    const StyledAutocomplete = styled(Autocomplete)({
        '& .MuiAutocomplete-endAdornment': {
            display: 'none',
        },
    });

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
    }, [dispatch]);

    const handleRestaurantChange = async (event, value) => {
        setSelectedRestaurant(value);
        const selected = restaurants.find((item) => item.name === value);
        if (selected) {
            setSelectedRestaurantId(selected.id);
        }
    };

    const goToRestaurant = () => {
        if (auth.user) {
            navigate(`/restaurant/${selectedRestaurantId}`);
        } else {
            navigate('/account/login');
        }
    };

    return (
        <div className='pb-10'>
            <div>
                <section className='relative flex flex-col items-center justify-evenly banner'>
                    <Grid container spacing={2} className='flex items-center justify-center px-3 search-container'>
                        <Grid item xs={8} sm={6}>
                            <StyledAutocomplete
                                id='restaurant-search'
                                options={restaurantNameList}
                                onChange={handleRestaurantChange}
                                value={selectedRestaurant}
                                freeSolo
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder='Search Opened Restaurant'
                                        margin='normal'
                                        variant='outlined'
                                        InputProps={{ ...params.InputProps, type: 'search' }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6} sm={2}>
                            <Button
                                color='primary'
                                variant='contained'
                                style={{ height: '54px', width: '100%' }}
                                onClick={goToRestaurant}
                            >
                                Search
                            </Button>
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
                <p className='py-3 pb-5 text-2xl font-semibold text-gray-400'>Top Meals</p>
                <MultiItemCarousel foods={restaurant?.foods} />
            </section>
            <Divider />

            <section className='px-5 pt-10 lg:px-20'>
                <h1 className='pb-8 text-2xl font-semibold text-gray-400'>Restaurants</h1>
                <div className='flex flex-wrap items-center justify-around gap-5'>
                    {restaurant?.restaurants?.map((item) => (
                        <RestaurantCard key={item?.id} item={item} />
                    ))}
                </div>
            </section>

            <Divider className='pt-10' />

            <div>
                <Divider />
                <section className='px-5 pt-10 lg:px-20'>
                    <h1 className='pb-8 text-2xl font-semibold text-gray-400'>Events</h1>
                    <div className='flex flex-wrap items-center justify-around gap-5'>
                        {restaurant?.restaurantsEvents?.map((item) => (
                            <EventCard key={item?.id} event={item} />
                        ))}
                    </div>
                    <Divider className='pt-10' />
                </section>
            </div>
        </div>
    );
};

export default Home;
