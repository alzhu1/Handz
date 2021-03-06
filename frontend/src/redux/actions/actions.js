import * as a from './actionTypes';

export const getToken = token => ({
  type: a.GET_TOKEN,
  token
});

export const getUsername = username => ({
  type: a.GET_USERNAME,
  username
});

export const isLoggedIn = bool => ({
  type: a.IS_LOGGED_IN,
  bool
});

export const resetLogin = () => ({
    type: a.RESET_LOGIN_INVALID
})

export const chatMessage = (message, username, receiver) => ({
    type: a.CHAT_MESSAGE,
    message: message,
    username: username,
    receiver: receiver
})

export const login = (username, password) => ({
    type: a.LOGIN,
    username: username,
    password: password
})

export const logout = () => ({
    type: a.LOGOUT
})

export const signUp = (username,password) => ({
    type: a.SIGN_UP,
    username,
    password
})

export const modifyUserList = (is_logged_in,username,users) => ({
      type: a.MODIFY_USER_LIST,
      is_logged_in,
      username,
      users
})

export const createTable = (table_type) => ({
    type: a.CREATE_TABLE,
    table_type: table_type,
    // to be assigned in backend
    id: 0
})

export const getTables = (tablelist) => ({
    type: a.GET_TABLES,
    tablelist: tablelist
})

export const joinTable = (id) => ({
    type: a.JOIN_TABLE,
    id
})

export const leaveTable = () => ({
    type: a.LEAVE_TABLE
})

export const getHand = (hand) => ({
    type: a.GET_HAND,
    hand
})

export const getDummyHand = (hand) => ({
    type: a.GET_DUMMY_HAND,
    hand
})


export const takeSeat = (seat) => ({
    type: a.TAKE_SEAT,
    seat
})

export const leaveSeat = (seat) => ({
    type: a.LEAVE_SEAT,
    seat
})

export const getNextActor = (direction_to_act) => ({
    type: a.GET_NEXT_ACTOR,
    direction_to_act
})

export const getAuction = (auction) => ({
    type: a.GET_AUCTION,
    auction
})

export const makeBid = (bid) => ({
    type: a.MAKE_BID,
    bid
})

export const getContract = (contract) => ({
    type: a.GET_CONTRACT,
    contract
})

export const playCard = (card) => ({
    type: a.PLAY_CARD,
    card
})

export const chooseStrain = (suit) => ({
    type: a.CHOOSE_STRAIN,
    suit
})

export const getTrick = (trick) => ({
    type: a.GET_TRICK,
    trick
})

export const suitLed = (suit) => ({
    type: a.SUIT_LED,
    suit
})

export const getDeclarer = (declarer) => ({
    type: a.GET_DECLARER,
    declarer
})

// actions only dispatched by backend

export const getDistributions = (hands) => ({
    type: a.GET_DISTRIBUTIONS,
    hands
})

export const loginInvalid = () => ({
    type: a.LOGIN_INVALID,
})

export const showDummy = () => ({
    type: a.SHOW_DUMMY,
})

export const getTrickString  = (trick_string) => ({
    type: a.GET_TRICK_STRING,
    trick_string
})
