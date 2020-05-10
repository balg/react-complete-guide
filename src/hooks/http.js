import { useReducer, useCallback } from "react";

const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null,
};

const httpReducer = (httpState, action) => {
  const { type, errorData, responseData, extra, identifier } = action;
  switch (type) {
    case "SEND":
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier,
      };
    case "RESPONSE":
      return { ...httpState, loading: false, data: responseData, extra };
    case "ERROR":
      return { loading: false, error: errorData };
    case "CLEAR":
      return initialState;
    default:
      throw new Error("Should not get there!");
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const sendRequest = useCallback((url, method, body, reqExtra, identifier) => {
    dispatchHttp({ type: "SEND", identifier });
    fetch(url, {
      method,
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        dispatchHttp({ type: "RESPONSE", responseData, extra: reqExtra });
      })
      .catch((err) => {
        dispatchHttp({ type: "ERROR", errorData: "Something went wrong!" });
      });
  }, []);

  const clear = useCallback(() => dispatchHttp({ type: "CLEAR" }), []);
  
  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest,
    reqExtra: httpState.extra,
    identifier: httpState.identifier,
    clear
  };
};

export default useHttp;
