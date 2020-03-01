import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {showAddNewPopup} from '../actions'
import MemoModel from '../models/MemoModel';
import {logout} from '../actions'

class Navbar extends Component {

    //When clicking on "add new" button
    handleClickAddNew () {
        //Create new blank memo from model
        let newMemo = new MemoModel({});

        //Set creator
        newMemo.from = this.props.loginReducer.userInfo.fullname;

        //Open add new memo modal
        this.props.showAddNewPopup(newMemo);
    }

    //When click on "Logout" button
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
            <>
                <nav className="navbar navbar-dark navbar-expand-lg bg-success siu-navbar">
                    <a className="navbar-brand" href="/#">Simple Memo Board</a>
                    <div className="btn-group" role="group" className="d-none d-lg-block">
                        {addNewMemoButton} {logoutButton} {loginButton}
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </nav>
                <div className="collapse" id="navbarToggleExternalContent">
                    <div className="bg-light p-4">
                        <ul className="nav justify-content-end">
                            <li className="nav-item">
                                {addNewMemoButton}
                            </li>
                            <li className="nav-item">
                                {logoutButton}
                            </li>
                            <li className="nav-item">
                                {loginButton}
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        );
    }
}


function mapStateToProps(state) {
    return {
        navbar: state.navbar, //get navbar state
        loginReducer: state.loginReducer //get login info  state
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