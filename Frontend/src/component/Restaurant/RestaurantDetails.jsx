import { Divider, FormControl, Grid, RadioGroup, Typography, Radio } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel';
import React, { useEffect, useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuCard from './MenuCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, getRestaurantCategory } from '../State/Restaurant/Action';
import { getItemsByRestaurantId } from '../State/Menu/Action';




const foodTypes = [

    { label: "All", value: "all" },
    { label: "Veg_only", value: "vegetarian" },
    { label: "Non-veg", value: "non_vegetarian" },
    { label: "Seasonal", value: "seasonal" },

];


const RestaurantDetails = () => {

    const [foodType, setFoodType] = useState("all");

    //  const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant, menu } = useSelector(store => store);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const { id } = useParams();



    const handleFilterCategory = (e, value) => {

        setSelectedCategory(value);
    }


    const handleFilter = (e, value) => {

        setFoodType(value);
    }

    useEffect(() => {
        dispatch(getRestaurantById({ restaurantId: id, jwt }));
        dispatch(getRestaurantCategory({ jwt, restaurantId: id }));
    }, [])

    console.log(foodType)
    useEffect(() => {
        dispatch(getItemsByRestaurantId({
            jwt, restaurantId: id, vegetarian: foodType === "vegetarian",
            nonVeg: foodType === "non_vegetarian", seasonal: foodType === "seasonal", foodCategory: selectedCategory
        }));
    }, [selectedCategory, foodType])





    return (
        <div className='px-5 py-5 lg:px-20 '>

            <section >
                <h3 className='text-gray-500 py-2 '>{restaurant.restaurant?.name}</h3>
            </section>

            <div>

                <Grid container spacing={2}>

                    {restaurant?.restaurant?.images.map((item) =>
                        <Grid item xs={12} >
                            <img className='w-full h-[40vh] object-cover ' src={item} alt="" />
                        </Grid>
                    )}


                </Grid>

            </div>

            <div className='pt-3 pb-5'>
                <h1 className='text-4xl font-semibold'>{restaurant.restaurant?.name}</h1>
                <p className='text-gray-500 mt-1'>
                    {restaurant.restaurant?.description}
                </p>
                <div className='space-y-3 mt-3'>
                    <p className='text-gray-500 flex items-center gap-3 '>
                        <LocationOnIcon />
                        <span>
                            {restaurant.restaurant?.address?.streetAddress} , {restaurant.restaurant?.address?.city}
                        </span>

                    </p>
                    <p className='text-gray-500 flex items-center gap-3 '>
                        <CalendarTodayIcon />
                        <span>

                            {restaurant.restaurant?.openingHours}

                        </span>

                    </p>
                </div>

            </div>
            <Divider />

            <section className='pt-[2rem] lg:flex relative'>

                <div className='space-y-10 lg:w-[20%] filter'>
                    <div className='box space-y-5 lg:sticky top-28 p-5  '>

                        <div>
                            <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>
                                Food Type
                            </Typography>

                            <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup className='food_type' value={foodType} onChange={handleFilter}>
                                    {
                                        foodTypes.map((item) =>
                                            <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />
                                        )
                                    }
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Divider />
                        <div>
                            <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>
                                Food Category
                            </Typography>

                            <FormControl className='py-10 space-y-5' component={"fieldset"}>

                                <RadioGroup className='food_category' value={selectedCategory} onChange={handleFilterCategory}>
                                    {/* <FormControlLabel  value={'All'} control={<Radio />} label="All" /> */}
                                    {
                                        restaurant.categories.map((item, key) =>
                                            <FormControlLabel key={key} value={item.name} control={<Radio />} label={item.name} />
                                        )
                                    }
                                </RadioGroup>
                            </FormControl>
                        </div>

                    </div>
                </div>
                <div className='space-y-10 lg:w-[80%] lg:pl-10 p-5'>
                    {
                        menu.menuItems.map(item =>
                            <MenuCard item={item} />
                        )
                    }
                </div>
            </section>

        </div>
    )
}

export default RestaurantDetails