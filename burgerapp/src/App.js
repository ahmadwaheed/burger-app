import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route,Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';


class App extends Component {
  state = {
    show: true
  };

//test code to check if interceptors.eject() works
//  componentWillMount() {
//    setTimeout(() => {
//      this.setState({
//        show: false
//      });
//    },5000)
//  }
  render() {
    return (
      //The idea is to use adjacent components so we can wrap into <Layout>
      <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}
}

export default App;
