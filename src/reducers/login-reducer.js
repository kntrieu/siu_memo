import actionTypes from '../actions/actionTypes';

let initialState = {
    isLoginSuccess: false,
    isLoginPending: false,
    loginError: null,
    accessToken: "",
    refreshToken: "",
    userInfo: ""
}

const loginReducer = (state = initialState, action) => {
    let loginInfo = null;
    switch (action.type) {
        case actionTypes.SET_LOGIN_PENDING:

          loginInfo =Object.assign({}, state, {
            isLoginPending: action.payload
          });

          localStorage.setItem('memoLoginReducer', JSON.stringify(loginInfo));

          return loginInfo;
  
      case actionTypes.SET_LOGIN_SUCCESS:

        loginInfo = Object.assign({}, state, {
          isLoginSuccess: true,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          userInfo: action.payload.userInfo
        });

        localStorage.setItem('memoLoginReducer', JSON.stringify(loginInfo));

        return loginInfo;
  
      case actionTypes.SET_LOGIN_ERROR:

        loginInfo = Object.assign({}, state, {
          loginError: action.payload,
          isLoginSuccess: false
        });

        localStorage.setItem('memoLoginReducer', JSON.stringify(loginInfo));

        return loginInfo;
      case actionTypes.LOGOUT:
      case actionTypes.UNAUTHORIZED:
        localStorage.setItem('memoLoginReducer', JSON.stringify(initialState));
        return initialState;
  
      default:
        //localStorage.setItem('memoLoginReducer', JSON.stringify(state));
        return state;
    }
}

export default loginReducer;