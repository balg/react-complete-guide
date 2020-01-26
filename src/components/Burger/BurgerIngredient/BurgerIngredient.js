import React from 'react';
import PropTypes from 'prop-types';

import styles from './BurgerIngredient.module.css';

export const BurgerIngredientType = {
  'BREAD-BOTTOM': 'bread-bottom',
  'BREAD-TOP': 'bread-top',
  'MEAT': 'meat',
  'CHEESE': 'cheese',
  'BACON': 'bacon',
  'SALAD': 'salad',
}

const BurgerIngredient = props => {
  let ingredient = null;

  switch (props.type) {
    case BurgerIngredientType["BREAD-BOTTOM"]:
      ingredient = <div className={styles.BreadBottom} />;
      break;
    case BurgerIngredientType["BREAD-TOP"]:
      ingredient = (
        <div className={styles.BreadTop}>
          <div className={styles.Seeds1} />
          <div className={styles.Seeds2} />
        </div>
      );
      break;
    case BurgerIngredientType["MEAT"]:
      ingredient = <div className={styles.Meat} />;
      break;
    case BurgerIngredientType["CHEESE"]:
      ingredient = <div className={styles.Cheese} />;
      break;
    case BurgerIngredientType["SALAD"]:
      ingredient = <div className={styles.Salad} />;
      break;
    case BurgerIngredientType["BACON"]:
      ingredient = <div className={styles.Bacon} />;
      break;
    default:
      ingredient = null;
      break;
  }

  return ingredient;
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
}

export default BurgerIngredient;