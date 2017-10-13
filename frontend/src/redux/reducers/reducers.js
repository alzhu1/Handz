import * as a from 'redux/actions/actionTypes';

export const token = (state = "", action) => {
    switch(action.type) {
        case a.LOGIN:
            return action.token;

        case a.LOGOUT:
            return "";

        default:
            break;
    }
    return state;
}

export const texts = (state = [], action) => {
    switch(action.type) {
        case a.RESET_TEXT:
            return [];

        case a.ADD_TEXT:
            return [
                ...state,
                action.text
            ];

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
            return [...state,
                action.chat];
        default:
            break;
    }
    return state;
}

export const logged_in = (state = false, action) => {
    switch(action.type) {
        case a.LOGGED_IN:
            return action.bool;
        default:
            break;
    }
    return state;
}

export const userlist = (state = [], action) => {
    switch(action.logged_in) {
        case true:
            return [...state,action.username];
        case false:
            let temp = state;
            temp.splice(temp.indexOf(action.username),1);
            return temp;
        default:
            break;
    }
    return state;
}
