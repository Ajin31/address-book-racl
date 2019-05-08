import {
    CONTACTS_COUNT
} from '../actions/types';

const INITIAL_STATE = {
    count: 10
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CONTACTS_COUNT:
            return { ...state, count: action.payload };
        default:
            return state;
    }
};
