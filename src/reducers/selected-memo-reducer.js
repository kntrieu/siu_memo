import actionTypes from '../actions/actionTypes';

const selectedMemoReducer = (state = null, action) => {
    switch (action.type) {
        case actionTypes.SELECT_MEMO:
            
            return action.payload;
        default: 
            return state;
    }
}

export default selectedMemoReducer;