import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectMemo} from '../actions';
import {editMemo} from '../actions';
import {saveMemo} from '../actions';
import moment from 'moment';
import MemoModel from '../models/MemoModel';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class MemoItem extends Component {
    
    onTitleChange (event, memo) {
        
        let titleValue = event.target.value;

        let editMemoModel = new MemoModel(memo);

        editMemoModel.name = titleValue;

        this.props.editMemo(editMemoModel);
    }

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

    render () {
        let date_created = new moment(this.props.memo.created_date).format("DD/MM/YYYY HH:mm");

        //Define popup's saveChange button
        let saveChangesButton = this.state.isEdit ? <Button variant="primary" onClick={(event)=> {this.handleSave(this.props.selectedMemo)}}>Save change</Button> : "";

        //Define popup's edit button
        let editButton = !this.state.isEdit ? <Button variant="success" onClick={(event)=> {this.handleEdit(event)}}>Edit</Button> : "";

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
                <div className="siu-memo-item card" title="Click to view" onClick={() => { this.handleClickMemo(this.props.memo) }}>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.memo.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Created date: {date_created}</h6>
                        <p className="card-text">{this.props.memo.content}</p>
                    </div>
                </div>

                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header>
                        {popupTitle}
                    </Modal.Header>
                    <Modal.Body>
                        {popupContent}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=> {this.handleClose()}}>Close</Button>
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
    return bindActionCreators({selectMemo: selectMemo, editMemo: editMemo, saveMemo: saveMemo}, dispatch);
}

let MemoItemComponent = connect(mapStateToProps, mapDispatchToProps)(MemoItem);
export default MemoItemComponent;