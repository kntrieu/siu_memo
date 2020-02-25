import actionTypes from '../actions/actionTypes';
const initialState = {
    isShow: false,
    isEdit: true,
    memo: null
}
const editPopupReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_EDIT_MEMO_POPUP:
            return {
                ...state, isShow: true, isEdit: true, memo: action.payload
            }
        case actionTypes.SHOW_ADD_MEMO_POPUP:
            return {
                ...state, isShow: true, isEdit: false, memo: action.payload
            }
        case actionTypes.CLOSE_EDIT_POPUP:
            return {
                ...state, isShow: false
            }
        case actionTypes.EDIT_MEMO:
            return {
                ...state, memo: action.payload
            }
        default:
            return state
    }
}


export default editPopupReducer