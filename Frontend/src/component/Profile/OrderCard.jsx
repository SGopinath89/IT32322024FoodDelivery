import React from 'react'
import { Button, Card } from '@mui/material'

const OrderCard = ({item,order}) => {
    
    return (
        <Card className='flex justify-between items-center p-4'>
            <div className='flex justify-between items-center p-4'>
                <img className='h-16 w-16 ' src={item.food.images[0]} alt="" />
            </div>
            <div>
                <p>{item?.food.name}</p>
                <p>Total : Rs {item?.totalPrice}.00</p>
            </div>
            <div>
                <Button className='cursor-not-allowed'>{order.orderStatus}</Button>
            </div>
        </Card>
    )
}

export default OrderCard