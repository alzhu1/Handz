import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import registerServiceWorker from './registerServiceWorker';


import {Provider} from "react-redux";
import {BrowserRouter} from 'react-router-dom';

import {store} from 'redux/reducers/reducers'

var lobbySock = "ws://localhost:8000/lobby/";
var signupSock = "ws://localhost:8000/signup/";
var chatSock = "ws://localhost:8000/users/";

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
