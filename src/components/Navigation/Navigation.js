import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.css';

const Navigation = props => (
  <nav className="navigation">
    <ul>
      <li>
        <NavLink
          to="/"
          exact
          activeClassName="active"
        >
          Home
        </NavLink>
      </li>
      <li><NavLink to={{
        pathname: '/new-post',
        hash: '#submit',
        search: '?quick-submit=true'
      }}>New Post</NavLink></li>
    </ul>
  </nav>
);

export default Navigation;