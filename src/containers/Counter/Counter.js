import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actions from '../../store/actions';

class Counter extends Component {
    render() {
        console.log('[Render]', this.props);
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
                <CounterControl label="Add 5" clicked={() => this.props.onAddCounter(5)} />
                <CounterControl label="Subtract 5" clicked={() => this.props.onSubtractCounter(5)} />
                <hr />
                <button onClick={this.props.onStoreResult}>Store Result</button>
                <ul>
                    {
                        this.props.results.map(result => (
                            <li
                                key={result.id}
                                onClick={() => {this.props.onDeleteResult(result.id)}}
                            >
                                {result.value}
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ctr: state.counter,
    results: state.results,
});

const mapDispatchToProps = dispatch => ({
    onIncrementCounter: () => dispatch({
        type: actions.INCREMENT
    }),
    onDecrementCounter: () => dispatch({
        type: actions.DECREMENT
    }),
    onAddCounter: (value) => dispatch({
        type: actions.ADD,
        value
    }),
    onSubtractCounter: (value) => dispatch({
        type: actions.SUBTRACT,
        value,
    }),
    onStoreResult: () => dispatch({
        type: actions.STORE_RESULT,
    }),
    onDeleteResult: (resultId) => dispatch({
        type: actions.DELETE_RESULT,
        resultId,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);