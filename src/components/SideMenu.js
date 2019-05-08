import React, { Component } from 'react'
import {
  AppRegistry,
  Text,
  View,
  StatusBar
} from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'
import {OffCanvasReveal} from 'react-native-off-canvas-menu'

import ContactList from './ContactList';
import ContactSettings from './ContactSettings';
import OffCanvas3D from 'react-native-off-canvas-menu/offcanvas3d';

class SideMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menuOpen: false
    }
  }

  render() {
    const statusBar = this.state.menuOpen ?
      <StatusBar
        backgroundColor="#34495e"
        animated={true}
      />
    : null

    return (
      <View style={{flex: 1}}>

        {statusBar}

        <OffCanvasReveal
        active={this.state.menuOpen}
        onMenuPress={this.handleMenu.bind(this)}
          backgroundColor={'#34495e'}
          menuTextStyles={{ color: '#bdc3c7'}}
        handleBackPress={false}
        menuItems={[
          {
            title: 'Contacts',
            icon: <Icon name="user" size={35} color='#ecf0f1' />,
            renderScene: <ContactList onPress={() => this.handleMenu()}/>
          },
          {
            title: 'Setting',
            icon: <Icon name="gear" size={35} color='#ecf0f1' />,
            renderScene: <ContactSettings onPress={() => this.handleMenu()}/>
          },
          
        ]}/>

      </View>
    )
  }

  handleMenu() {
    const {menuOpen} = this.state
    this.setState({
      menuOpen: !menuOpen
    })
  }
}

export default SideMenu;
