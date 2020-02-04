import React from 'react';

import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => (
  <nav className={styles.navigationItems}>
    <ul>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/orders">
        Orders
      </NavigationItem>
    </ul>
  </nav>
);

export default NavigationItems;