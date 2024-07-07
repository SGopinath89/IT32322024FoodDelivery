package com.fast_food.service;

import com.fast_food.model.*;
import com.fast_food.repository.CartItemRepository;
import com.fast_food.repository.CartRepository;
import com.fast_food.request.AddCartItemRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartServiceImp implements CartService{

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private FoodService foodService;

    @Override
    public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        Food food = foodService.findFoodById(req.getFoodId());

        Cart cart = cartRepository.findByCustomerId(user.getId());
;
        for (CartItem cartItem : cart.getItem()){
            if(cartItem.getFood().equals(food)){
//                int newQty= cartItem.getQuantity()+req.getQuantity();
//                    return updateCartItemQuantity(cartItem.getId(),newQty);
                return null;
            }
        }

        CartItem newCartItem= new CartItem();
        newCartItem.setFood(food);
        newCartItem.setQuantity(req.getQuantity());
        newCartItem.setCart(cart);
        newCartItem.setTotalPrice(req.getQuantity()*food.getPrice());
        newCartItem.setIngredients(req.getIngredients());

        CartItem savedCartItem = cartItemRepository.save(newCartItem);

        cart.getItem().add(savedCartItem);
        cartRepository.save(cart);
        return savedCartItem;
    }

    @Override
    public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception {

        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);

        if(cartItemOptional.isEmpty()){
           throw new Exception("Cart item not found");
        }

        CartItem item = cartItemOptional.get();
        item.setQuantity(quantity);
        item.setTotalPrice(item.getFood().getPrice()*quantity);

        return cartItemRepository.save(item);
    }

    @Override
    public Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        Cart cart = cartRepository.findByCustomerId(user.getId());

        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);

        if(cartItemOptional.isEmpty()){
            throw new Exception("Cart item not found");
        }

        CartItem item= cartItemOptional.get();
        cart.getItem().remove(item);

        return cartRepository.save(cart);
    }

    @Override
    public Long calculateCartTotals(Cart cart) throws Exception {
        long tot=0L;

        for (CartItem cartItem : cart.getItem()){
            tot+=cartItem.getFood().getPrice()*cartItem.getQuantity();
        }
        return tot;
    }

    @Override
    public Long calculateCartTotalsByRestaurantID(Cart cart, Restaurant restaurant) throws Exception {
        long tot=0L;

        for (CartItem cartItem : cart.getItem()){
            if(cartItem.getFood().getRestaurant()==restaurant){
                tot+=cartItem.getFood().getPrice()*cartItem.getQuantity();
            }

        }
        return tot;
    }

    @Override
    public Cart findCartById(Long id) throws Exception {

        Optional<Cart> optionalCart = cartRepository.findById(id);

        if(optionalCart.isEmpty()){
            throw new Exception("Cart not found with id " + id);
        }
        return optionalCart.get();
    }

    @Override
    public Cart findCartByUserId(Long userId) throws Exception {

        Cart cart=cartRepository.findByCustomerId(userId);
        cart.setTotal(calculateCartTotals(cart));

        return cart;
    }

    @Override
    public Cart clearCart(Long userId) throws Exception {

        //User user = userService.findUserByJwtToken();
        Cart cart = findCartByUserId(userId);

        cart.getItem().clear();
        return cartRepository.save(cart);
    }
}
