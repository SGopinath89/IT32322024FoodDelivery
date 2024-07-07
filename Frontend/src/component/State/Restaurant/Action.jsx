import { api } from '../../config/api';
import { CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_EVENTS_FAILURE, CREATE_EVENTS_REQUEST, CREATE_EVENTS_SUCCESS, CREATE_RESTAURANT_FAILURE, CREATE_RESTAURANT_REQUEST, CREATE_RESTAURANT_SUCCESS, DELETE_EVENTS_REQUEST, DELETE_EVENTS_SUCCESS, DELETE_RESTAURANT_FAILURE, DELETE_RESTAURANT_REQUEST, DELETE_RESTAURANT_SUCCESS, GET_ALL_EVENTS_FAILURE, GET_ALL_EVENTS_REQUEST, GET_ALL_EVENTS_SUCCESS, GET_ALL_FOODS_FAILURE, GET_ALL_FOODS_REQUEST, GET_ALL_FOODS_SUCCESS, GET_ALL_RESTAURANTS_FAILURE, GET_ALL_RESTAURANTS_REQUEST, GET_ALL_RESTAURANTS_SUCCESS, GET_RESTAURANTS_EVENTS_FAILURE, GET_RESTAURANTS_EVENTS_REQUEST, GET_RESTAURANTS_EVENTS_SUCCESS, GET_RESTAURANT_BY_ID_FAILURE, GET_RESTAURANT_BY_ID_REQUEST, GET_RESTAURANT_BY_ID_SUCCESS, GET_RESTAURANT_BY_USER_ID_FAILURE, GET_RESTAURANT_BY_USER_ID_REQUEST, GET_RESTAURANT_BY_USER_ID_SUCCESS, GET_RESTAURANT_CATEGORY_FAILURE, GET_RESTAURANT_CATEGORY_REQUEST, GET_RESTAURANT_CATEGORY_SUCCESS, GET_RESTAURANT_EVENTS_REQUEST_BY_ID, GET_RESTAURANT_EVENTS_SUCCESS_BY_ID, UPDATE_RESTAURANT_FAILURE, UPDATE_RESTAURANT_REQUEST, UPDATE_RESTAURANT_STATUS_FAILURE, UPDATE_RESTAURANT_STATUS_REQUEST, UPDATE_RESTAURANT_STATUS_SUCCESS, UPDATE_RESTAURANT_SUCCESS } from './ActionTypes';
import Swal from 'sweetalert2';

export const getAllRestaurantAction = () => {

    return async (dispatch) => {

        dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });
        try {

            const { data } = await api.get("/api/restaurants",

            );

            dispatch({ type: GET_ALL_RESTAURANTS_SUCCESS, payload: data });
            console.log("All Restaurant ", data);

        } catch (error) {
            dispatch({ type: GET_ALL_RESTAURANTS_FAILURE, payload: error });
            console.log("Error ", error);
        }

    }

}

export const getAllFoods = () => {

    return async (dispatch) => {

        dispatch({ type: GET_ALL_FOODS_REQUEST });
        try {

            const { data } = await api.get("/api/food/all",


            );

            dispatch({ type: GET_ALL_FOODS_SUCCESS, payload: data });
            console.log("All Foods ", data);

        } catch (error) {
            dispatch({ type: GET_ALL_FOODS_FAILURE, payload: error });
            console.log("Error ", error);
        }

    }

}

export const getRestaurantById = (reqData) => {

    return async (dispatch) => {

        dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
        try {

            const response = await api.get(`/api/restaurants/${reqData.restaurantId}`,
                {
                    headers: {
                        Authorization: `Bearer ${reqData.jwt}`
                    }
                }
            );

            dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: response.data });
            console.log("Get resturant By id ", response);

        } catch (error) {
            dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error });
            console.log("Error ", error);
        }

    }

}

export const getRestaurantByUserId = (jwt) => {

    return async (dispatch) => {

        dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
        try {

            const { data } = await api.get("/api/admin/restaurants/user",
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            );

            dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
            console.log("Get Restaurnt By id ", data);

        } catch (error) {
            dispatch({ type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: error });
            console.log("Error ", error);
        }

    }

}

export const createRestaurant = (reqData) => {

    return async (dispatch) => {

        dispatch({ type: CREATE_RESTAURANT_REQUEST });
        try {

            const { data } = await api.post("/api/admin/restaurants", reqData.data,
                {
                    headers: {
                        Authorization: `Bearer ${reqData.token}`
                    }
                }
            );

            await Swal.fire({
                title: "create restaurnt succesfully",
                timer: 1500,
                showConfirmButton: false,
                icon: "success"
            });

            dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data });
            console.log("Create Restaurant ", data);

        } catch (error) {
            dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error });
            console.log("Error ", error);
        }

    }

}

export const updateRestaurant = ({ restaurantId, restaurantData, jwt }) => {

    return async (dispatch) => {

        dispatch({ type: UPDATE_RESTAURANT_REQUEST });
        try {

            const { response } = await api.put(`/api/admin/restaurant/${restaurantId}`, restaurantData,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            );

            dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: response.data });
            console.log("Update Restaurant ", response.data);

        } catch (error) {
            dispatch({ type: UPDATE_RESTAURANT_FAILURE, payload: error });
            console.log("Error ", error);
        }

    }

}

export const deleteRestaurant = ({ restaurantId, jwt }) => {

    return async (dispatch) => {

        dispatch({ type: DELETE_RESTAURANT_REQUEST });
        try {

            const { response } = await api.delete(`/api/admin/restaurant/${restaurantId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            );
            Swal.fire({
                position: "center",
                icon: "success",
                title: "delete restaurnt successfully",
                showConfirmButton: false,
                timer: 1500
            });
            dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId });
            console.log("Delete Restaurant ", response.data);

        } catch (error) {
            dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error });
            console.log("Error ", error);
        }

    }

}

export const updateRestaurantStatus = ({ restaurantId, jwt }) => {

    return async (dispatch) => {

        dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
        try {

            const response = await api.put(`/api/admin/restaurants/${restaurantId}/status`, {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            );
            await Swal.fire({
                title: "upate restaurnt status succesfully",
                timer: 1500,
                showConfirmButton: false,
                icon: "success"
            });
            dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: response.data });
            console.log("Update Restaurant Status ", response.data);

        } catch (error) {
            dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error });
            console.log("Error ", error);
        }

    }

}


export const createEvent = ({ data, jwt, restaurantId }) => {
    console.log(data)
    return async (dispatch) => {

        dispatch({ type: CREATE_EVENTS_REQUEST });
        try {

            const response = await api.post(`/api/admin/event/create/${restaurantId}`, data,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            );
            Swal.fire({
                position: "center",
                icon: "success",
                title: "create event successfully",
                showConfirmButton: false,
                timer: 1500
            });
            dispatch({ type: CREATE_EVENTS_SUCCESS, payload: response.data });
            console.log("Create Event ", response.data);

        } catch (error) {
            dispatch({ type: CREATE_EVENTS_FAILURE, payload: error });
            console.log("Error ", error);
        }

    }

}


export const getAllEvents = () => {

    return async (dispatch) => {

        dispatch({ type: GET_ALL_EVENTS_REQUEST });
        try {

            const response = await api.get("/api/event/all",
                {

                }
            );

            dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: response.data });
            console.log("All Events ", response.data);

        } catch (error) {
            dispatch({ type: GET_ALL_EVENTS_FAILURE, payload: error });
            console.log("Error ", error);
        }

    }

}

export const getEventById = (jwt, restaurantId) => {

    return async (dispatch) => {

        dispatch({ type: GET_RESTAURANT_EVENTS_REQUEST_BY_ID });
        try {

            const response = await api.get(`/api/event/id/${restaurantId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            );


            dispatch({ type: GET_RESTAURANT_EVENTS_SUCCESS_BY_ID, payload: response.data });
            console.log("Events by id", response.data);

        } catch (error) {
            dispatch({ type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: error });
            console.log("Error ", error);
        }

    }

}


export const deleteEvent = ({ eventId, jwt }) => {

    return async (dispatch) => {

        dispatch({ type: DELETE_EVENTS_REQUEST });
        try {

            const { response } = await api.delete(`/api/admin/events/${eventId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            );
            Swal.fire({
                position: "center",
                icon: "success",
                title: "delete event successfully",
                showConfirmButton: false,
                timer: 1500
            });
            dispatch({ type: DELETE_EVENTS_SUCCESS, payload: restaurantId });
            console.log("Delete Event ", response.data);

        } catch (error) {
            dispatch({ type: DELETE_VENT_FAILURE, payload: error });
            console.log("Error ", error);
        }

    }

}


export const getRestaurantEvents = ({ restaurantId, jwt }) => {

    return async (dispatch) => {

        dispatch({ type: GET_RESTAURANTS_EVENTS_REQUEST });
        try {

            const { response } = await api.get(`/api/admin/events/restaurant${restaurantId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            );

            dispatch({ type: GET_RESTAURANTS_EVENTS_SUCCESS, payload: response.data });
            console.log("All ResturantEvents ", response.data);

        } catch (error) {
            dispatch({ type: GET_RESTAURANTS_EVENTS_FAILURE, payload: error });
            console.log("Error ", error);
        }

    }

}

export const creatCategoryAction = ({ reqData, jwt }) => {

    return async (dispatch) => {

        dispatch({ type: CREATE_CATEGORY_REQUEST });
        try {

            const response = await api.post(`/api/admin/category`, reqData,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            );
            Swal.fire({
                position: "center",
                icon: "success",
                title: "create category successfully",
                showConfirmButton: false,
                timer: 1500
            });
            dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: response.data });
            console.log("Create Category ", response.data);

        } catch (error) {
            dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error });
            console.log("Error ", error);
        }

    }

}

export const getRestaurantCategory = ({ jwt, restaurantId }) => {

    return async (dispatch) => {

        dispatch({ type: GET_RESTAURANT_CATEGORY_REQUEST });
        try {

            const response = await api.get(`/api/category/restaurant/${restaurantId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            );

            dispatch({ type: GET_RESTAURANT_CATEGORY_SUCCESS, payload: response.data });
            console.log("Restaurant Categorys ", response.data);

        } catch (error) {
            dispatch({ type: GET_RESTAURANT_CATEGORY_FAILURE, payload: error });
            console.log("Error ", error);
        }

    }

}
