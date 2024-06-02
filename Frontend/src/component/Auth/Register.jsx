import React, { useEffect } from 'react'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../State/Authentication/Action';

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER"
}


const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnSubmit = (values) => {

    dispatch(registerUser({ userData: values, navigate }));
  }

  useEffect(() => {
    if (localStorage.getItem("jwt")) {

      dispatch(logout());
    }
  }, [])


  return (
    <div >

      <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
        <Form>
          <Grid container spacing={2}>
            <Grid className='flex justify-center text-2xl font-semibold'
              item xs={12}>Register</Grid>

            <Grid item xs={12}>
              <Field
                as={TextField}
                name="fullName"
                label="Full Name"
                fullWidth
                variant="outlined"

              >

              </Field>
            </Grid>

            <Grid item xs={12}>
              <Field
                as={TextField}
                name="email"
                label="Email"
                fullWidth
                variant="outlined"

              >

              </Field>
            </Grid>

            <Grid item xs={12}>
              <Field
                as={TextField}
                name="password"
                label="Password"
                fullWidth
                variant="outlined"

                type="password"
              >

              </Field>
            </Grid>

            <Grid item xs={12}>


              <Field as={Select}
                fullWidth
                labelId="role-simple-select-label"
                id="role -simple-select"
                name="role"
              // value={age}

              // onChange={handleChange}
              >
                <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
                <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>

              </Field>

            </Grid>

            <Grid item xs={12}>
              <Button sx={{ mt: 2, padding: "1rem" }} variant='contained' type='submit' color='primary' fullWidth>Register</Button>
            </Grid>
          </Grid>

        </Form>
      </Formik>

      <Typography variant='body2' align='center' sx={{ mt: 3 }}>
        Already have acccount?
        <Button sx={{ color: 'blue' }} onClick={() => navigate("/account/login")}>Login</Button>
      </Typography>
    </div>
  )
}

export default Register