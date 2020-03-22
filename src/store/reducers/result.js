import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  results: []
};

const deleteResult = (state, action) => {
  const { resultId } = action;
  const updatedResults = state.results.filter(({ id }) => id !== resultId);
  return updateObject(state, {
    results: updatedResults
  });
};

const storeResult = (state, action) => {
  const { result } = action;
  return updateObject(state, {
    results: [
      ...state.results,
      {
        id: new Date(),
        value: result
      }
    ]
  });
};

const reducer = (state = initialState, action) => {
  console.log("[Result Reducer]", action);
  const { type } = action;

  switch (type) {
    case actionTypes.STORE_RESULT:
      return storeResult(state, action);
    case actionTypes.DELETE_RESULT:
      return deleteResult(state, action);
    default:
      break;
  }
  return state;
};

export default reducer;
