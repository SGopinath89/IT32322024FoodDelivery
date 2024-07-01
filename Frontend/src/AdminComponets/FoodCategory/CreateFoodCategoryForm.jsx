import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { creatCategoryAction } from '../../component/State/Restaurant/Action';

const CreateFoodCategoryForm = ({handleClose}) => {

    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        categoryName: "",
        restaurantId: "" // Consider how to obtain restaurantId dynamically
    });
    const [categoryNameError, setCategoryNameError] = useState(false); // State to track the error

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.categoryName.trim()) {
            const data = {
                name: formData.categoryName,
                restaurantId: formData.restaurantId // Assuming restaurantId is dynamic
            };
            dispatch(creatCategoryAction({ jwt: localStorage.getItem("jwt"), reqData: data }));
            setCategoryNameError(false); // Reset the error state if categoryName is not empty
            handleClose();
        } else {
            setCategoryNameError(true); // Set the error state if categoryName is empty
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className=''>
            <div className='p-5'>
                <h1 className='pb-10 text-xl text-center text-gray-400'>Create Category</h1>
                <form className='space-y-5 ' onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        id='categoryName'
                        name='categoryName'
                        label='Category Name'
                        variant='outlined'
                        value={formData.categoryName}
                        onChange={handleInputChange}
                        error={categoryNameError} // Set error state on TextField
                    />
                    {categoryNameError && ( // Render error message if categoryNameError is true
                        <Typography variant="body2" color="error">
                            Category name is required.
                        </Typography>
                    )}
                    <Button variant='contained' type='submit'>
                        Create Category
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateFoodCategoryForm;
