import React, { Component } from 'react';
import LoginForm from './LoginForm';
import firebase from '@firebase/app';
import auth from '@firebase/auth';
import Router from '../Router';
import { View } from 'react-native';
import { Spinner } from './common';

class LoginCheck extends Component {
    state = { loggedIn: null };
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
    }

    renderContent() {
    switch (this.state.loggedIn) {
      case true:
       return <Router />;
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={{ height: '100%', alignItems: 'center' }}>
            <Spinner size='large' />
          </View>
        );
    }
  }

  render() {
    return (
        <View style={{ flex: 1 }}>
      {this.renderContent()}
      </View>
    );
  }
}

export default LoginCheck;
