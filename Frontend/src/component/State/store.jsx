import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { authReducer } from './Authentication/Reducer';
import { thunk } from 'redux-thunk';
import restaurantReducer from './Restaurant/Reducer';
import menuItemReducer from './Menu/Reducer';
import cartReducer from './Cart/Reducer';
import { orderReducer } from './Order/Reducer';
import restaurantsOrderReducer from './RestaurantOrder/Reducer';
import { ingredientsReducer } from './Ingredients/Reducer';

const rooteReducer = combineReducers({

    auth: authReducer,
    restaurant: restaurantReducer,
    menu: menuItemReducer,
    cart: cartReducer,
    order: orderReducer,
    restaurantOrder: restaurantsOrderReducer,
    ingredient : ingredientsReducer

});


export const store = legacy_createStore(rooteReducer, applyMiddleware(thunk));