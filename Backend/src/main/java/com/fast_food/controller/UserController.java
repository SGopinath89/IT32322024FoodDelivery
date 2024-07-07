package com.fast_food.controller;

import com.fast_food.model.Address;
import com.fast_food.model.User;
import com.fast_food.repository.UserRepository;
import com.fast_food.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/profile")
    public ResponseEntity<User> findUserByJwtToken(@RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        return new ResponseEntity<>(user, HttpStatus.OK);

    }

    @PostMapping("/address")
    public ResponseEntity<User> addAddress(
            @RequestHeader("Authorization") String jwt,
            @RequestBody Address address
    ) {
        try {
            // Find the user using the JWT token
            User user = userService.findUserByJwtToken(jwt);

            if (user == null) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); // Or appropriate status
            }

            // Check if the address already exists
            boolean addressExists = user.getAddresses().stream()
                    .anyMatch(existingAddress -> existingAddress.equals(address));

            if (addressExists) {
                return new ResponseEntity<>(user, HttpStatus.OK);
            }

            // Add the address to the user's addresses
            user.getAddresses().add(address);

            // Save the updated user
            userRepository.save(user);

            // Return the updated user object
            return new ResponseEntity<>(user, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


//    @GetMapping("/address/all")
//    public ResponseEntity<List<Address>> getAllAddress(
//            @RequestHeader("Authorization") String jwt
//    ) throws Exception {
//
//        User user = userService.findUserByJwtToken(jwt);
//
//        userRepository.save(user);
//        return new ResponseEntity<>(user.getAddresses(), HttpStatus.OK);
//
//    }
}
