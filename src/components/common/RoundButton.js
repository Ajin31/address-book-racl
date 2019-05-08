import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';


const SIZE = 50;

const RoundButton = ({ iconName, onPress, iconColor, style }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onPress}
          style={[styles.button, style]}
          activeOpacity={0.7}
        >
          <Icon name={iconName} size={16} color={iconColor} />
        </TouchableOpacity>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZE,
    height: SIZE,
    borderRadius: 100,
    zIndex: 99,
    backgroundColor: '#ffb142',
    opacity: 1.3
  },
  circle: {
    height: SIZE,
    width: SIZE,
    marginTop: -SIZE,
    borderRadius: 100,
    backgroundColor: '#F035E0',
  },
  image: {
    width: 24,
    height: 24,
  },
});

export { RoundButton };
