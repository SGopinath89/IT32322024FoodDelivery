import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRouter from './AdminRouter'
import CustomerRouter from './CustomerRouter'

const Routers = () => {
  return (
    <div>
        <Routes>
            <Route path='/admin/restaurants/*' element={<AdminRouter/>}/>
            <Route path='/*' element={<CustomerRouter/>}/>
        </Routes>
    </div>
  )
}

export default Routers