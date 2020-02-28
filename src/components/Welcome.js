import React from 'react';
import './App.css';
import {connect} from 'react-redux';


class Welcome extends React.Component {

    render () {
        let signinButton = "";
        let colClass = "col-12 text-center";
        let welcomeText = this.props.loginReducer.isLoginSuccess ? <h1 className="text-light">Hello {this.props.loginReducer.userInfo.fullname}</h1> : "";
        if (!this.props.loginReducer.isLoginSuccess) {
            signinButton =
                <div className="col-6 text-left">
                    <a className="btn btn-dark btn-lg welcome-btn text-light" href="/login">Sign in</a>
                </div>
            colClass = "col-6 text-right";
        }
        return (
            <div className="container-fluild bg-dark welcome">
                <div className="row welcome-row">
                    <div className="col-12 welcome-text">
                        {welcomeText}
                        <h1 className="text-light">Welcome to Simple Memo Board</h1>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className={colClass}>
                        <a className="btn btn-dark btn-lg welcome-btn text-light" href="/dashboard">View Memo board</a>
                    </div>
                    {signinButton}
                </div>
            </div>
        );
    }
    
}

function mapStateToProps (state) {
    return {
        loginReducer: state.loginReducer
    }
}

let WelcomeContainer = connect(mapStateToProps)(Welcome);

export default WelcomeContainer;
