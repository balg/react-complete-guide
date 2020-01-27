import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import styles from './SideDrawer.module.css';

const SideDrawer = props => {
  const attachedClasses = [
    styles.sideDrawer,
    ...(props.open ? [styles.open] : [styles.close]),
  ];
  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <NavigationItems />
      </div>
    </>
  );
};

export default SideDrawer;
