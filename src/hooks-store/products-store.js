import { initStore } from "./store";

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

const configureStore = () => {
  const actions = {
    TOGGLE_FAV: (state, productId) => {
      return {
        products: state.products.map((item) => {
          if (item.id !== productId) return item;
          return {
            ...item,
            isFavorite: !item.isFavorite,
          };
        })
      }
    }
  }
  initStore(actions, { products: initialProducts })
}

export default configureStore;
