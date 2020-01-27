import React from 'react';
import { BurgerIngredientData } from '../BurgerIngredient/BurgerIngredient';
import Button from '../../UI/Button/Button';

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
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType="danger" clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button btnType="success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </>
  );
};

export default OrderSummary;