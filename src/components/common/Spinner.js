import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
 
const Spinner = ({ size }) => (
      <View style={styles.spinnerStyle}>
        <ActivityIndicator size={size || 'large'} color='#2c3e50' />
      </View>
    );

export { Spinner };

const styles = {
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#bdc3c7'
    }
};
