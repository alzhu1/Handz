import React from 'react';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui-icons/Menu';

import Divider from 'material-ui/Divider';
import List from 'material-ui/List';

class SideMenuButton extends React.Component {

  constructor() {
      super();
      this.state = {
          open: false,
      };
  }

  toggleDrawer = (side) => () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {

    let styles = {
      position: 'fixed',
      bottom: '0',
      right: '0',
    }

    const sideList = (
      <div>
        <List>hi</List>
        <Divider />
        <List>Bye</List>
      </div>
    );

    return(
      <div style={styles}>
      <IconButton onClick={this.toggleDrawer()}>
        <Menu />
      </IconButton>
      <Drawer open={this.state.open} onClose={this.toggleDrawer()}>
        <div
          tabIndex={0}
          role="button"
          onClick={this.toggleDrawer('left', false)}
          onKeyDown={this.toggleDrawer('left', false)}
        >
          {sideList}
        </div>
      </Drawer>
      </div>
    )
  }


}
export default connect(mapStateToProps, mapDispatchToProps)(SideMenuButton);
