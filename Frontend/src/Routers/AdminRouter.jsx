import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import CreateRestaurantForm from '../AdminComponets/CreateAdminRestuarnt/CreateRestaurantForm'
import Admin from '../AdminComponets/Admin/Admin'
import { useSelector } from 'react-redux'



const AdminRouter = () => {

  const { restaurant, auth } = useSelector((store) => store);

  const navigate = useNavigate();

  return (
    <div>
      <Routes>
        <Route>
          <Route path='/*' element={restaurant?.usersRestaurant ? <Admin /> : (<CreateRestaurantForm /> )} />
        </Route>
      </Routes>
    </div>
  )
}

export default AdminRouter