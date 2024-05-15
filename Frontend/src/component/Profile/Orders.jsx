
import React from 'react'
import OrderCard from './OrderCard'

const Orders = () => {
  return (
    <div className='flex items-center flex-col pb-10'>
      <h1 className='text-x text-center py-7 font-semibold'>My Orders</h1>

      <div className='space-y-5 w-full lg:w-1/2'>
        {
          [1, 2, 3, 4, 5].map(item =>
            <OrderCard key={item} />
          )
        }
      </div>
    </div>
  )
}

export default Orders