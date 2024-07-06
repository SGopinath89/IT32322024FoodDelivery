import { Chip, IconButton } from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findCart, removeCartItem, updateCartItem } from '../State/Cart/Action';

const CartItem = ({ item }) => {

    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
    const { auth, cart } = useSelector(store => store);
    const dispatch = useDispatch();

    const [updateTrigger, setUpdateTrigger] = useState(false);

    const handleUpdateCartItem = (value) => {

        if (value === -1 && item.quantity === 1) {

            handleRemoveCartItem();
        }

        const data = { cartItemId: item.id, quantity: item.quantity + value }
        dispatch(updateCartItem({ data, jwt }));
        
         setUpdateTrigger(prev => !prev);

    }

    const handleRemoveCartItem = () => {

        dispatch(removeCartItem({ cartItemId: item.id, jwt: auth.jwt || jwt }));
    }

    useEffect(() => {
        dispatch(findCart(jwt))
    }, [jwt,dispatch,updateTrigger])
    



    return (
        <div className='px-5'>

            <div className='items-center lg:flex lg:space-x-5'>

                <div>
                    <img className='w-[5rem] h-[5rem] object-cover rounded-2xl' src={item?.food?.images[0]} alt="" />
                </div>
                <div className='flex items-center justify-between lg:w-[70%]'>

                    <div className='space-y-1 lg:space-y-3'>

                        <p>{item?.food?.name}</p>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center space-x-1'>
                                <IconButton onClick={() => handleUpdateCartItem(-1)}>
                                    <RemoveCircleOutlineIcon />
                                </IconButton>
                                <div className='flex items-center justify-center w-5 h-5 text-xs'>
                                    {item?.quantity}
                                </div>
                                <IconButton onClick={() => handleUpdateCartItem(1)}>
                                    <AddCircleOutlineIcon />
                                </IconButton>

                            </div>

                        </div>
                        <div className='pt-3 space-x-2'>
                            {
                                item?.ingredients?.map(ingredients =>
                                   
                                    <Chip key={ingredients} label={ingredients} />
                                )
                            }
                        </div>
                    </div>

                    <div>
                        <p>Rs. {item.totalPrice}</p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default CartItem