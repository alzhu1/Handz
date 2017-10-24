import * as a from './actionTypes';

export const chatMessage = (message, username) => ({
    type: a.CHAT_MESSAGE,
    message: message,
    username: username
})

export const login = (username, password) => ({
    type: a.LOGIN,
    username: username,
    password: password
})

export const logout = (token) => ({
    type: a.LOGOUT,
    token
})

export const chatThunk = (message) => (
    function (dispatch, getState, emit) {
        let username = getState().username
        let send = chatMessage(message, username)
        return(emit(send));
    }
)

export const modifyUserList = (is_logged_in,username,users) => ({
      type: a.MODIFY_USER_LIST,
      is_logged_in,
      username,
      users
})
