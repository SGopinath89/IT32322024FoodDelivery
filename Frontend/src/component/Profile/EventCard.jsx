import React from 'react'
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const EventCard = () => {
    return (
        <div>
            <Card sx={{ width: 345 }}>
                <CardMedia image='https://img.freepik.com/free-photo/front-view-male-courier-mask-with-delivery-coffee-box-yellow-service-covid-pandemic-color-virus-job-work-uniform_179666-22301.jpg?t=st=1714929389~exp=1714932989~hmac=96dfc2ff43bb10b2ded0d1e76e7503bee42b7460d307dce442e10db2ba4f3867&w=1060'
                    sx={{ height: 345 }}
                />
                <CardContent>
                    <Typography variant='h5'>
                        Vanni Fast Food Festival
                    </Typography>
                    <Typography variant='body'>
                        50% off on your first order
                    </Typography>
                    <div className='py-2 space-y-2'>
                        <p>{"Mumbai"}</p>
                        <p className='text-sm text-blue-600'>Febuary 14, 2024 12.00 AM</p>
                        <p className='text-sm text-red-600'>Febuary 14, 2024 12.00 PM</p>
                    </div>
                </CardContent>
                <CardActions>
                    <IconButton>
                        <DeleteIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    )
}

export default EventCard