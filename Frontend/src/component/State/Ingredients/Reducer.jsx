import { CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENT_SUCCESS, GET_INGREDIENTS, GET_INGREDIENT_CATEGORY_SUCCESS, UPDATE_STOCKS } from "./ActionTypes";

const initialState = {

    ingredients: [],
    update: null,
    category: []
};

export const ingredientsReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_INGREDIENTS:

            return {

                ...state,
                ingredients: action.payload,

            };

        case GET_INGREDIENT_CATEGORY_SUCCESS:

            return {

                ...state,
                category: action.payload,

            };

        case CREATE_INGREDIENT_CATEGORY_SUCCESS:

            return {

                ...state,
                category: [...state.category, action.payload],

            };

        case CREATE_INGREDIENT_SUCCESS:

            return {

                ...state,
                ingredients: [...state.ingredients, action.payload],

            };

        case UPDATE_STOCKS:

            return {

                ...state,
                ingredients: state.ingredients.map(
                    (item) => item.id === action.payload.id ? action.payload : item
                ),

            };

        default:
            return state;
    }
}