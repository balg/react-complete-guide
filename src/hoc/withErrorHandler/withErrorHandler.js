import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
      }
      this.requestInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null })
        return req;
      })
      this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error });
        return Promise.reject(error);
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    errorConfirmed = () => {
      this.setState({ error: null });
    }

    render() {
      return (
        <>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmed}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  }
}

export default withErrorHandler;