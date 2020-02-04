import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  }

  componentDidMount() {
    const ingredients = {};
    let price = 0;
    const searchParams = new URLSearchParams(this.props.location.search);
    for (const [key, value] of searchParams.entries()) {
      if (key === 'price') {
        price = value;
      } else {
        ingredients[key] = parseInt(value, 10);
      }
    }
    this.setState({ ingredients, totalPrice: price });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('checkout/contact-data');
  }

  render() {
    return (
      <div>
        {
          this.state.ingredients
            ? (
              <CheckoutSummary
                ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
              />
            )
            : null
        }
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}
        />
      </div>
    );
  }
}

export default Checkout;