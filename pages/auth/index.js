import React from 'react';

import User from '../../components/User';

const AuthIndexPage = (props) => (
  <div>
    <h1>The Auth Page {props.appName}</h1>
    <User name="Balika" age="33" />
  </div>
);

AuthIndexPage.getInitialProps = context => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ appName: 'Super App' })
    }, 1000);
  });
  return promise;
}

export default AuthIndexPage;