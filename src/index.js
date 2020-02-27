import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import allReducers from './reducers';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import {Provider} from 'react-redux';
import WelcomeContainer from './components/Welcome';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Login from './components/Login';

const middlewares = [thunk];


const store = createStore(allReducers, applyMiddleware(...middlewares));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route exact path="/" component={WelcomeContainer} />
            <Route exact path="/dashboard" component={App} />
            <Route exact path="/login" component={Login} />
        </Router>
    </Provider>,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
