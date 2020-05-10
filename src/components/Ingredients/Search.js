import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";
import { fireBasePath, headers } from "../../utils/fetch";

const Search = React.memo((props) => {
  const { onLoadIgredients } = props;
  const [enteredFilter, setEnteredFilter] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      // console.log(enteredFilter, inputRef.current.value)
      // if (enteredFilter === inputRef.current.value) {  // Do we really need this comparison here?
        const query = enteredFilter.length
          ? `?orderBy="title"&equalTo="${enteredFilter}"`
          : "";
        fetch(`${fireBasePath}/ingredients.json${query}`, {
          headers,
        })
          .then((response) => response.json())
          .then((responseData) => {
            const fetchedIngredients = Object.entries(responseData).map(
              ([id, ingredientData]) => ({
                id,
                ...ingredientData,
              })
            );
            onLoadIgredients(fetchedIngredients);
          });
      // }
    }, 500);
    return () => {
      clearTimeout(timer);
    }
  }, [enteredFilter, onLoadIgredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
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
