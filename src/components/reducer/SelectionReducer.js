export default (state = [], action) => {
    switch (action.type) {
        case 'select_contact':
            return action.payload;
        default:
            return state;
    }
};
