import React, { useEffect, useRef, useContext } from 'react';
import styles from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const Cockpit = props => {
  const toggleButtonRef = useRef(null);
  const authContext = useContext(AuthContext);

  console.log(authContext.authenticated);

  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    // const timer = setTimeout(() => {
    //   alert('Saved data to cloud!');
    // }, 1000);
    toggleButtonRef.current.click();
    return () => {
      // clearTimeout(timer);
      console.log('[Cockpit.js] cleanup work in useEffect');
    }
  }, []); // empty array - The function inside will be executed only when component is (first) rendered and unmounted

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');
    return () => {
      console.log('[Cockpit.js] cleanup work in 2nd useEffect');
    }
  });

  const classes = [];
  let btnClasses = [styles.button];
  if (props.personsLength <= 2) {
    classes.push(styles.red);
  }
  if (props.personsLength <= 1) {
    classes.push(styles.bold);
  }
  if (props.showPersons) {
    btnClasses.push(styles['bg-red']);
  }

  return (
    <div>
      <h1>{props.title}</h1>
      <p className={classes.join(' ')}>Is this really working?</p>
      <button
        ref={toggleButtonRef}
        className={btnClasses.join(' ')}
        onClick={props.btnClicked}
      >
        Toggle Persons
      </button>
      <button className={styles.button} onClick={authContext.login}>Log in</button>
    </div>
  );
};

export default React.memo(Cockpit);