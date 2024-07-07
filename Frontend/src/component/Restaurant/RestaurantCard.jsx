import { Card, Chip, IconButton } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite } from '../State/Authentication/Action';
import { isPresentInFavorites } from '../config/logic';
import Swal from 'sweetalert2'

const RestaurantCard = ({ item }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector(store => store);



    const handleAddToFavorites = () => {

        if (auth.user) {
            dispatch(addToFavorite({ restaurantId: item.id, jwt }));
        } else {
            navigate('/account/login');
        }

    }

    const handleNavigateToRestaurant = () => {
        if (!auth.user) {
            navigate('/account/login');
        }
        else if (item.open) {  //set logic correct after test

            navigate(`/restaurant/${item.id}`);
        } else {
            Swal.fire("Restaurant closed try later..");
        }
    }

    return (

        <Card className='w-[18rem]' >
            <div className={`${item.open ? 'cursor-pointer' : 'cursor-not-allowed'} relative`} onClick={handleNavigateToRestaurant}>
                <img className='w-full h-[10rem] rounded-t-md object-cover' src={item.images[0]} alt="" />

                <Chip
                    size='small'
                    className='absolute top-2 left-2'
                    color={item.open ? 'success' : 'error'}
                    label={item.open ? 'Open' : 'Closed'}
                />
            </div>
            <div className='justify-between w-full p-4 textPart lg:flex'>
                <div className='space-y-1'>
                    <p onClick={handleNavigateToRestaurant} className='text-lg font-semibold cursor-pointer'> {item.name.length > 19 ? `${item.name.substring(0, 19)}...` : item.name}</p>
                    <p className='text-sm text-gray-500'>
                        {item.description.length > 60 ? `${item.description.substring(0, 60)}...` : item.description}
                    </p>

                </div>
                <div>
                    <IconButton onClick={handleAddToFavorites}>
                        {isPresentInFavorites(auth.favorites, item) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                </div>
            </div>


        </Card>
    )
}

export default RestaurantCard