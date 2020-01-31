import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import Navigation from '../../components/Navigation/Navigation';
import asyncComponent from '../../hoc/asyncComponent';
// import NewPost from './NewPost/NewPost';

// const AsyncNewPost = asyncComponent(() => {
//     return import('./NewPost/NewPost');
// });

const NewPost = React.lazy(() => import('./NewPost/NewPost'));

class Blog extends Component {
    state = {
        auth: true
    };

    render() {
        return (
            <div>
                <header className="Header">
                    <Navigation />
                </header>
                <Switch>
                    {/* {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null} */}
                    {this.state.auth
                        ? <Route path="/new-post" render={() => (
                            <Suspense fallback={<div>Loading...</div>}>
                                <NewPost />
                            </Suspense>
                        )} />
                        : null}
                    <Route path="/posts" component={Posts} />
                    <Redirect from="/" to="/posts" />
                </Switch>
            </div>
        );
    }
}

export default Blog;