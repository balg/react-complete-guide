const initialState = {
  counter: 0,
}

const reducer = (state = initialState, action) => {
  console.log('[Reducer]', action);
  const { type, value } = action;
  
  switch (type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter + 1,
      }
    case 'DECREMENT':
      return {
        ...state,
        counter: state.counter - 1,
      }
    case 'ADD':
      return {
        ...state,
        counter: state.counter + value,
      }
    case 'SUBTRACT':
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