import * as a from './actionTypes';

export const chatMessage = (message, username) => ({
    type: a.CHAT_MESSAGE,
    message: message,
    username: username
})

export const sendMessage = (message) => (
    function (dispatch, getState, emit) {
        let username = getState().username
        let send = chatMessage(message, username)
        return(emit(send));
    }
)

export const modifyUserList = (is_logged_in,username) => ({
      type: a.MODIFY_USER_LIST,
      is_logged_in,
      username,
})

export const socketOpen = (is_logged_in,username) => (
    modifyUserList(is_logged_in,username)
)
