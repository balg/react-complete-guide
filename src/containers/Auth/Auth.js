import React, { Component } from "react";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import styles from "./Auth.module.css";

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
    }
  };

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

  render() {
    const formElements = Object.entries(
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

    return (
      <div className={styles.auth}>
        <form>
          {formElements}
          <Button btnType="success">SUBMIT</Button>
        </form>
      </div>
    );
  }
}

export default Auth;
