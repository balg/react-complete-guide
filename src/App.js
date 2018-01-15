import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component {
  state = {
    persons: [
      { name: "Max", age: 28 },
      { name: "Manu", age: 29 },
      { name: "Stephanie", age: 26 },
    ]
  }

  //konvencio: camelcase + Olyan method, amit nem fogsz explicit hivni, hanem event handlerkent hasznalod (pl buttonra akasztod)
  // annak a neve Handler-re vegzodjon
  switchNameHandler = () => {
     console.log('Klikk!');
  }

  render() {
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is just a test.</p>
        {/* onClick-nek referencia alapjan kell atadni a method-ot. Ha moge tenned a ()-t (this.switchNameHandler()), akkor renderkor lefutna egyszer es ennyi. */}
        <button onClick={ this.switchNameHandler }>Switch Name</button>
        <Person name={ this.state.persons[0].name } age={ this.state.persons[0].age } />
        <Person name={ this.state.persons[1].name } age={ this.state.persons[1].age }>My Hobbies: Racing</Person>
        <Person name={ this.state.persons[2].name } age={ this.state.persons[2].age } />
      </div>
    );
  }
}

export default App;
