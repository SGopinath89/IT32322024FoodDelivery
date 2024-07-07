package com.fast_food.service;

import com.fast_food.model.Category;
import com.fast_food.model.Food;
import com.fast_food.model.Restaurant;
import com.fast_food.repository.FoodRepository;
import com.fast_food.repository.RestaurantRepository;
import com.fast_food.request.CreateFoodRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FoodServiceImp implements FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    RestaurantRepository restaurantRepository;
    @Override
    public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant) {

        Food food =new Food();

        food.setFoodCategory(category);
        food.setRestaurant(restaurant);
        food.setDescription(req.getDescription());
        food.setImages(req.getImages());
        food.setName(req.getName());
        food.setPrice(req.getPrice());
        food.setIngredients(req.getIngredients());
        food.setSeasonal(req.isSeasonal());
        food.setCreationDate(new Date());
        food.setVegetarian(req.isVegetarian());
        food.setAvailable(true);//created food first it have stock
        Food savedFood= foodRepository.save(food);
        restaurant.getFoods().add(savedFood);
        restaurantRepository.save(restaurant);
        return savedFood;
    }

    @Override
    public void deleteFood(Long foodId) throws Exception {

        Food food = findFoodById(foodId);
        food.setRestaurant(null);
        foodRepository.save(food);

    }

    @Override
    public List<Food> getRestaurantFood(Long restaurantId,
                                        boolean isVegetarian,
                                        boolean isNonVeg,
                                        boolean isSeasonal,
                                        String foodCategory)
    {

        List<Food> foods =foodRepository.findByRestaurantId(restaurantId);
        
        if(isVegetarian){
            foods=filterByVeg(foods);
        }
        if(isNonVeg){
            foods=filterByNonVeg(foods);
        }
        if(isSeasonal){
            foods=filterBySeasonal(foods);
        }

        if(foodCategory.equals("All")){
            return foods;
        }
        else if(!foodCategory.isEmpty()){
            foods=filterByFoodCategory(foods,foodCategory);
        }

        return foods;
    }

    @Override
    public List<Food> getRestaurantAllFood(Long restaurantId) {
        return foodRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    private List<Food> filterByFoodCategory(List<Food> foods, String foodCategory) {

        return foods.stream().filter(food -> {
            if (food.getFoodCategory()!=null){
                return food.getFoodCategory().getName().equals(foodCategory);
            }
            return false;
        }).collect(Collectors.toList());
    }

    private List<Food> filterBySeasonal(List<Food> foods) {
        return foods.stream().filter(Food::isSeasonal).collect(Collectors.toList());
    }

    private List<Food> filterByNonVeg(List<Food> foods) {
        return foods.stream().filter(food -> !food.isVegetarian()).collect(Collectors.toList());
    }

    private List<Food> filterByVeg(List<Food> foods) {
        return foods.stream().filter(Food::isVegetarian).collect(Collectors.toList());
    }


    @Override
    public List<Food> searchFood(String keyword) {

        return foodRepository.searchfood(keyword);
    }

    @Override
    public Food findFoodById(Long foodId) throws Exception {

        Optional <Food> food= foodRepository.findById(foodId);

        if(food.isEmpty()){
            throw new Exception("Food not exist..");
        }
        return food.get();
    }

    @Override
    public Food updateAvailability(Long foodId) throws Exception {

        Food food = findFoodById(foodId);
        food.setAvailable(!food.isAvailable());

       return foodRepository.save(food);

    }
}
