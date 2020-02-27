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
    addMemoError,
    setLoginPending,
    setLoginSuccess,
    setLoginError
} from '../actions';

import {configObj} from "../configs";
import MemoModel from '../models/MemoModel';

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
            let memoList = res.map( memo => {
                return new MemoModel(memo);
            });
            dispatch(fetchMemosSuccess(memoList));
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

function callLoginApi(email, password, callback) {
    setTimeout(() => {
        if (email === 'admin@example.com' && password === 'admin') {
            return callback(null);
        } else {
            return callback(new Error('Invalid email and password'));
        }
    }, 1000);
}

export const login = (email, password) => {
    return dispatch => {
      dispatch(setLoginPending(true));
      dispatch(setLoginSuccess(false));
      dispatch(setLoginError(null));
  
      callLoginApi(email, password, error => {
        dispatch(setLoginPending(false));
        if (!error) {
          dispatch(setLoginSuccess(true));
        } else {
          dispatch(setLoginError(error));
        }
      });
    }
  }
