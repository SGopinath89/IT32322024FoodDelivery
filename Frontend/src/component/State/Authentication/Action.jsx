import axios from "axios";
import { ADD_ADDRESS_FAILURE, ADD_ADDRESS_REQUEST, ADD_ADDRESS_SUCCESS, ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, GET_ALL_ADDRESS_FAILURE, GET_ALL_ADDRESS_REQUEST, GET_ALL_ADDRESS_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionTypes";
import { API_URL, api } from "../../config/api";
import Swal from 'sweetalert2'
export const registerUser = (reqData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST })
    try {

       
        const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData);
        if (data.jwt) localStorage.setItem("jwt", data.jwt);
        if (data.role === "ROLE_RESTAURANT_OWNER") {
            reqData.navigate("/admin/restaurants");
        } else {
            reqData.navigate("/");
        }
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Register successfully",
            showConfirmButton: false,
            timer: 1500
        });

        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
        console.log("Register Success", data);
    } catch (error) {
    
        dispatch({ type: REGISTER_FAILURE, payload: error });

        console.log("error", error);
    }

}

export const loginUser = (reqData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
    try {

        const { data } = await axios.post(`${API_URL}/auth/signin `, reqData.userData);
        if (data.jwt) localStorage.setItem("jwt", data.jwt);
        if (data.role === "ROLE_RESTAURANT_OWNER") {
            reqData.navigate("/admin/restaurants");
        } else {
            reqData.navigate("/");
        }

        dispatch({ type: LOGIN_SUCCESS, payload: data });
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Login successfully",
            showConfirmButton: false,
            timer: 1500
        });
        console.log("Login Success", data);
    } catch (error) {

        Swal.fire({
            position: "top-end",
            icon: "error",
            title: error.response.status == 500 ? "user name password should not null" : "user name password incorrect",
            showConfirmButton: false,
            timer: 1500
        });
        dispatch({ type: REGISTER_FAILURE, payload: error });

        console.log("error", error);
    }

}

export const getUser = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST })
    try {

        const { data } = await api.get(`/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });

        dispatch({ type: GET_USER_SUCCESS, payload: data });

        console.log("User Profile", data);
    } catch (error) {

        dispatch({ type: GET_USER_FAILURE, payload: error });

        console.log("error", error);
    }

}

export const addToFavorite = ({ restaurantId, jwt }) => async (dispatch) => {
    dispatch({ type: ADD_TO_FAVORITE_REQUEST })
    try {

        const { data } = await api.put(`/api/restaurants/${restaurantId}/add-favorites`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
   
        dispatch({ type: ADD_TO_FAVORITE_SUCCESS, payload: data });
        console.log("Add Favorites To", data);
    } catch (error) {
        Swal.fire({
            title: "unsuccsessfully add",
            timer: 1500,
            icon: "error",
            showConfirmButton: false

        });
        dispatch({ type: ADD_TO_FAVORITE_FAILURE, payload: error });
        console.log("error", error);
    }

}



export const logout = () => async (dispatch) => {

    try {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "successfully logout",
            showConfirmButton: false,
            timer: 1500
          });
        localStorage.clear();
        dispatch({ type: LOGOUT });
        console.log("Logout Success");

    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error });
        console.log("error", error);
    }

}


export const addAddress = (reqData) => async (dispatch) => {
    dispatch({ type: ADD_ADDRESS_REQUEST })
    try {

        const { data } = await api.post(`/api/users/address`, reqData.deliveryAddress, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        });
        Swal.fire({
            position: "center",
            icon: "success",
            title: "address added successfully",
            showConfirmButton: false,
            timer: 1500
          });
        dispatch({ type: ADD_ADDRESS_SUCCESS, payload: data });
        console.log("Add Address", data);
    } catch (error) {
        dispatch({ type: ADD_ADDRESS_FAILURE, payload: error });
        console.log("error", error);
    }

}

