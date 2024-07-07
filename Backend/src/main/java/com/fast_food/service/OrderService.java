package com.fast_food.service;

import com.fast_food.model.Order;
import com.fast_food.model.User;
import com.fast_food.request.OrderRequest;

import java.util.List;

public interface OrderService {



    public Order createOrder(OrderRequest order, User user) throws Exception;

    public Order updateOrder(Long orderId,String orderStatus) throws Exception;

    public void cancelOrder(Long orderID) throws Exception;

    public List<Order> getUsersOrder(Long userId) throws Exception;

    public List<Order> getRestaurantsOrder(Long restaurantId,String orderStatus) throws Exception;

    public Order findOrderById(Long id) throws Exception;
}