import React, {Component} from 'react';
import { Modal } from 'react-bootstrap';
import {connect} from 'react-redux';


class ErrorPopup extends Component {

    render () {
        return (
            <Modal show={this.props.errorPopupReducer.isShow}>
                <Modal.Header>
                    <h5>Information</h5>
                </Modal.Header>
                <Modal.Body>
                    <h6>{this.props.errorPopupReducer.message}</h6>
                </Modal.Body>
                <Modal.Footer>
                    <a className="btn btn-success btn-block" href="/login">Login</a>
                </Modal.Footer>
            </Modal>
        )
    }
}


function mapStateToProps(state) {
    return {
        errorPopupReducer: state.errorPopupReducer,
    }
}


let ErrorPopupContainer = connect(mapStateToProps)(ErrorPopup);


export default ErrorPopupContainer;