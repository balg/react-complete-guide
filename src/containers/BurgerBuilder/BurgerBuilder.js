import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios-orders";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as burgerBuilderActions from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    console.log(this.props);
    this.props.onInitIngredients();
  }

  updatePurchaseState = () => {
    const sum = Object.values(this.props.ingrdnts).reduce(
      (subTotal, price) => subTotal + price,
      0
    );
    return sum > 0;
  };

  addIngredientHandler = type => {
    this.props.onIngrdntAdd(type);
  };

  removeIngredientHandler = type => {
    if (this.props.ingrdnts[type] <= 0) {
      return;
    }
    this.props.onIngrdntRemove(type);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push({
      pathname: "/checkout"
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ingrdnts
    };
    for (const key in disabledInfo) {
      if (disabledInfo.hasOwnProperty(key)) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients could not be loaded.</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingrdnts) {
      burger = (
        <>
          <Burger ingredients={this.props.ingrdnts} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchaseable={this.updatePurchaseState()}
            price={this.props.ttlPrc}
            ordered={this.purchaseHandler}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingrdnts}
          price={this.props.ttlPrc}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
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
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
  onIngrdntAdd: ingrdntName =>
    dispatch(burgerBuilderActions.addIngredient(ingrdntName)),
  onIngrdntRemove: ingrdntName =>
    dispatch(burgerBuilderActions.removeIngredient(ingrdntName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
