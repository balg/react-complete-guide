import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import Navigation from '../../components/Navigation/Navigation';
import FullPost from '../../containers/Blog/FullPost/FullPost';

class Blog extends Component {
    render() {
        return (
            <div>
                <header className="Header">
                    <Navigation />
                </header>
                <Switch>
                    <Route path="/" exact component={Posts} />
                    <Route path="/new-post" component={NewPost} />
                    <Route path="/:id" exact component={FullPost} />
                </Switch>
            </div>
        );
    }
}

export default Blog;