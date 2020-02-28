import MemoReducer from './memos-reducer';
import Navbar from './nav-bar-reducer';
import SelectedMemo from './selected-memo-reducer';
import NewMemo from './new-memo-reducer';
import EditPopup from './edit-popup-reducer';
import LoginReducer from './login-reducer';
import {combineReducers} from 'redux';
import ErrorPopupReducer from './error-popup-reducer';

const allReducers = combineReducers({
    memos: MemoReducer,
    navbar: Navbar,
    selectedMemo: SelectedMemo,
    newMemo: NewMemo,
    editPopup: EditPopup,
    loginReducer: LoginReducer,
    errorPopupReducer: ErrorPopupReducer
})

export default allReducers;