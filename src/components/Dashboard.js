import React from 'react';
import MemoContainer from '../containers/MemoList';
import EditPopupComponent from '../components/EditPopup';

function Dashboard () {
    return (
        <div className="siu-dashboard row">
            <MemoContainer />
            <EditPopupComponent/>
        </div>
    )
}




export default Dashboard;