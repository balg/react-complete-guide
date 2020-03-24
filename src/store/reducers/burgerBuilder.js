import * as actionTypes from "../actions/actionTypes";
import { BurgerIngredientData } from "../../components/Burger/BurgerIngredient/BurgerIngredient";

const initialState = {
  // ingredients: {
  //   salad: 0,
  //   bacon: 0,
  //   cheese: 0,
  //   meat: 0,
  // },
  ingredients: null,
  totalPrice: 4,
  error: false
};

const setIngredients = (state, action) => {
  const { ingredients } = action;
  return {
    ...state,
    ingredients,
    totalPrice: 4,
    error: false
  };
};

const fetchIngredientsFailed = state => ({
  ...state,
  error: true
});

const reducer = (state = initialState, action) => {
  const { type, ingrdntName } = action;
  switch (type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [ingrdntName]: state.ingredients[ingrdntName] + 1
        },
        totalPrice: state.totalPrice + BurgerIngredientData[ingrdntName].price
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [ingrdntName]: state.ingredients[ingrdntName] - 1
        },
        totalPrice: state.totalPrice - BurgerIngredientData[ingrdntName].price
      };
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state);
    default:
      return state;
  }
};

export default reducer;
