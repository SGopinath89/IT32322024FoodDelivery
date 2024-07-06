import { Button, Card } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, createPaymentLink } from '../State/Order/Action';
import Swal from 'sweetalert2';


const AddressCard = ({ item, handleClose }) => {

    const { cart, auth } = useSelector(store => store);
    const dispatch = useDispatch();
    // const dispatch = useDispatch();
    const createOrderUsingSelectedAddress = () => {

        if (cart.cartItems.length == 0) {
            let timerInterval;
            Swal.fire({
                icon: "question",
                text: "Cart is empty",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false

            });
            return;
        } else {
            Swal.fire({
                title: "Conform order ?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                html: `
                    <div style="display:block; font-size: 14px; color:black; border: 3px solid #ccc; padding: 10px;">
                    <div><h1>Location Type : ${item?.locationType}</h1></div>
                    <div><p>Address : ${item?.streetAddress}</p></div>
                    <div><p>City : ${item?.city}</p></div>
                    <div><p>Mobile : ${item?.mobile}</p></div>
                    </div>
                    <br/>
                    <div style="display:block; font-size: 14px; color:black; border: 3px solid #ccc; padding: 10px;">
                    <div><h1>Dilivery Free : 0.00</h1></div>
                    <div><h1>Total Price : ${cart?.cart?.total}</h1></div>
                  
                    </div>
    
                `,

            }).then(async (result) => {
                if (result.isConfirmed) {
                    const data = {
                        jwt: localStorage.getItem("jwt"),
                        total:cart?.cart?.total,
                        deliveryAddress: {
                            fullName: auth.user?.fullName,
                            streetAddress: item.streetAddress,
                            city: item.city,
                            mobile: item.mobile,
                            locationType: item.locationType
                        }
                    }
                    dispatch(createPaymentLink(data));

                }
            });
        }


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