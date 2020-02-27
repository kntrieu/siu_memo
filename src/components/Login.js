import React from 'react';
import './App.css';
import {login} from '../services/memos-service';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';



function Login() {
    return (
        <div className="container-fluild bg-dark welcome login">
            <div className="col-12 login-form h-100">
                <div className="login-form-content">
                    <div className="form-group">
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </div>
            </div>
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        login: login
    }, dispatch);
}

let LoginContainer = connect(null, mapDispatchToProps)(Login);

export default LoginContainer;
