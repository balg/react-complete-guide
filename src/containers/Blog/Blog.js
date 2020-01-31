import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import Navigation from '../../components/Navigation/Navigation';

class Blog extends Component {
    render() {
        return (
            <div>
                <header className="Header">
                    <Navigation />
                </header>
                {/* <Route path="/" exact render={() => <h1>Home</h1>} />
                <Route path="/" exact render={() => <h1>Home 2</h1>} /> */}
                {/* <Posts /> */}
                <Route path="/" exact component={Posts} />
                <Route path="/new-post" component={NewPost} />
            </div>
        );
    }
}

export default Blog;