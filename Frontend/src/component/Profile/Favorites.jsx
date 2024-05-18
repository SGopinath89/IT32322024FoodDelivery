import React from 'react'
import RestaurantCard from '../Restaurant/RestaurantCard'
import { useSelector } from 'react-redux';

const Favorites = () => {

  const { auth } = useSelector(store => store);
  return (
    <div>
      <h1 className='py-5 text-xl font-semibold text-center'>My Favorits</h1>
      <div className='flex flex-wrap justify-center gap-3'>
        {
          auth.favorites.map((item) =>
            <RestaurantCard key={item} item={item} />
          )
        }
      </div>
    </div>
  )
}

export default Favorites