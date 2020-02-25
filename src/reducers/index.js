import MemoReducer from './memos-reducer';
import Navbar from './nav-bar-reducer';
import SelectedMemo from './selected-memo-reducer';
import NewMemo from './new-memo-reducer';
import EditPopup from './edit-popup-reducer'
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    memos: MemoReducer,
    navbar: Navbar,
    selectedMemo: SelectedMemo,
    newMemo: NewMemo,
    editPopup: EditPopup
})

export default allReducers;