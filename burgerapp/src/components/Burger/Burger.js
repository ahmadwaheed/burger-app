import React from 'react';
import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import {withRouter} from 'react-router-dom';

const burger = (props) => {
    console.log(props);
    //keys extract keys of the given object(gives an array of keys)
    //we are changing an object into Array
    let transformedIngredient = Object.keys(props.ingredients)
    .map(igkey => {
      return [...Array(props.ingredients[igkey])].map((_,i) => {
        return <BurgerIngredients key={igkey + i} type={igkey} />;
      });
    })
    //reduce() is a built-in function to transform an array into something else
    //it takes in previous and Current value and [] is the initial value of the
    //reduced value.
    //concat() will simply takes in the elements and add them into array
    .reduce((PrevValue, CurrValue) => {
      return PrevValue.concat(CurrValue)
    }, []);
    if(transformedIngredient.length === 0) {
      transformedIngredient = <p> Start adding ingredients! </p>;
    }
  return(
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
        {transformedIngredient}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );

};

export default withRouter(burger);

//TYPE is a property we expect to receive
