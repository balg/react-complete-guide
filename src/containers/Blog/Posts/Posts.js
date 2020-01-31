import React, { Component } from "react";
import axios from '../../../axios';
import { Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.css';

class Posts extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    console.log(this.props);
    axios.get('/posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => ({
          ...post,
          author: 'Balika'
        }));
        this.setState({
          posts: updatedPosts
        });
      })
      .catch(error => {
        // this.setState({ error: true });
        console.error(error);
      });
  }

  postSelectedHandler = id => {
    this.props.history.push({ pathname: `/posts/${id}` });
    // this.props.history.push(`/posts/${id}`); <-- This would work also
  }

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>
    if (!this.state.error) {
      posts = this.state.posts.map(post => (
        // <Link key={post.id} to={`/posts/${post.id}`}>
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}
        />
        // </Link>
      ));
    }
    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        <Route path={`${this.props.match.url}/:id`} exact component={FullPost} />
      </div>
    );
  }
}

export default Posts;
