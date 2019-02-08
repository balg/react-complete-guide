import React, { Component } from 'react';
import classes from './App.css';
import Person from '../components/Persons/Person/Person';

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
    let btnClass = '';

    if ( this.state.showPersons ) {
      persons = (
        <div>
          {this.state.persons.map( (person, index) => {
            return <Person 
              key={person.id}
              name={person.name}
              age={person.age} 
              click={() => this.deletePersonHandler(index)}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          } )}
        </div>
      );

      btnClass = classes.Red;
    }

    let assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
        <div className={classes.App}>
          <h1>Hi, I'm a React App</h1>
          <p className={assignedClasses.join(' ')}>This is just a test.</p>
          <button className={btnClass}
            onClick={ this.togglePersonsHandler }>Toggle Persons</button>

          {persons}
        </div>
    );
  }
}

export default App;
