import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Link, Redirect } from 'react-router-dom';

import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';
import Course from './containers/Course/Course';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <header>
          <nav className="navigation">
            <ul>
              <li><Link to="/users">Users</Link></li>
              <li><Link to="/courses">Courses</Link></li>
            </ul>
          </nav>
        </header>
        <div className="App">
          
        </div>

        <Switch>
          <Route path="/users" exact component={Users} />
          <Route path="/courses" component={Courses} />
          <Redirect from="/all-courses" to="/courses" />
          <Redirect exact from="/" to="/users" />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
