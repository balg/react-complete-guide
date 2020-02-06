const initialState = {
  counter: 0,
}

const reducer = (state = initialState, action) => {
  console.log('[Reducer]', action);
  const { type } = action;
  if (type === 'INCREMENT') {
    return {
      ...state,
      counter: state.counter + 1,
    }
  }
  return state;
}

export default reducer;