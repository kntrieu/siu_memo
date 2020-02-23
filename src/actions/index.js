import actionTypes from './actionTypes';
import MemoModel from '../models/MemoModel'



//Action creator

//Add new memo
export const addNewMemo = () => {
    let newMemo = new MemoModel({});
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