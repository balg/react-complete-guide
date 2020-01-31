import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import styles from './CheckoutSummary.module.css';

const CheckoutSummary = props => {
  return (
    <div className={styles.checkoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="danger" clicked>CANCEL</Button>
      <Button btnType="success" clicked>CONTINUE</Button>
    </div>
  );
};

export default CheckoutSummary;