import React, { Component, Suspense } from "react";
import { Link, Route } from "react-router-dom";

import Users from "./containers/Users";
const Pizza = React.lazy(() => import("./containers/Pizza"));

const LoadingLazy = () => <div>Loading...</div>

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/">Users</Link> |<Link to="/pizza">Pizza</Link>
        </div>
        <div>
          <Route path="/" exact component={Users} />
          <Route path="/pizza" render={(props) => (
            <Suspense fallback={LoadingLazy()}>
              <Pizza {...props} />
            </Suspense>
          )} />
        </div>
      </div>
    );
  }
}

export default App;
