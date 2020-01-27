import React from 'react';

import { BurgerIngredientType, BurgerIngredientData } from '../BurgerIngredient/BurgerIngredient';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = Object.entries(BurgerIngredientData)
  .filter(([type, data]) =>
    type !== BurgerIngredientType["BREAD-BOTTOM"] &&
    type !== BurgerIngredientType["BREAD-TOP"])
  .map(([type, data]) => ({
    type,
    label: data.label
  }));

const BuildControls = props => (
  <div className={styles.buildControls}>
    <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(c => (
      <BuildControl
        key={c.label}
        label={c.label}
        added={() => props.ingredientAdded(c.type)}
        removed={() => props.ingredientRemoved(c.type)}
        disabled={props.disabled[c.type]}
      />
    ))}
    <button className={styles.orderButton} disabled={!props.purchaseable}>ORDER NOW</button>
  </div>
);

export default BuildControls;