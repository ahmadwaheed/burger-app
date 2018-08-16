import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    componentWillMount() {
      //making a reference to axios request and response
      this.reqInterceptors = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });
      this.resInterceptors = axios.interceptors.response.use(res => res,error => {
        this.setState({
          //'error' is the error in the parameter of use(null,error)
          error: error
        });
      });
    }

    componentWillUnmount() {
      //checking if the function gets Called
      console.log('will Unmount',this.reqInterceptors,this.resInterceptors);
      //Using reference to axios request and response
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }

    errorConfirmedHandler = () => {
      this.setState({
        error: null
      });
    }

  render() {
    return (
      <Aux>
        <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
          {this.state.error ? this.state.error.message : null}
          Something didnt work!
        </Modal>
      <WrappedComponent {...this.props} />

    </Aux>
    );
   }
  }
 }

export default withErrorHandler;
