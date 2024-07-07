package com.fast_food.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO )
    private  Long id;

    @ManyToOne
    @JsonIgnore
    private Cart cart;

    @ManyToOne  //many card items can store one food
    private Food food;

    private int quantity;

    private List<String> ingredients;

    private Long totalPrice;








}
