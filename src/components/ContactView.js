
import React, { Component } from 'react';
import Communication from 'react-native-communications';
import ContactViewFull from './ContactViewFull';
import { connect } from 'react-redux';
import { Text, View, Image,
     TouchableOpacity, UIManager, 
     LayoutAnimation } from 'react-native';
import { selectContact, contactDelete } from './actions';

import { CardView, CardSection, Input, Button, ConfirmModal, Icon } from './common';
import { Actions } from 'react-native-router-flux';

let lastTap = null;
class ContactView extends Component {

    
    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(this.props.false);
        LayoutAnimation.easeInEaseOut();
    }

    state = {
        count: 0,
        details: false,
        modalVisible: false,
        iconName: 'chevron-down',
        border: 1
    }

    
    // handleDoubleTap = () => {
    //     const now = Date.now();

    //     const DOUBLE_PRESS_DELAY = 300;

    //     if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
    //         this.setState({
    //             details: false
    //         });
    //     } else {
    //         lastTap = now;
    //     }
    // }

    onAccept() {
      const { uid } = this.props.contact;
      this.props.contactDelete({ uid });

    }

    onDecline() {
        this.setState({
            modalVisible: false,
            details: false
        });
    }

    toggleDetails() {
    //     count++; 
    // if (count === 1 || count === 2){
        if (this.state.count === 0) {
    this.props.selectContact(this.props.contact.name);
    this.setState({
        details: true,
        count: 1,
        border: 3.5,
        iconName: 'chevron-up'
    });
}
 else {
     this.setState({
         details: false,
         count: 0,
         border: 1      ,
         iconName: 'chevron-down',
     });
 }
        // this.handleDoubleTap();
    // }
    // else {
        // this.setState({
        //     details: false
        // });
    //   count = 0; 
    // }
    }

    renderDescription() {
        if (this.props.expanded) {
         if (this.state.details) {
            return (
                <View>
                <CardSection>
                    {/* <Text style={styles.headerTextStyle}> {this.props.contact.name}</Text> */}
                    <Input
                    label="Name"
                    value={this.props.contact.name}  
                    inputStyle={{ flex: 2 }}       
                    ediTable={false}          
                    />
                    <Icon 
                             name='user-edit'
                             iconColor='#3c5a99'
                             size={12}
                             style={{ backgroundColor: '#fff', borderWidth: 0, flex: 0.1 }}
                            onPress={() => Actions.contactEdit({ contact: this.props.contact })}
                    />
                        <Icon
                            name='trash'
                            iconColor='#3c5a99'
                            size={12}
                            style={{ backgroundColor: '#fff', borderWidth: 0, flex: 0.1 }}
                            onPress={() => this.setState({
                                modalVisible: !this.state.modalVisible
                            })} 
                        />
                    </CardSection>
                <CardSection>
                    <Input 
                    label="Address"
                    value={this.props.contact.address}
                    inputStyle={{ flex: 2.9 }} 
                    ediTable={false}
                    />
                </CardSection>
                    <CardSection>
                        <Input
                            label="Phone"
                            value={this.props.contact.phone}
                            inputStyle={{ flex: 1.9 }}
                            ediTable={false}
                        />
                        <Icon
                            name='phone'
                            iconColor='green'
                            size={12} 
                            btnid='Call' 
                            textStyle={{ color: "000" }}
                            style={{ flex: 0.3, borderWidth: 0, elevation: 0, alignSelf: 'stretch' }} 
                            onPress={() => Communication.phonecall(this.props.contact.phone, true)}
                        />

                    </CardSection>
                    <CardSection>
                        <Input
                            label='Email'
                            value={this.props.contact.email}
                            inputStyle={{ flex: 1.9 }}
                            ediTable={false}
                        />
                        <Icon
                            name="envelope-square"
                            size={12} 
                            iconColor='#3c5a99'
                            btnid='Email'
                            textStyle={{color: '000'}}
                            style={{ flex: 0.3, borderWidth: 0, elevation: 0, aligSelf: 'stretch' }} 
                            onPress={() => Communication.email([this.props.contact.email], null, null, null, 'Type your email...' )}
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                            label="Gender"
                            value={this.props.contact.gender}
                            inputStyle={{ flex: 2.9 }}
                        />
                </CardSection>
                </View>
            );
        }
    }
    }

render() {
 return (
 <CardView style={{ marginBottom: 2, marginTop: 1, elevation: 0.5 }}>  
 <TouchableOpacity onPress={() => Actions.contactViewFull({ nameid: this.props.contact.name, phone: this.props.contact.phone, image: this.props.contact.image, address: this.props.contact.address, gender: this.props.contact.gender, email: this.props.contact.email })}> 
    <CardSection>
    <View style={styles.thumbnailContainerStyle}>
                 <Image 
                     source={{
                         uri: this.props.contact.image
                     }}
                  style={styles.thumbnailStyle} />
    </View>
    <View style={styles.cardHeaderStyle}>
        <Text style={styles.headerTextStyle}>{this.props.contact.name}</Text>
        <Text style={{ fontSize: 10 }}>{this.props.contact.email}</Text>
   </View> 
   </CardSection>
   </TouchableOpacity>
    
         <ConfirmModal
             visible={this.state.modalVisible}
             onAccept={this.onAccept.bind(this)}
             onDecline={this.onDecline.bind(this)}
         >
             Are you sure you want to delete??
        </ConfirmModal> 

    {/* <CardSection>
             <Image source={require('./1.png')} style={styles.imageStyle} />
    </CardSection> */}


    {/* <CardSection>
        <Button onPress={this.props.removeContact} btnid={'Delete'} />
    </CardSection> */}
    <CardSection style={{ borderColor: '#ddd', borderBottomWidth: this.state.border, padding: 0, marginTop: -10, justifyContent: 'center', bottom: -3 }}>
         <Icon
             style={{ backgroundColor: '#fff', padding: 0, borderWidth: 0, top: -8 }}
             name={this.state.iconName}
             size={10}
             iconColor='#ddd'
             onPress={() => this.toggleDetails()}
         />      
         </CardSection>
         {this.renderDescription()}
 </CardView>
        
         
 
);
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
        width: 50,
        height: 50,
        elevation: 0.5,
        borderRadius: 100
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
        marginRight: 4,
        elevation: 2,
        borderRadius: 100
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
  }

};

const mapStatetoProps = (state, ownProps) => {
    const expanded = state.selectedContact === ownProps.contact.name;
    // const { image } = state.contactForm;
    return { expanded };
};

export default connect(mapStatetoProps, 
    {
         selectContact,
         contactDelete 
        })(ContactView);

