import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = (props) => {
  const { history, match } = props;
  const ingrdnts = useSelector(state => state.burgerBuilder.ingredients)
  const purchased = useSelector(state => state.order.purchased)

  const checkoutCancelledHandler = () => {
    history.goBack();
  };

  const checkoutContinuedHandler = () => {
    history.replace("checkout/contact-data");
  };

  let summary = <Redirect to="/" />;
  if (ingrdnts) {
    const purchasedRedirect = purchased ? <Redirect to="/" /> : null;
    summary = (
      <>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={ingrdnts}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        <Route
          path={`${match.path}/contact-data`}
          component={ContactData}
        />
      </>
    );
  }
  return summary;
};

export default Checkout;
