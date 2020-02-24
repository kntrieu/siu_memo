import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectMemo} from '../actions';
import {editMemo} from '../actions';
import {saveMemo} from '../actions';
import {deleteMemo} from '../actions';
import moment from 'moment';
import MemoModel from '../models/MemoModel';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class MemoItem extends Component {
    
    onMemoChange (event, memo) {

        let propertyName = event.target.id;
        let propertyValue = event.target.value;
        let editMemo = new MemoModel(memo);

        editMemo[propertyName] = propertyValue;
        this.props.editMemo(editMemo);
    }

    state = {
        showModal: false,
        isEdit: false
    }


    handleClickMemo (memo) {
        this.props.selectMemo(memo);

        //open popup
        this.setState({showModal: true});
    }

    handleClose (event) {
        this.setState({
            showModal: false,
            isEdit: false
        });
    }


    handleEdit (event, memo) {
        this.setState({isEdit: true});
    }

    handleSave (memo) {
        this.props.saveMemo(memo);

        this.handleClose();
    }

    handleOnHide() {

    }

    handleDelete (event, memo) {
        this.props.deleteMemo(memo);
    }

    render () {
        let date_created = new moment(this.props.memo.created_date).format("DD/MM/YYYY HH:mm");

        //Define popup's saveChange button
        let saveChangesButton = this.state.isEdit ? <Button variant="primary" onClick={(event)=> {this.handleSave(this.props.selectedMemo)}}>Save change</Button> : "";

        //Define popup's edit button
        let editButton = !this.state.isEdit ? <Button variant="success" onClick={(event)=> {this.handleEdit(event)}}><i className="fas fa-edit"></i> Edit</Button> : "";

        //Delete button
        let deleteButton = <Button variant="danger" onClick={(event)=> {this.handleDelete(event, this.props.selectedMemo)}}><i className="fas fa-trash-alt"></i> Delete</Button>

        //Define popup title
        let popupTitle = "";
        let popupContent = "";

        if (this.state.isEdit) {
            popupTitle = <div className="form-group">
                            <input id="name" className="form-control" onChange={(event) => {this.onMemoChange(event, this.props.selectedMemo)}} type="text" placeholder="Enter memo title" value={this.props.selectedMemo.name} />
                         </div>;
            popupContent = <div className="form-group">
                                <textarea id="content" className="form-control" onChange={(event) => {this.onMemoChange(event, this.props.selectedMemo)}} value={this.props.selectedMemo.content}></textarea>
                           </div>
        } else {
            popupTitle = <Modal.Title>{this.props.selectedMemo ? this.props.selectedMemo.name : ""}</Modal.Title>
            popupContent = this.props.selectedMemo ? this.props.selectedMemo.content : "";
        }

        return (
            <>
                <div className="siu-memo-item card" onClick={() => { this.handleClickMemo(this.props.memo) }}>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.memo.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Created date: {date_created}</h6>
                        <p className="card-text">{this.props.memo.content}</p>
                    </div>
                </div>

                <Modal show={this.state.showModal} onHide={this.handleOnHide}>
                    <Modal.Header>
                        {popupTitle}
                    </Modal.Header>
                    <Modal.Body>
                        {popupContent}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=> {this.handleClose()}}><i className="fas fa-window-close"></i> Close</Button>
                        {deleteButton}
                        {editButton}
                        {saveChangesButton}
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectedMemo: state.selectedMemo
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        selectMemo: selectMemo, 
        editMemo: editMemo, 
        saveMemo: saveMemo,
        deleteMemo: deleteMemo
    }, dispatch);
}

let MemoItemComponent = connect(mapStateToProps, mapDispatchToProps)(MemoItem);
export default MemoItemComponent;