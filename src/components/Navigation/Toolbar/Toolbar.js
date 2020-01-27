import React from 'react';

import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = props => (
  <header className={styles.toolbar}>
    <div>MENU</div>
    <div className={styles.logo}>
      <Logo />
    </div>
    <div className="desktopOnly full-height">
      <NavigationItems />
    </div>
  </header>
);

export default Toolbar;