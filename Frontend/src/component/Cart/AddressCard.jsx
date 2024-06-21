import { Button, Card } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../State/Order/Action';


const AddressCard = ({ item }) => {

    // { cart, auth } = useSelector(store => store);
    // const dispatch = useDispatch();
    const createOrderUsingSelectedAddress =  () => {
        alert("Not devloped yet");
        // const data = {
        //     jwt: localStorage.getItem("jwt"),

        //     restaurantId: cart.cartItems[0].food?.restaurant.id,
        //     deliveryAddress: {
        //         fullName: auth.user?.fullName,
        //         streetAddress: item.streetAddress,
        //         city: item.city,
        //         mobile: item.mobile,
        //         locationType: item.location
        //     }
        // }
        // dispatch(createOrder(data));

   }



    return (

        <Card className='flex w-64 gap-5 p-5'>


            <div className='flex-row '>
                <div>
                    <HomeIcon />
                </div>
                <div>
                    <h1>{item?.locationType}</h1>
                </div>
                <div>
                    <p>{item?.streetAddress}</p>
                </div>
                <div>

                    <p>{item?.city}</p>
                </div>
                <div>
                    <p>{item?.mobile}</p>
                </div>
                <div>
                    <Button variant='outlined' onClick={createOrderUsingSelectedAddress} fullWidth >Select</Button>
                </div>

            </div>
        </Card>

    )
}

export default AddressCard