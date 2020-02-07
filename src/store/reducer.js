import * as actionTypes from './actions';

const initialState = {
  ingredients: null,
  totalPrice: 4,
}

const reducer = (state = initialState, action) => {
  const { type, ingredients } = action;
  switch (type) {
    case actionTypes.INIT:
      return {
        ...state,
        ingredients
      }
    default:
      break;
  }
  return state;
}

export default reducer;
