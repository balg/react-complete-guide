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
    otherState: 'some other value'
  }

  //konvencio: camelcase + Olyan method, amit nem fogsz explicit hivni, hanem event handlerkent hasznalod (pl buttonra akasztod)
  // annak a neve Handler-re vegzodjon
  switchNameHandler = ( newName ) => {
     // console.log('Klikk!');
     // Na igy nem jo, ettol nem fog frissulni a UI: this.state.persons[0].name = "Bela";
     this.setState( {
        persons: [
          { name: newName, age: 28 },
          { name: "Manu", age: 29 },
          { name: "Stephanie", age: 27 },
        ]
     } );
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

  render() {
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is just a test.</p>
        {/* Igy nem ref alapjan adod at, hanem anonim fv-t adsz az onClicknek *amiben* meghivod a switchNameHandler-t. Igy kaphat argumentumot is. Max azt mondja, hogy bizonyos App meret felett ez nem tul hatekony (tul sok re-render vagy ilyesmi) */}
        <button onClick={ () => this.switchNameHandler("Maximilian!!") }>Switch Name</button>
        <Person 
          name={ this.state.persons[0].name }
          age={ this.state.persons[0].age } />
        <Person 
          name={ this.state.persons[1].name } 
          age={ this.state.persons[1].age }
          // .bind-dal is at lehet adni az argumentumot. Ez standard javascript megoldas, amivel a this problematikat is meg lehet oldani.
          // Ez a preferalt megoldas
          click={ this.switchNameHandler.bind(this, "Max!") }
          changed={ this.nameChangedHandler }>
            My Hobbies: Racing
        </Person>
        <Person 
          name={ this.state.persons[2].name } 
          age={ this.state.persons[2].age } />
      </div>
    );
  }
}

export default App;
