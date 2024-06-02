import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { CircularProgress, Grid, IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { uploadImageToCloudinary } from '../util/UploadToCloudinary';
import { useDispatch, useSelector } from 'react-redux';
import { createRestaurant } from '../../component/State/Restaurant/Action';

// const initialValues = {
//   name: "",
//   description: "",
//   cuisineType: "",
//   streetAddress: "",
//   city: "",
//   stateProvince: "",
//   postalCode: "",
//   country: "",
//   email: "",
//   mobile: "",
//   facebook: "",
//   instagram: "",
//   openingHours: "Mon-Sun : 9.00 AM : 12.00 PM",
//   images: []
// };

const initialValues = {
  name: "My Restaurant",
  description: "Welcome to My Restaurant! We serve delicious food with a smile.",
  cuisineType: "Italian",
  streetAddress: "123 Main Street",
  city: "Cityville",
  stateProvince: "Stateville",
  postalCode: "12345",
  country: "Countryland",
  email: "info@myrestaurant.com",
  mobile: "123-456-7890",
  facebook: "https://www.facebook.com/myrestaurant",
  instagram: "https://www.instagram.com/myrestaurant",
  openingHours: "Mon-Sun : 9.00 AM : 12.00 PM",
  images: []
};


const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  cuisineType: Yup.string().required("Cuisine type is required"),
  streetAddress: Yup.string().required("Street address is required"),
  city: Yup.string().required("City is required"),
  stateProvince: Yup.string().required("State/Province is required"),
  postalCode: Yup.string().required("Postal code is required"),
  country: Yup.string().required("Country is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  mobile: Yup.string().required("Mobile number is required"),
  facebook: Yup.string().url("Invalid URL format"),
  instagram: Yup.string().url("Invalid URL format"),
  openingHours: Yup.string().required("Opening hours are required")
});

const CreateRestaurantForm = () => {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [uploadImage, setUploadImage] = useState(false);

  const { auth } = useSelector(store => store);



  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {

      const data = {
        name: values.name,
        description: values.description,
        cuisineType: values.cuisineType,
        address: {
          streetAddress: values.streetAddress,
          city: values.city,
          stateProvince: values.stateProvince,
          postalCode: values.postalCode,
          country: values.country,
        },
        contactInformation
          : {
          email: values.email,
          mobile: values.mobile,
          facebook: values.facebook,
          instagram: values.instagram,
        },
        openingHours: values.openingHours,
        images: values.images, // Assuming you want to include uploaded images
      };

      console.log(jwt);
      dispatch(createRestaurant({ data, token: jwt }));
    }


  });

  const handleImageChange = async (e) => {

    const file = e.target.files[0];
    setUploadImage(true);

    const image = await uploadImageToCloudinary(file);

    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);


  };

  const handleRemoveImage = (index) => {

    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);

  };

  return (
    <div className='py-10 px-2 lg:flex items-center justify-center min-h-screen'>
      <div className='lg:max-w-4xl'>
        <h1 className='font-bold text-2xl text-center py-2'>
          Add New Restaurant
        </h1>

        <form onSubmit={formik.handleSubmit} className='space-y-4'>
          <Grid container spacing={2}>
            <Grid item xs={12} className='flex flex-wrap gap-5'>
              <input
                type='file'
                name='image'
                id='fileInput'
                style={{ display: "none" }}
                onChange={handleImageChange}
                accept='image/*'
              />
              <label className='relative' htmlFor="fileInput">
                <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600'>
                  <AddPhotoAlternateIcon className='text-gray-600' />
                </span>
                {uploadImage && (
                  <div className='absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center'>
                    <CircularProgress />
                  </div>
                )}
              </label>

              <div className='flex flex-wrap gap-2'>
                {formik.values?.images?.map((image, index) => (
                  <div key={index} className='relative'>
                    <img
                      className='w-24 h-24 object-cover'
                      src={image}

                    />
                    <IconButton
                      size='small'
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        outline: 'none'
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <CloseIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='name'
                name='name'
                label='Name'
                variant='outlined'
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='description'
                name='description'
                label='Description'
                variant='outlined'
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='cuisineType'
                name='cuisineType'
                label='Cuisine Type'
                variant='outlined'
                value={formik.values.cuisineType}
                onChange={formik.handleChange}
                error={formik.touched.cuisineType && Boolean(formik.errors.cuisineType)}
                helperText={formik.touched.cuisineType && formik.errors.cuisineType}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='streetAddress'
                name='streetAddress'
                label='Street Address'
                variant='outlined'
                value={formik.values.streetAddress}
                onChange={formik.handleChange}
                error={formik.touched.streetAddress && Boolean(formik.errors.streetAddress)}
                helperText={formik.touched.streetAddress && formik.errors.streetAddress}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id='city'
                name='city'
                label='City'
                variant='outlined'
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id='stateProvince'
                name='stateProvince'
                label='State/Province'
                variant='outlined'
                value={formik.values.stateProvince}
                onChange={formik.handleChange}
                error={formik.touched.stateProvince && Boolean(formik.errors.stateProvince)}
                helperText={formik.touched.stateProvince && formik.errors.stateProvince}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id='postalCode'
                name='postalCode'
                label='Postal Code'
                variant='outlined'
                value={formik.values.postalCode}
                onChange={formik.handleChange}
                error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
                helperText={formik.touched.postalCode && formik.errors.postalCode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='country'
                name='country'
                label='Country'
                variant='outlined'
                value={formik.values.country}
                onChange={formik.handleChange}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='email'
                name='email'
                label='Email'
                variant='outlined'
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='mobile'
                name='mobile'
                label='Mobile'
                variant='outlined'
                value={formik.values.mobile}
                onChange={formik.handleChange}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='facebook'
                name='facebook'
                label='Facebook'
                variant='outlined'
                value={formik.values.facebook}
                onChange={formik.handleChange}
                error={formik.touched.facebook && Boolean(formik.errors.facebook)}
                helperText={formik.touched.facebook && formik.errors.facebook}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='instagram'
                name='instagram'
                label='Instagram'
                variant='outlined'
                value={formik.values.instagram}
                onChange={formik.handleChange}
                error={formik.touched.instagram && Boolean(formik.errors.instagram)}
                helperText={formik.touched.instagram && formik.errors.instagram}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='openingHours'
                name='openingHours'
                label='Opening Hours'
                variant='outlined'
                value={formik.values.openingHours}
                onChange={formik.handleChange}
                error={formik.touched.openingHours && Boolean(formik.errors.openingHours)}
                helperText={formik.touched.openingHours && formik.errors.openingHours}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' color='primary'>
                Create Restaurant
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default CreateRestaurantForm;
