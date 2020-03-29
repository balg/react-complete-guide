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
  error: false,
  building: false,
};

const addIngredient = (state, action) => {
  const { ingrdntName } = action;
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [ingrdntName]: state.ingredients[ingrdntName] + 1
    },
    totalPrice: state.totalPrice + BurgerIngredientData[ingrdntName].price,
    building: true
  };
};

const removeIngredient = (state, action) => {
  const { ingrdntName } = action;
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [ingrdntName]: state.ingredients[ingrdntName] - 1
    },
    totalPrice: state.totalPrice - BurgerIngredientData[ingrdntName].price,
    building: true
  };
};

const setIngredients = (state, action) => {
  const { ingredients } = action;
  return {
    ...state,
    ingredients,
    totalPrice: 4,
    error: false,
    building: false
  };
};

const fetchIngredientsFailed = state => ({
  ...state,
  error: true
});

const reducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state);
    default:
      return state;
  }
};

export default reducer;
