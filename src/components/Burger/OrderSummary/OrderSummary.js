import React from 'react';
import { BurgerIngredientData } from '../BurgerIngredient/BurgerIngredient';

const OrderSummary = props => {
  const ingredientSummary = Object.entries(props.ingredients)
    .filter(([type, count]) => count > 0)
    .map(([type, count]) => (
      <li key={type}>
        <span>{BurgerIngredientData[type].label}</span>: {count}
      </li>
    ));
  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to Checkout?</p>
    </>
  );
};

export default OrderSummary;