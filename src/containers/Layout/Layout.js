import React, { useState } from 'react';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  
  const sideDrawerClosedHandler = () => {
    setSideBarOpen(false);
  }

  const sideDrawerToggleHandler = () => {
    setSideBarOpen(isOpen => !isOpen);
  }
  
  return (
    <>
      <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer open={sideBarOpen} closed={sideDrawerClosedHandler} />
      <main className={styles.content}>
        {props.children}
      </main>
    </>
  );
};

export default Layout;