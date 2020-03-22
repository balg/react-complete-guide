import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  counter: 0
};

const reducer = (state = initialState, action) => {
  console.log("[Counter Reducer]", action);
  const { type, value } = action;

  switch (type) {
    case actionTypes.INCREMENT:
      return updateObject(state, {
        counter: state.counter + 1
      });
    case actionTypes.DECREMENT:
      return updateObject(state, {
        counter: state.counter - 1
      });
    case actionTypes.ADD:
      return updateObject(state, {
        counter: state.counter + value
      });
    case actionTypes.SUBTRACT:
      return updateObject(state, {
        counter: state.counter - value
      });
    default:
      break;
  }
  return state;
};

export default reducer;
