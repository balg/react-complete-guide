import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = ingrdntName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingrdntName
  };
};

export const removeIngredient = ingrdntName => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingrdntName
  };
};

const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  };
};

const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED
});

// Thunk
export const initIngredients = () => {
  return dispatch => {
    axios
      .get("/ingredients.json")
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
