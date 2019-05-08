import React from 'react';
import { Text, View, TextInput } from 'react-native';

const Input = ({
     label, value, onChangeText, 
     placeholder, secureTextEntry, 
     ediTable, placeholderTextColor, 
     textStyle, inputStyle, 
     maxLength, underlineColorAndroid, valueColor,
    onFocus, onBlur, autoFocus, style,
   returnKeyType }) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={[styles.labelStyle, textStyle]}>{ label }</Text>
            <TextInput
            editable={ediTable}
            // readOnly={false}
            secureTextEntry={secureTextEntry} 
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            autoCorrect={false}
            maxLength={maxLength}
            color={valueColor}
            style={[styles.inputStyle, inputStyle]}
            value={value}
            returnKeyType={returnKeyType}
            onChangeText={onChangeText}
            underlineColorAndroid={underlineColorAndroid}
            onFocus={onFocus}
            onBlur={onBlur}
            ediTable={ediTable}
            // underlineColorAndroid="rgba(0,0,0,0.5)"
            autoFocus={autoFocus}
            />
        </View>
    );
  };


 const styles = {
     inputStyle: {
        color: '#000',
        paddingRight: 3,
        paddingLeft: 8,
        fontSize: 12,
        lineHeight: 18,
        flex: 3,
     },
     labelStyle: {
        fontSize: 14,
        paddingLeft: 8,
        flex: 1,
        color: '#000'
     },
     container: {
         height: 45,
         flex: 1,
         flexDirection: 'row',
         alignItems: 'center',
         marginLeft: 5,
         marginRight: 5,
     }
 };

  export { Input };
