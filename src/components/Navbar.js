import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {showAddNewPopup} from '../actions'
import MemoModel from '../models/MemoModel';

class Navbar extends Component {
    handleClickAddNew () {
        let newMemo = new MemoModel({});
        this.props.showAddNewPopup(newMemo);
    }

    render () {
        return (
            <nav className="navbar navbar-dark navbar-expand-lg bg-success siu-navbar">
                <a className="navbar-brand" href="/#">Simple Memo App</a>
                <form className="form-inline">
                    <button className="btn btn-sm btn-success" onClick={() => {this.handleClickAddNew()} } type="button"><i className="fas fa-plus-square"></i> Add new memo</button>
                </form>
            </nav>
        );
    }
}


function mapStateToProps(state) {
    return {
        navbar: state.navbar
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showAddNewPopup: showAddNewPopup
    }, dispatch);
}


let NavbarComponent = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default NavbarComponent;