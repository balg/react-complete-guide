import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import Person from './Person/Person';

const StyledButton = styled.button`
  background-color: ${props => props.alt ? 'red' : 'green'};
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
    color: black;
  }
`;

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

      // style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor: 'salmon',
      //   color: 'black'
      // }
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App!</h1>
        <p className={classes.join(' ')}>Is this really working?</p>
        <StyledButton alt={this.state.showPersons} onClick={this.togglePersonsHandler}>
          Toggle Persons
        </StyledButton>
        {persons}
      </div>
    );
  }
}

export default App;
