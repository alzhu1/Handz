import * as a from 'redux/actions/actionTypes';
import {combineReducers} from "redux";

export function findDummy(seat) {
  switch(seat) {
    case 'south':
      return 'north'
    case 'north':
      return 'south'
    case 'west':
      return 'east'
    case 'east':
      return 'west'
    default:
        break;
  }
}

export function suitName(suit) {
  switch(suit) {
    case 'S':
      return 'spades'
    case 'H':
      return 'hearts'
    case 'C':
      return 'clubs'
    case 'D':
      return 'diamonds'
    default:
        break;
  }
}


export const initialState = {};

export const token = (state = "", action) => {
    switch(action.type) {
        case a.GET_TOKEN:
            return action.token;
        default:
            break;
    }
    return state;
}

export const username = (state = '', action) => {
    switch(action.type) {
        case a.GET_USERNAME:
            return action.username;
        default:
            break;
    }
    return state;
}

export const chats = (state = [], action) => {
    switch(action.type) {
        case a.CHAT_MESSAGE:
            let chat = action.message
            return [...state, chat];
        default:
            break;
    }
    return state;
}

export const is_logged_in = (state = false, action) => {
    switch(action.type) {
        case a.IS_LOGGED_IN:
            return action.bool;
        default:
            break;
    }
    return state;
}

export const userlist = (state = [], action) => {
    switch(action.type) {
        case a.MODIFY_USER_LIST:
            switch(action.is_logged_in) {
                case true:
                    // console.log(state)
                    // console.log(action.users)
                    // console.log(state.length)
                    if (state.length === 0) {
                        return action.users;
                    }
                    else {
                      return [...state, action.username]
                    }
                case false:
                    let temp = Object.assign([],state);
                    console.log(temp)
                    temp.splice(temp.indexOf(action.username),1);
                    return temp;
                default:
                    break;
            }
        default:
            break;
    }
    return state;
}

export const tablelist = (state = [], action) => {
    switch(action.type) {
        case a.CREATE_TABLE:
            return [...state,action.id];
        case a.GET_TABLES:
            return action.tablelist;
        default:
            break;
    }
    return state;
}

export const empty_hand = {'spades': "", 'hearts': "",'diamonds': "", 'clubs': ""}

export const hand = (state = empty_hand, action) => {
    switch(action.type) {
        case a.GET_HAND:
            return action.hand;
        case a.LEAVE_SEAT:
            return empty_hand;
        case a.LEAVE_TABLE:
            return empty_hand;
        default:
            break;
    }
    return state;
}

export const dummy_hand = (state = empty_hand, action) => {
    switch(action.type) {
        case a.GET_DUMMY_HAND:
            return action.hand;
        case a.LEAVE_SEAT:
            return empty_hand;
        case a.LEAVE_TABLE:
            return empty_hand;
        default:
            break;
    }
    return state;
}

export const seat = (state = '', action) => {
    switch(action.type) {
        case a.TAKE_SEAT:
            return action.seat;
        case a.LEAVE_SEAT:
            return '';
        case a.LEAVE_TABLE:
            return '';
        default:
            break;
    }
    return state;
}

export const direction_to_act = (state = '', action) => {
    switch(action.type) {
        case a.GET_NEXT_ACTOR:
          return action.direction_to_act;
        case a.LEAVE_TABLE:
            return '';
        default:
            break;
    }
    return state;
}

export const auction = (state = [], action) => {
    switch(action.type) {
        case a.GET_AUCTION:
          return action.auction;
        case a.LEAVE_TABLE:
            return [];
        default:
            break;
    }
    return state;
}

export const contract = (state = '', action) => {
    switch(action.type) {
        case a.GET_CONTRACT:
          return action.contract;
        case a.LEAVE_TABLE:
            return '';
        default:
            break;
    }
    return state;
}

const empty_trick = {'north': '', 'south': '', 'east': '', 'west': ''}

export const trick = (state = empty_trick, action) => {
    switch(action.type) {
        case a.GET_TRICK:
          return action.trick;
        case a.LEAVE_TABLE:
            return empty_trick;
        default:
            break;
    }
    return state;
}

export const suit_led = (state = '', action) => {
    switch(action.type) {
        case a.SUIT_LED:
          return action.suit
        case a.LEAVE_TABLE:
            return '';
        default:
            break;
    }
    return state;
}


export const default_dist = {'north': empty_hand, 'south': empty_hand,
                            'east': empty_hand, 'west': empty_hand}

export const other_hands = (state = default_dist, action) => {
    switch(action.type) {
        case a.GET_DISTRIBUTIONS:
          return action.hands
        case a.LEAVE_TABLE:
            return default_dist;
        default:
            break;
    }
    return state;
}

export const invalid_login = (state = false, action) => {
    switch(action.type) {
        case a.LOGIN_INVALID:
            return true;
        case a.RESET_LOGIN_INVALID:
            return false;
        default:
            break;
    }
    return state;
}

export const declarer = (state = '', action) => {
    switch(action.type) {
        case a.GET_DECLARER:
            return action.declarer;
        default:
            break;
    }
    return state;
}

export const dummy = (state = '', action) => {
    switch(action.type) {
        case a.GET_DECLARER:
            return findDummy(action.declarer);
        default:
            break;
    }
    return state;
}

export const show_dummy = (state = false, action) => {
    switch(action.type) {
        case a.GET_DISTRIBUTIONS:
          const hands = action.hands
          var count = 0
          for (var seat in hands){
            for (var suit in hands[seat]) {
              count += hands[seat][suit]
            }
          }
          if (count === 52) {
            return false
          }
          else {
            return true
          }
        default:
            break;
    }
    return state;
}

export const trick_string = (state = '', action) => {
    switch(action.type) {
        case a.GET_TRICK_STRING:
            return action.trick_string;
        case a.LEAVE_SEAT:
            return '';
        default:
            break;
    }
    return state;
}


export const empty_seats = {'north': '', 'south': '',
                            'east': '', 'west': ''}

export const table_seats = (state = empty_seats, action) => {
    switch(action.type) {
        case a.UPDATE_TABLE_SEATS:
          return action.seats
        case a.LEAVE_TABLE:
            return empty_seats;
        default:
            break;
    }
    return state;
}

export const special_phase = (state = '', action) => {
    switch(action.type) {
        case a.ASK_STRAIN:
          return 'ask_strain'
        case a.RESET_PHASE:
          return ''
        default:
            break;
    }
    return state;
}

export const appReducer = combineReducers({
token,
username,
chats,
is_logged_in,
userlist,
tablelist,
hand,
seat,
direction_to_act,
auction,
contract,
declarer,
dummy,
dummy_hand,
trick,
suit_led,
other_hands,
invalid_login,
show_dummy,
trick_string,
table_seats,
special_phase
});

export const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined
    }
    return appReducer(state, action)
}
