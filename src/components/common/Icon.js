import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5'; 

const Icon = ({ onPress, btnid, name, style, textStyle, 
    iconColor, iconStyle, size, children, textViewStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.buttonStyle, style]}>
            <Icons name={name} size={size} color={iconColor} style={[styles.iconStyle, iconStyle]} />
            <View style={{ textViewStyle }}>
            <Text style={[styles.textStyle, textStyle]}>
                {btnid}
            </Text>
            {children}
            </View>
        </TouchableOpacity>
    );
};

export { Icon };


const styles = {

    textStyle: {

        alignSelf: 'center',

        color: '#dd',

        fontSize: 10,

        fontWeight: '600',

        padding: 5

    },

    buttonStyle: {


        alignItems: 'center',

        justifyContent: 'center',

        backgroundColor: '#ddd',

        borderRadius: 10,

        borderWidth: 1,

        borderColor: '#ddd',

        marginLeft: 8,

        marginRight: 8,

        flexDirection: 'row'

    },
    iconStyle: {

        alignSelf: 'center'
    }

};
