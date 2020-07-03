import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import styles from "./Auth.module.css";
import * as actions from "../../store/actions";
import { checkValidity } from "../../shared/utility";

const initialControls = {
  email: {
    elementType: "input",
    elementConfig: {
      type: "email",
      placeholder: "Email Address",
    },
    value: "",
    validation: {
      required: true,
      isEmail: true,
    },
    valid: false,
    touched: false,
  },
  password: {
    elementType: "input",
    elementConfig: {
      type: "password",
      placeholder: "Password",
    },
    value: "",
    validation: {
      required: true,
      minLength: 6,
    },
    valid: false,
    touched: false,
  },
};

const Auth = (props) => {
  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;
  
  const [controls, setControls] = useState(initialControls);
  const [signUp, setSignUp] = useState(true);

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
  }, []);

  const inputChangedHandler = (value, inputId) => {
    setControls((prev) => {
      const newControls = {
        ...prev,
        [inputId]: {
          ...prev[inputId],
          value,
          valid: checkValidity(value, prev[inputId].validation),
          touched: true,
        },
      };

      return newControls;
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const { email, password } = controls;
    props.onAuth(email.value, password.value, signUp);
  };

  const switchAuthModeHandler = () => {
    setSignUp((prev) => !prev);
  };

  let formElements = Object.entries(
    controls
  ).map(
    ([
      name,
      { elementType, elementConfig, value, label, validation, valid, touched },
    ]) => (
      <Input
        key={name}
        elementType={elementType}
        elementConfig={elementConfig}
        value={value}
        invalid={!valid}
        shouldValidate={validation}
        touched={touched}
        changed={(event) => inputChangedHandler(event.target.value, name)}
      />
    )
  );

  if (props.loading) {
    formElements = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  if (props.isAuthenticated) {
    return <Redirect to={authRedirectPath} />;
  }

  return (
    <div className={styles.auth}>
      {errorMessage}
      <form onSubmit={submitHandler}>
        {formElements}
        <Button btnType="success">SUBMIT</Button>
      </form>
      <Button btnType="danger" clicked={switchAuthModeHandler}>
        switch to {signUp ? "sign in" : "sign up"}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  buildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirect,
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, isSignup) =>
    dispatch(actions.auth(email, password, isSignup)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
