import './App.css';
import {login} from '../services/memos-service';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';



class Login extends Component {

    handleClickLogin () {
        let email = document.getElementById('inputEmail').value;
        let password = document.getElementById('inputPassword').value
        this.props.login(email, password);
    }

    handleRendering () {
        let container = "";
        let errorText = "";
        if (this.props.loginReducer.loginError) {
            errorText = <small id="errorText" className="form-text text-danger">
            Email or password is incorrect
        </small>
        }
        if (this.props.loginReducer.isLoginSuccess === false) {
            container = <div className="container-fluild bg-dark welcome login">
                <div className="col-12 login-form h-100">
                    <div className="login-form-content">
                        <div className="form-group">
                            <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
                        </div>
                        <button type="submit" onClick={() => { this.handleClickLogin() }} className="btn btn-primary btn-block">Submit</button>
                        <a type="button" href="/dashboard" className="btn btn-success btn-block">Go to dashboard</a>
                        {errorText}
                    </div>
                </div>
            </div>;
        } else {
            container = <Redirect to="/dashboard"/>
        }

        return container;
    }

    render () {
        return (this.handleRendering());
    }
}

function mapStateToProps(state) {
    return {
        loginReducer: state.loginReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        login: login,
    }, dispatch);
}

let LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;
