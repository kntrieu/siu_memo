import actionTypes from '../actions/actionTypes';

const initialState = {
    isShow: false,
    message: "Your token is expired! Please login"
}

const errorPopupReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UNAUTHORIZED:
            return {...state, isShow: true}
        default:
            return state
    }
}

export default errorPopupReducer