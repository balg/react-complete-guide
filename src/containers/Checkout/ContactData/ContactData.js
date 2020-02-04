import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        label: 'Your Name',
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: ''
      },
    },
    // name: '',
    // email: '',
    // address: {
    //   street: '',
    //   postalCode: '',
    // },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }

  inputChangedHandler = (event, inputId) => {
    const { value } = event.target;
    this.setState(prevState => {
      const orderForm = {
        ...prevState.orderForm,
        [inputId]: {
          ...prevState.orderForm[inputId],
          value,
        }
      }
      return {
        orderForm,
      };
    });
  }

  render() {
    const formElements = Object.entries(this.state.orderForm)
      .map(([name, {elementType, elementConfig, value, label}]) => (
        <Input
          key={name}
          elementType={elementType}
          elementConfig={elementConfig}
          value={value}
          label={label}
          changed={(event) => this.inputChangedHandler(event, name)}
        />
      ))
    let form = (
      <form>
        {formElements}
        <Button btnType="success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={styles.contactData}>
        <h4>Enter your data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;