import * as actionTypes from "./actionTypes";

// sync action creator. This will reach the reducer
export const saveResult = result => {
  return {
    type: actionTypes.STORE_RESULT,
    result
  };
};
// async action creator handled by thunk.
export const storeResult = result => {
  return (dispatch, getState) => {
    setTimeout(() => {
      // Don't overuse getState. If you need some data rather pass it as an arg
      // const oldCounter = getState().ctr.counter;
      // console.log("oldCounter", oldCounter)
      dispatch(saveResult(result));
    }, 2000);
  };
};
export const deleteResult = resultId => {
  return {
    type: actionTypes.DELETE_RESULT,
    resultId
  };
};