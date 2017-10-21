import * as a from './actionTypes';

// export const chatMessage = (payload) => {
//     // payload consists of username and message
//     return({
//       type: a.CHAT_MESSAGE,
//       payload
//     })
// }
//
// export const sendMessage = (message) => {
//     return function (dispatch, getState, emit) {
//         let text = {
//                 "message": message,
//                 "username": getState().username
//         };
//         return(emit(JSON.stringify(chatMessage(text))));
//     }
// }

export const chatMessage = (message, username) => {
    return({
      type: a.CHAT_MESSAGE,
      message: message,
      username: username
    })
}

export const sendMessage = (message) => {
    return function (dispatch, getState, emit) {
        let username = getState().username
        let send = chatMessage(message, username)
        return(emit(send));
    }
}

export const modifyUserList = (is_logged_in,username) => {
    return({
      type: a.MODIFY_USER_LIST,
      is_logged_in,
      username,
    })
}

export function socketOpen(is_logged_in,username) {
    return modifyUserList(is_logged_in,username);
}
