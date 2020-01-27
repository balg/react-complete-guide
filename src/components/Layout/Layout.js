import React from 'react';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const Layout = props => (
  <>
    {/* <div>Toolbar, SideDrawer</div> */}
    <Toolbar />
    <main className={styles.content}>
      {props.children}
    </main>
  </>
);

export default Layout;