import * as actionTypes from '../actions/actionTypes';

const initialState = {
  results: []
}

const reducer = (state = initialState, action) => {
  console.log('[Result Reducer]', action);
  const { type, resultId, result } = action;
  
  switch (type) {
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        results: [...state.results, {
          id: new Date(),
          value: result,
        }],
      }
    case actionTypes.DELETE_RESULT:
      const updatedResults = state.results.filter(({ id }) => id !== resultId);
      return {
        ...state,
        results: updatedResults
      }
    default:
      break;
  }
  return state;
}

export default reducer;