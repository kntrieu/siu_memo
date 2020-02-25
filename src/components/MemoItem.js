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
import {saveMemoItem} from '../services/memos-service';
import {showEditPopup} from '../actions'

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
        this.props.showEditPopup(memo);
    }


    render () {
        let date_created = new moment(this.props.memo.created_date).format("DD/MM/YYYY HH:mm");

        return (
            <>
                <div className="siu-memo-item card" onClick={() => { this.handleClickMemo(this.props.memo) }}>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.memo.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Created date: {date_created}</h6>
                        <div className="card-text">{this.props.memo.content}</div>
                    </div>
                </div>
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
        deleteMemo: deleteMemo,
        saveMemoItem: saveMemoItem,
        showEditPopup: showEditPopup
    }, dispatch);
}

let MemoItemComponent = connect(mapStateToProps, mapDispatchToProps)(MemoItem);
export default MemoItemComponent;