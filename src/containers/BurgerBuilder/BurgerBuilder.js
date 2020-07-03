import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../axios-orders";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as burgerBuilderActions from "../../store/actions";

const BurgerBuilder = (props) => {
  const { history } = props;

  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();
  const ingrdnts = useSelector((state) => state.burgerBuilder.ingredients);
  const ttlPrc = useSelector((state) => state.burgerBuilder.totalPrice);
  const error = useSelector((state) => state.burgerBuilder.error);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  const onInitIngredients = useCallback(
    () => dispatch(burgerBuilderActions.initIngredients()),
    [dispatch]
  );
  const onIngrdntAdd = (ingrdntName) =>
    dispatch(burgerBuilderActions.addIngredient(ingrdntName));
  const onIngrdntRemove = (ingrdntName) =>
    dispatch(burgerBuilderActions.removeIngredient(ingrdntName));
  const onInitPurchase = () => dispatch(burgerBuilderActions.purchaseInit());
  const onSetAuthRedirectPath = (path) =>
    dispatch(burgerBuilderActions.setAuthRedirectPath(path));

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

export default withErrorHandler(BurgerBuilder, axios);
