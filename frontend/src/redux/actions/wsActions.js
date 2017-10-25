import * as a from './actionTypes';

export const chatMessage = (message, username, receiver) => ({
    type: a.CHAT_MESSAGE,
    message: message,
    username: username,
    receiver: receiver
})

export const login = (username, password) => ({
    type: a.LOGIN,
    username: username,
    password: password
})

export const logout = () => ({
    type: a.LOGOUT
})

export const signUp = (username,password) => ({
    type: a.SIGN_UP,
    username,
    password
})

export const chatThunk = (message, receiver) => (
    function (dispatch, getState, emit) {
        let username = getState().username
        let send = chatMessage(message, username, receiver)
        return(emit(send));
    }
)

export const modifyUserList = (is_logged_in,username,users) => ({
      type: a.MODIFY_USER_LIST,
      is_logged_in,
      username,
      users
})
