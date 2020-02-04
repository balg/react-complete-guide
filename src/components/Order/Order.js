import React from 'react';
import styles from './Order.module.css';

const mapIngredient = ([ingredient, amount]) => (
  <span style={{
    textTransform: 'capitalize',
    display: 'inline-block',
    margin: '0 8px',
    border: '1px solid #ccc',
    padding: '5px',
  }} key={ingredient}>{ingredient} ({amount})</span>
);

const Order = props => {
  const ingredients = Object.entries(props.ingredients || {})
    .map(mapIngredient);

  return (
    <div className={styles.order}>
      <p>{ingredients}</p>
      <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
  );
}

export default Order;