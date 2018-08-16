import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  //  constructor(props) {
  //    super(props);
  //    this.state = {}
  //  }
  state = {
//    ingredients: {
  //    salad: 0,
    //  bacon: 0,
  //    cheese: 0,
    //  meat: 0
  //  },
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

    //this is a good funtion to fetch data
    componentDidMount() {
      console.log(this.props);
      axios.get('https://react-my-burger-eaf11.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data});
      })
      .catch(error => {this.setState({
        error: true
      });
    });
    }

  updatePurchaseState(ingredients) {
  //  const ingredients = {
  //  ...this.state.ingredients
  //  };
    //it will create an array of string
    const sum = Object.keys(ingredients)
    //it will return the value of eact element in the form of an array
    .map(igkey => {
      //it will return the keys associated to ingredient Object
      return ingredients[igkey]
    })
    //this will reduce this array to turn that into single number
    //.reduce((sum,el)=> {return sum + el },0) //0 is the initialze value
    //and in function 'sum' is the current sum upto current iteration
    //'el' is a number
    .reduce((sum,el)=>{
      return sum + el;
    },0);
    this.setState({
      purchasable: sum > 0
    })
  }

  //to update ingredients
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;

    //state should be updated in an immutible way
    //using ..."spread" operator to distribute properties
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    })
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    //this is when ingredients are less than 0 so the value doesnt go to 0
    if(oldCount <= 0) {
      return;
    }

    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    })
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  }

//This function sends data to Google DataBase firebase
  purchaseContinueHandler = () => {
    //alert('You Continue');
/*    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Ahmad Waheed',
        address: {
          street: 'Testdata1',
          zipCode: 12345,
          country: 'USA'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fasttest'
    }

    //To save data we need to use post() and pass that object
    axios.post('/orders.json', order)
    //then() method is see the database response
    .then(response => {this.setState({loading: false, purchasing: false});
  })
    .catch(error => {this.setState({loading: false, purchasing: false});
    });
*/
//this will encode ingredients into search query
const queryParams = [];
for(let i in this.state.ingredients) {
  //encodes ingredients into my URL
  queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
}

const queryString = queryParams.join('&');
//this line will switch pages and have new page on the stack on Pages
this.props.history.push({
  pathname: '/checkout',
  search: '?' + queryString
});
}

  render() {
    const disabledInfo = {
      //distributing properties of ingredients
      //its same as copying in an immutible way
      ...this.state.ingredients
    };
    //looping through all the keys. [key] is the value of ingredients
    //This will disable the key as long as it is less than 0
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients cant be loaded!</p>: <Spinner />;

    if(this.state.ingredients) {
      burger =  (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
            <BuildControls ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice} />
        </Aux>
      );
        orderSummary =   <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice.toFixed(2)}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />;
    }
    if(this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
    <Aux>
      <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder,axios);
