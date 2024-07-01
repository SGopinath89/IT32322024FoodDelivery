import React, { useState } from 'react';
import { Box, Button, Grid, Modal, TextField } from '@mui/material';
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, getEventById } from '../../component/State/Restaurant/Action';
import EventCard from '../../component/Profile/EventCard';
import { useEffect } from 'react';

const Events = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector(store => store);

  const initialValues = {
    imageUrl: '',
    location: '',
    eventName: '',
    startDate: null,
    endDate: null
  };

  useEffect(() => {

    dispatch(getEventById(jwt, restaurant?.usersRestaurant.id))


  }, [])

  const validationSchema = Yup.object().shape({
    imageUrl: Yup.string()
      .required('Image URL is required')
      .url('Please enter a valid URL for the image'),
    location: Yup.string()
      .required('Location is required')
      .min(2, 'Location must be at least 2 characters')
      .max(100, 'Location cannot exceed 100 characters'),
    eventName: Yup.string()
      .required('Event Name is required')
      .min(2, 'Event Name must be at least 2 characters')
      .max(100, 'Event Name cannot exceed 100 characters'),
    startDate: Yup.date()
      .required('Start Date is required')
      .min(new Date(), 'Start Date must be in the future'),
    endDate: Yup.date()
      .required('End Date is required')
      .min(Yup.ref('startDate'), 'End Date must be after Start Date')
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(createEvent({ data: values, jwt, restaurantId: restaurant?.usersRestaurant?.id }));
    resetForm();
    handleClose(); // Close the dialog box
  }

  const handleDateChange = (date, dateType, setFieldValue) => {
    const formatedDate = dayjs(date).format("DD MMMM YYYY hh:mm A");
    setFieldValue(dateType, formatedDate);
  }

  const style = {
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



  return (
    <div>
      <div className='p-5'>
        <Button variant='contained' onClick={handleOpen}>Create New Event</Button>
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
              onSubmit={handleSubmit}
            >
              {({ handleChange, setFieldValue, resetForm }) => (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        name='imageUrl'
                        label='Image URL'
                        variant='outlined'
                        fullWidth
                        onChange={handleChange}
                      />
                      <ErrorMessage name="imageUrl" component="div" className="text-red-600 error-message" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name='location'
                        label='Location'
                        variant='outlined'
                        fullWidth
                        onChange={handleChange}
                      />
                      <ErrorMessage name="location" component="div" className="text-red-600 error-message" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name='eventName'
                        label='Event Name'
                        variant='outlined'
                        fullWidth
                        onChange={handleChange}
                      />
                      <ErrorMessage name="eventName" component="div" className="text-red-600 error-message" />
                    </Grid>
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker label="Start Date & Time" className='w-full'
                          value={null} // Formik handles values
                          onChange={(date) => handleDateChange(date, 'startDate', setFieldValue)}
                          renderInput={(params) => <TextField {...params} />}

                        />
                        <ErrorMessage name="startDate" component="div" className="text-red-600 error-message" />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker label="End Date & Time" className='w-full'
                          value={null} // Formik handles values
                          onChange={(date) => handleDateChange(date, 'endDate', setFieldValue)}
                          renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                        <ErrorMessage name="endDate" component="div" className="text-red-600 error-message" />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" fullWidth>
                        Create Event
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
        </Modal>
      </div>
      <div>
        {restaurant?.events.length > 0 ? (
          <div className='flex flex-wrap gap-5 px-5 py-5 mt-5'>
            {restaurant.events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className='flex items-center justify-center h-80 '>
            <p className='text-gray-500 '>No Events Available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
