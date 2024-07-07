import { api } from "../../config/api";
import { CREATE_MENU_ITEM_FAILURE, CREATE_MENU_ITEM_REQUEST, CREATE_MENU_ITEM_SUCCSESS, DELETE_MENUE_ITEM_FAILURE, DELETE_MENUE_ITEM_REQUEST, DELETE_MENUE_ITEM_SUCCSESS, GET_ALL_MENUE_ITEMS_BY_RESTUARANTID_FAILURE, GET_ALL_MENUE_ITEMS_BY_RESTUARANTID_REQUEST, GET_ALL_MENUE_ITEMS_BY_RESTUARANTID_SUCCSESS, GET_MENUE_ITEMS_BY_RESTUARANTID_FAILURE, GET_MENUE_ITEMS_BY_RESTUARANTID_REQUEST, GET_MENUE_ITEMS_BY_RESTUARANTID_SUCCSESS, SEARCH_MENU_ITEM_FAILURE, SEARCH_MENU_ITEM_REQUEST, SEARCH_MENU_ITEM_SUCCSESS, UPDATE_MENUE_ITEMS_AVAILABILITY_FAILURE, UPDATE_MENUE_ITEMS_AVAILABILITY_REQUEST, UPDATE_MENUE_ITEMS_AVAILABILITY_SUCCSESS } from "./ActionTypes";
import Swal from 'sweetalert2';

export const createMenuItem = ({ menu, jwt }) => {

    return async (dispatch) => {
        dispatch({ type: CREATE_MENU_ITEM_REQUEST });

        try {

            const { data } = await api.post("api/admin/food", menu,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    }
                }
            );
            await Swal.fire({
                title: "create menu item succesfully",
                position: "center",
               timer:1500,
               showConfirmButton:false,
                icon: "success"
              });
            console.log("Created Menu ", data);
            dispatch({ type: CREATE_MENU_ITEM_SUCCSESS, payload: data });
        } catch (error) {
            console.log("Error ", error);
            dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error });
        }
    }

}

export const getItemsByRestaurantId = (reqData) => {

    return async (dispatch) => {
        dispatch({ type: GET_MENUE_ITEMS_BY_RESTUARANTID_REQUEST });

        try {

            const { data } = await api.get(`api/food/restaurant/${reqData.restaurantId}?vegetarian=${reqData.vegetarian}&nonVeg=${reqData.nonVeg}
            &seasonal=${reqData.seasonal}&food_category=${reqData.foodCategory}`,
                {
                    headers: {
                        Authorization: `Bearer ${reqData.jwt}`,
                    }
                }
            );

            console.log("Menu items by restaurants ", data);
            dispatch({ type: GET_MENUE_ITEMS_BY_RESTUARANTID_SUCCSESS, payload: data });
        } catch (error) {
            console.log("Error ", error);
            dispatch({ type: GET_MENUE_ITEMS_BY_RESTUARANTID_FAILURE, payload: error });
        }
    }

}

export const getAllMenuItemsByRestaurantId = (reqData) => {

    return async (dispatch) => {
        dispatch({ type: GET_ALL_MENUE_ITEMS_BY_RESTUARANTID_REQUEST });

        try {

            const { data } = await api.get(`api/food/restaurant/all/${reqData.restaurantId}`,
                {
                    headers: {
                        Authorization: `Bearer ${reqData.jwt}`,
                    }
                }
            );

            console.log("Menu items by restaurants ", data);
            dispatch({ type: GET_ALL_MENUE_ITEMS_BY_RESTUARANTID_SUCCSESS, payload: data });
        } catch (error) {
            console.log("Error ", error);
            dispatch({ type: GET_ALL_MENUE_ITEMS_BY_RESTUARANTID_FAILURE, payload: error });
        }
    }

}

export const searchMenuItem = ({ keyword, jwt }) => {

    return async (dispatch) => {
        dispatch({ type: SEARCH_MENU_ITEM_REQUEST });

        try {

            const { data } = await api.get(`api/food/search?name=${keyword}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    }
                }
            );

            console.log("Sarch items ", data);
            dispatch({ type: SEARCH_MENU_ITEM_SUCCSESS, payload: data });
        } catch (error) {
            console.log("Error ", error);
            dispatch({ type: SEARCH_MENU_ITEM_FAILURE, payload: error });
        }
    }

}

// export const getAllIngredientsOdMenuItem = (reqData) => {

//     return async (dispatch) => {
//         dispatch({ type: GET_ALL });

//         try {

//             const { data } = await api.get(`api/admin/food/restaurant/${reqData.restaurantId}?vegetarian=${reqData.vegetarian}&nonveg=${reqData.nonveg}
//             &seasonal=${reqData.seasonal}&food_category=${reqData.foodCategory}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${reqData.jwt}`,
//                     }
//                 }
//             );

//             console.log("Menu items by restaurants ", data);
//             dispatch({ type: GET_MENUE_ITEMS_BY_RESTUARANTID_SUCCSESS, payload: data });
//         } catch (error) {
//             console.log("Error ", error);
//             dispatch({ type: GET_MENUE_ITEMS_BY_RESTUARANTID_FAILURE, payload: error });
//         }
//     }

// }

export const updateMenuItemsAvailability = ({ foodId, jwt }) => {

    return async (dispatch) => {
        dispatch({ type: UPDATE_MENUE_ITEMS_AVAILABILITY_REQUEST });

        try {

            const { data } = await api.put(`api/admin/food/${foodId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    }
                }
            );
            await Swal.fire({
                title: "update menu item succesfully",
                position: "center",
               timer:1500,
               showConfirmButton:false,
                icon: "success"
              });
            console.log("Update menuItems Availability ", data);
            dispatch({ type: UPDATE_MENUE_ITEMS_AVAILABILITY_SUCCSESS, payload: data });
        } catch (error) {
            console.log("Error ", error);
            dispatch({ type: UPDATE_MENUE_ITEMS_AVAILABILITY_FAILURE, payload: error });
        }
    }

}

export const deleteFoodAction = ({ foodId, jwt }) => {

    return async (dispatch) => {
        dispatch({ type: DELETE_MENUE_ITEM_REQUEST });

        try {

            const { data } = await api.delete(`api/admin/food/${foodId}`,
                 
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    }
                }
            );
         
            console.log("Delete food ", data);
            dispatch({ type: DELETE_MENUE_ITEM_SUCCSESS, payload: foodId });
        } catch (error) {
            console.log("Error ", error);
            dispatch({ type: DELETE_MENUE_ITEM_FAILURE, payload: error });
        }
    }

}