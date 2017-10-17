import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import registerServiceWorker from './registerServiceWorker';


import {Provider} from "react-redux";
import {BrowserRouter} from 'react-router-dom';

import {token, username, chats, is_logged_in, userlist} from 'redux/reducers/reducers';
import {createStore, combineReducers,applyMiddleware} from "redux";

import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'

const rootReducer = combineReducers({
                    token,
                    username,
                    chats,
                    is_logged_in,
                    userlist,
                    });

const initialState = {}

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
            <App/>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
