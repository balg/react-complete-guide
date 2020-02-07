import React, { Component } from "react";
import { connect } from 'react-redux';

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import { BurgerIngredientData } from "../../components/Burger/BurgerIngredient/BurgerIngredient";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actionTypes from '../../store/actions';

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
        this.props.onFetched(response.data);
      }).catch(error => {
        this.setState({ error: true });
      });
  }

  updatePurchaseState = () => {
    const ingredients = { ...this.props.ingrdnts }
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
    if (this.props.ingrdnts[type] <= 0) {
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
    let queryString = Object.entries(this.props.ingrdnts)
      .filter(([ingredient, amount]) => amount)
      .map(([ingredient, amount]) => `${ingredient}=${amount}`)
      .join('&');
    queryString = `${queryString}&price=${this.state.totalPrice}`;
    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`
    });
  }

  render() {
    const disabledInfo = {
      ...this.props.ingrdnts
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
    if (this.props.ingrdnts) {
      burger = (
        <>
          <Burger ingredients={this.props.ingrdnts} />
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
        ingredients={this.props.ingrdnts}
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

const mapStateToProps = state => ({
  ingrdnts: state.ingredients,
  ttlPrc: state.totalPrice,
});

const mapDispatchToProps = dispatch => ({
  onFetched: ingredients => dispatch({
    type: actionTypes.INIT,
    ingredients
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
