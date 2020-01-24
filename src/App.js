import React, { Component } from 'react';
import styles from './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: '1', name: 'Max', age: 28 },
      { id: '2', name: 'Manu', age: 29 },
      { id: '3', name: 'Stephanie', age: 26 }
    ],
    showPersons: false,
  }

  deletePersonHandler = personIndex => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({
      persons
    });
  }

  nameChangedHandler = (event, id) => {
    const persons = [...this.state.persons];
    const personIndex = persons.findIndex(person => person.id === id);
    persons.splice(personIndex, 1, {
      ...persons[personIndex],
      name: event.target.value,
    })

    this.setState({
      persons
    });
  }

  togglePersonsHandler = () => {
    this.setState(prevState => ({
      showPersons: !prevState.showPersons
    }));
  }

  render() {
    let persons = null;
    let btnClasses = [styles.button];
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => (
            <Person
              key={person.id}
              name={person.name}
              age={person.age}
              click={() => this.deletePersonHandler(index)}
              changed={(event) => this.nameChangedHandler(event, person.id)}
            />
          ))}
        </div>
      );

      btnClasses.push(styles['bg-red']);
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push(styles.red);
    }
    if (this.state.persons.length <= 1) {
      classes.push(styles.bold);
    }

    return (
      <div className={styles.App}>
        <h1>Hi, I'm a React App!</h1>
        <p className={classes.join(' ')}>Is this really working?</p>
        <button className={btnClasses.join(' ')} onClick={this.togglePersonsHandler}>
          Toggle Persons
        </button>
        {persons}
      </div>
    );
  }
}

export default App;
