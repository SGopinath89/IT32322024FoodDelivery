import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { CircularProgress, Grid, IconButton, TextField, Button, FormControl, InputLabel, Select, Box, Chip, OutlinedInput, MenuItem, FormHelperText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { uploadImageToCloudinary } from '../util/UploadToCloudinary';
import { useDispatch, useSelector } from 'react-redux';
import { createMenuItem } from '../../component/State/Menu/Action';
import { getIngredientsOfRestaurant } from '../../component/State/Ingredients/Action';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const initialValues = {
    name: "",
    description: "",    
    price:null,
    category: null,
    restaurantId: "",
    vegetarian: true,
    seasonal: false,
    ingredients: [],
    images: []
};

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
    category: Yup.object().required("Category is required"),
    ingredients: Yup.array().required("Ingredients are required"),
});

const CreateMenuForm = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant, ingredient } = useSelector(store => store);
    console.log(restaurant)
    const navigate=useNavigate();
    useEffect(() => {
        
        
        if (restaurant?.usersRestaurant?.id) {
            dispatch(getIngredientsOfRestaurant({
                id: restaurant.usersRestaurant.id,
                jwt
            }));
        }
        
        if(restaurant?.categories?.length<0){
            Swal.fire({
                title: "Resturant category empty",
               
                icon: "question"
              });
            navigate('/admin/restaurants/category');
        }
    }, [dispatch, jwt, restaurant?.usersRestaurant?.id]);

    const [uploadImage, setUploadImage] = useState(false);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            values.restaurantId = restaurant.usersRestaurant.id;
            dispatch(createMenuItem({ menu: values, jwt }));

        navigate('/admin/restaurants/menu');
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

    const handleIngredientChange = (event) => {
        const { value } = event.target;
        formik.setFieldValue('ingredients', typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <div className='items-center justify-center min-h-screen px-2 py-10 lg:flex'>
            <div className='lg:max-w-4xl'>
                <h1 className='py-2 text-2xl font-bold text-center'>
                    Add New Menu
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
                                <span className='flex items-center justify-center w-24 h-24 p-3 border border-gray-600 rounded-md cursor-pointer'>
                                    <AddPhotoAlternateIcon className='text-gray-600' />
                                </span>
                                {uploadImage && (
                                    <div className='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center'>
                                        <CircularProgress />
                                    </div>
                                )}
                            </label>

                            <div className='flex flex-wrap gap-2'>
                                {formik.values?.images?.map((image, index) => (
                                    <div key={index} className='relative'>
                                        <img
                                            className='object-cover w-24 h-24'
                                            src={image}
                                            alt={`Uploaded Image ${index}`}
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

                        <Grid item sm={12}>
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
                        <Grid item sm={12}>
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
                                id='price'
                                name='price'
                                label='Price'
                                variant='outlined'
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                error={formik.touched.price && Boolean(formik.errors.price)}
                                helperText={formik.touched.price && formik.errors.price}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined" error={formik.touched.category && Boolean(formik.errors.category)}>
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    id="category"
                                    name="category"
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                    label="Category"
                                >
                                    {restaurant?.categories?.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {formik.touched.category && formik.errors.category && (
                                    <FormHelperText>{formik.errors.category}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item sm={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-multiple-chip-label">Ingredients</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={formik.values.ingredients}
                                    onChange={handleIngredientChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Ingredients" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value.name} />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {ingredient?.ingredients?.map((item) => (
                                        <MenuItem key={item.id} value={item}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {formik.touched.ingredients && formik.errors.ingredients && (
                                    <FormHelperText>{formik.errors.ingredients}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined" error={formik.touched.vegetarian && Boolean(formik.errors.vegetarian)}>
                                <InputLabel id="is-veg">Is Vegetarian</InputLabel>
                                <Select
                                    labelId="is-veg"
                                    id="vegetarian"
                                    name="vegetarian"
                                    value={formik.values.vegetarian}
                                    onChange={formik.handleChange}
                                    label="Is Vegetarian"
                                >
                                    {[{ label: "Yes", value: true }, { label: "No", value: false }].map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {formik.touched.vegetarian && formik.errors.vegetarian && (
                                    <FormHelperText>{formik.errors.vegetarian}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined" error={formik.touched.seasonal && Boolean(formik.errors.seasonal)}>
                                <InputLabel id="is-seasonal">Is Seasonal</InputLabel>
                                <Select
                                    labelId="is-seasonal"
                                    id="seasonal"
                                    name="seasonal"
                                    value={formik.values.seasonal}
                                    onChange={formik.handleChange}
                                    label="Is Seasonal"
                                >
                                    {[{ label: "Yes", value: true }, { label: "No", value: false }].map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {formik.touched.seasonal && formik.errors.seasonal && (
                                    <FormHelperText>{formik.errors.seasonal}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid item sm={6}>
                            <Button
                                color='primary'
                                variant='contained'
                                fullWidth
                                type='submit'
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    );
};

export default CreateMenuForm;
