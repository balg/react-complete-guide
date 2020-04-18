import React, { Component } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./List.css";

class List extends Component {
  state = {
    items: [
      {
        id: 1,
        name: "Balika",
      },
      {
        id: 2,
        name: "Virag",
      },
      {
        id: 3,
        name: "Kleo",
      },
    ],
  };

  addItemHandler = () => {
    this.setState((prevState) => {
      return {
        items: [...prevState.items, {
            id: Date.now(),
            name: new Date().toISOString()
        }],
      };
    });
  };

  removeItemHandler = (itemId) => {
    this.setState((prevState) => {
      return {
        items: prevState.items.filter((item) => item.id !== itemId),
      };
    });
  };

  render() {
    const listItems = this.state.items.map((item) => (
      <CSSTransition key={item.id} classNames="fade" timeout={300}>
        <li className="ListItem" onClick={() => this.removeItemHandler(item.id)}>
          {item.name}
        </li>
      </CSSTransition>
    ));

    return (
      <div>
        <button className="Button" onClick={this.addItemHandler}>
          Add Item
        </button>
        <p>Click Item to Remove.</p>
        <TransitionGroup component="ul" className="List">
          {listItems}
        </TransitionGroup>
      </div>
    );
  }
}

export default List;
