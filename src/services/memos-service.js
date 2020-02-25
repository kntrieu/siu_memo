import {
    fetchMemosPending, 
    fetchMemosSuccess, 
    fetchMemosError, 
    saveMemoPending, 
    saveMemoSuccess, 
    saveMemoError, 
    deleteMemoSuccess,
    deleteMemoPending,
    deleteMemoError,
    addMemoPending,
    addMemoSuccess,
    addMemoError
} from '../actions';

import {configObj} from "../configs";

let baseUrl = configObj.serviceBaseURL;


export const fetchMemos = () => {
    return dispatch => {
        dispatch(fetchMemosPending());
        fetch(baseUrl + '/memos')
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchMemosSuccess(res));
            return res;
        })
        .catch(error => {
            dispatch(fetchMemosError(error));
        })
    }
}


export const saveMemoItem = (memo) => {
    return dispatch => {
        dispatch(saveMemoPending());
        fetch(baseUrl + '/memos/' + memo._id, {method: 'put', headers: {
            'Content-Type': 'application/json',
          }, body: JSON.stringify(memo)})
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }

            dispatch(saveMemoSuccess(res));
            return res;
        })
        .catch (error => {
            dispatch(saveMemoError(error))
        })
    }
}


export const deleteMemoItem = (memo) => {
    return dispatch => {
        dispatch(deleteMemoPending());
        fetch(baseUrl + '/memos/' + memo._id, {method: 'delete', headers: {
            'Content-Type': 'application/json',
          }, body: JSON.stringify(memo)})
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }

            dispatch(deleteMemoSuccess(memo));
            return res;
        })
        .catch (error => {
            dispatch(deleteMemoError(error))
        })
    }
}

export const addMemoItem = (memo) => {
    return dispatch => {
        dispatch(addMemoPending());
        fetch(baseUrl + '/memo', {method: 'post', headers: {
            'Content-Type': 'application/json',
          }, body: JSON.stringify(memo)})
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }

            dispatch(addMemoSuccess(res));
            return res;
        })
        .catch (error => {
            dispatch(addMemoError(error))
        })
    }
}
