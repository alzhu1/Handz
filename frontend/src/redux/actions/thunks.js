import * as a from './actions';
import * as ws from './wsActions';
import axios from 'axios';

export function loginThunk(username, password) {
    return function (dispatch, getState, emit) {
        emit(ws.login(username,password))
        dispatch(a.getUsername(username))
        dispatch(a.isLoggedIn(true))
    }
}

export function logoutThunk(token) {
    return function (dispatch, getState, emit) {
        dispatch(a.getToken(''))
        dispatch(a.isLoggedIn(false))
        dispatch(ws.logout())
        emit(ws.logout())
    }
}

export function createUser(username, password, password2) {
    return function (dispatch, getState, emit) {
        emit(ws.signUp(username, password))
    }
}
