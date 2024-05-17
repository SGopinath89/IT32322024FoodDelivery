import React from 'react'
import { Button, Card } from '@mui/material'

const OrderCard = () => {
    return (
        <Card className='flex justify-between items-center p-4'>
            <div className='flex justify-between items-center p-4'>
                <img className='h-16 w-16 ' src="https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            </div>
            <div>
                <p>Biriyani</p>
                <p>399 LKR</p>
            </div>
            <div>
                <Button className='cursor-not-allowed'>Completed</Button>
            </div>
        </Card>
    )
}

export default OrderCard