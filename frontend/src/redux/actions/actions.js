import * as a from './actionTypes';
import axios from 'axios';


export const login = (token) => ({
  type: a.LOGIN,
  token
});

export const logout = () => ({
  type: a.LOGOUT,
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

export const chatMessage = (message) => ({
  type: a.CHAT_MESSAGE,
  message
});


export function apiLogin(username, password) {
  return function (dispatch) {
    return axios.post("/api/auth/", {
        username: username,
        password: password
    })
      .then((response) => {
            dispatch(login(response.data.token));
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
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
      login: (token) => {
        dispatch(login(token))
      },
      logout: () =>{
        dispatch(logout())
      },
      add_text: (text) => {
        dispatch(addText(text))
      },
      reset_text: () => {
        dispatch(resetText())
      },
      chat_message: (message) => {
        dispatch(chatMessage(message))
      },
    }
};
