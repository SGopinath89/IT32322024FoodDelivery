import { api } from '../../config/api';
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_PAYMENT_LINK_FAILURE, CREATE_PAYMENT_LINK_REQUEST, CREATE_PAYMENT_LINK_SUCCESS, GET_USERS_NOTIFICATION_FAILURE, GET_USERS_NOTIFICATION_REQUEST, GET_USERS_NOTIFICATION_SUCCESS, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS } from './ActionTypes';
import Swal from 'sweetalert2';

export const createOrder = (reqData) => {

    return async (dispatch) => {

        dispatch({ type: CREATE_ORDER_REQUEST });

        try {

            const {data}=await api.post(`/api/order/create`,
                {
                    deliveryAddress: reqData.deliveryAddress,
                    restaurantId:reqData.restaurantId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${reqData.jwt}`
                    }
                }

            );

            console.log("Order create succsefully", data);
        } catch (error) {
            console.log(error);
            
            dispatch({ type: CREATE_ORDER_FAILURE, payload: error });
        }
    }
}

export const createPaymentLink = (reqData) => {

    return async (dispatch) => {

        dispatch({ type: CREATE_PAYMENT_LINK_REQUEST });

        try {

            const { data } = await api.post(`/api/order/payment`,
                {
                    deliveryAddress: reqData.deliveryAddress,
                    total: reqData.total,



                },
                {
                    headers: {
                        Authorization: `Bearer ${reqData.jwt}`
                    }
                }

            );
            const address = data.address;

            localStorage.setItem("selectedAddress", JSON.stringify(address));

            if (data.paymentUrl) {
                window.location.href = data.paymentUrl;
            }



        } catch (error) {
            console.log(error);
            dispatch({ type: CREATE_PAYMENT_LINK_FAILURE, payload: error });
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
            console.log("All Orders", data);
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