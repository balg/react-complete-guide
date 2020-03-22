import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        label: "Your Name",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 4,
          maxLength: 4
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        validation: {},
        valid: true
      }
    },
    formIsValid: false,
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    const formData = {};
    Object.entries(this.state.orderForm).forEach(
      ([formElementId, { value }]) => {
        formData[formElementId] = value;
      }
    );
    const order = {
      ingredients: this.props.ingrdnts,
      price: this.props.price,
      orderData: formData
    };
    this.props.onOrderBurger(order);
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
      const orderForm = {
        ...prevState.orderForm,
        [inputId]: {
          ...prevState.orderForm[inputId],
          value,
          valid: this.checkValidity(
            value,
            prevState.orderForm[inputId].validation
          ),
          touched: true
        }
      };

      const formIsValid = Object.values(orderForm).reduce(
        (allValid, config) => {
          const { validation, valid } = config;
          return allValid && (!validation || valid);
        },
        true
      );
      return {
        orderForm,
        formIsValid
      };
    });
  };

  render() {
    const formElements = Object.entries(
      this.state.orderForm
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
          label={label}
          invalid={!valid}
          shouldValidate={validation}
          touched={touched}
          changed={event => this.inputChangedHandler(event, name)}
        />
      )
    );
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements}
        <Button btnType="success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={styles.contactData}>
        <h4>Enter your data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ingrdnts: state.ingredients,
  price: state.totalPrice
});
const mapDispatchToProps = dispatch => ({
  onOrderBurger: orderData => dispatch(actions.purchaseBurgerStart(orderData))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
