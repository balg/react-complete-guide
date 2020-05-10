import React, { useReducer, useEffect, useCallback, useMemo } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";
import { fireBasePath } from "../../utils/fetch";
import useHttp from "../../hooks/http";

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

const Ingredients = () => {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const {
    isLoading,
    error,
    data,
    sendRequest,
    reqExtra,
    identifier,
    clear
  } = useHttp();

  useEffect(() => {
    if (!isLoading && !error && identifier === "REMOVE_INGR") {
      dispatch({ type: "DELETE", ingredientId: reqExtra });
    } else if (!isLoading && !error && identifier === "ADD_INGR") {
      dispatch({
        type: "ADD",
        ingredient: {
          id: data.name,
          ...reqExtra,
        },
      });
    }
  }, [data, reqExtra, identifier, isLoading, error]);

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    dispatch({
      type: "SET",
      ingredients: filteredIngredients,
    });
  }, []);

  const addIngredientHandler = useCallback(
    (ingredient) => {
      sendRequest(
        `${fireBasePath}/ingredients.json`,
        "POST",
        JSON.stringify(ingredient),
        ingredient,
        "ADD_INGR"
      );
    },
    [sendRequest]
  );

  const removeIngredientHandler = useCallback(
    (ingredientId) => {
      sendRequest(
        `${fireBasePath}/ingredients/${ingredientId}.json`,
        "DELETE",
        null,
        ingredientId,
        "REMOVE_INGR"
      );
    },
    [sendRequest]
  );

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={ingredients}
        onRemoveItem={removeIngredientHandler}
      />
    );
  }, [ingredients, removeIngredientHandler]);

  // const { loading, error } = httpState;
  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIgredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
