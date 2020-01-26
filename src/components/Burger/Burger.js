import React from 'react';
import PropTypes from 'prop-types';

import styles from './Burger.module.css';
import BurgerIngredient, { BurgerIngredientType } from './BurgerIngredient/BurgerIngredient';

const Burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => (
        <BurgerIngredient key={igKey + i} type={igKey} />
      ))
    }).reduce((arr, el) => arr.concat(el), []);
  if (!transformedIngredients.length) {
    transformedIngredients = <p>Please start adding stuff</p>
  }
  return (
    <div className={styles.burger}>
      <BurgerIngredient type={BurgerIngredientType["BREAD-TOP"]} />
      {transformedIngredients}
      <BurgerIngredient type={BurgerIngredientType["BREAD-BOTTOM"]} />
    </div>
  );
}

Burger.propTypes = {
  ingredients: PropTypes.instanceOf(Object).isRequired,
}

export default Burger;