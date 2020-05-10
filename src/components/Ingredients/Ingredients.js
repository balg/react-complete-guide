import React, { useReducer, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";
import { fireBasePath, headers } from "../../utils/fetch";

const ingredientReducer = (currentIngredients, action) => {
  const { type, ingredients, ingredient, ingredientId } = action;
  switch (type) {
    case "SET":
      return ingredients;
    case "ADD":
      return [...currentIngredients, ingredient];
    case "DELETE":
      return currentIngredients.filter((i) => i.id !== ingredientId);
    default:
      throw new Error("Should not get there!");
  }
};

const httpReducer = (httpState, action) => {
  const { type, errorData } = action;
  switch (type) {
    case "SEND":
      return { loading: true, error: null };
    case "RESPONSE":
      return { ...httpState, loading: false };
    case "ERROR":
      return { loading: false, error: errorData };
    case "CLEAR":
      return { ...httpState, error: null };
    default:
      throw new Error("Should not get there!");
  }
};

const Ingredients = () => {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });

  useEffect(() => {
    console.log("RENDERING INGREDIENTS");
  });

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    dispatch({
      type: "SET",
      ingredients: filteredIngredients,
    });
  }, []);

  const addIngredientHandler = (ingredient) => {
    dispatchHttp({ type: "SEND" });
    fetch(`${fireBasePath}/ingredients.json`, {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers,
    })
      .then((response) => {
        dispatchHttp({ type: "RESPONSE" });
        return response.json();
      })
      .then((responseData) => {
        dispatch({
          type: "ADD",
          ingredient: {
            id: responseData.name,
            ...ingredient,
          },
        });
      })
      .catch((err) => {
        dispatchHttp({ type: "ERROR", errorData: err });
      });
  };

  const removeIngredientHandler = (ingredientId) => {
    dispatchHttp({ type: "SEND" });
    fetch(`${fireBasePath}/ingredients/${ingredientId}.json`, {
      method: "DELETE",
    })
      .then((response) => {
        dispatchHttp({ type: "RESPONSE" });
        dispatch({
          type: "DELETE",
          ingredientId,
        });
      })
      .catch((err) => {
        dispatchHttp({ type: "ERROR", errorData: err });
      });
  };

  const clearError = () => {
    dispatch({ type: "CLEAR" });
  };

  const { loading, error } = httpState;
  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={loading}
      />

      <section>
        <Search onLoadIgredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
