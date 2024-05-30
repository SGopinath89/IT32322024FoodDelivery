import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateRestaurantForm from '../AdminComponets/CreateAdminRestuarnt/CreateRestaurantForm'
import Admin from '../AdminComponets/Admin/Admin'
import { useSelector } from 'react-redux'

const AdminRouter = () => {

  const { restaurant } = useSelector((store) => store);

  return (
    <div>
      <Routes>
        <Route>
          <Route path='/*' element={!restaurant?.usersRestaurant ? <CreateRestaurantForm /> : <Admin />} />
        </Route>
      </Routes>
    </div>
  )
}

export default AdminRouter