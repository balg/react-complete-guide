const initialState = {
  counter: 0,
  results: [],
}

const reducer = (state = initialState, action) => {
  console.log('[Reducer]', action);
  const { type, value, resultId } = action;
  
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
    case 'STORE_RESULT':
      return {
        ...state,
        results: [...state.results, {
          id: new Date(),
          value: state.counter,
        }],
      }
    case 'DELETE_RESULT':
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