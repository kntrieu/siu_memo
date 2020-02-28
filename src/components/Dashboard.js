import React from 'react';
import MemoContainer from '../containers/MemoList';
import EditPopupComponent from '../components/EditPopup';
import NavbarComponent from '../components/Navbar'

function Dashboard () {
    return (
        <>
            <NavbarComponent/>
            <div className="siu-dashboard row">
                <MemoContainer />
                <EditPopupComponent/>
            </div>
        </>
    )
}




export default Dashboard;