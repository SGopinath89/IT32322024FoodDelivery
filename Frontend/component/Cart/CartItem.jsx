import { Chip, IconButton } from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React from 'react'

const CartItem = ({ item }) => {
    //console.log(item.ingredients)
    return (
        <div className='px-5'>

            <div className='lg:flex items-center lg:space-x-5'>

                <div>
                    <img className='w-[5rem] h-[5rem] object-cover rounded-2xl' src="https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div>
                <div className='flex items-center justify-between lg:w-[70%]'>

                    <div className='space-y-1 lg:space-y-3'>

                        <p>Biriyani</p>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center space-x-1'>
                                <IconButton>
                                    <RemoveCircleOutlineIcon />
                                </IconButton>
                                <div className='w-5 h-5 text-xs flex items-center justify-center'>
                                    Rs:{item.totalPrice}
                                </div>
                                <IconButton>
                                    <AddCircleOutlineIcon />
                                </IconButton>

                            </div>

                        </div>
                        <div className='pt-3 space-x-2'>
                            {
                                [1,2].map(item =>
                                    <Chip key={item} label={"Bread"} />
                                )
                            }
                        </div>
                    </div>

                    <div>
                        <p>1500 LKR</p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default CartItem