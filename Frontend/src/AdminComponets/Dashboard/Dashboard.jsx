import { Grid } from '@mui/material'
import React from 'react'
import MenuTable from '../Menu/MenuTable'
import OrderTable from '../Orders/OrderTable'

const RestaurantDashboard = () => {
  return (
    <div>
      <Grid container >
        <Grid item xs={12} lg={12}>
          <MenuTable />
        </Grid>
        <Grid item xs={12} lg={12}>
          <OrderTable status={"ALL"} />
        </Grid>
      </Grid>
    </div>
  )
}

export default RestaurantDashboard