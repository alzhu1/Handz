import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {createStore, combineReducers} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter} from 'react-router-dom';

var lobbySock = "ws://localhost:8000/lobby/";
var signupSock = "ws://localhost:8000/signup/";
var chatSock = "ws://localhost:8000/users/";

const token = (state = "", action) => {
    switch(action.type) {
        case "LOGIN":
            return action.payload;

        case "LOGOUT":
            return "";

        default:
            break;
    }
    return state;
}

const texts = (state = [], action) => {
    switch(action.type) {
        case "RESET_TEXT":
            return [];

        case "ADD_TEXT":
            return [
                ...state,
                action.payload
            ];

        default:
            break;
    }
    return state;
}

const store = createStore(combineReducers({token, texts}), {token: "", texts: []});

store.subscribe(() => {
    console.log("Update", store.getState());
});

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App lobbySock={lobbySock} signupSock={signupSock} chatSock={chatSock} />
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
