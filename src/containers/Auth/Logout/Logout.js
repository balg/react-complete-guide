import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../../store/actions";

const Logout = (props) => {
  const { onLogout, isAuthenticated } = props;

  useEffect(() => {
    onLogout();
  }, [ onLogout ]);

  if (isAuthenticated) {
    return "Logging you out...";
  }
  return <Redirect to="/" />;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(actions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
