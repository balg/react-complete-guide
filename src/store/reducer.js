import * as actionTypes from './actions';
import { BurgerIngredientData } from '../components/Burger/BurgerIngredient/BurgerIngredient';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
}

const reducer = (state = initialState, action) => {
  const { type, ingrdntName } = action;
  switch (type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [ingrdntName]: state.ingredients[ingrdntName] + 1,
        },
        totalPrice: state.totalPrice + BurgerIngredientData[ingrdntName].price
      }
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [ingrdntName]: state.ingredients[ingrdntName] - 1,
        },
        totalPrice: state.totalPrice - BurgerIngredientData[ingrdntName].price
      }
    default:
      return state;
  }
}

export default reducer;
