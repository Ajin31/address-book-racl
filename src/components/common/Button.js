import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, btnid, style, textStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.buttonStyle, style]}>
        <Text style={[styles.textStyle, textStyle]}> 
       {btnid}
        </Text>
        </TouchableOpacity>
      );
  };

  export { Button };


const styles = {

    textStyle: {

        alignSelf: 'center',

        color: '#007aff',

        fontSize: 16,

        fontWeight: '600',

        paddingTop: 10,

        paddingBottom: 10

    },

    buttonStyle: {

        flex: 1,

        alignSelf: 'stretch',

        backgroundColor: '#fff',

        borderRadius: 8,

        borderWidth: 1,

        borderColor: '#007aff',

        marginLeft: 10,

        marginRight: 10,
        elevation: 1

    }

};
