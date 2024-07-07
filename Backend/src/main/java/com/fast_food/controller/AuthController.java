package com.fast_food.controller;

import com.fast_food.config.JwtProvider;
import com.fast_food.model.Cart;
import com.fast_food.model.USER_ROLE;
import com.fast_food.model.User;
import com.fast_food.repository.CartRepository;
import com.fast_food.repository.UserRepository;
import com.fast_food.request.LoginRequest;
import com.fast_food.response.AuthResponse;
import com.fast_food.service.CustomerUserDetailsService;
import com.fast_food.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private CustomerUserDetailsService customerUserDetailsService;
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserService userService;
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws Exception {


        User isEmailExit= userRepository.findByEmail(user.getEmail());

        if(isEmailExit!=null){
            throw new Exception("Email is already used with another account");
        }

        User createUser=new User();
        createUser.setEmail(user.getEmail());
        createUser.setFullName(user.getFullName());
        createUser.setRole(user.getRole());
        createUser.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser= userRepository.save(createUser);

        Cart cart = new Cart();
        cart.setCustomer(savedUser);
        cartRepository.save(cart);

        Authentication authentication=authenticate(user.getEmail(),user.getPassword());
        Collection<? extends GrantedAuthority> authorities=authentication.getAuthorities();
        String role=authorities.isEmpty()?null:authorities.iterator().next().getAuthority();

        String jwt=jwtProvider.geneateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Register success");
        authResponse.setRole(savedUser.getRole());

        return new ResponseEntity<>( authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest req) throws Exception {

        String username=req.getEmail();
        String password=req.getPassword();

        Authentication authentication=authenticate(username,password);
        Collection<? extends GrantedAuthority> authorities=authentication.getAuthorities();
        String role=authorities.isEmpty()?null:authorities.iterator().next().getAuthority();

        String jwt=jwtProvider.geneateToken(authentication);
        User user = userService.findUserByEmail(req.getEmail());

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);

        authResponse.setMessage("Login success");
        authResponse.setRole(USER_ROLE.valueOf(role));  //convert string to USER_ROLE Format


        return new ResponseEntity<>( authResponse, HttpStatus.OK);

    }

    private Authentication authenticate(String username, String password) {

        UserDetails userDetails=customerUserDetailsService.loadUserByUsername(username);

//        if(userDetails==null){
//            throw new BadCredentialsException("Invalid Username...");
//        }

        if(!passwordEncoder.matches(password,userDetails.getPassword())){
            throw  new BadCredentialsException("Invalid Password...");
        }

        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
    }


}
