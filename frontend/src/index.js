import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import registerServiceWorker from './registerServiceWorker';


import {Provider} from "react-redux";
import {BrowserRouter} from 'react-router-dom';

import {login, logout, resetText, addText, apiLogin, getUsername} from 'redux/actions/actions';

import {token, texts, username, chats, logged_in} from 'redux/reducers/reducers';
import {createStore, combineReducers,applyMiddleware} from "redux";

import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'

import axios from 'axios';


var lobbySock = "ws://localhost:8000/lobby/";
var signupSock = "ws://localhost:8000/signup/";

const rootReducer = combineReducers({
                    token,
                    texts,
                    username,
                    chats,
                    logged_in
                    });

const initialState = {token: '',
                      texts: [],
                      username: '',
                      chats: [],
                      logged_in: false}

const loggerMiddleware = createLogger()

export const store = createStore(rootReducer, initialState,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  ));


// console.log('test login')
// var temp = axios.post("/api/auth/", {
//     username: 'william',
//     password: 'william123'
// })

// store
//   .dispatch(apiLogin('william','william123'))
//   .then(() => console.log(store.getState()));

// console.log(getUsername('william'));

// store.dispatch(getUsername('william'));
// store.dispatch(username('',getUsername('william')));
// console.log(store.getState());


ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App lobbySock={lobbySock} signupSock={signupSock} />
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
