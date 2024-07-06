import React, { useEffect, useState } from 'react';
import AddressCard from '../Cart/AddressCard';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { Box, Button, Card, Grid, Modal, TextField } from '@mui/material';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress } from '../State/Authentication/Action';


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

const Address = () => {
  const { auth } = useSelector(store => store);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpenAddressModal = () => setOpen(true);




  const initialValues = {
    location: '',
    streetAddress: '',
    mobile: '',
    city: '',
  };

  const validationSchema = Yup.object().shape({
    location: Yup.string().required('Location Type is required'),
    streetAddress: Yup.string().required('Street Address is required'),
    mobile: Yup.string().required('Mobile is required'),
    city: Yup.string().required('City is required'),
  });

  const handleOnSubmit = (values) => {
    const data = {
      jwt: localStorage.getItem('jwt'),
      deliveryAddress: {
        mobile: values.mobile,
        fullName: auth.user?.fullName,
        streetAddress: values.streetAddress,
        city: values.city,
        locationType: values.location,
      },
    };
    dispatch(addAddress(data))
    handleClose();
  };



  return (
    <div>
      <section className='flex justify-center px-5 pb-10 lg:pb-0 '>
        <div>
          <h1 className='py-10 text-2xl font-semibold text-center'>Address</h1>
          <div className='flex flex-wrap justify-center gap-5 pb-20'>
            {auth?.address?.map((item, index) => (
              <AddressCard key={index} item={item}  />
            ))}
            <Card className='flex w-64 gap-5 p-5'>
              <AddLocationIcon />
              <div className='space-y-3 text-gray-500'>
                <h1 className='text-lg font-semibold'>Add New Address</h1>
                <Button variant='contained' fullWidth onClick={handleOpenAddressModal}>
                  Add
                </Button>
              </div>
            </Card>
          </div>

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
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  handleOnSubmit(values);
                  setSubmitting(false);
                  resetForm();
                  handleClose();
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <h1 className='flex justify-center text-xl font-bold text-gray-400'>Add Addressssss</h1>
                      </Grid>
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
                          fullWidth
                          variant="outlined"
                          helperText={<ErrorMessage name="streetAddress" />}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          name="mobile"
                          label="Mobile"
                          fullWidth
                          variant="outlined"
                          helperText={<ErrorMessage name="mobile" />}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          name="city"
                          label="City"
                          fullWidth
                          variant="outlined"
                          helperText={<ErrorMessage name="city" />}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button fullWidth variant='contained' type='submit' color='primary' disabled={isSubmitting}>
                          {isSubmitting ? 'Adding...' : 'Add'}
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Box>
          </Modal>
        </div>
      </section>
    </div>
  );
};

export default Address;
