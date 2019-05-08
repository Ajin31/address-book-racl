import _ from 'lodash';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { ListView, View, TouchableHighlight, Text, LayoutAnimation,
UIManager, FlatList, BackHandler, ToastAndroid, StatusBar } from 'react-native';
import ContactView from './ContactView';
import { contactsFetch, contactsCount } from './actions';
import { CardView, CardSection, Header, Icon, RoundButton } from './common';
import Icons from 'react-native-vector-icons/FontAwesome5';


function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}


class ContactList extends Component {

        state = {
            doubleBackToExitPressedOnce: false
        };
   

    componentWillMount() {
        this.props.contactsFetch();
    //   this.createDataSource(this.props);
        this.props.contactsCount(this.props.counts);
    }

    
    componentWillUpdate() {
        
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.easeInEaseOut();
        
    }
    componentDidUpdate() {
        
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        
    }

    

    componentwillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }


    // onButtonPress = () => {
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    //     // then navigate
    //     // navigate('NewScreen');
    // }

    // handleBackButton = () => {
    //     const scene = Actions.currentScene;
        
    //     if (scene === 'contactList' || scene === 'contactSearch') {
    //         BackHandler.exitApp();
    //         return true;
    //     }
    //     Actions.pop();
    //     return true;
    // }


    handleBackButton = () => {
        
        const scene = Actions.currentScene;
        if (this.state.doubleBackToExitPressedOnce || scene === 'contactList') {
            BackHandler.exitApp();
        }
        Actions.pop();
        // ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
        this.setState({ doubleBackToExitPressedOnce: true });
        setTimeout(() => {
            this.setState({ doubleBackToExitPressedOnce: false });
        }, 2000);
        return true;
    }

    render() {
        return (
           
            // <View style={{ flex: 1 }}>
            //     {/* <Header name={'AddressBook'} onPress={() => { this.toggleModal(true); }} /> */}
            //     <ScrollView >
            //         {this.renderContacts()}
            //     </ScrollView>
            // </View>
            <View style={{ flex: 1, backgroundColor: '#ffffff' }} >
                <StatusBar
                    backgroundColor="#2980b9"
                    animated={true}
                    
                />
                <Header name="Contacts" textStyle={{ padding: 10, marginBottom: 8 }}
                onPress={() => this.props.onPress()}
                    style={{ flexDirection: 'row', backgroundColor: '#2980b9', elevation: 3 }}>
                        <View style={{ flex: 1, marginBottom: 10, width: 100,
                        justifyContent: 'flex-end', alignItems: 'flex-end' }}>

                        <Icon name='search' size={23} iconColor='#ddd' style={{ backgroundColor: '#2980b9', borderWidth: 0, paddingLeft: 8 }}
                        iconStyle={{ alignSelf: 'flex-end' }}
                            onPress={() => Actions.contactSearch()}
                        />
                        </View>
                        </Header>
            {/* <ListView
            enableEmptySections 
            dataSource={this.dataSource}
            renderRow={this.renderRow} 
            /> */}
                <FlatList
                    data={this.props.contacts}
                    //data to render in list
                    renderItem={({ item }) => (
                        //Single Item in list
                        <ContactView contact={item} false={true} />
                    )}
                    />
                {/* <CardView style={{
                    justifyContent: 'center', alignItems: 'center', backgroundColor: '#3c5a99', marginLeft: 0, marginRight: 0, padding: 0, elevation: 3 }} > 
                    <TouchableHighlight onPress={() => Actions.newContact()}
                                        underlayColor='#3b5986'
                    >
                        <View style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 100,
                            elevation: 3
                        }} 
                        >
                            <CardSection style={{ backgroundColor: '#3c5a99', padding: 0 }}>
                         <Icons name="plus" size={20} color="#ddd" style={{ padding: 2 }} />
                    </CardSection>
                            <CardSection style={{ backgroundColor: '#3c5a99', padding: 0 }} >
                         <Text style={{ fontSize: 16, color: '#ddd' }}> New </Text>
                </CardSection>
                </View>
                </TouchableHighlight> 
                
            </CardView> */}

               <RoundButton iconName='user-plus' onPress={() => Actions.newContact()} />
            </View>
        );
    }
}
const mapStatetoProps = (state) => {
    let counts = 0;
    const contacts = _.map(state.contacts, (val, uid) => {
        counts++;
        return { ...val, uid };
    });
    contacts.sort(dynamicSort('name'));
    return { contacts, counts };
};

export default connect(mapStatetoProps, { contactsFetch, contactsCount })(ContactList);
