import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import OrderTable from './OrderTable';

const orderStatus = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" },

]



const Orders = () => {

  const [filterValue, setFilterValue] = useState("ALL");

  const handleFilter = (e, value) => {

    setFilterValue(value);

  }

  return (
    <div className='px-2 '>

      <Card className='p-5'>

        <Typography sx={{ paddingBottom: "1rem" }} variant='h5'>
          Order Status
        </Typography>

        <FormControl >
          <RadioGroup row onChange={handleFilter}

            value={filterValue}>

            {
              orderStatus.map((item) =>
                <FormControlLabel
                  key={item.label}
                  value={item.value}
                  control={<Radio />}
                  label={item.label}
                  sx={{ color: "gray" }}
                />
              )
            }
          </RadioGroup>
        </FormControl>
      </Card>
      <OrderTable status={filterValue} />
    </div>
  )
}

export default Orders