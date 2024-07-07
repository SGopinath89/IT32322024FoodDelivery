package com.fast_food.service;

import com.fast_food.model.Category;
import com.fast_food.model.Food;
import com.fast_food.model.Restaurant;
import com.fast_food.request.CreateFoodRequest;

import java.util.List;


public interface FoodService {

    public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant);
    public void deleteFood(Long foodId) throws Exception;

    public List<Food> getRestaurantFood(Long restaurantId,
                                        boolean isVegetarian,
                                        boolean isNonVeg,
                                        boolean isSeasonal,
                                        String foodCategory
    );

    public List<Food> getRestaurantAllFood(Long restaurantId);

    List<Food> getAllFoods();

    public List<Food> searchFood(String keyword);

    public Food findFoodById(Long foodId) throws Exception;

    public Food updateAvailability(Long foodId) throws Exception ;
}
