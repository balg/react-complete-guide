import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import { BurgerIngredientData } from "../../components/Burger/BurgerIngredient/BurgerIngredient";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from "../../components/UI/Spinner/Spinner";

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    axios.get('/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data })
      }).catch(error => {
        this.setState({ error: true });
      });
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

  purchaseContinueHandler = () => {
    // alert('You continue!');
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Balika',
        address: {
          street: 'Teststreet 1',
          zipCode: '2343145',
          country: 'Hungary',
        },
        email: 'test@test.test',
      },
      deliveryMethod: 'fastest',
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      });
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

    let orderSummary = null;
    let burger = this.state.error
      ? <p>Ingredients could not be loaded.</p>
      : <Spinner />
    if (this.state.ingredients) {
      burger = (
        <>
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
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
    }
    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
