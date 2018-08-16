import React from 'react';
import classes from './Button.css';

//.join() turns an array into string
const button = (props) => (
  //.join() is used to make this an array
  <button
    disabled={props.disabled} 
    className={[classes.Button,classes[props.btnType]].join(' ')}
    onClick={props.clicked}> {props.children} </button>
);

export default button;
