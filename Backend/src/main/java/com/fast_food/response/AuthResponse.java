package com.fast_food.response;

import com.fast_food.dto.RestaurantDto;
import com.fast_food.model.USER_ROLE;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;


@Data
public class AuthResponse {

    private String jwt ;
    private String message;
    private USER_ROLE role;
}
