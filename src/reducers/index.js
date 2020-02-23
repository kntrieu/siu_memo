import MemoReducer from './memos-reducer';
import Navbar from './nav-bar-reducer';
import SelectedMemo from './selected-memo-reducer';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    memos: MemoReducer,
    navbar: Navbar,
    selectedMemo: SelectedMemo
})

export default allReducers;