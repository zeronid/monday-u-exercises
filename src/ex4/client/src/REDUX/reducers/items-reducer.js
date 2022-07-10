const initialState = {
    items: []
};

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ITEMS':
            return {
                ...initialState,
                items: action.payload
            }
        default:
            return state;
    }
};
export default itemsReducer;