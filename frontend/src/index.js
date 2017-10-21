import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import registerServiceWorker from './registerServiceWorker';


import {Provider} from "react-redux";
import {BrowserRouter} from 'react-router-dom';

import {token, username, chats, is_logged_in, userlist} from 'redux/reducers/reducers';
import {createStore, combineReducers,applyMiddleware} from "redux";

import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

import {chatMessage} from 'redux/actions/wsActions';
import {messageTypes} from 'redux/actions/actionTypes'

const rootReducer = combineReducers({
                    token,
                    username,
                    chats,
                    is_logged_in,
                    userlist,
                    });

const initialState = {};

const loggerMiddleware = createLogger();

var sock = new WebSocket('ws://localhost:8000/chat/');

const websocketInit = (store) => {

    // Object.keys(messageTypes).forEach(type => console.log(type))

    sock.onmessage = (payload) => {
        let data = JSON.parse(payload.data);
        console.log(data)
        store.dispatch(data)
    }
}

const emit = (message) => sock.send(JSON.stringify(message));

export const store = createStore(rootReducer, initialState,
  applyMiddleware(
    thunk.withExtraArgument(emit),
    loggerMiddleware,
  ));

websocketInit(store);

// console.log('test login')
// var temp = axios.post("/api/auth/", {
//     username: 'william',
//     password: 'william123'
// })

// store
//   .dispatch(login('william','william123'))
//   .then(() => console.log(store.getState()));

// console.log(getUsername('william'));

// store.dispatch(getUsername('william'));
// store.dispatch(username('',getUsername('william')));
// console.log(store.getState());


ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
