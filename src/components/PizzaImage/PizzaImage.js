import React from "react";

import classes from "./PizzaImage.css";
import PizzaImg from "../../assets/pizza.jpg";

const PizzaImage = (props) => (
  <div className={classes.pizzaImage}>
    <img src={PizzaImg} className={classes.pizzaImg} />
  </div>
);

export default PizzaImage;
