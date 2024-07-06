import React, { useEffect } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup'; // Import Yup for validation schema
import { registerUser, logout } from '../State/Authentication/Action'; // Import logout action

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER"
};

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name required'),
  email: Yup.string().email('Invalid email').required('Email required'),
  password: Yup.string()
    .required('Password required.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnSubmit = (values) => {
    dispatch(registerUser({ userData: values, navigate }));
  };

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleOnSubmit} validationSchema={SignupSchema}>
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} className="flex justify-center text-2xl font-semibold">
                Register
              </Grid>

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="fullName"
                  label="Full Name"
                  fullWidth
                  variant="outlined"
                  error={touched.fullName && !!errors.fullName}
                  helperText={touched.fullName && errors.fullName}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  fullWidth
                  variant="outlined"
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="password"
                  label="Password"
                  fullWidth
                  variant="outlined"
                  type="password"
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="role-simple-select-label">Role</InputLabel>
                  <Field
                    as={Select}
                    labelId="role-simple-select-label"
                    id="role-simple-select"
                    name="role"
                    label="Role"
                  >
                    <MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
                    <MenuItem value="ROLE_RESTAURANT_OWNER">Restaurant Owner</MenuItem>
                  </Field>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button sx={{ mt: 2, padding: "1rem" }} variant="contained" type="submit" color="primary" fullWidth>
                  Register
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Already have an account?{" "}
        <Button sx={{ color: 'blue' }} onClick={() => navigate("/account/login")}>
          Login
        </Button>
      </Typography>
    </div>
  );
};

export default Register;
