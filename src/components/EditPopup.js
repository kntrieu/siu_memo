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

    handleClose() {
        this.props.hideEditPopup();
    }

    handleSave(memo) {
        if (this.props.editPopupData.isEdit) {
            this.props.saveMemoItem(memo);
        } else {
            if (memo.name !== "" || memo.content !== "") {
                this.props.addMemoItem(memo)
            }
        }
        
        this.handleClose();
    }

    handleDelete(event,memo) {
        this.props.deleteMemoItem(memo);
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
        if (memo) {
            return <input id="name" className="form-control" onChange={(event) => { this.onMemoChange(event, memo) }} type="text" placeholder="Enter memo title" value={memo.name} />
        } 
    }

    showContent (memo) {
        if (memo) {
            return <textarea id="content" className="form-control" placeholder="Enter memo content" onChange={(event) => {this.onMemoChange(event, memo)}} value={memo.content}></textarea>
        }
    }

    showFrom (memo) {
        if (memo) {
            return <input id="from" className="form-control" onChange={(event) => { this.onMemoChange(event, memo) }} type="text" placeholder="Enter creator's name" value={memo.from} />
        }
    } 

    showTo (memo) {
        if (memo) {
            return <input id="to" className="form-control" onChange={(event) => { this.onMemoChange(event, memo) }} type="text" placeholder="Enter Receiver's name" value={memo.to} />
        }
    }

    render () {
        let deletebutton = this.props.editPopupData.isEdit ? <Button variant="danger" onClick={(event)=> {this.handleDelete(event, this.props.editPopupData.memo)}}><i className="fas fa-trash-alt"></i> Delete</Button> : "";
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
                    <Button variant="primary" onClick={(event)=> {this.handleSave(this.props.editPopupData.memo)}}><i className="fas fa-save"></i> Save</Button>
                    {deletebutton}
                </Modal.Footer>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        editPopupData: state.editPopup
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