const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
  counter: 0,
};

// Reducer
const rootReducer = (state = initialState, action) => {
  console.log(action);
  const { type, value } = action;
  if (type === 'INC_COUNTER') {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }
  if (type === 'ADD_COUNTER') {
    return {
      ...state,
      counter: state.counter + value,
    };
  }
  return state;
};

// Store
const store = createStore(rootReducer);
console.log(store.getState());

// Subscription
store.subscribe(() => {
  console.log('SUbscription:', store.getState());
});

// Dispatching an action
store.dispatch({
  type: 'INC_COUNTER',
});
store.dispatch({
  type: 'ADD_COUNTER',
  value: 10,
});
console.log(store.getState());