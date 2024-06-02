import { api } from '../../config/api';
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_USERS_NOTIFICATION_FAILURE, GET_USERS_NOTIFICATION_REQUEST, GET_USERS_NOTIFICATION_SUCCESS, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS } from './ActionTypes';

export const createOrder = (reqData) => {

    return async (dispatch) => {
        console.log(reqData)
        dispatch({ type: CREATE_ORDER_REQUEST });

        try {

            const { data } = await api.post(`/api/order`, 
            {
                deliveryAddress:reqData.deliveryAddress,
                restaurantId:reqData.restaurantId,
                mobile:reqData.mobile
            },
                {
                    headers: {
                        Authorization: `Bearer ${reqData.jwt}`
                    }
                }

            );
            // if(){

            // }
            dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
            console.log("Order Created",data);
        } catch (error) {
            console.log(error);
            dispatch({ type: CREATE_ORDER_FAILURE, payload: error });
        }
    }
}

export const getUsersOrders = (jwt) => {

    return async (dispatch) => {

        dispatch({ type: GET_USERS_ORDERS_REQUEST });

        try {

            const { data } = await api.get(`/api/order/user`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }

            );
            dispatch({ type: GET_USERS_ORDERS_SUCCESS, payload: data });
            console.log("All Orders",data);
        } catch (error) {
            console.log(error);
            dispatch({ type: GET_USERS_ORDERS_FAILURE, payload: error });
        }
    }
}

// export const getUsersNotification = () => {

//     return async (dispatch) => {

//         dispatch({ type: GET_USERS_ORDERS_REQUEST });

//         try {

//             const { data } = await api.get(`/api/order/user`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${jwt}`
//                     }
//                 }

//             );
//             dispatch({ type: GET_USERS_ORDERS_SUCCESS, payload: data });
//         } catch (error) {
//             dispatch({ type: GET_USERS_ORDERS_FAILURE, payload: error });
//         }
//     }
// }