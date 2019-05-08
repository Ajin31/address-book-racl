import React, { Component } from 'react';
import firebase from '@firebase/app';
import { connect } from 'react-redux';
import { ToastAndroid, ScrollView, View, Dimensions, Animated, TouchableOpacity, Text, StatusBar } from 'react-native';
import { Button, CardView, CardSection, Icon, Header } from './common';

let { width, height } = Dimensions.get('window');


class ContactSetting extends Component<Props> {

    state = {
        ClickCount: 0
    };

    constructor(props) {
        super(props);

        this.springValue = new Animated.Value(100);

    }


    _spring() {
        this.setState({ ClickCount: 1 }, () => {
            Animated.sequence([
                Animated.spring(
                    this.springValue,
                    {
                        toValue: -.11 * height,
                        friction: 10,
                        duration: 3000,
                        useNativeDriver: true,
                    }
                ),
                Animated.timing(
                    this.springValue,
                    {
                        toValue: 100,
                        duration: 3000,
                        useNativeDriver: true,
                    }
                ),

            ]).start(() => {
                this.setState({ ClickCount: 0 });
            });
        });
        return true;
    }

    spring() {
        this.setState({ ClickCount: 1 }, () => {
            Animated.sequence([
                Animated.spring(
                    this.springValue,
                    {
                        toValue: -.5 * height,
                        friction: 5,
                        duration: 3000,
                        useNativeDriver: true,
                    }
                ),
                Animated.timing(
                    this.springValue,
                    {
                        toValue: 100,
                        duration: 8000,
                        useNativeDriver: true,
                    }
                ),

            ]).start(() => {
                this.setState({ ClickCount: 0 });
            });
        });
        return true;    
    }
    
    logOut() {
        firebase.auth().signOut().then(() => ToastAndroid.showWithGravityAndOffset('LoggedOut Successfully !', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50)
        );

    }

    render() {
        const { currentUser } = firebase.auth();
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar
                    backgroundColor="#2980b9"
                    animated={true}

                />
                <Header name="Settings" textStyle={{ padding: 10, marginBottom: 8 }}
                    onPress={() => this.props.onPress()}
                    style={{ flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: '#2980b9', elevation: 3 }}>
                </Header>
                <CardView style={{ flexDirection: 'row', 
                justifyContent: 'space-between',
                    borderWidth: 1,
                    marginTop: 15,
                    marginLeft: 15,
                    marginRight: 15,
                    margin: 15,
                    elevation: 4 }}>
                    <CardSection style={{ flex: 1 }}>
                        <Icon name='id-badge' size={26}
                         btnid='Your Email' 
                            iconColor='#7f8c8d'
                         textViewStyle={{ flexDirection: 'column'}}
                         textStyle={styles.countHeadText}
                         style={{ backgroundColor: '#fff0', borderWidth: 0 }}
                        >
                        <Text style={styles.countText}>{
                          currentUser.email      
                        }</Text>
                        </Icon>
                    </CardSection>
                    <CardSection style={{ flex: 1 }}>
                        <Icon name='id-card' size={26}
                            btnid='Total Contacts'
                            iconColor='#7f8c8d'
                            textViewStyle={{ flexDirection: 'column' }}
                            textStyle={styles.countHeadText}
                            style={{ backgroundColor: '#fff0', borderWidth: 0 }}
                        >
                            <Text style={styles.countText}>{this.props.count}</Text>
                        </Icon>
                    </CardSection>
                </CardView>
                
                <CardSection>
                <Icon
                    name='cog'
                    size={20}
                    btnid='Logout'
                    textStyle={styles.countHeadText}
                    onPress={() => this.logOut()}
                    style={{ backgroundColor: '#fff', borderWidth: 0, flex: 1, alignItems: 'flex-start',
                    justifyContent: 'flex-start' }}>
                    <Text style={styles.countText}>Lougout from AddressBookOnline app</Text>
                    </Icon>
                </CardSection>
                <CardSection style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ color: '#ddd' }}>v 1.0.1 </Text>
                </CardSection>
                <CardSection style={{ justifyContent: 'center', flex: 1 }}>
                <Icon
                    name='info-circle' size={21} btnid='About Dev' iconColor='#0c0c0c' onPress={()=> this._spring()}
                    style={{ backgroundColor: '#fff', borderWidth: 0 }}
                    textStyle={{ fontSize: 14, color: '#000' }}
                />
                </CardSection>
                
                <Animated.View style={[styles.animatedView, { transform: [{ translateY: this.springValue }] }]}>
                    <CardView style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', elevation: 0, borderWidth: 0, opacity: 0.8 }}>
                        <CardSection>
                            <Icon name='laptop-code' btnid='Developer' size={22} iconColor='#000'
                                style={{ backgroundColor: '#fff', borderWidth: 0 }}
                                textStyle={styles.exitText} 
                                onPress={() => this.spring()}    
                                />
                        </CardSection>
                        <CardSection>
                            <Icon name='code' size={20} btnid='Rashil Ulak' iconColor='#0a5386' style={{ backgroundColor: 'fff', borderWidth: 0, marginLeft: 15 }}
                                textStyle={{ fontSize: 14 }}
                            />

                        </CardSection>
                        <CardSection>
                            <Icon name='building' size={20} btnid='Empathy IT Club' iconColor='#0a5588' style={{
                                backgroundColor: '#fff',
                                borderWidth: 0, 
                                marginLeft: 17
                            }}
                                textStyle={{ fontSize: 14 }} />
                        </CardSection>
                    </CardView>
                    {/* <Text style={styles.exitTitleText}>press 
                    logout to logout </Text>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => firebase.auth().signOut()}
                >
                        <Text style={styles.exitText}>logout</Text>
                    </TouchableOpacity> */}

                </Animated.View>
            </View>
        );
    }
}

const mapStatetoProps = state => {
    const { count } = state.count;
    return { count };
};

export default connect(mapStatetoProps)(ContactSetting);


const styles = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    countText: {
        alignSelf: 'flex-start',
        marginLeft: 15,
        marginTop: -5,
        fontSize: 10,
        color: '#616161'
    },
    countHeadText: {
        alignSelf: 'flex-start',
        fontSize: 13, 
        color: '#2c3e50', 
        marginLeft: 10 
    },
    animatedView: {
        width,
        backgroundColor: "rgba(0,0,0,0)",
        elevation: 0,
        position: "absolute",
        bottom: 0,
        padding: 10,
        flexDirection: "row",
    },
    exitTitleText: {
        textAlign: "center",
        color: "#f7f1e3",
        marginRight: 10,
    },  
    exitText: {
        color: "#d1ccc0",
        paddingHorizontal: 10,
        paddingVertical: 3,
        fontSize: 16
    }
};