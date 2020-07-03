import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "../../axios-orders";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as burgerBuilderActions from "../../store/actions";

const BurgerBuilder = (props) => {
  const {
    onInitIngredients,
    ingrdnts,
    onIngrdntAdd,
    onIngrdntRemove,
    isAuthenticated,
    onSetAuthRedirectPath,
    history,
    onInitPurchase,
    error,
    ttlPrc,
  } = props;

  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = () => {
    const sum = Object.values(ingrdnts).reduce(
      (subTotal, price) => subTotal + price,
      0
    );
    return sum > 0;
  };

  const addIngredientHandler = (type) => {
    onIngrdntAdd(type);
  };

  const removeIngredientHandler = (type) => {
    if (ingrdnts[type] <= 0) {
      return;
    }
    onIngrdntRemove(type);
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    history.push({
      pathname: "/checkout",
    });
  };

  const disabledInfo = {
    ...ingrdnts,
  };
  for (const key in disabledInfo) {
    if (disabledInfo.hasOwnProperty(key)) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
  }

  let orderSummary = null;
  let burger = error ? <p>Ingredients could not be loaded.</p> : <Spinner />;
  if (ingrdnts) {
    burger = (
      <>
        <Burger ingredients={ingrdnts} />
        <BuildControls
          ingredientAdded={addIngredientHandler}
          ingredientRemoved={removeIngredientHandler}
          disabled={disabledInfo}
          purchaseable={updatePurchaseState()}
          price={ttlPrc}
          ordered={purchaseHandler}
          isAuthenticated={isAuthenticated}
        />
      </>
    );
    orderSummary = (
      <OrderSummary
        ingredients={ingrdnts}
        price={ttlPrc}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }

  return (
    <>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </>
  );
};

const mapStateToProps = (state) => ({
  ingrdnts: state.burgerBuilder.ingredients,
  ttlPrc: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch) => ({
  onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
  onIngrdntAdd: (ingrdntName) =>
    dispatch(burgerBuilderActions.addIngredient(ingrdntName)),
  onIngrdntRemove: (ingrdntName) =>
    dispatch(burgerBuilderActions.removeIngredient(ingrdntName)),
  onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
  onSetAuthRedirectPath: (path) =>
    dispatch(burgerBuilderActions.setAuthRedirectPath(path)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
