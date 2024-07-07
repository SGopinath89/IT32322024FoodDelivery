package com.fast_food.controller;

import com.fast_food.model.IngredientCategory;
import com.fast_food.model.IngredientsItem;
import com.fast_food.request.IngredientCategoryRequest;
import com.fast_food.request.IngredientRequest;
import com.fast_food.service.IngredientsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/admin/ingredients")
public class IngredientController {

    @Autowired
    private IngredientsService ingredientsService;

    @PostMapping("/category")
    public ResponseEntity<IngredientCategory> createIngredientCategory(
            @RequestBody IngredientCategoryRequest req
            ) throws Exception {

        IngredientCategory category = ingredientsService.createIngredientCategory(req.getName(),req.getRestaurantId());

        return new ResponseEntity<>(category, HttpStatus.CREATED);
    }

    @PostMapping()
    public ResponseEntity<IngredientsItem> createIngredientItem(
            @RequestBody IngredientRequest req
    ) throws Exception {

        IngredientsItem item = ingredientsService.createIngredientItem(req.getRestaurantId(),req.getName(),req.getCategoryId());

        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/stock")
    public ResponseEntity<IngredientsItem> updateIngredientStock(
            @PathVariable Long id
    ) throws Exception {

        IngredientsItem item = ingredientsService.updateStock(id);

        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @GetMapping("/restaurant/{id}")
    public ResponseEntity<List<IngredientsItem>> getRestaurantIngredient(
            @PathVariable Long id
    ) throws Exception {

        List<IngredientsItem> items= ingredientsService.findRestaurantsIngredients(id);

        return new ResponseEntity<>(items , HttpStatus.OK);
    }

    @GetMapping("/restaurant/{id}/category")
    public ResponseEntity<List<IngredientCategory>> getRestaurantIngredientCategory(
            @PathVariable Long id
    ) throws Exception {

        List<IngredientCategory> items= ingredientsService.findIngredientCategoryByRestaurantId(id);

        return new ResponseEntity<>(items , HttpStatus.OK);
    }

}
