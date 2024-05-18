import { GET_RESTURANTS_ORDER_FAILURE, GET_RESTURANTS_ORDER_REQUEST, GET_RESTURANTS_ORDER_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS } from "./ActionTypes";


const initialState = {

    loading: false,
    error: null,
    orders: []
};

const restaurantsOrderReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_RESTURANTS_ORDER_REQUEST:
        case UPDATE_ORDER_STATUS_REQUEST:

            return {

                ...state,
                loading: true,
                error: null
            }

        case GET_RESTURANTS_ORDER_SUCCESS:

            return {

                ...state,
                loading: false,
                orders: action.payload
            }
        case UPDATE_ORDER_STATUS_SUCCESS:

            const updatedOrders = state.orders.map((order) =>
                order, id === action.payload.id ? action.payload : order
            )
            return {

                ...state,
                loading: false,
                orders: updatedOrders
            }

        case GET_RESTURANTS_ORDER_FAILURE:
        case UPDATE_ORDER_STATUS_FAILURE:

            return {

                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}

export default restaurantsOrderReducer;