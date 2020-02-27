import actionTypes from '../actions/actionTypes';
export default function reducer(state = {
    isLoginSuccess: false,
    isLoginPending: false,
    loginError: null
  }, action) {
    switch (action.type) {
      case actionTypes.SET_LOGIN_PENDING:
        return Object.assign({}, state, {
          isLoginPending: action.payload
        });
  
      case actionTypes.SET_LOGIN_SUCCESS:
        return Object.assign({}, state, {
          isLoginSuccess: action.payload
        });
  
      case actionTypes.SET_LOGIN_ERROR:
        return Object.assign({}, state, {
          loginError: action.payload
        });
  
      default:
        return state;
    }
  }