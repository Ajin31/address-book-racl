import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import firebase from '@firebase/app';
import { connect } from 'react-redux';
import { contactUpdate, contactCreate, initialState } from './actions';
import { Button, CardSection, CardView } from './common';
import ContactForm from './ContactForm';


class NewContact extends Component {

    componentWillMount() {
        this.props.initialState();
    }

 onButtonPress() {
    const { name, phone, email, image, gender, address } = this.props;
    // this.props.contacts.push({ name, phone, email, gender: gender || 'Male' });
    // const { contacts } = this.props.contacts;
    // this.props.contactCreate({ contacts });
    this.props.contactCreate({ name, phone, email, image, address, gender: gender || 'Male' });

 }

  render() {
    return (
        <ScrollView>
        <CardView>
            <ContactForm {...this.props} />   
            <CardSection>
                <Button btnid='Create' onPress={this.onButtonPress.bind(this)} />
                <Button btnid='Log Out' onPress={() => firebase.auth().signOut()} />
            </CardSection>  
        </CardView>
        </ScrollView>
    );
  }
}



const mapStatetoProps = state => {
    const { name, phone, email, address, gender, image, errPhone, errName, errEmail } = state.contactForm;

    return { name, phone, email, address, gender, image, errPhone, errName, errEmail };
};

export default connect(mapStatetoProps,
     { contactUpdate, contactCreate, initialState })(NewContact);
