import React from 'react';

import styles from './Toolbar.module.css';

const Toolbar = props => (
  <header className={styles.toolbar}>
    <div>MENU</div>
    <div>LOGO</div>
    <nav>
      ...
    </nav>
  </header>
);

export default Toolbar;