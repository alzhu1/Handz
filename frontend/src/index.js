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

import {WebSocketBridge} from 'django-channels'

const rootReducer = combineReducers({
                    token,
                    username,
                    chats,
                    is_logged_in,
                    userlist,
                    });

const initialState = {};

const loggerMiddleware = createLogger();

const sock = new WebSocketBridge();
sock.connect('ws://localhost:8000/chat/');
sock.listen((payload, stream) => {
    store.dispatch(payload)
});

const emit = (message) => sock.send(message);

export const store = createStore(rootReducer, initialState,
  applyMiddleware(
    thunk.withExtraArgument(emit),
    loggerMiddleware,
));



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
