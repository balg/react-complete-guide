import React, { Component } from 'react';
import { Route } from 'react-router';

import Course from '../Course/Course';

import './Courses.css';

class Courses extends Component {
    state = {
        courses: [
            { id: 1, title: 'Angular - The Complete Guide' },
            { id: 2, title: 'Vue - The Complete Guide' },
            { id: 3, title: 'PWA - The Complete Guide' }
        ]
    }

    courseSelectHandler = (courseId, title) => {
        this.props.history.push(`${this.props.match.url}/${courseId}?title=${title}`);
    }

    render () {
        return (
            <div>
                <h1>Amazing Udemy Courses</h1>
                <section className="Courses">
                    {
                        this.state.courses.map( course => {
                            return (
                                <article
                                    className="Course"
                                    key={course.id}
                                    onClick={() => this.courseSelectHandler(course.id, course.title)}
                                >
                                    {course.title}
                                </article>);
                        } )
                    }
                </section>
                <Route path="/courses/:id" component={Course} />
            </div>
        );
    }
}

export default Courses;