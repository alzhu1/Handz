import {LOGIN, LOGOUT, RESET_TEXT, ADD_TEXT} from './actionTypes';

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

export const mapStateToProps = (state) => {
    return {
        token: state.token,
        texts: state.texts
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
      }
    }
};
