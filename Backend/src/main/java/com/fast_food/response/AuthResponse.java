package com.fast_food.response;

import com.fast_food.model.USER_ROLE;
import com.fast_food.model.User;
import lombok.Data;



@Data
public class AuthResponse {

    private String jwt ;
    private String message;
    private USER_ROLE role;
}
