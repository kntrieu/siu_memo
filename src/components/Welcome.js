import React from 'react';
import './App.css';
import {connect} from 'react-redux';


class Welcome extends React.Component {

    render () {
        let signinButton = "";
        let floatClass = "";
        let className = "col-12 col-md-12 d-none d-sm-block d-md-block btn-max-width";
        let welcomeText = this.props.loginReducer.isLoginSuccess ? <h1 className="text-light">Hello {this.props.loginReducer.userInfo.fullname}</h1> : "";
        if (!this.props.loginReducer.isLoginSuccess) {
            className = "col-6 col-md-6 d-none d-sm-block d-md-block btn-max-width";
            signinButton =
                
                <div className="form-group">
                    <a className="btn btn-dark btn-block text-light form-control btn-300" href="/login">Sign in</a>
                </div>;
            floatClass = " float-right";
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
                <div className="row px-2">
                    <div className="col-12 d-block d-sm-none">
                        <div className="form-group">
                            <a className="btn btn-dark btn-block text-light form-control btn-300" href="/dashboard">View Memo board</a>
                        </div>
                    </div>
                </div>
                <div className="row px-2 ">
                    <div className="col-12 d-block d-sm-none">
                    {signinButton}
                    </div>
                </div>

                <div className="row">
                    <div className={className}>
                        <div className= {floatClass + " form-group"}>
                            <a className="btn btn-dark btn-block text-light form-control btn-300 margin-auto" href="/dashboard">View Memo board</a>
                        </div>
                    </div>
                    
                    <div className="col-6 col-md-6 d-none d-sm-block d-md-block btn-max-width">
                        {signinButton}
                    </div>
                    
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
