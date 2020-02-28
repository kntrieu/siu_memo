import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {showAddNewPopup} from '../actions'
import MemoModel from '../models/MemoModel';
import {logout} from '../actions'

class Navbar extends Component {
    handleClickAddNew () {
        let newMemo = new MemoModel({});
        newMemo.from = this.props.loginReducer.userInfo.fullname;
        this.props.showAddNewPopup(newMemo);
    }

    handleSignout () {
        this.props.logout();
    }

    render () {
        let addNewMemoButton = "";

        let loginButton = "";

        let logoutButton = "";
        
        if (this.props.loginReducer.isLoginSuccess) {
            logoutButton = <button className="btn btn-sm btn-warning" onClick={() => {this.handleSignout()}}><i className="fas fa-sign-out-alt"></i> Logout</button>
            addNewMemoButton = 
                <button className="btn btn-sm btn-primary" onClick={() => { this.handleClickAddNew() }} type="button"><i className="fas fa-plus-square"></i> Add new</button>
        } else {
            loginButton =
                <a className="btn btn-sm btn-success" href="/login"><i className="fas fa-sign-in-alt"></i> Login</a>
        }

        return (
            <nav className="navbar navbar-dark navbar-expand-lg bg-success siu-navbar">
                <a className="navbar-brand" href="/#">Simple Memo App</a>
                <div className="btn-group" role="group">
                    {addNewMemoButton} {logoutButton} {loginButton}
                </div>
                
            </nav>
        );
    }
}


function mapStateToProps(state) {
    return {
        navbar: state.navbar,
        loginReducer: state.loginReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showAddNewPopup: showAddNewPopup,
        logout: logout
    }, dispatch);
}


let NavbarComponent = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default NavbarComponent;