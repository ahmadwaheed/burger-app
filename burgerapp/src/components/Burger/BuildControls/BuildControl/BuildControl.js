import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => (
//<div>{props.label}</div> is printing dynamically.
//will receeive a prop and will name it label
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={props.removed}
      disabled={props.disabled}>Less</button>
    <button
      className={classes.More}
      onClick={props.added}>More</button>
  </div>
);

export default buildControl;
//  <div className={classes.Label}>{props.label}</div>
