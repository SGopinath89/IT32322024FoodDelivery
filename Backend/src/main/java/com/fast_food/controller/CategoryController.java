package com.fast_food.controller;

import com.fast_food.model.Category;
import com.fast_food.model.User;
import com.fast_food.service.CategoryService;
import com.fast_food.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    @PostMapping("/admin/category")
    public ResponseEntity<Category> createCategory(
          @RequestBody Category category,
          @RequestHeader("Authorization") String jwt
  ) throws Exception {

      User user = userService.findUserByJwtToken(jwt);

      Category createCategory = categoryService.createCategory(category.getName(),user.getId());

      return new ResponseEntity<>(createCategory, HttpStatus.CREATED);

  }

    @GetMapping("/category/restaurant/{id}")
    public ResponseEntity<List<Category>> getRestaurantCategory(
            @PathVariable Long id,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        List<Category> categories = categoryService.findCategoryByRestaurantId(id);

        return new ResponseEntity<>(categories, HttpStatus.CREATED);

    }
}
