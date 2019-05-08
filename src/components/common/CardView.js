import React from 'react';
import { View } from 'react-native';

const CardView = (props) => (
      <View style={[styles.container, props.style]}>
       {props.children}
      </View>
    );

export { CardView };


const styles = {

    container: {

        borderWidth: 1,

        borderRadius: 2,

        borderColor: '#ddd',

        borderBottomWidth: 1,

        shadowColor: '#000',

        shadowOffset: { width: 0, height: 2 },

        shadowOpacity: 0.1,

        shadowRadius: 2,

        elevation: 1,

        marginLeft: 10,

        marginRight: 10,

        marginTop: 6,
       

    }

};
