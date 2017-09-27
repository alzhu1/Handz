import {LOGIN, LOGOUT, RESET_TEXT, ADD_TEXT} from './actionTypes';
import axios from 'axios';


export const login = (token) => ({
  type: LOGIN,
  payload: token
});

export const logout = () => ({
  type: LOGOUT,
});

export const addText = (text) => ({
  type: ADD_TEXT,
  payload: text
});

export const resetText = () => ({
  type: RESET_TEXT,
});


// export function apiLogin(username, password) {
//     return axios.post("/api/auth/", {
//         username: username,
//         password: password
//     })
// }

export function apiLogin(username, password) {
  return function (dispatch) {
    return axios.post("/api/auth/", {
        username: username,
        password: password
    })
      .then((response) => {
            console.log(response.data.token);
            dispatch(login(response.data.token));
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
        // username: state.username,
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
      api_login: () => {
        dispatch(apiLogin())
      },
    }
};
