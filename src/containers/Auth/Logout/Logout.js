import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../../store/actions";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    if (this.props.isAuthenticated) {
      return "Logging you out..."
    }
    return <Redirect to="/" />;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(actions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
