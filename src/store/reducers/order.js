import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseInit = state => {
  return {
    ...state,
    purchased: false
  };
};

const purchaseBurgerStart = state => {
  return {
    ...state,
    loading: true
  };
};

const purchaseBurgerSuccess = (state, action) => {
  const { orderId, orderData } = action;
  const newOrder = {
    ...orderData,
    id: orderId
  };
  return {
    ...state,
    loading: false,
    purchased: true,
    orders: [...state.orders, newOrder]
  };
};

const purchaseBurgerFail = (state, action) => {
  const { error } = action;
  return {
    ...state,
    error,
    loading: false
  };
};

const reducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);
    default:
      return state;
  }
};

export default reducer;
