import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = props => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const isAuthenticated = useSelector(state => state.auth.token !== null);

  const sideDrawerClosedHandler = () => {
    setSideBarOpen(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideBarOpen(isOpen => !isOpen);
  };

  return (
    <>
      <Toolbar
        isAuthenticated={isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuthenticated={isAuthenticated}
        open={sideBarOpen}
        closed={sideDrawerClosedHandler}
      />
      <main className={styles.content}>{props.children}</main>
    </>
  );
};

export default Layout;
