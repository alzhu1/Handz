import * as a from './actions';
import {findDummy} from '../reducers/reducers';
import {suitName} from '../reducers/reducers';

export function loginThunk(username, password) {
    return function (dispatch, getState, emit) {
        emit(a.login(username,password))
    }
}

export function logoutThunk() {
    return function (dispatch, getState, emit) {
        // dispatch(a.getToken(''))
        dispatch(a.isLoggedIn(false))
        dispatch(a.logout())
        emit(a.logout())
    }
}

export function createUser(username, password, password2) {
    return function (dispatch, getState, emit) {
        emit(a.signUp(username, password))
    }
}

export const joinTableThunk = (table_id) => (
    function (dispatch, getState, emit) {
        return(emit(a.joinTable(table_id)));
    }
)

export const leaveTableThunk = () => (
    function (dispatch, getState, emit) {
        return(emit(a.leaveTable()));
    }
)

export const createTableThunk = (table_type) => (
    function (dispatch, getState, emit) {
        return(emit(a.createTable(table_type)));
    }
)


export const chatThunk = (message, receiver) => (
    function (dispatch, getState, emit) {
        let username = getState().username
        let send = a.chatMessage(message, username, receiver)
        return(emit(send));
    }
)

export const takeSeatThunk = (seat) => (
    function (dispatch, getState, emit) {
        return(emit(a.takeSeat(seat)));
    }
)

export const leaveSeatThunk = (seat) => (
    function (dispatch, getState, emit) {
        return(emit(a.leaveSeat(seat)));
    }
)

export const makeBidThunk = (bid) => (
    function (dispatch, getState, emit) {
        return(emit(a.makeBid(bid)));
    }
)

export const playCardThunk = (card) => (
    function (dispatch, getState, emit) {
        // console.log(card)
        // console.log(getState().seat)
        // console.log(findDummy(getState().seat))
        if ((getState().contract !== '') && (getState().seat !== getState().dummy) &&
            ((getState().seat === getState().direction_to_act && getState().hand[suitName(card[1])].indexOf(card[0]) > -1) ||
            (getState().dummy === getState().direction_to_act && findDummy(getState().seat)===getState().dummy && getState().hand[suitName(card[1])].indexOf(card[0]) === -1))) {
          return(emit(a.playCard(card)));
        }
    }
)

export const chooseStrainThunk = (suit) => (
    function (dispatch, getState, emit) {
      return(emit(a.chooseStrain(suit)));
    }
)
