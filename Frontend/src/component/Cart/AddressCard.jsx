import { Button, Card } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import React from 'react'


const AddressCard = ({ item }) => {


    return (

        <Card className='flex gap-5 w-64 p-5'>


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
                    <Button variant='outlined' fullWidth >Select</Button>
                </div>

            </div>
        </Card>

    )
}

export default AddressCard