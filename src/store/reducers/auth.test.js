import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirect: "/",
  };

  it("should return the initial state", () => {
    const state = reducer(undefined, {});

    expect(state).toEqual(initialState);
  });

  it("should store the token upon login", () => {
    const action = {
      type: actionTypes.AUTH_SUCCESS,
      idToken: "idToken",
      userId: "userId",
    };
    const expectedState = {
      ...initialState,
      token: "idToken",
      userId: "userId",
      error: null,
      loading: false,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expectedState);
  });
});
