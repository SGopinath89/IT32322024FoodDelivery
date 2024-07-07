package com.fast_food.service;

import com.fast_food.dto.RestaurantDto;
import com.fast_food.model.Address;
import com.fast_food.model.Restaurant;
import com.fast_food.model.User;
import com.fast_food.repository.AddressRepository;
import com.fast_food.repository.RestaurantRepository;
import com.fast_food.repository.UserRepository;
import com.fast_food.request.CreateRestaurantRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RestaurantServiceImp implements RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;


    @Override
    public Restaurant createRestaurant(CreateRestaurantRequest req, User user) {

        Address address= addressRepository.save(req.getAddress());

        Restaurant restaurant = new Restaurant();

        restaurant.setAddress(address);
        restaurant.setContactInformation(req.getContactInformation());
        restaurant.setCuisineType(req.getCuisineType());
        restaurant.setDescription(req.getDescription());
        restaurant.setImages(req.getImages());
        restaurant.setName(req.getName());
        restaurant.setOpeningHours(req.getOpeningHours());
        restaurant.setRegistrationDateTime(LocalDateTime.now());
        restaurant.setOwner(user);

        return restaurantRepository.save(restaurant);
    }

    @Override
    public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updateRestaurant) throws Exception {

        Restaurant restaurant = findRestaurantById(restaurantId);

        if(restaurant.getCuisineType()!=null){
            restaurant.setCuisineType(updateRestaurant.getCuisineType());
        }

        if(restaurant.getDescription()!=null){
            restaurant.setDescription(updateRestaurant.getDescription());
        }

        if(restaurant.getName()!=null){
            restaurant.setName(updateRestaurant.getName());
        }

        return restaurantRepository.save(restaurant);
    }

    @Override
    public void deleteRestaurant(Long restaurantId) throws Exception {

        Restaurant restaurant = findRestaurantById(restaurantId);

        restaurantRepository.delete(restaurant);
    }

    @Override
    public List<Restaurant> getAllRestaurant() {

        return  restaurantRepository.findAll();
    }

    @Override
    public List<Restaurant> searchRestaurant(String keyword) {

        return restaurantRepository.findBySearchQuery(keyword);
    }

    @Override
    public Restaurant findRestaurantById(Long id) throws Exception {

        Optional <Restaurant> opt =restaurantRepository.findById(id);

        if(opt.isEmpty()){
            throw new Exception("Restaurant Not Found");
        }
        return opt.get();
    }

    @Override
    public Restaurant getRestaurantByUserId(Long userId) throws Exception {

        Restaurant restaurant= restaurantRepository.findByOwnerId(userId);

        if(restaurant==null){

            throw new Exception("Restaurant Not Found With Owner Id "+userId);
        }
        return restaurant;
    }

    @Override
    public RestaurantDto addToFavorites(Long restaurantId, User user) throws Exception {

        Restaurant restaurant = findRestaurantById(restaurantId);

        RestaurantDto restaurantDto = new RestaurantDto();

        restaurantDto.setDescription(restaurant.getDescription());
        restaurantDto.setImages(restaurant.getImages());
        restaurantDto.setTitle(restaurant.getName());
        restaurantDto.setId(restaurantId);
        restaurantDto.setOpen(restaurant.isOpen());


        boolean isFavorited = false;
        List<RestaurantDto> favorites = user.getFavorites();

        for (RestaurantDto favorite : favorites){
            if(favorite.getId().equals(restaurantId)){
                isFavorited=true;
                break;
            }
        }

        if(isFavorited){

            favorites.removeIf(favorite-> favorite.getId().equals(restaurantId));
        }else{
            favorites.add(restaurantDto);
        }

       user.setFavorites(favorites);

        userRepository.save(user);



        return restaurantDto;
    }

    @Override
    public Restaurant updateRestaurantStatus(Long id) throws Exception {

        Restaurant restaurant = findRestaurantById(id);

        restaurant.setOpen(!restaurant.isOpen());



        return restaurantRepository.save(restaurant);
    }
}
