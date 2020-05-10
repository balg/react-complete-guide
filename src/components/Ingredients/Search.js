import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";
import { fireBasePath } from "../../utils/fetch";
import useHttp from "../../hooks/http";
import ErrorModal from "../UI/ErrorModal";

const Search = React.memo((props) => {
  const { onLoadIgredients } = props;
  const [enteredFilter, setEnteredFilter] = useState("");
  const inputRef = useRef();
  const { isLoading, data, error, sendRequest, clear } = useHttp();

  useEffect(() => {
    const timer = setTimeout(() => {
      // console.log(enteredFilter, inputRef.current.value)
      // if (enteredFilter === inputRef.current.value) {  // Do we really need this comparison here?
      const query = enteredFilter.length
        ? `?orderBy="title"&equalTo="${enteredFilter}"`
        : "";
      sendRequest(`${fireBasePath}/ingredients.json${query}`, "GET");
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, inputRef, sendRequest]);

  useEffect(() => {
    if (!isLoading && !error && data) {
      const fetchedIngredients = Object.entries(data).map(
        ([id, ingredientData]) => ({
          id,
          ...ingredientData,
        })
      );
      onLoadIgredients(fetchedIngredients);
    }
  }, [data, isLoading, error, onLoadIgredients]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
