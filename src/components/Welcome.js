import React from 'react';
import './App.css';
import AppComponent from '../components/App'


function Welcome() {
  return (
      <div className="container-fluild bg-dark welcome">
          <div className="row welcome-row">
              <div className="col-12 welcome-text">
                  <h1 className="text-light">Welcome to Simple Memo</h1>
              </div>
          </div>
          <br />
          <div className="row">
              <div className="col-6 text-right">
                  <a className="btn btn-dark btn-lg welcome-btn text-light" href="/dashboard">View Memo board</a>
              </div>
              <div className="col-6 text-left">
                  <a className="btn btn-dark btn-lg welcome-btn text-light" href="/login">Sign in</a>
              </div>
          </div>
      </div>
  );
}

export default Welcome;
