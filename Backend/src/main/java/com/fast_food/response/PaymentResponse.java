package com.fast_food.response;

import com.fast_food.model.Address;
import com.fast_food.request.OrderRequest;
import lombok.Data;
import org.springframework.stereotype.Component;


@Data
public class PaymentResponse {

    private String paymentUrl;
    private boolean paymentSuccess;
    private Address address;

}
