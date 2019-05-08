import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => (
      <View style={[styles.container, props.style]}>
        {props.children}
      </View>
    );
  
export { CardSection };


const styles = {

  container: {
    borderBottomWidth: 0,
    padding: 8,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',

  }

};
