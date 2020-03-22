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
  return dispatch => {
    setTimeout(() => {
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