import * as a from './actionTypes';
import axios from 'axios';


export const getToken = (token) => ({
  type: a.GET_TOKEN,
  token
});

export const getUsername = (username) => ({
  type: a.GET_USERNAME,
  username
});

export const chatMessage = (text) => {
    console.log(text);
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
    return function (dispatch, getState, emit) {
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
              emit(socketOpen(username));
              return response
            })
        .then((response) => {
              dispatch(isLoggedIn(true));
              return response;
            },
            error => console.log('An error occured.', error)
        )
    }
}


export function socketOpen(username) {
    let text = JSON.stringify({
      "action":"user",
      "logged_in":true,
      "username":username
    });
    return text;
}

// export function socketOpen(username) {
//   return function (dispatch, getState, emit) {
//       let text = JSON.stringify({
//         "action":"user",
//         "logged_in":true,
//         "username":username
//       });
//       return(emit(text));
//   }
// }

export const sendMessage = (message) => {
    return function (dispatch, getState, emit) {
        let text = JSON.stringify({
            "action":"chat",
            "message":message,
            "username": getState().username
        });
        return(emit(text));
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
        username: state.username,
        chats: state.chats,
        is_logged_in: state.is_logged_in,
        userlist: state.userlist,
    };
};

export const mapDispatchToProps = (dispatch,emit) => {
    return {
      getToken: (token) => {
        dispatch(getToken(token))
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
      sendMessage: (message) => {
        dispatch(sendMessage(message));
      },
    }
};
