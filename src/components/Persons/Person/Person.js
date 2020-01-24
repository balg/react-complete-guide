import React, { Component } from 'react';
import withClass from '../../../hoc/withClass';
import styles from './Person.css';

class Person extends Component {
  render() {
    console.log('[Person.js] rendering...')
    return (
      <React.Fragment>
        <p className={`paragraph ${styles.intro}`} onClick={this.props.click} > I'm {this.props.name} and I am {this.props.age} years old!</p>
        <p> {this.props.children}</p >
        <input type="text" onChange={this.props.changed} value={this.props.name} />
      </React.Fragment>
    )
  }
}

export default withClass(Person, styles.Person);
