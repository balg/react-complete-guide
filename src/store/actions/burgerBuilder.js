import * as actionTypes from "./actionTypes";

export const init = ingredients => {
  return {
    type: actionTypes.INIT,
    ingredients
  }
}

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
