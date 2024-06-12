package com.fast_food.service;

import com.fast_food.model.Order;
import com.fast_food.response.PaymentResponse;

public interface PaymentService {

    public PaymentResponse createPaymentLink(Order order);
}
