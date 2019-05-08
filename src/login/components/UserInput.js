import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, TextInput, Image, Dimensions } from 'react-native';

let { width, height } = Dimensions.get('window');
export default class UserInput extends Component {
  render() {
    return (
      <View style={styles.inputWrapper}>
        <Image source={this.props.source} style={styles.inlineImg} />
        <TextInput
          style={[styles.input, this.props.inputStyle]}
          placeholder={this.props.placeholder}
          secureTextEntry={this.props.secureTextEntry}
          autoCorrect={this.props.autoCorrect}
          autoCapitalize={this.props.autoCapitalize}
          returnKeyType={this.props.returnKeyType}
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          autoFocus={this.props.autoFocus}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onChangeText={this.props.onChangeText}
          value={this.props.value}
          placeholder={this.props.placeholder}
        />
      </View>
    );
  }
}

UserInput.propTypes = {
  source: PropTypes.number.isRequired,
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  returnKeyType: PropTypes.string,
};


const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: width - 50,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: '#ffffff',
  },
  inputWrapper: {
    flex: 0,
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
  },
});
