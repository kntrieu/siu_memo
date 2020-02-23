import React, {Component} from 'react';
import {connect} from 'react-redux';
import MemoItemComponent from '../components/MemoItem'

class MemoList extends Component {
    createMemoListItems () {
        let listItems = this.props.memos.map((item) => {
            return (
                <div className="col-lg-3 col-sm-6 siu-memo-list" key={item.id}>
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
        memos: state.memos
    }
}

let MemoContainer = connect(mapStateToProps)(MemoList);

export default MemoContainer;