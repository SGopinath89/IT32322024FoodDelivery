package com.fast_food.model;


import com.fast_food.dto.RestaurantDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class User {

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   private Long id;

   private String fullName;

   private String email;

   @OneToOne
   private Cart cart;

   @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
   private String password;

   private  USER_ROLE role=USER_ROLE.ROLE_CUSTOMER;

   @JsonIgnore //user api call time it not show
   @OneToMany(cascade = CascadeType.ALL,mappedBy = "customer")
   private List<Order> orders=new ArrayList<>();

   @ElementCollection
   private List<RestaurantDto> favorites=new ArrayList<>();

   @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)  //when we delete user automatically delete all address
   private List<Address> addresses =new ArrayList<>();
}
