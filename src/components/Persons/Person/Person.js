import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withClass from '../../../hoc/withClass';
import styles from './Person.css';

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputReference = React.createRef();
  }

  componentDidMount() {
    console.log('[Person.js] focus', this.inputReference.current)
    // this.inputReference.focus();
    this.inputReference.current.focus();
  }

  render() {
    console.log('[Person.js] rendering...')
    return (
      <React.Fragment>
        {this.props.isAuth ? <p>Authenticated!</p> : <p>Please log in</p>}
        <p className={`paragraph ${styles.intro}`} onClick={this.props.click} > I'm {this.props.name} and I am {this.props.age} years old!</p>
        <p> {this.props.children}</p >
        <input
          // ref={(inputRef) => {this.inputReference = inputRef}}
          ref={this.inputReference}
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </React.Fragment>
    )
  }
}

Person.propTypes = {
  click: PropTypes.func.isRequired,
  changed: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired
};

export default withClass(Person, styles.Person);
