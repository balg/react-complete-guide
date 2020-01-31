import React from 'react';
import { Link } from 'react-router-dom';

import './Navigation.css';

const Navigation = props => (
  <nav className="navigation">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to={{
        pathname: '/new-post',
        hash: '#submit',
        search: '?quick-submit=true'
      }}>New Post</Link></li>
    </ul>
  </nav>
);

export default Navigation;