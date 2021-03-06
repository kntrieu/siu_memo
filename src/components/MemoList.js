import React, {Component} from 'react';
import {connect} from 'react-redux';
import MemoItemComponent from './MemoItem';
import {fetchMemos} from '../services/memos-service';
import {getMemosError, getMemos, getMemosPending} from '../reducers/memos-reducer';
import {bindActionCreators} from 'redux';


class MemoList extends Component {

    componentWillMount() {
        const {fetchMemos} = this.props;
        fetchMemos();
    }

    createMemoListItems () {
        let listItems = [];

        //generate memo item and sort by created_date
        listItems = this.props.memos.sort((a, b) => new Date(b.created_date) - new Date(a.created_date)).map((item) => {
            return (
                <div className="col-lg-3 col-sm-6 siu-memo-list" key={item._id}>
                    <MemoItemComponent memo={item}/>
                </div>
            )
        });
        
        return listItems;
    }


    render () {
        return (
            this.createMemoListItems ()
        );
    }
}


function mapStateToProps(state) {
    return {
        memos: getMemos(state),
        pending: getMemosPending(state)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchMemos: fetchMemos}, dispatch);
}

let MemoContainer = connect(mapStateToProps, mapDispatchToProps)(MemoList);

export default MemoContainer;