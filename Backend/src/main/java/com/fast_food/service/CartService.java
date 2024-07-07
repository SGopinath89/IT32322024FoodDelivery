package com.fast_food.service;

import com.fast_food.model.Cart;
import com.fast_food.model.CartItem;
import com.fast_food.model.Restaurant;
import com.fast_food.request.AddCartItemRequest;
import org.springframework.stereotype.Service;


public interface CartService {

    public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws Exception;

    public CartItem updateCartItemQuantity(Long cartItemId,int quantity) throws Exception;

    public Cart removeItemFromCart(Long cartItemId,String jwt) throws Exception;

    public Long calculateCartTotals(Cart cart) throws Exception;

    Long calculateCartTotalsByRestaurantID(Cart cart, Restaurant restaurant) throws Exception;

    public Cart findCartById(Long id) throws Exception;

    public Cart findCartByUserId(Long userId) throws Exception;

    public Cart clearCart(Long userId) throws Exception;
}
