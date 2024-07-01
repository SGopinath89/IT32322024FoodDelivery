import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { createIngredient} from '../../component/State/Ingredients/Action';

const CreateIngredientForm = ({handleClose}) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const { ingredient, restaurant } = useSelector(store => store);

  const [formData, setFormData] = useState({
    name: '',
    ingredientCategoryId: ''
  });
  const [errors, setErrors] = useState({
    name: false,
    ingredientCategoryId: false
  });

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: true
      }));
      return;
    }
    if (!formData.ingredientCategoryId) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ingredientCategoryId: true
      }));
      return;
    }

    // Reset errors if everything is fine
    setErrors({
      name: false,
      ingredientCategoryId: false
    });

    const data = {
      name: formData.name,
      categoryId: formData.ingredientCategoryId,
      restaurantId: restaurant?.usersRestaurant?.id
    };

    dispatch(createIngredient({ jwt, data }));
    handleClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="">
      <div className="p-5">
        <h1 className="pb-10 text-xl text-center text-gray-400">Create Ingredient</h1>
        <form className="space-y-5 " onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="ingredient"
            name="name"
            label="Ingredient"
            variant="outlined"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
            helperText={errors.name ? 'Ingredient name is required' : ''}
          />

          <FormControl fullWidth variant="outlined" error={errors.ingredientCategoryId}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="ingredientCategoryId"
              value={formData.ingredientCategoryId}
              onChange={handleInputChange}
              label="Category"
            >
              {ingredient?.category?.map((option) => (
                <MenuItem key={option} value={option.id}>
                  {option.name || 'Select Category'}
                </MenuItem>
              ))}
            </Select>
            {errors.ingredientCategoryId && <FormHelperText>Category is required</FormHelperText>}
          </FormControl>

          <Button variant="contained" type="submit">
            Create Ingredient
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientForm;
