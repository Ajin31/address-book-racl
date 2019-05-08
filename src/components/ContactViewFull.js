import React, { Component } from 'react';
import Communication from 'react-native-communications';
import { Text, View, Dimensions, Image, ScrollView } from 'react-native';
import { Header, Icon, RoundButton, CardSection, CardView } from './common';
let { width, height } = Dimensions.get('window');

export default class ContactViewFull extends Component {
  render() {
      const { nameid, email, address, phone, gender, image } = this.props;
    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }} >
        <Header name={nameid} menu={true} textStyle={{ padding: 10, marginBottom: 8 }}
            style={{
                flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: '#2980b9', elevation: 0.5, padding: 10
            }} />
            <ScrollView style={{ top: -5, }}>

                <View style={{ backgroundColor: '#2980b9', height: (height / 2) - 31, alignItems: 'center', justifyContent: 'center', elevation: 3 }}>
       
            <View style={styles.thumbnailContainerStyle}>
                <Image
                    source={{
                        uri: image
                    }}
                    style={styles.thumbnailStyle} 
                    
                />
            </View>
            <View style={{ alignItems: 'center' }}> 
                <Text style={{ fontSize: 31, color: '#ffffff' }}>{nameid}</Text>
                <Icon 
                btnid={email}
                    textStyle={{ fontSize: 16, color: '#ffffff' }}
                style={styles.input}  />
                </View>
              </View>  
                        <View style={{ flex: 1,
                    backgroundColor: '#fff' }}>
                        <CardSection>
                            <Icon
                                name='mobile'
                                size={20}
                                btnid='Phone'
                                textStyle={styles.countHeadText}
                                style={{
                                    backgroundColor: '#fff', borderWidth: 0, flex: 1, alignItems: 'flex-start',
                                    justifyContent: 'flex-start'
                                }}>
                                <Text style={styles.countText}>{phone}</Text>
                            </Icon>
                        </CardSection>
                        <CardSection>
                            <Icon
                                name='map-marker'
                                size={20}
                                btnid='Address'
                                textStyle={styles.countHeadText}
                                style={{
                                    backgroundColor: '#fff', borderWidth: 0, flex: 1, alignItems: 'flex-start',
                                    justifyContent: 'flex-start'
                                }}>
                                <Text style={styles.countText}>{address}</Text>
                            </Icon>
                        </CardSection>
                        <CardSection>
                            <Icon
                                name='venus-mars'
                                size={18}
                                btnid='Gender'
                                textStyle={styles.countHeadText}
                                
                                style={{
                                    backgroundColor: '#fff', borderWidth: 0, flex: 1, alignItems: 'flex-start',
                                    justifyContent: 'flex-start'
                                }}>
                                <Text style={styles.countText}>{gender}</Text>
                            </Icon>
                        </CardSection>
           </View>
                    <CardView style= {{ borderWidth: 0, borderBottomWidth: 0, elevation: 0, justifyContent: 'flex-end', alignItems: 'flex-end', height: (width/2) - 50 }}>
                    <CardSection>
                            <RoundButton iconName='phone' iconColor='#fff' style={{ backgroundColor: '#00C853' }} 
                            onPress={() => Communication.phonecall(phone, true)}
                            />
                    
                            <RoundButton iconName='envelope' iconColor='#fff' style={{ backgroundColor: '#E53935', alignSelf: 'flex-start' }} 
                            onPress={() => Communication.email([email], null, null, null, 'Type in your mail...')}
                        />
                    </CardSection>    
            </CardView>
               
        </ScrollView>
        </View>
    )
  }
}

const styles = {
    cardHeaderStyle: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-around',
        elevation: 0.5,
        marginLeft: 4,
        paddingLeft: 4,
        top: -6
    },
    headerTextStyle: {
        fontSize: 14,
        color: '#000',
        bottom: -6


    },
    thumbnailStyle: {
        width: 150,
        height: 150,
        elevation: 2,
        borderRadius: 100
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
        marginRight: 4,
        elevation: 0,
        borderRadius: 100,
        position: 'relative',
        top: 0,
        borderColor: '#ecf0f1'
    },
    imageStyle: {
        height: 600,
        flex: 1,
        flexGrow: 1,
        width: null,
    },
    editButtonViewStyle: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },

    detailStyle: {
        marginTop: 20,
        marginRight: 240,
        top: 0,
        borderWidth: 0,
        backgroundColor: 'transparent',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
     iconStyle:{
        marginRight: 18
     },
        input: {
            backgroundColor: 'rgba(255, 255, 255,0.4)',
            margin: 8,
            padding: 1,
            borderRadius: 20,
            color: '#ffffff',
            alignSelf: 'flex-start',
        },
        inputWrapper: {
            flex: 1,
        },
        inlineImg: {
            position: 'absolute',
            zIndex: 99,
            width: 22,
            height: 22,
            left: 35,
            top: 9,
        },
    countText: {
        alignSelf: 'flex-start',
        marginLeft: 15,
        marginTop: -5,
        fontSize: 11,
        color: '#616161'
    },
    countHeadText: {
        alignSelf: 'flex-start',
        fontSize: 14,
        color: '#2c3e50',
        marginLeft: 10
    }
     };
