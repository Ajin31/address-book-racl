import React, {Component} from 'react';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import { Spinner } from './';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  View, LayoutAnimation, UIManager
} from 'react-native';
import { loginUser } from '../actions';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

class ButtonSubmit extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.easeInEaseOut();
  }
  _onPress() {
    if (this.state.isLoading) return;

    this.setState({isLoading: true });
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();

    setTimeout(() => {
      this._onGrow();
    }, 8000);

    setTimeout(() => {
      // Actions.secondScreen();
      const { email, password } = this.props;

      this.props.loginUser({ email, password });
      this.setState({isLoading: false});
      this.buttonAnimated.setValue(0);
      this.growAnimated.setValue(0);
    }, 2300);
  }

  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
    }).start();
  }
    renderError() {
      if (this.props.error){
        return 'Login Failed !';
      }
      const { btnid } = this.props;
      return btnid;
    }
  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    return (
      <View style={styles.container}>
        <Animated.View style={{width: changeWidth }}>
          <TouchableOpacity
            style={[styles.button, this.props.style]}
            onPress={this._onPress}
            activeOpacity={1}>
            {this.state.isLoading ? (
              <Spinner size='small' />
            ) : (
              <Text style={styles.text}>{this.renderError()}</Text>
            )}
          </TouchableOpacity>
         
          <Animated.View
            style={[styles.circle, {transform: [{ scale: changeScale }]}]}
          />
          
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
});

const mapStatetoProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  };
};

export default connect(mapStatetoProps, {
loginUser
})(ButtonSubmit);

