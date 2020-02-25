import actionTypes from './actionTypes';
import MemoModel from '../models/MemoModel'
import { act } from 'react-dom/test-utils';



//Action creator

//Add new memo
export const addNewMemo = () => {
    let newMemo = new MemoModel({
        id: "",
        name: "New Memo",
        content: ""
    });
    return {
        type: actionTypes.ADD_NEW_MEMO,
        payload: newMemo
    }
}


export const selectMemo = (memo) => {
    return {
        type: actionTypes.SELECT_MEMO,
        payload: memo
    }
}

export const editMemo = (memo) => {
    return {
        type: actionTypes.EDIT_MEMO,
        payload: memo
    }
}


export const saveMemo = (memo) => {
    return {
        type: actionTypes.SAVE_MEMO,
        payload: memo
    }
}


export const deleteMemo = (memo) => {
    return {
        type: actionTypes.DELETE_MEMO,
        payload: memo
    }
}


export const fetchMemosPending = () => {
    return {
        type: actionTypes.FETCH_MEMOS_PENDING
    }
}


export const fetchMemosSuccess = (memos) => {
    return {
        type: actionTypes.FETCH_MEMOS_SUCCESS,
        payload: memos
    }
}


export const fetchMemosError = (error) => {
    return {
        type: actionTypes.FETCH_MEMOS_ERROR,
        payload: error
    }
}


export const saveMemoPending = () => {
    return {
        type: actionTypes.SAVE_MEMO_PENDING
    }
}


export const saveMemoSuccess = (memo) => {
    return {
        type: actionTypes.SAVE_MEMO_SUCCESS,
        payload: memo
    }
}


export const saveMemoError = (memo) => {
    return {
        type: actionTypes.SAVE_MEMO_ERROR,
        payload: memo
    }
}

export const deleteMemoPending = () => {
    return {
        type: actionTypes.DELETE_MEMO_PENDING,
    }
}

export const deleteMemoSuccess = (memo) => {
    return {
        type: actionTypes.DELETE_MEMO_SUCCESS,
        payload: memo
    }
}


export const deleteMemoError = (error) => {
    return {
        type: actionTypes.DELETE_MEMO_ERROR,
        payload: error
    }
}

export const addMemoPending = () => {
    return {
        type: actionTypes.ADD_MEMO_PENDING,
    }
}


export const addMemoSuccess = (memo) => {
    return {
        type: actionTypes.ADD_MEMO_SUCCESS,
        payload: memo
    }
}

export const addMemoError = (error) => {
    return {
        type: actionTypes.ADD_MEMO_SUCCESS,
        payload: error
    }
}


export const showEditPopup = (memo) => {
    return {
        type: actionTypes.SHOW_EDIT_MEMO_POPUP,
        payload: memo
    }
}

export const hideEditPopup = () => {
    return {
        type: actionTypes.CLOSE_EDIT_POPUP,
        payload: null
    }
}

export const showAddNewPopup = (memo) => {
    return {
        type: actionTypes.SHOW_ADD_MEMO_POPUP,
        payload: memo
    }
}


