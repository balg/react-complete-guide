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
    {controls.map(c => (
      <BuildControl
        key={c.label}
        label={c.label}
        added={() => props.ingredientAdded(c.type)}
        removed={() => props.ingredientRemoved(c.type)}
      />
    ))}
  </div>
);

export default BuildControls;