import { Box, Button, Card, Divider, Grid, Modal, TextField } from '@mui/material'
import { React, useState } from 'react'
import CartItem from './CartItem'
import AddressCard from './AddressCard';
import AddLocationIcon from '@mui/icons-material/AddLocation';

import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../State/Order/Action';

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



const Cart = () => {

    const { cart, auth } = useSelector(store => store);

    const createOrderUsingSelectedAddress = () => {

    }

    const handleOpenAddresModal = () => {
        setOpen(true);
    }

    const dispatch = useDispatch();

    const handleOnSubmit = (values) => {

        const data = {
            jwt: localStorage.getItem("jwt"),
            restaurantId: cart.cartItems[0].food?.restaurant.id,
            deliveryAddress: {
                fullName: auth.user?.fullName,
                streetAddress: values.streetAddress,
                city: values.city,
                state: values.state,
                postalCode: values.pincode,
                country: "Srilanka"

            }
        }


       console.log(data);
        dispatch(createOrder(data));
    }

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const initialValues = {

        streetAddress: "",
        state: "",
        pincode: '',
        city: "",
        country:""
    }

    const validationSchema = Yup.object().shape({

        streetAddress: Yup.string().required("Street Address is required"),
        state: Yup.string().required("State is required"),
        pincode: Yup.string().required("Pincode is required"),
        city: Yup.string().required("City is required")

    })

    return (
        <>
            <main className='lg:flex justify-between '>

                <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
                    {

                        cart.cartItems?.map(item =>

                            <CartItem item={item} />

                        )
                    }
                    <Divider />
                    <div className='billDetails px-5 text-sm'>
                        <p className='font-extralight py-5'>Bill Details</p>
                        <div className='space-y-3 pb-3
                        '>

                            <div className='flex justify-between text-gray-400'>
                                <p>Item Total</p>
                                <p>Rs. {cart?.cart?.total}</p>
                            </div>
                            <div className='flex justify-between text-gray-400'>
                                <p>Dilivery Free</p>
                                <p>Rs. 299</p>
                            </div>

                        </div>
                        <Divider />
                        <div className='flex justify-between text-gray-400'>
                            <p>Total pay</p>
                            <p>Rs. {cart?.cart?.total + 299}</p>
                        </div>

                    </div>

                </section>

                <Divider orientation='vertical' flexItem />


                <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
                    <div>
                        <h1 className='text-center font-semibold text-2xl py-10'>Choose Dlivery Address</h1>

                        <div className='flex gap-5 flex-wrap justify-center'>
                            {
                                [1, 2, 3, 4].map(item =>
                                    <AddressCard key={item} handleSelectAddress={createOrderUsingSelectedAddress} item={item} showbtn={true} />
                                )
                            }
                            <Card className='flex gap-5 w-64 p-5'>

                                <AddLocationIcon />
                                <div className='space-y-3 text-gray-500'>
                                    <h1 className='font-semibold text-lg text-white'>Add New Address</h1>
                                    {<Button variant='contained' fullWidth onClick={handleOpenAddresModal} >Add</Button>}
                                </div>

                            </Card>
                        </div>


                    </div>

                </section>
            </main>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleOnSubmit}
                        >
                            <Form>
                                <Grid container spacing={2} >
                                    <Grid item xs={12}> <h1 className='font-bold text-xl text-gray-400'>Add Address</h1></Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            name="streetAddress"
                                            label="Street Address"
                                            fullWidth variant="outlined"
                                            error={!ErrorMessage("streetAddress")}

                                        // helperText={
                                        //     <ErrorMessage>
                                        //         {(msg) => <span className='text-red-600'>{msg}</span>}
                                        //     </ErrorMessage>
                                        // }

                                        >

                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            name="state"
                                            label="State"
                                            fullWidth variant="outlined"
                                            error={!ErrorMessage("state")}

                                        // helperText={
                                        //     <ErrorMessage>
                                        //         {(msg) => <span className='text-red-600'>{msg}</span>}
                                        //     </ErrorMessage>
                                        // }

                                        >

                                        </Field>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            as={TextField}
                                            name="city"
                                            label="City"
                                            fullWidth variant="outlined"
                                            error={!ErrorMessage("city")}

                                        // helperText={
                                        //     <ErrorMessage>
                                        //         {(msg) => <span className='text-red-600'>{msg}</span>}
                                        //     </ErrorMessage>
                                        // }

                                        >

                                        </Field>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            as={TextField}
                                            name="pincode"
                                            label="Pin Code"
                                            fullWidth variant="outlined"
                                            error={!ErrorMessage("pincode")}

                                        // helperText={
                                        //     <ErrorMessage>
                                        //         {(msg) => <span className='text-red-600'>{msg}</span>}
                                        //     </ErrorMessage>
                                        // }

                                        >

                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button fullWidth variant='contained' type='submit' color='primary' className=''>Add</Button>
                                    </Grid>

                                </Grid>
                            </Form>


                        </Formik>
                    </Box>
                </Modal>
            </div>

        </>
    )
}

export default Cart