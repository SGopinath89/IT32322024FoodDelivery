import { ThemeProvider } from '@emotion/react'
import './App.css'
import { CssBaseline } from '@mui/material'
import { darkTheam } from './Theam/DarkTheam'
import CustomerRouter from './Routers/CustomerRouter'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './component/State/Authentication/Action'
import { findCart } from './component/State/Cart/Action'





function App() {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);


  //render user profile
  useEffect(() => {

    dispatch(getUser(auth.jwt || jwt));
    dispatch(findCart(jwt));
    
  }, [auth.jwt])


  return (
    <ThemeProvider theme={darkTheam}>
      <CssBaseline />
      <CustomerRouter />
    </ThemeProvider>
  )
}

export default App
