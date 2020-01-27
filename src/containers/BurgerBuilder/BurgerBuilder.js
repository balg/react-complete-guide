import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import { BurgerIngredientType, BurgerIngredientData } from "../../components/Burger/BurgerIngredient/BurgerIngredient";

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      [BurgerIngredientType.SALAD]: 0,
      [BurgerIngredientType.BACON]: 0,
      [BurgerIngredientType.CHEESE]: 1,
      [BurgerIngredientType.MEAT]: 1
    },
    totalPrice: 4,
  }

  addIngredientHandler = (type) => {
    this.setState(prevState => ({
      ingredients: {
        ...prevState.ingredients,
        [type]: prevState.ingredients[type] + 1,
      },
      totalPrice: prevState.totalPrice + BurgerIngredientData[type].price,
    }));
  }

  removeIngredientHandler = (type) => {

  }

  render() {
    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
        />
      </>
    );
  }
}

export default BurgerBuilder;
