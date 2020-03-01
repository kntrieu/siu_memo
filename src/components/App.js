import React from 'react';
import './App.css';
import Dashboard from './Dashboard';
import WelcomeContainer from '../components/Welcome';
import Login from '../components/Login';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setLoginSuccess, setLoginPending, setLoginError} from '../actions';
import {bindActionCreators} from 'redux';
import ErrorPopupContainer from './ErrorPopup';

class App extends React.Component {
  componentWillMount() {
    //Get login infor from local storage and update the state.
    const loginInfo = JSON.parse(localStorage.getItem('memoLoginReducer'));
    if (loginInfo && typeof loginInfo === "object") {
      if (loginInfo.isLoginSuccess) {
        this.props.setLoginSuccess(loginInfo);
      } else if (loginInfo.isLoginPending) {
        this.props.setLoginPending(loginInfo.isLoginPending);
      } else if (loginInfo.loginError) {
        this.props.setLoginError(loginInfo.loginError, false);
      }
    }
  }

  render () {
    return (
      <div className="container-fluid siu-container">
        <Route exact path="/" component={WelcomeContainer} />
        <Route exact path="/welcome" component={WelcomeContainer} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/login" component={Login}/>
        <ErrorPopupContainer/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginReducer: state.loginReducer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      setLoginSuccess: setLoginSuccess,
      setLoginPending: setLoginPending,
      setLoginError: setLoginError
  }, dispatch);
}


let AppComponent = connect(mapStateToProps, mapDispatchToProps)(App);


export default AppComponent;

