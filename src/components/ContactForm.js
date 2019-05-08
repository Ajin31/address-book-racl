import React, { Component } from 'react';
import { Text, View, Picker, Image } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Input, Button, CardView } from './common';
import { contactUpdate } from './actions';
import ImagePicker from 'react-native-image-picker';

class ContactForm extends Component {

    state = {
            filePath: {},
        };
    
    chooseFile = () => {
        var options = {
            title: 'Select Your Image',
            // customButtons: [
            //     { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            // ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            // if (response.didCancel) {
            //     alert('User cancelled image picker');
            if (response.error) {
                alert('ImagePicker Error: ' + response.error);
            } else if (response.customButton) {
                alert(response.customButton);
            } else {
                const source = response;
                const value = response.uri;
                this.props.contactUpdate({ prop: 'image', value });
                this.setState({
                    filePath: source,
                });
            }
        });
    //    this.imageAdd();
    };
    // imageAdd() {
    //     const value = this.state.filePath.uri;
    //     
    // }
    // launchCamera = () => {
    //     var options = {
    //         storageOptions: {
    //             skipBackup: true,
    //             path: 'images',
    //         },
    //     };
    //     ImagePicker.launchCamera(options, (response) => {
    //         if (response.didCancel) {
    //             alert('User cancelled image picker');
    //         } else if (response.error) {
    //             alert('ImagePicker Error: ' + response.error);
    //         } else {
    //             let source = response;
    //             this.setState({
    //                 filePath: source,
    //             });
    //         }
    //     });
    // };

    // launchLibrary = () => {
    //     var options = {
    //         storageOptions: {
    //             skipBackup: true,
    //             path: 'images',
    //         },
    //     };
    //     ImagePicker.launchImageLibrary(options, (response) => {
    //         if (response.didCancel) {
    //             alert('User cancelled image picker');
    //         } else if (response.error) {
    //             alert('ImagePicker Error: ' + response.error);
    //         } else {
    //             let source = response;
    //             this.setState({
    //                 filePath: source,
    //             });
    //         }
    //     });
    // };

  render() {
    return (
        <View style={{ backgroundColor: '#fff' }}>
            <CardView>
                    {/* <Image
                        source={{
                            uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
                        }}
                        style={{ width: 100, height: 100 }}
                    /> */}
                    <CardSection style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={{ uri: this.props.image }}
                        style={{ backgroundColor: '#ddd', width: 150, height: 150 }}
                    />
                    </CardSection>
                    <CardSection>
                    <Button btnid="Choose Image" onPress={this.chooseFile.bind(this)}
                            style={{ borderWidth: 0 }}
                    />
                    </CardSection>
            </CardView>
            <CardSection>
                <Input
                    label='Name'
                    placeholder='Type name...'
                    value={this.props.name}
                    onChangeText={value => this.props.contactUpdate({ prop: 'name', value })}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    autoFocus
                    ediTable
                />
                <Text>{this.props.errName}</Text>
            </CardSection>
            <CardSection>
                <Input
                    label="Phone"
                    placeholder="+977-XXXXXXXXXX"
                    value={this.props.phone}
                    onChangeText={value => this.props.contactUpdate({ prop: 'phone', value })}
                    keyboardType='numeric'
                    ediTable
                />
                <Text>{this.props.errPhone}</Text>
            </CardSection>
            <CardSection>
                <Input
                    label="Email"
                    placeholder="x_X@xX.com"
                    value={this.props.email}
                    ediTable
                    onChangeText={value => this.props.contactUpdate({ prop: 'email', value })}
                />
                <Text>{this.props.errEmail}</Text>
            </CardSection>
            <CardSection>
                <Input
                    label='Address'
                    placeholder='Type in Address...'
                    value={this.props.address}
                    ediTable
                    onChangeText={value => this.props.contactUpdate({ prop: 'address', value })}
                />
            </CardSection>
            <CardSection style={{ height: 100 }}>
                <Text style={styles.pickerTextStyle}>Gender</Text>
                <Picker
                    style={{ flex: 1, fontSize: 20 }}
                    selectedValue={this.props.gender}
                    onValueChange={value => this.props.contactUpdate({ prop: 'gender', value })}
                >
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                </Picker>
            </CardSection>
           </View>
    );
  }
}

const styles = {
    pickerTextStyle: {
        fontSize: 16,
        paddingLeft: 22,
        paddingTop: 14.5,
        paddingRight: 30,
        color: '#000',
        fontWeight: '400'
    },
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
};

const mapStateProps = (state) => {
    const { name, phone, email, gender, image, address } = state.contactForm;

    return { name, phone, email, gender, image, address };
};

export default connect(mapStateProps, { contactUpdate })(ContactForm);