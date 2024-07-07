package com.fast_food.controller;

import com.fast_food.model.Cart;
import com.fast_food.model.CartItem;
import com.fast_food.model.Order;
import com.fast_food.model.User;
import com.fast_food.repository.CartRepository;
import com.fast_food.request.AddCartItemRequest;
import com.fast_food.request.OrderRequest;
import com.fast_food.response.PaymentResponse;
import com.fast_food.service.CartService;
import com.fast_food.service.OrderService;
import com.fast_food.service.PaymentService;
import com.fast_food.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    PaymentService paymentService;



    @PostMapping("/order/payment")
    public ResponseEntity<PaymentResponse> createPaymentLink(
            @RequestBody OrderRequest orderRequest,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        PaymentResponse paymentResponse=paymentService.createPaymentLink(orderRequest);

        return new ResponseEntity<>(paymentResponse, HttpStatus.CREATED);
    }

    @PostMapping("/order/create")
    public ResponseEntity<Order> createOrder(
            @RequestBody OrderRequest req,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        Order order = orderService.createOrder(req,user);

        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    @GetMapping("/order/user")
    public ResponseEntity<List<Order>> getOrderHistory (
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        List<Order> orders = orderService.getUsersOrder(user.getId());

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}