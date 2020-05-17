import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions";
import { checkValidity } from "../../../shared/utility";

const initialFormData = {
  name: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Your Name",
    },
    value: "",
    label: "Your Name",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
  street: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Street",
    },
    value: "",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
  zipCode: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "ZIP Code",
    },
    value: "",
    validation: {
      required: true,
      minLength: 4,
      maxLength: 4,
    },
    valid: false,
    touched: false,
  },
  country: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Country",
    },
    value: "",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
  email: {
    elementType: "input",
    elementConfig: {
      type: "email",
      placeholder: "Your E-Mail",
    },
    value: "",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
  deliveryMethod: {
    elementType: "select",
    elementConfig: {
      options: [
        { value: "fastest", displayValue: "Fastest" },
        { value: "cheapest", displayValue: "Cheapest" },
      ],
    },
    value: "fastest",
    validation: {},
    valid: true,
  },
};

const ContactData = (props) => {
  const ingrdnts = useSelector((state) => state.burgerBuilder.ingredients);
  const price = useSelector((state) => state.burgerBuilder.totalPrice);
  const loading = useSelector((state) => state.order.loading);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const [formIsValid, setFormIsValid] = useState(false);
  const [orderForm, setOrderForm] = useState(initialFormData);

  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    Object.entries(orderForm).forEach(
      ([formElementId, { value }]) => {
        formData[formElementId] = value;
      }
    );
    const order = {
      ingredients: ingrdnts,
      price,
      orderData: formData,
      userId,
    };
    dispatch(actions.purchaseBurger(order, token));
  };

  const inputChangedHandler = (value, inputId) => {
    setOrderForm((prevState) => {
      const orderForm = {
        ...prevState,
        [inputId]: {
          ...prevState[inputId],
          value,
          valid: checkValidity(value, prevState[inputId].validation),
          touched: true,
        },
      };
      const formIsValid = Object.values(orderForm).reduce(
        (allValid, config) => {
          const { validation, valid } = config;
          return allValid && (!validation || valid);
        },
        true
      );
      setFormIsValid(formIsValid);
      return orderForm;
    });
  };

  const formElements = Object.entries(
    orderForm
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
        label={label}
        invalid={!valid}
        shouldValidate={validation}
        touched={touched}
        changed={(event) => inputChangedHandler(event.target.value, name)}
      />
    )
  );
  let form = (
    <form onSubmit={orderHandler}>
      {formElements}
      <Button btnType="success" disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );
  if (loading) {
    form = <Spinner />;
  }
  return (
    <div className={styles.contactData}>
      <h4>Enter your data</h4>
      {form}
    </div>
  );
};

export default withErrorHandler(ContactData, axios);
