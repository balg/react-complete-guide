import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

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
                <Switch>
                    <Route path="/new-post" component={NewPost} />
                    <Route path="/posts" component={Posts} />
                    <Redirect from="/" to="/posts" />
                </Switch>
            </div>
        );
    }
}

export default Blog;