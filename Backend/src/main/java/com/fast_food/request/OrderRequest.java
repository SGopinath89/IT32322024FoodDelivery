package com.fast_food.request;

import com.fast_food.model.Address;
import lombok.Data;

@Data
public class OrderRequest {

    private Long restaurantId;

    private Address deliveryAddress;

    private String mobile;

    private  String sessionId;

    private long total;


}
