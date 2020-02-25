import actionTypes from '../actions/actionTypes'
const initialState  = {
    pending: false,
    memos: [],
    error: null
}

const memoReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_MEMO_SUCCESS:
            return {...state, memos: [...state.memos, action.payload] };
        case actionTypes.SAVE_MEMO_SUCCESS:
            
            let memos = state.memos.map((item) => {
                if (item._id !== action.payload._id) {
                    return item;
                }

                return {
                    ...item, ...action.payload
                }
            });

            return {...state, pending: false, memos: memos}

        case actionTypes.DELETE_MEMO_SUCCESS:
            return {...state, memos: state.memos.filter((item) => item._id !== action.payload._id)}

        case actionTypes.SAVE_MEMO_PENDING:
        case actionTypes.DELETE_MEMO_PENDING:
        case actionTypes.ADD_MEMO_PENDING:
        case actionTypes.FETCH_MEMOS_PENDING:
            return {
                ...state,
                pending: true
            }
        case actionTypes.ADD_MEMO_SUCCESS:
        case actionTypes.FETCH_MEMOS_SUCCESS:
            return {
                ...state,
                pending: false,
                memos: action.payload
            }

        case actionTypes.SAVE_MEMO_ERROR:
        case actionTypes.DELETE_MEMO_ERROR:
        case actionTypes.ADD_MEMO_ERROR:
        case actionTypes.FETCH_MEMOS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload
            }
        default: 
            return state;
    }
}

export default memoReducer;

export const getMemos = state => state.memos.memos;
export const getMemosPending = state => state.memos.pending;
export const getMemosError = state => state.memos.error;