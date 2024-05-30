import { Box, Button, Grid, Modal, TextField } from '@mui/material';
import React, { useState } from 'react';
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useDispatch, useSelector } from 'react-redux';
import { creatEvent } from '../../component/State/Restaurant/Action';

const Events = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, restaurantOrder } = useSelector(store => store);

  const [formdata, setFormdata] = useState({
    imageUrl: '',
    location: '',
    name: '',
    startedAt: null,
    endsAt: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(creatEvent({ data: formdata, jwt, restaurantId: restaurant?.usersRestaurant?.id }));
    setFormdata({});
  }

  const handleInputChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  }

  const handleDateChange = (date, dateType) => {
    const formatedDate = dayjs(date).format("MMMM DD,YYYY hh:mm A");
    setFormdata({ ...formdata, [dateType]: formatedDate });

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
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    name='imageUrl'
                    label='Image URL'
                    variant='outlined'
                    fullWidth
                    value={formdata.imageUrl}
                    onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name='location'
                    label='Location'
                    variant='outlined'
                    fullWidth
                    value={formdata.location}
                    onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name='name'
                    label='Event Name'
                    variant='outlined'
                    fullWidth
                    value={formdata.name}
                    onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                      <DateTimePicker label="Start Date & Time"
                        value={formdata.startedAt}
                        onChange={(date) => handleDateChange(date, 'startedAt')}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                      <DateTimePicker label="End Date & Time"
                        value={formdata.endsAt}
                        onChange={(date) => handleDateChange(date, 'endsAt')}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth>
                    Create Event
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Events;
