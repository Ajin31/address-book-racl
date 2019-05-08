import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Icon } from './';

class Header extends Component { 

    menubar() {

        if (!this.props.menu) {
            return (
                <Icon
                    name='bars'
                    style={{ backgroundColor: '#2980b9', borderWidth: 0, marginBottom: 8, bottom: -1.5 }}
                    iconColor="#bdc3c7"
                    size={20}
                    onPress={this.props.onPress}
                />
            );
        }
    }
    render() {
        const { name, style, textStyle, children, onPress } = this.props;
  
    return (
    <View style={[styles.container, style]}>
    {this.menubar()}
    <Text style={[styles.textStyle, textStyle]}>{name}</Text>
    {children}
    </View>
    );
}
}
const styles = {

    container: {

        backgroundColor: '#F8F8F8',

        justifyContent: 'center',

        alignItems: 'center',

        height: 60,

        paddingTop: 15,

        shadowColor: '#000',

        shadowOffset: { width: 0, height: 2 },

        shadowOpacity: 0.2,

        elevation: 2,

        marginBottom: 5

        // position: 'relative'

    },

    textStyle: {
        color: '#ecf0f1',
        fontSize: 22,
        left: - 12
    }

};
export { Header };
