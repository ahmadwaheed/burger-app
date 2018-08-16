import React from 'react';

//We can dynamically use the image by importing
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
  <div className={classes.Logo} style={{height: props.height}}>
    <img src={burgerLogo} alt="My Burger"/>
  </div>
);

export default logo;

//style={{height: props.height}} we can set the property by explicitly
//usng the property 
