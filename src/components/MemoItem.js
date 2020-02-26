import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectMemo} from '../actions';
import {editMemo} from '../actions';
import {saveMemo} from '../actions';
import {deleteMemo} from '../actions';
import moment from 'moment';
import MemoModel from '../models/MemoModel';
import {saveMemoItem} from '../services/memos-service';
import {showEditPopup} from '../actions';
import {deleteMemoItem} from '../services/memos-service';

class MemoItem extends Component {
    constructor(props) {
        super(props);
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


    handleClickMemo (event, memo) {
        if (event.target.id !== "closeBtn") {
            this.props.selectMemo(memo);
            this.props.showEditPopup(memo);
        } else {
            this.props.deleteMemoItem(memo);
        }
        
    }


    render () {
        let date_created = moment(this.props.memo.created_date).format("DD/MM/YYYY HH:mm");
        let from = this.props.memo.from;
        let to = this.props.memo.to;
        return (
            <>
                <div className="siu-memo-item card" onClick={(event) => { this.handleClickMemo(event,this.props.memo) }}>
                    <div className="card-header">
                        <h5>{this.props.memo.name}</h5>
                        <button type="button" className="close close-button" aria-label="Close">
                            <span aria-hidden="true" id="closeBtn">&times;</span>
                        </button>
                    </div>
                    <div className="card-body">
                        <h6 className="card-subtitle mb-2 text-muted">Created date: {date_created}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">From: {from}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">To: {to}</h6>
                        <div className="card-text">{this.props.memo.content}</div>
                    </div>
                </div>
            </>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        selectMemo: selectMemo, 
        editMemo: editMemo, 
        saveMemo: saveMemo,
        deleteMemo: deleteMemo,
        saveMemoItem: saveMemoItem,
        showEditPopup: showEditPopup,
        deleteMemoItem: deleteMemoItem
    }, dispatch);
}

let MemoItemComponent = connect(null, mapDispatchToProps)(MemoItem);
export default MemoItemComponent;