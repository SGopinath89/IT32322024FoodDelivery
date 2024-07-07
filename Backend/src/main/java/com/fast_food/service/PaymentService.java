package com.fast_food.service;

import com.fast_food.model.Order;
import com.fast_food.request.OrderRequest;
import com.fast_food.response.PaymentResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {

    public PaymentResponse createPaymentLink(OrderRequest orderRequest) throws Exception;
//    public boolean isPaymentSuccessful(String sessionId) throws Exception;
}
