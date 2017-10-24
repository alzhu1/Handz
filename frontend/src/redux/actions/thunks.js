import * as a from './actions';
import * as ws from './wsActions';
import axios from 'axios';
// import {store} from 'index';
// import {WebSocketBridge} from 'django-channels'

export function loginThunk(username, password) {
    return function (dispatch, getState, emit) {
        return axios.post("/api/auth/",
            {username:username, password:password})
        .then((response) => {
              dispatch(a.getToken(response.data.token));
              emit(ws.login(username,password))
              return response;})
        .then(() => {dispatch(a.getUsername(username))})
        .then(() => {dispatch(a.isLoggedIn(true))},
            error => console.log('An error occured.', error)
        )
    }
}


// .then(() => {emit(ws.modifyUserList(true,username))})


// .then(() => {
//     sock = new WebSocketBridge();
//     sock.connect('ws://localhost:8000/chat/');
//     sock.listen((payload, stream) => {
//         store.dispatch(payload)
//     });}
// )

// export function logoutThunk(token) {
//     return function (dispatch, getState, emit) {
//         return axios.post("/api/logout/", {token: token})
//         .then(() => {dispatch(a.getToken(''));})
//         .then(() => {dispatch(a.isLoggedIn(false));})
//         .then(() => {
//             emit(ws.logout(token));
//             emit(ws.modifyUserList(false,getState().username));
//             },
//             error => console.log('An error occured.', error)
//         )
//     }
// }

export function logoutThunk(token) {
    return function (dispatch, getState, emit) {
        dispatch(a.getToken(''))
        dispatch(a.isLoggedIn(false))
        dispatch(ws.logout())
        emit(ws.logout(token))
        emit(ws.modifyUserList(false,getState().username))
    }
}

export function createUser(username, password) {
    return function (dispatch) {
        return axios.post("/api/signup/",
            {username:username, password:password})
        .then(() => {console.log('sign up success');},
            error => console.log('An error occured.', error))
    }
}
