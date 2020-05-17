import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions";

const Orders = props => {
  const orders = useSelector(state => state.order.orders)
  const loading = useSelector(state => state.order.loading)
  const token = useSelector(state => state.auth.token)
  const userId = useSelector(state => state.auth.userId)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(actions.fetchOrders(token, userId))
  }, [dispatch, token, userId])

  let content = <Spinner />;
  if (!loading) {
    content = orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));
  }
  return <div>{content}</div>;
}

export default withErrorHandler(Orders, axios);
