import * as a from './actionTypes';
import axios from 'axios';


export const getToken = (token) => ({
  type: a.GET_TOKEN,
  token
});

export const addText = (text) => ({
  type: a.ADD_TEXT,
  text
});

export const resetText = () => ({
  type: a.RESET_TEXT,
});

export const getUsername = (username) => ({
  type: a.GET_USERNAME,
  username
});

export const chatMessage = (text) => {
    let username = JSON.parse(text).username;
    let message = JSON.parse(text).message;

    return({
      type: a.CHAT_MESSAGE,
      'chat': username + ': ' + message
    })
}

export const modifyUserList = (is_logged_in, username) => {
    return({
      type: a.MODIFY_USER_LIST,
      is_logged_in,
      username,
    })
}

export const isLoggedIn = (bool) => ({
  type: a.IS_LOGGED_IN,
  bool
});

export function login(username, password) {
    return function (dispatch) {
        return axios.post("/api/auth/", {username:username, password:password})
        .then((response) => {
              dispatch(getToken(response.data.token));
              return response;
            }
        )
        .then(()=>{
              axios.post("/api/login/", {
                username: username,
                password: password
              })}
        )
        .then((response) => {
              dispatch(getUsername(username));
              return response;
            })
        .then((response) => {
              dispatch(isLoggedIn(true));
              return response;
            },
            error => console.log('An error occured.', error)
        )
    }
}


export function logout(token) {
    return function (dispatch) {
        return axios.post("/api/logout/", {token: token})
        .then((response) => {
              dispatch(getToken(''));
              return response;
            })
        .then((response) => {
              dispatch(isLoggedIn(false));
              return response;
            },
            error => console.log('An error occured.', error)
        )
    }
}

export function createUser(username, password) {
    return function (dispatch) {
        return axios.post("/api/signup/", {username:username, password:password})
        .then(() => {
            console.log('sign up success');
        },
            error => console.log('An error occured.', error)
        )
    }
}

export const mapStateToProps = (state) => {
    return {
        token: state.token,
        texts: state.texts,
        username: state.username,
        chats: state.chats,
        is_logged_in: state.is_logged_in,
        userlist: state.userlist,
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
      getToken: (token) => {
        dispatch(getToken(token))
      },
      addText: (text) => {
        dispatch(addText(text))
      },
      resetText: () => {
        dispatch(resetText())
      },
      chatMessage: (message) => {
        dispatch(chatMessage(message))
      },
      isLoggedIn: (bool) => {
        dispatch(isLoggedIn(bool))
      },
      modifyUserList: (logged_in,username) => {
        dispatch(modifyUserList(logged_in,username))
      },
      login: (username, password) => {
        dispatch(login(username,password));
      },
      logout: (token) => {
        dispatch(logout(token));
      },
      createUser: (username, password) => {
        dispatch(createUser(username,password));
      },
    }
};
