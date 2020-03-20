import * as actionTypes from '../actions/actions';

const initialState = {
  counter: 0
}

const reducer = (state = initialState, action) => {
  console.log('[Counter Reducer]', action);
  const { type, value } = action;
  
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
    default:
      break;
  }
  return state;
}

export default reducer;