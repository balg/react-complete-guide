import React, { Component } from 'react';
import { connect } from 'react-redux';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import * as actions from '../store/actions';

class Persons extends Component {
    personAddedHandler = () => {
        const newPerson = {
            id: Math.random(), // not really unique but good enough here!
            name: 'Max',
            age: Math.floor( Math.random() * 40 )
        }
        this.props.onAddPerson(newPerson);
    }

    render () {
        console.log('[Persons render]', this.props);
        return (
            <div>
                <AddPerson personAdded={this.personAddedHandler} />
                {this.props.persons.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.onDeletePerson(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    persons: state.persons,
});

const mapDispatchToProps = dispatch => ({
    onAddPerson: person => dispatch({
        type: actions.ADD,
        person
    }),
    onDeletePerson: personId => dispatch({
        type: actions.DELETE,
        personId
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Persons);