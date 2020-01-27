import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import { BurgerIngredientType, BurgerIngredientData } from "../../components/Burger/BurgerIngredient/BurgerIngredient";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      [BurgerIngredientType.SALAD]: 0,
      [BurgerIngredientType.BACON]: 0,
      [BurgerIngredientType.CHEESE]: 0,
      [BurgerIngredientType.MEAT]: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
  }

  updatePurchaseState = () => {
    const ingredients = { ...this.state.ingredients }
    const sum = Object.values(ingredients).reduce((subTotal, price) => subTotal + price, 0);
    this.setState({ purchaseable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    this.setState(prevState => ({
      ingredients: {
        ...prevState.ingredients,
        [type]: prevState.ingredients[type] + 1,
      },
      totalPrice: prevState.totalPrice + BurgerIngredientData[type].price,
    }), this.updatePurchaseState);
  }

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }
    this.setState(prevState => ({
      ingredients: {
        ...prevState.ingredients,
        [type]: prevState.ingredients[type] - 1,
      },
      totalPrice: prevState.totalPrice - BurgerIngredientData[type].price,
    }), this.updatePurchaseState);
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (const key in disabledInfo) {
      if (disabledInfo.hasOwnProperty(key)) {
        disabledInfo[key] = disabledInfo[key] <= 0
      }
    }
    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchaseable={this.state.purchaseable}
          price={this.state.totalPrice}
          ordered={this.purchaseHandler}
        />
      </>
    );
  }
}

export default BurgerBuilder;
