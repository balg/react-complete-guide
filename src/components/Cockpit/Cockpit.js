import React from 'react';
import styles from './Cockpit.css';

const Cockpit = props => {
  const classes = [];
  let btnClasses = [styles.button];
  if (props.persons.length <= 2) {
    classes.push(styles.red);
  }
  if (props.persons.length <= 1) {
    classes.push(styles.bold);
  }
  if (props.showPersons) {
    btnClasses.push(styles['bg-red']);
  }

  return (
    <div>
      <h1>Hi, I'm a React App!</h1>
      <p className={classes.join(' ')}>Is this really working?</p>
      <button className={btnClasses.join(' ')} onClick={props.btnClicked}>
        Toggle Persons
      </button>
    </div>
  );
};

export default Cockpit;