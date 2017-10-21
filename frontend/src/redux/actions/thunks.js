import * as a from './actions';
import * as ws from './wsActions';
import axios from 'axios';

export function login(username, password) {
    return function (dispatch, getState, emit) {
        return axios.post("/api/auth/",
            {username:username, password:password})
        .then((response) => {
              dispatch(a.getToken(response.data.token));
              return response;})
        .then(()=>{axios.post("/api/login/", {
                username: username,
                password: password
              })})
        .then(() => {dispatch(a.getUsername(username))})
        .then(() => {emit(ws.socketOpen(true,username))})
        .then(() => {dispatch(a.isLoggedIn(true))},
            error => console.log('An error occured.', error)
        )
    }
}


export function logout(token) {
    return function (dispatch, getState, emit) {
        return axios.post("/api/logout/", {token: token})
        .then(() => {dispatch(a.getToken(''));})
        .then(() => {dispatch(a.isLoggedIn(false));})
        .then(() => {emit(ws.socketOpen(false,getState().username));},
            error => console.log('An error occured.', error)
        )
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
