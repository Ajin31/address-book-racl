import _ from 'lodash';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { contactUpdate, contactSaveChanges, contactDelete, initialState } from './actions';
import ContactForm from './ContactForm';
import { CardView, CardSection, Button, ConfirmModal } from './common';

class ContactEdit extends Component {
   
    state = {
        modalVisible: false
    }

   componentWillMount() {
        this.props.initialState();
        _.each(this.props.contact, (value, prop) => {
            this.props.contactUpdate({ prop, value });
        });
   }
   onButtonPress(){
       const { name, phone, email, gender, address, image } = this.props;

       this.props.contactSaveChanges({ name, phone, email, address, image, gender, uid: this.props.contact.uid });
   }

   onAccept() {
       const { uid } = this.props.contact;
       this.props.contactDelete({ uid });
   }

   onDecline() {
       this.setState({
           modalVisible: false
       });
   }

    render() {
    return (
    <ScrollView>
    <CardView>
      <ContactForm />
        <CardSection>
            <Button btnid="Save Changes" onPress={() => {
                Actions.contactList({ type: 'reset' });
                return (
                this.onButtonPress()
                 ); 
                 }} 
            />
        </CardSection>
        <CardSection>
            <Button 
            btnid="Delete"
             onPress={() => this.setState({
                modalVisible: !this.state.modalVisible
            })} 

            />
        </CardSection>
        <ConfirmModal
         visible={this.state.modalVisible}
         onAccept={this.onAccept.bind(this)}
         onDecline={this.onDecline.bind(this)}
        >
            Are you Sure you want to delete this?
        </ConfirmModal>
    </CardView>
    </ScrollView>
    );
  }
}

const mapStatetoProps = (state) => {
    const { name, phone, email, gender, image, address } = state.contactForm;

    return { name, phone, email, gender, image, address };
};

export default connect(mapStatetoProps, { 
    contactUpdate, 
    contactSaveChanges, 
    contactDelete,
    initialState })(ContactEdit);