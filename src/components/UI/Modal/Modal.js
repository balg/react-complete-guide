import React from "react";

import styles from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => (
  <>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div
      className={styles.modal}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0",
      }}
    >
      {props.children}
    </div>
  </>
);
// This still does not prevent re-renders as orderSummary (will be in children) will be re-rendered on every keystroke in BurgerBuilder
export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
