import { 
    CONTACT_UPDATE, 
    NEW_CONTACT, 
    CONTACT_SAVE_SUCCESS,
    INVALID_INPUT,
    INITIAL_STATE
} from '../actions/types';

const INITIAL_STATES = {
    name: '',
    phone: '',
    address: '',
    email: '',
    gender: '',
    image: '',
    errPhone: '',
    errEmail: '',
    errName: '',
    search: ' '
};

export default (state = INITIAL_STATES, action) => {
    switch (action.type) {
        case CONTACT_UPDATE:
          return { ...state, [action.payload.prop]: action.payload.value, errEmail: action.payload.errEmail, errName: action.payload.errName, errPhone: action.payload.errPhone };
        case INITIAL_STATE:
          return INITIAL_STATES;
         case NEW_CONTACT:
          return INITIAL_STATES;
        case INVALID_INPUT:
          return state;
         case CONTACT_SAVE_SUCCESS:
          return INITIAL_STATES;
        default:
        return state;
    }
};
