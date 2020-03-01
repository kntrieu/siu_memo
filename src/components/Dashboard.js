import React from 'react';
import MemoListContainer from '../components/MemoList';
import EditPopupComponent from '../components/EditPopup';
import NavbarComponent from '../components/Navbar'

function Dashboard () {
    return (
        <>
            <NavbarComponent/>
            <div className="siu-dashboard row">
                <MemoListContainer />
                <EditPopupComponent/>
            </div>
        </>
    )
}




export default Dashboard;