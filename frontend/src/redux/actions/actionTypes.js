// login/logout actions
export const GET_TOKEN = 'GET_TOKEN';
export const GET_USERNAME = 'GET_USERNAME';
export const IS_LOGGED_IN = 'IS_LOGGED_IN';
export const CREATE_USER = 'CREATE_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SIGN_UP = 'SIGN_UP';
export const LOGIN_INVALID = 'LOGIN_INVALID';
export const RESET_LOGIN_INVALID = 'RESET_LOGIN_INVALID';


// user actions
export const CHAT_MESSAGE = 'CHAT_MESSAGE';
export const MODIFY_USER_LIST = 'MODIFY_USER_LIST';

// table actions
export const CREATE_TABLE = 'CREATE_TABLE';
export const GET_TABLES = 'GET_TABLES';
export const JOIN_TABLE = 'JOIN_TABLE';
export const LEAVE_TABLE = 'LEAVE_TABLE';
export const TAKE_SEAT = 'TAKE_SEAT';
export const LEAVE_SEAT = 'LEAVE_SEAT';
export const UPDATE_TABLE_SEATS = 'UPDATE_TABLE_SEATS';

// auction actions
export const GET_NEXT_ACTOR = 'GET_NEXT_ACTOR';
export const GET_AUCTION = 'GET_AUCTION';
export const MAKE_BID = 'MAKE_BID';
export const GET_CONTRACT = 'GET_CONTRACT';
export const GET_DECLARER = 'GET_DECLARER';

export const ASK_STRAIN = 'ASK_STRAIN';
export const RESET_PHASE = 'RESET_PHASE';
export const CHOOSE_STRAIN = 'CHOOSE_STRAIN';

// hand actions
export const GET_HAND = 'GET_HAND';
export const GET_DISTRIBUTIONS = 'GET_DISTRIBUTIONS';
export const SHOW_DUMMY = 'SHOW_DUMMY';
export const GET_DUMMY_HAND = 'GET_DUMMY_HAND';
export const GET_TRICK_STRING = 'GET_TRICK_STRING';

// cardplay actions
export const PLAY_CARD = 'PLAY_CARD';
export const GET_TRICK = 'GET_TRICK';
export const SUIT_LED = 'SUIT_LED';
