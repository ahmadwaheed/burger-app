import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

//this will handle errors
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
      orders: [],
      loading: true
    }

  componentDidMount() {
        axios.get('/orders.json')
        .then(res => {
          const fetchedOrders = [];  //helper funtion
          //console.log(res.data);

          //Turning Orders object into array
          for(let key in res.data) {
            fetchedOrders.push({ //for each member of the array
              ...res.data[key], //distribute properties we get from firebase
              id: key  //accessign the value (which is the order)
            });
          }
          this.setState({
            loading: false,
            orders: fetchedOrders
          });
        })
        .catch(err => {
          this.setState({
            loading: false
          });
        });
  }

  render() {
    return (
        <div>
          {this.state.orders.map(order => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}/>
          ))}
        </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
