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
    setLoginError,
    setUnauhtorized
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


export const saveMemoItem = (memo, token) => {
    return dispatch => {

        dispatch(saveMemoPending());

        memo.token = token;
        
        fetch(baseUrl + '/memos/' + memo._id, {
            method: 'put', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(memo)
        }).then(res => {
            if (!res.ok) {
                throw (res.status);
            }

            return res.json()
        }).then(res => {
            
            dispatch(saveMemoSuccess(res));

            return res;
        }).catch(error => {

            if (error === 401 || error === 403) {
                dispatch(setUnauhtorized({error: error.message}));
            }
            
            dispatch(saveMemoError(error))
        })

        
        
    }
}


export const deleteMemoItem = (memo, token) => {
    return dispatch => {
        dispatch(deleteMemoPending());
        memo.token = token;
        fetch(baseUrl + '/memos/' + memo._id, {method: 'delete', headers: {
            'Content-Type': 'application/json',
          }, body: JSON.stringify(memo)})
        .then(res => {
            if (!res.ok) {
                throw (res.status);
            }

            return res.json();
        })
        .then(res => {

            dispatch(deleteMemoSuccess(memo));
            return res;
        })
        .catch (error => {
            if (error === 401 || error === 403) {
                dispatch(setUnauhtorized({error: error.message}));
            }
            dispatch(deleteMemoError(error))
        })
    }
}

export const addMemoItem = (memo, token) => {
    return dispatch => {
        dispatch(addMemoPending());
        memo.token = token;
        fetch(baseUrl + '/memo', 
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(memo)})
        .then(res => {

            if (!res.ok) {
                throw (res.status);
            } 

            return res.json();
        })
        .then(res => {
            dispatch(addMemoSuccess(res));
            return res;
        })
        .catch (error => {
            if (error === 401 || error === 403) {
                dispatch(setUnauhtorized({error: error.message}));
            }
            dispatch(addMemoError({error: error.message}))
        })
    }
}

function callLoginApi(email, password, callback) {
    fetch(baseUrl + '/login', {method: 'post', headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({email: email, password: password})})
    .then(res => {
        if (!res.ok) {
            throw Error(res.statusText);
        }
        return res.json()
    })
    .then(res => {

        if(res.error) {
            return callback(res.error);
        }

        return callback(res);;
    })
    .catch (error => {
        return callback({error: error});
    })
}

export const login = (email, password) => {
    return dispatch => {
      callLoginApi(email, password, res => {
        dispatch(setLoginPending(false));
        if (!res.error) {
          dispatch(setLoginSuccess(res));
        } else {
          dispatch(setLoginError(res.error));
        }
      });
    }
  }
