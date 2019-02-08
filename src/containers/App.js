import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  state = {
    persons: [
      { id: "01", name: "Max", age: 28 },
      { id: "02", name: "Manu", age: 29 },
      { id: "03", name: "Stephanie", age: 26 },
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

  nameChangedHandler = ( event, id ) => {
    const personIndex = this.state.persons.findIndex( p => {
      return p.id === id;
    } );

    //const person = this.state.persons[ personIndex ]; helyett... (do not mutate state data!! A person itt egy JS object, tehat ref alapu atadas van!)
    const person = {
      ...this.state.persons[ personIndex ] // A ... kipakolja a person propjait bele a mi uj JS objectunkbe
    };

    // Object.assign atpakolja az elso arg-ba a masodik arg tartalmat! Ez is mukodik, de a ... operatoros megoldas a "modernebb"
    //const person = Object.assign({}, this.state.persons[ personIndex ]);

    person.name = event.target.value;

    const persons = [ ...this.state.persons ];
    persons[personIndex] = person;

    this.setState( {persons: persons} );
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( {showPersons: !doesShow} );
  }

  render() {
    let persons = null;

    if ( this.state.showPersons ) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler}
      />;
    }

    return (
        <div className={classes.App}>
          <Cockpit
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            clicked={this.togglePersonsHandler}
          />
          {persons}
        </div>
    );
  }
}

export default App;
