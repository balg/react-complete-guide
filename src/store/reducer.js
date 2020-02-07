import * as actionTypes from './actions';

const initialState = {
  counter: 0,
  results: [],
}

const reducer = (state = initialState, action) => {
  console.log('[Reducer]', action);
  const { type, value, resultId } = action;
  
  switch (type) {
    case actionTypes.INCREMENT:
      return {
        ...state,
        counter: state.counter + 1,
      }
    case actionTypes.DECREMENT:
      return {
        ...state,
        counter: state.counter - 1,
      }
    case actionTypes.ADD:
      return {
        ...state,
        counter: state.counter + value,
      }
    case actionTypes.SUBTRACT:
      return {
        ...state,
        counter: state.counter - value,
      }
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        results: [...state.results, {
          id: new Date(),
          value: state.counter,
        }],
      }
    case actionTypes.DELETE_RESULT:
      // const updatedResults = [...state.results];
      // updatedResults.splice(
      //   state.results.findIndex(({ id }) => id === resultId),
      //   1
      // );
      // Using Filter method is shorter
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