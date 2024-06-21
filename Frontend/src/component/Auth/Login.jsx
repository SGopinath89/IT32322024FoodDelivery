import { Button, Grid, TextField, Typography } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { loginUser, logout } from '../State/Authentication/Action.jsx';
import { getAllRestaurantAction, getRestaurantByUserId } from '../State/Restaurant/Action.jsx';
import { useEffect } from 'react';


const initialValues = {
  email: "",
  password: ""
}


const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      
     dispatch(logout());
    }
  }, [])


  const handleOnSubmit = (values) => {
    
  
    dispatch(loginUser({ userData: values, navigate }));

  }



  return (
    <div >

      <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
        <Form>

          <Grid container spacing={2}>
            <Grid className='flex justify-center text-2xl font-semibold' fullWidth item xs={12}>Login</Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="email"
                label="Email"
                fullWidth variant="outlined"
                error={!ErrorMessage("email")}
              >

              </Field>
            </Grid>

            <Grid item xs={12}>
              <Field
                as={TextField}
                name="password"
                label="Passworrd"
                fullWidth variant="outlined"
                error={!ErrorMessage("password")}
                type="password"
              >

              </Field>
            </Grid>

            <Grid item xs={12}>
              <Button sx={{ mt: 2, padding: "1rem" }} fullWidth variant='contained' type='submit' color='primary' className=''>Login</Button>
            </Grid>
          </Grid>

        </Form>
      </Formik>

      <Typography variant='body2' align='center' sx={{ mt: 3 }}>
        Don't have acccount?
        <Button sx={{ color: 'blue' }} onClick={() => navigate("/account/register")}>Register</Button>
      </Typography>
    </div>
  )
}

export default Login