import React from 'react';

import { BurgerIngredientType } from '../BurgerIngredient/BurgerIngredient';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: BurgerIngredientType.SALAD },
  { label: 'Bacon', type: BurgerIngredientType.BACON },
  { label: 'Cheese', type: BurgerIngredientType.CHEESE },
  { label: 'Meat', type: BurgerIngredientType.MEAT },
];

const BuildControls = props => (
  <div className={styles.buildControls}>
    {controls.map(c => (
      <BuildControl key={c.label} label={c.label} />
    ))}
  </div>
);

export default BuildControls;