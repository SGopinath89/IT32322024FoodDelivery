package com.fast_food.controller;

import com.fast_food.dto.RestaurantDto;
import com.fast_food.model.Restaurant;
import com.fast_food.model.User;
import com.fast_food.repository.UserRepository;
import com.fast_food.request.CreateRestaurantRequest;
import com.fast_food.response.MessageResponse;
import com.fast_food.service.RestaurantService;
import com.fast_food.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/admin/restaurants")
public class AdminRestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<Restaurant> createRestaurant(
            @RequestBody CreateRestaurantRequest req,
            @RequestHeader("Authorization") String jwt
            ) throws Exception

    {
        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurant= restaurantService.createRestaurant(req,user);

        return new ResponseEntity<>(restaurant, HttpStatus.CREATED);
    }



    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> updateRestaurant(
            @RequestBody CreateRestaurantRequest req,
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id
    ) throws Exception

    {
        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurant= restaurantService.updateRestaurant(id,req);

        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteRestaurant(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id
    ) throws Exception

    {
        User user = userService.findUserByJwtToken(jwt);
         restaurantService.deleteRestaurant(id);

        MessageResponse messageResponse = new MessageResponse();
        messageResponse.setMessage("Restaurant Deleted Successfully");

        return new ResponseEntity<>(messageResponse, HttpStatus.OK);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Restaurant> updateRestaurantStatus(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id
    ) throws Exception

    {
        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurant= restaurantService.updateRestaurantStatus(id);



        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @PutMapping("/{id}/favorites/update-status")
    public ResponseEntity<User> updateFavoriteStatus(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id
    ) throws Exception

    {
        User user = userService.findUserByJwtToken(jwt);

        List<RestaurantDto> favList =new ArrayList<>();

        for (RestaurantDto fav: user.getFavorites()){

            if(fav.getId().equals(id)){
                fav.setOpen(!fav.isOpen());
                break;
            }

            user.setFavorites(favList);
            userRepository.save(user);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<Restaurant> findRestaurantByUserId(
            @RequestHeader("Authorization") String jwt
    ) throws Exception

    {

        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurant= restaurantService.getRestaurantByUserId(user.getId());
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }


}
