import * as a from './actions/actions';
import * as ws from './actions/wsActions';

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
        dispatch(a.getToken(token))
      },
      chatMessage: (message) => {
        dispatch(ws.chatMessage(message))
      },
      isLoggedIn: (bool) => {
        dispatch(a.isLoggedIn(bool))
      },
      modifyUserList: (logged_in,username) => {
        dispatch(ws.modifyUserList(logged_in,username))
      },
      login: (username, password) => {
        dispatch(a.login(username,password));
      },
      logout: (token) => {
        dispatch(a.logout(token));
      },
      createUser: (username, password) => {
        dispatch(a.createUser(username,password));
      },
      sendMessage: (message) => {
        dispatch(ws.sendMessage(message));
      },
    }
};
