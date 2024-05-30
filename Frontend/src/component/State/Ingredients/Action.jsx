import { api } from '../../config/api';
import { CREATE_INGREDIENT_CATEGORY_FAILURE, CREATE_INGREDIENT_CATEGORY_REQUEST, CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENT_FAILURE, CREATE_INGREDIENT_REQUEST, CREATE_INGREDIENT_SUCCESS, GET_INGREDIENTS, GET_INGREDIENT_CATEGORY_FAILURE, GET_INGREDIENT_CATEGORY_REQUEST, GET_INGREDIENT_CATEGORY_SUCCESS, UPDATE_STOCKS } from './ActionTypes';


export const getIngredientsOfRestaurant = ({ id, jwt }) => {

    return async (dispach) => {



        try {

            const response = await api.get(`/api/admin/ingredients/restaurant/${id}`, {

                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
            );

            dispach({ type: GET_INGREDIENTS, payload: response.data });
            console.log("Get Ingredients ", response.data);
        } catch (error) {
            console.log(error)
        }
    }

}


export const createIngredient = ({ data, jwt }) => {

    return async (dispach) => {

        dispach({ type: CREATE_INGREDIENT_REQUEST });

        try {

            const response = await api.post(`/api/admin/ingredients`, data, {

                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
            );

            dispach({ type: CREATE_INGREDIENT_SUCCESS, payload: response.data });
            console.log("Create ingredient", data);
        } catch (error) {
            dispach({ type: CREATE_INGREDIENT_FAILURE, payload: error });
            console.log(error);
        }
    }

}

export const createIngredientategory = ({ data, jwt }) => {

    return async (dispach) => {

        dispach({ type: CREATE_INGREDIENT_CATEGORY_REQUEST });

        try {

            const response = await api.post(`/api/admin/ingredients/category`, data, {

                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
            );

            dispach({ type: CREATE_INGREDIENT_CATEGORY_SUCCESS, payload: response.data });
            console.log("Create ingredient category", data);
        } catch (error) {
            dispach({ type: CREATE_INGREDIENT_CATEGORY_FAILURE, payload: error });
            console.log(error);
        }
    }

}

export const getIngredientCategory = ({ id, jwt }) => {

    return async (dispach) => {

        dispach({ type: GET_INGREDIENT_CATEGORY_REQUEST });

        try {

            const response = await api.get(`/api/admin/ingredients/restaurant/${id}/category`, {

                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
            );

            dispach({ type: GET_INGREDIENT_CATEGORY_SUCCESS, payload: response.data });
            console.log("Get ingredient category", response.data);
        } catch (error) {
            dispach({ type: GET_INGREDIENT_CATEGORY_FAILURE, payload: error });
            console.log(error);
        }
    }

}


export const updateStockOfIngredient = ({ id, jwt }) => {

    return async (dispach) => {



        try {

            const { data } = await api.put(`/api/admin/ingredients/${id}/stock`, {}, {

                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
            );

            dispach({ type: UPDATE_STOCKS, payload: data });
            console.log("Update stocks", data)
        } catch (error) {
            dispach(error);
        }
    }

}