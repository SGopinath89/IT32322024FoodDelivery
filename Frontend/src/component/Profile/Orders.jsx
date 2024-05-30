
import React, { useEffect } from 'react'
import OrderCard from './OrderCard'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsersOrders } from '../State/Order/Action';

const Orders = () => {

  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const { auth, order } = useSelector(store => store);
  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(getUsersOrders(jwt));
  }, [auth.jwt])
  

  return (
    <div className='flex items-center flex-col pb-10'>
      <h1 className='text-x text-center py-7 font-semibold'>My Orders</h1>

      <div className='space-y-5 w-full lg:w-1/2'>
        {
          order.orders.map((order)=>order.items.map((items)=><OrderCard item={items} order={order}/>))
        }
      </div>
    </div>
  )
}

export default Orders