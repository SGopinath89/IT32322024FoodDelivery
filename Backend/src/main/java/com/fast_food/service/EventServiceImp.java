package com.fast_food.service;

import com.fast_food.model.Event;
import com.fast_food.model.Restaurant;
import com.fast_food.repository.EventRepository;
import com.fast_food.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class EventServiceImp implements EventService{

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private EventRepository eventRepository;



    @Override
    public Event createEvent(Event event, Long id) throws Exception {

        Restaurant restaurant =restaurantService.findRestaurantById(id);

        Event newEvent= new Event();

        newEvent.setEventName(event.getEventName());
        newEvent.setRestaurant(restaurant);
        newEvent.setLocation(event.getLocation());
        newEvent.setImageUrl(event.getImageUrl());
        newEvent.setEndDate(event.getEndDate());
        newEvent.setStartDate(event.getStartDate());

        eventRepository.save(newEvent);
        restaurant.getEvents().add(newEvent);
        restaurantRepository.save(restaurant);

        return newEvent;
    }

    @Override
    public List<Event> getAllEvents() throws Exception {

        return eventRepository.findAll();
    }

    @Override
    public Event deleteEvent(Event event, Long id) throws Exception {
        return null;
    }

    @Override
    public Event updateEvent(Event event, Long id) throws Exception {
        return null;
    }

    @Override
    public List<Event> getEvent(Long id) throws Exception {
     List<Event> events=eventRepository.findAll();
        ArrayList<Event> restaurantEvents= new ArrayList<>();

        for (Event e:events){
         if (Objects.equals(e.getRestaurant().getId(), id)){
             restaurantEvents.add(e);
         }
     }
     return  restaurantEvents;
    }
}
