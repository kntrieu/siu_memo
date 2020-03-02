import React, {Component} from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {showEditPopup} from '../actions/';
import {hideEditPopup} from '../actions/';
import MemoModel from '../models/MemoModel';
import {saveMemoItem} from '../services/memos-service';
import {deleteMemoItem} from '../services/memos-service';
import {addMemoItem} from '../services/memos-service';
import {editMemo} from '../actions'

class EditPopup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isInvalidName: false,
            isInvalidReceiver: false,
            isInvalidContent: false,
        }
    }

    handleClose() {
        this.props.hideEditPopup();
    }

    handleSave(memo) {
        if (memo.name !== "" && memo.to !== "" && memo.content !== "") {
            if (this.props.editPopupData.isEdit) {
                this.props.saveMemoItem(memo, this.props.loginReducer.accessToken);
            } else {
                if (memo.name !== "" || memo.content !== "") {
                    this.props.addMemoItem(memo, this.props.loginReducer.accessToken);
                }
            }
            
            this.handleClose();
        } else {
            this.setState({
                isInvalidName: memo.name === "" ? true : false,
                isInvalidReceiver: memo.to === "" ? true : false,
                isInvalidContent: memo.content === "" ? true : false,
            })
        }
        
    }

    handleDelete(event,memo) {
        this.props.deleteMemoItem(memo, this.props.loginReducer.accessToken);
        this.handleClose();
    }

    onMemoChange (event, memo) {

        let propertyName = event.target.id;
        let propertyValue = event.target.value;
        let editMemo = new MemoModel(memo);

        editMemo[propertyName] = propertyValue;
        this.props.editMemo(editMemo);
    }

    showTitle (memo) {
        if (memo && this.props.loginReducer.isLoginSuccess) {
            return (
                <>
                    <input id="name" className="form-control" onChange={(event) => { this.onMemoChange(event, memo) }} type="text" placeholder="Enter memo title" value={memo.name} />
                    { this.state.isInvalidName ? <small className="form-text text-danger">Please enter memo's title</small> : null }
                </>
            )
        } else {
            return <h5 className="modal-title">{memo ? memo.name : ""}</h5>
            
        }
    }

    showContent (memo) {
        if (memo && this.props.loginReducer.isLoginSuccess) {
            return (
                <>
                    <textarea id="content" className="form-control memo-textarea-content" placeholder="Enter memo content" onChange={(event) => {this.onMemoChange(event, memo)}} value={memo.content}></textarea>
                    { this.state.isInvalidContent ? <small className="form-text text-danger">Please enter memo's content</small> : null }
                </>
            );
        } else {
            return <p className="memo-content">{memo ? memo.content : ""}</p>
        }
    }

    showFrom (memo) {
        if (memo && this.props.loginReducer.isLoginSuccess) {
            return (
                <>
                    <input id="from" className="form-control" onChange={(event) => { this.onMemoChange(event, memo) }}
                        readOnly={true} type="text" placeholder="Enter creator's name" value={memo.from} />
                </>
            )
        } else {
            return <h6>{memo ? "From: " + memo.from : ""}</h6>
        }
    } 

    showTo (memo) {
        if (memo && this.props.loginReducer.isLoginSuccess) {
            return (
                <>
                    <input id="to" className="form-control" onChange={(event) => { this.onMemoChange(event, memo) }}
                           type="text" placeholder="Enter Receiver's name" value={memo.to} />
                    { this.state.isInvalidReceiver ? <small className="form-text text-danger">Please enter receiver</small> : null }
                </>
            )
        } else {
            return <h6>{memo ? "To: " + memo.to : ""}</h6>
        }
    }

    render () {
        let deletebutton = this.props.editPopupData.isEdit && this.props.loginReducer.isLoginSuccess ? 
                        <Button variant="danger" onClick={(event)=> {this.handleDelete(event, this.props.editPopupData.memo)}}>
                            <i className="fas fa-trash-alt"></i> Delete
                        </Button> : "";

        let saveButton = this.props.loginReducer.isLoginSuccess ? 
                        <Button variant="primary" onClick={(event)=> {this.handleSave(this.props.editPopupData.memo)}}>
                                <i className="fas fa-save"></i> Save
                        </Button> : "";
        return (
            <Modal show={this.props.editPopupData.isShow} onHide={this.props.hideEditPopup}>
                <Modal.Header>
                    <div className="form-group">
                        {this.showTitle (this.props.editPopupData.memo)}
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        {this.showFrom(this.props.editPopupData.memo)}
                    </div>
                    <div className="form-group">
                        {this.showTo(this.props.editPopupData.memo)}
                    </div>
                    <div className="form-group">
                        {this.showContent (this.props.editPopupData.memo)}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=> {this.handleClose()}}><i className="fas fa-window-close"></i> Close</Button>
                    {saveButton}
                    {deletebutton}
                </Modal.Footer>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        editPopupData: state.editPopup,
        loginReducer: state.loginReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showEditPopup: showEditPopup,
        hideEditPopup: hideEditPopup,
        saveMemoItem: saveMemoItem,
        deleteMemoItem: deleteMemoItem,
        addMemoItem: addMemoItem,
        editMemo: editMemo
    }, dispatch);
}

let EditPopupContainer = connect(mapStateToProps, mapDispatchToProps)(EditPopup);


export default EditPopupContainer;