import { Box, Button, Card, Divider, Grid, Modal, TextField } from '@mui/material'
import { React, useState } from 'react'
import CartItem from './CartItem'
import AddressCard from './AddressCard';
import AddLocationIcon from '@mui/icons-material/AddLocation';

import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../State/Order/Action';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const handleOpenAddresModal = () => {
        setOpen(true);
    }

    const dispatch = useDispatch();

    const handleOnSubmit = (values) => {



        {
            cart.cartItems?.map((item) => {
                const data = {
                    jwt: localStorage.getItem("jwt"),

                    restaurantId: item.food?.restaurant.id,
                    deliveryAddress: {
                        fullName: auth.user?.fullName,
                        streetAddress: values.streetAddress,
                        city: values.city,
                        mobile: values.mobile,
                        locationType: values.location
                    }
                }
                dispatch(createOrder(data));

            })
        }
        handleClose();
    }



    const initialValues = {

        location: '',
        streetAddress: '',
        mobile: '',
        city: '',

    }

    const validationSchema = Yup.object().shape({

        streetAddress: Yup.string().required("Street Address is required"),
        mobile: Yup.string().required("Mobile is required"),
        location: Yup.string().required('Location Type is required'),
        city: Yup.string().required("City is required")

    })

    return (
        <>
            <main className='justify-between lg:flex '>

                <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>

                    {
                        cart?.cartItems.length > 0 ? (cart.cartItems?.map(item =>

                            <CartItem item={item} />

                        )) : (
                            <div className='px-20'>
                                {/* <center className='p-5 text-gray-500'>Cart Empty</center> */}
                                <div className='flex justify-center'><Button onClick={() => navigate("../profile/favorites")} fullWidth variant='outlined'>Add Items</Button></div>
                            </div>
                        )

                    }
                    <Divider />


                    <div className='px-5 text-sm billDetails'>
                        <p className='py-5 font-extralight'>Bill Details</p>
                        <div className='pb-3 space-y-3 '>

                            <div className='flex justify-between text-gray-400'>
                                <p>Item Total</p>
                                <p>Rs. {cart?.cart?.total}</p>
                            </div>
                            <div className='flex justify-between text-gray-400'>
                                <p>Dilivery Free</p>
                                <p>Rs. 00</p>
                            </div>

                        </div>
                        <Divider />
                        <div className='flex justify-between text-gray-400'>
                            <p>Total pay</p>
                            <p>Rs. {cart?.cart?.total}</p>
                        </div>

                    </div>


                </section>

                <Divider orientation='vertical' flexItem />


                <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
                    <div>
                        <h1 className='py-10 text-2xl font-semibold text-center'>Choose Dlivery Address</h1>

                        <div className='flex flex-wrap justify-center gap-5'>
                            {
                                auth?.address?.map(item =>
                                    <AddressCard key={item} item={item} showbtn={true} />
                                )
                            }
                            <Card className='flex w-64 gap-5 p-5'>

                                <AddLocationIcon />
                                <div className='space-y-3 text-gray-500'>
                                    <h1 className='text-lg font-semibold text-white'>Add New Address</h1>
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
                                    <Grid item xs={12}> <h1 className='flex justify-center text-xl font-bold text-gray-400'>Add Address</h1></Grid>

                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            name="location"
                                            label="Location Type"
                                            fullWidth
                                            variant="outlined"
                                            helperText={<ErrorMessage name="location" />}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>

                                        <Field
                                            as={TextField}
                                            name="streetAddress"
                                            label="Address"
                                            fullWidth variant="outlined"
                                            error={!ErrorMessage("streetAddress")}


                                        >

                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            name="mobile"
                                            label="Mobile"
                                            fullWidth variant="outlined"
                                            error={!ErrorMessage("mobile")}



                                        >

                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            name="city"
                                            label="City"
                                            fullWidth variant="outlined"
                                            error={!ErrorMessage("city")}



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