import { api } from '../../config/api';
import { GET_RESTAURANTS_ORDER_FAILURE, GET_RESTAURANTS_ORDER_REQUEST, GET_RESTAURANTS_ORDER_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS } from './ActionTypes';
import Swal from 'sweetalert2';
export const updateOrderStatus = ({ orderId, orderStatus, jwt }) => {

    return async (dispatch) => {

        try {
            dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });

            const response = await api.put(`/api/admin/order/${orderId}/${orderStatus}`, {}, {

                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            await Swal.fire({
                title: "update order status succesfully",
               timer:1500,
               showConfirmButton:false,
                icon: "success"
              });
            const updatedOrder = response.data;
            dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: updatedOrder });
            console.log("Status Updated", updatedOrder);
        } catch (error) {
            console.log(error);
            dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: error });
        }
    }
}

export const fetchRestaurantsOrder = ({ restaurantId, orderStatus, jwt }) => {

    return async (dispatch) => {

        try {
            dispatch({ type: GET_RESTAURANTS_ORDER_REQUEST });

            const { data } = await api.get(`/api/admin/order/restaurant/${restaurantId}`, {
                params: { order_status: orderStatus },
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });

            dispatch({ type: GET_RESTAURANTS_ORDER_SUCCESS, payload: data });
            console.log("Resturant Orders List ", data);
        } catch (error) {
            console.log(error);
            dispatch({ type: GET_RESTAURANTS_ORDER_FAILURE, payload: error });
        }
    }
}