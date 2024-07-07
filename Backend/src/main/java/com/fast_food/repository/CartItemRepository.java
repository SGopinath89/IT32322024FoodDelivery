package com.fast_food.repository;

import com.fast_food.model.Cart;
import com.fast_food.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem ,Long> {


}
