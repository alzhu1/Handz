import * as a from './actionTypes';
import * as ws from './wsActions';
import axios from 'axios';

export const getToken = (token) => ({
  type: a.GET_TOKEN,
  token
});

export const getUsername = (username) => ({
  type: a.GET_USERNAME,
  username
});



export const isLoggedIn = (bool) => ({
  type: a.IS_LOGGED_IN,
  bool
});

export function login(username, password) {
    return function (dispatch, getState, emit) {
        return axios.post("/api/auth/",
            {username:username, password:password})
        .then((response) => {
              dispatch(getToken(response.data.token));
              return response;})
        .then(()=>{axios.post("/api/login/", {
                username: username,
                password: password
              })})
        .then(() => {dispatch(getUsername(username))})
        .then(() => {emit(ws.socketOpen(true,username))})
        .then(() => {dispatch(isLoggedIn(true))},
            error => console.log('An error occured.', error)
        )
    }
}







export function logout(token) {
    return function (dispatch, getState, emit) {
        return axios.post("/api/logout/", {token: token})
        .then(() => {dispatch(getToken(''));})
        .then(() => {dispatch(isLoggedIn(false));})
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
