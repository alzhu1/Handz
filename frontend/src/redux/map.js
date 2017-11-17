import * as a from './actions/actions';
import * as th from './actions/thunks';

export const mapStateToProps = (state) => {
    return {
        token: state.token,
        username: state.username,
        chats: state.chats,
        is_logged_in: state.is_logged_in,
        userlist: state.userlist,
        tablelist: state.tablelist,
        hand: state.hand,
        seat: state.seat,
        direction_to_act: state.direction_to_act,
        auction: state.auction,
        contract: state.contract,
        trick: state.trick,
        suit_led: state.suit_led,
        other_hands: state.other_hands,
    };
};

export const mapDispatchToProps = (dispatch,emit) => {
    return {
      isLoggedIn: (bool) => {
        dispatch(a.isLoggedIn(bool))
      },
      modifyUserList: (logged_in,username) => {
        dispatch(a.modifyUserList(logged_in,username))
      },
      loginThunk: (username, password) => {
        dispatch(th.loginThunk(username,password));
      },
      logoutThunk: (token) => {
        dispatch(th.logoutThunk(token));
      },
      createUser: (username, password) => {
        dispatch(th.createUser(username,password));
      },
      chatThunk: (message, receiver) => {
        dispatch(th.chatThunk(message, receiver));
      },
      createTableThunk: () => {
        dispatch(th.createTableThunk());
      },
      joinTableThunk: (table_id) => {
        dispatch(th.joinTableThunk(table_id));
      },
      takeSeatThunk: (seat) => {
        dispatch(th.takeSeatThunk(seat));
      },
      leaveTableThunk: (seat) => {
        dispatch(th.leaveTableThunk(seat));
      },
      leaveSeatThunk: (seat) => {
        dispatch(th.leaveSeatThunk(seat));
      },
      makeBidThunk: (bid) => {
        dispatch(th.makeBidThunk(bid));
      },
      playCardThunk: (card) => {
        dispatch(th.playCardThunk(card));
      },
    }
};
