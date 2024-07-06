import { ThemeProvider } from '@emotion/react'
import './App.css'
import { CssBaseline } from '@mui/material'
import { darkTheam } from './Theam/DarkTheam'
import CustomerRouter from './Routers/CustomerRouter'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './component/State/Authentication/Action'
import { findCart } from './component/State/Cart/Action'
import { getAllEvents, getAllFoods, getAllRestaurantAction, getRestaurantByUserId } from './component/State/Restaurant/Action'
import Routers from './Routers/Routers'





function App() {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);


  //render user profile
  useEffect(() => {

    dispatch(getUser(auth.jwt || jwt));
    dispatch(getRestaurantByUserId(auth.jwt || jwt));
    dispatch(findCart(jwt));
    dispatch(getAllEvents(auth.jwt || jwt));
    dispatch(getAllRestaurantAction());
    dispatch(getAllFoods());
    
  }, [auth.jwt, jwt])



  return (
    <ThemeProvider theme={darkTheam}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  )
}

export default App
