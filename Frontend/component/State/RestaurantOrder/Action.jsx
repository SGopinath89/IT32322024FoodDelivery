import { api } from '../../config/api';
import { GET_RESTURANTS_ORDER_FAILURE, GET_RESTURANTS_ORDER_REQUEST, GET_RESTURANTS_ORDER_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS } from './ActionTypes';

export const updateOrderStatus = ({ orderId, orderStatus, jwt }) => {

    return async (dispatch) => {

        try {
            dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });

            const response = await api.put(`/api/admin/orders/${orderId}/${orderStatus}`, {}, {

                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });

            const updatedOrder = response.data;
            dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: updatedOrder });

        } catch (error) {
            dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: error });
        }
    }
}

export const fetchRestaurantsOrder = ({ restaurantId, orderStatus, jwt }) => {

    return async (dispatch) => {

        try {
            dispatch({ type: GET_RESTURANTS_ORDER_REQUEST });

            const { data } = await api.get(`/api/admin/restaurant/${restaurantId}`, {
                params: { order_status: orderStatus },
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });

            const orders = data;

            dispatch({ type: GET_RESTURANTS_ORDER_SUCCESS, payload: orders });

        } catch (error) {
            dispatch({ type: GET_RESTURANTS_ORDER_FAILURE, payload: error });
        }
    }
}