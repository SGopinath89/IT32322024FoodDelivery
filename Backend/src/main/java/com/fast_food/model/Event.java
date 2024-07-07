package com.fast_food.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO )
    private  Long id;

    private String imageUrl;

    private String location;

    private String eventName;

    private String startDate;

    private String endDate;

    @JsonIgnore
    @ManyToOne
    private  Restaurant restaurant;
}
