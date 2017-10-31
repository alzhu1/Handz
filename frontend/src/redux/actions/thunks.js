import * as a from './actions';

export function loginThunk(username, password) {
    return function (dispatch, getState, emit) {
        emit(a.login(username,password))
        dispatch(a.getUsername(username))
        dispatch(a.isLoggedIn(true))
    }
}

export function logoutThunk() {
    return function (dispatch, getState, emit) {
        // dispatch(a.getToken(''))
        dispatch(a.isLoggedIn(false))
        dispatch(a.logout())
        emit(a.logout())
    }
}

export function createUser(username, password, password2) {
    return function (dispatch, getState, emit) {
        emit(a.signUp(username, password))
    }
}

export const joinTableThunk = (table_id) => (
    function (dispatch, getState, emit) {
        return(emit(a.joinTable(table_id)));
    }
)

export const createTableThunk = () => (
    function (dispatch, getState, emit) {
        return(emit(a.createTable()));
    }
)

export const chatThunk = (message, receiver) => (
    function (dispatch, getState, emit) {
        let username = getState().username
        let send = a.chatMessage(message, username, receiver)
        return(emit(send));
    }
)

export const takeSeatThunk = (seat, table_id) => (
    function (dispatch, getState, emit) {
        return(emit(a.takeSeat(seat,table_id)));
    }
)

// export const chatThunk = (message, receiver) => (
//     function (dispatch, getState, emit) {
//         let username = getState().username
//         let send = a.chatMessage(message, username, receiver)
//         return(emit(send));
//     }
// )
