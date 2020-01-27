import React from 'react';

import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => (
  <nav className={styles.navigationItems}>
    <ul>
      <NavigationItem link="/" active>
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/">
        Checkout
      </NavigationItem>
    </ul>
  </nav>
);

export default NavigationItems;