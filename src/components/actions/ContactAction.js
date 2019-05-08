import '@firebase/database';
import { ToastAndroid } from 'react-native';
import firebase from '@firebase/app';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { 
    CONTACT_UPDATE,
    NEW_CONTACT,
    CONTACTS_FETCH_SUCCESS,
    CONTACT_SAVE_SUCCESS,
    INVALID_INPUT,
    INITIAL_STATE,
    CONTACTS_COUNT
 } from './types';

const phonPatt = /[a-z]|[A-Z]|\uxxxx|\s/g;
const emailPatt = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const initialState = () => {
  return {
    type: INITIAL_STATE
  };
};

export const contactUpdate = ({ prop, value }) => {
  let errPhone = '';
  let errName = '';
  let errEmail = '';
  if ([prop] == 'email' && !emailPatt.test(value)) { errEmail = 'Invalid Email'; }
  if ([prop] == 'phone' && phonPatt.test(value)) { errPhone = 'Invalid Phone'; }
  return {
      type: CONTACT_UPDATE,
      payload: { prop, value, errEmail, errPhone, errName }
  };
};

export const contactCreate = ({ name, phone, email, image, address, gender }) => {
  const { currentUser } = firebase.auth();
    name = name.charAt(0).toUpperCase() + name.slice(1);
   if (emailPatt.test(email) && !phonPatt.test(phone)) {
  return (dispatch) => {
  firebase.database().ref(`/users/${currentUser.uid}/contacts`).push({ name, phone, email, image, address, gender }).then(() => {
  dispatch({
    type: NEW_CONTACT
         });
  Actions.contactList({ type: 'reset' });
      });
    };
  }
 
  
   else if (phonPatt.test(phone)) { 
     ToastAndroid.show('Invalid Phone no.', ToastAndroid.SHORT); 
    }  
  if (!emailPatt.test(email)) { 
    ToastAndroid.show('Invalid Email', ToastAndroid.SHORT);
   }  
  return {
    type: INVALID_INPUT,
    payload: { name, phone, email, gender }
  };

  // .push({ name, phone, emai gender });
  // Actions.main();
  // return {
  //   type: NEW_CONTACT,
  //   payload: { contacts }
  // };
};

export const contactsCount = (count) => {
  return {
      type: CONTACTS_COUNT,
      payload: count 
  };
};

export const selectContact = (name) => {
  return {
    type: 'select_contact',
    payload: name
  };
};

export const contactsFetch = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/contacts`).on('value', snapshot => {
      dispatch({
        type: CONTACTS_FETCH_SUCCESS,
        payload: snapshot.val()
      });
    });
  };
};

export const contactSaveChanges = ({ name, phone, email, address, image, gender, uid }) => {
const { currentUser } = firebase.auth();
name = name.charAt(0).toUpperCase() + name.slice(1);
  if (emailPatt.test(email) && !phonPatt.test(phone)) {
    ToastAndroid.show('Edited Succesfully !', ToastAndroid.SHORT);
 return (dispatch) => {
  firebase.database().ref(`/users/${currentUser.uid}/contacts/${uid}`)
  .set({ name, phone, email, image, address, gender })
  .then(() => {
    dispatch({
      type: CONTACT_SAVE_SUCCESS
    });
    Actions.contactList({ type: 'reset' });
  });
 };
}

  if (phonPatt.test(phone)) { 
     ToastAndroid.show('Invalid Phone no.', ToastAndroid.SHORT);
  }

  if (!emailPatt.test(email)) {
    ToastAndroid.show('Invalid Email', ToastAndroid.SHORT);
  }

  ToastAndroid.show('Failed to Edit, Try Again !', ToastAndroid.SHORT);

  return {
    type: INVALID_INPUT,
    payload: { name, phone, email, gender }
  };

};

export const contactDelete = ({ uid }) => {
const { currentUser } = firebase.auth();

return () => {
  firebase.database().ref(`/users/${currentUser.uid}/contacts/${uid}`)
  .remove()
  .then(() => {
    Actions.contactList({ type: 'reset' });
    });
  };
};
