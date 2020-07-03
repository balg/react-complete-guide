import React, { useState } from "react";

const initialProducts = [
  {
    id: "p1",
    title: "Red Scarf",
    description: "A pretty red scarf.",
    isFavorite: false,
  },
  {
    id: "p2",
    title: "Blue T-Shirt",
    description: "A pretty blue t-shirt.",
    isFavorite: false,
  },
  {
    id: "p3",
    title: "Green Trousers",
    description: "A pair of lightly green trousers.",
    isFavorite: false,
  },
  {
    id: "p4",
    title: "Orange Hat",
    description: "Street style! An orange hat.",
    isFavorite: false,
  },
];

export const ProductsContext = React.createContext({
  products: [],
  toggleFav: id => {},
});

export default (props) => {
  const [productList, setProductList] = useState(initialProducts);

  const toggleFavorite = (productId) => {
    setProductList((currentProdList) =>
      currentProdList.map((item) => {
        if (item.id !== productId) return item;
        return {
          ...item,
          isFavorite: !item.isFavorite,
        };
      })
    );
  };

  return (
    <ProductsContext.Provider
      value={{ products: productList, toggleFav: toggleFavorite }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};
