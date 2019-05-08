import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ContactForm from './ContactForm';
import SelectionReducer from './SelectionReducer';
import ContactReducer from './ContactReducer';
import ContactsCount from './ContactsCount';

// export default combineReducers({
//     libaries: LibraryReducer
// });

const reducers = combineReducers({
    auth: AuthReducer,
    contactForm: ContactForm,
    selectedContact: SelectionReducer, 
    contacts: ContactReducer,
    count: ContactsCount
});

export default reducers;
