import * as actions from './actions';

const initialState = {
  persons: [],
}

const reducer = (state = initialState, action) => {
  console.log('[Reducer]', action);
  const { type, person, personId } = action;

  switch (type) {
    case actions.ADD:
      return {
        ...state,
        persons: [...state.persons, person],
      }
    case actions.DELETE:
      return {
        ...state,
        persons: state.persons.filter(({ id }) => id !== personId),
      }
  
    default:
      break;
  }
  return state;
}

export default reducer;