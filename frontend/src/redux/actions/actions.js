import * as a from './actionTypes';

export const getToken = token => ({
  type: a.GET_TOKEN,
  token
});

export const getUsername = username => ({
  type: a.GET_USERNAME,
  username
});

export const isLoggedIn = bool => ({
  type: a.IS_LOGGED_IN,
  bool
});


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

export const modifyUserList = (is_logged_in,username,users) => ({
      type: a.MODIFY_USER_LIST,
      is_logged_in,
      username,
      users
})

export const createTable = () => ({
    type: a.CREATE_TABLE,
    // to be assigned in backend
    id: 0
})

export const getTables = (tablelist) => ({
    type: a.GET_TABLES,
    tablelist: tablelist
})

export const joinTable = (table_id) => ({
    type: a.JOIN_TABLE,
    table_id
})

export const leaveTable = (table_id) => ({
    type: a.LEAVE_TABLE,
    table_id
})

export const getHand = (hand) => ({
    type: a.GET_HAND,
    hand
})


export const takeSeat = (seat, table_id) => ({
    type: a.TAKE_SEAT,
    seat,
    table_id
})

export const leaveSeat = (seat, table_id) => ({
    type: a.LEAVE_SEAT,
    seat,
    table_id
})
