import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import styles from "./Auth.module.css";
import * as actions from "../../store/actions";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email Address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    signUp: true
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath()
    }
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.trim().length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputId) => {
    const { value } = event.target;
    this.setState(prevState => {
      const controls = {
        ...prevState.controls,
        [inputId]: {
          ...prevState.controls[inputId],
          value,
          valid: this.checkValidity(
            value,
            prevState.controls[inputId].validation
          ),
          touched: true
        }
      };

      return {
        controls
      };
    });
  };

  submitHandler = event => {
    event.preventDefault();
    const { email, password } = this.state.controls;
    this.props.onAuth(email.value, password.value, this.state.signUp);
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => ({
      signUp: !prevState.signUp
    }));
  };

  render() {
    let formElements = Object.entries(
      this.state.controls
    ).map(
      ([
        name,
        { elementType, elementConfig, value, label, validation, valid, touched }
      ]) => (
        <Input
          key={name}
          elementType={elementType}
          elementConfig={elementConfig}
          value={value}
          invalid={!valid}
          shouldValidate={validation}
          touched={touched}
          changed={event => this.inputChangedHandler(event, name)}
        />
      )
    );

    if (this.props.loading) {
      formElements = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={styles.auth}>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {formElements}
          <Button btnType="success">SUBMIT</Button>
        </form>
        <Button btnType="danger" clicked={this.switchAuthModeHandler}>
          switch to {this.state.signUp ? "sign in" : "sign up"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  buildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirect
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignup) =>
    dispatch(actions.auth(email, password, isSignup)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
