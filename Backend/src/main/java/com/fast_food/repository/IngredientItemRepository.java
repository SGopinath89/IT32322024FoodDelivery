package com.fast_food.repository;

import com.fast_food.model.IngredientsItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientItemRepository extends JpaRepository<IngredientsItem,Long> {


    List<IngredientsItem> findByRestaurantId(Long restaurantId);
}
