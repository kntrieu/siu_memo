import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectMemo} from '../actions';
import moment from 'moment';

class MemoItem extends Component {
    render () {
        let title = "";
        let content = "";
        let date_created = new moment(this.props.memo.created_date).format("DD/MM/YYYY HH:mm:ss");

        if (this.props.selectedMemo && this.props.selectedMemo.id === this.props.memo.id) {
            title = <form>
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Enter memo title" value={this.props.selectedMemo.name}></input>
                        </div>
                    </form>
            
        } else {
            title = <h5 className="card-title">{this.props.memo.name}</h5>
        }

        return (
            <div className="siu-memo-item card" onClick={() => { this.props.selectMemo(this.props.memo) }}>
                <div className="card-body">
                    {title}
                    <h6 className="card-subtitle mb-2 text-muted">{date_created}</h6>
                    <p className="card-text">{this.props.memo.content}</p>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        selectedMemo: state.selectedMemo
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({selectMemo: selectMemo}, dispatch);
}

let MemoItemComponent = connect(mapStateToProps, mapDispatchToProps)(MemoItem);

export default MemoItemComponent;