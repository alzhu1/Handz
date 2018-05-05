import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import registerServiceWorker from './registerServiceWorker';


import {Provider} from "react-redux";
import {BrowserRouter} from 'react-router-dom';

import {rootReducer, initialState} from 'redux/reducers/reducers';
import {createStore, applyMiddleware} from "redux";

import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

import {WebSocketBridge} from 'django-channels'

// import cards from 'cardsJS';
// import 'cardsJS/cards.css'
import 'css/index.css'
import 'css/cardsjs.css'
import 'css/table.css'
import 'css/chat.css'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import indigo from 'material-ui/colors/indigo';
import pink from 'material-ui/colors/pink';
import red from 'material-ui/colors/red';


const loggerMiddleware = createLogger();

let sock = new WebSocketBridge();
sock.connect('ws://backend-dev2.us-west-1.elasticbeanstalk.com/');
// sock.connect('ws://handz-backend-dev.us-west-1.elasticbeanstalk.com');
// sock.connect('ws://localhost:8000');
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
const theme = createMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    alternateTextColor: '#303030',
    canvasColor: '#303030',
  },
});

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();

// <MuiThemeProvider theme={theme}>
//   <App />
// </MuiThemeProvider>
