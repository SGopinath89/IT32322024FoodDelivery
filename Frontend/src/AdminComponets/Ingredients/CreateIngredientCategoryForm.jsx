import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createIngredientategory } from '../../component/State/Ingredients/Action';

const CreateIngredientCategoryForm = ({ handleClose }) => {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector(store => store);

  const [formData, setFormData] = useState({
    name: "",
    ingredientCategoryId: ""
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

   
    if (!formData.name.trim()) {
      setError("Please enter Ingredient Category Name");
      return;
    }else{
      handleClose();
    }

    const data = {
      name: formData.name,
      restaurantId: restaurant?.usersRestaurant?.id

    };

    dispatch(createIngredientategory({ jwt, data: data }));
    setError("");
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  return (
    <div className=''>
      <div className='p-5'>
        <h1 className='pb-10 text-xl text-center text-gray-400'>Create Ingredient Category</h1>
        <form className='space-y-5 ' onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id='categoryName'
            name='name'
            label='Ingredient Category Name'
            variant='outlined'
            value={formData.name}
            onChange={handleInputChange}
            error={!!error} // Setting error state to TextField
            helperText={error} // Error message
          />
          <Button variant='contained' type='submit'>
            Create Ingredient Category
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateIngredientCategoryForm;
