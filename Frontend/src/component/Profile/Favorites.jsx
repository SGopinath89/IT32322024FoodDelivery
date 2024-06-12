import React, { useEffect } from 'react'
import RestaurantCard from '../Restaurant/RestaurantCard'
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantAction } from '../State/Restaurant/Action';

const Favorites = () => {
  const dispatch = useDispatch();


  const { auth, restaurant } = useSelector(store => store);

 
 
  const userFavorites = auth?.favorites && restaurant?.restaurants
    ? restaurant.restaurants.filter(item1 => auth.favorites.some(item2 => item1.id === item2.id))
    : [];

  
  
  return (
    <div>
      <h1 className='py-5 text-xl font-semibold text-center'>My Favorites</h1>
      <div className='flex flex-wrap justify-center gap-3'>
        {
          userFavorites?.map((item) =>
            <RestaurantCard key={item.id} item={item} />
          )
        }
      </div>
    </div>
  )
}

export default Favorites;
