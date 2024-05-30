import * as actionTypes from './ActionTypes';

const initialState = {

    menuItems: [],
    loading: false,
    error: null,
    search: [],
    message: null
}

const menuItemReducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.CREATE_MENU_ITEM_REQUEST:
        case actionTypes.GET_MENUE_ITEMS_BY_RESTUARANTID_REQUEST:
        case actionTypes.DELETE_MENUE_ITEM_REQUEST:
        case actionTypes.SEARCH_MENU_ITEM_REQUEST:
        case actionTypes.UPDATE_MENUE_ITEMS_AVAILABILITY_REQUEST:
        case actionTypes.GET_ALL_MENUE_ITEMS_BY_RESTUARANTID_REQUEST:

            return {
                ...state,
                loading: true,
                error: null,
                message: null
            }

        case actionTypes.CREATE_MENU_ITEM_SUCCSESS:

            return {
                ...state,
                loading: false,
                menuItems: [action.payload],
                message: "Food Created Successfully"
            }
        case actionTypes.GET_MENUE_ITEMS_BY_RESTUARANTID_SUCCSESS:
        case actionTypes.GET_ALL_MENUE_ITEMS_BY_RESTUARANTID_SUCCSESS:

            return {
                ...state,
                loading: false,
                menuItems: action.payload,

            }

        case actionTypes.DELETE_MENUE_ITEM_SUCCSESS:

            return {
                ...state,
                loading: false,
                menuItems: state.menuItems.filter(
                    (menuItem) => menuItem.id !== action.payload
                ),

            }

        case actionTypes.UPDATE_MENUE_ITEMS_AVAILABILITY_SUCCSESS:
            console.log("Update items id ", action.payload.id);

            return {
                ...state,
                loading: false,
                menuItems: state.menuItems.map(
                    (menuItem) => menuItem.id === action.payload.id ? action.payload : menuItem
                ),

            }

        case actionTypes.SEARCH_MENU_ITEM_SUCCSESS:

            return {
                ...state,
                loading: false,
                search: action.payload

            }

        case actionTypes.CREATE_MENU_ITEM_FAILURE:
        case actionTypes.GET_MENUE_ITEMS_BY_RESTUARANTID_FAILURE:
        case actionTypes.DELETE_MENUE_ITEM_FAILURE:
        case actionTypes.SEARCH_MENU_ITEM_FAILURE:
        case actionTypes.UPDATE_MENUE_ITEMS_AVAILABILITY_FAILURE:
        case actionTypes.GET_ALL_MENUE_ITEMS_BY_RESTUARANTID_FAILURE:
            
            return {
                ...state,
                loading: false,
                error: action.payload,
                message: null

            }

        default:
            return state;
    }

}

export default menuItemReducer;