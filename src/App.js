import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: "Max", age: 28 },
      { name: "Manu", age: 29 },
      { name: "Stephanie", age: 26 },
    ],
    otherState: 'some other value',
    showPersons: false,
  }

  deletePersonHandler = ( personIndex ) => {
    //Mivel referencia alapu atadas van, mellekhatasai lehetnek, ha direktben a this.state.persons-t piszkaljuk.
    //A state adatait kozvetlenul ne modositsuk, hanem csinaljunk masolatot, azon dolgozunk, majd setState-tel vissza.
    //Max azt mondja: mukodik, de kiszamithatatlan. A kovetendo megoldas, ha atmasoljuk egy masik array-be.
    //Erre van a slice (arg-ok nelkul az eredeti masolatat adja vissza) vagy a ... operator egy array def-en belul, ami
    //nagyjabol annyit jelent: csinalj egy array-t ennek az array-nek a darabjaibol
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  nameChangedHandler = (event) => {
    this.setState( {
      persons: [
        { name: 'Max', age: 28 },
        { name: event.target.value, age: 29 },
        { name: "Stephanie", age: 26 },
      ]
    } );
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( {showPersons: !doesShow} );
  }

  render() {

    const style = {
      backgroundColor: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer",
    };

    let persons = null;

    if ( this.state.showPersons ) {
      persons = (
        <div>
          {this.state.persons.map( (person, index) => {
            return <Person 
              name={person.name}
              age={person.age} 
              click={() => this.deletePersonHandler(index)} />
          } )}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is just a test.</p>
        <button 
          style={ style }
          onClick={ this.togglePersonsHandler }>Toggle Persons</button>

        {persons}
      </div>
    );
  }
}

export default App;
