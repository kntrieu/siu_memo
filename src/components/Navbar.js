import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addNewMemo} from '../actions/'

class Navbar extends Component {
    
    render () {
        return (
            <nav className="navbar navbar-dark navbar-expand-lg bg-success siu-navbar">
                <a className="navbar-brand" href="/#">SIU Memo</a>
                <form className="form-inline">
                    <button className="btn btn-sm btn-success" onClick={() => {this.props.addNewMemo()} } type="button">Add new memo</button>
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
    return bindActionCreators({addNewMemo: addNewMemo}, dispatch);
}


let NavbarComponent = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default NavbarComponent;