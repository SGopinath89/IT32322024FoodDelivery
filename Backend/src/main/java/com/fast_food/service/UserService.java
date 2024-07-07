package com.fast_food.service;

import com.fast_food.model.User;

public interface UserService {

    public User findUserByJwtToken(String jwt) throws Exception;
    public User findUserByEmail(String email) throws  Exception;

}
