import { data } from "autoprefixer";
import { api } from "../../config/api";
import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, CLEAR_CART_FAILURE, CLEAR_CART_REQUEST, CLEAR_CART_SUCCESS, FIND_CART_FAILURE, FIND_CART_REQUEST, FIND_CART_SUCCESS, GET_ALL_CART_ITEMS_FAILURE, GET_ALL_CART_ITEMS_REQUEST, GET_ALL_CART_ITEMS_SUCCESS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./ActionTypes";
import Swal from 'sweetalert2'

export const findCart = (token) => {

    return async (dispach) => {

        dispach({ type: FIND_CART_REQUEST });

        try {

            const response = await api.get(`/api/cart`, {

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );

            console.log("My Cart", response.data);
            dispach({ type: FIND_CART_SUCCESS, payload: response.data });

        } catch (error) {
            console.log("error show cart", error);
            dispach({ type: FIND_CART_FAILURE, payload: error });
        }
    }

}

export const getAllCartItems = (reqData) => {

    return async (dispach) => {

        dispach({ type: GET_ALL_CART_ITEMS_REQUEST });

        try {

            const response = await api.get(`/api/carts/${reqData.cartId}/items`, {

                headers: {
                    Authorization: `Bearer ${reqData.token}`
                }
            }
            );

            dispach({ type: GET_ALL_CART_ITEMS_SUCCESS, payload: response.data });
            console.log("All Cart Items", response.data);

        } catch (error) {
            console.log(error).
                dispach({ type: GET_ALL_CART_ITEMS_FAILURE, payload: error });
        }
    }

}

export const addItemToCart = (reqData) => {

    return async (dispach) => {

        dispach({ type: ADD_ITEM_TO_CART_REQUEST });

        try {

            const { data } = await api.put(`/api/cart-item/add`, reqData.cartItem, {

                headers: {
                    Authorization: `Bearer ${reqData.token}`
                }
            }
            );
            await Swal.fire({
                title: "Add item succesfully",
               timer:1500,
               showConfirmButton:false,
                icon: "success"
              });
            console.log("Add to cart ok", data);
            dispach({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });

        } catch (error) {
            console.log(error);
            dispach({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message });
        }
    }


}

export const updateCartItem = (reqData) => {

    return async (dispach) => {

        dispach({ type: UPDATE_CART_ITEM_REQUEST });

        try {

            const { data } = await api.put(`/api/cart-item/update`, reqData.data, {

                headers: {
                    Authorization: `Bearer ${reqData.jwt}`
                }
            }
            );

            dispach({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
            console.log("Cart Item Update", data);
        } catch (error) {
            console.log(error);
            dispach({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
        }
    }

}


export const removeCartItem = ({ cartItemId, jwt }) => {

    return async (dispach) => {

        dispach({ type: REMOVE_CART_ITEM_REQUEST });

        try {

            const { data } = await api.delete(`/api/cart-item/${cartItemId}/remove`, {

                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
            );

            dispach({ type: REMOVE_CART_ITEM_SUCCESS, payload: cartItemId });
            console.log("Remove Cart Item ", data);

        } catch (error) {
            console.log(error);
            dispach({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message });
        }
    }

}

export const clearCartAction = () => {

    return async (dispach) => {

        dispach({ type: CLEAR_CART_REQUEST });

        try {

            const { data } = await api.put(`/api/cart/clear`, {}, {

                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                }
            }
            );

            dispach({ type: CLEAR_CART_SUCCESS, payload: data });

        } catch (error) {
            dispach({ type: CLEAR_CART_FAILURE, payload: error.message });
        }
    }

}

