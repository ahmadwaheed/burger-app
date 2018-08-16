import React, {Component} from 'react';

//Importing Aux from hoc/Aux is one way of having adjacent elements
//We can wrap everything into <Aux>
import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
      showSideDrawer: true
    }

    sideDrawerClosedHandler = () => {
        this.setState({
          showSideDrawer: false
        });
    }

    sideDrawerToggleHandler = () => {
      this.setState((prevState) => {
          return {showSideDrawer: !prevState.showSideDrawer};
      });
    }

  render() {
    return (
      <Aux>
       <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
       <SideDrawer open={this.state.showSideDrawer}
                   closed={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout;
//We cannot have adjacent JSX elements but we can use them having an array
//and give each item a key than we are allowed to return adjacent elements

//OR To create a higher order auxiliary component (which is simply
//wrapping something and outputting it)

//OR we can also wrap everything into a <div></div> to make it a single component

//<div>Toolbar, SideDrawer, Backdrop</div>
